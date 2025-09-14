'use client';

import * as React from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { resourceEfficiencyData } from '@/constants/business-excellence-data';
import {
  TrendingUp,
  TrendingDown,
  Zap,
  Droplet,
  Package,
  Users,
  IndianRupee,
  Activity
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function ResourceEfficiencyChart() {
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
                  {entry.name.includes('Cost')
                    ? `₹${entry.value}`
                    : entry.name.includes('%')
                      ? `${entry.value}%`
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
        <Tabs defaultValue='overview' className='w-full'>
          <TabsList className='grid w-full grid-cols-4'>
            <TabsTrigger value='overview'>Overview</TabsTrigger>
            <TabsTrigger value='productivity'>Productivity</TabsTrigger>
            <TabsTrigger value='sustainability'>Sustainability</TabsTrigger>
            <TabsTrigger value='cost'>Cost</TabsTrigger>
          </TabsList>

          <TabsContent value='overview' className='mt-4 space-y-4'>
            {/* KPI Cards */}
            <div className='grid grid-cols-2 gap-3 lg:grid-cols-4'>
              <div className='rounded-lg border p-3'>
                <div className='mb-1 flex items-center gap-2'>
                  <Users className='h-4 w-4 text-blue-500' />
                  <span className='text-muted-foreground text-xs'>
                    Productivity
                  </span>
                </div>
                <div className='text-xl font-bold'>
                  {latestData.laborProductivity}
                </div>
                <div className='text-muted-foreground text-xs'>units/hour</div>
              </div>

              <div className='rounded-lg border p-3'>
                <div className='mb-1 flex items-center gap-2'>
                  <Zap className='h-4 w-4 text-yellow-500' />
                  <span className='text-muted-foreground text-xs'>Energy</span>
                </div>
                <div className='text-xl font-bold'>
                  {latestData.energyIntensity}
                </div>
                <div className='text-muted-foreground text-xs'>kWh/unit</div>
              </div>

              <div className='rounded-lg border p-3'>
                <div className='mb-1 flex items-center gap-2'>
                  <Package className='h-4 w-4 text-green-500' />
                  <span className='text-muted-foreground text-xs'>Yield</span>
                </div>
                <div className='text-xl font-bold'>
                  {latestData.materialYield}%
                </div>
                <div className='text-muted-foreground text-xs'>efficiency</div>
              </div>

              <div className='rounded-lg border p-3'>
                <div className='mb-1 flex items-center gap-2'>
                  <IndianRupee className='h-4 w-4 text-purple-500' />
                  <span className='text-muted-foreground text-xs'>
                    Cost/Unit
                  </span>
                </div>
                <div className='text-xl font-bold'>
                  ₹{latestData.costPerUnit}
                </div>
                <div className='text-muted-foreground text-xs'>per unit</div>
              </div>
            </div>

            {/* Overview Chart */}
            <div className='h-[280px] w-full'>
              <ResponsiveContainer width='100%' height='100%'>
                <LineChart
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
                  <Legend />
                  <Line
                    type='monotone'
                    dataKey='laborProductivity'
                    stroke='#3b82f6'
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    name='Productivity'
                  />
                  <Line
                    type='monotone'
                    dataKey='materialYield'
                    stroke='#22c55e'
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    name='Material Yield %'
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value='productivity' className='mt-4 space-y-4'>
            <div className='h-[320px] w-full'>
              <ResponsiveContainer width='100%' height='100%'>
                <AreaChart
                  data={resourceEfficiencyData}
                  margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
                >
                  <defs>
                    <linearGradient
                      id='productivityGradient'
                      x1='0'
                      y1='0'
                      x2='0'
                      y2='1'
                    >
                      <stop offset='5%' stopColor='#3b82f6' stopOpacity={0.3} />
                      <stop offset='95%' stopColor='#3b82f6' stopOpacity={0} />
                    </linearGradient>
                  </defs>
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
                  <Area
                    type='monotone'
                    dataKey='laborProductivity'
                    stroke='#3b82f6'
                    strokeWidth={2}
                    fill='url(#productivityGradient)'
                    name='Labor Productivity'
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className='rounded-lg border bg-blue-50/50 p-4 dark:bg-blue-950/10'>
              <div className='flex items-center justify-between'>
                <div>
                  <div className='text-muted-foreground text-sm'>
                    Current Performance
                  </div>
                  <div className='mt-1 text-2xl font-bold'>
                    {latestData.laborProductivity} units/hr
                  </div>
                </div>
                <Activity className='h-8 w-8 text-blue-500' />
              </div>
            </div>
          </TabsContent>

          <TabsContent value='sustainability' className='mt-4 space-y-4'>
            <div className='h-[320px] w-full'>
              <ResponsiveContainer width='100%' height='100%'>
                <LineChart
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
                    yAxisId='left'
                    tick={{ fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    yAxisId='right'
                    orientation='right'
                    tick={{ fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line
                    yAxisId='left'
                    type='monotone'
                    dataKey='energyIntensity'
                    stroke='#eab308'
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    name='Energy (kWh)'
                  />
                  <Line
                    yAxisId='right'
                    type='monotone'
                    dataKey='waterEfficiency'
                    stroke='#06b6d4'
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    name='Water Eff %'
                  />
                  <Line
                    yAxisId='right'
                    type='monotone'
                    dataKey='wasteRatio'
                    stroke='#ef4444'
                    strokeWidth={2}
                    strokeDasharray='5 5'
                    dot={{ r: 3 }}
                    name='Waste %'
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className='grid grid-cols-3 gap-3'>
              <div className='rounded-lg border bg-yellow-50/50 p-3 text-center dark:bg-yellow-950/10'>
                <Zap className='mx-auto mb-1 h-5 w-5 text-yellow-500' />
                <div className='text-lg font-bold'>
                  {latestData.energyIntensity}
                </div>
                <div className='text-muted-foreground text-xs'>kWh/unit</div>
              </div>
              <div className='rounded-lg border bg-cyan-50/50 p-3 text-center dark:bg-cyan-950/10'>
                <Droplet className='mx-auto mb-1 h-5 w-5 text-cyan-500' />
                <div className='text-lg font-bold'>
                  {latestData.waterEfficiency}%
                </div>
                <div className='text-muted-foreground text-xs'>efficiency</div>
              </div>
              <div className='rounded-lg border bg-red-50/50 p-3 text-center dark:bg-red-950/10'>
                <Package className='mx-auto mb-1 h-5 w-5 text-red-500' />
                <div className='text-lg font-bold'>
                  {latestData.wasteRatio}%
                </div>
                <div className='text-muted-foreground text-xs'>waste</div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value='cost' className='mt-4 space-y-4'>
            <div className='h-[320px] w-full'>
              <ResponsiveContainer width='100%' height='100%'>
                <AreaChart
                  data={resourceEfficiencyData}
                  margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
                >
                  <defs>
                    <linearGradient
                      id='costGradient'
                      x1='0'
                      y1='0'
                      x2='0'
                      y2='1'
                    >
                      <stop offset='5%' stopColor='#a855f7' stopOpacity={0.3} />
                      <stop offset='95%' stopColor='#a855f7' stopOpacity={0} />
                    </linearGradient>
                  </defs>
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
                  <Area
                    type='monotone'
                    dataKey='costPerUnit'
                    stroke='#a855f7'
                    strokeWidth={2}
                    fill='url(#costGradient)'
                    name='Cost per Unit'
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div
              className={cn(
                'rounded-lg border p-4',
                latestData.costPerUnit <= 1200
                  ? 'bg-green-50/50 dark:bg-green-950/10'
                  : 'bg-orange-50/50 dark:bg-orange-950/10'
              )}
            >
              <div className='flex items-center justify-between'>
                <div>
                  <div className='text-muted-foreground text-sm'>
                    Cost per Unit
                  </div>
                  <div className='mt-1 text-3xl font-bold'>
                    ₹{latestData.costPerUnit}
                  </div>
                </div>
                <div className='text-right'>
                  <div className='text-muted-foreground text-sm'>vs Target</div>
                  <div
                    className={cn(
                      'mt-1 text-2xl font-bold',
                      latestData.costPerUnit <= 1200
                        ? 'text-green-600'
                        : 'text-orange-600'
                    )}
                  >
                    {latestData.costPerUnit <= 1200 ? '-' : '+'}₹
                    {Math.abs(latestData.costPerUnit - 1200)}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
