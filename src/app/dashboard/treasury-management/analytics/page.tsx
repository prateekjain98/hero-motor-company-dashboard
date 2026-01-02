'use client';

import * as React from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  Tooltip,
  ComposedChart
} from 'recharts';
import {
  Download,
  FileSpreadsheet,
  FileText,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Building2,
  Landmark,
  PiggyBank,
  FileSignature,
  Calendar,
  Clock,
  AlertTriangle,
  Shield,
  Banknote,
  Wallet,
  Timer,
  CalendarClock,
  Scale,
  CheckCircle2,
  XCircle,
  CircleDollarSign,
  Hourglass,
  BadgeAlert,
  Receipt
} from 'lucide-react';

import PageContainer from '@/components/layout/page-container';
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
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';

// ==================== PERIOD-BASED DATA GENERATOR ====================
type Period = 'CM' | '3M' | '6M' | '12M' | 'YTD';

// Base monthly data for the full year (will be sliced based on period)
const baseMonthlyTransfers = [
  {
    month: 'Jan',
    RTGS: 142.5,
    NEFT: 68.4,
    Internal: 45.2,
    rtgsCount: 18,
    neftCount: 32,
    internalCount: 14
  },
  {
    month: 'Feb',
    RTGS: 156.8,
    NEFT: 72.1,
    Internal: 48.6,
    rtgsCount: 21,
    neftCount: 35,
    internalCount: 16
  },
  {
    month: 'Mar',
    RTGS: 138.2,
    NEFT: 64.6,
    Internal: 42.8,
    rtgsCount: 17,
    neftCount: 30,
    internalCount: 13
  },
  {
    month: 'Apr',
    RTGS: 168.4,
    NEFT: 78.2,
    Internal: 52.4,
    rtgsCount: 22,
    neftCount: 38,
    internalCount: 17
  },
  {
    month: 'May',
    RTGS: 152.6,
    NEFT: 69.8,
    Internal: 46.2,
    rtgsCount: 19,
    neftCount: 33,
    internalCount: 15
  },
  {
    month: 'Jun',
    RTGS: 175.3,
    NEFT: 85.4,
    Internal: 58.6,
    rtgsCount: 23,
    neftCount: 40,
    internalCount: 18
  },
  {
    month: 'Jul',
    RTGS: 163.8,
    NEFT: 71.2,
    Internal: 48.8,
    rtgsCount: 20,
    neftCount: 34,
    internalCount: 15
  },
  {
    month: 'Aug',
    RTGS: 178.2,
    NEFT: 88.6,
    Internal: 62.4,
    rtgsCount: 24,
    neftCount: 42,
    internalCount: 19
  },
  {
    month: 'Sep',
    RTGS: 185.4,
    NEFT: 93.8,
    Internal: 68.2,
    rtgsCount: 25,
    neftCount: 44,
    internalCount: 21
  },
  {
    month: 'Oct',
    RTGS: 172.6,
    NEFT: 86.2,
    Internal: 54.8,
    rtgsCount: 22,
    neftCount: 40,
    internalCount: 17
  },
  {
    month: 'Nov',
    RTGS: 189.3,
    NEFT: 79.4,
    Internal: 52.2,
    rtgsCount: 24,
    neftCount: 38,
    internalCount: 16
  },
  {
    month: 'Dec',
    RTGS: 168.5,
    NEFT: 82.8,
    Internal: 56.5,
    rtgsCount: 21,
    neftCount: 39,
    internalCount: 17
  }
];

const baseLiquidityData = [
  { month: 'Jan', inflows: 286.4, outflows: 242.8, net: 43.6 },
  { month: 'Feb', inflows: 312.6, outflows: 298.4, net: 14.2 },
  { month: 'Mar', inflows: 268.2, outflows: 286.6, net: -18.4 },
  { month: 'Apr', inflows: 324.8, outflows: 268.2, net: 56.6 },
  { month: 'May', inflows: 298.4, outflows: 312.6, net: -14.2 },
  { month: 'Jun', inflows: 356.2, outflows: 324.8, net: 31.4 },
  { month: 'Jul', inflows: 342.8, outflows: 298.4, net: 44.4 },
  { month: 'Aug', inflows: 368.4, outflows: 342.6, net: 25.8 },
  { month: 'Sep', inflows: 386.2, outflows: 368.8, net: 17.4 },
  { month: 'Oct', inflows: 324.6, outflows: 312.4, net: 12.2 },
  { month: 'Nov', inflows: 356.8, outflows: 324.2, net: 32.6 },
  { month: 'Dec', inflows: 398.4, outflows: 356.8, net: 41.6 }
];

