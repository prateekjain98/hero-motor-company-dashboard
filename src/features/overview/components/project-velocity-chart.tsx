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
import { projectVelocityData } from '@/constants/business-excellence-data';
import { AlertCircle, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ProjectVelocityChart() {
  const totalProjects = projectVelocityData.reduce(
    (sum, d) => sum + d.activeProjects,
    0
  );
  const blockedProjects = projectVelocityData.reduce(
    (sum, d) => sum + d.blockedProjects,
    0
  );

  // Enhanced data with calculated metrics
  const enhancedData = projectVelocityData.map((stage) => ({
    ...stage,
    healthyProjects: stage.activeProjects - stage.blockedProjects,
    isDelayed: stage.avgCycleTime > stage.targetCycleTime
  }));

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = enhancedData.find((d) => d.stage === label);
      if (!data) return null;

      return (
        <div className='bg-background rounded-lg border p-3 shadow-lg'>
          <p className='mb-2 text-sm font-semibold'>
            {data.stage} - {data.name}
          </p>
          <div className='space-y-1 text-xs'>
            <div className='flex justify-between gap-4'>
              <span className='text-muted-foreground'>Healthy Projects:</span>
              <span className='font-medium'>{data.healthyProjects}</span>
            </div>
            <div className='flex justify-between gap-4'>
              <span className='text-muted-foreground'>Blocked Projects:</span>
              <span className='text-destructive font-medium'>
                {data.blockedProjects}
              </span>
            </div>
            <div className='flex justify-between gap-4'>
              <span className='text-muted-foreground'>Cycle Time:</span>
              <span
                className={cn(
                  'font-medium',
                  data.isDelayed ? 'text-orange-600' : 'text-green-600'
                )}
              >
                {data.avgCycleTime}d / {data.targetCycleTime}d
              </span>
            </div>
            <div className='flex justify-between gap-4'>
              <span className='text-muted-foreground'>Efficiency:</span>
              <span className='font-medium'>{data.stageEfficiency}%</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader className='pb-4'>
        <div className='flex items-start justify-between'>
          <div>
            <CardTitle>Project Pipeline Analytics</CardTitle>
            <CardDescription>
              Stage distribution and cycle time performance
            </CardDescription>
          </div>
          <div className='flex items-center gap-2'>
            <div className='flex items-center gap-1.5 rounded-md border px-2.5 py-1'>
              <Activity className='h-3.5 w-3.5' />
              <span className='text-sm font-medium'>{totalProjects}</span>
              <span className='text-muted-foreground text-xs'>Active</span>
            </div>
            {blockedProjects > 0 && (
              <div className='border-destructive/20 bg-destructive/10 flex items-center gap-1.5 rounded-md border px-2.5 py-1'>
                <AlertCircle className='text-destructive h-3.5 w-3.5' />
                <span className='text-destructive text-sm font-medium'>
                  {blockedProjects}
                </span>
                <span className='text-muted-foreground text-xs'>Blocked</span>
              </div>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className='pb-6'>
        {/* Main Chart */}
        <div className='h-[280px] w-full'>
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart
              data={enhancedData}
              margin={{ top: 20, right: 10, bottom: 20, left: 10 }}
            >
              <CartesianGrid
                strokeDasharray='3 3'
                vertical={false}
                stroke='hsl(var(--border))'
              />
              <XAxis
                dataKey='stage'
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />

              <Bar
                dataKey='healthyProjects'
                stackId='a'
                fill='#22c55e'
                name='Healthy'
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey='blockedProjects'
                stackId='a'
                fill='#ef4444'
                name='Blocked'
                radius={[4, 4, 0, 0]}
              >
                <LabelList
                  dataKey='activeProjects'
                  position='top'
                  style={{ fontSize: '10px', fill: 'hsl(var(--foreground))' }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Stage Performance Metrics */}
        <div className='mt-6 space-y-3'>
          <h4 className='text-sm font-medium'>Stage Performance Metrics</h4>
          <div className='grid gap-2'>
            {enhancedData.map((stage) => (
              <div
                key={stage.stage}
                className={cn(
                  'flex items-center justify-between rounded-lg border p-3',
                  stage.isDelayed &&
                    'border-orange-200 bg-orange-50/50 dark:border-orange-900/20 dark:bg-orange-950/10'
                )}
              >
                <div className='flex items-center gap-3'>
                  <div>
                    <span className='text-sm font-medium'>{stage.stage}</span>
                    <span className='text-muted-foreground ml-2 text-xs'>
                      • {stage.name}
                    </span>
                  </div>
                  {stage.blockedProjects > 0 && (
                    <span className='inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700 dark:bg-red-900/20 dark:text-red-400'>
                      {stage.blockedProjects} blocked
                    </span>
                  )}
                </div>

                <div className='flex items-center gap-6'>
                  <div className='text-right'>
                    <div className='text-muted-foreground text-xs'>
                      Cycle Time
                    </div>
                    <div className='text-sm font-medium'>
                      <span
                        className={
                          stage.isDelayed ? 'text-orange-600' : 'text-green-600'
                        }
                      >
                        {stage.avgCycleTime}d
                      </span>
                      <span className='text-muted-foreground'>
                        {' '}
                        / {stage.targetCycleTime}d
                      </span>
                    </div>
                  </div>

                  <div className='w-24'>
                    <div className='mb-1 flex justify-between text-xs'>
                      <span className='text-muted-foreground'>Efficiency</span>
                      <span className='font-medium'>
                        {stage.stageEfficiency}%
                      </span>
                    </div>
                    <div className='bg-secondary h-2 w-full overflow-hidden rounded-full'>
                      <div
                        className={cn(
                          'h-full rounded-full transition-all duration-500',
                          stage.stageEfficiency >= 85 && 'bg-green-500',
                          stage.stageEfficiency >= 70 &&
                            stage.stageEfficiency < 85 &&
                            'bg-yellow-500',
                          stage.stageEfficiency < 70 && 'bg-orange-500'
                        )}
                        style={{ width: `${stage.stageEfficiency}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
