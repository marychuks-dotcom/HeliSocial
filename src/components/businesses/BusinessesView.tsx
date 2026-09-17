import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BrandArchetype, BrandTone } from '../../types';
import {
  Building2,
  Sparkles,
  Sliders,
  CheckCircle2,
  Share2,
  ExternalLink,
  Plus,
  Trash2,
  Shield,
  Key,
} from 'lucide-react';

export const BusinessesView: React.FC = () => {
  const {
    activeBusiness,
    updateActiveBusiness,
    activeBrandProfile,
    updateBrandProfile,
    myBusinesses,
    switchBusiness,
  } = useApp();

  const [savedNotice, setSavedNotice] = useState(false);

  // Local form state
  const [name, setName] = useState(activeBusiness.name);
  const [bio, setBio] = useState(activeBusiness.bio);
  const [niche, setNiche] = useState(activeBusiness.niche);
  const [websiteUrl, setWebsiteUrl] = useState(activeBusiness.websiteUrl);

  const [archetype, setArchetype] = useState<BrandArchetype>(activeBrandProfile.archetype);
  const [primaryTone, setPrimaryTone] = useState<BrandTone>(activeBrandProfile.primaryTone);
  const [forbiddenTermsInput, setForbiddenTermsInput] = useState(
    activeBrandProfile.forbiddenTerms.join(', ')
  );
  const [customInstructions, setCustomInstructions] = useState(
    activeBrandProfile.customInstructions || ''
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    updateActiveBusiness({
      name,
      bio,
      niche,
      websiteUrl,
    });

    updateBrandProfile({
      archetype,
      primaryTone,
      forbiddenTerms: forbiddenTermsInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      customInstructions,
    });

    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-stone-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-stone-900 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-400">
              Multi-Tenant Settings
            </span>
            <span className="text-xs text-stone-500 font-medium">
              Managing: @{activeBusiness.handle}
            </span>
          </div>
          <h1 className="mt-1 font-serif text-2xl font-bold tracking-tight text-stone-900">
            Brand Profile & Voice Architecture
          </h1>
          <p className="text-xs text-stone-600">
            Configure the tone, positioning archetypes, forbidden vocabulary, and guidelines that condition the AI studio.
          </p>
        </div>

        {savedNotice && (
          <div className="flex items-center gap-1.5 rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-semibold text-emerald-800 animate-in fade-in">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <span>Brand Profile Updated!</span>
          </div>
        )}
      </div>

      {/* Switcher Cards */}
      <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-500">
          Your Creator Businesses ({myBusinesses.length})
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {myBusinesses.map((biz) => {
            const isSelected = biz.id === activeBusiness.id;
            return (
              <div
                key={biz.id}
                onClick={() => switchBusiness(biz.id)}
                className={`cursor-pointer rounded-xl border p-3.5 transition flex items-center gap-3 ${
                  isSelected
                    ? 'border-stone-900 bg-stone-900 text-white shadow-sm'
                    : 'border-stone-200 bg-white hover:border-stone-300 text-stone-900'
                }`}
              >
                <img
                  src={biz.avatarUrl}
                  alt=""
                  className="h-10 w-10 rounded-full object-cover ring-1 ring-stone-300"
                />
                <div className="truncate">
                  <div className="text-xs font-bold truncate">{biz.name}</div>
                  <div className={`text-[11px] ${isSelected ? 'text-amber-400' : 'text-stone-500'}`}>
                    @{biz.handle}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Brand Voice Form */}
      <form onSubmit={handleSave} className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left: General Business Info */}
        <div className="lg:col-span-6 rounded-2xl border border-stone-200 bg-white p-5 shadow-xs space-y-4">
          <h3 className="font-serif text-base font-bold text-stone-900 flex items-center gap-2">
            <Building2 className="h-4 w-4 text-stone-500" />
            Creator Business Identity
          </h3>

          <div>
            <label className="block text-xs font-medium text-stone-700">Business Display Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-stone-200 px-3 py-1.5 text-xs focus:border-stone-900 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-700">Niche Category</label>
            <input
              type="text"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              className="mt-1 w-full rounded-lg border border-stone-200 px-3 py-1.5 text-xs focus:border-stone-900 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-700">Public Website / Link</label>
            <input
              type="url"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              className="mt-1 w-full rounded-lg border border-stone-200 px-3 py-1.5 text-xs focus:border-stone-900 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-700">Bio & Core Mission</label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="mt-1 w-full rounded-lg border border-stone-200 p-2.5 text-xs focus:border-stone-900 focus:outline-none"
            />
          </div>
        </div>

        {/* Right: AI Conditioning Parameters */}
        <div className="lg:col-span-6 rounded-2xl border border-stone-200 bg-white p-5 shadow-xs space-y-4">
          <h3 className="font-serif text-base font-bold text-stone-900 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-amber-500" />
            AI Persona Conditioning
          </h3>

          <div>
            <label className="block text-xs font-medium text-stone-700">Archetype Positioning</label>
            <select
              value={archetype}
              onChange={(e) => setArchetype(e.target.value as BrandArchetype)}
              className="mt-1 w-full rounded-lg border border-stone-200 px-2 py-1.5 text-xs bg-white focus:border-stone-900 focus:outline-none"
            >
              <option value="The Analytical Expert">The Analytical Expert (Data & empirical models)</option>
              <option value="The Practical Tactician">The Practical Tactician (Actionable playbooks & benchmarks)</option>
              <option value="The Innovative Visionary">The Innovative Visionary (Macro shifts & next-gen systems)</option>
              <option value="The Inspiring Mentor">The Inspiring Mentor (Peer-to-peer growth & mindset)</option>
              <option value="The Contrarian Disruptor">The Contrarian Disruptor (Challenging conventional consensus)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-700">Primary Tone</label>
            <select
              value={primaryTone}
              onChange={(e) => setPrimaryTone(e.target.value as BrandTone)}
              className="mt-1 w-full rounded-lg border border-stone-200 px-2 py-1.5 text-xs bg-white focus:border-stone-900 focus:outline-none"
            >
              <option value="Authoritative">Authoritative</option>
              <option value="Professional">Professional</option>
              <option value="Conversational">Conversational</option>
              <option value="Educational">Educational</option>
              <option value="Bold">Bold</option>
              <option value="Founder Voice">Founder Voice</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-700">
              Forbidden Vocabulary (Anti-AI Clichés)
            </label>
            <input
              type="text"
              placeholder="e.g. game-changer, supercharge, revolutionize, delve"
              value={forbiddenTermsInput}
              onChange={(e) => setForbiddenTermsInput(e.target.value)}
              className="mt-1 w-full rounded-lg border border-stone-200 px-3 py-1.5 text-xs focus:border-stone-900 focus:outline-none"
            />
            <p className="mt-1 text-[10px] text-stone-400">
              Comma-separated terms that the AI content studio will strictly filter out of outputs.
            </p>
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-700">
              Custom Prompt Directives
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Always cite actual percentages or sample code. Keep sentences under 20 words."
              value={customInstructions}
              onChange={(e) => setCustomInstructions(e.target.value)}
              className="mt-1 w-full rounded-lg border border-stone-200 p-2.5 text-xs focus:border-stone-900 focus:outline-none"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-lg bg-stone-900 px-4 py-2 text-xs font-semibold text-white hover:bg-stone-800 shadow-sm"
            >
              <CheckCircle2 className="h-3.5 w-3.5 text-amber-400" />
              Save Guidelines
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