// Helper function to get data based on period
const getDataForPeriod = (period: Period) => {
  // Determine which months to include
  const getMonthSlice = <T,>(data: T[]): T[] => {
    switch (period) {
      case 'CM':
        return data.slice(-1); // December only
      case '3M':
        return data.slice(-3); // Oct, Nov, Dec
      case '6M':
        return data.slice(-6); // Jul - Dec
      case 'YTD':
        return data.slice(0, 11); // Jan - Nov
      case '12M':
      default:
        return data; // Full year
    }
  };

  // Get sliced data
  const monthlySlice = getMonthSlice(baseMonthlyTransfers);
  const liquiditySlice = getMonthSlice(baseLiquidityData);

  // Calculate totals from the sliced monthly data
  const rtgsTotal = monthlySlice.reduce((sum, m) => sum + m.rtgsCount, 0);
  const neftTotal = monthlySlice.reduce((sum, m) => sum + m.neftCount, 0);
  const internalTotal = monthlySlice.reduce(
    (sum, m) => sum + m.internalCount,
    0
  );
  const totalTransfers = rtgsTotal + neftTotal + internalTotal;

  const rtgsValue = +monthlySlice
    .reduce((sum, m) => sum + m.RTGS, 0)
    .toFixed(1);
  const neftValue = +monthlySlice
    .reduce((sum, m) => sum + m.NEFT, 0)
    .toFixed(1);
  const internalValue = +monthlySlice
    .reduce((sum, m) => sum + m.Internal, 0)
    .toFixed(1);
  const totalValue = +(rtgsValue + neftValue + internalValue).toFixed(1);

  // Transfer by type - calculated from monthly data with TAT details
  const transferByType = [
    {
      type: 'RTGS',
      count: rtgsTotal,
      value: rtgsValue,
      avgValue: +(rtgsValue / rtgsTotal).toFixed(2),
      avgTAT: 0.5, // hours
      minTAT: 0.25,
      maxTAT: 2,
      onTimeCount: Math.round(rtgsTotal * 0.96),
      delayedCount: Math.round(rtgsTotal * 0.04),
      color: '#3b82f6'
    },
    {
      type: 'NEFT',
      count: neftTotal,
      value: neftValue,
      avgValue: +(neftValue / neftTotal).toFixed(2),
      avgTAT: 2.4, // hours
      minTAT: 1,
      maxTAT: 4,
      onTimeCount: Math.round(neftTotal * 0.92),
      delayedCount: Math.round(neftTotal * 0.08),
      color: '#22c55e'
    },
    {
      type: 'Internal',
      count: internalTotal,
      value: internalValue,
      avgValue: +(internalValue / internalTotal).toFixed(2),
      avgTAT: 0.1, // hours
      minTAT: 0.05,
      maxTAT: 0.5,
      onTimeCount: Math.round(internalTotal * 0.99),
      delayedCount: Math.round(internalTotal * 0.01),
      color: '#f59e0b'
    }
  ];

  // Calculate overall TAT metrics
  const totalOnTime = transferByType.reduce((sum, t) => sum + t.onTimeCount, 0);
  const totalDelayed = transferByType.reduce(
    (sum, t) => sum + t.delayedCount,
    0
  );
  const avgOverallTAT = +(
    (rtgsTotal * 0.5 + neftTotal * 2.4 + internalTotal * 0.1) /
    totalTransfers
  ).toFixed(2);

  // Penalty and charges data with transaction details
  const penaltyChargesCount = Math.round(totalTransfers * 0.032); // ~3.2% transactions incur charges

  // Generate transaction details for each penalty type
  const generatePenaltyTransactions = (
    penaltyType: string,
    count: number,
    avgCharge: number
  ) => {
    const transactions = [];
    const baseDate = new Date('2025-12-01');
    const transferTypes = ['RTGS', 'NEFT', 'Internal'];
    const banks = ['HDFC Bank', 'SBI', 'ICICI Bank', 'Axis Bank', 'Kotak Bank'];
    const vendors = [
      'Steel Corp India',
      'Parts Unlimited',
      'Hero Electric',
      'Dealer Network',
      'Raw Materials Ltd'
    ];

    for (let i = 0; i < Math.min(count, 20); i++) {
      // Limit to 20 for display
      const date = new Date(baseDate);
      date.setDate(
        date.getDate() -
          Math.floor(Math.random() * 30 * (monthlySlice.length || 1))
      );
      const charge = +(avgCharge * (0.7 + Math.random() * 0.6)).toFixed(2);

      transactions.push({
        id: `TXN-2025-${String(1000 + i + Math.floor(Math.random() * 9000)).padStart(4, '0')}`,
        date: date.toISOString().split('T')[0],
        transferType:
          transferTypes[Math.floor(Math.random() * transferTypes.length)],
        fromAccount: `${banks[Math.floor(Math.random() * banks.length)]}-${String(Math.floor(Math.random() * 9000000000) + 1000000000)}`,
        toAccount: vendors[Math.floor(Math.random() * vendors.length)],
        amount: +(Math.random() * 50 + 5).toFixed(2),
        chargeAmount: charge,
        reason:
          penaltyType === 'Late Payment Penalty'
            ? 'Payment delayed beyond due date'
            : penaltyType === 'RTGS/NEFT Charges'
              ? 'Bank processing fee'
              : penaltyType === 'Bounce Charges'
                ? 'Insufficient funds / Account issue'
                : 'Interest accrued on delayed payment',
        status: Math.random() > 0.3 ? 'Settled' : 'Pending'
      });
    }
    return transactions.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  };

  const latePaymentCount = Math.round(penaltyChargesCount * 0.45);
  const rtgsNeftCount = Math.round(penaltyChargesCount * 0.3);
  const bounceCount = Math.round(penaltyChargesCount * 0.15);
  const interestCount = Math.round(penaltyChargesCount * 0.1);

  const penaltyData = {
    totalWithCharges: penaltyChargesCount,
    totalChargesAmount: +(penaltyChargesCount * 0.15).toFixed(2),
    breakdown: [
      {
        type: 'Late Payment Penalty',
        count: latePaymentCount,
        amount: +(latePaymentCount * 0.18).toFixed(2),
        avgCharge: 0.18,
        transactions: generatePenaltyTransactions(
          'Late Payment Penalty',
          latePaymentCount,
          0.18
        )
      },
      {
        type: 'RTGS/NEFT Charges',
        count: rtgsNeftCount,
        amount: +(rtgsNeftCount * 0.08).toFixed(2),
        avgCharge: 0.08,
        transactions: generatePenaltyTransactions(
          'RTGS/NEFT Charges',
          rtgsNeftCount,
          0.08
        )
      },
      {
        type: 'Bounce Charges',
        count: bounceCount,
        amount: +(bounceCount * 0.25).toFixed(2),
        avgCharge: 0.25,
        transactions: generatePenaltyTransactions(
          'Bounce Charges',
          bounceCount,
          0.25
        )
      },
      {
        type: 'Interest on Delay',
        count: interestCount,
        amount: +(interestCount * 0.12).toFixed(2),
        avgCharge: 0.12,
        transactions: generatePenaltyTransactions(
          'Interest on Delay',
          interestCount,
          0.12
        )
      }
    ]
  };

  // TAT Summary for display
  const tatSummary = {
    totalTransactions: totalTransfers,
    onTimeTransactions: totalOnTime,
    delayedTransactions: totalDelayed,
    onTimePercentage: +((totalOnTime / totalTransfers) * 100).toFixed(1),
    avgTAT: avgOverallTAT,
    tatByType: transferByType.map((t) => ({
      type: t.type,
      avgTAT: t.avgTAT,
      minTAT: t.minTAT,
      maxTAT: t.maxTAT,
      onTime: t.onTimeCount,
      delayed: t.delayedCount
    }))
  };

  // Monthly transfer volume for charts
  const monthlyTransferVolume = monthlySlice.map((m) => ({
    month: m.month,
    RTGS: m.RTGS,
    NEFT: m.NEFT,
    Internal: m.Internal
  }));

  // Calculate period multiplier for other metrics
  const periodFactor = monthlySlice.length / 12;

  // Top accounts - proportional to period
  const topFromAccounts = [
    {
      account: 'HDFC-1234567890',
      name: 'Hero Motors Main',
      transfers: Math.round(142 * periodFactor),
      value: +(856.4 * periodFactor).toFixed(1)
    },
    {
      account: 'SBI-5678901234',
      name: 'Hero Motors Operations',
      transfers: Math.round(98 * periodFactor),
      value: +(524.2 * periodFactor).toFixed(1)
    },
    {
      account: 'ICICI-9876543210',
      name: 'Hero Cycles Ltd',
      transfers: Math.round(76 * periodFactor),
      value: +(412.8 * periodFactor).toFixed(1)
    },
    {
      account: 'Axis-3456789012',
      name: 'HMC Treasury',
      transfers: Math.round(64 * periodFactor),
      value: +(386.4 * periodFactor).toFixed(1)
    },
    {
      account: 'Kotak-7890123456',
      name: 'Hero FinServ',
      transfers: Math.round(52 * periodFactor),
      value: +(298.6 * periodFactor).toFixed(1)
    }
  ];

  const topToAccounts = [
    {
      account: 'ICICI-9876543210',
      name: 'Hero Cycles Ltd',
      transfers: Math.round(118 * periodFactor),
      value: +(642.8 * periodFactor).toFixed(1)
    },
    {
      account: 'Vendor-ABC-001',
      name: 'Steel Corp India',
      transfers: Math.round(86 * periodFactor),
      value: +(486.2 * periodFactor).toFixed(1)
    },
    {
      account: 'Vendor-XYZ-002',
      name: 'Parts Unlimited',
      transfers: Math.round(72 * periodFactor),
      value: +(324.6 * periodFactor).toFixed(1)
    },
    {
      account: 'SBI-Subsidiary-01',
      name: 'Hero Electric',
      transfers: Math.round(58 * periodFactor),
      value: +(298.4 * periodFactor).toFixed(1)
    },
    {
      account: 'HDFC-Partner-02',
      name: 'Dealer Network',
      transfers: Math.round(48 * periodFactor),
      value: +(256.2 * periodFactor).toFixed(1)
    }
  ];

  // Peak hours - distributed across period
  const hourlyBase = [
    { hour: '9 AM', pct: 0.08 },
    { hour: '10 AM', pct: 0.12 },
    { hour: '11 AM', pct: 0.15 },
    { hour: '12 PM', pct: 0.1 },
    { hour: '1 PM', pct: 0.06 },
    { hour: '2 PM', pct: 0.13 },
    { hour: '3 PM', pct: 0.17 },
    { hour: '4 PM', pct: 0.14 },
    { hour: '5 PM', pct: 0.05 }
  ];
  const peakTransferHours = hourlyBase.map((h) => ({
    hour: h.hour,
    count: Math.round(totalTransfers * h.pct),
    value: +(totalValue * h.pct).toFixed(1)
  }));

  // Peak days - distributed across period
  const dayBase = [
    { day: 'Monday', pct: 0.21 },
    { day: 'Tuesday', pct: 0.18 },
    { day: 'Wednesday', pct: 0.17 },
    { day: 'Thursday', pct: 0.19 },
    { day: 'Friday', pct: 0.25 }
  ];
  const peakTransferDays = dayBase.map((d) => ({
    day: d.day,
    count: Math.round(totalTransfers * d.pct),
    value: +(totalValue * d.pct).toFixed(1)
  }));

  // Debt data - varies by period (represents outstanding debt at end of period)
  const debtMultiplier =
    period === 'CM'
      ? 1.02
      : period === '3M'
        ? 0.98
        : period === '6M'
          ? 0.95
          : period === 'YTD'
            ? 0.92
            : 1;
  const rateVariance =
    period === 'CM'
      ? 0
      : period === '3M'
        ? -0.1
        : period === '6M'
          ? -0.15
          : period === 'YTD'
            ? -0.2
            : 0;
  const debtMix = [
    {
      type: 'Term Loan',
      amount: +(856.4 * debtMultiplier).toFixed(1),
      percentage: 42,
      rate: +(9.25 + rateVariance).toFixed(2),
      tenure: '5 Years',
      color: '#3b82f6'
    },
    {
      type: 'Working Capital',
      amount: +(624.8 * debtMultiplier).toFixed(1),
      percentage: 31,
      rate: +(8.75 + rateVariance).toFixed(2),
      tenure: '1 Year',
      color: '#22c55e'
    },
    {
      type: 'Overdraft',
      amount: +(348.2 * debtMultiplier).toFixed(1),
      percentage: 17,
      rate: +(10.5 + rateVariance).toFixed(2),
      tenure: 'Revolving',
      color: '#f59e0b'
    },
    {
      type: 'ECB',
      amount: +(198.6 * debtMultiplier).toFixed(1),
      percentage: 10,
      rate: +(6.8 + rateVariance).toFixed(2),
      tenure: '3 Years',
      color: '#8b5cf6'
    }
  ];
  const totalDebt = +debtMix.reduce((sum, d) => sum + d.amount, 0).toFixed(1);

  // Investment data - varies by period
  const invMultiplier =
    period === 'CM'
      ? 1.05
      : period === '3M'
        ? 1.02
        : period === '6M'
          ? 0.98
          : period === 'YTD'
            ? 0.95
            : 1;
  const yieldVariance =
    period === 'CM'
      ? 0.15
      : period === '3M'
        ? 0.1
        : period === '6M'
          ? 0.05
          : period === 'YTD'
            ? 0
            : 0;
  const investmentYields = [
    {
      counterparty: 'SBI',
      type: 'FD',
      amount: +(245.6 * invMultiplier).toFixed(1),
      yield: +(7.5 + yieldVariance).toFixed(2),
      tenure: '12 Months',
      maturityDate: '2026-06-15'
    },
    {
      counterparty: 'HDFC Bank',
      type: 'FD',
      amount: +(186.4 * invMultiplier).toFixed(1),
      yield: +(7.25 + yieldVariance).toFixed(2),
      tenure: '6 Months',
      maturityDate: '2026-03-20'
    },
    {
      counterparty: 'ICICI Prudential',
      type: 'MF',
      amount: +(124.8 * invMultiplier).toFixed(1),
      yield: +(8.2 + yieldVariance).toFixed(2),
      tenure: '6 Months',
      maturityDate: '2026-04-10'
    },
    {
      counterparty: 'Reliance Industries',
      type: 'Bonds',
      amount: +(98.6 * invMultiplier).toFixed(1),
      yield: +(9.1 + yieldVariance).toFixed(2),
      tenure: '3 Years',
      maturityDate: '2028-12-01'
    },
    {
      counterparty: 'Axis Bank',
      type: 'FD',
      amount: +(156.2 * invMultiplier).toFixed(1),
      yield: +(7.0 + yieldVariance).toFixed(2),
      tenure: '9 Months',
      maturityDate: '2026-08-25'
    }
  ];
  const totalInvestments = +investmentYields
    .reduce((sum, i) => sum + i.amount, 0)
    .toFixed(1);
  const avgYield = +(
    investmentYields.reduce((sum, i) => sum + i.yield * i.amount, 0) /
    totalInvestments
  ).toFixed(2);

  // Maturity ladder - separate debt and investment maturities
  const allDebtMaturities = [
    {
      instrument: 'HDFC Term Loan',
      amount: 156.8,
      maturityDate: '2026-01-15',
      daysToMaturity: 14,
      rate: 9.25
    },
    {
      instrument: 'ICICI WC Facility',
      amount: 124.6,
      maturityDate: '2026-02-10',
      daysToMaturity: 40,
      rate: 8.75
    },
    {
      instrument: 'Kotak OD Limit',
      amount: 98.4,
      maturityDate: '2026-03-15',
      daysToMaturity: 73,
      rate: 10.5
    },
    {
      instrument: 'SBI Term Loan',
      amount: 186.2,
      maturityDate: '2026-04-20',
      daysToMaturity: 109,
      rate: 9.0
    },
    {
      instrument: 'Axis Bank WC',
      amount: 75.8,
      maturityDate: '2026-06-30',
      daysToMaturity: 180,
      rate: 8.5
    }
  ];
  const allInvestmentMaturities = [
    {
      instrument: 'SBI FD',
      amount: 86.4,
      maturityDate: '2026-01-28',
      daysToMaturity: 27,
      yield: 7.5
    },
    {
      instrument: 'Axis Bank FD',
      amount: 45.2,
      maturityDate: '2026-02-25',
      daysToMaturity: 55,
      yield: 7.0
    },
    {
      instrument: 'HDFC FD',
      amount: 62.5,
      maturityDate: '2026-03-20',
      daysToMaturity: 78,
      yield: 7.25
    },
    {
      instrument: 'ICICI MF',
      amount: 124.8,
      maturityDate: '2026-04-10',
      daysToMaturity: 99,
      yield: 8.2
    },
    {
      instrument: 'Kotak FD',
      amount: 38.6,
      maturityDate: '2026-05-15',
      daysToMaturity: 134,
      yield: 7.1
    }
  ];
  const maturityDaysLimit =
    period === 'CM' ? 30 : period === '3M' ? 90 : period === '6M' ? 180 : 365;
  const debtMaturities = allDebtMaturities.filter(
    (m) => m.daysToMaturity <= maturityDaysLimit
  );
  const investmentMaturities = allInvestmentMaturities.filter(
    (m) => m.daysToMaturity <= maturityDaysLimit
  );
  const investmentMaturityNext30 = allInvestmentMaturities
    .filter((m) => m.daysToMaturity <= 30)
    .reduce((sum, m) => sum + m.amount, 0);
  const debtMaturityNext30 = allDebtMaturities
    .filter((m) => m.daysToMaturity <= 30)
    .reduce((sum, m) => sum + m.amount, 0);

  // Governance data - varies by period
  const totalApprovals = Math.round(308 * periodFactor); // Base: 308 approvals/year
  const totalRejections = Math.round(75 * periodFactor); // Base: 75 rejections/year
  const totalBreaches =
    period === 'CM' ? 2 : period === '3M' ? 6 : period === '6M' ? 12 : 23;

  // DOA Compliance calculated from breaches
  const complianceRate = +(
    (1 - totalBreaches / (totalApprovals + totalRejections)) *
    100
  ).toFixed(1);

  const doaComplianceByAuthority = [
    {
      authority: 'Finance Manager',
      bankTransfers: +(complianceRate + 0.7).toFixed(1),
      loans: +(complianceRate - 0.7).toFixed(1),
      investments: +(complianceRate + 0.3).toFixed(1),
      overall: complianceRate
    },
    {
      authority: 'Treasury Head',
      bankTransfers: +(complianceRate - 0.7).toFixed(1),
      loans: +(complianceRate - 2.3).toFixed(1),
      investments: +(complianceRate - 1.1).toFixed(1),
      overall: +(complianceRate - 1.7).toFixed(1)
    },
    {
      authority: 'CFO',
      bankTransfers: +(complianceRate + 1.6).toFixed(1),
      loans: +(complianceRate + 0.6).toFixed(1),
      investments: +(complianceRate + 1.2).toFixed(1),
      overall: +(complianceRate + 1.2).toFixed(1)
    },
    {
      authority: 'Group CFO',
      bankTransfers: 99.5,
      loans: 98.6,
      investments: 99.2,
      overall: 99.1
    },
    {
      authority: 'Board',
      bankTransfers: 100,
      loans: 100,
      investments: 100,
      overall: 100
    }
  ];

  // Breach trends by company - varies by period
  const breachTrendsByCompany =
    period === 'CM'
      ? [
          { company: 'Hero Motors', Q1: 0, Q2: 0, Q3: 0, Q4: 1, total: 1 },
          { company: 'Hero Cycles', Q1: 0, Q2: 0, Q3: 0, Q4: 0, total: 0 },
          { company: 'Hero Electric', Q1: 0, Q2: 0, Q3: 0, Q4: 0, total: 0 },
          { company: 'Hero FinServ', Q1: 0, Q2: 0, Q3: 0, Q4: 1, total: 1 }
        ]
      : period === '3M'
        ? [
            { company: 'Hero Motors', Q1: 0, Q2: 0, Q3: 1, Q4: 1, total: 2 },
            { company: 'Hero Cycles', Q1: 0, Q2: 0, Q3: 1, Q4: 1, total: 2 },
            { company: 'Hero Electric', Q1: 0, Q2: 0, Q3: 0, Q4: 1, total: 1 },
            { company: 'Hero FinServ', Q1: 0, Q2: 0, Q3: 0, Q4: 1, total: 1 }
          ]
        : period === '6M'
          ? [
              { company: 'Hero Motors', Q1: 0, Q2: 0, Q3: 4, Q4: 1, total: 5 },
              { company: 'Hero Cycles', Q1: 0, Q2: 0, Q3: 2, Q4: 2, total: 4 },
              {
                company: 'Hero Electric',
                Q1: 0,
                Q2: 0,
                Q3: 1,
                Q4: 1,
                total: 2
              },
              { company: 'Hero FinServ', Q1: 0, Q2: 0, Q3: 0, Q4: 1, total: 1 }
            ]
          : [
              { company: 'Hero Motors', Q1: 3, Q2: 2, Q3: 4, Q4: 1, total: 10 },
              { company: 'Hero Cycles', Q1: 2, Q2: 1, Q3: 2, Q4: 2, total: 7 },
              {
                company: 'Hero Electric',
                Q1: 1,
                Q2: 2,
                Q3: 1,
                Q4: 0,
                total: 4
              },
              { company: 'Hero FinServ', Q1: 0, Q2: 1, Q3: 0, Q4: 1, total: 2 }
            ];

  // Board pending items - based on period
  const allBoardPending = [
    {
      id: 'TXN-2025-2012',
      type: 'ECB Facility',
      value: 248.6,
      requestDate: '2025-12-18',
      pendingDays: 13,
      requester: 'CFO Office'
    },
    {
      id: 'TXN-2025-1967',
      type: 'Signatory Change',
      value: 0,
      requestDate: '2025-12-12',
      pendingDays: 19,
      requester: 'HR Department'
    },
    {
      id: 'TXN-2025-1823',
      type: 'Term Loan',
      value: 156.8,
      requestDate: '2025-12-13',
      pendingDays: 18,
      requester: 'Priya Sharma'
    }
  ];
  const boardApprovalPending =
    period === 'CM'
      ? allBoardPending.slice(0, 1)
      : period === '3M'
        ? allBoardPending.slice(0, 2)
        : allBoardPending;

  // Approval velocity - calculated from totals
  const bankTransferApprovals = Math.round(186 * periodFactor);
  const loanApprovals = Math.round(24 * periodFactor);
  const investmentApprovals = Math.round(48 * periodFactor);
  const signatoryApprovals = Math.round(18 * periodFactor);
  const borrowingApprovals = Math.round(32 * periodFactor);

  const approvalVelocityByStatus = [
    {
      status: 'Bank Transfers',
      avgDays: period === 'CM' ? 1.0 : 1.2,
      minDays: 0.5,
      maxDays: period === 'CM' ? 3 : 4,
      totalApproved: bankTransferApprovals
    },
    {
      status: 'Loan Agreements',
      avgDays: period === 'CM' ? 7.2 : 8.4,
      minDays: 3,
      maxDays: period === 'CM' ? 18 : 21,
      totalApproved: loanApprovals
    },
    {
      status: 'Investment Creations',
      avgDays: period === 'CM' ? 3.8 : 4.2,
      minDays: 1,
      maxDays: period === 'CM' ? 10 : 12,
      totalApproved: investmentApprovals
    },
    {
      status: 'Signatory Changes',
      avgDays: period === 'CM' ? 10.5 : 12.6,
      minDays: 5,
      maxDays: period === 'CM' ? 20 : 25,
      totalApproved: signatoryApprovals
    },
    {
      status: 'Loan Borrowing',
      avgDays: period === 'CM' ? 5.5 : 6.8,
      minDays: 2,
      maxDays: period === 'CM' ? 15 : 18,
      totalApproved: borrowingApprovals
    }
  ];

  // Rejection details - by authority and transaction type
  const rejectionsByAuthority = [
    {
      authority: 'CFO',
      bankTransfers: Math.round(totalRejections * 0.15),
      loans: Math.round(totalRejections * 0.12),
      investments: Math.round(totalRejections * 0.08),
      total: Math.round(totalRejections * 0.35)
    },
    {
      authority: 'Treasury Head',
      bankTransfers: Math.round(totalRejections * 0.1),
      loans: Math.round(totalRejections * 0.05),
      investments: Math.round(totalRejections * 0.1),
      total: Math.round(totalRejections * 0.25)
    },
    {
      authority: 'Department Head',
      bankTransfers: Math.round(totalRejections * 0.08),
      loans: Math.round(totalRejections * 0.03),
      investments: Math.round(totalRejections * 0.04),
      total: Math.round(totalRejections * 0.15)
    },
    {
      authority: 'Board',
      bankTransfers: 0,
      loans: Math.round(totalRejections * 0.12),
      investments: Math.round(totalRejections * 0.03),
      total: Math.round(totalRejections * 0.15)
    },
    {
      authority: 'Legal',
      bankTransfers: Math.round(totalRejections * 0.02),
      loans: Math.round(totalRejections * 0.06),
      investments: Math.round(totalRejections * 0.02),
      total: Math.round(totalRejections * 0.1)
    }
  ];

  const rejectionReasons = [
    {
      reason: 'Incomplete Documentation',
      count: Math.round(totalRejections * 0.32),
      affectedTypes: 'Bank Transfers, Loans'
    },
    {
      reason: 'DOA Limit Exceeded',
      count: Math.round(totalRejections * 0.24),
      affectedTypes: 'Loans, Investments'
    },
    {
      reason: 'Rate Not Competitive',
      count: Math.round(totalRejections * 0.16),
      affectedTypes: 'Loans, Investments'
    },
    {
      reason: 'Budget Constraints',
      count: Math.round(totalRejections * 0.13),
      affectedTypes: 'All Types'
    },
    {
      reason: 'Policy Non-Compliance',
      count: Math.round(totalRejections * 0.11),
      affectedTypes: 'Bank Transfers'
    },
    {
      reason: 'Other',
      count: Math.round(totalRejections * 0.04),
      affectedTypes: 'Various'
    }
  ];

  // Signatory changes - based on period
  const allSignatoryChanges = [
    {
      bank: 'Axis Bank',
      account: '3456789012',
      oldSignatory: 'Amit Verma',
      newSignatory: 'Priya Gupta',
      changeDate: '2025-12-22',
      status: 'Completed'
    },
    {
      bank: 'SBI',
      account: '9876543210',
      oldSignatory: 'Suresh Iyer',
      newSignatory: 'Pending Assignment',
      changeDate: '2025-12-20',
      status: 'In Progress'
    },
    {
      bank: 'ICICI Bank',
      account: '5678901234',
      oldSignatory: 'Meera Patel',
      newSignatory: 'Vikram Singh',
      changeDate: '2025-12-18',
      status: 'Pending Approval'
    },
    {
      bank: 'HDFC Bank',
      account: '1234567890',
      oldSignatory: 'Rakesh Kumar',
      newSignatory: 'Anita Sharma',
      changeDate: '2025-10-15',
      status: 'Completed'
    }
  ];
  const signatoryChanges =
    period === 'CM'
      ? allSignatoryChanges.slice(0, 1)
      : period === '3M'
        ? allSignatoryChanges.slice(0, 3)
        : allSignatoryChanges;

  // Facility utilization - current snapshot with slight variance
  const utilizationBase = period === 'CM' ? 1.05 : period === '3M' ? 1.02 : 1;
  const limitUtilization = [
    {
      facility: 'HDFC WC Limit',
      sanctioned: 500,
      utilized: Math.round(385 * utilizationBase),
      available: 500 - Math.round(385 * utilizationBase),
      utilization: Math.min(100, Math.round(77 * utilizationBase)),
      trend: 'up' as const
    },
    {
      facility: 'SBI OD Facility',
      sanctioned: 250,
      utilized: Math.round(168 * utilizationBase),
      available: 250 - Math.round(168 * utilizationBase),
      utilization: Math.round(67 * utilizationBase),
      trend: 'stable' as const
    },
    {
      facility: 'ICICI Term Loan',
      sanctioned: 300,
      utilized: Math.round(245 * utilizationBase),
      available: 300 - Math.round(245 * utilizationBase),
      utilization: Math.min(100, Math.round(82 * utilizationBase)),
      trend: 'up' as const
    },
    {
      facility: 'Axis CC Limit',
      sanctioned: 150,
      utilized: Math.round(42 * utilizationBase),
      available: 150 - Math.round(42 * utilizationBase),
      utilization: Math.round(28 * utilizationBase),
      trend: 'down' as const
    },
    {
      facility: 'Kotak BG Limit',
      sanctioned: 200,
      utilized: Math.round(156 * utilizationBase),
      available: 200 - Math.round(156 * utilizationBase),
      utilization: Math.round(78 * utilizationBase),
      trend: 'stable' as const
    }
  ];

  // Assets charged - current snapshot
  const assetsCharged = [
    {
      asset: 'Plant & Machinery - Unit 1',
      bank: 'HDFC Bank',
      facility: 'Term Loan',
      chargeValue: 186.4,
      loanOutstanding: 124.6
    },
    {
      asset: 'Land - Dharuhera',
      bank: 'SBI',
      facility: 'WC Limit',
      chargeValue: 245.8,
      loanOutstanding: 168.4
    },
    {
      asset: 'Inventory - Raw Material',
      bank: 'ICICI Bank',
      facility: 'CC Limit',
      chargeValue: 86.2,
      loanOutstanding: 52.8
    },
    {
      asset: 'Receivables - Q4',
      bank: 'Axis Bank',
      facility: 'Factoring',
      chargeValue: 124.6,
      loanOutstanding: 98.2
    }
  ];

  // Calculate average approval days from velocity data
  const totalApprovalDays = approvalVelocityByStatus.reduce(
    (sum, a) => sum + a.avgDays * a.totalApproved,
    0
  );
  const totalApprovalCount = approvalVelocityByStatus.reduce(
    (sum, a) => sum + a.totalApproved,
    0
  );
  const avgApprovalDays = +(totalApprovalDays / totalApprovalCount).toFixed(1);

  // KPI Summary - all values derived from actual data
  const kpiSummary = {
    cashEfficiency: {
      totalTransfers,
      totalValue,
      avgExecutionTime: 1.2 // weighted average of transfer types
    },
    debtHealth: {
      totalDebt: +totalDebt.toFixed(1),
      weightedAvgRate: 8.92,
      debtEquityRatio: 0.68
    },
    investmentHealth: {
      totalInvestments,
      avgYield,
      maturityNext30: +investmentMaturityNext30.toFixed(1)
    },
    governance: {
      doaCompliance: complianceRate,
      avgApprovalDays,
      pendingApprovals: boardApprovalPending.length
    }
  };

  return {
    transferByType,
    monthlyTransferVolume,
    topFromAccounts,
    topToAccounts,
    peakTransferHours,
    peakTransferDays,
    debtMix,
    investmentYields,
    liquidityImpact: liquiditySlice,
    debtMaturities,
    investmentMaturities,
    doaComplianceByAuthority,
    breachTrendsByCompany,
    boardApprovalPending,
    approvalVelocityByStatus,
    rejectionsByAuthority,
    rejectionReasons,
    signatoryChanges,
    limitUtilization,
    assetsCharged,
    kpiSummary,
    totalTransfers,
    tatSummary,
    penaltyData
  };
};

