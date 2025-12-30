'use client';

import * as React from 'react';
import {
  Line,
  LineChart,
  Bar,
  BarChart,
  Area,
  AreaChart,
  Pie,
  PieChart,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
  Tooltip
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Landmark,
  ArrowUpRight,
  ArrowDownRight,
  Percent,
  Wallet,
  PiggyBank,
  Building2,
  Globe
} from 'lucide-react';

import PageContainer from '@/components/layout/page-container';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

// Mock data for Treasury Management
const cashFlowData = [
  { month: 'Jan', inflow: 4.2, outflow: 3.1, net: 1.1 },
  { month: 'Feb', inflow: 3.8, outflow: 3.5, net: 0.3 },
  { month: 'Mar', inflow: 5.1, outflow: 4.2, net: 0.9 },
  { month: 'Apr', inflow: 4.6, outflow: 3.8, net: 0.8 },
  { month: 'May', inflow: 5.3, outflow: 4.1, net: 1.2 },
  { month: 'Jun', inflow: 4.9, outflow: 4.5, net: 0.4 },
  { month: 'Jul', inflow: 5.8, outflow: 4.2, net: 1.6 },
  { month: 'Aug', inflow: 5.2, outflow: 4.8, net: 0.4 },
  { month: 'Sep', inflow: 6.1, outflow: 4.3, net: 1.8 },
  { month: 'Oct', inflow: 5.5, outflow: 4.9, net: 0.6 },
  { month: 'Nov', inflow: 5.9, outflow: 4.6, net: 1.3 },
  { month: 'Dec', inflow: 6.4, outflow: 5.1, net: 1.3 }
];

const liquidityData = [
  { name: 'Current Accounts', value: 4.2, color: '#3b82f6' },
  { name: 'Savings Accounts', value: 2.8, color: '#22c55e' },
  { name: 'Fixed Deposits', value: 3.5, color: '#f59e0b' },
  { name: 'Money Market', value: 1.5, color: '#8b5cf6' },
  { name: 'Cash on Hand', value: 0.5, color: '#ef4444' }
];

const forexExposureData = [
  { currency: 'USD', exposure: 2.1, hedged: 1.4, unhedged: 0.7 },
  { currency: 'EUR', exposure: 1.2, hedged: 0.9, unhedged: 0.3 },
  { currency: 'GBP', exposure: 0.5, hedged: 0.3, unhedged: 0.2 },
  { currency: 'JPY', exposure: 0.3, hedged: 0.2, unhedged: 0.1 },
  { currency: 'AED', exposure: 0.1, hedged: 0.08, unhedged: 0.02 }
];

const investmentPortfolioData = [
  {
    month: 'Jan',
    bonds: 2.1,
    equities: 1.5,
    mutualFunds: 0.8,
    treasuryBills: 1.2
  },
  {
    month: 'Feb',
    bonds: 2.2,
    equities: 1.6,
    mutualFunds: 0.85,
    treasuryBills: 1.25
  },
  {
    month: 'Mar',
    bonds: 2.3,
    equities: 1.4,
    mutualFunds: 0.9,
    treasuryBills: 1.3
  },
  {
    month: 'Apr',
    bonds: 2.35,
    equities: 1.7,
    mutualFunds: 0.95,
    treasuryBills: 1.28
  },
  {
    month: 'May',
    bonds: 2.4,
    equities: 1.8,
    mutualFunds: 1.0,
    treasuryBills: 1.35
  },
  {
    month: 'Jun',
    bonds: 2.5,
    equities: 1.75,
    mutualFunds: 1.05,
    treasuryBills: 1.4
  },
  {
    month: 'Jul',
    bonds: 2.55,
    equities: 1.9,
    mutualFunds: 1.1,
    treasuryBills: 1.38
  },
  {
    month: 'Aug',
    bonds: 2.6,
    equities: 2.0,
    mutualFunds: 1.15,
    treasuryBills: 1.42
  },
  {
    month: 'Sep',
    bonds: 2.7,
    equities: 1.95,
    mutualFunds: 1.2,
    treasuryBills: 1.45
  },
  {
    month: 'Oct',
    bonds: 2.75,
    equities: 2.1,
    mutualFunds: 1.25,
    treasuryBills: 1.5
  },
  {
    month: 'Nov',
    bonds: 2.8,
    equities: 2.15,
    mutualFunds: 1.3,
    treasuryBills: 1.48
  },
  {
    month: 'Dec',
    bonds: 2.9,
    equities: 2.2,
    mutualFunds: 1.35,
    treasuryBills: 1.55
  }
];

