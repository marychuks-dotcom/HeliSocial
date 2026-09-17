import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PublishingReceipt, ReceiptStatus } from '../../types';
import {
  FileCheck,
  CheckCircle2,
  ExternalLink,
  Clock,
  Filter,
  ShieldCheck,
  Eye,
  AlertCircle,
  Copy,
  Check,
  Search,
} from 'lucide-react';

export const ReceiptsView: React.FC = () => {
  const { scopedReceipts, activeBusiness } = useApp();

  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [inspectingReceipt, setInspectingReceipt] = useState<PublishingReceipt | null>(null);
  const [copiedPayload, setCopiedPayload] = useState(false);

  const filteredReceipts = scopedReceipts.filter((r) => {
    if (filterStatus !== 'ALL' && r.status !== filterStatus) return false;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        r.id.toLowerCase().includes(term) ||
        r.assetTitle.toLowerCase().includes(term) ||
        r.destinationPlatform.toLowerCase().includes(term)
      );
    }
    return true;
  });

  const getStatusBadge = (status: ReceiptStatus) => {
    switch (status) {
      case 'EXTERNALLY_PUBLISHED':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
            <CheckCircle2 className="h-3 w-3" />
            EXTERNALLY PUBLISHED
          </span>
        );
      case 'PUBLISHED_TO_HELISOCIAL':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-sky-100 px-2.5 py-0.5 text-[10px] font-bold text-sky-800">
            <CheckCircle2 className="h-3 w-3" />
            PUBLISHED (HELISOCIAL)
          </span>
        );
      case 'SAVED':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-bold text-amber-800">
            <Clock className="h-3 w-3" />
            SAVED DRAFT
          </span>
        );
      case 'GENERATED':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-2.5 py-0.5 text-[10px] font-bold text-purple-800">
            GENERATED
          </span>
        );
      case 'EXTERNAL_PUBLISH_REQUESTED':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-stone-200 px-2.5 py-0.5 text-[10px] font-bold text-stone-800">
            DISPATCHING...
          </span>
        );
      case 'FAILED':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-0.5 text-[10px] font-bold text-red-800">
            <AlertCircle className="h-3 w-3" />
            FAILED
          </span>
        );
    }
  };

  const handleCopyInspectPayload = () => {
    if (!inspectingReceipt) return;
    navigator.clipboard.writeText(JSON.stringify(inspectingReceipt, null, 2));
    setCopiedPayload(true);
    setTimeout(() => setCopiedPayload(false), 2000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-stone-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-stone-900 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-400">
              Audit & Verification
            </span>
            <span className="text-xs text-stone-500 font-medium">
              Scoped to: @{activeBusiness.handle}
            </span>
          </div>
          <h1 className="mt-1 font-serif text-2xl font-bold tracking-tight text-stone-900">
            Publishing Receipts Ledger
          </h1>
          <p className="text-xs text-stone-600">
            Tamper-evident record of all AI generation, workspace saves, internal community broadcasts, and external social network dispatches.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="rounded-xl border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs text-stone-700 font-mono">
            {scopedReceipts.length} Total Receipts
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
          {['ALL', 'PUBLISHED_TO_HELISOCIAL', 'EXTERNALLY_PUBLISHED', 'SAVED', 'GENERATED'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`rounded-lg px-3 py-1.5 font-medium transition ${
                filterStatus === st
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {st.replace(/_/g, ' ')}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-stone-400" />
          <input
            type="text"
            placeholder="Search by ID or asset..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-stone-200 pl-8 pr-3 py-1.5 text-xs focus:border-stone-900 focus:outline-none"
          />
        </div>
      </div>

      {/* Receipts Table */}
      <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-600">
            <thead className="bg-stone-50 border-b border-stone-200 text-[11px] uppercase tracking-wider font-semibold text-stone-500">
              <tr>
                <th className="px-5 py-3">Receipt ID</th>
                <th className="px-5 py-3">Asset Title & Type</th>
                <th className="px-5 py-3">Destination</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Timestamp (UTC)</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredReceipts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-center text-stone-400">
                    No publishing receipts match the filter.
                  </td>
                </tr>
              ) : (
                filteredReceipts.map((receipt) => (
                  <tr key={receipt.id} className="hover:bg-stone-50/60 transition">
                    <td className="px-5 py-3.5 font-mono text-[11px] font-bold text-stone-900">
                      #{receipt.id}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="font-semibold text-stone-900 truncate max-w-xs">{receipt.assetTitle}</div>
                      <span className="text-[10px] text-stone-400">{receipt.assetType}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="rounded bg-stone-100 px-2 py-0.5 text-[10px] font-bold text-stone-700">
                        {receipt.destinationPlatform}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">{getStatusBadge(receipt.status)}</td>
                    <td className="px-5 py-3.5 font-mono text-[11px] text-stone-500">
                      {new Date(receipt.timestamp).toLocaleString()}
                    </td>
                    <td className="px-5 py-3.5 text-right space-x-2">
                      {receipt.externalPostUrl && (
                        <a
                          href={receipt.externalPostUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 rounded bg-stone-100 px-2 py-1 text-[10px] font-semibold text-stone-700 hover:bg-stone-200"
                        >
                          <span>Live Link</span>
                          <ExternalLink className="h-2.5 w-2.5" />
                        </a>
                      )}
                      <button
                        onClick={() => setInspectingReceipt(receipt)}
                        className="inline-flex items-center gap-1 rounded border border-stone-200 px-2 py-1 text-[10px] font-medium text-stone-600 hover:bg-stone-50"
                      >
                        <Eye className="h-2.5 w-2.5" />
                        <span>Audit JSON</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* JSON Audit Modal */}
      {inspectingReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl border border-stone-200 bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-amber-600" />
                <h3 className="font-serif text-base font-bold text-stone-900">
                  Publishing Receipt Audit Trace
                </h3>
              </div>
              <button
                onClick={() => setInspectingReceipt(null)}
                className="text-stone-400 hover:text-stone-700 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="rounded-xl border border-stone-800 bg-stone-950 p-4 font-mono text-xs text-amber-400 overflow-x-auto max-h-80">
              <pre>{JSON.stringify(inspectingReceipt, null, 2)}</pre>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-stone-400">
                Cryptographically verifiable timestamped audit trace.
              </span>
              <button
                onClick={handleCopyInspectPayload}
                className="flex items-center gap-1.5 rounded-lg bg-stone-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-stone-800"
              >
                {copiedPayload ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                <span>{copiedPayload ? 'Copied' : 'Copy JSON'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
