'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { oeeMetricsData } from '@/constants/business-excellence-data';
import { TrendingUp, TrendingDown, Gauge, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

export function OEEMetricsChart() {
  const { overall, components } = oeeMetricsData;

  return (
    <Card>
      <CardHeader className='pb-4'>
        <div className='flex items-start justify-between'>
          <div>
            <CardTitle>Overall Equipment Effectiveness</CardTitle>
            <CardDescription>
              Real-time manufacturing efficiency metrics
            </CardDescription>
          </div>
          <div
            className={cn(
              'flex items-center gap-1.5 rounded-md px-2.5 py-1',
              overall.trend === 'up'
                ? 'border-green-200 bg-green-50 dark:border-green-900/20 dark:bg-green-950/10'
                : 'border-red-200 bg-red-50 dark:border-red-900/20 dark:bg-red-950/10'
            )}
          >
            {overall.trend === 'up' ? (
              <TrendingUp className='h-3.5 w-3.5 text-green-600' />
            ) : (
              <TrendingDown className='h-3.5 w-3.5 text-red-600' />
            )}
            <span
              className={cn(
                'text-sm font-medium',
                overall.trend === 'up' ? 'text-green-600' : 'text-red-600'
              )}
            >
              {overall.changePercent}%
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className='space-y-6 pb-6'>
        {/* Main OEE Score */}
        <div className='flex items-center justify-center'>
          <div className='relative'>
            <div className='border-primary/20 flex h-40 w-40 flex-col items-center justify-center rounded-full border-8'>
              <Gauge className='text-muted-foreground mb-2 h-8 w-8' />
              <div className='text-4xl font-bold'>{overall.oee}%</div>
              <div className='text-muted-foreground text-sm'>OEE Score</div>
            </div>
          </div>
        </div>

        {/* Component Metrics */}
        <div className='space-y-4'>
          <h4 className='text-sm font-medium'>OEE Components</h4>
          {Object.entries(components).map(([key, component]) => {
            const percentage = (component.value / component.target) * 100;
            const isGood = percentage >= 95;
            const isWarning = percentage >= 85 && percentage < 95;

            return (
              <div key={key} className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <div>
                    <span className='text-sm font-medium capitalize'>
                      {key}
                    </span>
                    <span className='text-muted-foreground ml-2 text-xs'>
                      Target: {component.target}%
                    </span>
                  </div>
                  <span
                    className={cn(
                      'text-sm font-bold',
                      isGood && 'text-green-600',
                      isWarning && 'text-yellow-600',
                      !isGood && !isWarning && 'text-red-600'
                    )}
                  >
                    {component.value}%
                  </span>
                </div>
                <div className='bg-secondary relative h-2 w-full overflow-hidden rounded-full'>
                  <div
                    className={cn(
                      'absolute inset-y-0 left-0 rounded-full transition-all duration-700',
                      isGood && 'bg-green-500',
                      isWarning && 'bg-yellow-500',
                      !isGood && !isWarning && 'bg-red-500'
                    )}
                    style={{ width: `${component.value}%` }}
                  />
                  <div
                    className='bg-foreground/20 absolute inset-y-0 w-0.5'
                    style={{ left: `${component.target}%` }}
                  />
                </div>
                <p className='text-muted-foreground text-xs'>
                  {component.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Plant Grid */}
        <div className='space-y-3'>
          <h4 className='text-sm font-medium'>Plant Performance</h4>
          <div className='grid grid-cols-2 gap-3 lg:grid-cols-3'>
            {oeeMetricsData.byPlant.map((plant) => {
              const status =
                plant.oee >= 70
                  ? 'good'
                  : plant.oee >= 65
                    ? 'warning'
                    : 'critical';

              return (
                <div
                  key={plant.plant}
                  className={cn(
                    'rounded-lg border p-3',
                    status === 'good' && 'bg-green-50/50 dark:bg-green-950/10',
                    status === 'warning' &&
                      'bg-yellow-50/50 dark:bg-yellow-950/10',
                    status === 'critical' && 'bg-red-50/50 dark:bg-red-950/10'
                  )}
                >
                  <div className='mb-2 flex items-center justify-between'>
                    <span className='text-sm font-medium'>{plant.plant}</span>
                    <span
                      className={cn(
                        'text-lg font-bold',
                        status === 'good' && 'text-green-600',
                        status === 'warning' && 'text-yellow-600',
                        status === 'critical' && 'text-red-600'
                      )}
                    >
                      {plant.oee}%
                    </span>
                  </div>
                  <div className='grid grid-cols-3 gap-1 text-xs'>
                    <div>
                      <div className='text-muted-foreground'>Avail</div>
                      <div className='font-medium'>{plant.availability}%</div>
                    </div>
                    <div>
                      <div className='text-muted-foreground'>Perf</div>
                      <div className='font-medium'>{plant.performance}%</div>
                    </div>
                    <div>
                      <div className='text-muted-foreground'>Qual</div>
                      <div className='font-medium'>{plant.quality}%</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Issues Alert */}
        {components.quality.issues.length > 0 && (
          <div className='rounded-lg border border-orange-200 bg-orange-50/50 p-4 dark:border-orange-900/20 dark:bg-orange-950/10'>
            <div className='mb-2 flex items-center gap-2'>
              <AlertTriangle className='h-4 w-4 text-orange-600' />
              <h4 className='text-sm font-medium'>Active Issues</h4>
            </div>
            <ul className='space-y-1'>
              {components.quality.issues.map((issue, idx) => (
                <li
                  key={idx}
                  className='text-muted-foreground flex items-start gap-2 text-xs'
                >
                  <span className='mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-orange-500' />
                  <span>{issue}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
