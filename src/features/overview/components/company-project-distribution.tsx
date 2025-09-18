'use client';

import * as React from 'react';
import { TrendingUp, Building2, Users } from 'lucide-react';
import { Label, Pie, PieChart, Sector } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { companyPerformanceData } from '@/constants/mock-api';
import { cn } from '@/lib/utils';

// Prepare data for pie chart
const chartData = companyPerformanceData.map((company, index) => {
  const totalProjects =
    company.l0 + company.l1 + company.l2 + company.l3 + company.l4 + company.l5;
  const colors = [
    'hsl(var(--chart-1))',
    'hsl(var(--chart-2))',
    'hsl(var(--chart-3))',
    'hsl(var(--chart-4))'
  ];

  return {
    company: company.company === 'Munjal Kiru' ? 'Munjal' : company.company,
    projects: totalProjects,
    budget: company.budget,
    efficiency: company.efficiency,
    fill: colors[index]
  };
});

const totalProjects = chartData.reduce((sum, item) => sum + item.projects, 0);
const totalBudget = chartData.reduce((sum, item) => sum + item.budget, 0);

const chartConfig = {
  projects: {
    label: 'Projects'
  },
  'Hero Motors': {
    label: 'Hero Motors',
    color: 'hsl(var(--chart-1))'
  },
  'Hero Cycles': {
    label: 'Hero Cycles',
    color: 'hsl(var(--chart-2))'
  },
  'HMC Hive': {
    label: 'HMC Hive',
    color: 'hsl(var(--chart-3))'
  },
  Munjal: {
    label: 'Munjal',
    color: 'hsl(var(--chart-4))'
  }
} satisfies ChartConfig;

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 20) * cos;
  const my = cy + (outerRadius + 20) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 16;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill='none'
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke='none' />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 8}
        y={ey}
        textAnchor={textAnchor}
        fill='hsl(var(--foreground))'
        className='text-sm font-medium'
      >{`${payload.company}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 8}
        y={ey}
        dy={16}
        textAnchor={textAnchor}
        fill='hsl(var(--muted-foreground))'
        className='text-xs'
      >
        {`${payload.projects} projects (${(percent * 100).toFixed(1)}%)`}
      </text>
    </g>
  );
};

export function CompanyProjectDistribution() {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const onPieEnter = (_: React.MouseEvent<SVGElement>, index: number) => {
    setActiveIndex(index);
  };

  return (
    <Card>
      <CardHeader className='pb-4'>
        <div className='flex items-start justify-between'>
          <div>
            <CardTitle>Project Distribution</CardTitle>
            <CardDescription>
              Active projects across group companies
            </CardDescription>
          </div>
          <div className='flex items-center gap-1.5 rounded-md border border-blue-200 bg-blue-50 px-2.5 py-1 dark:border-blue-900/20 dark:bg-blue-950/10'>
            <Building2 className='h-3.5 w-3.5 text-blue-600' />
            <span className='text-sm font-medium text-blue-600'>
              {totalProjects} Projects
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className='pb-4'>
        <ChartContainer
          config={chartConfig}
          className='mx-auto aspect-square h-[250px]'
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value, payload) => {
                    const data = payload?.[0]?.payload;
                    if (!data) return value;
                    return data.company;
                  }}
                  formatter={(value, name, props) => {
                    const data = props.payload;
                    return (
                      <div className='space-y-1'>
                        <div className='flex items-center justify-between gap-4'>
                          <span className='text-muted-foreground'>
                            Projects:
                          </span>
                          <span className='font-medium'>{data.projects}</span>
                        </div>
                        <div className='flex items-center justify-between gap-4'>
                          <span className='text-muted-foreground'>Budget:</span>
                          <span className='font-medium'>
                            ₹{data.budget.toFixed(1)} Cr
                          </span>
                        </div>
                        <div className='flex items-center justify-between gap-4'>
                          <span className='text-muted-foreground'>
                            Efficiency:
                          </span>
                          <span className='font-medium'>
                            {data.efficiency}%
                          </span>
                        </div>
                      </div>
                    );
                  }}
                />
              }
            />
            <Pie
              data={chartData}
              cx='50%'
              cy='50%'
              labelLine={false}
              label={false}
              outerRadius={80}
              fill='#8884d8'
              dataKey='projects'
              activeIndex={activeIndex}
              onMouseEnter={onPieEnter}
              activeShape={renderActiveShape}
            >
              <Label
                content={({ viewBox }) => {
                  const { cx = 0, cy = 0 } = viewBox || {};
                  return (
                    <text
                      x={cx}
                      y={cy}
                      textAnchor='middle'
                      dominantBaseline='middle'
                    >
                      <tspan
                        x={cx}
                        y={cy}
                        className='fill-foreground text-3xl font-bold'
                      >
                        {totalProjects}
                      </tspan>
                      <tspan
                        x={cx}
                        y={cy + 24}
                        className='fill-muted-foreground text-sm'
                      >
                        Total Projects
                      </tspan>
                    </text>
                  );
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>

        {/* Summary Stats */}
        <div className='mt-4 grid grid-cols-2 gap-4 border-t pt-4'>
          <div className='space-y-1'>
            <p className='text-sm font-medium'>Total Budget</p>
            <p className='text-2xl font-bold'>
              ₹{(totalBudget / 1000).toFixed(1)}B
            </p>
            <p className='text-muted-foreground text-xs'>
              Across all companies
            </p>
          </div>
          <div className='space-y-1'>
            <p className='text-sm font-medium'>Avg Efficiency</p>
            <p className='text-2xl font-bold'>
              {(
                chartData.reduce((sum, item) => sum + item.efficiency, 0) /
                chartData.length
              ).toFixed(1)}
              %
            </p>
            <p className='text-muted-foreground text-xs'>Group performance</p>
          </div>
        </div>

        {/* Company Legend */}
        <div className='mt-4 space-y-2 border-t pt-4'>
          {chartData.map((company) => (
            <div
              key={company.company}
              className={cn(
                'flex items-center justify-between rounded-lg p-2 transition-colors',
                activeIndex === chartData.indexOf(company) &&
                  'bg-gray-50 dark:bg-gray-800/50'
              )}
            >
              <div className='flex items-center gap-2'>
                <div
                  className='h-3 w-3 rounded-full'
                  style={{ backgroundColor: company.fill }}
                />
                <span className='text-sm font-medium'>{company.company}</span>
              </div>
              <div className='flex items-center gap-4 text-sm'>
                <span className='text-muted-foreground'>
                  {company.projects} projects
                </span>
                <span className='font-medium'>
                  ₹{company.budget.toFixed(1)} Cr
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
