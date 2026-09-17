import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldAlert,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  CreditCard,
  KeyRound,
  FileCheck2,
  Database,
  ExternalLink,
  Info,
  X,
  CheckCircle2,
  Server,
  Lock,
} from 'lucide-react';

export const DemoModeBanner: React.FC = () => {
  const {
    dataMode,
    setDataMode,
    resetToDemoSeed,
    resetToCleanBaseline,
  } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Top Persistent Notice Bar */}
      <aside
        aria-label="Demo and Sandbox environment notice"
        id="demo-mode-banner"
        className="w-full bg-stone-900 text-stone-200 border-b border-stone-800 text-xs py-2 px-3 sm:px-6 shadow-sm z-50 relative transition-all"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5">
          {/* Left: Environment Badge & Explanation */}
          <div className="flex items-center gap-2 flex-wrap text-center md:text-left justify-center md:justify-start">
            <span
              id="sandbox-badge"
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              {dataMode === 'DEMO_SEED' ? 'Demo Seed Data Active' : 'Clean Baseline Mode (0 Metrics)'}
            </span>
            <span className="text-stone-300 hidden sm:inline">|</span>
            <span className="text-stone-300 font-medium">
              {dataMode === 'DEMO_SEED'
                ? 'All displayed users, followers, $14.8k MRR & receipts are synthetic seed records.'
                : 'Clean slate preview: 0 MRR, 0 followers, empty records ready for production.'}
            </span>
            <span className="text-stone-400 hidden lg:inline">
              Third-party services (Stripe, Social APIs, Gemini) run in safe mock/fallback modes.
            </span>
          </div>

          {/* Right: Quick Controls & Checkpoint Details */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Toggle Data Mode */}
            <div className="flex items-center rounded-lg bg-stone-800 p-0.5 border border-stone-700">
              <button
                id="btn-switch-demo-seed"
                onClick={() => setDataMode('DEMO_SEED')}
                className={`px-2 py-1 rounded text-[11px] font-semibold transition ${
                  dataMode === 'DEMO_SEED'
                    ? 'bg-amber-500 text-stone-950 shadow-xs'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
                title="View with sample businesses, posts, campaigns, and $14.8k MRR telemetry"
              >
                Demo Seed Data
              </button>
              <button
                id="btn-switch-clean-baseline"
                onClick={() => setDataMode('CLEAN_BASELINE')}
                className={`px-2 py-1 rounded text-[11px] font-semibold transition ${
                  dataMode === 'CLEAN_BASELINE'
                    ? 'bg-amber-500 text-stone-950 shadow-xs'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
                title="View clean production slate with 0 users, 0 MRR, and clean queues"
              >
                Clean Baseline (0 Metrics)
              </button>
            </div>

            {/* Reset Button */}
            <button
              id="btn-reset-demo"
              onClick={() => {
                if (dataMode === 'DEMO_SEED') {
                  resetToDemoSeed();
                } else {
                  resetToCleanBaseline();
                }
              }}
              title="Reset state to initial baseline"
              className="p-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700 transition flex items-center gap-1 text-[11px] px-2"
            >
              <RotateCcw className="w-3 h-3 text-stone-400" />
              <span className="hidden sm:inline">Reset</span>
            </button>

            {/* Checkpoint / Audit Modal Trigger */}
            <button
              id="btn-open-checkpoint-modal"
              onClick={() => setIsModalOpen(true)}
              className="px-2.5 py-1 rounded-md bg-stone-100 hover:bg-white text-stone-900 font-semibold text-[11px] transition shadow-xs flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Transfer & Env Checkpoint</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Security, Transferability & Environment Audit Modal */}
      {isModalOpen && (
        <div
          id="checkpoint-modal-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs overflow-y-auto"
        >
          <div
            id="checkpoint-modal-content"
            className="w-full max-w-4xl rounded-2xl bg-white text-stone-900 shadow-2xl border border-stone-200 overflow-hidden my-8"
          >
            {/* Modal Header */}
            <div className="bg-stone-900 text-white px-6 py-5 flex items-center justify-between border-b border-stone-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold font-serif">Security & Transferability Checkpoint</h2>
                  <p className="text-xs text-stone-400">
                    Standalone Asset Due Diligence, Synthetic Data Verification & Environment Variable Audit
                  </p>
                </div>
              </div>
              <button
                id="btn-close-checkpoint-modal"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-sm">
              {/* Section 1: Confirmation of Demo/Seed Data */}
              <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-amber-900 text-sm">
                      Confirmation: All Current Data is Synthetic Seed Records
                    </h3>
                    <p className="text-amber-800 text-xs mt-1 leading-relaxed">
                      Every user profile (<code className="bg-amber-100 px-1 py-0.5 rounded">alex@example.com</code>,{' '}
                      <code className="bg-amber-100 px-1 py-0.5 rounded">creatorcraft</code>, etc.), follower metric
                      (3,840), financial telemetry ($14,850 MRR), campaign asset, and publishing receipt is 100%
                      synthetic seed data created for architecture demonstration and buyer due diligence. It{' '}
                      <strong>cannot and must not</strong> be construed as genuine production traction.
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-xs font-semibold text-amber-900">Current Mode:</span>
                      <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded font-bold bg-amber-200 text-amber-900">
                        {dataMode === 'DEMO_SEED' ? 'Demo Seed Data ($14.8k MRR)' : 'Clean Production Baseline (0 Metrics)'}
                      </span>
                      <button
                        onClick={() => setDataMode(dataMode === 'DEMO_SEED' ? 'CLEAN_BASELINE' : 'DEMO_SEED')}
                        className="text-xs text-amber-900 underline font-medium hover:text-amber-950 ml-2"
                      >
                        Switch to {dataMode === 'DEMO_SEED' ? 'Clean Baseline' : 'Demo Seed'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Safe Mock / Sandbox Modes */}
              <div>
                <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
                  <Server className="w-4 h-4 text-stone-700" />
                  Active Safe Development & Mock Modes
                </h3>
                <p className="text-xs text-stone-600 mt-1">
                  Preview and test HeliSocial safely without entering personal API keys or payment credentials:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
                  <div className="p-3.5 rounded-xl border border-stone-200 bg-stone-50">
                    <div className="flex items-center gap-2 font-semibold text-xs text-stone-900">
                      <CreditCard className="w-4 h-4 text-emerald-600" />
                      <span>Stripe Billing Mock</span>
                    </div>
                    <p className="text-xs text-stone-600 mt-1.5 leading-normal">
                      Plan changes and upgrades simulate checkout cycles instantly without processing real card
                      transactions. Ready for live Stripe webhooks via server endpoints when production keys are supplied.
                    </p>
                    <span className="inline-block mt-2 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      Safe Sandbox Active
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl border border-stone-200 bg-stone-50">
                    <div className="flex items-center gap-2 font-semibold text-xs text-stone-900">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <span>AI Studio Engine</span>
                    </div>
                    <p className="text-xs text-stone-600 mt-1.5 leading-normal">
                      Full multi-format content generation (LinkedIn, Carousels, X threads) functions in preview using an
                      intelligent local generator, or through the server-side Gemini 2.5 API if configured.
                    </p>
                    <span className="inline-block mt-2 text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                      Zero-Secret Preview Ready
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl border border-stone-200 bg-stone-50">
                    <div className="flex items-center gap-2 font-semibold text-xs text-stone-900">
                      <FileCheck2 className="w-4 h-4 text-blue-600" />
                      <span>Social Publishing Receipts</span>
                    </div>
                    <p className="text-xs text-stone-600 mt-1.5 leading-normal">
                      Generates authentic cryptographic publishing receipts with content SHA-256 signatures and execution
                      timestamps without requiring connected external social accounts.
                    </p>
                    <span className="inline-block mt-2 text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                      Self-Contained Engine
                    </span>
                  </div>
                </div>
              </div>

              {/* Section 3: Standalone Transferability Confirmation */}
              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-2">
                <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Standalone Commercial Asset Certification</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  HeliSocial is engineered as an entirely self-contained software asset ready for acquisition and transfer on
                  marketplaces such as Flippa:
                </p>
                <ul className="text-xs text-stone-700 space-y-1.5 list-disc pl-4">
                  <li>
                    <strong>Zero Personal Dependency:</strong> No hardcoded personal names, MaryChuks.com references, private
                    repos, or owner email addresses exist in the source code or server runtime.
                  </li>
                  <li>
                    <strong>Standardized Infrastructure:</strong> Built with Node.js/Express, React 19, TypeScript, and
                    Tailwind CSS with standard containerized port 3000 entry.
                  </li>
                  <li>
                    <strong>Clean Due Diligence Handover:</strong> A buyer simply connects their own domain, replaces the
                    environment variables in <code className="bg-stone-200 px-1 py-0.5 rounded">.env</code>, runs the database
                    migration, and immediately operates the business under their own brand.
                  </li>
                  <li>
                    <strong>Secret Hygiene:</strong> No secrets are exposed to client-side bundles, committed to git, or
                    printed in logs.
                  </li>
                </ul>
              </div>

              {/* Section 4: Complete Environment Variables Specification Table */}
              <div>
                <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-stone-700" />
                  Comprehensive Environment Variables Specification
                </h3>
                <p className="text-xs text-stone-600 mt-1">
                  Table of every environment variable with provider, preview necessity, and buyer replacement instructions:
                </p>

                <div className="mt-3 overflow-x-auto border border-stone-200 rounded-xl">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-stone-100 border-b border-stone-200 text-stone-700 font-semibold">
                        <th className="p-2.5">Variable Name</th>
                        <th className="p-2.5">Purpose & Description</th>
                        <th className="p-2.5">Provider</th>
                        <th className="p-2.5">Required for Preview</th>
                        <th className="p-2.5">Required for Production</th>
                        <th className="p-2.5">Sandbox / Test Available</th>
                        <th className="p-2.5">Buyer Acquisition Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200 text-stone-800">
                      <tr>
                        <td className="p-2.5 font-mono font-bold text-stone-900">NODE_ENV</td>
                        <td className="p-2.5">Runtime environment flag ('development' or 'production')</td>
                        <td className="p-2.5">Node.js</td>
                        <td className="p-2.5 text-stone-500">Auto-set</td>
                        <td className="p-2.5 font-semibold text-emerald-700">Yes ('production')</td>
                        <td className="p-2.5">N/A</td>
                        <td className="p-2.5">Keep as production</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-mono font-bold text-stone-900">PORT</td>
                        <td className="p-2.5">HTTP server listening port (standard 3000)</td>
                        <td className="p-2.5">Host / Container</td>
                        <td className="p-2.5 text-stone-500">Auto (3000)</td>
                        <td className="p-2.5 font-semibold text-emerald-700">Yes (3000)</td>
                        <td className="p-2.5">Yes</td>
                        <td className="p-2.5">Bind to container host port</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-mono font-bold text-stone-900">APP_URL</td>
                        <td className="p-2.5">Canonical public URL for email links, OAuth callbacks, receipts</td>
                        <td className="p-2.5">Buyer's Domain</td>
                        <td className="p-2.5 text-stone-500">No (defaults to localhost)</td>
                        <td className="p-2.5 font-semibold text-emerald-700">Yes</td>
                        <td className="p-2.5">Yes</td>
                        <td className="p-2.5">Set to buyer's custom domain (e.g. https://helisocial.com)</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-mono font-bold text-stone-900">JWT_SECRET</td>
                        <td className="p-2.5">Cryptographic secret for signing user session tokens</td>
                        <td className="p-2.5">Internal (Buyer)</td>
                        <td className="p-2.5 text-stone-500">No (mock session active)</td>
                        <td className="p-2.5 font-semibold text-emerald-700">Yes</td>
                        <td className="p-2.5">Yes (any 64-char hex)</td>
                        <td className="p-2.5">Buyer generates new 64-char random string via openssl rand -hex 32</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-mono font-bold text-stone-900">SESSION_SECRET</td>
                        <td className="p-2.5">Cryptographic secret for cookie and CSRF protection</td>
                        <td className="p-2.5">Internal (Buyer)</td>
                        <td className="p-2.5 text-stone-500">No (mock session active)</td>
                        <td className="p-2.5 font-semibold text-emerald-700">Yes</td>
                        <td className="p-2.5">Yes (any 64-char hex)</td>
                        <td className="p-2.5">Buyer generates new 64-char random string via openssl rand -hex 32</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-mono font-bold text-stone-900">DATABASE_URL</td>
                        <td className="p-2.5">PostgreSQL database connection string</td>
                        <td className="p-2.5">PostgreSQL / Cloud SQL / Neon / Supabase</td>
                        <td className="p-2.5 text-stone-500">No (in-memory mock store)</td>
                        <td className="p-2.5 font-semibold text-emerald-700">Yes</td>
                        <td className="p-2.5">Yes (local or free tier Postgres)</td>
                        <td className="p-2.5">Buyer provisions their own Postgres DB and enters URI</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-mono font-bold text-stone-900">GEMINI_API_KEY</td>
                        <td className="p-2.5">Server-side Google GenAI key for live AI Content Studio generation</td>
                        <td className="p-2.5">Google AI Studio</td>
                        <td className="p-2.5 text-stone-500">No (uses built-in smart mock)</td>
                        <td className="p-2.5 font-semibold text-emerald-700">Yes (for live AI)</td>
                        <td className="p-2.5 font-semibold text-emerald-700">Yes (free tier key)</td>
                        <td className="p-2.5">Buyer registers at aistudio.google.com and pastes their API key</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-mono font-bold text-stone-900">STRIPE_SECRET_KEY</td>
                        <td className="p-2.5">Stripe secret key for creating subscriptions and billing checkout</td>
                        <td className="p-2.5">Stripe</td>
                        <td className="p-2.5 text-stone-500">No (safe mock active)</td>
                        <td className="p-2.5 font-semibold text-emerald-700">Yes</td>
                        <td className="p-2.5 font-semibold text-emerald-700">Yes (Stripe Test Mode sk_test_...)</td>
                        <td className="p-2.5">Buyer creates Stripe account, enters their sk_live_... key</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-mono font-bold text-stone-900">STRIPE_WEBHOOK_SECRET</td>
                        <td className="p-2.5">Validates incoming subscription invoice and payment events</td>
                        <td className="p-2.5">Stripe</td>
                        <td className="p-2.5 text-stone-500">No (safe mock active)</td>
                        <td className="p-2.5 font-semibold text-emerald-700">Yes</td>
                        <td className="p-2.5 font-semibold text-emerald-700">Yes (Stripe CLI / Dashboard whsec_...)</td>
                        <td className="p-2.5">Buyer creates webhook endpoint in Stripe dashboard and pastes secret</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-mono font-bold text-stone-900">STRIPE_PRICE_ID_CREATOR</td>
                        <td className="p-2.5">Stripe recurring Price ID for Creator tier ($29/mo)</td>
                        <td className="p-2.5">Stripe Products</td>
                        <td className="p-2.5 text-stone-500">No</td>
                        <td className="p-2.5 font-semibold text-emerald-700">Yes</td>
                        <td className="p-2.5 font-semibold text-emerald-700">Yes (test price ID)</td>
                        <td className="p-2.5">Buyer creates product/price in Stripe and pastes ID</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-mono font-bold text-stone-900">STRIPE_PRICE_ID_BUSINESS</td>
                        <td className="p-2.5">Stripe recurring Price ID for Business tier ($79/mo)</td>
                        <td className="p-2.5">Stripe Products</td>
                        <td className="p-2.5 text-stone-500">No</td>
                        <td className="p-2.5 font-semibold text-emerald-700">Yes</td>
                        <td className="p-2.5 font-semibold text-emerald-700">Yes (test price ID)</td>
                        <td className="p-2.5">Buyer creates product/price in Stripe and pastes ID</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-mono font-bold text-stone-900">STRIPE_PRICE_ID_AGENCY</td>
                        <td className="p-2.5">Stripe recurring Price ID for Agency tier ($199/mo)</td>
                        <td className="p-2.5">Stripe Products</td>
                        <td className="p-2.5 text-stone-500">No</td>
                        <td className="p-2.5 font-semibold text-emerald-700">Yes</td>
                        <td className="p-2.5 font-semibold text-emerald-700">Yes (test price ID)</td>
                        <td className="p-2.5">Buyer creates product/price in Stripe and pastes ID</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-mono font-bold text-stone-900">LINKEDIN_CLIENT_ID</td>
                        <td className="p-2.5">OAuth 2.0 app client ID for external LinkedIn publishing</td>
                        <td className="p-2.5">LinkedIn Developer Portal</td>
                        <td className="p-2.5 text-stone-500">No (optional)</td>
                        <td className="p-2.5 text-stone-500">Optional</td>
                        <td className="p-2.5 font-semibold text-emerald-700">Yes</td>
                        <td className="p-2.5">Buyer creates app at developer.linkedin.com (optional)</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-mono font-bold text-stone-900">LINKEDIN_CLIENT_SECRET</td>
                        <td className="p-2.5">OAuth 2.0 app secret for external LinkedIn publishing</td>
                        <td className="p-2.5">LinkedIn Developer Portal</td>
                        <td className="p-2.5 text-stone-500">No (optional)</td>
                        <td className="p-2.5 text-stone-500">Optional</td>
                        <td className="p-2.5 font-semibold text-emerald-700">Yes</td>
                        <td className="p-2.5">Buyer enters secret from developer.linkedin.com (optional)</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-mono font-bold text-stone-900">X_CLIENT_ID</td>
                        <td className="p-2.5">OAuth 2.0 app client ID for external X (Twitter) publishing</td>
                        <td className="p-2.5">X Developer Portal</td>
                        <td className="p-2.5 text-stone-500">No (optional)</td>
                        <td className="p-2.5 text-stone-500">Optional</td>
                        <td className="p-2.5 font-semibold text-emerald-700">Yes</td>
                        <td className="p-2.5">Buyer creates app at developer.x.com (optional)</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-mono font-bold text-stone-900">X_CLIENT_SECRET</td>
                        <td className="p-2.5">OAuth 2.0 app secret for external X (Twitter) publishing</td>
                        <td className="p-2.5">X Developer Portal</td>
                        <td className="p-2.5 text-stone-500">No (optional)</td>
                        <td className="p-2.5 text-stone-500">Optional</td>
                        <td className="p-2.5 font-semibold text-emerald-700">Yes</td>
                        <td className="p-2.5">Buyer enters secret from developer.x.com (optional)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Section 5: Verification of Secret Protection */}
              <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/60">
                <div className="flex items-center gap-2 font-bold text-emerald-900 text-sm">
                  <Lock className="w-4 h-4 text-emerald-700" />
                  <span>Verified Security & Secret Protection Protocol</span>
                </div>
                <ul className="text-xs text-emerald-800 mt-2 space-y-1 list-disc pl-4">
                  <li>
                    <strong>No client-side leakage:</strong> No environment variable secrets are imported via{' '}
                    <code className="bg-emerald-100 px-1 py-0.5 rounded">import.meta.env.VITE_*</code> or exposed to the
                    browser DOM.
                  </li>
                  <li>
                    <strong>No committed secrets:</strong> All keys are defined exclusively in{' '}
                    <code className="bg-emerald-100 px-1 py-0.5 rounded">.env.example</code> with blank/placeholder tokens.
                  </li>
                  <li>
                    <strong>No secrets in logs or documentation:</strong> Server logs do not print API keys or secret
                    tokens. Handover and architectural documentation instruct buyers where to obtain their own keys.
                  </li>
                </ul>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-stone-100 px-6 py-4 border-t border-stone-200 flex items-center justify-between">
              <span className="text-xs text-stone-500">
                Ready for Flippa Due Diligence • Fully Independent Asset Architecture
              </span>
              <button
                id="btn-close-checkpoint-modal-footer"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 transition"
              >
                Close Checkpoint
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
