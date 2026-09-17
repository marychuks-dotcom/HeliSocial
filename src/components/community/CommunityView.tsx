import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Post } from '../../types';
import {
  Users,
  MessageSquare,
  Bookmark,
  Share2,
  ThumbsUp,
  Flame,
  Lightbulb,
  Sparkles,
  Send,
  CheckCircle2,
  FileCheck,
  ExternalLink,
  Plus,
  UserPlus,
  UserCheck,
  Filter,
} from 'lucide-react';

type FeedTab = 'DISCOVER' | 'FOLLOWING' | 'TOPICS' | 'CREATORS';

export const CommunityView: React.FC = () => {
  const {
    activeBusiness,
    myBusinesses,
    posts,
    followedHandles,
    toggleFollow,
    reactToPost,
    commentOnPost,
    toggleSavePost,
    createCommunityPost,
    openProfile,
  } = useApp();

  const [activeTab, setActiveTab] = useState<FeedTab>('DISCOVER');
  const [selectedTopic, setSelectedTopic] = useState<string>('#fintech');
  const [composerText, setComposerText] = useState('');
  const [composerTopic, setComposerTopic] = useState('#creator');
  const [expandedCommentsPostId, setExpandedCommentsPostId] = useState<string | null>(null);
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [copiedLinkPostId, setCopiedLinkPostId] = useState<string | null>(null);

  // Filter posts based on activeTab
  const filteredPosts = posts.filter((post) => {
    if (activeTab === 'DISCOVER') return true;
    if (activeTab === 'FOLLOWING') {
      return followedHandles.has(post.businessHandle) || post.businessHandle === activeBusiness.handle;
    }
    if (activeTab === 'TOPICS') {
      return post.topicTag?.toLowerCase() === selectedTopic.toLowerCase();
    }
    return true;
  });

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!composerText.trim()) return;

    createCommunityPost(composerText.trim(), composerTopic);
    setComposerText('');
  };

  const handleCommentSubmit = (postId: string) => {
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;

    commentOnPost(postId, text.trim());
    setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
  };

  const handleShareLink = (post: Post) => {
    const url = `https://helisocial.ai.studio/@${post.businessHandle}/posts/${post.id}`;
    navigator.clipboard.writeText(url);
    setCopiedLinkPostId(post.id);
    setTimeout(() => setCopiedLinkPostId(null), 2000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-stone-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-stone-900 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-400">
              Community Network
            </span>
            <span className="text-xs text-stone-500 font-medium">
              Posting as: <strong className="text-stone-900">@{activeBusiness.handle}</strong>
            </span>
          </div>
          <h1 className="mt-1 font-serif text-2xl font-bold tracking-tight text-stone-900">
            HeliSocial Creator Exchange
          </h1>
          <p className="text-xs text-stone-600">
            Verified network where high-signal creators share structured playbooks, cross-promote, and build audience equity.
          </p>
        </div>

        {/* Feed Nav Tabs */}
        <div className="flex items-center gap-1 rounded-xl border border-stone-200 bg-stone-50 p-1">
          <button
            onClick={() => setActiveTab('DISCOVER')}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              activeTab === 'DISCOVER' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Discover
          </button>
          <button
            onClick={() => setActiveTab('FOLLOWING')}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              activeTab === 'FOLLOWING' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Following
          </button>
          <button
            onClick={() => setActiveTab('TOPICS')}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              activeTab === 'TOPICS' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Topics
          </button>
          <button
            onClick={() => setActiveTab('CREATORS')}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              activeTab === 'CREATORS' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Creators
          </button>
        </div>
      </div>

      {/* Main Grid: Feed + Right Sidebar */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* LEFT / CENTER: Feed & Composer */}
        <div className="lg:col-span-8 space-y-5">
          {/* Quick Post Composer */}
          <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-xs">
            <div className="flex items-start gap-3">
              <img
                src={activeBusiness.avatarUrl}
                alt={activeBusiness.name}
                className="h-9 w-9 rounded-full object-cover ring-1 ring-stone-200 mt-1"
              />
              <div className="flex-1 space-y-2">
                <textarea
                  rows={3}
                  value={composerText}
                  onChange={(e) => setComposerText(e.target.value)}
                  placeholder={`Share a tactical insight or case study from @${activeBusiness.handle}...`}
                  className="w-full resize-none rounded-xl border border-stone-200 p-3 text-xs text-stone-900 placeholder:text-stone-400 focus:border-stone-900 focus:outline-none"
                />

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-stone-500 font-medium">Topic:</span>
                    <select
                      value={composerTopic}
                      onChange={(e) => setComposerTopic(e.target.value)}
                      className="rounded-lg border border-stone-200 px-2 py-1 text-[11px] text-stone-700 bg-stone-50 focus:outline-none"
                    >
                      <option value="#creator">#creator</option>
                      <option value="#fintech">#fintech</option>
                      <option value="#saas">#saas</option>
                      <option value="#ai">#ai</option>
                      <option value="#growth">#growth</option>
                    </select>
                  </div>

                  <button
                    onClick={handleCreatePost}
                    disabled={!composerText.trim()}
                    className="flex items-center gap-1.5 rounded-lg bg-stone-900 px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-stone-800 disabled:opacity-40"
                  >
                    <Send className="h-3 w-3" />
                    <span>Post as @{activeBusiness.handle}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Topics Subheader if in TOPICS tab */}
          {activeTab === 'TOPICS' && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              {['#fintech', '#creator', '#saas', '#ai', '#growth'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTopic(tag)}
                  className={`rounded-full px-3 py-1 font-semibold transition ${
                    selectedTopic.toLowerCase() === tag.toLowerCase()
                      ? 'bg-stone-900 text-white'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}

          {/* Creators Directory Tab */}
          {activeTab === 'CREATORS' ? (
            <div className="space-y-4">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                Verified Creator Businesses Directory
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {myBusinesses.map((biz) => {
                  const isFollowing = followedHandles.has(biz.handle);
                  return (
                    <div
                      key={biz.id}
                      className="rounded-xl border border-stone-200 bg-white p-4 shadow-xs space-y-3"
                    >
                      <div className="flex items-start justify-between">
                        <div
                          onClick={() => openProfile(biz.handle)}
                          className="flex items-center gap-2.5 cursor-pointer"
                        >
                          <img
                            src={biz.avatarUrl}
                            alt=""
                            className="h-10 w-10 rounded-full object-cover ring-1 ring-stone-200"
                          />
                          <div>
                            <div className="text-xs font-bold text-stone-900 hover:underline">{biz.name}</div>
                            <div className="text-[11px] text-stone-500">@{biz.handle}</div>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleFollow(biz.handle)}
                          className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                            isFollowing
                              ? 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                              : 'bg-amber-500 text-stone-950 hover:bg-amber-400'
                          }`}
                        >
                          {isFollowing ? (
                            <>
                              <UserCheck className="h-3 w-3" />
                              <span>Following</span>
                            </>
                          ) : (
                            <>
                              <UserPlus className="h-3 w-3" />
                              <span>Follow</span>
                            </>
                          )}
                        </button>
                      </div>
                      <p className="text-xs text-stone-600 line-clamp-2">{biz.bio}</p>
                      <div className="flex items-center justify-between text-[11px] text-stone-400 pt-1 border-t border-stone-100">
                        <span>{biz.niche}</span>
                        <span>{biz.followerCount.toLocaleString()} followers</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Posts Feed */
            <div className="space-y-4">
              {filteredPosts.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-stone-300 bg-stone-50/50 p-10 text-center text-xs text-stone-500">
                  No posts match the current filter. Try selecting 'Discover' or publish the first post!
                </div>
              ) : (
                filteredPosts.map((post) => {
                  const isFollowing = followedHandles.has(post.businessHandle);
                  const isOwnPost = post.businessHandle === activeBusiness.handle;
                  const isSaved = post.isSavedByUser;
                  const areCommentsOpen = expandedCommentsPostId === post.id;

                  return (
                    <article
                      key={post.id}
                      className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs transition hover:border-stone-300 space-y-3"
                    >
                      {/* Post Author Bar */}
                      <div className="flex items-center justify-between">
                        <div
                          onClick={() => openProfile(post.businessHandle)}
                          className="flex items-center gap-3 cursor-pointer group"
                        >
                          <img
                            src={post.businessAvatar}
                            alt=""
                            className="h-10 w-10 rounded-full object-cover ring-1 ring-stone-200"
                          />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-bold text-stone-900 group-hover:underline">
                                {post.businessName}
                              </span>
                              <CheckCircle2 className="h-3.5 w-3.5 text-amber-600 flex-shrink-0" />
                            </div>
                            <div className="flex items-center gap-2 text-[11px] text-stone-500">
                              <span>@{post.businessHandle}</span>
                              <span>·</span>
                              <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {post.topicTag && (
                            <span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-[10px] font-semibold text-stone-600">
                              {post.topicTag}
                            </span>
                          )}

                          {!isOwnPost && (
                            <button
                              onClick={() => toggleFollow(post.businessHandle)}
                              className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold transition ${
                                isFollowing
                                  ? 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                                  : 'bg-stone-900 text-white hover:bg-stone-800'
                              }`}
                            >
                              {isFollowing ? 'Following' : 'Follow'}
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Publishing Receipt Audit Pill */}
                      {post.receiptId && (
                        <div className="flex items-center gap-2 rounded-lg bg-stone-50 px-2.5 py-1 text-[10px] font-mono text-stone-600 border border-stone-100">
                          <FileCheck className="h-3 w-3 text-emerald-600" />
                          <span>HeliSocial Cryptographic Receipt: #{post.receiptId}</span>
                          {post.externalUrl && (
                            <a
                              href={post.externalUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="ml-auto flex items-center gap-0.5 text-amber-700 hover:underline"
                            >
                              <span>External Proof</span>
                              <ExternalLink className="h-2.5 w-2.5" />
                            </a>
                          )}
                        </div>
                      )}

                      {/* Post Body */}
                      <div className="whitespace-pre-line text-xs leading-relaxed text-stone-800 font-sans">
                        {post.body}
                      </div>

                      {/* Reactions & Action Bar */}
                      <div className="flex items-center justify-between border-t border-stone-100 pt-3 text-xs text-stone-600">
                        {/* Reaction buttons */}
                        <div className="flex items-center gap-1 sm:gap-2">
                          <button
                            onClick={() => reactToPost(post.id, 'LIKE')}
                            className={`flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition ${
                              post.userReactions.includes('LIKE')
                                ? 'bg-amber-100 text-amber-900 font-bold'
                                : 'hover:bg-stone-100'
                            }`}
                          >
                            <ThumbsUp className="h-3.5 w-3.5" />
                            <span>{post.reactions.LIKE}</span>
                          </button>

                          <button
                            onClick={() => reactToPost(post.id, 'INSIGHTFUL')}
                            className={`flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition ${
                              post.userReactions.includes('INSIGHTFUL')
                                ? 'bg-amber-100 text-amber-900 font-bold'
                                : 'hover:bg-stone-100'
                            }`}
                          >
                            <Lightbulb className="h-3.5 w-3.5" />
                            <span>{post.reactions.INSIGHTFUL}</span>
                          </button>

                          <button
                            onClick={() => reactToPost(post.id, 'FIRE')}
                            className={`flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition ${
                              post.userReactions.includes('FIRE')
                                ? 'bg-amber-100 text-amber-900 font-bold'
                                : 'hover:bg-stone-100'
                            }`}
                          >
                            <Flame className="h-3.5 w-3.5" />
                            <span>{post.reactions.FIRE}</span>
                          </button>
                        </div>

                        {/* Comments, Bookmark & Share */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              setExpandedCommentsPostId(areCommentsOpen ? null : post.id)
                            }
                            className="flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium hover:bg-stone-100"
                          >
                            <MessageSquare className="h-3.5 w-3.5" />
                            <span>{post.commentCount}</span>
                          </button>

                          <button
                            onClick={() => toggleSavePost(post.id)}
                            className={`flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition ${
                              isSaved ? 'text-amber-600 font-bold' : 'hover:bg-stone-100'
                            }`}
                            title="Save / Bookmark"
                          >
                            <Bookmark className={`h-3.5 w-3.5 ${isSaved ? 'fill-amber-600' : ''}`} />
                            <span>{post.saveCount}</span>
                          </button>

                          <button
                            onClick={() => handleShareLink(post)}
                            className="flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium hover:bg-stone-100"
                            title="Copy link"
                          >
                            <Share2 className="h-3.5 w-3.5" />
                            <span>{copiedLinkPostId === post.id ? 'Copied' : 'Share'}</span>
                          </button>
                        </div>
                      </div>

                      {/* Expandable Threaded Comments */}
                      {areCommentsOpen && (
                        <div className="border-t border-stone-100 pt-3 space-y-3">
                          <div className="space-y-2">
                            {post.comments.length === 0 ? (
                              <p className="text-[11px] text-stone-400 italic">No comments yet. Start the conversation!</p>
                            ) : (
                              post.comments.map((cmt) => (
                                <div key={cmt.id} className="flex items-start gap-2.5 rounded-lg bg-stone-50 p-2.5">
                                  <img
                                    src={cmt.businessAvatar}
                                    alt=""
                                    className="h-6 w-6 rounded-full object-cover mt-0.5"
                                  />
                                  <div className="flex-1 text-xs">
                                    <div className="flex items-center justify-between">
                                      <span className="font-semibold text-stone-900">{cmt.businessName}</span>
                                      <span className="text-[10px] text-stone-400">
                                        {new Date(cmt.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                      </span>
                                    </div>
                                    <p className="mt-0.5 text-stone-700">{cmt.body}</p>
                                  </div>
                                </div>
                              ))
                            )}
                          </div>

                          {/* Comment input as active creator business */}
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              placeholder={`Reply as @${activeBusiness.handle}...`}
                              value={commentInputs[post.id] || ''}
                              onChange={(e) =>
                                setCommentInputs((prev) => ({ ...prev, [post.id]: e.target.value }))
                              }
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') handleCommentSubmit(post.id);
                              }}
                              className="flex-1 rounded-lg border border-stone-200 px-3 py-1.5 text-xs focus:border-stone-900 focus:outline-none"
                            />
                            <button
                              onClick={() => handleCommentSubmit(post.id)}
                              className="rounded-lg bg-stone-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-stone-800"
                            >
                              Reply
                            </button>
                          </div>
                        </div>
                      )}
                    </article>
                  );
                })
              )}
            </div>
          )}
        </div>

        {/* RIGHT SIDEBAR: Network Rules & Trending Topics */}
        <div className="lg:col-span-4 space-y-5">
          {/* Active Posting Persona Card */}
          <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-xs">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Active Social Persona
            </h3>
            <div className="mt-3 flex items-center gap-3">
              <img
                src={activeBusiness.avatarUrl}
                alt=""
                className="h-11 w-11 rounded-full object-cover ring-2 ring-amber-400"
              />
              <div>
                <div className="text-xs font-bold text-stone-900">{activeBusiness.name}</div>
                <div className="text-[11px] text-stone-500">@{activeBusiness.handle}</div>
                <div className="mt-0.5 text-[10px] text-amber-700 font-medium">{activeBusiness.niche}</div>
              </div>
            </div>
            <p className="mt-3 text-xs text-stone-600 line-clamp-3">{activeBusiness.bio}</p>

            <button
              onClick={() => openProfile(activeBusiness.handle)}
              className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg border border-stone-200 py-1.5 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition"
            >
              <span>View Public Profile</span>
              <ExternalLink className="h-3 w-3" />
            </button>
          </div>

          {/* Community Standards */}
          <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4 space-y-2 text-xs text-stone-600">
            <h4 className="font-semibold text-stone-900 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              HeliSocial Community Principles
            </h4>
            <ul className="list-disc pl-4 space-y-1 text-[11px] text-stone-600">
              <li>100% Signal: Empirical frameworks over empty platitudes.</li>
              <li>Every publish event yields an auditable receipt.</li>
              <li>Dual identity: Maintain human accounts while building multiple business brands.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
