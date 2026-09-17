# HeliSocial — Technical System Architecture & Domain Specification

> **Document Version:** 1.0.0-PROD  
> **Audience:** System Architects, Lead Engineers, and Prospective Technical Acquirers  
> **Core Guarantee:** Strict multi-tenant isolation, server-side credential containment, and modular provider abstraction.

---

## 1. Domain Architecture: Dual Identity Model

The most critical architectural principle of HeliSocial is the strict decoupling of **Human User Accounts** from **Creator Businesses**:

```
+--------------------------------------------------------------------------------+
|                        HUMAN USER ACCOUNT (Session Identity)                   |
|  - Private identity (email, password hash, personal billing relationship)      |
|  - Holds 1 Stripe Customer & Subscription tier entitlement                     |
|  - Belongs to 1 or more Creator Businesses via BusinessMembers (with RBAC)     |
+--------------------------------------------------------------------------------+
                                       │
                                       ▼ (Manages 1..N based on subscription)
+--------------------------------------------------------------------------------+
|                        CREATOR BUSINESS (Public/Managed Entity)                |
|  - Public identity (@handle, name, avatar, bio, brand voice, target niche)     |
|  - Independent follow graph (Followers / Following)                            |
|  - Scoped assets: Brand Profiles, Campaigns, Content Sources, Assets, Receipts |
|  - Scoped Community Posts & Engagement History                                 |
+--------------------------------------------------------------------------------+
```

### Key Rules:
1. **Users Never Follow Users:** Follow relationships exist strictly between `follower_business_id` and `following_business_id`.
2. **Zero Cross-Workspace Leakage:** Switching businesses changes the active tenant context (`activeBusinessId`). All subsequent database queries, AI generation prompts, and campaign drafts are filtered by `WHERE business_id = :active_id`.
3. **Team Roles (RBAC):** `business_members` maps `user_id` to `business_id` with explicit permissions:
   - `OWNER`: Full control, billing management, deletion of business.
   - `ADMIN`: Team management, campaign creation, social connection authorization.
   - `EDITOR`: Campaign editing, AI generation, publishing.
   - `CONTENT_CREATOR`: Draft creation, AI generation (publishing requires approval).
   - `ANALYST`: Read-only access to metrics and reports.

---

## 2. Complete Relational Database Model

The database is designed around a fully normalized 23-table relational schema with cascading foreign keys and composite integrity constraints:

```
[users] ──< [subscriptions] >── [plans]
   │
   ├──< [business_members] >── [creator_businesses]
   │                                  │
   │                                  ├──< [brand_profiles]
   │                                  ├──< [campaigns]
   │                                  │        │
   │                                  │        ├──< [content_sources]
   │                                  │        └──< [content_assets] ──< [publishing_receipts]
   │                                  │                   │
   │                                  │                   └──< [posts] ──< [reactions]
   │                                  │                           │    ──< [comments]
   │                                  │                           │    ──< [saves]
   │                                  │                           │    ──< [reports]
   │                                  │
   │                                  ├──< [ai_generations] ──< [ai_usage_ledger]
   │                                  ├──< [social_connections] (Encrypted Tokens)
   │                                  ├──< [follows] (Bi-directional graph)
   │                                  └──< [invitations] (Attribution codes)
   │
   └──< [notifications]
   └──< [audit_logs]
```

### Table Summary & Multi-Tenant Scoping

| Entity | Primary Key | Tenant Isolation Column | Description |
| :--- | :--- | :--- | :--- |
| `users` | `id (UUID)` | N/A | Human credentials, global role (`USER`, `SUPERADMIN`). |
| `plans` | `id (VARCHAR)` | N/A | Configurable entitlements (business limit, AI credits, prices). |
| `subscriptions` | `id (UUID)` | `user_id` | Stripe subscription state, renewal period, status. |
| `creator_businesses` | `id (UUID)` | `created_by_user_id` | Core public brand profile, `@handle`, metrics. |
| `business_members` | `id (UUID)` | `business_id` + `user_id` | Workspace authorization mapping and role assignments. |
| `brand_profiles` | `id (UUID)` | `business_id` | Tone, archetype, forbidden words, CTA patterns. |
| `campaigns` | `id (UUID)` | `business_id` | Marketing campaigns grouping sources and outputs. |
| `content_sources` | `id (UUID)` | `business_id` | Ingested PDF text, scraped URLs, topic prompts. |
| `ai_generations` | `id (UUID)` | `business_id` + `user_id` | Execution logs of model inference and prompt inputs. |
| `ai_usage_ledger` | `id (UUID)` | `user_id` + `business_id` | Transactional deduction of user plan AI credits. |
| `content_assets` | `id (UUID)` | `business_id` | Structured JSON cards (LinkedIn, Carousels, Threads, Hooks). |
| `publishing_receipts`| `id (UUID)` | `business_id` | Audit trace of asset lifecycle and external publication IDs. |
| `posts` | `id (UUID)` | `business_id` | Public or internal community feed posts. |
| `follows` | Composite PK | `follower_business_id` | Directed follow graph with check constraint stopping self-follow. |
| `reactions` | `id (UUID)` | `business_id` + `post_id` | Unique post reactions per business (`LIKE`, `INSIGHTFUL`, etc.). |
| `comments` | `id (UUID)` | `business_id` + `post_id` | Threaded discussions under community posts. |
| `social_connections`| `id (UUID)` | `business_id` | OAuth tokens for LinkedIn, X, Threads. |
| `invitations` | `id (UUID)` | `inviting_business_id` | Growth tracking codes with auto-follow execution. |
| `reports` | `id (UUID)` | `reporter_user_id` | User-submitted moderation tickets. |
| `moderation_actions`| `id (UUID)` | `moderator_user_id` | Audit log of moderator takedowns and suspensions. |

