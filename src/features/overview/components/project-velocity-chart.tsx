'use client';

import * as React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  Tooltip,
  LabelList
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { projectVelocityData } from '@/constants/business-excellence-data';
import {
  fakeProjects,
  companyPerformanceData,
  type CompanyGroup
} from '@/constants/mock-api';
import {
  AlertCircle,
  Activity,
  Clock,
  ChevronRight,
  HourglassIcon,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { cn } from '@/lib/utils';

const companyNames = {
  all: 'HMC',
  'hero-motors': 'Hero Motors',
  'hero-cycles': 'Hero Cycles',
  'hmc-hive': 'HMC Hive',
  munjal: 'Munjal'
};

export function ProjectVelocityChart() {
  const [selectedCompany, setSelectedCompany] = React.useState<
    CompanyGroup | 'all'
  >('all');

  // Initialize projects data
  React.useEffect(() => {
    fakeProjects.ensureInitialized();
  }, []);

  // Get filtered projects based on selected company
  const allProjects = fakeProjects.records;
  const filteredProjects =
    selectedCompany === 'all'
      ? allProjects
      : allProjects.filter(
          (project) => project.company_group === selectedCompany
        );

  // Calculate stage-based data from filtered projects
  const getProjectsByStage = (stage: string) => {
    return filteredProjects.filter((project) => project.stage === stage);
  };

  // Generate stage distribution based on companyPerformanceData for consistency
  const getRealisticStageData = () => {
    if (selectedCompany === 'all') {
      // Sum projects from companyPerformanceData by stage (including L5)
      const stageTotals = {
        L0: 0,
        L1: 0,
        L2: 0,
        L3: 0,
        L4: 0,
        L5: 0
      };

      companyPerformanceData.forEach((company) => {
        stageTotals.L0 += company.l0;
        stageTotals.L1 += company.l1;
        stageTotals.L2 += company.l2;
        stageTotals.L3 += company.l3;
        stageTotals.L4 += company.l4;
        stageTotals.L5 += company.l5; // Include L5 (Actuarial stage)
      });

      // Total pipeline value: 12.5 + 15.2 + 18.7 + 14.8 + 11.3 + 6.3 = 78.8 CR
      // This aligns with financialOverviewData: 156.8 CR target - 78 CR achieved = 78.8 CR remaining
      return [
        {
          stage: 'L0',
          activeProjects: stageTotals.L0,
          pendingApprovalProjects: Math.floor(stageTotals.L0 * 0.08),
          delayedProjects: Math.floor(stageTotals.L0 * 0.05),
          stageValue: 12.5 // Early pipeline - concept stage (aligns with financialOverviewData)
        },
        {
          stage: 'L1',
          activeProjects: stageTotals.L1,
          pendingApprovalProjects: Math.floor(stageTotals.L1 * 0.12),
          delayedProjects: Math.floor(stageTotals.L1 * 0.08),
          stageValue: 15.2 // Planning stage pipeline (aligns with financialOverviewData)
        },
        {
          stage: 'L2',
          activeProjects: stageTotals.L2,
          pendingApprovalProjects: Math.floor(stageTotals.L2 * 0.15),
          delayedProjects: Math.floor(stageTotals.L2 * 0.1),
          stageValue: 18.7 // Development stage pipeline (aligns with financialOverviewData)
        },
        {
          stage: 'L3',
          activeProjects: stageTotals.L3,
          pendingApprovalProjects: Math.floor(stageTotals.L3 * 0.1),
          delayedProjects: Math.floor(stageTotals.L3 * 0.12),
          stageValue: 14.8, // Implementation stage pipeline (aligns with financialOverviewData)
          monthlyValue: 8.7
        },
        {
          stage: 'L4',
          activeProjects: stageTotals.L4,
          pendingApprovalProjects: Math.floor(stageTotals.L4 * 0.08),
          delayedProjects: Math.floor(stageTotals.L4 * 0.15),
          stageValue: 11.3, // Implemented stage pipeline (aligns with financialOverviewData)
          monthlyValue: 15.3,
          lastMonthImplemented: 15.3
        },
        {
          stage: 'L5',
          activeProjects: stageTotals.L5,
          pendingApprovalProjects: 0,
          delayedProjects: 0,
          stageValue: 6.3, // Actuarial stage - completed projects (aligns with financialOverviewData)
          monthlyValue: 22.1,
          actuarialValue: 22.1
        }
      ];
    } else {
      // Get individual company data from companyPerformanceData
      const companyData = companyPerformanceData.find(
        (company) =>
          company.company.toLowerCase().replace(' ', '-') === selectedCompany ||
          (company.company === 'Munjal Kiru' && selectedCompany === 'munjal')
      );

      if (!companyData) return [];

      // Company-specific financial targets (proportional to their size from financialOverviewData)
      const companyMultipliers = {
        'hero-motors': {
          factor: 0.57,
          monthly: { l3: 4.9, l4: 8.7, l5: 12.6 }
        }, // ~57% of total (90/156.8)
        'hero-cycles': { factor: 0.26, monthly: { l3: 2.3, l4: 3.9, l5: 5.7 } }, // ~26% of total (40/156.8)
        'hmc-hive': { factor: 0.1, monthly: { l3: 0.9, l4: 1.5, l5: 2.2 } }, // ~10% of total (16/156.8)
        munjal: { factor: 0.07, monthly: { l3: 0.6, l4: 1.2, l5: 1.6 } } // ~7% of total (10.8/156.8)
      };

      const multiplier =
        companyMultipliers[
          selectedCompany as keyof typeof companyMultipliers
        ] || companyMultipliers['hero-motors'];

      return [
        {
          stage: 'L0',
          activeProjects: companyData.l0,
          pendingApprovalProjects: Math.floor(companyData.l0 * 0.08),
          delayedProjects: Math.floor(companyData.l0 * 0.05),
          stageValue: 12.5 * multiplier.factor // Proportional to company size
        },
        {
          stage: 'L1',
          activeProjects: companyData.l1,
          pendingApprovalProjects: Math.floor(companyData.l1 * 0.12),
          delayedProjects: Math.floor(companyData.l1 * 0.08),
          stageValue: 15.2 * multiplier.factor // Proportional to company size
        },
        {
          stage: 'L2',
          activeProjects: companyData.l2,
          pendingApprovalProjects: Math.floor(companyData.l2 * 0.15),
          delayedProjects: Math.floor(companyData.l2 * 0.1),
          stageValue: 18.7 * multiplier.factor // Proportional to company size
        },
        {
          stage: 'L3',
          activeProjects: companyData.l3,
          pendingApprovalProjects: Math.floor(companyData.l3 * 0.1),
          delayedProjects: Math.floor(companyData.l3 * 0.12),
          stageValue: 14.8 * multiplier.factor, // Proportional to company size
          monthlyValue: multiplier.monthly.l3
        },
        {
          stage: 'L4',
          activeProjects: companyData.l4,
          pendingApprovalProjects: Math.floor(companyData.l4 * 0.08),
          delayedProjects: Math.floor(companyData.l4 * 0.15),
          stageValue: 11.3 * multiplier.factor, // Proportional to company size
          monthlyValue: multiplier.monthly.l4,
          lastMonthImplemented: multiplier.monthly.l4
        },
        {
          stage: 'L5',
          activeProjects: companyData.l5,
          pendingApprovalProjects: 0,
          delayedProjects: 0,
          stageValue: 6.3 * multiplier.factor, // Proportional to company size
          monthlyValue: multiplier.monthly.l5,
          actuarialValue: multiplier.monthly.l5
        }
      ];
    }
  };

  const realisticData = getRealisticStageData();

  // Generate dynamic data based on realistic distributions
  const dynamicProjectData = projectVelocityData.map((stageData) => {
    const stageInfo = realisticData.find((d) => d.stage === stageData.stage);

    return {
      ...stageData,
      activeProjects: stageInfo?.activeProjects || 0,
      pendingApprovalProjects: stageInfo?.pendingApprovalProjects || 0,
      delayedProjects: stageInfo?.delayedProjects || 0,
      stageValue: stageInfo?.stageValue || 0,
      monthlyValue: stageInfo?.monthlyValue,
      lastMonthImplemented: stageInfo?.lastMonthImplemented,
      actuarialValue: stageInfo?.actuarialValue
    };
  });

  const totalProjects = dynamicProjectData.reduce(
    (sum, d) => sum + d.activeProjects,
    0
  );
  const pendingApprovalProjects = dynamicProjectData.reduce(
    (sum, d) => sum + d.pendingApprovalProjects,
    0
  );
  const delayedProjects = dynamicProjectData.reduce(
    (sum, d) => sum + d.delayedProjects,
    0
  );

  // Calculate meaningful executive metrics
  const totalPipelineValue = dynamicProjectData.reduce(
    (sum, stage) => sum + (stage.stageValue || 0),
    0
  );

  // Find bottleneck stage (highest pending approval ratio)
  const bottleneckStage = dynamicProjectData.reduce((worst, current) => {
    const currentRatio =
      current.activeProjects > 0
        ? current.pendingApprovalProjects / current.activeProjects
        : 0;
    const worstRatio =
      worst.activeProjects > 0
        ? worst.pendingApprovalProjects / worst.activeProjects
        : 0;
    return currentRatio > worstRatio ? current : worst;
  }, dynamicProjectData[0]);

  // Calculate pipeline efficiency (projects on track vs total)
  const totalActiveWithPending = dynamicProjectData.reduce(
    (sum, stage) => sum + stage.activeProjects + stage.pendingApprovalProjects,
    0
  );
  const pipelineEfficiency =
    totalActiveWithPending > 0
      ? Math.round(
          ((totalActiveWithPending - pendingApprovalProjects) /
            totalActiveWithPending) *
            100
        )
      : 0;

  // Enhanced data with calculated metrics
  const enhancedData = dynamicProjectData.map((stage) => {
    const totalProjects = stage.activeProjects || 1; // Avoid division by zero
    const onTrackProjects =
      stage.activeProjects -
      stage.pendingApprovalProjects -
      stage.delayedProjects;

    // Calculate value segments based on project proportions
    const onTrackValue =
      (onTrackProjects / totalProjects) * (stage.stageValue || 0);
    const pendingValue =
      (stage.pendingApprovalProjects / totalProjects) * (stage.stageValue || 0);
    const delayedValue =
      (stage.delayedProjects / totalProjects) * (stage.stageValue || 0);

    return {
      ...stage,
      onTrackProjects,
      onTrackValue: Math.max(0, onTrackValue),
      pendingValue: Math.max(0, pendingValue),
      delayedValue: Math.max(0, delayedValue),
      isDelayed: stage.avgCycleTime > stage.targetCycleTime,
      delayPercentage:
        stage.avgCycleTime > stage.targetCycleTime
          ? Math.round(
              ((stage.avgCycleTime - stage.targetCycleTime) /
                stage.targetCycleTime) *
                100
            )
          : 0,
      efficiency: stage.stageEfficiency
    };
  });

  // Calculate overall metrics
  const overallEfficiency = Math.round(
    enhancedData.reduce((sum, stage) => sum + stage.stageEfficiency, 0) /
      enhancedData.length
  );

  const onTrackProjectsCount = enhancedData.reduce(
    (sum, stage) => sum + stage.onTrackProjects,
    0
  );

  // Custom tooltip
  const CustomTooltip = ({
    active,
    payload,
    label
  }: {
    active?: boolean;
    payload?: Array<{
      color: string;
      dataKey: string;
      name: string;
      value: number;
      payload: {
        stage: string;
        name: string;
        avgCycleTime: number;
        targetCycleTime: number;
        pendingApprovalProjects: number;
        delayedProjects: number;
        onTrackProjects: number;
        delayPercentage: number;
        stageEfficiency: number;
        stageValue?: number;
        monthlyValue?: number;
        lastMonthImplemented?: number;
        actuarialValue?: number;
        onTrackValue?: number;
        pendingValue?: number;
        delayedValue?: number;
      };
    }>;
    label?: string;
  }) => {
    if (active && payload && payload.length > 0) {
      const data = payload[0].payload;
      return (
        <div className='bg-background/95 border-border rounded-lg border p-3 shadow-lg backdrop-blur-sm'>
          <div className='mb-2'>
            <p className='text-sm font-semibold'>{data.name}</p>
            <p className='text-muted-foreground text-xs'>
              Stage {data.stage} • {data.stageEfficiency}% efficiency
            </p>
          </div>
          <div className='space-y-1 text-xs'>
            {/* Stage Value - Always show */}
            {data.stageValue && (
              <div className='flex justify-between gap-4'>
                <span className='text-muted-foreground'>Stage Value:</span>
                <span className='font-medium text-blue-600'>
                  ₹{data.stageValue.toFixed(1)} CR
                </span>
              </div>
            )}

            {/* Special information for L4 and L5 */}
            {data.stage === 'L4' && data.lastMonthImplemented && (
              <div className='flex justify-between gap-4'>
                <span className='text-muted-foreground'>
                  Last Month Implemented:
                </span>
                <span className='font-medium text-green-600'>
                  ₹{data.lastMonthImplemented} CR
                </span>
              </div>
            )}

            {data.stage === 'L5' && data.actuarialValue && (
              <div className='flex justify-between gap-4'>
                <span className='text-muted-foreground'>Actuarial Value:</span>
                <span className='font-medium text-purple-600'>
                  ₹{data.actuarialValue} CR
                </span>
              </div>
            )}

            <hr className='my-2' />

            <div className='flex justify-between gap-4'>
              <span className='text-muted-foreground'>On Track:</span>
              <span className='font-medium text-green-600'>
                {data.onTrackProjects} projects (₹
                {(data.onTrackValue || 0).toFixed(1)} CR)
              </span>
            </div>
            <div className='flex justify-between gap-4'>
              <span className='text-muted-foreground'>Pending:</span>
              <span className='font-medium text-yellow-600'>
                {data.pendingApprovalProjects} projects (₹
                {(data.pendingValue || 0).toFixed(1)} CR)
              </span>
            </div>
            <div className='flex justify-between gap-4'>
              <span className='text-muted-foreground'>Delayed:</span>
              <span className='font-medium text-red-600'>
                {data.delayedProjects} projects (₹
                {(data.delayedValue || 0).toFixed(1)} CR)
              </span>
            </div>
            <hr className='my-2' />
            <div className='flex justify-between gap-4'>
              <span className='text-muted-foreground'>Avg Cycle Time:</span>
              <span
                className={cn(
                  'font-medium',
                  data.avgCycleTime > data.targetCycleTime
                    ? 'text-red-600'
                    : 'text-green-600'
                )}
              >
                {data.avgCycleTime}d
              </span>
            </div>
            <div className='flex justify-between gap-4'>
              <span className='text-muted-foreground'>Target Time:</span>
              <span className='font-medium'>{data.targetCycleTime}d</span>
            </div>
            {data.delayPercentage > 0 && (
              <div className='flex justify-between gap-4'>
                <span className='text-muted-foreground'>Delay:</span>
                <span className='font-medium text-red-600'>
                  +{data.delayPercentage}%
                </span>
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className='flex h-full flex-col overflow-hidden'>
      <CardHeader className='pb-3'>
        <div className='flex items-start justify-between'>
          <div className='flex-1'>
            <div className='flex items-center justify-between'>
              <CardTitle className='flex items-center gap-2 text-base'>
                <ChevronRight className='h-4 w-4 text-gray-600' />
                Project Pipeline (L0-L5)
              </CardTitle>
              <Select
                value={selectedCompany}
                onValueChange={(value: CompanyGroup | 'all') =>
                  setSelectedCompany(value)
                }
              >
                <SelectTrigger className='w-48'>
                  <SelectValue placeholder='Select company group' />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(companyNames).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <CardDescription className='mt-1 text-xs'>
              Stage progression from concept to launch • {totalProjects}{' '}
              projects in pipeline
            </CardDescription>
            <div className='mt-3 flex gap-2'>
              <Badge
                variant='outline'
                className='bg-indigo-50 dark:bg-indigo-950/20'
              >
                <TrendingUp className='mr-1 h-3 w-3 text-indigo-600' />₹
                {totalPipelineValue.toFixed(1)} Cr Value
              </Badge>
              {pendingApprovalProjects > 0 && (
                <Badge
                  variant='outline'
                  className='bg-amber-50 dark:bg-amber-950/20'
                >
                  <HourglassIcon className='mr-1 h-3 w-3 text-amber-600' />
                  {bottleneckStage?.stage || 'L2'} Bottleneck
                </Badge>
              )}
              <Badge
                variant='outline'
                className='bg-emerald-50 dark:bg-emerald-950/20'
              >
                <Activity className='mr-1 h-3 w-3 text-emerald-600' />
                {pipelineEfficiency}% Efficiency
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className='flex flex-1 flex-col px-0 pt-0'>
        {/* Main Chart - Increased height */}
        <div className='flex-1 px-4'>
          <ResponsiveContainer width='100%' height='100%' minHeight={280}>
            <BarChart
              data={enhancedData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray='3 3' className='opacity-30' />
              <XAxis
                dataKey='stage'
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                tickFormatter={(value) => `₹${value.toFixed(0)}`}
                label={{
                  value: 'Value (₹ Crores)',
                  angle: -90,
                  position: 'insideLeft',
                  style: {
                    textAnchor: 'middle',
                    fontSize: '10px',
                    fill: 'hsl(var(--muted-foreground))'
                  }
                }}
                domain={[0, 'dataMax + 2']}
                tickCount={5}
              />
              <Tooltip content={<CustomTooltip />} />

              <Bar
                dataKey='onTrackValue'
                stackId='a'
                fill='#22c55e'
                name='On Track Value'
                radius={[0, 0, 0, 0]}
              >
                <LabelList
                  dataKey='onTrackValue'
                  position='center'
                  fontSize={10}
                  fill='white'
                  formatter={(value: number) =>
                    value > 5 ? `₹${value.toFixed(0)}` : ''
                  }
                />
              </Bar>
              <Bar
                dataKey='pendingValue'
                stackId='a'
                fill='#eab308'
                name='Pending Value'
                radius={[0, 0, 0, 0]}
              >
                <LabelList
                  dataKey='pendingValue'
                  position='center'
                  fontSize={10}
                  fill='white'
                  formatter={(value: number) =>
                    value > 3 ? `₹${value.toFixed(0)}` : ''
                  }
                />
              </Bar>
              <Bar
                dataKey='delayedValue'
                stackId='a'
                fill='#ef4444'
                name='Delayed Value'
                radius={[2, 2, 0, 0]}
              >
                <LabelList
                  dataKey='delayedValue'
                  position='center'
                  fontSize={10}
                  fill='white'
                  formatter={(value: number) =>
                    value > 3 ? `₹${value.toFixed(0)}` : ''
                  }
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Compact Performance Summary */}
        <div className='mt-3 space-y-3 border-t px-4 pt-3'>
          {/* Overall Metrics Row */}
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-6'>
              <div className='text-center'>
                <div className='text-lg font-bold text-green-600'>
                  {onTrackProjectsCount}
                </div>
                <div className='text-muted-foreground text-xs'>On Track</div>
              </div>
              <div className='text-center'>
                <div className='text-lg font-bold text-yellow-600'>
                  {pendingApprovalProjects}
                </div>
                <div className='text-muted-foreground text-xs'>Pending</div>
              </div>
              <div className='text-center'>
                <div className='text-lg font-bold text-red-600'>
                  {delayedProjects}
                </div>
                <div className='text-muted-foreground text-xs'>Delayed</div>
              </div>
            </div>

            <div className='text-right'>
              <div className='flex items-center gap-1'>
                {overallEfficiency >= 80 ? (
                  <TrendingUp className='h-4 w-4 text-green-600' />
                ) : (
                  <TrendingDown className='h-4 w-4 text-red-600' />
                )}
                <span
                  className={cn(
                    'text-lg font-bold',
                    overallEfficiency >= 80 ? 'text-green-600' : 'text-red-600'
                  )}
                >
                  {overallEfficiency}%
                </span>
              </div>
              <div className='text-muted-foreground text-xs'>
                Avg Efficiency
              </div>
            </div>
          </div>

          {/* Stage Performance - Simplified Layout */}
          <div>
            <div className='mb-2 text-sm font-medium'>Stage Performance</div>
            <div className='grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs'>
              {enhancedData.map((stage) => (
                <div
                  key={stage.stage}
                  className='flex items-center justify-between rounded border border-gray-100 px-2 py-1 dark:border-gray-800'
                >
                  <div className='flex items-center gap-2'>
                    <div
                      className={cn(
                        'h-2 w-2 rounded-full',
                        stage.isDelayed ? 'bg-red-500' : 'bg-green-500'
                      )}
                    />
                    <span className='font-medium'>{stage.stage}</span>
                    <span className='text-muted-foreground'>
                      ({stage.name})
                    </span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='text-muted-foreground'>
                      {stage.avgCycleTime}d/{stage.targetCycleTime}d
                    </span>
                    <span
                      className={cn(
                        'font-medium',
                        stage.isDelayed ? 'text-red-600' : 'text-green-600'
                      )}
                    >
                      {stage.stageEfficiency}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
