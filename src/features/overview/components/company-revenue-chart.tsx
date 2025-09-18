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
  ChartConfig,
  ChartContainer,
  ChartTooltip
} from '@/components/ui/chart';
import { businessExcellenceData } from '@/constants/mock-api';

// Transform data for the chart
const transformDataForChart = () => {
  return businessExcellenceData.monthlyData.map((monthData) => {
    const chartPoint: Record<string, string | number> = {
      month: monthData.month
    };

    // Add achieved cost savings for each business unit
    Object.keys(businessExcellenceData.businessUnits).forEach((companyKey) => {
      const companyData = monthData[companyKey as keyof typeof monthData];
      if (typeof companyData === 'object' && companyData !== null) {
        chartPoint[companyKey] = companyData.achieved;
      }
    });

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

// Enhanced custom tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const monthData = businessExcellenceData.monthlyData.find(
      (data) => data.month === label
    );

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

            if (typeof companyData === 'object' && companyData !== null) {
              const achievementPercentage = (
                (companyData.achieved / (company.annualTarget / 12)) *
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
                        <span className='text-muted-foreground'>Savings:</span>
                        <span className='text-foreground font-semibold'>
                          ₹{companyData.achieved} Cr
                        </span>
                      </div>
                      <div className='flex items-center justify-between'>
                        <span className='text-muted-foreground'>Target:</span>
                        <span className='text-muted-foreground font-medium'>
                          ₹{(company.annualTarget / 12).toFixed(1)} Cr
                        </span>
                      </div>
                      <div className='flex items-center justify-between'>
                        <span className='text-muted-foreground'>
                          Achievement:
                        </span>
                        <span
                          className={`font-semibold ${
                            parseFloat(achievementPercentage) >= 100
                              ? 'text-green-600'
                              : parseFloat(achievementPercentage) >= 90
                                ? 'text-yellow-600'
                                : 'text-red-500'
                          }`}
                        >
                          {achievementPercentage}%
                        </span>
                      </div>
                      <div className='flex items-center justify-between'>
                        <span className='text-muted-foreground'>Run Rate:</span>
                        <span className='font-semibold text-amber-600'>
                          ₹{((companyData.achieved * 12) / 9).toFixed(1)} Cr/yr
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
                        <span className='text-muted-foreground'>Variance:</span>
                        <span
                          className={`font-semibold ${
                            companyData.achieved >= company.annualTarget / 12
                              ? 'text-green-600'
                              : 'text-red-600'
                          }`}
                        >
                          {companyData.achieved >= company.annualTarget / 12
                            ? '+'
                            : ''}
                          {(
                            companyData.achieved -
                            company.annualTarget / 12
                          ).toFixed(1)}{' '}
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

export function BusinessExcellenceChart() {
  const chartData = transformDataForChart();
  const chartConfig = createChartConfig();

  // Custom tick formatter to show years properly
  const formatXAxisTick = (value: string, index: number) => {
    const [month, year] = value.split(' ');
    const prevValue = index > 0 ? chartData[index - 1]?.month : null;
    const prevYear = prevValue ? prevValue.toString().split(' ')[1] : null;

    // Show year only when it changes or for the first item
    if (index === 0 || year !== prevYear) {
      return `${month}\n${year}`;
    }
    return month;
  };

  // Calculate total revenue for the period
  const totalRevenue = React.useMemo(() => {
    return chartData.reduce((sum, month) => {
      return (
        sum +
        Object.keys(businessExcellenceData.businessUnits).reduce(
          (monthSum, company) => {
            const value = month[company];
            return monthSum + (typeof value === 'number' ? value : 0);
          },
          0
        )
      );
    }, 0);
  }, [chartData]);

  // Calculate average monthly performance
  const avgMonthlySavings = (totalRevenue / chartData.length).toFixed(1);

  // Calculate FY26 target achievement percentage
  const targetAchievementPercentage =
    businessExcellenceData.currentAchievementPercentage;

  // Calculate required monthly rate to succeed
  const requiredRate = businessExcellenceData.requiredMonthlyRate.toFixed(1);

  return (
    <Card className='h-full'>
      <CardHeader className='pb-6'>
        <CardTitle className='flex items-center gap-3 text-xl'>
          <div className='bg-primary/10 rounded-lg p-2'>
            <IconTrendingUp className='text-primary h-6 w-6' />
          </div>
          Business Excellence Performance
        </CardTitle>
        <CardDescription className='text-muted-foreground text-base'>
          Monthly cost savings achievement across all business units • FY26
          Target: ₹{businessExcellenceData.fy26Target} Cr
        </CardDescription>
      </CardHeader>

      <CardContent className='px-6 pt-2'>
        {/* Business Unit Performance Summary - Above chart */}
        <div className='mb-6 grid w-full grid-cols-2 gap-4 lg:grid-cols-4'>
          {Object.entries(businessExcellenceData.businessUnits).map(
            ([key, company]) => {
              const latestMonth = chartData[chartData.length - 1];
              const latestSavings =
                typeof latestMonth[key] === 'number'
                  ? (latestMonth[key] as number)
                  : 0;
              const monthlyTarget = company.annualTarget / 12;
              const achievement = (
                (latestSavings / monthlyTarget) *
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
                      ₹{latestSavings} Cr
                    </div>
                    <div
                      className={`text-xs font-medium ${
                        parseFloat(achievement) >= 100
                          ? 'text-green-600'
                          : parseFloat(achievement) >= 90
                            ? 'text-yellow-600'
                            : 'text-red-500'
                      }`}
                    >
                      {achievement}% of target
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
                domain={[0, 6]}
                ticks={[0, 1, 2, 3, 4, 5, 6]}
                label={{
                  value: 'Cost Savings (₹ Crores)',
                  angle: -90,
                  position: 'insideLeft',
                  style: {
                    textAnchor: 'middle',
                    fontSize: '12px',
                    fontWeight: 500
                  }
                }}
              />

              {/* Reference line for average */}
              <ReferenceLine
                y={parseFloat(requiredRate)}
                stroke='#f59e0b'
                strokeDasharray='8 4'
                strokeOpacity={0.8}
                label={{
                  value: `Required Rate: ₹${requiredRate} Cr/month`,
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
              {targetAchievementPercentage}%
              <span className='text-muted-foreground text-sm font-normal'>
                FY26 Target Achieved
              </span>
            </div>
            <div className='text-muted-foreground flex items-center gap-2 leading-none font-medium'>
              ₹{businessExcellenceData.achievedYTD} Cr of ₹
              {businessExcellenceData.fy26Target} Cr
              <IconTarget className='h-4 w-4' />
            </div>
          </div>

          <div className='text-right'>
            <div className='text-lg font-semibold text-amber-600'>
              ₹{requiredRate} Cr
            </div>
            <div className='text-muted-foreground text-xs'>
              Required Monthly Rate
            </div>
          </div>

          <div className='text-right'>
            <div className='text-lg font-semibold'>₹{avgMonthlySavings} Cr</div>
            <div className='text-muted-foreground text-xs'>
              Current Avg Monthly
            </div>
          </div>
        </div>

        {/* Performance Status Indicator */}
        <div className='w-full'>
          <div className='mb-2 flex items-center justify-between'>
            <span className='text-muted-foreground text-xs font-medium'>
              Progress to FY26 Target
            </span>
            <span className='text-xs font-semibold'>
              {targetAchievementPercentage}%
            </span>
          </div>
          <div className='h-2 w-full rounded-full bg-slate-200'>
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                parseFloat(targetAchievementPercentage) >= 75
                  ? 'bg-green-500'
                  : parseFloat(targetAchievementPercentage) >= 50
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
              }`}
              style={{
                width: `${Math.min(parseFloat(targetAchievementPercentage), 100)}%`
              }}
            />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
