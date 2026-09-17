export type SystemRole = 'USER' | 'SUPERADMIN';

export interface User {
  id: string;
  email: string;
  fullName: string;
  avatarUrl: string;
  systemRole: SystemRole;
  createdAt: string;
}

export type BusinessRole = 'OWNER' | 'ADMIN' | 'EDITOR' | 'CONTENT_CREATOR' | 'ANALYST';

export interface CreatorBusiness {
  id: string;
  name: string;
  handle: string; // e.g. 'fintechpulse'
  bio: string;
  avatarUrl: string;
  coverImageUrl: string;
  niche: string;
  websiteUrl: string;
  brandVoiceSummary: string;
  targetAudience: string;
  businessObjectives: string;
  followerCount: number;
  followingCount: number;
  isVerified: boolean;
  role: BusinessRole;
  createdAt: string;
}

export type BrandArchetype =
  | 'The Innovative Visionary'
  | 'The Practical Tactician'
  | 'The Analytical Expert'
  | 'The Inspiring Mentor'
  | 'The Contrarian Disruptor';

export type BrandTone =
  | 'Professional'
  | 'Conversational'
  | 'Authoritative'
  | 'Educational'
  | 'Bold'
  | 'Founder Voice';

export interface BrandProfile {
  businessId: string;
  archetype: BrandArchetype;
  primaryTone: BrandTone;
  secondaryTone?: BrandTone;
  forbiddenTerms: string[];
  favoriteTopics: string[];
  sampleHooks: string[];
  ctaPatterns: string[];
  customInstructions: string;
}

export type PlanId = 'free' | 'creator' | 'business' | 'agency';

export interface PlanEntitlement {
  id: PlanId;
  name: string;
  monthlyPrice: number;
  maxBusinesses: number;
  monthlyAiCredits: number;
  storageMb: number;
  hasAnalytics: boolean;
  hasExternalPublishing: boolean;
  hasTeamRoles: boolean;
  badge?: string;
  description: string;
}

export interface Subscription {
  planId: PlanId;
  status: 'active' | 'trialing' | 'past_due' | 'canceled';
  currentPeriodEnd: string;
  aiCreditsUsed: number;
  aiCreditsTotal: number;
}

export type CampaignObjective =
  | 'Thought Leadership'
  | 'Lead Generation'
  | 'Brand Awareness'
  | 'Product Promotion'
  | 'Education'
  | 'Engagement';

export type CampaignStatus = 'DRAFT' | 'ACTIVE' | 'COMPLETED' | 'ARCHIVED';

export interface Campaign {
  id: string;
  businessId: string;
  title: string;
  description: string;
  objective: CampaignObjective;
  status: CampaignStatus;
  createdAt: string;
  updatedAt: string;
  assetCount?: number;
}

export type SourceType = 'RAW_TEXT' | 'PDF_UPLOAD' | 'URL_PAGE' | 'TOPIC_IDEA';

export interface ContentSource {
  id: string;
  businessId: string;
  campaignId?: string;
  sourceType: SourceType;
  title: string;
  originalUrl?: string;
  fileName?: string;
  rawContent: string;
  cleanExtractedText: string;
  createdAt: string;
}

export type AssetType =
  | 'LINKEDIN_POST'
  | 'LINKEDIN_CAROUSEL'
  | 'X_THREAD'
  | 'QUICK_POSTS'
  | 'HOOKS'
  | 'HASHTAGS'
  | 'CTAS';

export interface CarouselSlide {
  slideNumber: number;
  title: string;
  content: string;
  visualNote?: string;
}

export interface StructuredPayload {
  hook?: string;
  body?: string;
  cta?: string;
  slides?: CarouselSlide[];
  threadTweets?: string[];
  quickPosts?: string[];
  hooksList?: string[];
  hashtags?: string[];
  ctaVariations?: string[];
}

export interface ContentAsset {
  id: string;
  businessId: string;
  campaignId?: string;
  generationId?: string;
  assetType: AssetType;
  title: string;
  structuredPayload: StructuredPayload;
  plainTextVersion: string;
  isArchived: boolean;
  createdAt: string;
}

export type ReceiptStatus =
  | 'GENERATED'
  | 'SAVED'
  | 'PUBLISHED_TO_HELISOCIAL'
  | 'EXTERNAL_PUBLISH_REQUESTED'
  | 'EXTERNALLY_PUBLISHED'
  | 'FAILED';

export interface PublishingReceipt {
  id: string;
  businessId: string;
  contentAssetId: string;
  assetTitle: string;
  assetType: AssetType;
  destinationPlatform: 'HELISOCIAL' | 'LINKEDIN' | 'X' | 'THREADS';
  status: ReceiptStatus;
  externalPostId?: string;
  externalPostUrl?: string;
  internalPostId?: string;
  timestamp: string;
  errorDetails?: string;
}

export interface PostReaction {
  type: 'LIKE' | 'INSIGHTFUL' | 'FIRE' | 'CLAP';
  count: number;
  userReacted?: boolean;
}

export interface PostComment {
  id: string;
  postId: string;
  businessId: string;
  businessName: string;
  businessHandle: string;
  businessAvatar: string;
  body: string;
  createdAt: string;
}

export interface Post {
  id: string;
  businessId: string;
  businessName: string;
  businessHandle: string;
  businessAvatar: string;
  body: string;
  mediaUrls?: string[];
  visibility: 'PUBLIC' | 'DRAFT' | 'PRIVATE';
  topicTag?: string;
  reactions: Record<'LIKE' | 'INSIGHTFUL' | 'FIRE' | 'CLAP', number>;
  userReactions: string[]; // types user reacted with
  comments: PostComment[];
  commentCount: number;
  saveCount: number;
  isSavedByUser?: boolean;
  receiptId?: string;
  externalUrl?: string;
  publishedAt: string;
}

export interface NotificationItem {
  id: string;
  targetBusinessId: string;
  actorBusinessName: string;
  actorBusinessHandle: string;
  actorAvatar: string;
  type: 'NEW_FOLLOWER' | 'REACTION' | 'COMMENT' | 'PUBLISH_SUCCESS' | 'INVITE_ACCEPTED';
  message: string;
  referenceId?: string;
  isRead: boolean;
  createdAt: string;
}

export interface ModerationReport {
  id: string;
  reporterUserId: string;
  targetType: 'POST' | 'COMMENT' | 'BUSINESS';
  targetId: string;
  targetSummary: string;
  reason: 'SPAM' | 'HARASSMENT' | 'HATE_SPEECH' | 'MISINFORMATION' | 'OTHER';
  details: string;
  status: 'PENDING' | 'ACTION_TAKEN' | 'DISMISSED';
  createdAt: string;
}

export interface ConnectedSocialAccount {
  id: string;
  platform: 'LINKEDIN' | 'X' | 'THREADS';
  accountName: string;
  accountHandle: string;
  connectedAt: string;
  status: 'CONNECTED' | 'DISCONNECTED' | 'EXPIRING';
}

export interface AdminTelemetry {
  mrrCents: number;
  totalUsers: number;
  totalCreatorBusinesses: number;
  activeSubscriptionsCount: number;
  tierDistribution: Record<PlanId, number>;
  totalAiCreditsConsumed: number;
  estimatedAiCostsUsd: number;
  estimatedNetProfitUsd: number;
  totalPostsPublished: number;
  totalReceiptsCount: number;
  pendingReportsCount: number;
}