---

## 3. Server-Side AI Pipeline & Security Boundary

```
[Browser Client]
       │
       │ POST /api/ai/generate
       │ Headers: Authorization: Bearer <session>, x-business-id: <biz-id>
       ▼
[Express Server-Side Route Guard]
       │
       ├── Step 1: Validate session & user authentication
       ├── Step 2: Verify user membership in x-business-id with CREATOR/EDITOR role
       ├── Step 3: Check user subscription status (active / trialing)
       ├── Step 4: Check monthly AI credit balance in ai_usage_ledger
       │           └── If balance < requiredCredits -> throw 402 Payment Required
       ├── Step 5: Sanitize input text, PDF extract, or URL content
       ├── Step 6: Load brand_profiles record for x-business-id (Tone, Rules, Archetype)
       ▼
[Google Gen AI Server SDK (@google/genai)]
       │
       │ System Instruction: Persona, strict brand voice, structured JSON schema
       │ Model: gemini-2.5-flash (fast card batch) or gemini-2.5-pro (deep document synthesis)
       │ Secrets: process.env.GEMINI_API_KEY (strictly private to container)
       ▼
[Response Validation & Persistence]
       ├── Validate JSON schema conformity (Hook, Body, Carousel Slides, CTAs)
       ├── Deduct credits from ai_usage_ledger within atomic DB transaction
       ├── Persist records into content_assets and publishing_receipts (status: 'GENERATED')
       ▼
[Return JSON Response to Client]
```

### Safety Guarantees:
- **No Client Exposure:** `GEMINI_API_KEY` is loaded only in Node.js server context.
- **Strict Delimiters:** User input is encapsulated in XML-style tags (`<source_document>...</source_document>`) with explicit instructions to ignore prompt injection attempts.
- **Credit Metering:** Generations are metered prior to model calls, stopping runaway costs.

---

## 4. Ingestion Engine Architecture

1. **PDF Documents:** Uploaded as `multipart/form-data`. Server validates MIME type and file size (≤20MB). Content is parsed to UTF-8 text, sanitized of binary artifacts, and stored in `content_sources.clean_extracted_text`.
2. **Web / Article URLs:** Server validates URL to prevent Server-Side Request Forgery (SSRF) by blocking internal loopbacks (`127.0.0.1`, `169.254.169.254`, private RFC 1918 subnets). Extracts main article text using readability rules and strips boilerplate navigation.
3. **Pasted Content & Topics:** Text is normalized, stripped of dangerous control characters, and truncated to safe context window limits.

---

## 5. Publishing Receipts State Machine

HeliSocial treats content publishing as an audited business transaction. Every content asset tracks its lifecycle through immutable records in `publishing_receipts`:

```
   [GENERATED]
        │
        ▼ (User clicks Save to Workspace)
     [SAVED]
        │
        ├──────────────────────────────────────────┐
        ▼ (User clicks Publish to HeliSocial)      ▼ (User clicks Publish to LinkedIn/X)
[PUBLISHED_TO_HELISOCIAL]               [EXTERNAL_PUBLISH_REQUESTED]
        │                                          │
        │                                          ├──────────────┐
        │                                          ▼              ▼
        │                              [EXTERNALLY_PUBLISHED]  [FAILED]
        │                              (Stores external URL    (Stores error
        │                               & remote Post ID)       code & detail)
        └──────────────────────────────────────────┴──────────────┘
```

---

## 6. Social Graph & Community Feed Algorithms

Feeds are dynamically calculated through performant SQL queries:
1. **Following Feed:** Returns posts strictly authored by creator businesses present in the active business's `follows` table.
2. **Discover Feed:** Returns global public posts ordered chronologically or by verified engagement weight.
3. **Topics Feed:** Filtered by categorized hashtags (`#saas`, `#ai`, `#marketing`).
4. **New Creators:** Surfaces newly registered creator businesses with verified brand profiles.

*Integrity Requirement:* HeliSocial never fabricates fake likes, simulated views, or bot comments.

---

## 7. Plan Entitlements & Subscription Tiers

Entitlements are decoupled from application code and stored in the database:

| Tier | Price | Max Businesses | Monthly AI Credits | Analytics | External Publishing | Team Roles |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| **Free** | $0/mo | 1 | 50 Credits | Basic | No | No |
| **Creator** | $29/mo | 1 | 300 Credits | Full | Yes | No |
| **Business**| $79/mo | 3 | 1,000 Credits | Advanced | Yes | Yes (Up to 3 seats) |
| **Agency** | $199/mo| 10 | 3,500 Credits | Comprehensive | Yes | Yes (Up to 10 seats)|

*Entitlement Verification:* Performed entirely on the server side on every restricted endpoint. Client state is treated as purely cosmetic.
