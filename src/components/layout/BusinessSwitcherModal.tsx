import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Building2, Sparkles, AlertCircle, ArrowUpRight } from 'lucide-react';

interface BusinessSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BusinessSwitcherModal: React.FC<BusinessSwitcherModalProps> = ({ isOpen, onClose }) => {
  const { createNewBusiness, currentPlan, myBusinesses, setActiveView } = useApp();

  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');
  const [bio, setBio] = useState('');
  const [niche, setNiche] = useState('FinTech & SaaS');
  const [targetAudience, setTargetAudience] = useState('');
  const [brandVoiceSummary, setBrandVoiceSummary] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const isAtLimit = myBusinesses.length >= currentPlan.maxBusinesses;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name.trim()) {
      setErrorMsg('Please enter a business or creator name.');
      return;
    }

    const res = createNewBusiness({
      name: name.trim(),
      handle: handle.trim() || name.toLowerCase().replace(/[^a-z0-9]/g, ''),
      bio: bio.trim(),
      niche,
      targetAudience: targetAudience.trim() || 'Founders, leaders, and domain practitioners.',
      brandVoiceSummary: brandVoiceSummary.trim() || 'Authoritative, data-backed, and direct.',
    });

    if (res.success) {
      onClose();
    } else if (res.error) {
      setErrorMsg(res.error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-lg rounded-2xl border border-stone-200 bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-stone-100 pb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-900 text-amber-400">
              <Building2 className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-serif font-bold text-stone-900">Create Creator Business</h2>
              <p className="text-xs text-stone-500">
                Managed brands: {myBusinesses.length} of {currentPlan.maxBusinesses} permitted on {currentPlan.name}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-stone-400 hover:bg-stone-100 hover:text-stone-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {isAtLimit ? (
          <div className="py-6 space-y-4">
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-900 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-amber-950">Plan Limit Reached ({currentPlan.maxBusinesses} Businesses)</p>
                <p className="mt-1 text-amber-800">
                  Your current {currentPlan.name} plan permits managing up to {currentPlan.maxBusinesses} creator business(es). To add more independent workspaces with separate branding, campaigns, and followers, upgrade to Business or Agency tier.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-stone-200 px-4 py-2 text-xs font-medium text-stone-700 hover:bg-stone-50"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  setActiveView('pricing');
                }}
                className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-4 py-2 text-xs font-semibold text-stone-950 hover:bg-amber-400 shadow-sm"
              >
                <span>Upgrade Plan</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
            {errorMsg && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-2.5 text-xs text-red-700">
                {errorMsg}
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-stone-700">Creator / Business Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Algorithmic Alpha"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (!handle) {
                    setHandle(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ''));
                  }
                }}
                className="mt-1 w-full rounded-lg border border-stone-200 px-3 py-1.5 text-xs focus:border-stone-900 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-stone-700">Public Handle *</label>
                <div className="mt-1 flex rounded-lg border border-stone-200">
                  <span className="flex items-center px-2 text-xs text-stone-400 bg-stone-50 rounded-l-lg">@</span>
                  <input
                    type="text"
                    required
                    placeholder="alpha_insights"
                    value={handle}
                    onChange={(e) => setHandle(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                    className="w-full rounded-r-lg px-2 py-1.5 text-xs focus:border-stone-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700">Niche / Category</label>
                <select
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-stone-200 px-2 py-1.5 text-xs focus:border-stone-900 focus:outline-none bg-white"
                >
                  <option value="FinTech & Banking">FinTech & Banking</option>
                  <option value="Creator Economy">Creator Economy</option>
                  <option value="B2B Software & SaaS">B2B Software & SaaS</option>
                  <option value="AI & Deep Tech">AI & Deep Tech</option>
                  <option value="Health & BioTech">Health & BioTech</option>
                  <option value="Consulting & Strategy">Consulting & Strategy</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700">Bio / Core Thesis</label>
              <textarea
                rows={2}
                placeholder="What this brand stands for and delivers to followers..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="mt-1 w-full rounded-lg border border-stone-200 p-2 text-xs focus:border-stone-900 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-stone-700">Target Audience</label>
                <input
                  type="text"
                  placeholder="e.g. Seed-stage CTOs"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-stone-200 px-3 py-1.5 text-xs focus:border-stone-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700">Brand Voice</label>
                <input
                  type="text"
                  placeholder="e.g. Authoritative & Analytical"
                  value={brandVoiceSummary}
                  onChange={(e) => setBrandVoiceSummary(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-stone-200 px-3 py-1.5 text-xs focus:border-stone-900 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-stone-100 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-stone-200 px-3 py-1.5 text-xs font-medium text-stone-600 hover:bg-stone-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded-lg bg-stone-900 px-4 py-1.5 text-xs font-semibold text-white hover:bg-stone-800"
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                <span>Create Workspace</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
