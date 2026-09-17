import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Layers,
  Users,
  FileCheck,
  BarChart3,
  Building2,
  Bell,
  ChevronDown,
  Plus,
  ShieldCheck,
  ExternalLink,
  CreditCard,
  Globe,
  Check,
  CheckCircle2,
  Trash2,
} from 'lucide-react';

interface NavbarProps {
  onOpenNewBusinessModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenNewBusinessModal }) => {
  const {
    activeView,
    setActiveView,
    activeBusiness,
    myBusinesses,
    switchBusiness,
    subscription,
    currentPlan,
    notifications,
    unreadNotificationCount,
    markNotificationsAsRead,
    dismissNotification,
  } = useApp();

  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const remainingCredits = subscription.aiCreditsTotal - subscription.aiCreditsUsed;
  const creditPercent = Math.min(100, Math.round((subscription.aiCreditsUsed / subscription.aiCreditsTotal) * 100));

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Brand Logo & Creator Business Switcher */}
        <div className="flex items-center gap-6">
          <button
            id="nav-logo-btn"
            onClick={() => setActiveView('dashboard')}
            className="flex items-center gap-2 text-left transition hover:opacity-85"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-stone-900 text-amber-400 shadow-sm">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <span className="font-serif text-lg font-bold tracking-tight text-stone-900">
                Heli<span className="text-amber-600">Social</span>
              </span>
              <span className="hidden text-[10px] uppercase tracking-wider text-stone-500 sm:block">
                Creator Operating System
              </span>
            </div>
          </button>

          {/* Business Switcher Dropdown */}
          <div className="relative">
            <button
              id="business-switcher-btn"
              onClick={() => setIsSwitcherOpen(!isSwitcherOpen)}
              className="flex items-center gap-2.5 rounded-lg border border-stone-200 bg-stone-50 px-3 py-1.5 text-left text-sm transition hover:bg-stone-100 hover:border-stone-300"
            >
              <img
                src={activeBusiness.avatarUrl}
                alt={activeBusiness.name}
                className="h-6 w-6 rounded-full object-cover ring-1 ring-stone-300"
              />
              <div className="hidden flex-col md:flex">
                <span className="font-semibold text-xs leading-none text-stone-900 truncate max-w-[130px]">
                  {activeBusiness.name}
                </span>
                <span className="text-[10px] text-stone-500 leading-tight">
                  @{activeBusiness.handle}
                </span>
              </div>
              <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[9px] font-semibold text-amber-800">
                {currentPlan.name}
              </span>
              <ChevronDown className="h-3.5 w-3.5 text-stone-400" />
            </button>

            {isSwitcherOpen && (
              <div
                id="business-switcher-menu"
                className="absolute left-0 mt-2 w-72 rounded-xl border border-stone-200 bg-white p-2 shadow-xl ring-1 ring-black/5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
              >
                <div className="px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-stone-400">
                  Switch Creator Business ({myBusinesses.length}/{currentPlan.maxBusinesses})
                </div>
                <div className="space-y-1">
                  {myBusinesses.map((biz) => {
                    const isSelected = biz.id === activeBusiness.id;
                    return (
                      <button
                        key={biz.id}
                        onClick={() => {
                          switchBusiness(biz.id);
                          setIsSwitcherOpen(false);
                        }}
                        className={`flex w-full items-center justify-between rounded-lg p-2 text-left text-sm transition ${
                          isSelected ? 'bg-amber-50/80 text-amber-950 font-medium' : 'hover:bg-stone-50 text-stone-700'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img
                            src={biz.avatarUrl}
                            alt={biz.name}
                            className="h-7 w-7 rounded-full object-cover flex-shrink-0"
                          />
                          <div className="truncate">
                            <div className="truncate text-xs font-semibold">{biz.name}</div>
                            <div className="text-[11px] text-stone-500">@{biz.handle}</div>
                          </div>
                        </div>
                        {isSelected && <Check className="h-4 w-4 text-amber-600 flex-shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-2 border-t border-stone-100 pt-2">
                  <button
                    id="add-new-business-btn"
                    onClick={() => {
                      setIsSwitcherOpen(false);
                      onOpenNewBusinessModal();
                    }}
                    className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-stone-300 py-1.5 text-xs font-medium text-stone-600 hover:border-stone-400 hover:text-stone-900 transition"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add Creator Business
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          <button
            id="nav-dashboard"
            onClick={() => setActiveView('dashboard')}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
              activeView === 'dashboard'
                ? 'bg-stone-900 text-white'
                : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
            }`}
          >
            Dashboard
          </button>
          <button
            id="nav-studio"
            onClick={() => setActiveView('studio')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
              activeView === 'studio'
                ? 'bg-stone-900 text-white'
                : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            AI Studio
          </button>
          <button
            id="nav-campaigns"
            onClick={() => setActiveView('campaigns')}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
              activeView === 'campaigns'
                ? 'bg-stone-900 text-white'
                : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
            }`}
          >
            Campaigns
          </button>
          <button
            id="nav-community"
            onClick={() => setActiveView('community')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
              activeView === 'community'
                ? 'bg-stone-900 text-white'
                : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
            }`}
          >
            <Users className="h-3.5 w-3.5" />
            Community
          </button>
          <button
            id="nav-receipts"
            onClick={() => setActiveView('receipts')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
              activeView === 'receipts'
                ? 'bg-stone-900 text-white'
                : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
            }`}
          >
            <FileCheck className="h-3.5 w-3.5" />
            Receipts
          </button>
          <button
            id="nav-analytics"
            onClick={() => setActiveView('analytics')}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
              activeView === 'analytics'
                ? 'bg-stone-900 text-white'
                : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
            }`}
          >
            Analytics
          </button>
          <button
            id="nav-businesses"
            onClick={() => setActiveView('businesses')}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
              activeView === 'businesses'
                ? 'bg-stone-900 text-white'
                : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
            }`}
          >
            Brand Voice
          </button>
        </nav>

        {/* Right: + Create Button, AI Credit Meter, Notifications, User Menu */}
        <div className="flex items-center gap-3">
          {/* Quick + Create action */}
          <button
            id="quick-create-btn"
            onClick={() => setActiveView('studio')}
            className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-3.5 py-1.5 text-xs font-semibold text-stone-950 shadow-sm transition hover:bg-amber-400 hover:shadow"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Create</span>
          </button>

          {/* AI Credits Pill */}
          <div
            onClick={() => setActiveView('pricing')}
            className="hidden sm:flex cursor-pointer items-center gap-2 rounded-lg border border-stone-200 bg-stone-50 px-2.5 py-1 text-xs transition hover:bg-stone-100"
            title="Click to manage subscription or buy AI credits"
          >
            <div className="flex items-center gap-1 text-stone-700 font-medium text-[11px]">
              <Sparkles className="h-3 w-3 text-amber-500" />
              <span>{remainingCredits}</span>
              <span className="text-stone-400">/ {subscription.aiCreditsTotal}</span>
            </div>
            <div className="h-1.5 w-12 rounded-full bg-stone-200 overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full"
                style={{ width: `${creditPercent}%` }}
              />
            </div>
          </div>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              id="notifications-bell-btn"
              onClick={() => {
                setIsNotifOpen(!isNotifOpen);
                if (!isNotifOpen) markNotificationsAsRead();
              }}
              className="relative rounded-lg p-2 text-stone-600 hover:bg-stone-100 transition"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              {unreadNotificationCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-stone-950">
                  {unreadNotificationCount}
                </span>
              )}
            </button>

            {isNotifOpen && (
              <div
                id="notifications-dropdown"
                className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl border border-stone-200 bg-white p-3 shadow-xl ring-1 ring-black/5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
              >
                <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Notifications
                  </span>
                  <span className="text-[11px] text-stone-400">
                    {notifications.length} alerts
                  </span>
                </div>
                <div className="max-h-72 overflow-y-auto divide-y divide-stone-50 py-1">
                  {notifications.length === 0 ? (
                    <div className="py-6 text-center text-xs text-stone-400">No notifications yet.</div>
                  ) : (
                    notifications.map((n) => (
                      <div key={n.id} className="flex items-start gap-2.5 py-2.5 hover:bg-stone-50/50 px-1 rounded-lg">
                        <img
                          src={n.actorAvatar}
                          alt=""
                          className="h-6 w-6 rounded-full object-cover flex-shrink-0 mt-0.5"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-stone-800 leading-snug">{n.message}</p>
                          <span className="text-[10px] text-stone-400">
                            {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <button
                          onClick={() => dismissNotification(n.id)}
                          className="text-stone-300 hover:text-stone-500 p-0.5"
                          title="Dismiss"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Menu Dropdown */}
          <div className="relative">
            <button
              id="user-menu-btn"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-1.5 rounded-full p-0.5 ring-1 ring-stone-200 transition hover:ring-stone-400"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-stone-800 text-xs font-semibold text-white">
                AR
              </div>
            </button>

            {isUserMenuOpen && (
              <div
                id="user-menu-dropdown"
                className="absolute right-0 mt-2 w-56 rounded-xl border border-stone-200 bg-white p-2 shadow-xl ring-1 ring-black/5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
              >
                <div className="px-2.5 py-2 border-b border-stone-100">
                  <div className="text-xs font-semibold text-stone-900">Alex Rivera</div>
                  <div className="text-[11px] text-stone-400 truncate">alex@example.com</div>
                  <div className="mt-1 inline-flex items-center gap-1 rounded bg-stone-100 px-1.5 py-0.5 text-[10px] font-medium text-stone-600">
                    Plan: <span className="font-bold text-stone-900">{currentPlan.name}</span>
                  </div>
                </div>

                <div className="py-1 space-y-0.5">
                  <button
                    onClick={() => {
                      setActiveView('pricing');
                      setIsUserMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-xs text-stone-700 hover:bg-stone-50"
                  >
                    <CreditCard className="h-3.5 w-3.5 text-stone-400" />
                    Subscription & Billing
                  </button>
                  <button
                    onClick={() => {
                      setActiveView('admin');
                      setIsUserMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-xs text-stone-700 hover:bg-stone-50 font-medium text-amber-900 bg-amber-50/50"
                  >
                    <ShieldCheck className="h-3.5 w-3.5 text-amber-600" />
                    Admin & Flippa Telemetry
                  </button>
                  <button
                    onClick={() => {
                      setActiveView('marketing');
                      setIsUserMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-xs text-stone-700 hover:bg-stone-50"
                  >
                    <Globe className="h-3.5 w-3.5 text-stone-400" />
                    View Marketing Site
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