const cashFlowChartConfig: ChartConfig = {
  inflow: {
    label: 'Cash Inflow',
    color: '#22c55e'
  },
  outflow: {
    label: 'Cash Outflow',
    color: '#ef4444'
  },
  net: {
    label: 'Net Cash Flow',
    color: '#3b82f6'
  }
};

const investmentChartConfig: ChartConfig = {
  bonds: {
    label: 'Bonds',
    color: '#3b82f6'
  },
  equities: {
    label: 'Equities',
    color: '#22c55e'
  },
  mutualFunds: {
    label: 'Mutual Funds',
    color: '#f59e0b'
  },
  treasuryBills: {
    label: 'Treasury Bills',
    color: '#8b5cf6'
  }
};

const forexChartConfig: ChartConfig = {
  hedged: {
    label: 'Hedged',
    color: '#22c55e'
  },
  unhedged: {
    label: 'Unhedged',
    color: '#ef4444'
  }
};

export default function TreasuryManagementPage() {
  const [selectedPeriod, setSelectedPeriod] = React.useState('12M');

  // Calculate totals
  const totalLiquidity = liquidityData.reduce(
    (sum, item) => sum + item.value,
    0
  );
  const totalForexExposure = forexExposureData.reduce(
    (sum, item) => sum + item.exposure,
    0
  );
  const hedgedPercentage = (
    (forexExposureData.reduce((sum, item) => sum + item.hedged, 0) /
      totalForexExposure) *
    100
  ).toFixed(0);
  const latestInvestments =
    investmentPortfolioData[investmentPortfolioData.length - 1];
  const totalInvestments =
    latestInvestments.bonds +
    latestInvestments.equities +
    latestInvestments.mutualFunds +
    latestInvestments.treasuryBills;

  // Calculate cash flow forecast
  const lastThreeMonths = cashFlowData.slice(-3);
  const avgNetCashFlow = (
    lastThreeMonths.reduce((sum, item) => sum + item.net, 0) / 3
  ).toFixed(1);

  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-6'>
        {/* Header */}
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              Treasury Management
            </h2>
            <p className='text-muted-foreground'>
              Monitor liquidity, cash flows, forex exposure, and investments
            </p>
          </div>
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className='w-40'>
              <SelectValue placeholder='Select Period' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='3M'>Last 3 Months</SelectItem>
              <SelectItem value='6M'>Last 6 Months</SelectItem>
              <SelectItem value='12M'>Last 12 Months</SelectItem>
              <SelectItem value='YTD'>Year to Date</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* KPI Cards */}
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total Liquidity
              </CardTitle>
              <Wallet className='text-muted-foreground h-4 w-4' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                ${totalLiquidity.toFixed(1)}M
              </div>
              <div className='text-muted-foreground flex items-center text-xs'>
                <TrendingUp className='mr-1 h-3 w-3 text-green-500' />
                <span className='text-green-500'>+8.2%</span>
                <span className='ml-1'>from last month</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Cash Flow Forecast
              </CardTitle>
              <ArrowUpRight className='text-muted-foreground h-4 w-4' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>+${avgNetCashFlow}M</div>
              <p className='text-muted-foreground text-xs'>
                average monthly net flow
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Forex Exposure
              </CardTitle>
              <Globe className='text-muted-foreground h-4 w-4' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                ${totalForexExposure.toFixed(1)}M
              </div>
              <p className='text-muted-foreground text-xs'>
                hedged at {hedgedPercentage}%
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Investment Yield
              </CardTitle>
              <Percent className='text-muted-foreground h-4 w-4' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>4.8%</div>
              <div className='text-muted-foreground flex items-center text-xs'>
                <TrendingUp className='mr-1 h-3 w-3 text-green-500' />
                <span className='text-green-500'>+0.3%</span>
                <span className='ml-1'>vs benchmark</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 1 */}
        <div className='grid gap-4 md:grid-cols-2'>
          {/* Cash Flow Trend Chart */}
          <Card className='col-span-1'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <TrendingUp className='h-5 w-5 text-blue-500' />
                Cash Flow Trends
              </CardTitle>
              <CardDescription>
                Monthly inflows vs outflows (in $M)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={cashFlowChartConfig}
                className='h-[300px] w-full'
              >
                <ResponsiveContainer width='100%' height='100%'>
                  <LineChart
                    data={cashFlowData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray='3 3'
                      className='stroke-muted/30'
                    />
                    <XAxis
                      dataKey='month'
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => `$${value}M`}
                    />
                    <ChartTooltip
                      content={<ChartTooltipContent />}
                      formatter={(value: number) => [`$${value}M`, '']}
                    />
                    <Legend />
                    <Line
                      type='monotone'
                      dataKey='inflow'
                      stroke='#22c55e'
                      strokeWidth={2}
                      dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: '#22c55e', strokeWidth: 2 }}
                      name='Cash Inflow'
                    />
                    <Line
                      type='monotone'
                      dataKey='outflow'
                      stroke='#ef4444'
                      strokeWidth={2}
                      dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: '#ef4444', strokeWidth: 2 }}
                      name='Cash Outflow'
                    />
                    <Line
                      type='monotone'
                      dataKey='net'
                      stroke='#3b82f6'
                      strokeWidth={2}
                      strokeDasharray='5 5'
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
                      name='Net Cash Flow'
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
            <CardFooter className='flex-col items-start gap-2 text-sm'>
              <div className='flex gap-2 leading-none font-medium'>
                Net positive cash flow trend{' '}
                <TrendingUp className='h-4 w-4 text-green-500' />
              </div>
              <div className='text-muted-foreground leading-none'>
                Average monthly net inflow: ${avgNetCashFlow}M
              </div>
            </CardFooter>
          </Card>

          {/* Liquidity Distribution Chart */}
          <Card className='col-span-1'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <PiggyBank className='h-5 w-5 text-green-500' />
                Liquidity Distribution
              </CardTitle>
              <CardDescription>
                Breakdown by account type (Total: ${totalLiquidity.toFixed(1)}M)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='h-[300px] w-full'>
                <ResponsiveContainer width='100%' height='100%'>
                  <PieChart>
                    <Pie
                      data={liquidityData}
                      cx='50%'
                      cy='50%'
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey='value'
                      label={({ name, percent }) =>
                        `${name} (${(percent * 100).toFixed(0)}%)`
                      }
                      labelLine={true}
                    >
                      {liquidityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => [`$${value}M`, 'Amount']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
            <CardFooter>
              <div className='flex w-full flex-wrap justify-center gap-3'>
                {liquidityData.map((item, index) => (
                  <div key={index} className='flex items-center gap-2 text-xs'>
                    <div
                      className='h-3 w-3 rounded-full'
                      style={{ backgroundColor: item.color }}
                    />
                    <span className='text-muted-foreground'>{item.name}</span>
                  </div>
                ))}
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className='grid gap-4 md:grid-cols-2'>
          {/* Forex Exposure Chart */}
          <Card className='col-span-1'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Globe className='h-5 w-5 text-purple-500' />
                Foreign Exchange Exposure
              </CardTitle>
              <CardDescription>
                Currency-wise hedged vs unhedged exposure (in $M)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={forexChartConfig}
                className='h-[300px] w-full'
              >
                <ResponsiveContainer width='100%' height='100%'>
                  <BarChart
                    data={forexExposureData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray='3 3'
                      className='stroke-muted/30'
                    />
                    <XAxis
                      dataKey='currency'
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => `$${value}M`}
                    />
                    <ChartTooltip
                      content={<ChartTooltipContent />}
                      formatter={(value: number) => [`$${value}M`, '']}
                    />
                    <Legend />
                    <Bar
                      dataKey='hedged'
                      stackId='a'
                      fill='#22c55e'
                      radius={[0, 0, 0, 0]}
                      name='Hedged'
                    />
                    <Bar
                      dataKey='unhedged'
                      stackId='a'
                      fill='#ef4444'
                      radius={[4, 4, 0, 0]}
                      name='Unhedged'
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
            <CardFooter className='flex-col items-start gap-2 text-sm'>
              <div className='flex gap-2 leading-none font-medium'>
                {hedgedPercentage}% of forex exposure is hedged
              </div>
              <div className='text-muted-foreground leading-none'>
                Total exposure: ${totalForexExposure.toFixed(1)}M across 5
                currencies
              </div>
            </CardFooter>
          </Card>

          {/* Investment Portfolio Chart */}
          <Card className='col-span-1'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Building2 className='h-5 w-5 text-amber-500' />
                Investment Portfolio Growth
              </CardTitle>
              <CardDescription>
                Asset allocation over time (in $M)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={investmentChartConfig}
                className='h-[300px] w-full'
              >
                <ResponsiveContainer width='100%' height='100%'>
                  <AreaChart
                    data={investmentPortfolioData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id='colorBonds'
                        x1='0'
                        y1='0'
                        x2='0'
                        y2='1'
                      >
                        <stop
                          offset='5%'
                          stopColor='#3b82f6'
                          stopOpacity={0.8}
                        />
                        <stop
                          offset='95%'
                          stopColor='#3b82f6'
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                      <linearGradient
                        id='colorEquities'
                        x1='0'
                        y1='0'
                        x2='0'
                        y2='1'
                      >
                        <stop
                          offset='5%'
                          stopColor='#22c55e'
                          stopOpacity={0.8}
                        />
                        <stop
                          offset='95%'
                          stopColor='#22c55e'
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                      <linearGradient
                        id='colorMutualFunds'
                        x1='0'
                        y1='0'
                        x2='0'
                        y2='1'
                      >
                        <stop
                          offset='5%'
                          stopColor='#f59e0b'
                          stopOpacity={0.8}
                        />
                        <stop
                          offset='95%'
                          stopColor='#f59e0b'
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                      <linearGradient
                        id='colorTreasuryBills'
                        x1='0'
                        y1='0'
                        x2='0'
                        y2='1'
                      >
                        <stop
                          offset='5%'
                          stopColor='#8b5cf6'
                          stopOpacity={0.8}
                        />
                        <stop
                          offset='95%'
                          stopColor='#8b5cf6'
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray='3 3'
                      className='stroke-muted/30'
                    />
                    <XAxis
                      dataKey='month'
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => `$${value}M`}
                    />
                    <ChartTooltip
                      content={<ChartTooltipContent />}
                      formatter={(value: number) => [`$${value}M`, '']}
                    />
                    <Legend />
                    <Area
                      type='monotone'
                      dataKey='bonds'
                      stackId='1'
                      stroke='#3b82f6'
                      fill='url(#colorBonds)'
                      name='Bonds'
                    />
                    <Area
                      type='monotone'
                      dataKey='equities'
                      stackId='1'
                      stroke='#22c55e'
                      fill='url(#colorEquities)'
                      name='Equities'
                    />
                    <Area
                      type='monotone'
                      dataKey='mutualFunds'
                      stackId='1'
                      stroke='#f59e0b'
                      fill='url(#colorMutualFunds)'
                      name='Mutual Funds'
                    />
                    <Area
                      type='monotone'
                      dataKey='treasuryBills'
                      stackId='1'
                      stroke='#8b5cf6'
                      fill='url(#colorTreasuryBills)'
                      name='Treasury Bills'
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
            <CardFooter className='flex-col items-start gap-2 text-sm'>
              <div className='flex gap-2 leading-none font-medium'>
                Portfolio value: ${totalInvestments.toFixed(1)}M{' '}
                <TrendingUp className='h-4 w-4 text-green-500' />
              </div>
              <div className='text-muted-foreground leading-none'>
                +12.3% growth YoY with 4.8% yield
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
