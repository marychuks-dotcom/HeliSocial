import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Layers,
  FileCheck,
  Users,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Share2,
  Building2,
  TrendingUp,
} from 'lucide-react';

export const MarketingLandingView: React.FC = () => {
  const { setActiveView } = useApp();
  const [activeLegalModal, setActiveLegalModal] = useState<'TERMS' | 'PRIVACY' | 'GUIDELINES' | null>(null);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">
      {/* Top Banner */}
      <div className="bg-stone-900 px-4 py-2 text-center text-xs text-amber-400 font-medium">
        ✨ Announcing HeliSocial v2.4: 8-Slide LinkedIn Carousels & Publishing Receipts Ledger now live.
      </div>

      {/* Navigation */}
      <header className="border-b border-stone-200 bg-white/90 backdrop-blur-md sticky top-0 z-30">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-stone-900 text-amber-400">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="font-serif text-xl font-bold tracking-tight text-stone-900">
              Heli<span className="text-amber-600">Social</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveView('pricing')}
              className="text-xs font-semibold text-stone-600 hover:text-stone-900 px-3 py-1.5"
            >
              Pricing
            </button>
            <button
              onClick={() => setActiveView('dashboard')}
              className="flex items-center gap-1.5 rounded-lg bg-stone-900 px-4 py-2 text-xs font-semibold text-white hover:bg-stone-800 shadow-sm"
            >
              <span>Open Studio App</span>
              <ArrowRight className="h-3.5 w-3.5 text-amber-400" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="mx-auto max-w-5xl px-4 pt-16 pb-12 text-center sm:px-6 lg:px-8 space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-900">
          <Sparkles className="h-3.5 w-3.5 text-amber-600" />
          <span>The Creator Business Operating System</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-stone-900 leading-[1.1]">
          Create. Publish. <br />
          Connect. <span className="text-amber-600">Grow.</span>
        </h1>

        <p className="mx-auto max-w-2xl text-sm sm:text-base text-stone-600 leading-relaxed font-sans">
          Stop staring at blank social inputs. HeliSocial ingests whitepapers, blogs, and PDF research, conditioning them through your distinct brand voice to generate multi-format social suites with auditable receipts.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => setActiveView('studio')}
            className="flex items-center gap-2 rounded-xl bg-stone-900 px-6 py-3 text-xs sm:text-sm font-semibold text-white shadow-md hover:bg-stone-800 transition w-full sm:w-auto justify-center"
          >
            <Sparkles className="h-4 w-4 text-amber-400" />
            <span>Launch AI Content Studio</span>
          </button>
          <button
            onClick={() => setActiveView('community')}
            className="flex items-center gap-2 rounded-xl border border-stone-300 bg-white px-6 py-3 text-xs sm:text-sm font-semibold text-stone-800 shadow-xs hover:bg-stone-100 transition w-full sm:w-auto justify-center"
          >
            <Users className="h-4 w-4 text-stone-500" />
            <span>Explore Creator Community</span>
          </button>
        </div>
      </section>

      {/* The Core Product Loop (Interactive Diagram) */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-stone-200 bg-white p-8 shadow-xs space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600">
              The Proprietary Growth Architecture
            </span>
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              The 9-Stage Creator Flywheel
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-4 text-xs">
            <div className="rounded-xl border border-stone-200 bg-stone-50 p-4 space-y-1.5">
              <span className="font-mono text-[10px] text-amber-600 font-bold">01. INGEST</span>
              <h4 className="font-bold text-stone-900">Source Intake</h4>
              <p className="text-stone-500 text-[11px]">PDFs, research URLs, raw case studies, or thesis topics.</p>
            </div>

            <div className="rounded-xl border border-stone-200 bg-stone-50 p-4 space-y-1.5">
              <span className="font-mono text-[10px] text-amber-600 font-bold">02. SYNTHESIZE</span>
              <h4 className="font-bold text-stone-900">AI Studio</h4>
              <p className="text-stone-500 text-[11px]">Conditioned by brand archetypes, forbidden terms, and tone.</p>
            </div>

            <div className="rounded-xl border border-stone-200 bg-stone-50 p-4 space-y-1.5">
              <span className="font-mono text-[10px] text-amber-600 font-bold">03. AUDIT</span>
              <h4 className="font-bold text-stone-900">Publish Receipts</h4>
              <p className="text-stone-500 text-[11px]">Every publish yields a cryptographic delivery receipt.</p>
            </div>

            <div className="rounded-xl border border-stone-200 bg-stone-50 p-4 space-y-1.5">
              <span className="font-mono text-[10px] text-amber-600 font-bold">04. BROADCAST</span>
              <h4 className="font-bold text-stone-900">Community Exchange</h4>
              <p className="text-stone-500 text-[11px]">Feed distribution, topic tagging, reactions, and saves.</p>
            </div>

            <div className="rounded-xl border border-stone-200 bg-stone-50 p-4 space-y-1.5">
              <span className="font-mono text-[10px] text-amber-600 font-bold">05. COMPOUND</span>
              <h4 className="font-bold text-stone-900">Analytics & MRR</h4>
              <p className="text-stone-500 text-[11px]">Track follower velocity and business subscriber retention.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Feature Pillars */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
              <Building2 className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Multi-Tenant Dual Identity
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Maintain a human user account while managing multiple independent Creator Businesses. Each workspace maintains its own brand archetype, campaigns, followers, and publishing receipts.
            </p>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sky-800">
              <Sparkles className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-900">
              6-Card Structured Repurposing Studio
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              No generic chatbot outputs. HeliSocial outputs structured LinkedIn posts (hook/body/CTA), 8-slide swipeable carousels with visual layout notes, numbered X threads, and viral hooks.
            </p>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
              <FileCheck className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Auditable Publishing Receipts
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Never wonder where an asset went. HeliSocial generates an immutable publishing receipt with status codes (SAVED, PUBLISHED_TO_HELISOCIAL, EXTERNALLY_PUBLISHED) and external URL links.
            </p>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-900 text-amber-400">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Turnkey Legal & Creator Independence
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Zero hardcoded personal accounts or creator identities. Zero-code runtime environment re-keying for database, Stripe, and AI inference. Built for complete asset liquidity and Flippa due diligence.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white py-8 text-xs text-stone-500">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-stone-900">HeliSocial OS</span>
            <span>© 2026. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveLegalModal('TERMS')}
              className="hover:text-stone-900"
            >
              Terms of Service
            </button>
            <button
              onClick={() => setActiveLegalModal('PRIVACY')}
              className="hover:text-stone-900"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setActiveLegalModal('GUIDELINES')}
              className="hover:text-stone-900"
            >
              Community Standards
            </button>
          </div>
        </div>
      </footer>

      {/* Legal Information Modal */}
      {activeLegalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl border border-stone-200 bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-serif text-base font-bold text-stone-900">
                {activeLegalModal === 'TERMS' && 'Terms of Service'}
                {activeLegalModal === 'PRIVACY' && 'Privacy Policy'}
                {activeLegalModal === 'GUIDELINES' && 'Community Guidelines'}
              </h3>
              <button
                onClick={() => setActiveLegalModal(null)}
                className="text-stone-400 hover:text-stone-700 font-bold"
              >
                ✕
              </button>
            </div>
            <div className="text-xs text-stone-600 leading-relaxed max-h-72 overflow-y-auto space-y-2">
              <p>
                HeliSocial provides multi-tenant creator business management, AI content conditioning, and public community exchange services.
              </p>
              <p>
                <strong>Zero Personal Identity Guarantee:</strong> This application utilizes standard RFC 2606 reserved domains and example data. All mock accounts and administrative profiles are strictly decoupled from personal creators.
              </p>
              <p>
                <strong>Audit Compliance:</strong> Every publication action produces a permanent cryptographic receipt record accessible via the Publishing Receipts ledger.
              </p>
            </div>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveLegalModal(null)}
                className="rounded-lg bg-stone-900 px-4 py-1.5 text-xs font-semibold text-white hover:bg-stone-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
