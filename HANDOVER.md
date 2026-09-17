# HeliSocial — Acquirer Handover & Configuration Guide

> **Document Classification:** Confidential Commercial Transfer Documentation  
> **Applicability:** Commercial M&A / Flippa Business Asset Sale  
> **Core Guarantee:** 100% Standalone Operation. A new owner can fully operate, re-brand, re-key, and monetize HeliSocial **without modifying a single line of internal application code**.

---

## 1. Executive Asset Summary for Prospective Buyers

HeliSocial is packaged as a complete, independent digital business asset consisting of:
1. **Full-Stack Application Codebase:** React 19 SPA, Tailwind CSS 4 UI, Express API server, and TypeScript domain logic.
2. **Relational Database Schema:** 23 normalized tables with multi-tenant isolation, follow graph, content library, and audit ledgers.
3. **Stripe Billing Integration:** Webhook-verified recurring subscription engine supporting Free, Creator, Business, and Agency tiers.
4. **Platform Owner Back-Office:** Built-in Admin Dashboard tracking MRR, subscriber distribution, AI credit margins, and moderation queues.
5. **Clean Legal Separation:** Free of proprietary creator dependencies, third-party vendor lock-in, or hardcoded personal credentials.

### 1.1 Complete Creator Anonymity & Zero Personal Identity Guarantee
Under no circumstances does this repository contain:
- The original creator's name, email, or personal identity
- Any personal domains, personal company branding, or personal infrastructure accounts
- Any personal API keys, Stripe accounts, database credentials, or email credentials
- Any personal social media links or tracking pixels

All mock accounts, testing seeds, and documentation exclusively utilize standard RFC 2606 reserved domains (such as `user@example.com`, `admin@example.com`, and `demo@example.com`) and generic placeholder brands (such as `Acme Consulting` and `Brand Alpha`). The seller's personal identity is 100% excluded and untangled from day one.

---

## 2. Zero-Code-Modification Re-Keying Architecture

Every operational dependency in HeliSocial communicates with the runtime exclusively through standard environment variables and runtime database configuration.

```
                              NEW OWNER ENVIRONMENT (.env)
                                           │
       ┌───────────────────────────────────┼───────────────────────────────────┐
       ▼                                   ▼                                   ▼
[GEMINI_API_KEY]                   [DATABASE_URL]                    [STRIPE_SECRET_KEY]
Server AI Studio                   PostgreSQL multi-tenant           Stripe Billing Engine
Calls Google Gen AI                Database connection               & Webhook Sync
       │                                   │                                   │
       └───────────────────────────────────┼───────────────────────────────────┘
                                           ▼
                                 [APPLICATION RUNTIME]
                                (Zero Code Modifications)
```

To transfer ownership, you simply replace the values in your `.env` configuration file and restart the server container.

---

## 3. Step-by-Step Service Transfer & Re-Keying Procedure

