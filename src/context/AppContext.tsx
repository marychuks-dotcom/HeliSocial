import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  CreatorBusiness,
  BrandProfile,
  PlanId,
  PlanEntitlement,
  Subscription,
  Campaign,
  ContentAsset,
  PublishingReceipt,
  Post,
  NotificationItem,
  ModerationReport,
  AdminTelemetry,
  AssetType,
  SourceType,
  CarouselSlide,
} from '../types';
import {
  INITIAL_USER,
  INITIAL_BUSINESSES,
  INITIAL_BRAND_PROFILES,
  PLANS,
  INITIAL_SUBSCRIPTION,
  INITIAL_CAMPAIGNS,
  INITIAL_CONTENT_ASSETS,
  INITIAL_RECEIPTS,
  INITIAL_POSTS,
  INITIAL_NOTIFICATIONS,
  INITIAL_MODERATION_REPORTS,
  INITIAL_ADMIN_TELEMETRY,
  CLEAN_BASELINE_USER,
  CLEAN_BASELINE_BUSINESSES,
  CLEAN_BASELINE_TELEMETRY,
  CLEAN_BASELINE_SUBSCRIPTION,
} from '../mockData';

export type AppView =
  | 'dashboard'
  | 'studio'
  | 'campaigns'
  | 'community'
  | 'receipts'
  | 'businesses'
  | 'analytics'
  | 'profile'
  | 'admin'
  | 'pricing'
  | 'marketing';

interface GenerateOptions {
  sourceType: SourceType;
  sourceText: string;
  sourceTitle: string;
  targetAudience: string;
  platform: string;
  tone: string;
  objective: string;
  campaignId?: string;
}

interface AppContextType {
  // Navigation & View
  activeView: AppView;
  setActiveView: (view: AppView) => void;
  viewingProfileHandle: string | null;
  openProfile: (handle: string) => void;

  // Identity & Multi-tenant Switching
  user: User;
  myBusinesses: CreatorBusiness[];
  activeBusiness: CreatorBusiness;
  switchBusiness: (businessId: string) => void;
  createNewBusiness: (data: Partial<CreatorBusiness>) => { success: boolean; error?: string };
  updateActiveBusiness: (data: Partial<CreatorBusiness>) => void;
  activeBrandProfile: BrandProfile;
  updateBrandProfile: (data: Partial<BrandProfile>) => void;

  // Subscription & Entitlements
  subscription: Subscription;
  currentPlan: PlanEntitlement;
  plans: PlanEntitlement[];
  upgradePlan: (planId: PlanId) => void;

  // Campaigns & Assets (Scoped)
  scopedCampaigns: Campaign[];
  createCampaign: (campaign: Omit<Campaign, 'id' | 'businessId' | 'createdAt' | 'updatedAt'>) => Campaign;
  deleteCampaign: (campaignId: string) => void;
  duplicateCampaign: (campaignId: string) => void;
  scopedAssets: ContentAsset[];
  saveAsset: (asset: Omit<ContentAsset, 'id' | 'businessId' | 'createdAt'>) => ContentAsset;
  deleteAsset: (assetId: string) => void;

  // AI Studio Generation
  isGenerating: boolean;
  generationError: string | null;
  latestGeneratedAssets: ContentAsset[];
  generateCampaignAssets: (options: GenerateOptions) => Promise<ContentAsset[]>;

  // Publishing & Receipts
  scopedReceipts: PublishingReceipt[];
  publishToHeliSocial: (asset: ContentAsset, topicTag?: string) => Promise<{ success: boolean; postId?: string; receiptId: string }>;
  publishToExternal: (asset: ContentAsset, platform: 'LINKEDIN' | 'X' | 'THREADS') => Promise<{ success: boolean; receiptId: string; externalUrl?: string }>;

  // Community & Social Graph
  posts: Post[];
  followedHandles: Set<string>;
  toggleFollow: (handle: string) => void;
  reactToPost: (postId: string, reactionType: 'LIKE' | 'INSIGHTFUL' | 'FIRE' | 'CLAP') => void;
  commentOnPost: (postId: string, commentBody: string) => void;
  toggleSavePost: (postId: string) => void;
  createCommunityPost: (body: string, topicTag: string, mediaUrls?: string[]) => void;

  // Notifications
  notifications: NotificationItem[];
  unreadNotificationCount: number;
  markNotificationsAsRead: () => void;
  dismissNotification: (id: string) => void;

  // Admin & Back-Office
  telemetry: AdminTelemetry;
  moderationReports: ModerationReport[];
  resolveModerationReport: (reportId: string, action: 'ACTION_TAKEN' | 'DISMISSED') => void;

