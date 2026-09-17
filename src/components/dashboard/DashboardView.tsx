import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Layers,
  FileCheck,
  Users,
  ArrowRight,
  TrendingUp,
  Share2,
  Bookmark,
  ExternalLink,
  Plus,
  Sliders,
  CheckCircle2,
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const {
    activeBusiness,
    scopedCampaigns,
    scopedReceipts,
    scopedAssets,
    posts,
    subscription,
    currentPlan,
    setActiveView,
    openProfile,
  } = useApp();

  const remainingCredits = subscription.aiCreditsTotal - subscription.aiCreditsUsed;
  const recentReceipts = scopedReceipts.slice(0, 4);
  const activeCampaigns = scopedCampaigns.filter((c) => c.status === 'ACTIVE').slice(0, 3);
  const communityPosts = posts.slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-6">
      {/* Active Business Banner Card */}
      <div className="relative overflow-hidden rounded-3xl border border-stone-200 bg-white p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={activeBusiness.avatarUrl}
              alt={activeBusiness.name}
              className="h-16 w-16 rounded-2xl object-cover ring-2 ring-amber-400/80 shadow-sm"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl font-bold tracking-tight text-stone-900">
                  {activeBusiness.name}
                </h1>
                <span className="rounded bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-900">
                  {currentPlan.name} Tier
                </span>
              </div>
              <div className="mt-0.5 flex items-center gap-2 text-xs text-stone-500">
                <span className="font-mono">@{activeBusiness.handle}</span>
                <span>·</span>
                <span>{activeBusiness.niche}</span>
                <span>·</span>
                <span className="text-emerald-700 font-semibold">{activeBusiness.followerCount.toLocaleString()} followers</span>
              </div>
              <p className="mt-2 text-xs text-stone-600 max-w-xl line-clamp-1">
                {activeBusiness.bio}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="dash-open-studio-btn"
              onClick={() => setActiveView('studio')}
              className="flex items-center gap-2 rounded-xl bg-stone-900 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-stone-800 shadow-sm"
            >
              <Sparkles className="h-4 w-4 text-amber-400" />
              <span>Launch AI Studio</span>
            </button>
            <button
              onClick={() => openProfile(activeBusiness.handle)}
              className="flex items-center gap-1.5 rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-xs font-semibold text-stone-700 hover:bg-stone-100 transition"
            >
              <span>Public Profile</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 4 Quick Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div
          onClick={() => setActiveView('studio')}
          className="cursor-pointer rounded-2xl border border-stone-200 bg-white p-5 shadow-xs transition hover:border-amber-400 group"
        >
          <div className="flex items-center justify-between text-stone-500 text-xs">
            <span>AI Studio Credits</span>
            <Sparkles className="h-4 w-4 text-amber-500 group-hover:scale-110 transition" />
          </div>
          <div className="mt-2 text-2xl font-serif font-bold text-stone-900">
            {remainingCredits}
          </div>
          <div className="mt-1 text-[11px] text-stone-400">
            of {subscription.aiCreditsTotal} monthly credits remaining
          </div>
        </div>

        <div
          onClick={() => setActiveView('campaigns')}
          className="cursor-pointer rounded-2xl border border-stone-200 bg-white p-5 shadow-xs transition hover:border-amber-400 group"
        >
          <div className="flex items-center justify-between text-stone-500 text-xs">
            <span>Active Campaigns</span>
            <Layers className="h-4 w-4 text-stone-400 group-hover:scale-110 transition" />
          </div>
          <div className="mt-2 text-2xl font-serif font-bold text-stone-900">
            {scopedCampaigns.length}
          </div>
          <div className="mt-1 text-[11px] text-stone-400">
            {scopedAssets.length} total structured assets generated
          </div>
        </div>

        <div
          onClick={() => setActiveView('receipts')}
          className="cursor-pointer rounded-2xl border border-stone-200 bg-white p-5 shadow-xs transition hover:border-amber-400 group"
        >
          <div className="flex items-center justify-between text-stone-500 text-xs">
            <span>Publishing Receipts</span>
            <FileCheck className="h-4 w-4 text-emerald-600 group-hover:scale-110 transition" />
          </div>
          <div className="mt-2 text-2xl font-serif font-bold text-stone-900">
            {scopedReceipts.length}
          </div>
          <div className="mt-1 text-[11px] text-emerald-700 font-medium">
            100% verified delivery audit
          </div>
        </div>

        <div
          onClick={() => setActiveView('community')}
          className="cursor-pointer rounded-2xl border border-stone-200 bg-white p-5 shadow-xs transition hover:border-amber-400 group"
        >
          <div className="flex items-center justify-between text-stone-500 text-xs">
            <span>Community Reach</span>
            <Users className="h-4 w-4 text-sky-600 group-hover:scale-110 transition" />
          </div>
          <div className="mt-2 text-2xl font-serif font-bold text-stone-900">
            {activeBusiness.followerCount.toLocaleString()}
          </div>
          <div className="mt-1 text-[11px] text-emerald-600 font-medium flex items-center">
            <TrendingUp className="h-3 w-3 mr-1" />
            <span>+14.2% monthly velocity</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Active Campaigns & Recent Receipts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column: Active Campaigns */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-lg font-bold text-stone-900">Active Campaigns</h2>
            <button
              onClick={() => setActiveView('campaigns')}
              className="text-xs font-semibold text-stone-600 hover:text-stone-900 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          <div className="space-y-3">
            {activeCampaigns.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-stone-200 bg-white p-8 text-center text-xs text-stone-400">
                No active campaigns. Create one in the Campaigns tab or directly from AI Studio!
              </div>
            ) : (
              activeCampaigns.map((cmp) => {
                const assetsCount = scopedAssets.filter((a) => a.campaignId === cmp.id).length;
                return (
                  <div
                    key={cmp.id}
                    className="flex items-center justify-between rounded-xl border border-stone-200 bg-white p-4 shadow-xs hover:border-stone-300 transition"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                          {cmp.status}
                        </span>
                        <span className="text-[10px] text-stone-400">{cmp.objective}</span>
                      </div>
                      <h3 className="mt-1 font-serif text-sm font-bold text-stone-900">{cmp.title}</h3>
                      <p className="text-xs text-stone-500 line-clamp-1">{cmp.description}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="rounded bg-stone-100 px-2.5 py-1 text-xs font-semibold text-stone-700">
                        {assetsCount} Assets
                      </span>
                      <button
                        onClick={() => setActiveView('studio')}
                        className="rounded-lg border border-stone-200 p-2 text-stone-500 hover:bg-stone-50"
                        title="Open in Studio"
                      >
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Recent Publishing Receipts */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-lg font-bold text-stone-900">Recent Receipts</h2>
            <button
              onClick={() => setActiveView('receipts')}
              className="text-xs font-semibold text-stone-600 hover:text-stone-900 flex items-center gap-1"
            >
              <span>Ledger</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          <div className="space-y-2.5">
            {recentReceipts.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-stone-200 bg-white p-8 text-center text-xs text-stone-400">
                No receipts generated yet.
              </div>
            ) : (
              recentReceipts.map((rec) => (
                <div
                  key={rec.id}
                  className="rounded-xl border border-stone-200 bg-white p-3 shadow-xs space-y-1 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-stone-900">
                      #{rec.id}
                    </span>
                    <span
                      className={`rounded px-1.5 py-0.5 text-[9px] font-bold ${
                        rec.status === 'EXTERNALLY_PUBLISHED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : rec.status === 'PUBLISHED_TO_HELISOCIAL'
                          ? 'bg-sky-100 text-sky-800'
                          : 'bg-stone-100 text-stone-700'
                      }`}
                    >
                      {rec.status}
                    </span>
                  </div>
                  <div className="font-semibold text-stone-800 truncate">{rec.assetTitle}</div>
                  <div className="flex items-center justify-between text-[10px] text-stone-400">
                    <span>{rec.destinationPlatform}</span>
                    <span>{new Date(rec.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
