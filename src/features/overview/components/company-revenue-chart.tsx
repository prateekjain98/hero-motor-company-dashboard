'use client';

import * as React from 'react';
import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
  ReferenceLine
} from 'recharts';
import {
  IconTrendingUp,
  IconBuilding,
  IconClipboardList,
  IconTarget
} from '@tabler/icons-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip
} from '@/components/ui/chart';
import { businessExcellenceData } from '@/constants/mock-api';

export function BusinessExcellenceChart() {
  const [selectedFY, setSelectedFY] = React.useState<string>('Current FY');

  // Get the correct dataset based on selected FY
  const getDataForFY = () => {
    return selectedFY === 'Current FY'
      ? businessExcellenceData.monthlyData.currentFY
      : businessExcellenceData.monthlyData.lastYear;
  };

  // Transform data for the chart with cumulative calculations
  const transformDataForChart = () => {
    const data = getDataForFY();
    const cumulativeData: Record<string, number> = {};

    // Initialize cumulative totals for each company
    Object.keys(businessExcellenceData.businessUnits).forEach((companyKey) => {
      cumulativeData[companyKey] = 0;
    });

    return data.map((monthData) => {
      const chartPoint: Record<string, string | number> = {
        month: monthData.month
      };

      // Add cumulative cost savings for each business unit
      Object.keys(businessExcellenceData.businessUnits).forEach(
        (companyKey) => {
          const companyData = monthData[companyKey as keyof typeof monthData];
          if (typeof companyData === 'object' && companyData !== null) {
            // Add current month's savings to cumulative total
            cumulativeData[companyKey] += companyData.achieved;
            chartPoint[companyKey] = cumulativeData[companyKey];
          }
        }
      );

      return chartPoint;
    });
  };

  // Create chart configuration with enhanced styling
  const createChartConfig = (): ChartConfig => {
    const config: ChartConfig = {};

    Object.entries(businessExcellenceData.businessUnits).forEach(
      ([key, company]) => {
        config[key] = {
          label: company.name,
          color: company.color
        };
      }
    );

    return config;
  };

  // Enhanced custom tooltip component for cumulative data
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const monthData = getDataForFY().find((data) => data.month === label);

      return (
        <div className='bg-background/95 border-border min-w-[320px] rounded-xl border p-5 shadow-2xl backdrop-blur-sm'>
          <div className='mb-4 flex items-center gap-2'>
            <IconTarget className='text-primary h-4 w-4' />
            <p className='text-foreground text-base font-semibold'>{label}</p>
          </div>

          <div className='space-y-4'>
            {payload.map((entry: any, index: number) => {
              const companyKey = entry.dataKey;
              const company =
                businessExcellenceData.businessUnits[
                  companyKey as keyof typeof businessExcellenceData.businessUnits
                ];
              const companyData =
                monthData?.[companyKey as keyof typeof monthData];
              const cumulativeValue = entry.value; // This is the cumulative total

              if (typeof companyData === 'object' && companyData !== null) {
                const monthlyAchievement = companyData.achieved;
                const targetProgress = (
                  (cumulativeValue / company.annualTarget) *
                  100
                ).toFixed(1);

                return (
                  <div key={index} className='bg-muted/30 rounded-lg p-3'>
                    <div className='mb-3 flex items-center gap-3'>
                      <div
                        className='h-4 w-4 rounded-full shadow-sm'
                        style={{ backgroundColor: company.color }}
                      />
                      <span className='text-foreground text-sm font-semibold'>
                        {company.name}
                      </span>
                    </div>

                    <div className='grid grid-cols-2 gap-3 text-xs'>
                      <div className='space-y-2'>
                        <div className='flex items-center justify-between'>
                          <span className='text-muted-foreground'>
                            Monthly{' '}
                            {monthlyAchievement >= 0 ? 'Savings' : 'Adjustment'}
                            :
                          </span>
                          <span
                            className={`font-semibold ${
                              monthlyAchievement >= 0
                                ? 'text-foreground'
                                : 'text-red-600'
                            }`}
                          >
                            {monthlyAchievement >= 0 ? '₹' : '-₹'}
                            {Math.abs(monthlyAchievement)} Cr
                          </span>
                        </div>
                        <div className='flex items-center justify-between'>
                          <span className='text-muted-foreground'>
                            Cumulative Total:
                          </span>
                          <span className='text-foreground font-bold text-blue-600'>
                            ₹{cumulativeValue.toFixed(1)} Cr
                          </span>
                        </div>
                        <div className='flex items-center justify-between'>
                          <span className='text-muted-foreground'>
                            Annual Target:
                          </span>
                          <span className='text-muted-foreground font-medium'>
                            ₹{company.annualTarget} Cr
                          </span>
                        </div>
                        <div className='flex items-center justify-between'>
                          <span className='text-muted-foreground'>
                            Progress:
                          </span>
                          <span
                            className={`font-semibold ${
                              parseFloat(targetProgress) >= 100
                                ? 'text-green-600'
                                : parseFloat(targetProgress) >= 75
                                  ? 'text-yellow-600'
                                  : 'text-red-500'
                            }`}
                          >
                            {targetProgress}%
                          </span>
                        </div>
                      </div>

                      <div className='space-y-2'>
                        <div className='flex items-center justify-between'>
                          <div className='flex items-center gap-1'>
                            <IconClipboardList className='text-muted-foreground h-3 w-3' />
                            <span className='text-muted-foreground'>
                              Pipeline:
                            </span>
                          </div>
                          <span className='font-semibold text-blue-600'>
                            {companyData.projectsInPipeline} projects
                          </span>
                        </div>
                        <div className='flex items-center justify-between'>
                          <div className='flex items-center gap-1'>
                            <IconBuilding className='text-muted-foreground h-3 w-3' />
                            <span className='text-muted-foreground'>
                              Delivered:
                            </span>
                          </div>
                          <span className='font-semibold text-green-600'>
                            {companyData.projectsDelivered} projects
                          </span>
                        </div>
                        <div className='flex items-center justify-between'>
                          <span className='text-muted-foreground'>
                            Remaining:
                          </span>
                          <span className='font-semibold text-amber-600'>
                            ₹
                            {(company.annualTarget - cumulativeValue).toFixed(
                              1
                            )}{' '}
                            Cr
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      );
    }

    return null;
  };

  const chartData = transformDataForChart();
  const chartConfig = createChartConfig();

  // Custom tick formatter to show years properly
  const formatXAxisTick = (value: string, index: number) => {
    const [month, year] = value.split(' ');
    const currentData = getDataForFY();
    const prevValue = index > 0 ? currentData[index - 1]?.month : null;
    const prevYear = prevValue ? prevValue.toString().split(' ')[1] : null;

    // Show year only when it changes or for the first item
    if (index === 0 || year !== prevYear) {
      return `${month}\n${year}`;
    }
    return month;
  };

  // Calculate current cumulative total across all companies
  const currentCumulativeTotal = React.useMemo(() => {
    const latestMonth = chartData[chartData.length - 1];
    return Object.keys(businessExcellenceData.businessUnits).reduce(
      (total, company) => {
        const value = latestMonth[company];
        return total + (typeof value === 'number' ? value : 0);
      },
      0
    );
  }, [chartData]);

  // Calculate current cumulative average per company
  const avgCumulativeSavings = (
    currentCumulativeTotal /
    Object.keys(businessExcellenceData.businessUnits).length
  ).toFixed(1);

  // Calculate FY26 target achievement percentage
  const targetAchievementPercentage =
    businessExcellenceData.currentAchievementPercentage;

  // Calculate required monthly rate to succeed
  const requiredRate = businessExcellenceData.requiredMonthlyRate.toFixed(1);

  return (
    <Card className='h-full'>
      <CardHeader className='pb-6'>
        <div className='flex items-start justify-between'>
          <div>
            <CardTitle className='flex items-center gap-3 text-xl'>
              <div className='bg-primary/10 rounded-lg p-2'>
                <IconTrendingUp className='text-primary h-6 w-6' />
              </div>
              Business Excellence Performance
            </CardTitle>
            <CardDescription className='text-muted-foreground text-base'>
              Cumulative cost savings achievement across all business units •
              Target: ₹{businessExcellenceData.fy26Target} Cr
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

      <CardContent className='px-6 pt-2'>
        {/* Business Unit Performance Summary - Above chart */}
        <div className='mb-6 grid w-full grid-cols-2 gap-4 lg:grid-cols-4'>
          {Object.entries(businessExcellenceData.businessUnits).map(
            ([key, company]) => {
              const latestMonth = chartData[chartData.length - 1];
              const cumulativeSavings =
                typeof latestMonth[key] === 'number'
                  ? (latestMonth[key] as number)
                  : 0;
              const targetProgress = (
                (cumulativeSavings / company.annualTarget) *
                100
              ).toFixed(1);

              return (
                <div
                  key={key}
                  className='bg-background/50 border-border/50 rounded-lg border p-3'
                >
                  <div className='mb-2 flex items-center gap-2'>
                    <div
                      className='h-3 w-3 rounded-full shadow-sm'
                      style={{ backgroundColor: company.color }}
                    />
                    <span className='text-muted-foreground text-xs font-medium'>
                      {company.name}
                    </span>
                  </div>
                  <div className='space-y-1'>
                    <div className='text-sm font-semibold'>
                      ₹{cumulativeSavings.toFixed(1)} Cr
                    </div>
                    <div
                      className={`text-xs font-medium ${
                        parseFloat(targetProgress) >= 100
                          ? 'text-green-600'
                          : parseFloat(targetProgress) >= 75
                            ? 'text-yellow-600'
                            : 'text-red-500'
                      }`}
                    >
                      {targetProgress}% of annual target
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>

        <ChartContainer
          config={chartConfig}
          className='aspect-auto h-[450px] w-full'
        >
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart
              data={chartData}
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
                domain={[-5, 40]}
                ticks={[-5, 0, 5, 10, 15, 20, 25, 30, 35, 40]}
                label={{
                  value: 'Cumulative Cost Savings (₹ Crores)',
                  angle: -90,
                  position: 'insideLeft',
                  style: {
                    textAnchor: 'middle',
                    fontSize: '12px',
                    fontWeight: 500
                  }
                }}
              />

              {/* Reference line at zero */}
              <ReferenceLine
                y={0}
                stroke='#6b7280'
                strokeDasharray='4 2'
                strokeOpacity={0.6}
                label={{
                  value: 'Baseline',
                  position: 'topLeft' as any,
                  fontSize: 10,
                  offset: 10
                }}
              />

              {/* Reference line for 6-month cumulative target */}
              <ReferenceLine
                y={businessExcellenceData.fy26Target * 0.5}
                stroke='#f59e0b'
                strokeDasharray='8 4'
                strokeOpacity={0.8}
                label={{
                  value: `6-Month Target: ₹${(businessExcellenceData.fy26Target * 0.5).toFixed(1)} Cr`,
                  position: 'topRight' as any,
                  fontSize: 11
                }}
              />

              <ChartTooltip content={<CustomTooltip />} />

              <Legend
                wrapperStyle={{ paddingTop: '24px' }}
                iconType='line'
                formatter={(value) => (
                  <span className='text-sm font-medium'>{value}</span>
                )}
              />

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
                    name={company.name}
                  />
                )
              )}
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>

      <CardFooter className='bg-muted/20 flex-col items-start gap-6 border-t pt-6 text-sm'>
        {/* FY26 Target Achievement Overview */}
        <div className='flex w-full items-center gap-6'>
          <div className='grid flex-1 auto-rows-min gap-2'>
            <div className='flex items-baseline gap-2 text-2xl leading-none font-bold tabular-nums'>
              {(
                (currentCumulativeTotal / businessExcellenceData.fy26Target) *
                100
              ).toFixed(1)}
              %
              <span className='text-muted-foreground text-sm font-normal'>
                FY26 Target Achieved
              </span>
            </div>
            <div className='text-muted-foreground flex items-center gap-2 leading-none font-medium'>
              ₹{currentCumulativeTotal.toFixed(1)} Cr of ₹
              {businessExcellenceData.fy26Target} Cr
              <IconTarget className='h-4 w-4' />
            </div>
          </div>

          <div className='text-right'>
            <div className='text-lg font-semibold text-amber-600'>
              ₹
              {(
                businessExcellenceData.fy26Target - currentCumulativeTotal
              ).toFixed(1)}{' '}
              Cr
            </div>
            <div className='text-muted-foreground text-xs'>
              Remaining to Target
            </div>
          </div>

          <div className='text-right'>
            <div className='text-lg font-semibold'>
              ₹{avgCumulativeSavings} Cr
            </div>
            <div className='text-muted-foreground text-xs'>
              Avg per Business Unit
            </div>
          </div>
        </div>

        {/* Performance Status Indicator */}
        <div className='w-full'>
          <div className='mb-2 flex items-center justify-between'>
            <span className='text-muted-foreground text-xs font-medium'>
              Cumulative Progress to FY26 Target
            </span>
            <span className='text-xs font-semibold'>
              {(
                (currentCumulativeTotal / businessExcellenceData.fy26Target) *
                100
              ).toFixed(1)}
              %
            </span>
          </div>
          <div className='h-2 w-full rounded-full bg-slate-200'>
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                (currentCumulativeTotal / businessExcellenceData.fy26Target) *
                  100 >=
                75
                  ? 'bg-green-500'
                  : (currentCumulativeTotal /
                        businessExcellenceData.fy26Target) *
                        100 >=
                      50
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
              }`}
              style={{
                width: `${Math.min((currentCumulativeTotal / businessExcellenceData.fy26Target) * 100, 100)}%`
              }}
            />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
