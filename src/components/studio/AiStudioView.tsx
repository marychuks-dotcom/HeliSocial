import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ContentAsset, SourceType, CarouselSlide } from '../../types';
import {
  Sparkles,
  FileText,
  Upload,
  Globe,
  Lightbulb,
  Copy,
  Check,
  Share2,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Download,
  AlertCircle,
  Layers,
  Send,
  RefreshCw,
  Hash,
  Sliders,
  CheckCircle2,
} from 'lucide-react';

export const AiStudioView: React.FC = () => {
  const {
    activeBusiness,
    activeBrandProfile,
    subscription,
    isGenerating,
    generationError,
    latestGeneratedAssets,
    generateCampaignAssets,
    publishToHeliSocial,
    publishToExternal,
    saveAsset,
    scopedCampaigns,
    setActiveView,
  } = useApp();

  // Input states
  const [sourceType, setSourceType] = useState<SourceType>('TOPIC_IDEA');
  const [sourceTitle, setSourceTitle] = useState('');
  const [sourceText, setSourceText] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [urlInput, setUrlInput] = useState('');

  // Strategic Controls
  const [selectedObjective, setSelectedObjective] = useState('Thought Leadership');
  const [selectedTone, setSelectedTone] = useState(activeBrandProfile.primaryTone || 'Authoritative');
  const [targetAudience, setTargetAudience] = useState(activeBusiness.targetAudience);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>('');

  // Carousel interactive preview state
  const [carouselSlideIndex, setCarouselSlideIndex] = useState(0);

  // Copied asset feedback
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // Sample quick loaders for rapid testing
  const loadSamplePdf = () => {
    setSourceType('PDF_UPLOAD');
    setUploadedFileName('institutional-liquidity-routing-q3.pdf');
    setSourceTitle('Cross-Border Liquidity Architecture');
    setSourceText(
      `Executive Summary: Analysis of automated market clearing corridors across 40 tier-1 commercial banks. Highlights: 1. Batch reconciliation creates $42M in annual idle float. 2. Real-time TWAP algorithmic execution cuts cross-currency slippage by 28 bps. 3. Counterparty risk assessment shifts from retrospective audit to continuous cryptographic state verification.`
    );
  };

  const loadSampleUrl = () => {
    setSourceType('URL_PAGE');
    setUrlInput('https://fintechpulse.example.com/research/iso-20022-mandate');
    setSourceTitle('The 2027 ISO 20022 Banking Mandate');
    setSourceText(
      `Extracted Article: The deadline for global financial messaging convergence is approaching. Institutions failing to decouple core ledgers from legacy SWIFT formats face severe operational fines and clearing latency. Key tactical shifts: XML payload streaming, instant compliance checks, and unified event schemas.`
    );
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionNotice(null);

    const fullSourceText = sourceText || urlInput || sourceTitle;
    if (!fullSourceText.trim()) {
      alert('Please provide source content, a topic idea, or upload a document.');
      return;
    }

    try {
      await generateCampaignAssets({
        sourceType,
        sourceText: fullSourceText,
        sourceTitle: sourceTitle || 'Strategic Analysis',
        targetAudience: targetAudience || activeBusiness.targetAudience,
        platform: 'All Multi-Format Channels',
        tone: selectedTone,
        objective: selectedObjective,
        campaignId: selectedCampaignId || undefined,
      });
      setCarouselSlideIndex(0);
      setActionNotice('Multi-format campaign cards generated and registered in receipt ledger!');
    } catch (err) {
      // Error handled in context state
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handlePublishHeliSocial = async (asset: ContentAsset) => {
    const res = await publishToHeliSocial(asset, activeBusiness.niche);
    if (res.success) {
      setActionNotice(`Published to HeliSocial! Receipt #${res.receiptId} confirmed.`);
    }
  };

  const handlePublishExternal = async (asset: ContentAsset, platform: 'LINKEDIN' | 'X') => {
    const res = await publishToExternal(asset, platform);
    if (res.success) {
      setActionNotice(`Published to ${platform}! Receipt #${res.receiptId} with verified external link.`);
    }
  };

  const handleSaveToWorkspace = (asset: ContentAsset) => {
    saveAsset(asset);
    setActionNotice(`Asset "${asset.title}" saved to business workspace.`);
  };

  const handleExportText = (asset: ContentAsset) => {
    const blob = new Blob([asset.plainTextVersion], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${asset.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.md`;
    a.click();
    URL.revokeObjectURL(url);
    setActionNotice(`Downloaded ${asset.title} as Markdown.`);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-6">
      {/* Header & Strategic Scope Banner */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between border-b border-stone-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-stone-900 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-400">
              AI Content Studio
            </span>
            <span className="text-xs text-stone-500 font-medium">
              Scoped to: <strong className="text-stone-900">@{activeBusiness.handle}</strong> ({activeBusiness.name})
            </span>
          </div>
          <h1 className="mt-1 font-serif text-2xl font-bold tracking-tight text-stone-900">
            Structured Content Repurposing Engine
          </h1>
          <p className="text-xs text-stone-600">
            Ingest long-form sources, synthesize through brand voice guidelines, and output multi-format platform cards with verified publishing receipts.
          </p>
        </div>

        {/* Brand Voice Snapshot Pill */}
        <div className="flex items-center gap-3 rounded-xl border border-stone-200 bg-stone-50 p-2.5">
          <img
            src={activeBusiness.avatarUrl}
            alt=""
            className="h-8 w-8 rounded-full object-cover ring-1 ring-stone-300"
          />
          <div className="text-left">
            <div className="text-xs font-semibold text-stone-900">{activeBrandProfile.archetype}</div>
            <div className="text-[11px] text-stone-500">Tone: {selectedTone} · {activeBusiness.niche}</div>
          </div>
        </div>
      </div>

      {actionNotice && (
        <div className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-xs text-emerald-900 animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
            <span>{actionNotice}</span>
          </div>
          <button onClick={() => setActionNotice(null)} className="text-emerald-700 hover:text-emerald-900 font-bold">
            ×
          </button>
        </div>
      )}

      {generationError && (
        <div className="flex items-center justify-between rounded-xl border border-red-200 bg-red-50 p-4 text-xs text-red-900">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
            <span>{generationError}</span>
          </div>
          <button
            onClick={() => setActiveView('pricing')}
            className="rounded-lg bg-red-600 px-3 py-1 text-xs font-semibold text-white hover:bg-red-700"
          >
            Upgrade AI Credits
          </button>
        </div>
      )}

      {/* Primary Studio Grid: Ingestion & Controls (Left) + Structured Output Cards (Right) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* LEFT COLUMN: Input & Strategic Parameters */}
        <div className="lg:col-span-5 space-y-4">
          <form onSubmit={handleGenerate} className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-900 flex items-center gap-1.5">
                <FileText className="h-4 w-4 text-stone-500" />
                1. Source Input
              </h2>
              <div className="flex gap-1.5">
                <button
                  type="button"
                  onClick={loadSamplePdf}
                  className="rounded bg-stone-100 px-2 py-0.5 text-[10px] font-medium text-stone-600 hover:bg-stone-200"
                >
                  Load Sample PDF
                </button>
                <button
                  type="button"
                  onClick={loadSampleUrl}
                  className="rounded bg-stone-100 px-2 py-0.5 text-[10px] font-medium text-stone-600 hover:bg-stone-200"
                >
                  Load Sample URL
                </button>
              </div>
            </div>

            {/* Source Type Selector */}
            <div className="grid grid-cols-4 gap-1.5 rounded-lg border border-stone-200 p-1 bg-stone-50">
              <button
                type="button"
                onClick={() => setSourceType('TOPIC_IDEA')}
                className={`flex flex-col items-center justify-center rounded-md py-1.5 text-[11px] font-medium transition ${
                  sourceType === 'TOPIC_IDEA' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                <Lightbulb className="h-3.5 w-3.5 mb-0.5" />
                Topic
              </button>
              <button
                type="button"
                onClick={() => setSourceType('RAW_TEXT')}
                className={`flex flex-col items-center justify-center rounded-md py-1.5 text-[11px] font-medium transition ${
                  sourceType === 'RAW_TEXT' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                <FileText className="h-3.5 w-3.5 mb-0.5" />
                Text
              </button>
              <button
                type="button"
                onClick={() => setSourceType('PDF_UPLOAD')}
                className={`flex flex-col items-center justify-center rounded-md py-1.5 text-[11px] font-medium transition ${
                  sourceType === 'PDF_UPLOAD' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                <Upload className="h-3.5 w-3.5 mb-0.5" />
                PDF
              </button>
              <button
                type="button"
                onClick={() => setSourceType('URL_PAGE')}
                className={`flex flex-col items-center justify-center rounded-md py-1.5 text-[11px] font-medium transition ${
                  sourceType === 'URL_PAGE' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                <Globe className="h-3.5 w-3.5 mb-0.5" />
                URL
              </button>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700">Source Title / Main Thesis</label>
              <input
                type="text"
                placeholder="e.g. The Real Cost of Core Banking Latency"
                value={sourceTitle}
                onChange={(e) => setSourceTitle(e.target.value)}
                className="mt-1 w-full rounded-lg border border-stone-200 px-3 py-1.5 text-xs focus:border-stone-900 focus:outline-none"
              />
            </div>

            {sourceType === 'URL_PAGE' && (
              <div>
                <label className="block text-xs font-medium text-stone-700">Webpage / Blog Article URL</label>
                <input
                  type="url"
                  placeholder="https://example.com/insights/report"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-stone-200 px-3 py-1.5 text-xs focus:border-stone-900 focus:outline-none"
                />
                <p className="mt-1 text-[10px] text-stone-400">
                  SSRF-guarded. Strips navigation bars, cookie consents, and scripts.
                </p>
              </div>
            )}

            {sourceType === 'PDF_UPLOAD' && (
              <div>
                <label className="block text-xs font-medium text-stone-700">PDF Document</label>
                <div className="mt-1 flex flex-col items-center justify-center rounded-xl border border-dashed border-stone-300 bg-stone-50/50 p-4 text-center">
                  <Upload className="h-6 w-6 text-stone-400 mb-1" />
                  <p className="text-xs text-stone-700 font-medium">
                    {uploadedFileName ? uploadedFileName : 'Drag & drop PDF here, or click to browse'}
                  </p>
                  <p className="text-[10px] text-stone-400 mt-0.5">Supports whitepapers, pitch decks, client reports (up to 20MB)</p>
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-stone-700">
                {sourceType === 'TOPIC_IDEA' ? 'Core Concepts & Points to Cover' : 'Source Content Extract'}
              </label>
              <textarea
                rows={4}
                placeholder="Paste paragraphs, case study notes, or raw findings..."
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                className="mt-1 w-full rounded-lg border border-stone-200 p-2.5 text-xs focus:border-stone-900 focus:outline-none"
              />
            </div>

            {/* Strategic Parameters */}
            <div className="border-t border-stone-100 pt-3 space-y-3">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-900 flex items-center gap-1.5">
                <Sliders className="h-4 w-4 text-stone-500" />
                2. Strategy & Tone
              </h2>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-stone-600">Tone of Voice</label>
                  <select
                    value={selectedTone}
                    onChange={(e) => setSelectedTone(e.target.value)}
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
                  <label className="block text-[11px] font-medium text-stone-600">Strategic Objective</label>
                  <select
                    value={selectedObjective}
                    onChange={(e) => setSelectedObjective(e.target.value)}
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
              </div>

              <div>
                <label className="block text-[11px] font-medium text-stone-600">Assign to Campaign (Optional)</label>
                <select
                  value={selectedCampaignId}
                  onChange={(e) => setSelectedCampaignId(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-stone-200 px-2 py-1.5 text-xs bg-white focus:border-stone-900 focus:outline-none"
                >
                  <option value="">-- Create Standalone Assets --</option>
                  {scopedCampaigns.map((cmp) => (
                    <option key={cmp.id} value={cmp.id}>
                      {cmp.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit Action */}
            <div className="border-t border-stone-100 pt-3">
              <button
                type="submit"
                disabled={isGenerating}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-stone-900 py-2.5 text-xs font-semibold text-white transition hover:bg-stone-800 disabled:opacity-50 shadow-sm"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin text-amber-400" />
                    <span>Synthesizing Multi-Format Suite...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 text-amber-400" />
                    <span>Generate Structured Assets (30 Credits)</span>
                  </>
                )}
              </button>
              <div className="mt-2 text-center text-[10px] text-stone-400">
                Enforces @{activeBusiness.handle}'s brand voice guidelines. Deducts 30 credits from {subscription.aiCreditsTotal - subscription.aiCreditsUsed} remaining.
              </div>
            </div>
          </form>
        </div>

        {/* RIGHT COLUMN: Output Cards Display */}
        <div className="lg:col-span-7 space-y-5">
          {latestGeneratedAssets.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-stone-300 bg-stone-50/50 p-12 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 mb-3">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-base font-bold text-stone-800">No Generated Assets in Active Session</h3>
              <p className="mt-1 max-w-md text-xs text-stone-500">
                Select or paste your source content on the left to generate a structured 6-card multi-channel campaign suite (LinkedIn Post, 8-Slide Carousel, X Thread, Quick Posts, Hooks, Hashtags).
              </p>
              <button
                onClick={loadSamplePdf}
                className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-xs font-medium text-stone-700 hover:bg-stone-50 shadow-xs"
              >
                <FileText className="h-3.5 w-3.5 text-stone-400" />
                Quick Test with Sample Whitepaper
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-xs font-semibold text-stone-900">
                    Generated Asset Suite ({latestGeneratedAssets.length} Cards)
                  </span>
                </div>
                <div className="text-[11px] text-stone-500">All outputs logged in Publishing Receipts</div>
              </div>

              {/* CARD 1: LINKEDIN POST */}
              {latestGeneratedAssets.find((a) => a.assetType === 'LINKEDIN_POST') && (
                (() => {
                  const asset = latestGeneratedAssets.find((a) => a.assetType === 'LINKEDIN_POST')!;
                  return (
                    <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-xs space-y-3">
                      <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
                        <div className="flex items-center gap-2">
                          <span className="rounded bg-sky-100 px-2 py-0.5 text-[10px] font-bold text-sky-900">
                            LINKEDIN POST
                          </span>
                          <span className="text-xs font-semibold text-stone-800 truncate">{asset.title}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleCopy(asset.plainTextVersion, asset.id)}
                            className="flex items-center gap-1 rounded px-2 py-1 text-[11px] text-stone-600 hover:bg-stone-100"
                            title="Copy to clipboard"
                          >
                            {copiedId === asset.id ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                            <span>{copiedId === asset.id ? 'Copied' : 'Copy'}</span>
                          </button>
                          <button
                            onClick={() => handleExportText(asset)}
                            className="rounded p-1 text-stone-400 hover:text-stone-700"
                            title="Export Markdown"
                          >
                            <Download className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2 rounded-lg bg-stone-50/70 p-3.5 text-xs text-stone-800 font-sans leading-relaxed">
                        <div className="font-semibold text-stone-900">{asset.structuredPayload.hook}</div>
                        <div className="whitespace-pre-line text-stone-700">{asset.structuredPayload.body}</div>
                        <div className="italic text-stone-600 pt-1 border-t border-stone-200/60">{asset.structuredPayload.cta}</div>
                      </div>

                      <div className="flex items-center justify-between pt-1 text-xs">
                        <button
                          onClick={() => handleSaveToWorkspace(asset)}
                          className="flex items-center gap-1 text-stone-600 hover:text-stone-900 text-[11px] font-medium"
                        >
                          <Bookmark className="h-3.5 w-3.5" />
                          Save to Workspace
                        </button>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handlePublishHeliSocial(asset)}
                            className="flex items-center gap-1 rounded-lg border border-stone-200 px-2.5 py-1 text-[11px] font-semibold text-stone-800 hover:bg-stone-50"
                          >
                            <Share2 className="h-3 w-3" />
                            Publish to HeliSocial
                          </button>
                          <button
                            onClick={() => handlePublishExternal(asset, 'LINKEDIN')}
                            className="flex items-center gap-1 rounded-lg bg-sky-700 px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-sky-800"
                          >
                            <ExternalLink className="h-3 w-3" />
                            Publish to LinkedIn
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })()
              )}

              {/* CARD 2: LINKEDIN CAROUSEL (6-10 SLIDES) */}
              {latestGeneratedAssets.find((a) => a.assetType === 'LINKEDIN_CAROUSEL') && (
                (() => {
                  const asset = latestGeneratedAssets.find((a) => a.assetType === 'LINKEDIN_CAROUSEL')!;
                  const slides = asset.structuredPayload.slides || [];
                  const currentSlide = slides[carouselSlideIndex] || slides[0];

                  return (
                    <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-xs space-y-3">
                      <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
                        <div className="flex items-center gap-2">
                          <span className="rounded bg-indigo-100 px-2 py-0.5 text-[10px] font-bold text-indigo-900">
                            CAROUSEL DECK ({slides.length} SLIDES)
                          </span>
                          <span className="text-xs font-semibold text-stone-800">{asset.title}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleCopy(JSON.stringify(slides, null, 2), asset.id)}
                            className="flex items-center gap-1 rounded px-2 py-1 text-[11px] text-stone-600 hover:bg-stone-100"
                          >
                            {copiedId === asset.id ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                            <span>Copy Deck</span>
                          </button>
                          <button
                            onClick={() => handleExportText(asset)}
                            className="rounded p-1 text-stone-400 hover:text-stone-700"
                            title="Export Markdown"
                          >
                            <Download className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Interactive Carousel Slide Viewer */}
                      {currentSlide && (
                        <div className="relative rounded-xl border border-stone-800 bg-stone-950 p-6 text-white shadow-inner min-h-[190px] flex flex-col justify-between">
                          <div className="flex items-center justify-between text-[11px] text-amber-400 font-mono">
                            <span>@{activeBusiness.handle}</span>
                            <span>Slide {currentSlide.slideNumber} of {slides.length}</span>
                          </div>

                          <div className="my-3 space-y-2">
                            <h4 className="font-serif text-base font-bold text-white leading-snug">
                              {currentSlide.title}
                            </h4>
                            <p className="text-xs text-stone-300 leading-relaxed whitespace-pre-line">
                              {currentSlide.content}
                            </p>
                          </div>

                          <div className="flex items-center justify-between border-t border-stone-800 pt-2 text-[10px] text-stone-400">
                            <span className="italic">{currentSlide.visualNote || 'Swipe to continue →'}</span>
                            <div className="flex items-center gap-1">
                              <button
                                disabled={carouselSlideIndex === 0}
                                onClick={() => setCarouselSlideIndex((prev) => Math.max(0, prev - 1))}
                                className="rounded bg-stone-800 p-1 text-stone-300 hover:bg-stone-700 disabled:opacity-30"
                              >
                                <ChevronLeft className="h-3.5 w-3.5" />
                              </button>
                              <button
                                disabled={carouselSlideIndex === slides.length - 1}
                                onClick={() => setCarouselSlideIndex((prev) => Math.min(slides.length - 1, prev + 1))}
                                className="rounded bg-stone-800 p-1 text-stone-300 hover:bg-stone-700 disabled:opacity-30"
                              >
                                <ChevronRight className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-1 text-xs">
                        <button
                          onClick={() => handleSaveToWorkspace(asset)}
                          className="flex items-center gap-1 text-stone-600 hover:text-stone-900 text-[11px] font-medium"
                        >
                          <Bookmark className="h-3.5 w-3.5" />
                          Save Deck to Workspace
                        </button>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handlePublishHeliSocial(asset)}
                            className="flex items-center gap-1 rounded-lg border border-stone-200 px-2.5 py-1 text-[11px] font-semibold text-stone-800 hover:bg-stone-50"
                          >
                            <Share2 className="h-3 w-3" />
                            Publish to HeliSocial
                          </button>
                          <button
                            onClick={() => handlePublishExternal(asset, 'LINKEDIN')}
                            className="flex items-center gap-1 rounded-lg bg-indigo-700 px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-indigo-800"
                          >
                            <ExternalLink className="h-3 w-3" />
                            Publish Carousel (LinkedIn)
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })()
              )}

              {/* CARD 3: X THREAD */}
              {latestGeneratedAssets.find((a) => a.assetType === 'X_THREAD') && (
                (() => {
                  const asset = latestGeneratedAssets.find((a) => a.assetType === 'X_THREAD')!;
                  const tweets = asset.structuredPayload.threadTweets || [];

                  return (
                    <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-xs space-y-3">
                      <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
                        <div className="flex items-center gap-2">
                          <span className="rounded bg-stone-900 px-2 py-0.5 text-[10px] font-bold text-white">
                            X THREAD ({tweets.length} TWEETS)
                          </span>
                          <span className="text-xs font-semibold text-stone-800">{asset.title}</span>
                        </div>
                        <button
                          onClick={() => handleCopy(tweets.join('\n\n---\n\n'), asset.id)}
                          className="flex items-center gap-1 rounded px-2 py-1 text-[11px] text-stone-600 hover:bg-stone-100"
                        >
                          {copiedId === asset.id ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                          <span>Copy All</span>
                        </button>
                      </div>

                      <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                        {tweets.map((t, idx) => (
                          <div key={idx} className="rounded-lg border border-stone-200 bg-stone-50 p-2.5 text-xs text-stone-800">
                            <span className="text-[10px] font-bold text-stone-400 mr-1.5">Tweet {idx + 1}</span>
                            {t}
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-1 text-xs">
                        <button
                          onClick={() => handleSaveToWorkspace(asset)}
                          className="flex items-center gap-1 text-stone-600 hover:text-stone-900 text-[11px] font-medium"
                        >
                          <Bookmark className="h-3.5 w-3.5" />
                          Save Thread
                        </button>
                        <button
                          onClick={() => handlePublishExternal(asset, 'X')}
                          className="flex items-center gap-1 rounded-lg bg-stone-900 px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-stone-800"
                        >
                          <ExternalLink className="h-3 w-3" />
                          Publish to X
                        </button>
                      </div>
                    </div>
                  );
                })()
              )}

              {/* CARD 4: QUICK STANDALONE POSTS */}
              {latestGeneratedAssets.find((a) => a.assetType === 'QUICK_POSTS') && (
                (() => {
                  const asset = latestGeneratedAssets.find((a) => a.assetType === 'QUICK_POSTS')!;
                  const posts = asset.structuredPayload.quickPosts || [];

                  return (
                    <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-xs space-y-3">
                      <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
                        <span className="rounded bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-900">
                          QUICK POST VARIATIONS ({posts.length})
                        </span>
                        <span className="text-xs text-stone-500 font-medium">Standalone single-thought insights</span>
                      </div>

                      <div className="space-y-2.5">
                        {posts.map((qp, idx) => (
                          <div key={idx} className="rounded-lg border border-stone-200 p-3 text-xs text-stone-800 relative group">
                            <p>{qp}</p>
                            <div className="mt-2 flex justify-end gap-2">
                              <button
                                onClick={() => handleCopy(qp, `qp-${idx}`)}
                                className="rounded px-2 py-0.5 text-[10px] text-stone-500 hover:bg-stone-100"
                              >
                                {copiedId === `qp-${idx}` ? 'Copied' : 'Copy'}
                              </button>
                              <button
                                onClick={() =>
                                  handlePublishHeliSocial({
                                    ...asset,
                                    id: 'ast-qp-' + Date.now(),
                                    plainTextVersion: qp,
                                  })
                                }
                                className="rounded bg-stone-900 px-2 py-0.5 text-[10px] font-semibold text-white hover:bg-stone-800"
                              >
                                Post to HeliSocial
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()
              )}

              {/* CARD 5: HOOKS & HASHTAGS */}
              {latestGeneratedAssets.find((a) => a.assetType === 'HOOKS') && (
                (() => {
                  const asset = latestGeneratedAssets.find((a) => a.assetType === 'HOOKS')!;
                  const hooks = asset.structuredPayload.hooksList || [];

                  return (
                    <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-xs space-y-3">
                      <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
                        <span className="rounded bg-stone-100 px-2 py-0.5 text-[10px] font-bold text-stone-800">
                          ALTERNATIVE VIRAL HOOKS
                        </span>
                        <span className="text-xs text-stone-400">Test different openings</span>
                      </div>

                      <div className="space-y-1.5">
                        {hooks.map((hk, idx) => (
                          <div
                            key={idx}
                            onClick={() => handleCopy(hk, `hk-${idx}`)}
                            className="flex items-center justify-between rounded-lg border border-stone-200/80 p-2 text-xs text-stone-800 hover:bg-amber-50/50 cursor-pointer transition"
                          >
                            <span>{hk}</span>
                            <span className="text-[10px] text-stone-400 font-mono">
                              {copiedId === `hk-${idx}` ? 'Copied' : 'Copy'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
