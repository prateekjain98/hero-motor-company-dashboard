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
import { projectVelocityData } from '@/constants/business-excellence-data';
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

export function ProjectVelocityChart() {
  const totalProjects = projectVelocityData.reduce(
    (sum, d) => sum + d.activeProjects,
    0
  );
  const pendingApprovalProjects = projectVelocityData.reduce(
    (sum, d) => sum + d.pendingApprovalProjects,
    0
  );
  const delayedProjects = projectVelocityData.reduce(
    (sum, d) => sum + d.delayedProjects,
    0
  );

  // Enhanced data with calculated metrics
  const enhancedData = projectVelocityData.map((stage) => ({
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
          <div>
            <CardTitle className='flex items-center gap-2 text-base'>
              <ChevronRight className='h-4 w-4 text-gray-600' />
              Project Pipeline Analytics
            </CardTitle>
            <CardDescription className='mt-1 text-xs'>
              {totalProjects} active projects • {pendingApprovalProjects}{' '}
              pending approval • {delayedProjects} delayed
            </CardDescription>
          </div>
          <div className='flex gap-2'>
            <Badge variant='outline' className='bg-blue-50 dark:bg-blue-950/20'>
              <Activity className='mr-1 h-3 w-3 text-blue-600' />
              {totalProjects} Active
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
              <Badge variant='outline' className='bg-red-50 dark:bg-red-950/20'>
                <AlertCircle className='mr-1 h-3 w-3 text-red-600' />
                {delayedProjects} Delayed
              </Badge>
            )}
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
