# HeliSocial — Autonomous Commercial Creator-Business Platform & Social Community

> **Commercial Positioning:** "Create. Publish. Connect. Grow."  
> **Asset Status:** Standalone, Flippa-Ready Commercial Web Business Asset  
> **Primary Revenue Model:** Multi-Tenant SaaS Subscriptions ($0–$199/mo) based on Creator Business count and metered AI allowances.

---

## 1. Commercial Asset Overview

**HeliSocial** is a complete, self-contained commercial digital web application designed for independent operation, recurring subscription revenue, and clean marketplace ownership transfer.

Unlike generic AI wrapper utilities or single-user tools, HeliSocial is engineered around a closed-loop multi-brand flywheel:
```
SOURCE (PDF/URL/Text/Idea)
  ↓
CREATE (Structured Multi-Asset AI Studio)
  ↓
MANAGE (Campaigns & Creator Business Workspaces)
  ↓
PUBLISH (Internal Community + External Social Networks)
  ↓
RECEIPT (Immutable Lifecycle & Audit Verification)
  ↓
COMMUNITY (Feeds: Following, Discover, Topics, New Creators)
  ↓
DISCOVER & FOLLOW (Creator-to-Creator Social Graph)
  ↓
ENGAGE (Reactions, Threaded Discussions, Saves, Attribution Invites)
  ↓
CREATE AGAIN
```

---

## 2. Flippa & Marketplace Transfer Guarantee

HeliSocial was architected from Day 1 to be completely severed from its original builder upon acquisition:
- **Zero Personal Identity or Accounts:** Absolutely no creator names, personal email addresses, personal domains, personal company branding, or personal infrastructure accounts are contained anywhere in the code, database seeds, configuration, or documentation.
- **Zero Personal Dependencies:** No personal Google Cloud projects, personal Stripe accounts, personal social media profiles, or private server roots are embedded.
- **Zero Code Modifications Required for Re-Keying:** Every single operational service (Google Gemini API, PostgreSQL Database, Stripe Billing & Webhooks, OAuth Providers, Domain URLs) is injected purely via standard environment variables and runtime configuration tables.
- **Independent Business Valuation:** The built-in Platform Owner Admin Dashboard tracks real-time MRR, active subscriber counts by tier, token consumption margins, and community engagement to facilitate buyer due diligence.

---

## 3. Core Capabilities & System Boundaries

| System Module | Functional Scope | Commercial Purpose |
| :--- | :--- | :--- |
| **Dual Identity Engine** | Segregates private human login accounts (`User Accounts`) from public brand identities (`Creator Businesses`). | Enables agencies and serial entrepreneurs to manage multiple public brands with team roles (`Owner`, `Admin`, `Editor`, `Analyst`). |
| **Workspace Switcher** | Hermetically isolates campaigns, drafts, brand voice personas, follower graphs, and analytics per business. | Prevents cross-brand data leakage; enforces tier limits (e.g. Free = 1, Business = 3, Agency = 10). |
| **Structured AI Studio** | Multi-source ingestion (Text, PDF documents, URLs, Topics) generating structured card sets (LinkedIn Posts, 6–10 slide carousels, X threads, quick hooks, CTAs). | High utility content creation tailored to each brand's stored voice rather than a generic chat prompt. |
| **Publishing Receipts** | Cryptographic-style audit records tracking every piece of content (`GENERATED` → `SAVED` → `PUBLISHED_TO_HELISOCIAL` → `EXTERNALLY_PUBLISHED` / `FAILED`). | Transparent proof of publication and external post verification without simulated success. |
| **Social Graph & Community** | Business-to-business follow system, public `/@handle` profiles, discovery feeds, and attribution-tracked invitation links. | Organic user acquisition and retention loop built directly into the product. |
| **Server-Enforced Metering** | Stripe Billing integration with server-side entitlement checks and transactional AI token credit ledgers. | Protects gross margins and prevents runaway LLM operating costs. |

---

## 4. Documentation Index

The following master documents are provided for the operator, development team, and prospective purchasers:

1. [`HANDOVER.md`](./HANDOVER.md) — **Buyer Due Diligence & Operational Transfer Manual**. Detailed walkthrough on replacing all API keys, transferring Stripe ownership, configuring database instances, and post-transfer verification without code changes.
2. [`ARCHITECTURE.md`](./ARCHITECTURE.md) — **Complete System & Schema Architecture**. Technical breakdown of the database entities, tenant context scoping, security boundaries, and AI prompt pipelines.
3. [`.env.example`](./.env.example) — **Environment Variable Inventory**. Exhaustive documentation of all runtime configuration parameters.

---

## 5. Technology Stack

- **Framework:** React 19 + TypeScript (Client SPA & Modular Component Hierarchy)
- **Styling:** Tailwind CSS 4 with responsive design and motion transitions
- **Backend / API:** Full-Stack Node.js / Express server (binding to port `3000` on `0.0.0.0`)
- **AI Inference:** Official Google Gen AI TypeScript SDK (`@google/genai`) running strictly server-side
- **Database Target:** PostgreSQL relational database with multi-tenant foreign key constraints
- **Billing & Subscriptions:** Stripe Checkout, Customer Portal, and Webhook verification
- **Icons & Visuals:** `lucide-react` vector iconography

---

## 6. Local Development Quickstart

### Prerequisites
- Node.js 20+ and npm
- A Google Gemini API Key from Google AI Studio
- PostgreSQL database instance (or local Docker container)

### Setup Steps
1. Clone the repository:
   ```bash
   git clone <repo-url> helisocial
   cd helisocial
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Initialize environment variables:
   ```bash
   cp .env.example .env
   # Edit .env and supply your credentials (see HANDOVER.md for guidance)
   ```
4. Run development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.
