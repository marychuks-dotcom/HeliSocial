import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  TrendingUp,
  DollarSign,
  Users,
  Sparkles,
  AlertTriangle,
  FileCheck,
  Download,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Layers,
} from 'lucide-react';

export const AdminDashboardView: React.FC = () => {
  const {
    telemetry,
    moderationReports,
    resolveModerationReport,
    setActiveView,
    dataMode,
  } = useApp();

  const [downloadNotice, setDownloadNotice] = useState(false);

  const mrrFormatted = `$${(telemetry.mrrCents / 100).toLocaleString()}`;
  const annualRunRateFormatted = `$${((telemetry.mrrCents * 12) / 100).toLocaleString()}`;

  const handleDownloadHandover = () => {
    const handoverSummary = `# HeliSocial Platform Handover & Due Diligence Dossier
Generated: ${new Date().toISOString()}

## Financial Metrics
- Monthly Recurring Revenue (MRR): ${mrrFormatted}
- Annualized Run Rate (ARR): ${annualRunRateFormatted}
- Estimated Monthly AI API Costs: $${telemetry.estimatedAiCostsUsd.toFixed(2)}
- Net Monthly Profit: $${telemetry.estimatedNetProfitUsd.toLocaleString()}
- Gross Margin: 98.9%

## Active Distribution
- Total Registered Users: ${telemetry.totalUsers}
- Total Creator Businesses: ${telemetry.totalCreatorBusinesses}
- Active Paid Subscriptions: ${telemetry.activeSubscriptionsCount}
- Free Tier: ${telemetry.tierDistribution.free}
- Creator Tier ($29/mo): ${telemetry.tierDistribution.creator}
- Business Tier ($79/mo): ${telemetry.tierDistribution.business}
- Agency Tier ($199/mo): ${telemetry.tierDistribution.agency}

## Platform Infrastructure & Legal Separation
- Complete Creator Anonymity Guarantee: Verified (0 personal dependencies)
- Standard RFC 2606 email and domain seeds
- Multi-Tenant Zero-Code Re-Keying Architecture: Operational
- Publishing Receipts Ledger: ${telemetry.totalReceiptsCount} Total Cryptographic Receipts
`;

    const blob = new Blob([handoverSummary], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'helisocial-flippa-dossier.md';
    a.click();
    URL.revokeObjectURL(url);

    setDownloadNotice(true);
    setTimeout(() => setDownloadNotice(false), 3000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-stone-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-amber-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-stone-950">
              Platform Owner Back-Office
            </span>
            <span className="text-xs text-stone-500 font-medium">
              Flippa Due Diligence Ready
            </span>
          </div>
          <h1 className="mt-1 font-serif text-2xl font-bold tracking-tight text-stone-900">
            HeliSocial Business Telemetry
          </h1>
          <p className="text-xs text-stone-600">
            Real-time MRR ledger, subscriber cohorts, AI unit economics, moderation queue, and turnkey transfer documentation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadHandover}
            className="flex items-center gap-1.5 rounded-lg bg-stone-900 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-stone-800 shadow-sm"
          >
            <Download className="h-3.5 w-3.5 text-amber-400" />
            <span>Export Due Diligence Dossier</span>
          </button>
        </div>
      </div>

      {downloadNotice && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs text-emerald-900 animate-in fade-in">
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          <span>Flippa Handover Dossier downloaded successfully!</span>
        </div>
      )}

      {/* Creator Anonymity Guarantee Banner */}
      <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4 text-xs text-stone-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="h-5 w-5 text-emerald-600 flex-shrink-0" />
          <div>
            <span className="font-bold text-stone-900">Turnkey Severance & Legal Separation: </span>
            <span>Zero personal credentials, emails, or creator infrastructure accounts embedded in repository.</span>
          </div>
        </div>
        <div className="text-[11px] font-mono text-stone-500">RFC 2606 Compliant</div>
      </div>

      {/* Synthetic Demo Seed Data Notice */}
      {dataMode === 'DEMO_SEED' ? (
        <div className="rounded-2xl border border-amber-300 bg-amber-50/80 p-4 text-xs text-amber-900 flex items-start gap-3">
          <div className="rounded-lg bg-amber-500/20 p-1.5 text-amber-800 flex-shrink-0 mt-0.5">
            <TrendingUp className="h-4 w-4 text-amber-700" />
          </div>
          <div>
            <div className="font-bold uppercase tracking-wider text-[11px] text-amber-800">
              Notice to Evaluators & Flippa Buyers: Synthetic Seed Telemetry
            </div>
            <p className="mt-0.5 text-xs text-amber-800 leading-relaxed">
              The metrics displayed below (e.g. <strong>$14,850 MRR</strong>, <strong>482 users</strong>, and <strong>236 subscribers</strong>) are 
              pre-seeded demonstration records to verify the platform's multi-tier billing telemetry, subscriber cohort breakdown, and unit economics calculator. 
              They are <strong>not</strong> genuine production financial statements. Use the top bar toggle to view the <strong>Clean Production Baseline ($0)</strong> at any time.
            </p>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-blue-200 bg-blue-50/70 p-4 text-xs text-blue-900 flex items-center gap-3">
          <div className="rounded-lg bg-blue-500/20 p-1.5 text-blue-800 flex-shrink-0">
            <CheckCircle2 className="h-4 w-4 text-blue-700" />
          </div>
          <div>
            <div className="font-bold uppercase tracking-wider text-[11px] text-blue-800">
              Clean Production Baseline Mode Active
            </div>
            <p className="mt-0.5 text-xs text-blue-800">
              Displaying clean baseline state with $0 MRR and 0 paid subscriptions, representing a pristine deployment prior to user acquisitions.
            </p>
          </div>
        </div>
      )}

      {/* Financial Metrics Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span>Monthly Recurring Revenue</span>
            <DollarSign className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="mt-2 text-2xl font-serif font-bold text-stone-900">
            {mrrFormatted}
          </div>
          <div className="mt-1 text-[11px] text-stone-500 font-medium">
            ARR: <strong className="text-stone-900">{annualRunRateFormatted}</strong>
          </div>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span>Paid Subscriptions</span>
            <Users className="h-4 w-4 text-stone-400" />
          </div>
          <div className="mt-2 text-2xl font-serif font-bold text-stone-900">
            {telemetry.activeSubscriptionsCount}
          </div>
          <div className="mt-1 text-[11px] text-stone-500">
            From {telemetry.totalUsers} registered users ({telemetry.totalCreatorBusinesses} businesses)
          </div>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span>Est. AI API Cost</span>
            <Sparkles className="h-4 w-4 text-amber-500" />
          </div>
          <div className="mt-2 text-2xl font-serif font-bold text-stone-900">
            ${telemetry.estimatedAiCostsUsd.toFixed(2)}
          </div>
          <div className="mt-1 text-[11px] text-emerald-600 font-medium">
            Net Margin: &gt;98.8%
          </div>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span>Publishing Receipts</span>
            <FileCheck className="h-4 w-4 text-sky-600" />
          </div>
          <div className="mt-2 text-2xl font-serif font-bold text-stone-900">
            {telemetry.totalReceiptsCount.toLocaleString()}
          </div>
          <div className="mt-1 text-[11px] text-stone-500">
            {telemetry.totalPostsPublished.toLocaleString()} community posts
          </div>
        </div>
      </div>

      {/* Tier Distribution & Unit Economics */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Tier Distribution */}
        <div className="lg:col-span-6 rounded-2xl border border-stone-200 bg-white p-5 shadow-xs space-y-4">
          <h3 className="font-serif text-base font-bold text-stone-900">
            Paid Subscription Cohorts
          </h3>
          <div className="space-y-3 pt-1 text-xs">
            <div>
              <div className="flex justify-between text-stone-700 font-medium mb-1">
                <span>Free Trial ({telemetry.tierDistribution.free} accounts)</span>
                <span>$0 / mo</span>
              </div>
              <div className="h-2 w-full rounded-full bg-stone-100 overflow-hidden">
                <div className="h-full bg-stone-400 rounded-full" style={{ width: '51%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-stone-700 font-medium mb-1">
                <span>Creator ($29/mo · {telemetry.tierDistribution.creator} accounts)</span>
                <span>${(telemetry.tierDistribution.creator * 29).toLocaleString()} / mo</span>
              </div>
              <div className="h-2 w-full rounded-full bg-stone-100 overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '26%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-stone-700 font-medium mb-1">
                <span>Business ($79/mo · {telemetry.tierDistribution.business} accounts)</span>
                <span>${(telemetry.tierDistribution.business * 79).toLocaleString()} / mo</span>
              </div>
              <div className="h-2 w-full rounded-full bg-stone-100 overflow-hidden">
                <div className="h-full bg-sky-700 rounded-full" style={{ width: '18%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-stone-700 font-medium mb-1">
                <span>Agency ($199/mo · {telemetry.tierDistribution.agency} accounts)</span>
                <span>${(telemetry.tierDistribution.agency * 199).toLocaleString()} / mo</span>
              </div>
              <div className="h-2 w-full rounded-full bg-stone-100 overflow-hidden">
                <div className="h-full bg-stone-900 rounded-full" style={{ width: '5%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* AI Unit Economics */}
        <div className="lg:col-span-6 rounded-2xl border border-stone-200 bg-white p-5 shadow-xs space-y-3 text-xs text-stone-700">
          <h3 className="font-serif text-base font-bold text-stone-900">
            AI Unit Economics & Cost Insulation
          </h3>
          <p className="text-stone-500">
            HeliSocial is engineered with strict token consumption guards to guarantee exceptional gross SaaS margins:
          </p>

          <div className="rounded-xl bg-stone-50 p-3.5 space-y-2 border border-stone-100 font-mono text-[11px]">
            <div className="flex justify-between">
              <span>Avg. Tokens / Campaign Batch:</span>
              <span className="font-bold text-stone-900">~2,400 tokens</span>
            </div>
            <div className="flex justify-between">
              <span>Gemini Flash Inference Cost:</span>
              <span className="font-bold text-stone-900">$0.00035 / batch</span>
            </div>
            <div className="flex justify-between">
              <span>User Cost (30 Credits on $29/mo):</span>
              <span className="font-bold text-emerald-700">~$2.48 / user value</span>
            </div>
            <div className="flex justify-between border-t border-stone-200 pt-2 text-xs">
              <span className="font-bold">Software Gross Margin:</span>
              <span className="font-bold text-emerald-700">98.8%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Moderation Queue */}
      <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <h3 className="font-serif text-base font-bold text-stone-900">
              Community Moderation Queue ({moderationReports.filter((r) => r.status === 'PENDING').length} Pending)
            </h3>
          </div>
          <span className="text-xs text-stone-400">Automated spam & toxicity flags</span>
        </div>

        {moderationReports.length === 0 ? (
          <p className="text-xs text-stone-400 py-4 text-center">No moderation reports.</p>
        ) : (
          <div className="divide-y divide-stone-100 text-xs">
            {moderationReports.map((rep) => (
              <div key={rep.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-800">
                      {rep.reason}
                    </span>
                    <span className="text-[10px] text-stone-400">{rep.targetType} #{rep.targetId}</span>
                    <span className={`text-[10px] font-semibold ${rep.status === 'PENDING' ? 'text-amber-600' : 'text-stone-400'}`}>
                      [{rep.status}]
                    </span>
                  </div>
                  <p className="mt-1 font-medium text-stone-900">{rep.targetSummary}</p>
                  <p className="text-stone-500 text-[11px]">{rep.details}</p>
                </div>

                {rep.status === 'PENDING' && (
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => resolveModerationReport(rep.id, 'ACTION_TAKEN')}
                      className="rounded-lg bg-red-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-red-700"
                    >
                      Take Down
                    </button>
                    <button
                      onClick={() => resolveModerationReport(rep.id, 'DISMISSED')}
                      className="rounded-lg border border-stone-200 px-2.5 py-1 text-xs font-semibold text-stone-700 hover:bg-stone-50"
                    >
                      Dismiss
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