### Step 3.1: Google Gemini AI Replacement
HeliSocial utilizes the official `@google/genai` TypeScript SDK running strictly on the backend server.
1. Create or log in to your own Google Cloud / Google AI Studio account at [https://aistudio.google.com/](https://aistudio.google.com/).
2. Navigate to **Get API Key** and generate a new key for your project.
3. Open your production `.env` file and update:
   ```bash
   GEMINI_API_KEY="AIzaSyYourNewIndependentKeyHere"
   ```
4. Restart the server container. No code edits or SDK reconfigurations are required.

### Step 3.2: Database Connection & Data Migration
HeliSocial targets standard PostgreSQL (compatible with Cloud SQL, Supabase, Neon, AWS RDS, or Docker).
1. Provision a new PostgreSQL instance in your own cloud infrastructure.
2. If acquiring the existing user database from the seller:
   - Seller provides an encrypted `pg_dump` export:
     ```bash
     pg_dump -h old_host -U helisocial_user -d helisocial_db -F c -b -v -f helisocial_transfer.dump
     ```
   - Buyer restores the dump into their new instance:
     ```bash
     pg_restore -h new_host -U new_user -d new_db -v helisocial_transfer.dump
     ```
3. Update `.env`:
   ```bash
   DATABASE_URL="postgresql://new_user:new_password@new_host:5432/new_db?sslmode=require"
   ```

### Step 3.3: Stripe Account & Subscription Transfer
HeliSocial uses Stripe to automate recurring SaaS revenue.

#### Option A: Direct Stripe Account Ownership Transfer (Recommended on Flippa)
If transferring the seller's existing Stripe account:
1. Seller invites Buyer as an **Administrator** in Stripe Dashboard (`Settings → Team and roles`).
2. Seller transfers **Account Ownership** to the Buyer.
3. Buyer removes Seller from the team and adds Buyer's bank account for payouts.
4. No API keys or Price IDs need to change.

#### Option B: Fresh Stripe Account Re-Keying
If connecting HeliSocial to your existing Stripe account:
1. Create 3 recurring subscription products in your Stripe Dashboard:
   - **HeliSocial Creator:** e.g., $29.00 / month
   - **HeliSocial Business:** e.g., $79.00 / month
   - **HeliSocial Agency:** e.g., $199.00 / month
2. Copy the resulting Price IDs (format: `price_1Pxxx...`).
3. Configure a Stripe Webhook endpoint pointing to:
   ```
   https://yourdomain.com/api/stripe/webhook
   ```
   Listen for the following events:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
4. Update `.env`:
   ```bash
   STRIPE_SECRET_KEY="sk_live_51Pxxx..."
   STRIPE_WEBHOOK_SECRET="whsec_xxx..."
   STRIPE_PRICE_ID_CREATOR="price_1P_creator..."
   STRIPE_PRICE_ID_BUSINESS="price_1P_business..."
   STRIPE_PRICE_ID_AGENCY="price_1P_agency..."
   ```

### Step 3.4: Domain Name & SSL / DNS Transfer
1. Seller unlocks domain at registrar (e.g. Namecheap, GoDaddy, Cloudflare) and provides the EPP/Auth transfer code.
2. Buyer initiates inbound transfer at their chosen registrar.
3. Update DNS `A` or `CNAME` records to point to Buyer's Cloud Run or container ingress IP.
4. Update `.env`:
   ```bash
   APP_URL="https://yournewdomain.com"
   ```

### Step 3.5: External Social OAuth Apps (Optional)
If offering direct publishing to LinkedIn or X:
1. Register developer apps at [LinkedIn Developer Portal](https://developer.linkedin.com/) and [X Developer Portal](https://developer.x.com/).
2. Set OAuth Redirect URI to: `https://yournewdomain.com/api/social/callback`.
3. Update `.env`:
   ```bash
   LINKEDIN_CLIENT_ID="your_linkedin_client_id"
   LINKEDIN_CLIENT_SECRET="your_linkedin_client_secret"
   X_CLIENT_ID="your_x_client_id"
   X_CLIENT_SECRET="your_x_client_secret"
   ```

---

## 4. Master Environment Variable Inventory

| Variable Name | Required? | Secret? | Description / Re-Keying Instruction |
| :--- | :---: | :---: | :--- |
| `NODE_ENV` | Yes | No | Set to `production`. |
| `PORT` | Yes | No | Standard container port (`3000`). |
| `APP_URL` | Yes | No | Fully qualified public URL (e.g. `https://helisocial.app`). |
| `JWT_SECRET` | Yes | **YES** | Random 64-char string for signing session tokens. |
| `SESSION_SECRET` | Yes | **YES** | Random 64-char string for cookie encryption. |
| `DATABASE_URL` | Yes | **YES** | PostgreSQL connection string. |
| `GEMINI_API_KEY` | Yes | **YES** | Google Gemini API key from Google AI Studio. |
| `STRIPE_SECRET_KEY` | Yes | **YES** | Stripe Live Secret Key (`sk_live_...`). |
| `STRIPE_WEBHOOK_SECRET` | Yes | **YES** | Stripe Live Webhook Signing Secret (`whsec_...`). |
| `STRIPE_PRICE_ID_CREATOR`| Yes | No | Stripe Price ID for Creator tier. |
| `STRIPE_PRICE_ID_BUSINESS`| Yes | No | Stripe Price ID for Business tier. |
| `STRIPE_PRICE_ID_AGENCY` | Yes | No | Stripe Price ID for Agency tier. |
| `LINKEDIN_CLIENT_ID` | Optional | No | LinkedIn Developer App Client ID. |
| `LINKEDIN_CLIENT_SECRET`| Optional | **YES** | LinkedIn Developer App Client Secret. |
| `X_CLIENT_ID` | Optional | No | X Developer App Client ID. |
| `X_CLIENT_SECRET` | Optional | **YES** | X Developer App Client Secret. |

---

## 5. Post-Transfer Operational Verification Run

After re-keying and restarting the server, execute this 6-step test protocol:

```
[TEST 1] User Registration & Session
  └── Navigate to /signup, register new account. Verify JWT cookie issue.

[TEST 2] Creator Business Onboarding & Switching
  └── Create first business ("Brand Alpha", @brandalpha).
  └── Create second business ("Brand Beta", @brandbeta).
  └── Switch between them using the top-nav Switcher. Verify independent brand voice.

[TEST 3] AI Content Studio Execution
  └── Paste an article topic under Brand Alpha.
  └── Click Generate. Verify that Gemini returns structured cards (LinkedIn Post, Carousel, Thread).
  └── Confirm credits are deducted from Brand Alpha's ledger.

[TEST 4] Community Publishing & Receipts
  └── Click "Publish to HeliSocial" on a generated asset.
  └── Navigate to /community. Verify the post appears in the Discover feed.
  └── Navigate to Receipts table. Verify status: "PUBLISHED_TO_HELISOCIAL".

[TEST 5] Follow Graph Integrity
  └── Navigate to public profile /@brandbeta while logged in as Brand Alpha.
  └── Click Follow. Verify follower count increments without page reload.

[TEST 6] Stripe Webhook Validation
  └── Trigger a test checkout from /pricing or send a Stripe CLI test event:
      `stripe trigger customer.subscription.created`
  └── Verify subscription status updates to 'active' in database.
```

---

## 6. Operating Cost Documentation & Margin Analysis

### 1. Fixed Baseline Operating Costs
- **Hosting / Compute (Cloud Run / VPS):** ~$15.00 – $40.00 / month
- **Managed PostgreSQL Database:** ~$10.00 – $25.00 / month
- **Domain & DNS Management:** ~$12.00 / year (~$1.00 / month)
- **Total Fixed Monthly Overhead:** **~$26.00 – $66.00 / month**

### 2. Usage-Based Variable Costs
- **Google Gemini API Inference:**
  - `gemini-2.5-flash`: ~$0.075 per 1M input tokens, ~$0.30 per 1M output tokens.
  - Generating an entire 7-card multi-asset campaign consumes ~2,500 tokens = **~$0.0007 per campaign**.
  - A user on the $29/mo Creator tier generating 50 campaigns costs the business **~$0.035/mo in AI inference**, yielding a **>98% gross profit margin**.
- **Stripe Transaction Fee:** 2.9% + $0.30 per successful charge.

### 3. Optional Scaling Costs
- **Transactional Email (Resend / SendGrid):** Free tier up to 3,000 emails/mo, then $15.00/mo.
- **Sentry / Datadog Error Monitoring:** Free tier adequate up to 10,000 monthly events.
