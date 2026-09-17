import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { DemoModeBanner } from './components/layout/DemoModeBanner';
import { BusinessSwitcherModal } from './components/layout/BusinessSwitcherModal';
import { DashboardView } from './components/dashboard/DashboardView';
import { AiStudioView } from './components/studio/AiStudioView';
import { CampaignsView } from './components/campaigns/CampaignsView';
import { CommunityView } from './components/community/CommunityView';
import { ReceiptsView } from './components/receipts/ReceiptsView';
import { BusinessesView } from './components/businesses/BusinessesView';
import { AnalyticsView } from './components/analytics/AnalyticsView';
import { CreatorProfileView } from './components/profile/CreatorProfileView';
import { AdminDashboardView } from './components/admin/AdminDashboardView';
import { PricingView } from './components/pricing/PricingView';
import { MarketingLandingView } from './components/marketing/MarketingLandingView';

const MainLayout: React.FC = () => {
  const { activeView } = useApp();
  const [isNewBusinessModalOpen, setIsNewBusinessModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 font-sans flex flex-col">
      <DemoModeBanner />
      {activeView !== 'marketing' && (
        <Navbar onOpenNewBusinessModal={() => setIsNewBusinessModalOpen(true)} />
      )}

      <main className="flex-1 pb-12">
        {activeView === 'marketing' && <MarketingLandingView />}
        {activeView === 'dashboard' && <DashboardView />}
        {activeView === 'studio' && <AiStudioView />}
        {activeView === 'campaigns' && <CampaignsView />}
        {activeView === 'community' && <CommunityView />}
        {activeView === 'receipts' && <ReceiptsView />}
        {activeView === 'businesses' && <BusinessesView />}
        {activeView === 'analytics' && <AnalyticsView />}
        {activeView === 'profile' && <CreatorProfileView />}
        {activeView === 'admin' && <AdminDashboardView />}
        {activeView === 'pricing' && <PricingView />}
      </main>

      <BusinessSwitcherModal
        isOpen={isNewBusinessModalOpen}
        onClose={() => setIsNewBusinessModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