const COLORS = [
  '#3b82f6',
  '#22c55e',
  '#f59e0b',
  '#8b5cf6',
  '#ef4444',
  '#06b6d4'
];

export default function AnalyticsPage() {
  const [period, setPeriod] = React.useState<Period>('12M');
  const [activeTab, setActiveTab] = React.useState('cash-efficiency');
  const [selectedPenalty, setSelectedPenalty] = React.useState<{
    type: string;
    count: number;
    amount: number;
    avgCharge: number;
    transactions: Array<{
      id: string;
      date: string;
      transferType: string;
      fromAccount: string;
      toAccount: string;
      amount: number;
      chargeAmount: number;
      reason: string;
      status: string;
    }>;
  } | null>(null);

  // Get all data based on selected period
  const data = React.useMemo(() => getDataForPeriod(period), [period]);

  const {
    transferByType,
    monthlyTransferVolume,
    topFromAccounts,
    topToAccounts,
    peakTransferHours,
    peakTransferDays,
    debtMix,
    investmentYields,
    liquidityImpact,
    debtMaturities,
    investmentMaturities,
    doaComplianceByAuthority,
    breachTrendsByCompany,
    boardApprovalPending,
    approvalVelocityByStatus,
    rejectionsByAuthority,
    rejectionReasons,
    signatoryChanges,
    limitUtilization,
    assetsCharged,
    kpiSummary,
    totalTransfers,
    tatSummary,
    penaltyData
  } = data;

  const handleExport = (format: string) => {
    const exportData = {
      exportDate: new Date().toISOString(),
      period,
      kpiSummary,
      transferByType,
      monthlyTransferVolume,
      debtMix,
      investmentYields,
      debtMaturities,
      investmentMaturities,
      doaComplianceByAuthority,
      limitUtilization,
      assetsCharged
    };

    if (format === 'json') {
      const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: 'application/json'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `treasury-analytics-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } else if (format === 'excel') {
      let content = 'TREASURY ANALYTICS REPORT\n';
      content += `Export Date,${new Date().toLocaleDateString()}\nPeriod,${period}\n\n`;
      content +=
        'TRANSFER BY TYPE\nType,Count,Value (CR),Avg Value,Avg Time (hrs)\n';
      transferByType.forEach((t) => {
        content += `${t.type},${t.count},${t.value},${t.avgValue},${t.avgTAT}\n`;
      });
      content += '\nDEBT PORTFOLIO\nType,Amount (CR),Rate (%),Tenure\n';
      debtMix.forEach((d) => {
        content += `${d.type},${d.amount},${d.rate},${d.tenure}\n`;
      });
      content +=
        '\nINVESTMENTS\nCounterparty,Type,Amount (CR),Yield (%),Maturity\n';
      investmentYields.forEach((i) => {
        content += `${i.counterparty},${i.type},${i.amount},${i.yield},${i.maturityDate}\n`;
      });
      content +=
        '\nLIMIT UTILIZATION\nFacility,Sanctioned,Utilized,Available,Utilization %\n';
      limitUtilization.forEach((l) => {
        content += `${l.facility},${l.sanctioned},${l.utilized},${l.available},${l.utilization}%\n`;
      });

      const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `treasury-analytics-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <PageContainer>
      <TooltipProvider>
        <div className='flex flex-1 flex-col space-y-6'>
          {/* Header */}
          <div className='flex items-center justify-between'>
            <div>
              <h2 className='text-2xl font-bold tracking-tight'>
                Treasury Analytics
              </h2>
              <p className='text-muted-foreground'>
                Cash efficiency, portfolio health, governance & risk analytics
              </p>
            </div>
            <div className='flex items-center gap-3'>
              <Select
                value={period}
                onValueChange={(value) => setPeriod(value as Period)}
              >
                <SelectTrigger className='w-36'>
                  <Calendar className='mr-2 h-4 w-4' />
                  <SelectValue placeholder='Period' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='CM'>Current Month</SelectItem>
                  <SelectItem value='3M'>Last 3 Months</SelectItem>
                  <SelectItem value='6M'>Last 6 Months</SelectItem>
                  <SelectItem value='12M'>Last 12 Months</SelectItem>
                  <SelectItem value='YTD'>Year to Date</SelectItem>
                </SelectContent>
              </Select>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className='gap-2'>
                    <Download className='h-4 w-4' />
                    Export
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  <DropdownMenuLabel>Export Format</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => handleExport('excel')}
                    className='gap-2'
                  >
                    <FileSpreadsheet className='h-4 w-4' />
                    Export to Excel
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleExport('json')}
                    className='gap-2'
                  >
                    <FileText className='h-4 w-4' />
                    Export to JSON
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* KPI Cards */}
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
            <Card className='border-l-4 border-l-blue-500'>
              <CardContent className='p-4'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-muted-foreground text-xs'>
                      Cash Efficiency
                    </p>
                    <p className='text-2xl font-bold'>
                      {kpiSummary.cashEfficiency.totalTransfers}
                    </p>
                    <p className='text-muted-foreground text-sm'>
                      ₹{kpiSummary.cashEfficiency.totalValue} CR
                    </p>
                  </div>
                  <UITooltip>
                    <TooltipTrigger asChild>
                      <div className='cursor-help'>
                        <Banknote className='h-8 w-8 text-blue-500 transition-colors hover:text-blue-600' />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side='left' className='max-w-[200px]'>
                      <p className='text-xs'>
                        Total bank transfers processed including RTGS, NEFT, and
                        internal transfers with average execution time
                      </p>
                    </TooltipContent>
                  </UITooltip>
                </div>
                <div className='mt-2 flex items-center gap-1'>
                  <UITooltip>
                    <TooltipTrigger asChild>
                      <div className='cursor-help'>
                        <Timer className='h-3 w-3 text-green-500' />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className='text-xs'>
                        Average time to complete a transfer
                      </p>
                    </TooltipContent>
                  </UITooltip>
                  <span className='text-xs text-green-600'>
                    {kpiSummary.cashEfficiency.avgExecutionTime}h avg
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className='border-l-4 border-l-green-500'>
              <CardContent className='p-4'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-muted-foreground text-xs'>
                      Debt Portfolio
                    </p>
                    <p className='text-2xl font-bold'>
                      ₹{kpiSummary.debtHealth.totalDebt} CR
                    </p>
                    <p className='text-muted-foreground text-sm'>
                      @ {kpiSummary.debtHealth.weightedAvgRate}% avg
                    </p>
                  </div>
                  <UITooltip>
                    <TooltipTrigger asChild>
                      <div className='cursor-help'>
                        <Landmark className='h-8 w-8 text-green-500 transition-colors hover:text-green-600' />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side='left' className='max-w-[200px]'>
                      <p className='text-xs'>
                        Total outstanding debt including Term Loans, Working
                        Capital, Overdraft, and ECB facilities
                      </p>
                    </TooltipContent>
                  </UITooltip>
                </div>
              </CardContent>
            </Card>

            <Card className='border-l-4 border-l-amber-500'>
              <CardContent className='p-4'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-muted-foreground text-xs'>Investments</p>
                    <p className='text-2xl font-bold'>
                      ₹{kpiSummary.investmentHealth.totalInvestments} CR
                    </p>
                    <p className='text-muted-foreground text-sm'>
                      @ {kpiSummary.investmentHealth.avgYield}% yield
                    </p>
                  </div>
                  <UITooltip>
                    <TooltipTrigger asChild>
                      <div className='cursor-help'>
                        <PiggyBank className='h-8 w-8 text-amber-500 transition-colors hover:text-amber-600' />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side='left' className='max-w-[200px]'>
                      <p className='text-xs'>
                        Total investments in FDs, Mutual Funds, and Bonds with
                        weighted average yield
                      </p>
                    </TooltipContent>
                  </UITooltip>
                </div>
                <div className='mt-2 flex items-center gap-1'>
                  <UITooltip>
                    <TooltipTrigger asChild>
                      <div className='cursor-help'>
                        <CalendarClock className='h-3 w-3 text-amber-500 transition-colors hover:text-amber-600' />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className='text-xs'>
                        Investments maturing in next 30 days
                      </p>
                    </TooltipContent>
                  </UITooltip>
                  <span className='text-xs text-amber-600'>
                    ₹{kpiSummary.investmentHealth.maturityNext30} CR due 30d
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className='border-l-4 border-l-purple-500'>
              <CardContent className='p-4'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-muted-foreground text-xs'>Governance</p>
                    <p className='text-2xl font-bold'>
                      {kpiSummary.governance.doaCompliance}%
                    </p>
                    <p className='text-muted-foreground text-sm'>
                      DOA Compliance
                    </p>
                  </div>
                  <UITooltip>
                    <TooltipTrigger asChild>
                      <div className='cursor-help'>
                        <Shield className='h-8 w-8 text-purple-500 transition-colors hover:text-purple-600' />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side='left' className='max-w-[200px]'>
                      <p className='text-xs'>
                        Delegation of Authority compliance rate - measures
                        adherence to approval limits and workflows
                      </p>
                    </TooltipContent>
                  </UITooltip>
                </div>
                <div className='mt-2 flex items-center gap-1'>
                  <UITooltip>
                    <TooltipTrigger asChild>
                      <div className='cursor-help'>
                        <Clock className='text-muted-foreground hover:text-foreground h-3 w-3 transition-colors' />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className='text-xs'>
                        Average days to complete approval process
                      </p>
                    </TooltipContent>
                  </UITooltip>
                  <span className='text-muted-foreground text-xs'>
                    {kpiSummary.governance.avgApprovalDays}d avg approval
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className='space-y-4'
          >
            <TabsList className='grid w-full grid-cols-4'>
              <TabsTrigger value='cash-efficiency' className='gap-2'>
                <Banknote className='h-4 w-4' />
                Cash Efficiency
              </TabsTrigger>
              <TabsTrigger value='debt-investment' className='gap-2'>
                <Wallet className='h-4 w-4' />
                Debt & Investment
              </TabsTrigger>
              <TabsTrigger value='governance' className='gap-2'>
                <Shield className='h-4 w-4' />
                Governance
              </TabsTrigger>
              <TabsTrigger value='risk-changes' className='gap-2'>
                <AlertTriangle className='h-4 w-4' />
                Risk & Changes
              </TabsTrigger>
            </TabsList>

            {/* CASH EFFICIENCY */}
            <TabsContent value='cash-efficiency' className='space-y-4'>
              {/* TAT Summary Cards */}
              <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
                <Card className='border-l-4 border-l-blue-500'>
                  <CardContent className='p-4'>
                    <div className='flex items-center justify-between'>
                      <div>
                        <p className='text-muted-foreground text-xs'>
                          Total Transactions
                        </p>
                        <p className='text-2xl font-bold'>
                          {tatSummary.totalTransactions}
                        </p>
                        <p className='text-muted-foreground text-sm'>
                          Avg TAT: {tatSummary.avgTAT}h
                        </p>
                      </div>
                      <Hourglass className='h-8 w-8 text-blue-500/50' />
                    </div>
                  </CardContent>
                </Card>

                <Card className='border-l-4 border-l-green-500'>
                  <CardContent className='p-4'>
                    <div className='flex items-center justify-between'>
                      <div>
                        <p className='text-muted-foreground text-xs'>
                          On-Time Transactions
                        </p>
                        <p className='text-2xl font-bold text-green-600'>
                          {tatSummary.onTimeTransactions}
                        </p>
                        <p className='text-muted-foreground text-sm'>
                          {tatSummary.onTimePercentage}% of total
                        </p>
                      </div>
                      <CheckCircle2 className='h-8 w-8 text-green-500/50' />
                    </div>
                  </CardContent>
                </Card>

                <Card className='border-l-4 border-l-amber-500'>
                  <CardContent className='p-4'>
                    <div className='flex items-center justify-between'>
                      <div>
                        <p className='text-muted-foreground text-xs'>
                          Delayed Transactions
                        </p>
                        <p className='text-2xl font-bold text-amber-600'>
                          {tatSummary.delayedTransactions}
                        </p>
                        <p className='text-muted-foreground text-sm'>
                          {(100 - tatSummary.onTimePercentage).toFixed(1)}% of
                          total
                        </p>
                      </div>
                      <XCircle className='h-8 w-8 text-amber-500/50' />
                    </div>
                  </CardContent>
                </Card>

                <Card className='border-l-4 border-l-red-500'>
                  <CardContent className='p-4'>
                    <div className='flex items-center justify-between'>
                      <div>
                        <p className='text-muted-foreground text-xs'>
                          Penalty/Charges Incurred
                        </p>
                        <p className='text-2xl font-bold text-red-600'>
                          {penaltyData.totalWithCharges}
                        </p>
                        <p className='text-muted-foreground text-sm'>
                          ₹{penaltyData.totalChargesAmount} Lakhs
                        </p>
                      </div>
                      <BadgeAlert className='h-8 w-8 text-red-500/50' />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* TAT by Transfer Type & Penalty Breakdown */}
              <div className='grid gap-4 lg:grid-cols-2'>
                <Card>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-base'>
                      <Timer className='h-4 w-4' />
                      TAT by Transfer Type
                    </CardTitle>
                    <CardDescription>
                      Turnaround time analysis by payment method
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Type</TableHead>
                          <TableHead className='text-right'>Avg TAT</TableHead>
                          <TableHead className='text-right'>Min/Max</TableHead>
                          <TableHead className='text-right'>On-Time</TableHead>
                          <TableHead className='text-right'>Delayed</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {tatSummary.tatByType.map((item) => (
                          <TableRow key={item.type}>
                            <TableCell>
                              <div className='flex items-center gap-2'>
                                <div
                                  className='h-2 w-2 rounded-full'
                                  style={{
                                    backgroundColor:
                                      item.type === 'RTGS'
                                        ? '#3b82f6'
                                        : item.type === 'NEFT'
                                          ? '#22c55e'
                                          : '#f59e0b'
                                  }}
                                />
                                <span className='font-medium'>{item.type}</span>
                              </div>
                            </TableCell>
                            <TableCell className='text-right font-medium'>
                              {item.avgTAT}h
                            </TableCell>
                            <TableCell className='text-muted-foreground text-right text-xs'>
                              {item.minTAT}h / {item.maxTAT}h
                            </TableCell>
                            <TableCell className='text-right'>
                              <span className='font-medium text-green-600'>
                                {item.onTime}
                              </span>
                            </TableCell>
                            <TableCell className='text-right'>
                              <span className='text-amber-600'>
                                {item.delayed}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-base'>
                      <Receipt className='h-4 w-4' />
                      Penalties & Charges Breakdown
                    </CardTitle>
                    <CardDescription>
                      Click on any item to view transaction details
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-4'>
                      {penaltyData.breakdown.map((item) => (
                        <div
                          key={item.type}
                          className='hover:bg-muted/50 hover:border-primary/50 flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-colors'
                          onClick={() => setSelectedPenalty(item)}
                        >
                          <div className='flex-1'>
                            <p className='text-sm font-medium'>{item.type}</p>
                            <p className='text-muted-foreground text-xs'>
                              {item.count} transactions
                            </p>
                          </div>
                          <div className='flex items-center gap-2 text-right'>
                            <div>
                              <p className='font-bold text-red-600'>
                                ₹{item.amount} L
                              </p>
                              <p className='text-muted-foreground text-xs'>
                                Avg: ₹{item.avgCharge} L/txn
                              </p>
                            </div>
                            <ArrowUpRight className='text-muted-foreground h-4 w-4' />
                          </div>
                        </div>
                      ))}
                      <div className='flex items-center justify-between rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-800 dark:bg-red-950/30'>
                        <div className='flex items-center gap-2'>
                          <CircleDollarSign className='h-4 w-4 text-red-600' />
                          <span className='font-semibold'>Total Charges</span>
                        </div>
                        <span className='font-bold text-red-600'>
                          ₹{penaltyData.totalChargesAmount} Lakhs
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Penalty Details Dialog */}
              <Dialog
                open={selectedPenalty !== null}
                onOpenChange={(open) => !open && setSelectedPenalty(null)}
              >
                <DialogContent className='max-h-[80vh] max-w-4xl'>
                  <DialogHeader>
                    <DialogTitle className='flex items-center gap-2'>
                      <Receipt className='h-5 w-5 text-red-600' />
                      {selectedPenalty?.type} - Transaction Details
                    </DialogTitle>
                    <DialogDescription>
                      {selectedPenalty?.count} transactions | Total: ₹
                      {selectedPenalty?.amount} Lakhs
                    </DialogDescription>
                  </DialogHeader>
                  <ScrollArea className='h-[60vh]'>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Transaction ID</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>From Account</TableHead>
                          <TableHead>To Account</TableHead>
                          <TableHead className='text-right'>
                            Amount (CR)
                          </TableHead>
                          <TableHead className='text-right'>
                            Charge (L)
                          </TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedPenalty?.transactions.map((txn) => (
                          <TableRow key={txn.id}>
                            <TableCell className='font-mono text-sm font-medium'>
                              {txn.id}
                            </TableCell>
                            <TableCell className='text-muted-foreground'>
                              {txn.date}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant='outline'
                                className={
                                  txn.transferType === 'RTGS'
                                    ? 'border-blue-500 text-blue-600'
                                    : txn.transferType === 'NEFT'
                                      ? 'border-green-500 text-green-600'
                                      : 'border-amber-500 text-amber-600'
                                }
                              >
                                {txn.transferType}
                              </Badge>
                            </TableCell>
                            <TableCell
                              className='max-w-[120px] truncate text-xs'
                              title={txn.fromAccount}
                            >
                              {txn.fromAccount}
                            </TableCell>
                            <TableCell className='text-xs'>
                              {txn.toAccount}
                            </TableCell>
                            <TableCell className='text-right font-medium'>
                              ₹{txn.amount}
                            </TableCell>
                            <TableCell className='text-right font-bold text-red-600'>
                              ₹{txn.chargeAmount}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  txn.status === 'Settled'
                                    ? 'default'
                                    : 'secondary'
                                }
                                className={
                                  txn.status === 'Settled' ? 'bg-green-600' : ''
                                }
                              >
                                {txn.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    {selectedPenalty &&
                      selectedPenalty.transactions.length <
                        selectedPenalty.count && (
                        <p className='text-muted-foreground py-4 text-center text-sm'>
                          Showing {selectedPenalty.transactions.length} of{' '}
                          {selectedPenalty.count} transactions
                        </p>
                      )}
                  </ScrollArea>
                </DialogContent>
              </Dialog>
            </TabsContent>

            {/* DEBT & INVESTMENT */}
            <TabsContent value='debt-investment' className='space-y-4'>
              <div className='grid gap-4 lg:grid-cols-3'>
                <Card>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-base'>
                      <Scale className='h-4 w-4 text-blue-600' />
                      Debt Mix
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width='100%' height={200}>
                      <PieChart>
                        <Pie
                          data={debtMix}
                          cx='50%'
                          cy='50%'
                          innerRadius={50}
                          outerRadius={80}
                          dataKey='amount'
                        >
                          {debtMix.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value: number) => [`₹${value} CR`, '']}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className='mt-4 grid grid-cols-2 gap-2'>
                      {debtMix.map((item) => (
                        <div
                          key={item.type}
                          className='flex items-center gap-2'
                        >
                          <div
                            className='h-2 w-2 rounded-full'
                            style={{ backgroundColor: item.color }}
                          />
                          <span className='text-xs'>
                            {item.type} ({item.percentage}%)
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className='lg:col-span-2'>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-base'>
                      <Landmark className='h-4 w-4 text-green-600' />
                      Debt Portfolio Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className='w-[30%]'>Type</TableHead>
                          <TableHead className='w-[25%] text-center'>
                            Amount (CR)
                          </TableHead>
                          <TableHead className='w-[20%] text-center'>
                            Rate (%)
                          </TableHead>
                          <TableHead className='w-[25%] text-center'>
                            Tenure
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {debtMix.map((item) => (
                          <TableRow key={item.type}>
                            <TableCell className='font-medium'>
                              {item.type}
                            </TableCell>
                            <TableCell className='text-center font-semibold'>
                              ₹{item.amount}
                            </TableCell>
                            <TableCell className='text-center font-medium text-blue-600'>
                              {item.rate}%
                            </TableCell>
                            <TableCell className='text-center'>
                              {item.tenure}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2 text-base'>
                    <PiggyBank className='h-4 w-4 text-amber-600' />
                    Investment Portfolio
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Counterparty</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead className='text-right'>
                          Amount (CR)
                        </TableHead>
                        <TableHead className='text-right'>Yield (%)</TableHead>
                        <TableHead>Tenure</TableHead>
                        <TableHead>Maturity</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {investmentYields.map((inv, idx) => (
                        <TableRow key={idx}>
                          <TableCell className='font-medium'>
                            {inv.counterparty}
                          </TableCell>
                          <TableCell>
                            <Badge variant='outline'>{inv.type}</Badge>
                          </TableCell>
                          <TableCell className='text-right'>
                            ₹{inv.amount}
                          </TableCell>
                          <TableCell className='text-right font-medium text-green-600'>
                            {inv.yield}%
                          </TableCell>
                          <TableCell>{inv.tenure}</TableCell>
                          <TableCell>{inv.maturityDate}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <div className='grid gap-4 lg:grid-cols-2'>
                <Card>
                  <CardHeader className='pb-2'>
                    <CardTitle className='flex items-center gap-2 text-base'>
                      <CalendarClock className='h-4 w-4 text-red-600' />
                      Debt Maturities
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='pt-0'>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Instrument</TableHead>
                          <TableHead className='text-center'>
                            Amount (CR)
                          </TableHead>
                          <TableHead className='text-center'>
                            Rate (%)
                          </TableHead>
                          <TableHead className='text-center'>
                            Due Date
                          </TableHead>
                          <TableHead className='text-center'>
                            Days Left
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {debtMaturities.length > 0 ? (
                          debtMaturities.map((item, idx) => (
                            <TableRow key={idx}>
                              <TableCell className='font-medium'>
                                {item.instrument}
                              </TableCell>
                              <TableCell className='text-center'>
                                ₹{item.amount}
                              </TableCell>
                              <TableCell className='text-center text-blue-600'>
                                {item.rate}%
                              </TableCell>
                              <TableCell className='text-center text-sm'>
                                {item.maturityDate}
                              </TableCell>
                              <TableCell className='text-center'>
                                <Badge
                                  variant={
                                    item.daysToMaturity <= 30
                                      ? 'destructive'
                                      : item.daysToMaturity <= 60
                                        ? 'secondary'
                                        : 'outline'
                                  }
                                >
                                  {item.daysToMaturity}d
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell
                              colSpan={5}
                              className='text-muted-foreground text-center'
                            >
                              No debt maturities in this period
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className='pb-2'>
                    <CardTitle className='flex items-center gap-2 text-base'>
                      <CalendarClock className='h-4 w-4 text-amber-600' />
                      Investment Maturities
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='pt-0'>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Instrument</TableHead>
                          <TableHead className='text-center'>
                            Amount (CR)
                          </TableHead>
                          <TableHead className='text-center'>
                            Yield (%)
                          </TableHead>
                          <TableHead className='text-center'>
                            Maturity
                          </TableHead>
                          <TableHead className='text-center'>
                            Days Left
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {investmentMaturities.length > 0 ? (
                          investmentMaturities.map((item, idx) => (
                            <TableRow key={idx}>
                              <TableCell className='font-medium'>
                                {item.instrument}
                              </TableCell>
                              <TableCell className='text-center'>
                                ₹{item.amount}
                              </TableCell>
                              <TableCell className='text-center text-green-600'>
                                {item.yield}%
                              </TableCell>
                              <TableCell className='text-center text-sm'>
                                {item.maturityDate}
                              </TableCell>
                              <TableCell className='text-center'>
                                <Badge
                                  variant={
                                    item.daysToMaturity <= 30
                                      ? 'destructive'
                                      : item.daysToMaturity <= 60
                                        ? 'secondary'
                                        : 'outline'
                                  }
                                >
                                  {item.daysToMaturity}d
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell
                              colSpan={5}
                              className='text-muted-foreground text-center'
                            >
                              No investment maturities in this period
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* GOVERNANCE */}
            <TabsContent value='governance' className='space-y-4'>
              <div className='grid gap-4 lg:grid-cols-2'>
                <Card>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-base'>
                      <Shield className='h-4 w-4 text-green-600' />
                      DOA Compliance by Authority
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Authority</TableHead>
                          <TableHead className='text-right'>
                            Transfers
                          </TableHead>
                          <TableHead className='text-right'>Loans</TableHead>
                          <TableHead className='text-right'>
                            Investments
                          </TableHead>
                          <TableHead className='text-right'>Overall</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {doaComplianceByAuthority.map((item) => (
                          <TableRow key={item.authority}>
                            <TableCell className='font-medium'>
                              {item.authority}
                            </TableCell>
                            <TableCell className='text-right'>
                              {item.bankTransfers}%
                            </TableCell>
                            <TableCell className='text-right'>
                              {item.loans}%
                            </TableCell>
                            <TableCell className='text-right'>
                              {item.investments}%
                            </TableCell>
                            <TableCell className='text-right'>
                              <span
                                className={
                                  item.overall >= 98
                                    ? 'font-bold text-green-600'
                                    : 'font-medium text-amber-600'
                                }
                              >
                                {item.overall}%
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-base'>
                      <Timer className='h-4 w-4 text-blue-600' />
                      Approval Velocity by Type
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-4'>
                      {approvalVelocityByStatus.map((item) => (
                        <div key={item.status} className='space-y-2'>
                          <div className='flex items-center justify-between'>
                            <span className='text-sm font-medium'>
                              {item.status}
                            </span>
                            <span className='text-muted-foreground text-sm'>
                              {item.avgDays}d avg
                            </span>
                          </div>
                          <Progress
                            value={(item.avgDays / 15) * 100}
                            className='h-2'
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <div className='flex items-center justify-between'>
                    <CardTitle className='flex items-center gap-2 text-base'>
                      <Hourglass className='h-4 w-4 text-amber-600' />
                      Board Approval Pending
                    </CardTitle>
                    <Badge variant='destructive'>
                      {boardApprovalPending.length} Items
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className='overflow-x-auto'>
                    <table className='w-full table-fixed border-collapse text-sm'>
                      <thead>
                        <tr className='bg-muted/50 border-b'>
                          <th className='h-10 w-[12%] px-3 text-left font-semibold'>
                            ID
                          </th>
                          <th className='h-10 w-[18%] px-3 text-left font-semibold'>
                            Type
                          </th>
                          <th className='h-10 w-[15%] px-3 text-right font-semibold'>
                            Value (CR)
                          </th>
                          <th className='h-10 w-[18%] px-3 text-center font-semibold'>
                            Request Date
                          </th>
                          <th className='h-10 w-[15%] px-3 text-center font-semibold'>
                            Pending
                          </th>
                          <th className='h-10 w-[22%] px-3 text-left font-semibold'>
                            Requester
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {boardApprovalPending.map((item) => (
                          <tr
                            key={item.id}
                            className='hover:bg-muted/30 border-b'
                          >
                            <td className='h-10 px-3 font-medium'>{item.id}</td>
                            <td className='h-10 px-3'>{item.type}</td>
                            <td className='h-10 px-3 text-right'>
                              {item.value > 0 ? `₹${item.value}` : '-'}
                            </td>
                            <td className='h-10 px-3 text-center'>
                              {item.requestDate}
                            </td>
                            <td className='h-10 px-3 text-center'>
                              <Badge
                                variant={
                                  item.pendingDays > 14
                                    ? 'destructive'
                                    : 'secondary'
                                }
                              >
                                {item.pendingDays}d
                              </Badge>
                            </td>
                            <td className='h-10 px-3'>{item.requester}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <div className='grid gap-4 lg:grid-cols-2'>
                <Card>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-base'>
                      <XCircle className='h-4 w-4 text-red-600' />
                      Rejections by Authority
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Authority</TableHead>
                          <TableHead className='text-right'>
                            Transfers
                          </TableHead>
                          <TableHead className='text-right'>Loans</TableHead>
                          <TableHead className='text-right'>
                            Investments
                          </TableHead>
                          <TableHead className='text-right'>Total</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {rejectionsByAuthority.map((item) => (
                          <TableRow key={item.authority}>
                            <TableCell className='font-medium'>
                              {item.authority}
                            </TableCell>
                            <TableCell className='text-right'>
                              {item.bankTransfers}
                            </TableCell>
                            <TableCell className='text-right'>
                              {item.loans}
                            </TableCell>
                            <TableCell className='text-right'>
                              {item.investments}
                            </TableCell>
                            <TableCell className='text-right font-semibold text-red-600'>
                              {item.total}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-base'>
                      <AlertTriangle className='h-4 w-4 text-orange-600' />
                      Rejection Reasons
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Reason</TableHead>
                          <TableHead className='text-right'>Count</TableHead>
                          <TableHead>Affected Types</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {rejectionReasons.map((item) => (
                          <TableRow key={item.reason}>
                            <TableCell className='font-medium'>
                              {item.reason}
                            </TableCell>
                            <TableCell className='text-right font-semibold'>
                              {item.count}
                            </TableCell>
                            <TableCell className='text-muted-foreground text-xs'>
                              {item.affectedTypes}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* RISK & CHANGES */}
            <TabsContent value='risk-changes' className='space-y-4'>
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2 text-base'>
                    <FileSignature className='h-4 w-4 text-purple-600' />
                    Recent Signatory Changes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Bank</TableHead>
                        <TableHead>Account</TableHead>
                        <TableHead>Old Signatory</TableHead>
                        <TableHead>New Signatory</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {signatoryChanges.map((item, idx) => (
                        <TableRow key={idx}>
                          <TableCell className='font-medium'>
                            {item.bank}
                          </TableCell>
                          <TableCell className='text-muted-foreground'>
                            {item.account}
                          </TableCell>
                          <TableCell>{item.oldSignatory}</TableCell>
                          <TableCell>{item.newSignatory}</TableCell>
                          <TableCell>{item.changeDate}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                item.status === 'Completed'
                                  ? 'default'
                                  : 'secondary'
                              }
                              className={
                                item.status === 'Completed'
                                  ? 'bg-green-600'
                                  : ''
                              }
                            >
                              {item.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2 text-base'>
                    <TrendingUp className='h-4 w-4 text-blue-600' />
                    Facility Limit Utilization
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    {limitUtilization.map((item) => (
                      <div key={item.facility} className='space-y-2'>
                        <div className='flex items-center justify-between'>
                          <div className='flex items-center gap-2'>
                            <span className='text-sm font-medium'>
                              {item.facility}
                            </span>
                            {item.trend === 'up' && (
                              <TrendingUp className='h-3 w-3 text-amber-500' />
                            )}
                            {item.trend === 'down' && (
                              <TrendingDown className='h-3 w-3 text-green-500' />
                            )}
                          </div>
                          <div className='flex items-center gap-4 text-sm'>
                            <span className='text-muted-foreground'>
                              ₹{item.utilized}/{item.sanctioned} CR
                            </span>
                            <Badge
                              variant={
                                item.utilization > 80
                                  ? 'destructive'
                                  : item.utilization > 60
                                    ? 'secondary'
                                    : 'outline'
                              }
                            >
                              {item.utilization}%
                            </Badge>
                          </div>
                        </div>
                        <Progress
                          value={item.utilization}
                          className={`h-3 ${item.utilization > 80 ? '[&>div]:bg-red-500' : item.utilization > 60 ? '[&>div]:bg-amber-500' : ''}`}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2 text-base'>
                    <Building2 className='h-4 w-4 text-teal-600' />
                    Assets Charged
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Asset</TableHead>
                        <TableHead>Bank</TableHead>
                        <TableHead>Facility</TableHead>
                        <TableHead className='text-right'>
                          Charge Value (CR)
                        </TableHead>
                        <TableHead className='text-right'>
                          Outstanding (CR)
                        </TableHead>
                        <TableHead className='text-right'>Coverage</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {assetsCharged.map((item, idx) => {
                        const coverage = (
                          (item.chargeValue / item.loanOutstanding) *
                          100
                        ).toFixed(0);
                        return (
                          <TableRow key={idx}>
                            <TableCell className='font-medium'>
                              {item.asset}
                            </TableCell>
                            <TableCell>{item.bank}</TableCell>
                            <TableCell>
                              <Badge variant='outline'>{item.facility}</Badge>
                            </TableCell>
                            <TableCell className='text-right'>
                              ₹{item.chargeValue}
                            </TableCell>
                            <TableCell className='text-right'>
                              ₹{item.loanOutstanding}
                            </TableCell>
                            <TableCell className='text-right'>
                              <span
                                className={
                                  Number(coverage) >= 150
                                    ? 'font-medium text-green-600'
                                    : 'font-medium text-amber-600'
                                }
                              >
                                {coverage}%
                              </span>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </TooltipProvider>
    </PageContainer>
  );
}