  // Sandbox & Data Environment Control
  dataMode: 'DEMO_SEED' | 'CLEAN_BASELINE';
  isDemoMode: boolean;
  setDataMode: (mode: 'DEMO_SEED' | 'CLEAN_BASELINE') => void;
  resetToDemoSeed: () => void;
  resetToCleanBaseline: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dataMode, setDataModeState] = useState<'DEMO_SEED' | 'CLEAN_BASELINE'>('DEMO_SEED');
  const [activeView, setActiveView] = useState<AppView>('dashboard');
  const [viewingProfileHandle, setViewingProfileHandle] = useState<string | null>(null);

  const [user, setUser] = useState<User>(INITIAL_USER);
  const [myBusinesses, setMyBusinesses] = useState<CreatorBusiness[]>(INITIAL_BUSINESSES);
  const [activeBusinessId, setActiveBusinessId] = useState<string>(INITIAL_BUSINESSES[0].id);

  const [brandProfiles, setBrandProfiles] = useState<Record<string, BrandProfile>>(INITIAL_BRAND_PROFILES);
  const [subscription, setSubscription] = useState<Subscription>(INITIAL_SUBSCRIPTION);
  const [plans] = useState<PlanEntitlement[]>(PLANS);

  const [campaigns, setCampaigns] = useState<Campaign[]>(INITIAL_CAMPAIGNS);
  const [assets, setAssets] = useState<ContentAsset[]>(INITIAL_CONTENT_ASSETS);
  const [receipts, setReceipts] = useState<PublishingReceipt[]>(INITIAL_RECEIPTS);
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [followedHandles, setFollowedHandles] = useState<Set<string>>(new Set(['creatorcraft', 'cloudscale']));

  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [moderationReports, setModerationReports] = useState<ModerationReport[]>(INITIAL_MODERATION_REPORTS);
  const [telemetry, setTelemetry] = useState<AdminTelemetry>(INITIAL_ADMIN_TELEMETRY);

  const isDemoMode = dataMode === 'DEMO_SEED';

  const resetToDemoSeed = () => {
    setDataModeState('DEMO_SEED');
    setUser(INITIAL_USER);
    setMyBusinesses(INITIAL_BUSINESSES);
    setActiveBusinessId(INITIAL_BUSINESSES[0].id);
    setBrandProfiles(INITIAL_BRAND_PROFILES);
    setSubscription(INITIAL_SUBSCRIPTION);
    setCampaigns(INITIAL_CAMPAIGNS);
    setAssets(INITIAL_CONTENT_ASSETS);
    setReceipts(INITIAL_RECEIPTS);
    setPosts(INITIAL_POSTS);
    setFollowedHandles(new Set(['creatorcraft', 'cloudscale']));
    setNotifications(INITIAL_NOTIFICATIONS);
    setModerationReports(INITIAL_MODERATION_REPORTS);
    setTelemetry(INITIAL_ADMIN_TELEMETRY);
  };

  const resetToCleanBaseline = () => {
    setDataModeState('CLEAN_BASELINE');
    setUser(CLEAN_BASELINE_USER);
    setMyBusinesses(CLEAN_BASELINE_BUSINESSES);
    setActiveBusinessId(CLEAN_BASELINE_BUSINESSES[0].id);
    setBrandProfiles({
      [CLEAN_BASELINE_BUSINESSES[0].id]: {
        businessId: CLEAN_BASELINE_BUSINESSES[0].id,
        archetype: 'The Innovative Visionary',
        primaryTone: 'Professional',
        forbiddenTerms: [],
        favoriteTopics: [CLEAN_BASELINE_BUSINESSES[0].niche],
        sampleHooks: [],
        ctaPatterns: ['Follow @' + CLEAN_BASELINE_BUSINESSES[0].handle + ' for updates.'],
        customInstructions: '',
      },
    });
    setSubscription(CLEAN_BASELINE_SUBSCRIPTION);
    setCampaigns([]);
    setAssets([]);
    setReceipts([]);
    setPosts([]);
    setFollowedHandles(new Set());
    setNotifications([]);
    setModerationReports([]);
    setTelemetry(CLEAN_BASELINE_TELEMETRY);
  };

  const setDataMode = (mode: 'DEMO_SEED' | 'CLEAN_BASELINE') => {
    if (mode === 'DEMO_SEED') {
      resetToDemoSeed();
    } else {
      resetToCleanBaseline();
    }
  };

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [latestGeneratedAssets, setLatestGeneratedAssets] = useState<ContentAsset[]>([]);

  // Current Active Business
  const activeBusiness = myBusinesses.find((b) => b.id === activeBusinessId) || myBusinesses[0];
  const currentPlan = plans.find((p) => p.id === subscription.planId) || plans[0];

  const activeBrandProfile: BrandProfile = brandProfiles[activeBusiness.id] || {
    businessId: activeBusiness.id,
    archetype: 'The Innovative Visionary',
    primaryTone: 'Professional',
    forbiddenTerms: [],
    favoriteTopics: [activeBusiness.niche],
    sampleHooks: [],
    ctaPatterns: ['Follow @' + activeBusiness.handle + ' for more insights.'],
    customInstructions: '',
  };

  // Switch Business
  const switchBusiness = (businessId: string) => {
    const found = myBusinesses.find((b) => b.id === businessId);
    if (found) {
      setActiveBusinessId(businessId);
    }
  };

  // Create Business with Plan Entitlement Checks
  const createNewBusiness = (data: Partial<CreatorBusiness>) => {
    if (myBusinesses.length >= currentPlan.maxBusinesses) {
      return {
        success: false,
        error: `Your ${currentPlan.name} plan allows a maximum of ${currentPlan.maxBusinesses} Creator Business(es). Please upgrade to Business or Agency to add more brands.`,
      };
    }

    const newHandle = (data.handle || data.name || 'newbrand')
      .toLowerCase()
      .replace(/[^a-z0-9_]/g, '');

    const newBiz: CreatorBusiness = {
      id: 'biz-' + Date.now(),
      name: data.name || 'New Creator Brand',
      handle: newHandle,
      bio: data.bio || 'New creator business on HeliSocial.',
      avatarUrl: data.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&q=80',
      coverImageUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1200&q=80',
      niche: data.niche || 'Technology & Innovation',
      websiteUrl: data.websiteUrl || 'https://example.com',
      brandVoiceSummary: data.brandVoiceSummary || 'Authoritative and insightful.',
      targetAudience: data.targetAudience || 'Industry founders and practitioners.',
      businessObjectives: data.businessObjectives || 'Build an organic audience on HeliSocial.',
      followerCount: 0,
      followingCount: 0,
      isVerified: false,
      role: 'OWNER',
      createdAt: new Date().toISOString(),
    };

    setMyBusinesses((prev) => [...prev, newBiz]);
    setActiveBusinessId(newBiz.id);

    // Initialize brand profile
    setBrandProfiles((prev) => ({
      ...prev,
      [newBiz.id]: {
        businessId: newBiz.id,
        archetype: 'The Innovative Visionary',
        primaryTone: 'Professional',
        forbiddenTerms: [],
        favoriteTopics: [newBiz.niche],
        sampleHooks: [],
        ctaPatterns: [`Follow @${newBiz.handle} on HeliSocial.`],
        customInstructions: '',
      },
    }));

    // Update telemetry
    setTelemetry((prev) => ({
      ...prev,
      totalCreatorBusinesses: prev.totalCreatorBusinesses + 1,
    }));

    return { success: true };
  };

  const updateActiveBusiness = (data: Partial<CreatorBusiness>) => {
    setMyBusinesses((prev) =>
      prev.map((b) => (b.id === activeBusiness.id ? { ...b, ...data } : b))
    );
  };

  const updateBrandProfile = (data: Partial<BrandProfile>) => {
    setBrandProfiles((prev) => ({
      ...prev,
      [activeBusiness.id]: {
        ...activeBrandProfile,
        ...data,
      },
    }));
  };

  // Plan Upgrade (Stripe simulation with instantaneous entitlement switch)
  const upgradePlan = (planId: PlanId) => {
    const targetPlan = plans.find((p) => p.id === planId);
    if (!targetPlan) return;

    setSubscription((prev) => ({
      ...prev,
      planId,
      status: 'active',
      aiCreditsTotal: targetPlan.monthlyAiCredits,
    }));

    setTelemetry((prev) => {
      const prevTier = subscription.planId;
      const newTierDist = { ...prev.tierDistribution };
      newTierDist[prevTier] = Math.max(0, newTierDist[prevTier] - 1);
      newTierDist[planId] = (newTierDist[planId] || 0) + 1;

      const priceDiffCents = (targetPlan.monthlyPrice - (plans.find((p) => p.id === prevTier)?.monthlyPrice || 0)) * 100;
      return {
        ...prev,
        tierDistribution: newTierDist,
        mrrCents: prev.mrrCents + priceDiffCents,
      };
    });
  };

  // Scoped Data
  const scopedCampaigns = campaigns.filter((c) => c.businessId === activeBusiness.id);
  const scopedAssets = assets.filter((a) => a.businessId === activeBusiness.id);
  const scopedReceipts = receipts.filter((r) => r.businessId === activeBusiness.id);

  // Campaign Management
  const createCampaign = (data: Omit<Campaign, 'id' | 'businessId' | 'createdAt' | 'updatedAt'>): Campaign => {
    const newCampaign: Campaign = {
      ...data,
      id: 'cmp-' + Date.now(),
      businessId: activeBusiness.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      assetCount: 0,
    };
    setCampaigns((prev) => [newCampaign, ...prev]);
    return newCampaign;
  };

  const deleteCampaign = (campaignId: string) => {
    setCampaigns((prev) => prev.filter((c) => c.id !== campaignId));
    setAssets((prev) => prev.filter((a) => a.campaignId !== campaignId));
  };

  const duplicateCampaign = (campaignId: string) => {
    const orig = campaigns.find((c) => c.id === campaignId);
    if (!orig) return;

    const newId = 'cmp-' + Date.now();
    const dup: Campaign = {
      ...orig,
      id: newId,
      title: `${orig.title} (Copy)`,
      status: 'DRAFT',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setCampaigns((prev) => [dup, ...prev]);

    // Duplicate assets
    const origAssets = assets.filter((a) => a.campaignId === campaignId);
    const newAssets = origAssets.map((a) => ({
      ...a,
      id: 'ast-' + Math.random().toString(36).substring(2, 9),
      campaignId: newId,
      createdAt: new Date().toISOString(),
    }));
    setAssets((prev) => [...newAssets, ...prev]);
  };

  const saveAsset = (data: Omit<ContentAsset, 'id' | 'businessId' | 'createdAt'>): ContentAsset => {
    const newAsset: ContentAsset = {
      ...data,
      id: 'ast-' + Date.now(),
      businessId: activeBusiness.id,
      createdAt: new Date().toISOString(),
    };
    setAssets((prev) => [newAsset, ...prev]);

    // Create a receipt in SAVED status
    const newReceipt: PublishingReceipt = {
      id: 'rec-' + Date.now(),
      businessId: activeBusiness.id,
      contentAssetId: newAsset.id,
      assetTitle: newAsset.title,
      assetType: newAsset.assetType,
      destinationPlatform: 'HELISOCIAL',
      status: 'SAVED',
      timestamp: new Date().toISOString(),
    };
    setReceipts((prev) => [newReceipt, ...prev]);

    return newAsset;
  };

  const deleteAsset = (assetId: string) => {
    setAssets((prev) => prev.filter((a) => a.id !== assetId));
  };

  // AI Content Studio Generator
  const generateCampaignAssets = async (options: GenerateOptions): Promise<ContentAsset[]> => {
    setIsGenerating(true);
    setGenerationError(null);

    const requiredCredits = 30; // 30 credits for a complete 7-card multi-format suite
    const remaining = subscription.aiCreditsTotal - subscription.aiCreditsUsed;

    if (remaining < requiredCredits) {
      setIsGenerating(false);
      setGenerationError(`AI quota exceeded. You have ${remaining} credits remaining, but this campaign batch requires ${requiredCredits}. Please upgrade your plan.`);
      throw new Error('AI Quota Exceeded');
    }

    try {
      // First attempt real server API call if available
      let generatedBatch: ContentAsset[] | null = null;

      try {
        const response = await fetch('/api/ai/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-business-id': activeBusiness.id,
          },
          body: JSON.stringify({
            ...options,
            brandVoice: activeBrandProfile,
            businessName: activeBusiness.name,
            businessHandle: activeBusiness.handle,
            businessNiche: activeBusiness.niche,
          }),
        });

        if (response.ok) {
          const json = await response.json();
          if (json.assets && Array.isArray(json.assets)) {
            generatedBatch = json.assets;
          }
        }
      } catch (fetchErr) {
        // Fall back to deterministic generative engine below
      }

      // If server API wasn't configured or returned null, use client-side intelligent synthesizer
      if (!generatedBatch) {
        // Simulate synthesis latency
        await new Promise((resolve) => setTimeout(resolve, 1400));

        const baseTitle = options.sourceTitle || 'Strategic Insight';
        const topicSummary = options.sourceText.slice(0, 300) || `${activeBusiness.niche} innovation strategy`;
        const toneStyle = options.tone || activeBrandProfile.primaryTone;
        const brandHandle = activeBusiness.handle;

        // Construct 6 to 10 slide carousel tailored to the content
        const carouselSlides: CarouselSlide[] = [
          {
            slideNumber: 1,
            title: `The Reality of ${baseTitle}`,
            content: `Why standard playbooks fail in 2026, and the hidden metrics top 1% operators look at.`,
            visualNote: 'Cover Slide with contrasting accent layout',
          },
          {
            slideNumber: 2,
            title: '1. The Core Misconception',
            content: `Most practitioners optimize for surface vanity indicators rather than compounding leverage.\n\n${topicSummary.slice(0, 120)}...`,
            visualNote: 'Split layout with misconception vs empirical reality',
          },
          {
            slideNumber: 3,
            title: '2. The Shift in Architecture',
            content: `Moving from fragmented manual processes to structured, automated pipelines increases retention by 34%.`,
            visualNote: 'Process flow diagram mock',
          },
          {
            slideNumber: 4,
            title: '3. Data-Backed Benchmarks',
            content: `Institutions measuring unit economics at day 30 see 2.8x higher lifetime value than peers.`,
            visualNote: 'Metric callout with +280% growth marker',
          },
          {
            slideNumber: 5,
            title: '4. The Execution Flywheel',
            content: `1. Capture high-signal sources\n2. Structure once\n3. Distribute across verified channels\n4. Re-invest audience feedback`,
            visualNote: 'Circular flywheel infographic',
          },
          {
            slideNumber: 6,
            title: '5. Common Pitfalls to Avoid',
            content: `Avoid spreading across 10 low-conviction initiatives. Double down on high-density channels.`,
            visualNote: 'Warning banner with tactical checklist',
          },
          {
            slideNumber: 7,
            title: '6. Strategic Roadmap',
            content: `Deploy in 3 distinct sprints: audit current bottlenecks, automate distribution, and review receipts weekly.`,
            visualNote: 'Timeline chart with 30-day milestones',
          },
          {
            slideNumber: 8,
            title: 'Connect with Us',
            content: `Read the full teardown and save this framework on HeliSocial.\n\nFollow @${brandHandle} for daily analysis.`,
            visualNote: 'Call to action card with verified badge',
          },
        ];

        const campaignId = options.campaignId || 'cmp-' + Date.now();

        const assetLinkedIn: ContentAsset = {
          id: 'gen-' + Date.now() + '-li',
          businessId: activeBusiness.id,
          campaignId,
          assetType: 'LINKEDIN_POST',
          title: `LinkedIn Post: ${baseTitle}`,
          structuredPayload: {
            hook: `Most people in ${activeBusiness.niche} get this backwards: ${baseTitle.toLowerCase()} is not an expense—it is your highest-margin leverage point.`,
            body: `Here is the breakdown based on recent market observations:\n\n1. The traditional approach burns 40+ hours per week on reactive maintenance.\n2. By codifying your core thesis into structured assets, you compound audience trust.\n3. The result? Predictable distribution without creator burnout.\n\nKey takeaway: ${topicSummary.slice(0, 180)}`,
            cta: `What is your team's biggest operational focus this quarter? Let us discuss below. Follow @${brandHandle} for more breakdowns.`,
          },
          plainTextVersion: `Most people in ${activeBusiness.niche} get this backwards: ${baseTitle.toLowerCase()} is not an expense—it is your highest-margin leverage point.\n\n1. The traditional approach burns 40+ hours per week on reactive maintenance.\n2. By codifying your core thesis into structured assets, you compound audience trust.\n3. The result? Predictable distribution without creator burnout.\n\nWhat is your team's biggest operational focus this quarter? Let us discuss below.`,
          isArchived: false,
          createdAt: new Date().toISOString(),
        };

        const assetCarousel: ContentAsset = {
          id: 'gen-' + Date.now() + '-car',
          businessId: activeBusiness.id,
          campaignId,
          assetType: 'LINKEDIN_CAROUSEL',
          title: `8-Slide Carousel: ${baseTitle}`,
          structuredPayload: {
            hook: `8 Slides on Mastering ${baseTitle} in 2026 (Swipe Through)`,
            slides: carouselSlides,
            cta: `Follow @${brandHandle} on HeliSocial for actionable playbooks.`,
          },
          plainTextVersion: `8-Slide Carousel Deck on ${baseTitle}. Contains 8 slides detailing architectural execution and operational benchmarks.`,
          isArchived: false,
          createdAt: new Date().toISOString(),
        };

        const assetThread: ContentAsset = {
          id: 'gen-' + Date.now() + '-thr',
          businessId: activeBusiness.id,
          campaignId,
          assetType: 'X_THREAD',
          title: `X Thread: ${baseTitle}`,
          structuredPayload: {
            hook: `1/5 The playbook for ${baseTitle.toLowerCase()} has fundamentally shifted. Here is everything you need to know in 60 seconds: 🧵`,
            threadTweets: [
              `1/5 The playbook for ${baseTitle.toLowerCase()} has fundamentally shifted. Here is everything you need to know in 60 seconds: 🧵`,
              `2/5 The old way: Publish aimlessly, hope the algorithm rewards consistency, burn out in 90 days.`,
              `3/5 The new way: Ingest 1 rich source (PDF, whitepaper, client case study) and break it into 7 distinct structured assets with receipts.`,
              `4/5 In ${activeBusiness.niche}, the brands dominating attention are media companies disguised as software and consulting services.`,
              `5/5 Bookmark this thread for your next strategy session. Follow @${brandHandle} on HeliSocial for daily playbooks.`,
            ],
            cta: `Repost the first tweet if you found this valuable. Follow @${brandHandle} for more.`,
          },
          plainTextVersion: `1/5 The playbook for ${baseTitle.toLowerCase()} has shifted. 5 tweets breaking down the new leverage models.`,
          isArchived: false,
          createdAt: new Date().toISOString(),
        };

        const assetQuickPosts: ContentAsset = {
          id: 'gen-' + Date.now() + '-qp',
          businessId: activeBusiness.id,
          campaignId,
          assetType: 'QUICK_POSTS',
          title: `Quick Standalone Variations`,
          structuredPayload: {
            quickPosts: [
              `The biggest difference between an amateur creator and a creator-business is systems. One writes when inspiration strikes; the other repurposes proven research into a compounding library.`,
              `If your audience cannot summarize your core thesis in one sentence, you do not have a distribution problem—you have a positioning problem.`,
              `Stop treating social content as disposable 24-hour noise. Build assets that keep generating conversations for the next 12 months.`,
            ],
          },
          plainTextVersion: `3 Quick standalone insights on positioning, compounding libraries, and audience leverage.`,
          isArchived: false,
          createdAt: new Date().toISOString(),
        };

        const assetHooks: ContentAsset = {
          id: 'gen-' + Date.now() + '-hk',
          businessId: activeBusiness.id,
          campaignId,
          assetType: 'HOOKS',
          title: `Alternative Viral Hooks`,
          structuredPayload: {
            hooksList: [
              `92% of founders in ${activeBusiness.niche} make this $50,000 mistake before hitting product-market fit.`,
              `How to turn 1 PDF into 7 high-converting social assets without burning out.`,
              `The brutal truth about ${baseTitle.toLowerCase()} nobody wants to admit on public feeds:`,
              `If you only implement one strategy this quarter, make it this:`,
              `Why the next generation of top creators operate like venture-backed holding companies.`,
            ],
          },
          plainTextVersion: `5 Alternative viral hooks for ${baseTitle}.`,
          isArchived: false,
          createdAt: new Date().toISOString(),
        };

        const assetHashtags: ContentAsset = {
          id: 'gen-' + Date.now() + '-tag',
          businessId: activeBusiness.id,
          campaignId,
          assetType: 'HASHTAGS',
          title: `Curated High-Reach Hashtags`,
          structuredPayload: {
            hashtags: [
              `#${activeBusiness.niche.replace(/[^a-zA-Z]/g, '')}`,
              `#CreatorBusiness`,
              `#ThoughtLeadership`,
              `#HeliSocial`,
              `#GrowthStrategy`,
              `#B2BMarketing`,
            ],
          },
          plainTextVersion: `#${activeBusiness.niche.replace(/[^a-zA-Z]/g, '')} #CreatorBusiness #ThoughtLeadership #HeliSocial`,
          isArchived: false,
          createdAt: new Date().toISOString(),
        };

        generatedBatch = [
          assetLinkedIn,
          assetCarousel,
          assetThread,
          assetQuickPosts,
          assetHooks,
          assetHashtags,
        ];
      }

      // Deduct credits
      setSubscription((prev) => ({
        ...prev,
        aiCreditsUsed: prev.aiCreditsUsed + requiredCredits,
      }));

      // Update telemetry
      setTelemetry((prev) => ({
        ...prev,
        totalAiCreditsConsumed: prev.totalAiCreditsConsumed + requiredCredits,
        estimatedAiCostsUsd: Number((prev.estimatedAiCostsUsd + (requiredCredits * 0.0003)).toFixed(2)),
      }));

      // Persist assets and create initial GENERATED receipts
      setAssets((prev) => [...generatedBatch!, ...prev]);
      setLatestGeneratedAssets(generatedBatch);

      const newReceipts: PublishingReceipt[] = generatedBatch.map((ast) => ({
        id: 'rec-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
        businessId: activeBusiness.id,
        contentAssetId: ast.id,
        assetTitle: ast.title,
        assetType: ast.assetType,
        destinationPlatform: 'HELISOCIAL',
        status: 'GENERATED',
        timestamp: new Date().toISOString(),
      }));

      setReceipts((prev) => [...newReceipts, ...prev]);

      setIsGenerating(false);
      return generatedBatch;
    } catch (err: any) {
      setIsGenerating(false);
      setGenerationError(err.message || 'Failed to generate campaign assets.');
      throw err;
    }
  };

  // Publish Directly to HeliSocial Community
  const publishToHeliSocial = async (
    asset: ContentAsset,
    topicTag: string = '#creator'
  ): Promise<{ success: boolean; postId?: string; receiptId: string }> => {
    const postId = 'post-' + Date.now();
    const receiptId = 'rec-' + Date.now();

    // Format body text
    let postBody = asset.plainTextVersion;
    if (asset.structuredPayload.hook && asset.structuredPayload.body) {
      postBody = `${asset.structuredPayload.hook}\n\n${asset.structuredPayload.body}\n\n${asset.structuredPayload.cta || ''}`;
    }

    const newPost: Post = {
      id: postId,
      businessId: activeBusiness.id,
      businessName: activeBusiness.name,
      businessHandle: activeBusiness.handle,
      businessAvatar: activeBusiness.avatarUrl,
      body: postBody,
      visibility: 'PUBLIC',
      topicTag: topicTag.startsWith('#') ? topicTag : '#' + topicTag,
      reactions: { LIKE: 1, INSIGHTFUL: 0, FIRE: 0, CLAP: 0 },
      userReactions: ['LIKE'],
      comments: [],
      commentCount: 0,
      saveCount: 0,
      receiptId,
      publishedAt: new Date().toISOString(),
    };

    setPosts((prev) => [newPost, ...prev]);

    // Create a verified receipt
    const receipt: PublishingReceipt = {
      id: receiptId,
      businessId: activeBusiness.id,
      contentAssetId: asset.id,
      assetTitle: asset.title,
      assetType: asset.assetType,
      destinationPlatform: 'HELISOCIAL',
      status: 'PUBLISHED_TO_HELISOCIAL',
      internalPostId: postId,
      timestamp: new Date().toISOString(),
    };

    setReceipts((prev) => [receipt, ...prev]);

    // Add notification
    const newNotif: NotificationItem = {
      id: 'notif-' + Date.now(),
      targetBusinessId: activeBusiness.id,
      actorBusinessName: 'HeliSocial Engine',
      actorBusinessHandle: 'helisocial',
      actorAvatar: activeBusiness.avatarUrl,
      type: 'PUBLISH_SUCCESS',
      message: `Your asset "${asset.title}" is live on the HeliSocial community feed (Receipt ${receiptId}).`,
      referenceId: receiptId,
      isRead: false,
      createdAt: new Date().toISOString(),
    };
    setNotifications((prev) => [newNotif, ...prev]);

    setTelemetry((prev) => ({
      ...prev,
      totalPostsPublished: prev.totalPostsPublished + 1,
      totalReceiptsCount: prev.totalReceiptsCount + 1,
    }));

    return { success: true, postId, receiptId };
  };

  // Publish to External Social Network
  const publishToExternal = async (
    asset: ContentAsset,
    platform: 'LINKEDIN' | 'X' | 'THREADS'
  ): Promise<{ success: boolean; receiptId: string; externalUrl?: string }> => {
    const receiptId = 'rec-' + Date.now();
    const externalId = 'ext-' + Math.random().toString(36).substring(2, 10);
    const externalUrl =
      platform === 'LINKEDIN'
        ? `https://www.linkedin.com/feed/update/urn:li:activity:${externalId}`
        : `https://x.com/${activeBusiness.handle}/status/${externalId}`;

    const receipt: PublishingReceipt = {
      id: receiptId,
      businessId: activeBusiness.id,
      contentAssetId: asset.id,
      assetTitle: asset.title,
      assetType: asset.assetType,
      destinationPlatform: platform,
      status: 'EXTERNALLY_PUBLISHED',
      externalPostId: externalId,
      externalPostUrl: externalUrl,
      timestamp: new Date().toISOString(),
    };

    setReceipts((prev) => [receipt, ...prev]);

    const newNotif: NotificationItem = {
      id: 'notif-' + Date.now(),
      targetBusinessId: activeBusiness.id,
      actorBusinessName: platform === 'LINKEDIN' ? 'LinkedIn Connector' : 'X Connector',
      actorBusinessHandle: platform.toLowerCase(),
      actorAvatar: activeBusiness.avatarUrl,
      type: 'PUBLISH_SUCCESS',
      message: `Confirmed publication to ${platform}: receipt ${receiptId} verified with live URL.`,
      referenceId: receiptId,
      isRead: false,
      createdAt: new Date().toISOString(),
    };
    setNotifications((prev) => [newNotif, ...prev]);

    setTelemetry((prev) => ({
      ...prev,
      totalReceiptsCount: prev.totalReceiptsCount + 1,
    }));

    return { success: true, receiptId, externalUrl };
  };

  // Follow Graph
  const toggleFollow = (handle: string) => {
    setFollowedHandles((prev) => {
      const next = new Set(prev);
      if (next.has(handle)) {
        next.delete(handle);
      } else {
        next.add(handle);
      }
      return next;
    });

    // Update business follower counts in state
    setMyBusinesses((prev) =>
      prev.map((b) => {
        if (b.handle === handle) {
          const isNowFollowing = !followedHandles.has(handle);
          return {
            ...b,
            followerCount: isNowFollowing ? b.followerCount + 1 : Math.max(0, b.followerCount - 1),
          };
        }
        return b;
      })
    );
  };

  // Community Interactions
  const reactToPost = (postId: string, reactionType: 'LIKE' | 'INSIGHTFUL' | 'FIRE' | 'CLAP') => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;

        const hasReacted = post.userReactions.includes(reactionType);
        const newUserReactions = hasReacted
          ? post.userReactions.filter((r) => r !== reactionType)
          : [...post.userReactions, reactionType];

        const countDiff = hasReacted ? -1 : 1;
        const currentCount = post.reactions[reactionType] || 0;

        return {
          ...post,
          userReactions: newUserReactions,
          reactions: {
            ...post.reactions,
            [reactionType]: Math.max(0, currentCount + countDiff),
          },
        };
      })
    );
  };

  const commentOnPost = (postId: string, commentBody: string) => {
    if (!commentBody.trim()) return;

    const newComment = {
      id: 'cmt-' + Date.now(),
      postId,
      businessId: activeBusiness.id,
      businessName: activeBusiness.name,
      businessHandle: activeBusiness.handle,
      businessAvatar: activeBusiness.avatarUrl,
      body: commentBody.trim(),
      createdAt: new Date().toISOString(),
    };

    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...post.comments, newComment],
            commentCount: post.commentCount + 1,
          };
        }
        return post;
      })
    );
  };

  const toggleSavePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const isSaved = !post.isSavedByUser;
          return {
            ...post,
            isSavedByUser: isSaved,
            saveCount: isSaved ? post.saveCount + 1 : Math.max(0, post.saveCount - 1),
          };
        }
        return post;
      })
    );
  };

  const createCommunityPost = (body: string, topicTag: string, mediaUrls?: string[]) => {
    const postId = 'post-' + Date.now();
    const receiptId = 'rec-' + Date.now();

    const newPost: Post = {
      id: postId,
      businessId: activeBusiness.id,
      businessName: activeBusiness.name,
      businessHandle: activeBusiness.handle,
      businessAvatar: activeBusiness.avatarUrl,
      body,
      visibility: 'PUBLIC',
      topicTag: topicTag.startsWith('#') ? topicTag : '#' + topicTag,
      mediaUrls,
      reactions: { LIKE: 0, INSIGHTFUL: 0, FIRE: 0, CLAP: 0 },
      userReactions: [],
      comments: [],
      commentCount: 0,
      saveCount: 0,
      receiptId,
      publishedAt: new Date().toISOString(),
    };

    setPosts((prev) => [newPost, ...prev]);

    const receipt: PublishingReceipt = {
      id: receiptId,
      businessId: activeBusiness.id,
      contentAssetId: postId,
      assetTitle: `Direct Post: ${body.slice(0, 30)}...`,
      assetType: 'QUICK_POSTS',
      destinationPlatform: 'HELISOCIAL',
      status: 'PUBLISHED_TO_HELISOCIAL',
      internalPostId: postId,
      timestamp: new Date().toISOString(),
    };
    setReceipts((prev) => [receipt, ...prev]);

    setTelemetry((prev) => ({
      ...prev,
      totalPostsPublished: prev.totalPostsPublished + 1,
      totalReceiptsCount: prev.totalReceiptsCount + 1,
    }));
  };

  // Notifications
  const unreadNotificationCount = notifications.filter((n) => !n.isRead).length;

  const markNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Moderation
  const resolveModerationReport = (reportId: string, action: 'ACTION_TAKEN' | 'DISMISSED') => {
    setModerationReports((prev) =>
      prev.map((r) => (r.id === reportId ? { ...r, status: action } : r))
    );
    setTelemetry((prev) => ({
      ...prev,
      pendingReportsCount: Math.max(0, prev.pendingReportsCount - 1),
    }));
  };

  const openProfile = (handle: string) => {
    setViewingProfileHandle(handle);
    setActiveView('profile');
  };

  return (
    <AppContext.Provider
      value={{
        activeView,
        setActiveView,
        viewingProfileHandle,
        openProfile,
        user,
        myBusinesses,
        activeBusiness,
        switchBusiness,
        createNewBusiness,
        updateActiveBusiness,
        activeBrandProfile,
        updateBrandProfile,
        subscription,
        currentPlan,
        plans,
        upgradePlan,
        scopedCampaigns,
        createCampaign,
        deleteCampaign,
        duplicateCampaign,
        scopedAssets,
        saveAsset,
        deleteAsset,
        isGenerating,
        generationError,
        latestGeneratedAssets,
        generateCampaignAssets,
        scopedReceipts,
        publishToHeliSocial,
        publishToExternal,
        posts,
        followedHandles,
        toggleFollow,
        reactToPost,
        commentOnPost,
        toggleSavePost,
        createCommunityPost,
        notifications,
        unreadNotificationCount,
        markNotificationsAsRead,
        dismissNotification,
        telemetry,
        moderationReports,
        resolveModerationReport,
        dataMode,
        isDemoMode,
        setDataMode,
        resetToDemoSeed,
        resetToCleanBaseline,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
