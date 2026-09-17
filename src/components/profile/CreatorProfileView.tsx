import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  CheckCircle2,
  Users,
  Globe,
  Share2,
  UserPlus,
  UserCheck,
  Bookmark,
  ThumbsUp,
  Flame,
  Lightbulb,
  FileCheck,
  ExternalLink,
  MessageSquare,
  ArrowLeft,
} from 'lucide-react';

export const CreatorProfileView: React.FC = () => {
  const {
    viewingProfileHandle,
    myBusinesses,
    activeBusiness,
    posts,
    followedHandles,
    toggleFollow,
    reactToPost,
    toggleSavePost,
    setActiveView,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'POSTS' | 'PHILOSOPHY'>('POSTS');
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [copiedInvite, setCopiedInvite] = useState(false);

  // Find business by handle or default to active business
  const profileBiz =
    myBusinesses.find((b) => b.handle === viewingProfileHandle) ||
    myBusinesses.find((b) => b.handle === activeBusiness.handle) ||
    myBusinesses[0];

  const isFollowing = followedHandles.has(profileBiz.handle);
  const isSelf = profileBiz.handle === activeBusiness.handle;

  const creatorPosts = posts.filter((p) => p.businessHandle === profileBiz.handle);

  const inviteUrl = `https://helisocial.ai.studio/join?ref=${profileBiz.handle}`;

  const handleCopyInvite = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopiedInvite(true);
    setTimeout(() => setCopiedInvite(false), 2000);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8 space-y-6">
      {/* Back Button */}
      <button
        onClick={() => setActiveView('community')}
        className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-600 hover:text-stone-900 transition"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to Community Feed</span>
      </button>

      {/* Header Profile Banner & Avatar */}
      <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-xs">
        {/* Cover Photo */}
        <div className="h-44 w-full bg-stone-900 relative">
          <img
            src={profileBiz.coverImageUrl}
            alt="Cover"
            className="h-full w-full object-cover opacity-75"
          />
        </div>

        {/* Profile Details Container */}
        <div className="relative px-6 pb-6 pt-0">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-14 mb-4 gap-4">
            <div className="flex items-end gap-4">
              <img
                src={profileBiz.avatarUrl}
                alt={profileBiz.name}
                className="h-24 w-24 rounded-2xl object-cover ring-4 ring-white shadow-md bg-white"
              />
              <div className="mb-1">
                <div className="flex items-center gap-1.5">
                  <h1 className="font-serif text-xl font-bold text-stone-900 leading-none">
                    {profileBiz.name}
                  </h1>
                  {profileBiz.isVerified && (
                    <CheckCircle2 className="h-4 w-4 text-amber-600 flex-shrink-0" />
                  )}
                </div>
                <div className="text-xs text-stone-500 font-mono">@{profileBiz.handle}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setInviteModalOpen(true)}
                className="flex items-center gap-1.5 rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-xs font-semibold text-stone-700 hover:bg-stone-50"
              >
                <Share2 className="h-3.5 w-3.5" />
                <span>Invite to Profile</span>
              </button>

              {!isSelf && (
                <button
                  onClick={() => toggleFollow(profileBiz.handle)}
                  className={`flex items-center gap-1.5 rounded-lg px-4 py-1.5 text-xs font-semibold transition ${
                    isFollowing
                      ? 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      : 'bg-amber-500 text-stone-950 hover:bg-amber-400'
                  }`}
                >
                  {isFollowing ? (
                    <>
                      <UserCheck className="h-3.5 w-3.5" />
                      <span>Following</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-3.5 w-3.5" />
                      <span>Follow</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Bio & Links */}
          <p className="max-w-2xl text-xs text-stone-700 leading-relaxed font-sans">
            {profileBiz.bio}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-stone-500 border-t border-stone-100 pt-3">
            <span className="rounded bg-stone-100 px-2 py-0.5 text-[11px] font-semibold text-stone-700">
              {profileBiz.niche}
            </span>
            <div className="flex items-center gap-1">
              <Globe className="h-3.5 w-3.5 text-stone-400" />
              <a
                href={profileBiz.websiteUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-stone-900 hover:underline"
              >
                {profileBiz.websiteUrl.replace('https://', '')}
              </a>
            </div>
            <div className="flex items-center gap-1">
              <strong className="text-stone-900 font-semibold">{profileBiz.followerCount.toLocaleString()}</strong>
              <span>followers</span>
            </div>
            <div className="flex items-center gap-1">
              <strong className="text-stone-900 font-semibold">{profileBiz.followingCount}</strong>
              <span>following</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 text-xs">
        <button
          onClick={() => setActiveTab('POSTS')}
          className={`border-b-2 px-4 py-2 font-semibold transition ${
            activeTab === 'POSTS'
              ? 'border-stone-900 text-stone-900'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          Public Posts ({creatorPosts.length})
        </button>
        <button
          onClick={() => setActiveTab('PHILOSOPHY')}
          className={`border-b-2 px-4 py-2 font-semibold transition ${
            activeTab === 'PHILOSOPHY'
              ? 'border-stone-900 text-stone-900'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          Brand Philosophy & Voice
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'POSTS' ? (
        <div className="space-y-4">
          {creatorPosts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-stone-200 bg-white p-12 text-center text-xs text-stone-400">
              No public posts yet from @{profileBiz.handle}.
            </div>
          ) : (
            creatorPosts.map((post) => (
              <article
                key={post.id}
                className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between text-xs text-stone-400">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-stone-900">{profileBiz.name}</span>
                    <span>·</span>
                    <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                  </div>
                  {post.receiptId && (
                    <span className="rounded bg-stone-100 px-2 py-0.5 text-[10px] font-mono text-stone-600">
                      Receipt #{post.receiptId}
                    </span>
                  )}
                </div>

                <div className="whitespace-pre-line text-xs text-stone-800 leading-relaxed">
                  {post.body}
                </div>

                <div className="flex items-center justify-between border-t border-stone-100 pt-2 text-xs text-stone-500">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => reactToPost(post.id, 'LIKE')}
                      className="flex items-center gap-1 hover:text-stone-900"
                    >
                      <ThumbsUp className="h-3.5 w-3.5" />
                      <span>{post.reactions.LIKE}</span>
                    </button>
                    <button
                      onClick={() => reactToPost(post.id, 'FIRE')}
                      className="flex items-center gap-1 hover:text-stone-900"
                    >
                      <Flame className="h-3.5 w-3.5" />
                      <span>{post.reactions.FIRE}</span>
                    </button>
                  </div>

                  <button
                    onClick={() => toggleSavePost(post.id)}
                    className="flex items-center gap-1 hover:text-stone-900"
                  >
                    <Bookmark className={`h-3.5 w-3.5 ${post.isSavedByUser ? 'fill-stone-900 text-stone-900' : ''}`} />
                    <span>{post.saveCount}</span>
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      ) : (
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs space-y-4 text-xs text-stone-700">
          <h3 className="font-serif text-base font-bold text-stone-900">Brand Manifesto & Voice</h3>
          <div className="rounded-xl bg-stone-50 p-4 space-y-2 border border-stone-100">
            <div>
              <span className="font-semibold text-stone-900">Voice Summary: </span>
              <span>{profileBiz.brandVoiceSummary}</span>
            </div>
            <div>
              <span className="font-semibold text-stone-900">Target Audience: </span>
              <span>{profileBiz.targetAudience}</span>
            </div>
            <div>
              <span className="font-semibold text-stone-900">Core Objectives: </span>
              <span>{profileBiz.businessObjectives}</span>
            </div>
          </div>
        </div>
      )}

      {/* Invite Modal */}
      {inviteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-6 shadow-2xl space-y-4">
            <h3 className="font-serif text-base font-bold text-stone-900">
              Invite to @{profileBiz.handle}
            </h3>
            <p className="text-xs text-stone-500">
              Share this attribution link with peer creators or followers to join HeliSocial:
            </p>

            <div className="flex items-center gap-2 rounded-xl border border-stone-200 bg-stone-50 p-2 text-xs font-mono text-stone-800">
              <span className="truncate flex-1">{inviteUrl}</span>
              <button
                onClick={handleCopyInvite}
                className="rounded-lg bg-stone-900 px-3 py-1 text-xs font-semibold text-white hover:bg-stone-800"
              >
                {copiedInvite ? 'Copied!' : 'Copy'}
              </button>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setInviteModalOpen(false)}
                className="rounded-lg border border-stone-200 px-3 py-1.5 text-xs text-stone-600 hover:bg-stone-50"
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
