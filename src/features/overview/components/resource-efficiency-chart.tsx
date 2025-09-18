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
  Paintbrush,
  IndianRupee,
  Activity,
  Wind
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
        <Tabs defaultValue='paint' className='w-full'>
          <TabsList className='grid w-full grid-cols-4'>
            <TabsTrigger value='paint'>Paint</TabsTrigger>
            <TabsTrigger value='powder'>Powder</TabsTrigger>
            <TabsTrigger value='power'>Power</TabsTrigger>
            <TabsTrigger value='gases'>Gases</TabsTrigger>
          </TabsList>

          <TabsContent value='paint' className='mt-4 space-y-4'>
            {/* KPI Cards */}
            <div className='grid grid-cols-2 gap-3 lg:grid-cols-4'>
              <div className='rounded-lg border p-3'>
                <div className='mb-1 flex items-center gap-2'>
                  <Paintbrush className='h-4 w-4 text-blue-500' />
                  <span className='text-muted-foreground text-xs'>Paint</span>
                </div>
                <div className='text-xl font-bold'>
                  {latestData.paintConsumption}
                </div>
                <div className='text-muted-foreground text-xs'>ml/sqm</div>
              </div>

              <div className='rounded-lg border p-3'>
                <div className='mb-1 flex items-center gap-2'>
                  <Package className='h-4 w-4 text-green-500' />
                  <span className='text-muted-foreground text-xs'>Powder</span>
                </div>
                <div className='text-xl font-bold'>
                  {latestData.powderConsumption}
                </div>
                <div className='text-muted-foreground text-xs'>gm/sqm</div>
              </div>

              <div className='rounded-lg border p-3'>
                <div className='mb-1 flex items-center gap-2'>
                  <Zap className='h-4 w-4 text-yellow-500' />
                  <span className='text-muted-foreground text-xs'>Power</span>
                </div>
                <div className='text-xl font-bold'>₹{latestData.powerCost}</div>
                <div className='text-muted-foreground text-xs'>INR/units</div>
              </div>

              <div className='rounded-lg border p-3'>
                <div className='mb-1 flex items-center gap-2'>
                  <Wind className='h-4 w-4 text-cyan-500' />
                  <span className='text-muted-foreground text-xs'>Gases</span>
                </div>
                <div className='text-xl font-bold'>
                  {latestData.gasConsumption}
                </div>
                <div className='text-muted-foreground text-xs'>m3/sqm</div>
              </div>
            </div>

            {/* Paint Chart */}
            <div className='h-[280px] w-full'>
              <ResponsiveContainer width='100%' height='100%'>
                <AreaChart
                  data={resourceEfficiencyData}
                  margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
                >
                  <defs>
                    <linearGradient
                      id='paintGradient'
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
                    dataKey='paintConsumption'
                    stroke='#3b82f6'
                    strokeWidth={2}
                    fill='url(#paintGradient)'
                    name='Paint Consumption (ml/sqm)'
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value='powder' className='mt-4 space-y-4'>
            {/* KPI Cards */}
            <div className='grid grid-cols-2 gap-3 lg:grid-cols-4'>
              <div className='rounded-lg border p-3'>
                <div className='mb-1 flex items-center gap-2'>
                  <Paintbrush className='h-4 w-4 text-blue-500' />
                  <span className='text-muted-foreground text-xs'>Paint</span>
                </div>
                <div className='text-xl font-bold'>
                  {latestData.paintConsumption}
                </div>
                <div className='text-muted-foreground text-xs'>ml/sqm</div>
              </div>

              <div className='rounded-lg border p-3'>
                <div className='mb-1 flex items-center gap-2'>
                  <Package className='h-4 w-4 text-green-500' />
                  <span className='text-muted-foreground text-xs'>Powder</span>
                </div>
                <div className='text-xl font-bold'>
                  {latestData.powderConsumption}
                </div>
                <div className='text-muted-foreground text-xs'>gm/sqm</div>
              </div>

              <div className='rounded-lg border p-3'>
                <div className='mb-1 flex items-center gap-2'>
                  <Zap className='h-4 w-4 text-yellow-500' />
                  <span className='text-muted-foreground text-xs'>Power</span>
                </div>
                <div className='text-xl font-bold'>₹{latestData.powerCost}</div>
                <div className='text-muted-foreground text-xs'>INR/units</div>
              </div>

              <div className='rounded-lg border p-3'>
                <div className='mb-1 flex items-center gap-2'>
                  <Wind className='h-4 w-4 text-cyan-500' />
                  <span className='text-muted-foreground text-xs'>Gases</span>
                </div>
                <div className='text-xl font-bold'>
                  {latestData.gasConsumption}
                </div>
                <div className='text-muted-foreground text-xs'>m3/sqm</div>
              </div>
            </div>

            {/* Powder Chart */}
            <div className='h-[280px] w-full'>
              <ResponsiveContainer width='100%' height='100%'>
                <AreaChart
                  data={resourceEfficiencyData}
                  margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
                >
                  <defs>
                    <linearGradient
                      id='powderGradient'
                      x1='0'
                      y1='0'
                      x2='0'
                      y2='1'
                    >
                      <stop offset='5%' stopColor='#22c55e' stopOpacity={0.3} />
                      <stop offset='95%' stopColor='#22c55e' stopOpacity={0} />
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
                    dataKey='powderConsumption'
                    stroke='#22c55e'
                    strokeWidth={2}
                    fill='url(#powderGradient)'
                    name='Powder Consumption (gm/sqm)'
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value='power' className='mt-4 space-y-4'>
            {/* KPI Cards */}
            <div className='grid grid-cols-2 gap-3 lg:grid-cols-4'>
              <div className='rounded-lg border p-3'>
                <div className='mb-1 flex items-center gap-2'>
                  <Paintbrush className='h-4 w-4 text-blue-500' />
                  <span className='text-muted-foreground text-xs'>Paint</span>
                </div>
                <div className='text-xl font-bold'>
                  {latestData.paintConsumption}
                </div>
                <div className='text-muted-foreground text-xs'>ml/sqm</div>
              </div>

              <div className='rounded-lg border p-3'>
                <div className='mb-1 flex items-center gap-2'>
                  <Package className='h-4 w-4 text-green-500' />
                  <span className='text-muted-foreground text-xs'>Powder</span>
                </div>
                <div className='text-xl font-bold'>
                  {latestData.powderConsumption}
                </div>
                <div className='text-muted-foreground text-xs'>gm/sqm</div>
              </div>

              <div className='rounded-lg border p-3'>
                <div className='mb-1 flex items-center gap-2'>
                  <Zap className='h-4 w-4 text-yellow-500' />
                  <span className='text-muted-foreground text-xs'>Power</span>
                </div>
                <div className='text-xl font-bold'>₹{latestData.powerCost}</div>
                <div className='text-muted-foreground text-xs'>INR/units</div>
              </div>

              <div className='rounded-lg border p-3'>
                <div className='mb-1 flex items-center gap-2'>
                  <Wind className='h-4 w-4 text-cyan-500' />
                  <span className='text-muted-foreground text-xs'>Gases</span>
                </div>
                <div className='text-xl font-bold'>
                  {latestData.gasConsumption}
                </div>
                <div className='text-muted-foreground text-xs'>m3/sqm</div>
              </div>
            </div>

            {/* Power Chart */}
            <div className='h-[280px] w-full'>
              <ResponsiveContainer width='100%' height='100%'>
                <AreaChart
                  data={resourceEfficiencyData}
                  margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
                >
                  <defs>
                    <linearGradient
                      id='powerGradient'
                      x1='0'
                      y1='0'
                      x2='0'
                      y2='1'
                    >
                      <stop offset='5%' stopColor='#eab308' stopOpacity={0.3} />
                      <stop offset='95%' stopColor='#eab308' stopOpacity={0} />
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
                    dataKey='powerCost'
                    stroke='#eab308'
                    strokeWidth={2}
                    fill='url(#powerGradient)'
                    name='Power Cost (INR/units)'
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value='gases' className='mt-4 space-y-4'>
            {/* KPI Cards */}
            <div className='grid grid-cols-2 gap-3 lg:grid-cols-4'>
              <div className='rounded-lg border p-3'>
                <div className='mb-1 flex items-center gap-2'>
                  <Paintbrush className='h-4 w-4 text-blue-500' />
                  <span className='text-muted-foreground text-xs'>Paint</span>
                </div>
                <div className='text-xl font-bold'>
                  {latestData.paintConsumption}
                </div>
                <div className='text-muted-foreground text-xs'>ml/sqm</div>
              </div>

              <div className='rounded-lg border p-3'>
                <div className='mb-1 flex items-center gap-2'>
                  <Package className='h-4 w-4 text-green-500' />
                  <span className='text-muted-foreground text-xs'>Powder</span>
                </div>
                <div className='text-xl font-bold'>
                  {latestData.powderConsumption}
                </div>
                <div className='text-muted-foreground text-xs'>gm/sqm</div>
              </div>

              <div className='rounded-lg border p-3'>
                <div className='mb-1 flex items-center gap-2'>
                  <Zap className='h-4 w-4 text-yellow-500' />
                  <span className='text-muted-foreground text-xs'>Power</span>
                </div>
                <div className='text-xl font-bold'>₹{latestData.powerCost}</div>
                <div className='text-muted-foreground text-xs'>INR/units</div>
              </div>

              <div className='rounded-lg border p-3'>
                <div className='mb-1 flex items-center gap-2'>
                  <Wind className='h-4 w-4 text-cyan-500' />
                  <span className='text-muted-foreground text-xs'>Gases</span>
                </div>
                <div className='text-xl font-bold'>
                  {latestData.gasConsumption}
                </div>
                <div className='text-muted-foreground text-xs'>m3/sqm</div>
              </div>
            </div>

            {/* Gases Chart */}
            <div className='h-[280px] w-full'>
              <ResponsiveContainer width='100%' height='100%'>
                <AreaChart
                  data={resourceEfficiencyData}
                  margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
                >
                  <defs>
                    <linearGradient
                      id='gasGradient'
                      x1='0'
                      y1='0'
                      x2='0'
                      y2='1'
                    >
                      <stop offset='5%' stopColor='#06b6d4' stopOpacity={0.3} />
                      <stop offset='95%' stopColor='#06b6d4' stopOpacity={0} />
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
                    dataKey='gasConsumption'
                    stroke='#06b6d4'
                    strokeWidth={2}
                    fill='url(#gasGradient)'
                    name='Gas Consumption (m3/sqm)'
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
