'use client';

import PageContainer from '@/components/layout/page-container';
import { useUserTypeStore, UserType } from '@/stores/user-type-store';
import { FinancialOverviewCards } from '@/features/overview/components/financial-overview-cards';
import { CompanyRevenueChart } from '@/features/overview/components/company-revenue-chart';
import React from 'react';

export default function OverViewLayout({
  sales,
  pie_stats,
  bar_stats,
  area_stats
}: {
  sales: React.ReactNode;
  pie_stats: React.ReactNode;
  bar_stats: React.ReactNode;
  area_stats: React.ReactNode;
}) {
  const { currentUserType } = useUserTypeStore();

  const renderSuperAdminDashboard = () => (
    <div className='space-y-8'>
      {/* Financial Overview Cards */}
      <div className='mb-8'>
        <FinancialOverviewCards />
      </div>

      {/* Charts and Analytics Section */}
      <div className='grid grid-cols-1 gap-6 xl:grid-cols-7'>
        {/* Main Revenue Chart - Full Width */}
        <div className='xl:col-span-7'>
          <CompanyRevenueChart />
        </div>

        {/* Secondary Charts */}
        <div className='xl:col-span-4'>
          <div className='h-full'>{bar_stats}</div>
        </div>
        <div className='xl:col-span-3'>
          <div className='h-full'>{sales}</div>
        </div>
        <div className='xl:col-span-4'>
          <div className='h-full'>{area_stats}</div>
        </div>
        <div className='xl:col-span-3'>
          <div className='h-full'>{pie_stats}</div>
        </div>
      </div>
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
      case UserType.SUPER_ADMIN:
        return renderSuperAdminDashboard();
      case UserType.GROUP_CFO:
        return (
          <div className='space-y-8'>
            {/* Financial Overview Cards */}
            <div className='mb-8'>
              <FinancialOverviewCards />
            </div>

            {/* Charts and Analytics Section */}
            <div className='grid grid-cols-1 gap-6 xl:grid-cols-7'>
              {/* Main Revenue Chart - Full Width */}
              <div className='xl:col-span-7'>
                <CompanyRevenueChart />
              </div>

              {/* Secondary Charts */}
              <div className='xl:col-span-4'>
                <div className='h-full'>{bar_stats}</div>
              </div>
              <div className='xl:col-span-3'>
                <div className='h-full'>{sales}</div>
              </div>
              <div className='xl:col-span-4'>
                <div className='h-full'>{area_stats}</div>
              </div>
              <div className='xl:col-span-3'>
                <div className='h-full'>{pie_stats}</div>
              </div>
            </div>
          </div>
        );
      case UserType.BUSINESS_HEAD:
        return renderPlaceholderDashboard('Business Head Dashboard');
      case UserType.PROJECT_MANAGER:
        return renderPlaceholderDashboard('Project Manager Dashboard');
      default:
        return renderSuperAdminDashboard();
    }
  };

  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-6'>
        {/* Header Section */}
        <div className='flex items-center justify-between'>
          <h2 className='text-3xl font-bold tracking-tight'>
            Hi, Welcome back 👋
          </h2>
        </div>

        {/* Main Content */}
        <div className='flex-1'>{renderDashboardContent()}</div>
      </div>
    </PageContainer>
  );
}
