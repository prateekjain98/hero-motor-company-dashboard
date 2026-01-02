'use client';

import PageContainer from '@/components/layout/page-container';
import { useUserTypeStore, UserType } from '@/stores/user-type-store';
import { FinancialOverviewCards } from '@/features/overview/components/financial-overview-cards';
import { BusinessExcellenceChart } from '@/features/overview/components/company-revenue-chart';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function OverViewLayout({
  sales,
  bar_stats,
  area_stats
}: {
  sales: React.ReactNode;
  bar_stats: React.ReactNode;
  area_stats: React.ReactNode;
}) {
  const { currentUserType } = useUserTypeStore();
  const router = useRouter();

  // Redirect to Treasury Executive portal when Treasury Executive is selected
  useEffect(() => {
    if (currentUserType === UserType.TREASURY_EXECUTIVE) {
      router.push('/dashboard/treasury-executive');
    }
  }, [currentUserType, router]);

  const renderGroupDashboard = () => (
    <div className='space-y-6'>
      {/* Financial Overview Cards */}
      <FinancialOverviewCards />

      {/* Main Revenue Chart - Full Width */}
      <BusinessExcellenceChart />

      {/* Charts Grid - Better proportions */}
      <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
        {/* Left Column */}
        <div className='space-y-4'>{bar_stats}</div>

        {/* Right Column */}
        <div className='space-y-4'>{sales}</div>
      </div>

      {/* Resource Efficiency Matrix - Full Width */}
      {area_stats}
    </div>
  );

  const renderPlaceholderDashboard = (title: string) => (
    <div className='text-muted-foreground flex h-64 items-center justify-center'>
      <div className='text-center'>
        <h3 className='text-lg font-medium'>{title}</h3>
        <p className='text-sm'>Coming soon...</p>
      </div>
    </div>
  );

  const renderDashboardContent = () => {
    switch (currentUserType) {
      case UserType.GROUP:
        return renderGroupDashboard();
      case UserType.BU_CFO:
        return (
          <div className='space-y-6'>
            {/* Financial Overview Cards */}
            <FinancialOverviewCards />

            {/* Main Revenue Chart - Full Width */}
            <BusinessExcellenceChart />

            {/* Charts Grid - Better proportions */}
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
              {/* Left Column */}
              <div className='space-y-4'>{bar_stats}</div>

              {/* Right Column */}
              <div className='space-y-4'>{sales}</div>
            </div>

            {/* Resource Efficiency Matrix - Full Width */}
            {area_stats}
          </div>
        );
      case UserType.FUNCTION_HEAD:
        return renderPlaceholderDashboard('Function Head Dashboard');
      case UserType.PROJECT_MANAGER:
        return renderPlaceholderDashboard('Project Manager Dashboard');
      case UserType.TREASURY_EXECUTIVE:
        return (
          <div className='text-muted-foreground flex h-64 items-center justify-center'>
            <div className='text-center'>
              <h3 className='text-lg font-medium'>
                Redirecting to Treasury Executive Portal...
              </h3>
              <p className='text-sm'>Please wait</p>
            </div>
          </div>
        );
      default:
        return renderGroupDashboard();
    }
  };

  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-4'>
        {/* Header Section */}
        <div className='flex items-center justify-between'>
          <h2 className='mb-4 text-xl font-bold tracking-tight'>
            Hi, Welcome to Business Excellence Dashboard 👋
          </h2>
        </div>

        {/* Main Content */}
        <div className='flex-1'>{renderDashboardContent()}</div>
      </div>
    </PageContainer>
  );
}
