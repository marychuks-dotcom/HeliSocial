import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Campaign, CampaignObjective, CampaignStatus } from '../../types';
import {
  Layers,
  Plus,
  Trash2,
  Copy,
  Sparkles,
  ExternalLink,
  Calendar,
  Tag,
  CheckCircle2,
  FolderArchive,
  ArrowRight,
} from 'lucide-react';

export const CampaignsView: React.FC = () => {
  const {
    activeBusiness,
    scopedCampaigns,
    createCampaign,
    deleteCampaign,
    duplicateCampaign,
    scopedAssets,
    setActiveView,
  } = useApp();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [objective, setObjective] = useState<CampaignObjective>('Thought Leadership');
  const [status, setStatus] = useState<CampaignStatus>('ACTIVE');

  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const filteredCampaigns = scopedCampaigns.filter((c) => {
    if (filterStatus === 'ALL') return true;
    return c.status === filterStatus;
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    createCampaign({
      title: title.trim(),
      description: description.trim(),
      objective,
      status,
    });

    setTitle('');
    setDescription('');
    setIsCreateModalOpen(false);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-stone-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-stone-900 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-400">
              Workspace Campaigns
            </span>
            <span className="text-xs text-stone-500 font-medium">
              @{activeBusiness.handle}
            </span>
          </div>
          <h1 className="mt-1 font-serif text-2xl font-bold tracking-tight text-stone-900">
            Campaign Strategic Hub
          </h1>
          <p className="text-xs text-stone-600">
            Organize multi-format social content batches by launch initiative, product release, or strategic quarter.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-1.5 rounded-lg bg-stone-900 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-stone-800 shadow-sm"
          >
            <Plus className="h-3.5 w-3.5 text-amber-400" />
            New Campaign
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-2 text-xs">
        {['ALL', 'ACTIVE', 'DRAFT', 'COMPLETED', 'ARCHIVED'].map((st) => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`rounded-lg px-3 py-1.5 font-medium transition ${
              filterStatus === st
                ? 'bg-stone-900 text-white'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Campaigns Grid */}
      {filteredCampaigns.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-stone-300 bg-stone-50/50 p-12 text-center">
          <Layers className="h-10 w-10 text-stone-300 mb-2" />
          <h3 className="font-serif text-base font-bold text-stone-800">No campaigns found</h3>
          <p className="mt-1 max-w-sm text-xs text-stone-500">
            Group your LinkedIn posts, carousels, and X threads into structured campaigns to track cumulative reach.
          </p>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-stone-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-stone-800"
          >
            <Plus className="h-3.5 w-3.5 text-amber-400" />
            Create First Campaign
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredCampaigns.map((cmp) => {
            const campaignAssets = scopedAssets.filter((a) => a.campaignId === cmp.id);

            return (
              <div
                key={cmp.id}
                className="flex flex-col justify-between rounded-xl border border-stone-200 bg-white p-5 shadow-xs hover:border-stone-300 transition"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span
                      className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                        cmp.status === 'ACTIVE'
                          ? 'bg-emerald-100 text-emerald-800'
                          : cmp.status === 'DRAFT'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-stone-100 text-stone-600'
                      }`}
                    >
                      {cmp.status}
                    </span>
                    <span className="text-[10px] text-stone-400">
                      {new Date(cmp.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="mt-2.5 font-serif text-base font-bold text-stone-900 leading-snug">
                    {cmp.title}
                  </h3>
                  <p className="mt-1 text-xs text-stone-600 line-clamp-2">
                    {cmp.description || 'No objective description specified.'}
                  </p>

                  <div className="mt-3 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded bg-stone-100 px-2 py-0.5 text-[10px] font-medium text-stone-700">
                      <Tag className="h-3 w-3 text-stone-400" />
                      {cmp.objective}
                    </span>
                    <span className="rounded bg-stone-100 px-2 py-0.5 text-[10px] font-medium text-stone-700">
                      {campaignAssets.length} Assets
                    </span>
                  </div>
                </div>

                <div className="mt-5 border-t border-stone-100 pt-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => duplicateCampaign(cmp.id)}
                      className="rounded p-1 text-stone-400 hover:text-stone-700"
                      title="Duplicate campaign"
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => deleteCampaign(cmp.id)}
                      className="rounded p-1 text-stone-400 hover:text-red-600"
                      title="Delete campaign"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => setActiveView('studio')}
                    className="flex items-center gap-1 text-[11px] font-semibold text-stone-900 hover:text-amber-600"
                  >
                    <span>Open in Studio</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create Campaign Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-6 shadow-2xl">
            <h2 className="font-serif text-lg font-bold text-stone-900">Create New Campaign</h2>
            <p className="text-xs text-stone-500">
              For business workspace: <strong>@{activeBusiness.handle}</strong>
            </p>

            <form onSubmit={handleCreate} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-stone-700">Campaign Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Q4 Executive Product Launch"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-stone-200 px-3 py-1.5 text-xs focus:border-stone-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700">Description / Goal</label>
                <textarea
                  rows={2}
                  placeholder="What is the strategic outcome for this campaign batch?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-stone-200 p-2 text-xs focus:border-stone-900 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-700">Objective</label>
                  <select
                    value={objective}
                    onChange={(e) => setObjective(e.target.value as CampaignObjective)}
                    className="mt-1 w-full rounded-lg border border-stone-200 px-2 py-1.5 text-xs bg-white focus:border-stone-900 focus:outline-none"
                  >
                    <option value="Thought Leadership">Thought Leadership</option>
                    <option value="Lead Generation">Lead Generation</option>
                    <option value="Brand Awareness">Brand Awareness</option>
                    <option value="Product Promotion">Product Promotion</option>
                    <option value="Education">Education</option>
                    <option value="Engagement">Engagement</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as CampaignStatus)}
                    className="mt-1 w-full rounded-lg border border-stone-200 px-2 py-1.5 text-xs bg-white focus:border-stone-900 focus:outline-none"
                  >
                    <option value="ACTIVE">Active</option>
                    <option value="DRAFT">Draft</option>
                    <option value="COMPLETED">Completed</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 border-t border-stone-100 pt-4">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="rounded-lg border border-stone-200 px-3 py-1.5 text-xs font-medium text-stone-600 hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-stone-900 px-4 py-1.5 text-xs font-semibold text-white hover:bg-stone-800"
                >
                  Save Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
