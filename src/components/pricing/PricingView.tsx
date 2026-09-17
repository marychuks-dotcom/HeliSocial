import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PlanId } from '../../types';
import { Check, Sparkles, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export const PricingView: React.FC = () => {
  const { plans, currentPlan, upgradePlan, subscription } = useApp();
  const [upgradedNotice, setUpgradedNotice] = useState<string | null>(null);

  const handleUpgrade = (planId: PlanId) => {
    upgradePlan(planId);
    setUpgradedNotice(`Upgraded to ${plans.find((p) => p.id === planId)?.name} plan! Entitlements and AI credits unlocked.`);
    setTimeout(() => setUpgradedNotice(null), 3500);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-900">
          Transparent Pricing & Entitlements
        </span>
        <h1 className="font-serif text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
          Scale Your Creator Business Operating System
        </h1>
        <p className="text-xs sm:text-sm text-stone-600">
          Unlock multi-tenant business workspaces, structured AI studio credits, and cryptographic publishing receipts.
        </p>
      </div>

      {upgradedNotice && (
        <div className="mx-auto max-w-xl flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs font-semibold text-emerald-900 animate-in fade-in">
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          <span>{upgradedNotice}</span>
        </div>
      )}

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {plans.map((plan) => {
          const isCurrent = plan.id === currentPlan.id;

          return (
            <div
              key={plan.id}
              className={`relative flex flex-col justify-between rounded-3xl border p-6 transition shadow-xs ${
                isCurrent
                  ? 'border-stone-900 bg-white ring-2 ring-stone-900'
                  : plan.badge
                  ? 'border-amber-400 bg-white shadow-md'
                  : 'border-stone-200 bg-white hover:border-stone-300'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-amber-500 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-stone-950 shadow-sm">
                  {plan.badge}
                </div>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-bold text-stone-900">{plan.name}</h3>
                  {isCurrent && (
                    <span className="rounded bg-stone-100 px-2 py-0.5 text-[10px] font-bold text-stone-800">
                      CURRENT
                    </span>
                  )}
                </div>

                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-serif text-3xl font-bold text-stone-900">
                    ${plan.monthlyPrice}
                  </span>
                  <span className="text-xs text-stone-500">/ month</span>
                </div>

                <p className="mt-2 text-xs text-stone-600 leading-relaxed min-h-[36px]">
                  {plan.description}
                </p>

                {/* Feature checklist */}
                <div className="mt-6 space-y-2.5 border-t border-stone-100 pt-5 text-xs text-stone-700">
                  <div className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-amber-600 flex-shrink-0" />
                    <span><strong>{plan.maxBusinesses}</strong> Creator Business Workspace{plan.maxBusinesses > 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-amber-600 flex-shrink-0" />
                    <span><strong>{plan.monthlyAiCredits}</strong> AI Studio Credits / mo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-amber-600 flex-shrink-0" />
                    <span>{plan.storageMb} MB Asset Storage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-amber-600 flex-shrink-0" />
                    <span>HeliSocial Community Network</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className={`h-3.5 w-3.5 ${plan.hasExternalPublishing ? 'text-amber-600' : 'text-stone-300'}`} />
                    <span className={plan.hasExternalPublishing ? '' : 'text-stone-400'}>
                      External Social Publishing (LinkedIn & X)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className={`h-3.5 w-3.5 ${plan.hasAnalytics ? 'text-amber-600' : 'text-stone-300'}`} />
                    <span className={plan.hasAnalytics ? '' : 'text-stone-400'}>
                      Telemetry & Follower Analytics
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-stone-100 pt-4">
                {isCurrent ? (
                  <button
                    disabled
                    className="w-full rounded-xl bg-stone-100 py-2 text-xs font-bold text-stone-500 cursor-default"
                  >
                    Active Plan
                  </button>
                ) : (
                  <button
                    onClick={() => handleUpgrade(plan.id)}
                    className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-stone-900 py-2 text-xs font-semibold text-white transition hover:bg-stone-800 shadow-sm"
                  >
                    <span>{plan.monthlyPrice === 0 ? 'Downgrade to Free' : `Upgrade to ${plan.name}`}</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Enterprise / Stripe Guarantee */}
      <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5 text-center text-xs text-stone-600 max-w-3xl mx-auto space-y-1">
        <div className="flex items-center justify-center gap-2 font-semibold text-stone-900">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          <span>Turnkey Stripe Billing Integration</span>
        </div>
        <p>
          Instant proration, zero code modifications required for account re-keying, and auditable subscription records.
        </p>
      </div>
    </div>
  );
};
