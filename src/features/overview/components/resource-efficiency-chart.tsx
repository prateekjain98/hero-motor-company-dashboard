'use client';

import * as React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { resourceEfficiencyData } from '@/constants/business-excellence-data';
import {
  TrendingUp,
  TrendingDown,
  Zap,
  Package,
  Paintbrush,
  IndianRupee,
  Wind
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function ResourceEfficiencyChart() {
  const [selectedMetric, setSelectedMetric] = React.useState<string | null>(
    'paint'
  );
  const latestData = resourceEfficiencyData[resourceEfficiencyData.length - 1];
  const previousData =
    resourceEfficiencyData[resourceEfficiencyData.length - 2];

  const calculateTrend = (
    current: number,
    previous: number,
    inverse = false
  ) => {
    const change = (((current - previous) / previous) * 100).toFixed(1);
    const isPositive = inverse ? current < previous : current > previous;
    return { value: change, isPositive };
  };

  const costTrend = calculateTrend(
    latestData.costPerUnit,
    previousData.costPerUnit,
    true
  );

  const paintTrend = calculateTrend(
    latestData.paintConsumption,
    previousData.paintConsumption,
    true
  );

  const powderTrend = calculateTrend(
    latestData.powderConsumption,
    previousData.powderConsumption,
    true
  );

  const powerTrend = calculateTrend(
    latestData.powerCost,
    previousData.powerCost,
    true
  );

  const gasTrend = calculateTrend(
    latestData.gasConsumption,
    previousData.gasConsumption,
    true
  );

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className='bg-background rounded-lg border p-3 shadow-lg'>
          <p className='mb-2 text-sm font-semibold'>{label}</p>
          <div className='space-y-1'>
            {payload.map((entry: any, index: number) => (
              <div key={index} className='flex justify-between gap-4 text-xs'>
                <span className='text-muted-foreground'>{entry.name}:</span>
                <span className='font-medium' style={{ color: entry.color }}>
                  {entry.name.includes('Cost') || entry.name.includes('INR')
                    ? `₹${entry.value}`
                    : entry.name.includes('%')
                      ? `${entry.value}%`
                      : entry.name.includes('ml/sqm')
                        ? `${entry.value} ml/sqm`
                        : entry.name.includes('gm/sqm')
                          ? `${entry.value} gm/sqm`
                          : entry.name.includes('m3/sqm')
                            ? `${entry.value} m³/sqm`
                            : entry.value}
                </span>
              </div>
            ))}
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
            <CardTitle>Resource Efficiency Metrics</CardTitle>
            <CardDescription>
              Operational performance and sustainability indicators
            </CardDescription>
          </div>
          <div
            className={cn(
              'flex items-center gap-1.5 rounded-md px-2.5 py-1',
              costTrend.isPositive
                ? 'border-green-200 bg-green-50 dark:border-green-900/20 dark:bg-green-950/10'
                : 'border-red-200 bg-red-50 dark:border-red-900/20 dark:bg-red-950/10'
            )}
          >
            <IndianRupee className='h-3.5 w-3.5' />
            <span
              className={cn(
                'text-sm font-medium',
                costTrend.isPositive ? 'text-green-600' : 'text-red-600'
              )}
            >
              {costTrend.isPositive ? '-' : '+'}
              {Math.abs(parseFloat(costTrend.value))}%
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className='pb-6'>
        <div className='space-y-4'>
          {/* Instruction text */}
          <div className='mb-4 text-center'>
            <p className='text-muted-foreground text-sm'>
              Click on any metric card below to view its 12-month trend in the
              chart
            </p>
          </div>

          {/* Clickable KPI Cards */}
          <div className='grid grid-cols-2 gap-3 lg:grid-cols-4'>
            <div
              className={cn(
                'cursor-pointer rounded-lg border p-3 transition-all hover:shadow-md',
                selectedMetric === 'paint' &&
                  'bg-blue-50/50 ring-2 ring-blue-500 dark:bg-blue-950/10'
              )}
              onClick={() =>
                setSelectedMetric(selectedMetric === 'paint' ? null : 'paint')
              }
            >
              <div className='mb-1 flex items-center gap-2'>
                <Paintbrush className='h-4 w-4 text-blue-500' />
                <span className='text-muted-foreground text-xs'>Paint</span>
                <div
                  className={cn(
                    'ml-auto flex items-center text-xs',
                    paintTrend.isPositive ? 'text-green-600' : 'text-red-600'
                  )}
                >
                  {paintTrend.isPositive ? (
                    <TrendingDown className='mr-1 h-3 w-3' />
                  ) : (
                    <TrendingUp className='mr-1 h-3 w-3' />
                  )}
                  {Math.abs(parseFloat(paintTrend.value))}%
                </div>
              </div>
              <div className='text-xl font-bold'>
                {latestData.paintConsumption}
              </div>
              <div className='text-muted-foreground text-xs'>ml/sqm</div>
            </div>

            <div
              className={cn(
                'cursor-pointer rounded-lg border p-3 transition-all hover:shadow-md',
                selectedMetric === 'powder' &&
                  'bg-green-50/50 ring-2 ring-green-500 dark:bg-green-950/10'
              )}
              onClick={() =>
                setSelectedMetric(selectedMetric === 'powder' ? null : 'powder')
              }
            >
              <div className='mb-1 flex items-center gap-2'>
                <Package className='h-4 w-4 text-green-500' />
                <span className='text-muted-foreground text-xs'>Powder</span>
                <div
                  className={cn(
                    'ml-auto flex items-center text-xs',
                    powderTrend.isPositive ? 'text-green-600' : 'text-red-600'
                  )}
                >
                  {powderTrend.isPositive ? (
                    <TrendingDown className='mr-1 h-3 w-3' />
                  ) : (
                    <TrendingUp className='mr-1 h-3 w-3' />
                  )}
                  {Math.abs(parseFloat(powderTrend.value))}%
                </div>
              </div>
              <div className='text-xl font-bold'>
                {latestData.powderConsumption}
              </div>
              <div className='text-muted-foreground text-xs'>gm/sqm</div>
            </div>

            <div
              className={cn(
                'cursor-pointer rounded-lg border p-3 transition-all hover:shadow-md',
                selectedMetric === 'power' &&
                  'bg-yellow-50/50 ring-2 ring-yellow-500 dark:bg-yellow-950/10'
              )}
              onClick={() =>
                setSelectedMetric(selectedMetric === 'power' ? null : 'power')
              }
            >
              <div className='mb-1 flex items-center gap-2'>
                <Zap className='h-4 w-4 text-yellow-500' />
                <span className='text-muted-foreground text-xs'>Power</span>
                <div
                  className={cn(
                    'ml-auto flex items-center text-xs',
                    powerTrend.isPositive ? 'text-green-600' : 'text-red-600'
                  )}
                >
                  {powerTrend.isPositive ? (
                    <TrendingDown className='mr-1 h-3 w-3' />
                  ) : (
                    <TrendingUp className='mr-1 h-3 w-3' />
                  )}
                  {Math.abs(parseFloat(powerTrend.value))}%
                </div>
              </div>
              <div className='text-xl font-bold'>₹{latestData.powerCost}</div>
              <div className='text-muted-foreground text-xs'>INR/units</div>
            </div>

            <div
              className={cn(
                'cursor-pointer rounded-lg border p-3 transition-all hover:shadow-md',
                selectedMetric === 'gases' &&
                  'bg-cyan-50/50 ring-2 ring-cyan-500 dark:bg-cyan-950/10'
              )}
              onClick={() =>
                setSelectedMetric(selectedMetric === 'gases' ? null : 'gases')
              }
            >
              <div className='mb-1 flex items-center gap-2'>
                <Wind className='h-4 w-4 text-cyan-500' />
                <span className='text-muted-foreground text-xs'>Gases</span>
                <div
                  className={cn(
                    'ml-auto flex items-center text-xs',
                    gasTrend.isPositive ? 'text-green-600' : 'text-red-600'
                  )}
                >
                  {gasTrend.isPositive ? (
                    <TrendingDown className='mr-1 h-3 w-3' />
                  ) : (
                    <TrendingUp className='mr-1 h-3 w-3' />
                  )}
                  {Math.abs(parseFloat(gasTrend.value))}%
                </div>
              </div>
              <div className='text-xl font-bold'>
                {latestData.gasConsumption}
              </div>
              <div className='text-muted-foreground text-xs'>m3/sqm</div>
            </div>
          </div>

          {/* Dynamic Chart - Only shows when a card is clicked */}
          {selectedMetric === 'paint' && (
            <div className='h-[320px] w-full'>
              <ResponsiveContainer width='100%' height='100%'>
                <BarChart
                  data={resourceEfficiencyData}
                  margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray='3 3'
                    stroke='hsl(var(--border))'
                  />
                  <XAxis
                    dataKey='month'
                    tick={{ fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => value.split(' ')[0]}
                  />
                  <YAxis
                    tick={{ fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey='paintConsumption'
                    fill='#3b82f6'
                    name='Paint Consumption (ml/sqm)'
                    radius={[2, 2, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
          {selectedMetric === 'powder' && (
            <div className='h-[320px] w-full'>
              <ResponsiveContainer width='100%' height='100%'>
                <BarChart
                  data={resourceEfficiencyData}
                  margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray='3 3'
                    stroke='hsl(var(--border))'
                  />
                  <XAxis
                    dataKey='month'
                    tick={{ fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => value.split(' ')[0]}
                  />
                  <YAxis
                    tick={{ fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey='powderConsumption'
                    fill='#22c55e'
                    name='Powder Consumption (gm/sqm)'
                    radius={[2, 2, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {selectedMetric === 'power' && (
            <div className='h-[320px] w-full'>
              <ResponsiveContainer width='100%' height='100%'>
                <BarChart
                  data={resourceEfficiencyData}
                  margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray='3 3'
                    stroke='hsl(var(--border))'
                  />
                  <XAxis
                    dataKey='month'
                    tick={{ fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => value.split(' ')[0]}
                  />
                  <YAxis
                    tick={{ fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey='powerCost'
                    fill='#eab308'
                    name='Power Cost (INR/units)'
                    radius={[2, 2, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {selectedMetric === 'gases' && (
            <div className='h-[320px] w-full'>
              <ResponsiveContainer width='100%' height='100%'>
                <BarChart
                  data={resourceEfficiencyData}
                  margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray='3 3'
                    stroke='hsl(var(--border))'
                  />
                  <XAxis
                    dataKey='month'
                    tick={{ fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => value.split(' ')[0]}
                  />
                  <YAxis
                    tick={{ fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey='gasConsumption'
                    fill='#06b6d4'
                    name='Gas Consumption (m3/sqm)'
                    radius={[2, 2, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Instructions when no card is selected */}
          {!selectedMetric && (
            <div className='flex h-[200px] items-center justify-center text-center'>
              <div className='space-y-2'>
                <p className='text-muted-foreground text-lg'>
                  Select a resource card above to view its trend
                </p>
                <p className='text-muted-foreground text-sm'>
                  Click on Paint, Powder, Power, or Gases to see detailed
                  analytics
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
