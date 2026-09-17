import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  BarChart3,
  TrendingUp,
  Users,
  Sparkles,
  FileCheck,
  Share2,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const { activeBusiness, scopedReceipts, scopedCampaigns, posts, subscription } = useApp();

  const businessPosts = posts.filter((p) => p.businessHandle === activeBusiness.handle);
  const totalReactions = businessPosts.reduce(
    (acc, p) => acc + p.reactions.LIKE + p.reactions.INSIGHTFUL + p.reactions.FIRE + p.reactions.CLAP,
    0
  );
  const totalComments = businessPosts.reduce((acc, p) => acc + p.commentCount, 0);
  const totalSaves = businessPosts.reduce((acc, p) => acc + p.saveCount, 0);

  const publishedReceipts = scopedReceipts.filter(
    (r) => r.status === 'EXTERNALLY_PUBLISHED' || r.status === 'PUBLISHED_TO_HELISOCIAL'
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-stone-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-stone-900 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-400">
              Business Performance
            </span>
            <span className="text-xs text-stone-500 font-medium">
              Analytics for @{activeBusiness.handle}
            </span>
          </div>
          <h1 className="mt-1 font-serif text-2xl font-bold tracking-tight text-stone-900">
            Creator Business Telemetry
          </h1>
          <p className="text-xs text-stone-600">
            Real-time attribution, audience growth velocity, AI credit consumption ROI, and distribution metrics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-lg bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-xs font-semibold text-emerald-800">
            30-Day Growth: +14.2%
          </span>
        </div>
      </div>

      {/* 4 Metric Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 text-xs">
            <span>Verified Followers</span>
            <Users className="h-4 w-4 text-stone-400" />
          </div>
          <div className="mt-2 text-2xl font-serif font-bold text-stone-900">
            {activeBusiness.followerCount.toLocaleString()}
          </div>
          <div className="mt-1 flex items-center text-[11px] text-emerald-600 font-medium">
            <TrendingUp className="h-3 w-3 mr-1" />
            <span>+180 followers this week</span>
          </div>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 text-xs">
            <span>Audience Engagements</span>
            <Share2 className="h-4 w-4 text-stone-400" />
          </div>
          <div className="mt-2 text-2xl font-serif font-bold text-stone-900">
            {(totalReactions + totalComments + totalSaves).toLocaleString()}
          </div>
          <div className="mt-1 text-[11px] text-stone-500">
            {totalReactions} reactions · {totalComments} comments · {totalSaves} saves
          </div>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 text-xs">
            <span>Verified Publishing Receipts</span>
            <FileCheck className="h-4 w-4 text-stone-400" />
          </div>
          <div className="mt-2 text-2xl font-serif font-bold text-stone-900">
            {publishedReceipts.length}
          </div>
          <div className="mt-1 text-[11px] text-emerald-600 font-medium">
            <span>100% cryptographic delivery audit</span>
          </div>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 text-xs">
            <span>Active Campaigns</span>
            <Sparkles className="h-4 w-4 text-stone-400" />
          </div>
          <div className="mt-2 text-2xl font-serif font-bold text-stone-900">
            {scopedCampaigns.length}
          </div>
          <div className="mt-1 text-[11px] text-stone-500">
            {scopedCampaigns.filter((c) => c.status === 'ACTIVE').length} currently active
          </div>
        </div>
      </div>

      {/* Deep Dives: Platform Distribution & Top Performing Posts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left: Platform Distribution Breakdown */}
        <div className="lg:col-span-6 rounded-2xl border border-stone-200 bg-white p-5 shadow-xs space-y-4">
          <h3 className="font-serif text-base font-bold text-stone-900">
            Content Distribution Velocity
          </h3>
          <p className="text-xs text-stone-500">
            Breakdown of structured assets published across HeliSocial, LinkedIn, and X.
          </p>

          <div className="space-y-3 pt-2">
            <div>
              <div className="flex justify-between text-xs font-medium text-stone-700 mb-1">
                <span>HeliSocial Internal Community</span>
                <span>54% (High signal retention)</span>
              </div>
              <div className="h-2 w-full rounded-full bg-stone-100 overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '54%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-stone-700 mb-1">
                <span>LinkedIn Carousel & Long-Form</span>
                <span>32% (B2B executive discovery)</span>
              </div>
              <div className="h-2 w-full rounded-full bg-stone-100 overflow-hidden">
                <div className="h-full bg-sky-700 rounded-full" style={{ width: '32%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-stone-700 mb-1">
                <span>X / Threads Structured Threads</span>
                <span>14% (Viral conversation hooks)</span>
              </div>
              <div className="h-2 w-full rounded-full bg-stone-100 overflow-hidden">
                <div className="h-full bg-stone-900 rounded-full" style={{ width: '14%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Right: AI Repurposing Efficiency */}
        <div className="lg:col-span-6 rounded-2xl border border-stone-200 bg-white p-5 shadow-xs space-y-4">
          <h3 className="font-serif text-base font-bold text-stone-900">
            AI Studio ROI & Leverage
          </h3>
          <p className="text-xs text-stone-500">
            Estimated creator hours saved by synthesizing long-form sources into 6 structured asset formats.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="rounded-xl border border-stone-100 bg-stone-50 p-3.5">
              <div className="text-[11px] text-stone-500 font-medium">Hours Saved (30d)</div>
              <div className="mt-1 text-2xl font-bold font-serif text-stone-900">46.5 hrs</div>
              <div className="text-[10px] text-stone-400 mt-0.5">~11 hrs / campaign</div>
            </div>
            <div className="rounded-xl border border-stone-100 bg-stone-50 p-3.5">
              <div className="text-[11px] text-stone-500 font-medium">Asset Yield Ratio</div>
              <div className="mt-1 text-2xl font-bold font-serif text-stone-900">7.2x</div>
              <div className="text-[10px] text-stone-400 mt-0.5">Outputs per source doc</div>
            </div>
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-3 text-xs text-amber-900">
            <strong>Repurposing Flywheel:</strong> Ingesting 1 comprehensive whitepaper or article generates an average of 8 carousel slides, 5 tweets, and 3 viral hooks with verified receipts.
          </div>
        </div>
      </div>
    </div>
  );
};
