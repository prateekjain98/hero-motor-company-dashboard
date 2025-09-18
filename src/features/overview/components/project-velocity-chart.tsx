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
      // Sum active projects from companyPerformanceData by stage (L0-L4 only)
      const stageTotals = {
        L0: 0,
        L1: 0,
        L2: 0,
        L3: 0,
        L4: 0
      };

      companyPerformanceData.forEach((company) => {
        stageTotals.L0 += company.l0;
        stageTotals.L1 += company.l1;
        stageTotals.L2 += company.l2;
        stageTotals.L3 += company.l3;
        stageTotals.L4 += company.l4;
        // Exclude L5 (completed projects) from active pipeline
      });

      return [
        {
          stage: 'L0',
          activeProjects: stageTotals.L0,
          pendingApprovalProjects: Math.floor(stageTotals.L0 * 0.08),
          delayedProjects: Math.floor(stageTotals.L0 * 0.05)
        },
        {
          stage: 'L1',
          activeProjects: stageTotals.L1,
          pendingApprovalProjects: Math.floor(stageTotals.L1 * 0.12),
          delayedProjects: Math.floor(stageTotals.L1 * 0.08)
        },
        {
          stage: 'L2',
          activeProjects: stageTotals.L2,
          pendingApprovalProjects: Math.floor(stageTotals.L2 * 0.15),
          delayedProjects: Math.floor(stageTotals.L2 * 0.1)
        },
        {
          stage: 'L3',
          activeProjects: stageTotals.L3,
          pendingApprovalProjects: Math.floor(stageTotals.L3 * 0.1),
          delayedProjects: Math.floor(stageTotals.L3 * 0.12)
        },
        {
          stage: 'L4',
          activeProjects: stageTotals.L4,
          pendingApprovalProjects: Math.floor(stageTotals.L4 * 0.08),
          delayedProjects: Math.floor(stageTotals.L4 * 0.15)
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

      return [
        {
          stage: 'L0',
          activeProjects: companyData.l0,
          pendingApprovalProjects: Math.floor(companyData.l0 * 0.08),
          delayedProjects: Math.floor(companyData.l0 * 0.05)
        },
        {
          stage: 'L1',
          activeProjects: companyData.l1,
          pendingApprovalProjects: Math.floor(companyData.l1 * 0.12),
          delayedProjects: Math.floor(companyData.l1 * 0.08)
        },
        {
          stage: 'L2',
          activeProjects: companyData.l2,
          pendingApprovalProjects: Math.floor(companyData.l2 * 0.15),
          delayedProjects: Math.floor(companyData.l2 * 0.1)
        },
        {
          stage: 'L3',
          activeProjects: companyData.l3,
          pendingApprovalProjects: Math.floor(companyData.l3 * 0.1),
          delayedProjects: Math.floor(companyData.l3 * 0.12)
        },
        {
          stage: 'L4',
          activeProjects: companyData.l4,
          pendingApprovalProjects: Math.floor(companyData.l4 * 0.08),
          delayedProjects: Math.floor(companyData.l4 * 0.15)
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
      delayedProjects: stageInfo?.delayedProjects || 0
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

  // Enhanced data with calculated metrics
  const enhancedData = dynamicProjectData.map((stage) => ({
    ...stage,
    healthyProjects:
      stage.activeProjects -
      stage.pendingApprovalProjects -
      stage.delayedProjects,
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
  }));

  // Calculate overall metrics
  const overallEfficiency = Math.round(
    enhancedData.reduce((sum, stage) => sum + stage.stageEfficiency, 0) /
      enhancedData.length
  );

  const healthyProjectsCount = enhancedData.reduce(
    (sum, stage) => sum + stage.healthyProjects,
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
        healthyProjects: number;
        delayPercentage: number;
        stageEfficiency: number;
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
            <div className='flex justify-between gap-4'>
              <span className='text-muted-foreground'>Healthy Projects:</span>
              <span className='font-medium text-green-600'>
                {data.healthyProjects}
              </span>
            </div>
            <div className='flex justify-between gap-4'>
              <span className='text-muted-foreground'>Pending Approval:</span>
              <span className='font-medium text-yellow-600'>
                {data.pendingApprovalProjects}
              </span>
            </div>
            <div className='flex justify-between gap-4'>
              <span className='text-muted-foreground'>Delayed Projects:</span>
              <span className='font-medium text-red-600'>
                {data.delayedProjects}
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
                Active Project Pipeline (L0-L4)
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
            <div className='mt-3 flex gap-2'>
              <Badge
                variant='outline'
                className='bg-blue-50 dark:bg-blue-950/20'
              >
                <Activity className='mr-1 h-3 w-3 text-blue-600' />
                {totalProjects} In Pipeline
              </Badge>
              {pendingApprovalProjects > 0 && (
                <Badge
                  variant='outline'
                  className='bg-yellow-50 dark:bg-yellow-950/20'
                >
                  <HourglassIcon className='mr-1 h-3 w-3 text-yellow-600' />
                  {pendingApprovalProjects} Pending
                </Badge>
              )}
              {delayedProjects > 0 && (
                <Badge
                  variant='outline'
                  className='bg-red-50 dark:bg-red-950/20'
                >
                  <AlertCircle className='mr-1 h-3 w-3 text-red-600' />
                  {delayedProjects} Delayed
                </Badge>
              )}
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
              />
              <Tooltip content={<CustomTooltip />} />

              <Bar
                dataKey='healthyProjects'
                stackId='a'
                fill='#22c55e'
                name='Healthy'
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey='pendingApprovalProjects'
                stackId='a'
                fill='#eab308'
                name='Pending Approval'
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey='delayedProjects'
                stackId='a'
                fill='#ef4444'
                name='Delayed'
                radius={[2, 2, 0, 0]}
              />
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
                  {healthyProjectsCount}
                </div>
                <div className='text-muted-foreground text-xs'>Healthy</div>
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
