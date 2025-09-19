'use client';

import * as React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
  ReferenceLine
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { resourceEfficiencyData } from '@/constants/business-excellence-data';
import { businessExcellenceData } from '@/constants/mock-api';
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
    'paintConsumption'
  );
  const [selectedFY, setSelectedFY] = React.useState<string>('Current FY');

  // Get the correct dataset based on selected FY
  const getDataForFY = () => {
    return selectedFY === 'Current FY'
      ? resourceEfficiencyData.currentFY
      : resourceEfficiencyData.lastYear;
  };

  // Transform data for chart display by metric type
  const transformDataForMetric = (metricType: string) => {
    return getDataForFY().map((monthData) => {
      const chartPoint: Record<string, string | number> = {
        month: monthData.month
      };

      // Add metric data for each company
      Object.keys(businessExcellenceData.businessUnits).forEach(
        (companyKey) => {
          const companyData = monthData[companyKey as keyof typeof monthData];
          if (typeof companyData === 'object' && companyData !== null) {
            chartPoint[companyKey] = companyData[
              metricType as keyof typeof companyData
            ] as number;
          }
        }
      );

      return chartPoint;
    });
  };

  // Calculate aggregate metrics for summary cards
  const calculateAggregateMetrics = () => {
    const currentData = getDataForFY();
    const latestData = currentData[currentData.length - 1];
    const previousData = currentData[currentData.length - 2];

    const metrics = [
      'paintConsumption',
      'powderConsumption',
      'powerCost',
      'gasConsumption'
    ];
    const aggregatedMetrics: Record<string, any> = {};

    metrics.forEach((metric) => {
      let currentTotal = 0;
      let previousTotal = 0;

      Object.keys(businessExcellenceData.businessUnits).forEach(
        (companyKey) => {
          const currentCompanyData = latestData[
            companyKey as keyof typeof latestData
          ] as any;
          const previousCompanyData = previousData[
            companyKey as keyof typeof previousData
          ] as any;

          if (currentCompanyData && previousCompanyData) {
            currentTotal += currentCompanyData[metric];
            previousTotal += previousCompanyData[metric];
          }
        }
      );

      const change = (
        ((currentTotal - previousTotal) / previousTotal) *
        100
      ).toFixed(1);
      const isPositive = currentTotal < previousTotal; // Lower is better for efficiency metrics

      aggregatedMetrics[metric] = {
        current: currentTotal,
        previous: previousTotal,
        average:
          currentTotal /
          Object.keys(businessExcellenceData.businessUnits).length,
        trend: { value: change, isPositive }
      };
    });

    return aggregatedMetrics;
  };

  const aggregatedMetrics = calculateAggregateMetrics();

  // Custom tick formatter to show years properly
  const formatXAxisTick = (value: string, index: number) => {
    const [month, year] = value.split(' ');
    const currentData = getDataForFY();
    const prevValue = index > 0 ? currentData[index - 1]?.month : null;
    const prevYear = prevValue ? prevValue.split(' ')[1] : null;

    // Show year only when it changes or for the first item
    if (index === 0 || year !== prevYear) {
      return `${month}\n${year}`;
    }
    return month;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const getMetricUnit = (metric: string) => {
        switch (metric) {
          case 'paintConsumption':
            return 'ml/sqm';
          case 'powderConsumption':
            return 'gm/sqm';
          case 'powerCost':
            return 'INR/units';
          case 'gasConsumption':
            return 'm³/sqm';
          default:
            return '';
        }
      };

      const getMetricSymbol = (metric: string) => {
        return metric === 'powerCost' ? '₹' : '';
      };

      return (
        <div className='bg-background rounded-lg border p-3 shadow-lg'>
          <p className='mb-2 text-sm font-semibold'>{label}</p>
          <div className='space-y-1'>
            {payload.map((entry: any, index: number) => {
              const companyInfo =
                businessExcellenceData.businessUnits[
                  entry.dataKey as keyof typeof businessExcellenceData.businessUnits
                ];
              return (
                <div
                  key={index}
                  className='flex items-center justify-between gap-4 text-xs'
                >
                  <div className='flex items-center gap-2'>
                    <div
                      className='h-2 w-2 rounded-full'
                      style={{ backgroundColor: entry.color }}
                    />
                    <span className='text-muted-foreground'>
                      {companyInfo?.name || entry.dataKey}:
                    </span>
                  </div>
                  <span className='font-medium' style={{ color: entry.color }}>
                    {getMetricSymbol(selectedMetric || '')}
                    {entry.value} {getMetricUnit(selectedMetric || '')}
                  </span>
                </div>
              );
            })}
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
              Operational performance and sustainability indicators • Last 12
              Months
            </CardDescription>
          </div>
          <div className='text-right'>
            <Select value={selectedFY} onValueChange={setSelectedFY}>
              <SelectTrigger className='w-64'>
                <SelectValue placeholder='Select Period' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='Current FY'>
                  Current FY (Apr 25 - Sep 25)
                </SelectItem>
                <SelectItem value='Last Year'>
                  Last Year (Oct 24 - Sep 25)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent className='pb-6'>
        <div className='space-y-4'>
          {/* Instruction text */}
          <div className='mb-4 text-center'>
            <p className='text-muted-foreground text-sm'>
              Click on any metric card below to view company trends over the
              last 12 months
            </p>
          </div>

          {/* Clickable KPI Cards */}
          <div className='grid grid-cols-2 gap-3 lg:grid-cols-4'>
            <div
              className={cn(
                'cursor-pointer rounded-lg border p-3 transition-all hover:shadow-md',
                selectedMetric === 'paintConsumption' &&
                  'bg-blue-50/50 ring-2 ring-blue-500 dark:bg-blue-950/10'
              )}
              onClick={() =>
                setSelectedMetric(
                  selectedMetric === 'paintConsumption'
                    ? null
                    : 'paintConsumption'
                )
              }
            >
              <div className='mb-1 flex items-center gap-2'>
                <Paintbrush className='h-4 w-4 text-blue-500' />
                <span className='text-muted-foreground text-xs'>Paint</span>
                <div
                  className={cn(
                    'ml-auto flex items-center text-xs',
                    aggregatedMetrics.paintConsumption.trend.isPositive
                      ? 'text-green-600'
                      : 'text-red-600'
                  )}
                >
                  {aggregatedMetrics.paintConsumption.trend.isPositive ? (
                    <TrendingDown className='mr-1 h-3 w-3' />
                  ) : (
                    <TrendingUp className='mr-1 h-3 w-3' />
                  )}
                  {Math.abs(
                    parseFloat(aggregatedMetrics.paintConsumption.trend.value)
                  )}
                  %
                </div>
              </div>
              <div className='text-xl font-bold'>
                {aggregatedMetrics.paintConsumption.average.toFixed(1)}
              </div>
              <div className='text-muted-foreground text-xs'>ml/sqm avg</div>
            </div>

            <div
              className={cn(
                'cursor-pointer rounded-lg border p-3 transition-all hover:shadow-md',
                selectedMetric === 'powderConsumption' &&
                  'bg-green-50/50 ring-2 ring-green-500 dark:bg-green-950/10'
              )}
              onClick={() =>
                setSelectedMetric(
                  selectedMetric === 'powderConsumption'
                    ? null
                    : 'powderConsumption'
                )
              }
            >
              <div className='mb-1 flex items-center gap-2'>
                <Package className='h-4 w-4 text-green-500' />
                <span className='text-muted-foreground text-xs'>Powder</span>
                <div
                  className={cn(
                    'ml-auto flex items-center text-xs',
                    aggregatedMetrics.powderConsumption.trend.isPositive
                      ? 'text-green-600'
                      : 'text-red-600'
                  )}
                >
                  {aggregatedMetrics.powderConsumption.trend.isPositive ? (
                    <TrendingDown className='mr-1 h-3 w-3' />
                  ) : (
                    <TrendingUp className='mr-1 h-3 w-3' />
                  )}
                  {Math.abs(
                    parseFloat(aggregatedMetrics.powderConsumption.trend.value)
                  )}
                  %
                </div>
              </div>
              <div className='text-xl font-bold'>
                {aggregatedMetrics.powderConsumption.average.toFixed(1)}
              </div>
              <div className='text-muted-foreground text-xs'>gm/sqm avg</div>
            </div>

            <div
              className={cn(
                'cursor-pointer rounded-lg border p-3 transition-all hover:shadow-md',
                selectedMetric === 'powerCost' &&
                  'bg-yellow-50/50 ring-2 ring-yellow-500 dark:bg-yellow-950/10'
              )}
              onClick={() =>
                setSelectedMetric(
                  selectedMetric === 'powerCost' ? null : 'powerCost'
                )
              }
            >
              <div className='mb-1 flex items-center gap-2'>
                <Zap className='h-4 w-4 text-yellow-500' />
                <span className='text-muted-foreground text-xs'>Power</span>
                <div
                  className={cn(
                    'ml-auto flex items-center text-xs',
                    aggregatedMetrics.powerCost.trend.isPositive
                      ? 'text-green-600'
                      : 'text-red-600'
                  )}
                >
                  {aggregatedMetrics.powerCost.trend.isPositive ? (
                    <TrendingDown className='mr-1 h-3 w-3' />
                  ) : (
                    <TrendingUp className='mr-1 h-3 w-3' />
                  )}
                  {Math.abs(
                    parseFloat(aggregatedMetrics.powerCost.trend.value)
                  )}
                  %
                </div>
              </div>
              <div className='text-xl font-bold'>
                ₹{aggregatedMetrics.powerCost.average.toFixed(2)}
              </div>
              <div className='text-muted-foreground text-xs'>INR/units avg</div>
            </div>

            <div
              className={cn(
                'cursor-pointer rounded-lg border p-3 transition-all hover:shadow-md',
                selectedMetric === 'gasConsumption' &&
                  'bg-cyan-50/50 ring-2 ring-cyan-500 dark:bg-cyan-950/10'
              )}
              onClick={() =>
                setSelectedMetric(
                  selectedMetric === 'gasConsumption' ? null : 'gasConsumption'
                )
              }
            >
              <div className='mb-1 flex items-center gap-2'>
                <Wind className='h-4 w-4 text-cyan-500' />
                <span className='text-muted-foreground text-xs'>Gases</span>
                <div
                  className={cn(
                    'ml-auto flex items-center text-xs',
                    aggregatedMetrics.gasConsumption.trend.isPositive
                      ? 'text-green-600'
                      : 'text-red-600'
                  )}
                >
                  {aggregatedMetrics.gasConsumption.trend.isPositive ? (
                    <TrendingDown className='mr-1 h-3 w-3' />
                  ) : (
                    <TrendingUp className='mr-1 h-3 w-3' />
                  )}
                  {Math.abs(
                    parseFloat(aggregatedMetrics.gasConsumption.trend.value)
                  )}
                  %
                </div>
              </div>
              <div className='text-xl font-bold'>
                {aggregatedMetrics.gasConsumption.average.toFixed(3)}
              </div>
              <div className='text-muted-foreground text-xs'>m³/sqm avg</div>
            </div>
          </div>

          {/* Dynamic Chart - Shows company comparison for selected metric */}
          {selectedMetric && (
            <div className='mt-8 h-[450px] w-full'>
              <ResponsiveContainer width='100%' height='100%'>
                <LineChart
                  data={transformDataForMetric(selectedMetric)}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 80
                  }}
                >
                  <defs>
                    {Object.entries(businessExcellenceData.businessUnits).map(
                      ([key, company]) => (
                        <linearGradient
                          key={key}
                          id={`gradient-${key}`}
                          x1='0'
                          y1='0'
                          x2='0'
                          y2='1'
                        >
                          <stop
                            offset='0%'
                            stopColor={company.color}
                            stopOpacity={0.8}
                          />
                          <stop
                            offset='100%'
                            stopColor={company.color}
                            stopOpacity={0.1}
                          />
                        </linearGradient>
                      )
                    )}
                  </defs>

                  <CartesianGrid
                    strokeDasharray='3 3'
                    className='stroke-muted/30'
                    vertical={false}
                  />

                  <XAxis
                    dataKey='month'
                    tickLine={false}
                    axisLine={false}
                    tickMargin={12}
                    angle={-45}
                    textAnchor='end'
                    height={80}
                    className='text-xs font-medium'
                    tick={{ fontSize: 11 }}
                    tickFormatter={formatXAxisTick}
                  />

                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={12}
                    className='text-xs font-medium'
                    tick={{ fontSize: 11 }}
                    domain={
                      selectedMetric === 'paintConsumption'
                        ? [80, 250]
                        : selectedMetric === 'powderConsumption'
                          ? [70, 200]
                          : selectedMetric === 'powerCost'
                            ? [6, 16]
                            : [0.02, 0.09]
                    }
                    label={{
                      value:
                        selectedMetric === 'paintConsumption'
                          ? 'Paint Consumption (ml/sqm)'
                          : selectedMetric === 'powderConsumption'
                            ? 'Powder Consumption (gm/sqm)'
                            : selectedMetric === 'powerCost'
                              ? 'Power Cost (INR/units)'
                              : 'Gas Consumption (m³/sqm)',
                      angle: -90,
                      position: 'insideLeft',
                      style: {
                        textAnchor: 'middle',
                        fontSize: '12px',
                        fontWeight: 500
                      }
                    }}
                  />

                  <Tooltip content={<CustomTooltip />} />

                  <Legend
                    wrapperStyle={{ paddingTop: '24px' }}
                    iconType='line'
                    formatter={(value) => {
                      const company =
                        businessExcellenceData.businessUnits[
                          value as keyof typeof businessExcellenceData.businessUnits
                        ];
                      return (
                        <span className='text-sm font-medium'>
                          {company?.name || value}
                        </span>
                      );
                    }}
                  />

                  {/* Render lines for each company */}
                  {Object.entries(businessExcellenceData.businessUnits).map(
                    ([key, company]) => (
                      <Line
                        key={key}
                        type='monotone'
                        dataKey={key}
                        stroke={company.color}
                        strokeWidth={3}
                        dot={{
                          fill: company.color,
                          strokeWidth: 2,
                          r: 5,
                          className: 'drop-shadow-sm'
                        }}
                        activeDot={{
                          r: 7,
                          stroke: company.color,
                          strokeWidth: 3,
                          fill: '#ffffff',
                          className: 'drop-shadow-md'
                        }}
                        name={key}
                      />
                    )
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Instructions when no card is selected */}
          {!selectedMetric && (
            <div className='mt-8 flex h-[200px] items-center justify-center text-center'>
              <div className='space-y-2'>
                <p className='text-muted-foreground text-lg'>
                  Select a resource metric to view company trends
                </p>
                <p className='text-muted-foreground text-sm'>
                  Click on Paint, Powder, Power, or Gases to see line trends
                  across all business units
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
