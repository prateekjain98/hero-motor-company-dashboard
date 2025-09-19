'use client';

import * as React from 'react';
import { Card } from '@/components/ui/card';
import { financialOverviewData } from '@/constants/mock-api';
import {
  TrendingUp,
  TrendingDown,
  Target,
  AlertCircle,
  Activity,
  Clock,
  Info
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

// Company-wise data structure
const companyWiseData = {
  all: {
    ...financialOverviewData
  },
  'hero-motors': {
    ...financialOverviewData,
    achievedYTD: 45,
    fy26Target: 90,
    identifiedPipeline: 25,
    yetToIdentify: 20
  },
  'hero-cycles': {
    ...financialOverviewData,
    achievedYTD: 20,
    fy26Target: 40,
    identifiedPipeline: 12,
    yetToIdentify: 8
  },
  'hmc-hive': {
    ...financialOverviewData,
    achievedYTD: 8,
    fy26Target: 16,
    identifiedPipeline: 5,
    yetToIdentify: 3
  },
  munjal: {
    ...financialOverviewData,
    achievedYTD: 5,
    fy26Target: 10.8,
    identifiedPipeline: 3,
    yetToIdentify: 2
  }
};

const companyOptions = [
  { value: 'all', label: 'All Companies' },
  { value: 'hero-motors', label: 'Hero Motors' },
  { value: 'hero-cycles', label: 'Hero Cycles' },
  { value: 'hmc-hive', label: 'HMC Hive' },
  { value: 'munjal', label: 'Munjal' }
];

export function FinancialOverviewCards() {
  const [selectedCompany, setSelectedCompany] = React.useState('all');
  const data = companyWiseData[selectedCompany as keyof typeof companyWiseData];

  // Calculate business performance metrics
  const pipelineHealth = (
    (data.identifiedPipeline / data.remainingTarget) *
    100
  ).toFixed(1);
  const burnRate = data.achievedYTD / 9; // Assuming 9 months into FY
  const projectedAchievement = burnRate * 12;
  const velocityTrend = projectedAchievement > data.fy26Target ? 'up' : 'down';

  // Velocity calculation: Current achievement rate vs expected linear rate
  const expectedProgress = 75; // 75% should be achieved by Q3 end (9 months)
  const actualProgress = (data.achievedYTD / data.fy26Target) * 100;
  const velocityPercentage = (
    (actualProgress / expectedProgress) *
    100
  ).toFixed(1);

  // FY26 Performance specific metrics
  const monthlyRunRate = (data.achievedYTD / 9).toFixed(1); // Current monthly pace

  return (
    <TooltipProvider>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4'>
        {/* Card 1: FY26 Performance */}
        <Card className='flex h-full flex-col p-5'>
          {/* Header - Fixed height */}
          <div className='mb-3 flex h-8 items-start justify-between'>
            <div className='flex flex-col'>
              <div className='flex items-center gap-1'>
                <h3 className='text-muted-foreground text-sm font-medium'>
                  FY26 Performance
                </h3>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className='text-muted-foreground/60 h-3 w-3' />
                  </TooltipTrigger>
                  <TooltipContent side='top' className='max-w-xs'>
                    <p className='text-xs'>
                      Financial Year 2026 performance tracking showing actual
                      achievement vs annual targets, helping monitor progress
                      toward yearly goals.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <Select
                value={selectedCompany}
                onValueChange={setSelectedCompany}
              >
                <SelectTrigger className='h-6 w-32 border-0 bg-slate-100 text-xs dark:bg-slate-800'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {companyOptions.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      className='text-xs'
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className='rounded-full bg-slate-100 p-1.5 dark:bg-slate-800'>
                <Target className='h-3.5 w-3.5 text-slate-600 dark:text-slate-400' />
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className='flex flex-1 flex-col'>
            {/* Main Value - Fixed height */}
            <div className='h-16'>
              <div className='mb-1 flex items-end gap-1'>
                <span className='text-2xl leading-none font-bold'>
                  ₹{data.achievedYTD}
                </span>
                <span className='text-muted-foreground mb-0.5 text-sm'>
                  / {data.fy26Target} CR
                </span>
              </div>
            </div>

            {/* Middle Section - Flexible */}
            <div className='flex-1'>
              <div className='mb-1.5 flex justify-between'>
                <div className='flex items-center gap-1'>
                  <span className='text-muted-foreground text-xs'>
                    Achievement
                  </span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className='text-muted-foreground/60 h-2.5 w-2.5' />
                    </TooltipTrigger>
                    <TooltipContent side='top' className='max-w-xs'>
                      <p className='text-xs'>
                        Percentage of annual target completed so far. Calculated
                        as (Achieved YTD ÷ FY26 Target) × 100. Shows how much of
                        the yearly goal has been accomplished.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <span className='text-xs font-medium'>
                  {data.achievementPercentage}%
                </span>
              </div>
              <div className='h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800'>
                <div
                  className='h-full rounded-full bg-gradient-to-r from-blue-500 to-green-500'
                  style={{ width: `${data.achievementPercentage}%` }}
                />
              </div>
            </div>

            {/* Footer - Fixed height */}
            <div className='mt-3 flex h-12 items-center justify-between border-t pt-3'>
              <div className='flex items-center gap-1'>
                <span className='text-muted-foreground text-[11px]'>
                  Required for Target
                </span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className='text-muted-foreground/60 h-2.5 w-2.5' />
                  </TooltipTrigger>
                  <TooltipContent side='top' className='max-w-xs'>
                    <p className='text-xs'>
                      Amount still needed to achieve the annual target.
                      Calculated as FY26 Target - Achieved YTD. This is what the
                      pipeline opportunities should cover.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <span className='text-xs font-semibold'>
                ₹{data.remainingTarget.toFixed(1)} CR
              </span>
            </div>
          </div>
        </Card>

        {/* Card 2: Pipeline Health */}
        <Card className='flex h-full flex-col p-5'>
          {/* Header - Fixed height */}
          <div className='mb-3 flex h-8 items-start justify-between'>
            <div className='flex items-center gap-1'>
              <h3 className='text-muted-foreground text-sm font-medium'>
                Pipeline Health
              </h3>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className='text-muted-foreground/60 h-3 w-3' />
                </TooltipTrigger>
                <TooltipContent side='top' className='max-w-xs'>
                  <p className='text-xs'>
                    Measures the strength of your future revenue opportunities.
                    Shows identified projects and deals in the pipeline vs
                    what&apos;s still needed to meet targets.
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className='rounded-full bg-blue-100 p-1.5 dark:bg-blue-950/30'>
              <Activity className='h-3.5 w-3.5 text-blue-600 dark:text-blue-400' />
            </div>
          </div>

          {/* Content Area */}
          <div className='flex flex-1 flex-col'>
            {/* Main Value - Fixed height */}
            <div className='h-16'>
              <div className='mb-1 flex items-end gap-1'>
                <span className='text-2xl leading-none font-bold'>
                  ₹{data.identifiedPipeline}
                </span>
                <span className='text-muted-foreground mb-0.5 text-sm'>CR</span>
              </div>
              <div className='flex items-center gap-1'>
                <p className='text-muted-foreground text-xs'>
                  Identified Opportunities
                </p>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className='text-muted-foreground/60 h-2.5 w-2.5' />
                  </TooltipTrigger>
                  <TooltipContent side='top' className='max-w-xs'>
                    <p className='text-xs'>
                      Revenue opportunities that have been identified and are
                      actively being pursued. These are potential deals or
                      projects in various stages of development.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>

            {/* Middle Section - Flexible */}
            <div className='flex-1'>
              <div className='mb-1.5 flex justify-between'>
                <span className='text-muted-foreground text-xs'>
                  Coverage Ratio
                </span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span
                      className={`cursor-help text-xs font-medium ${
                        parseInt(pipelineHealth) >= 80
                          ? 'text-green-600'
                          : parseInt(pipelineHealth) >= 60
                            ? 'text-amber-600'
                            : 'text-red-600'
                      }`}
                    >
                      {pipelineHealth}%
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side='top' className='max-w-xs'>
                    <p className='text-xs'>
                      Percentage of remaining target covered by identified
                      opportunities. Formula: (Pipeline ÷ Remaining Target) ×
                      100. Higher percentage indicates better pipeline coverage.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>

              <div className='mb-2 flex gap-1'>
                <div className='relative h-4 flex-1 overflow-hidden rounded bg-blue-500'>
                  <span className='absolute inset-0 flex items-center justify-center text-[10px] font-medium text-white'>
                    ₹{data.identifiedPipeline} CR
                  </span>
                </div>
                <div
                  className='relative h-4 overflow-hidden rounded bg-amber-400'
                  style={{
                    width: `${(data.yetToIdentify / data.pipelineCoverage) * 100}%`,
                    minWidth: '40px'
                  }}
                >
                  <span className='absolute inset-0 flex items-center justify-center text-[10px] font-medium text-white'>
                    ₹{data.yetToIdentify} CR
                  </span>
                </div>
              </div>

              <div className='flex justify-between text-[10px]'>
                <span className='flex items-center gap-1'>
                  <div className='h-2 w-2 rounded-sm bg-blue-500' />
                  <span className='text-muted-foreground'>Identified</span>
                </span>
                <span className='flex items-center gap-1'>
                  <div className='h-2 w-2 rounded-sm bg-amber-400' />
                  <span className='text-muted-foreground'>Gap</span>
                </span>
              </div>
            </div>

            {/* Footer - Fixed height */}
            <div className='mt-3 flex h-12 items-center justify-between border-t pt-3'>
              <div className='flex items-center gap-1'>
                <span className='text-muted-foreground text-[11px]'>
                  Run Rate
                </span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className='text-muted-foreground/60 h-2.5 w-2.5' />
                  </TooltipTrigger>
                  <TooltipContent side='top' className='max-w-xs'>
                    <p className='text-xs'>
                      Current monthly pace of achievement. Calculated as YTD
                      achievement ÷ months elapsed. Helps predict if you&apos;re
                      on track to meet annual targets at this rate.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <span className='text-xs font-semibold'>
                ₹{monthlyRunRate} CR/mo
              </span>
            </div>
          </div>
        </Card>

        {/* Card 3: Risk Overview */}
        <Card className='flex h-full flex-col p-5'>
          {/* Header - Fixed height */}
          <div className='mb-3 flex h-8 items-start justify-between'>
            <div className='flex items-center gap-1'>
              <h3 className='text-muted-foreground text-sm font-medium'>
                Risk Overview
              </h3>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className='text-muted-foreground/60 h-3 w-3' />
                </TooltipTrigger>
                <TooltipContent side='top' className='max-w-xs'>
                  <p className='text-xs'>
                    Identifies revenue at risk due to delayed projects and their
                    potential impact on achieving annual targets. Helps
                    prioritize risk mitigation efforts.
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className='rounded-full bg-red-100 p-1.5 dark:bg-red-950/30'>
              <AlertCircle className='h-3.5 w-3.5 text-red-600 dark:text-red-400' />
            </div>
          </div>

          {/* Content Area */}
          <div className='flex flex-1 flex-col'>
            {/* Main Value - Fixed height */}
            <div className='h-16'>
              <div className='mb-1 flex items-end gap-1'>
                <span className='text-2xl leading-none font-bold text-red-600'>
                  ₹{data.delayedProjects.totalValue}
                </span>
                <div className='mb-0.5 flex items-center gap-1'>
                  <span className='text-muted-foreground text-sm'>
                    CR at risk
                  </span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className='text-muted-foreground/60 h-2.5 w-2.5' />
                    </TooltipTrigger>
                    <TooltipContent side='top' className='max-w-xs'>
                      <p className='text-xs'>
                        CR = Crores. Total revenue value of projects that are
                        currently delayed and may not be completed on time,
                        putting this revenue at risk of not being achieved this
                        fiscal year.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
              <p className='text-muted-foreground text-xs'>
                {data.delayedProjects.projectCount} delayed projects
              </p>
            </div>

            {/* Middle Section - Flexible */}
            <div className='flex-1'>
              <div className='mb-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 dark:border-red-900/20 dark:bg-red-950/10'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-1'>
                    <span className='text-xs text-red-900 dark:text-red-200'>
                      Impact on Target
                    </span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className='h-2.5 w-2.5 text-red-900/60 dark:text-red-200/60' />
                      </TooltipTrigger>
                      <TooltipContent side='top' className='max-w-xs'>
                        <p className='text-xs'>
                          Percentage of annual target affected by delayed
                          projects. Calculated as (Delayed Value ÷ FY26 Target)
                          × 100. Shows how much risk exposure there is.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <span className='text-sm font-bold text-red-600'>
                    {data.delayedPercentage}%
                  </span>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-3'>
                <div>
                  <div className='flex items-center gap-1'>
                    <p className='text-muted-foreground text-[11px]'>
                      Avg Delay
                    </p>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className='text-muted-foreground/60 h-2 w-2' />
                      </TooltipTrigger>
                      <TooltipContent side='top' className='max-w-xs'>
                        <p className='text-xs'>
                          Average number of days that delayed projects are
                          behind their scheduled completion dates. Helps
                          identify timeline recovery needs.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <p className='text-xs font-semibold'>47 days</p>
                </div>
                <div>
                  <div className='flex items-center gap-1'>
                    <p className='text-muted-foreground text-[11px]'>
                      Recovery Rate
                    </p>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className='text-muted-foreground/60 h-2 w-2' />
                      </TooltipTrigger>
                      <TooltipContent side='top' className='max-w-xs'>
                        <p className='text-xs'>
                          Percentage of previously delayed projects that have
                          been successfully brought back on track. Higher rates
                          indicate better project recovery capabilities.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <p className='text-xs font-semibold text-amber-600'>62.3%</p>
                </div>
              </div>
            </div>

            {/* Footer - Fixed height */}
            <div className='mt-3 flex h-12 items-center gap-1.5 border-t pt-3'>
              <Clock className='h-3 w-3 text-amber-500' />
              <div className='flex items-center gap-1'>
                <span className='text-[11px] text-amber-600'>
                  Action needed on{' '}
                  {Math.ceil(data.delayedProjects.projectCount * 0.4)} critical
                  projects
                </span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className='h-2.5 w-2.5 text-amber-600/60' />
                  </TooltipTrigger>
                  <TooltipContent side='top' className='max-w-xs'>
                    <p className='text-xs'>
                      High-priority delayed projects requiring immediate
                      intervention. These are the most critical 40% of delayed
                      projects that need urgent attention to minimize revenue
                      risk.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
        </Card>

        {/* Card 4: Execution Velocity */}
        <Card className='flex h-full flex-col p-5'>
          {/* Header - Fixed height */}
          <div className='mb-3 flex h-8 items-start justify-between'>
            <div className='flex items-center gap-1'>
              <h3 className='text-muted-foreground text-sm font-medium'>
                Execution Velocity
              </h3>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className='text-muted-foreground/60 h-3 w-3' />
                </TooltipTrigger>
                <TooltipContent side='top' className='max-w-xs'>
                  <p className='text-xs'>
                    Measures how fast you&apos;re progressing toward annual
                    targets compared to the expected pace. Shows if you&apos;re
                    ahead, behind, or on track to meet yearly goals.
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div
              className={`rounded-full p-1.5 ${
                velocityTrend === 'up'
                  ? 'bg-green-100 dark:bg-green-950/30'
                  : 'bg-amber-100 dark:bg-amber-950/30'
              }`}
            >
              {velocityTrend === 'up' ? (
                <TrendingUp className='h-3.5 w-3.5 text-green-600 dark:text-green-400' />
              ) : (
                <TrendingDown className='h-3.5 w-3.5 text-amber-600 dark:text-amber-400' />
              )}
            </div>
          </div>

          {/* Content Area */}
          <div className='flex flex-1 flex-col'>
            {/* Main Value - Fixed height */}
            <div className='h-16'>
              <div className='mb-1 flex items-end gap-1'>
                <span className='text-2xl leading-none font-bold'>
                  {velocityPercentage}%
                </span>
                <span className='text-muted-foreground mb-0.5 text-sm'>
                  velocity
                </span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className='text-muted-foreground/60 mb-1 ml-1 h-3 w-3' />
                  </TooltipTrigger>
                  <TooltipContent side='top' className='max-w-xs'>
                    <p className='text-xs'>
                      Velocity Index: (Actual Progress ÷ Expected Progress) ×
                      100
                      <br />
                      <br />
                      Expected: 75% by Q3 end (linear pace)
                      <br />
                      Actual: {actualProgress.toFixed(1)}%
                      <br />
                      <br />
                      Above 100% = Ahead of schedule
                      <br />
                      Below 100% = Behind schedule
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <p className='text-muted-foreground text-xs'>
                vs expected 75% at this time
              </p>
            </div>

            {/* Middle Section - Flexible */}
            <div className='flex-1'>
              <div className='mb-2 flex items-center gap-1'>
                <p className='text-muted-foreground text-[11px]'>
                  Quarterly Achievement
                </p>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className='text-muted-foreground/60 h-2.5 w-2.5' />
                  </TooltipTrigger>
                  <TooltipContent side='top' className='max-w-xs'>
                    <p className='text-xs'>
                      Revenue achieved in each quarter of the fiscal year. Shows
                      the progress pattern and helps identify seasonal trends or
                      performance variations across quarters.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className='grid grid-cols-3 gap-1'>
                <div className='text-center'>
                  <div className='rounded border border-green-200 bg-green-50 px-1 py-1 dark:border-green-900/20 dark:bg-green-950/10'>
                    <p className='text-muted-foreground text-[10px] font-medium'>
                      Q1
                    </p>
                    <p className='text-xs font-semibold text-green-600'>
                      ₹19.7 CR
                    </p>
                  </div>
                </div>
                <div className='text-center'>
                  <div className='rounded border border-green-200 bg-green-50 px-1 py-1 dark:border-green-900/20 dark:bg-green-950/10'>
                    <p className='text-muted-foreground text-[10px] font-medium'>
                      Q2
                    </p>
                    <p className='text-xs font-semibold text-green-600'>
                      ₹27.4 CR
                    </p>
                  </div>
                </div>
                <div className='text-center'>
                  <div className='rounded border border-amber-200 bg-amber-50 px-1 py-1 dark:border-amber-900/20 dark:bg-amber-950/10'>
                    <p className='text-muted-foreground text-[10px] font-medium'>
                      Q3 (ongoing)
                    </p>
                    <p className='text-xs font-semibold text-amber-600'>
                      ₹26.7 CR
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer - Fixed height */}
            <div className='mt-3 grid h-12 grid-cols-2 gap-3 border-t pt-3'>
              <div className='flex flex-col'>
                <div className='flex items-center gap-1'>
                  <span className='text-muted-foreground text-[11px]'>
                    Q4 Target
                  </span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className='text-muted-foreground/60 h-2 w-2' />
                    </TooltipTrigger>
                    <TooltipContent side='top' className='max-w-xs'>
                      <p className='text-xs'>
                        Revenue that needs to be achieved in the fourth quarter
                        to meet the annual target. Calculated as FY26 Target -
                        YTD Achievement.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <p className='text-xs font-semibold'>
                  ₹{(data.fy26Target - data.achievedYTD).toFixed(1)} CR
                </p>
              </div>
              <div className='flex flex-col'>
                <div className='flex items-center gap-1'>
                  <span className='text-muted-foreground text-[11px]'>
                    Monthly Req.
                  </span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className='text-muted-foreground/60 h-2 w-2' />
                    </TooltipTrigger>
                    <TooltipContent side='top' className='max-w-xs'>
                      <p className='text-xs'>
                        Average monthly revenue required in Q4 to meet annual
                        targets. Calculated as Q4 Target ÷ 3 months. Shows the
                        required monthly pace for the remaining period.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <p className='text-xs font-semibold'>
                  ₹{((data.fy26Target - data.achievedYTD) / 3).toFixed(1)} CR
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </TooltipProvider>
  );
}
