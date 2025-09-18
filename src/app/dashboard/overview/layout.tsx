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
    <div className='space-y-6'>
      {/* Financial Overview Cards */}
      <FinancialOverviewCards />

      {/* Main Revenue Chart - Full Width */}
      <CompanyRevenueChart />

      {/* Charts Grid - Better proportions */}
      <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
        {/* Left Column */}
        <div className='space-y-4'>
          {bar_stats}
          {area_stats}
        </div>

        {/* Right Column */}
        <div className='space-y-4'>
          {sales}
          {pie_stats}
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
          <div className='space-y-6'>
            {/* Financial Overview Cards */}
            <FinancialOverviewCards />

            {/* Main Revenue Chart - Full Width */}
            <CompanyRevenueChart />

            {/* Charts Grid - Better proportions */}
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
              {/* Left Column */}
              <div className='space-y-4'>
                {bar_stats}
                {area_stats}
              </div>

              {/* Right Column */}
              <div className='space-y-4'>
                {sales}
                {pie_stats}
              </div>
            </div>
          </div>
        );
      case UserType.BUSINESS_HEAD:
        return renderPlaceholderDashboard('Function Head Dashboard');
      case UserType.PROJECT_MANAGER:
        return renderPlaceholderDashboard('Project Manager Dashboard');
      default:
        return renderSuperAdminDashboard();
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
