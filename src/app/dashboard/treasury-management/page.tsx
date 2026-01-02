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
  Tooltip
} from 'recharts';
import {
  TrendingUp,
  Receipt,
  CheckCircle2,
  Clock,
  ShieldAlert,
  Info,
  AlertTriangle,
  ArrowUpRight,
  X,
  Building2,
  Landmark,
  PiggyBank,
  FileSignature,
  UserCog,
  Percent,
  Calendar,
  Users,
  ChevronRight
} from 'lucide-react';

import PageContainer from '@/components/layout/page-container';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';

// Treasury Types
type TreasuryType =
  | 'Bank Transfers'
  | 'Loan Agreements'
  | 'Investment Creations'
  | 'Change in Bank Signatories'
  | 'Loan Borrowing';
type TransferType = 'RTGS' | 'NEFT' | 'Internal';
type ApprovalStatus =
  | 'Pending'
  | 'Partially Approved'
  | 'Rejected'
  | 'Escalated'
  | 'Approved';
type DOALevel = 'Manager' | 'CFO' | 'CEO' | 'Board';
type LoanType = 'Term Loan' | 'Working Capital' | 'Overdraft';
type InvestmentType = 'Fixed Deposit' | 'Mutual Fund' | 'Bonds';
type InterestType = 'Fixed' | 'Floating' | 'Mixed';

// Bank Transfer specific fields
type BankTransferDetails = {
  fromAccount: string;
  toAccount: string;
  transferType: TransferType;
  approvalAuthority: string;
  approvalLimit: number;
  approverName: string;
  approvalStatus: ApprovalStatus;
  dateTime: string;
  doaCompliance: boolean;
};

// Cheque Signing Authority specific fields
type ChequeSigningDetails = {
  chequeAmountRange: { min: number; max: number };
  numberOfSignatoriesRequired: number;
  authorizedSignatories: string[];
  validFrom: string;
  validTo: string;
  bankName: string;
  accountNumber: string;
  doaLevel: DOALevel;
};

// Loan Agreement specific fields
type LoanAgreementDetails = {
  loanType: LoanType;
  lenderName: string;
  loanAmount: number;
  tenure: string;
  interestType: InterestType;
  interestRate: number;
  approvalAuthority: string;
  boardApprovalRequired: boolean;
  agreementStatus: ApprovalStatus;
  doaCompliance: boolean;
};

// Investment Creation specific fields
type InvestmentDetails = {
  investmentType: InvestmentType;
  counterparty: string;
  amount: number;
  tenure: string;
  expectedReturn: number;
  approvalAuthority: string;
  approvalLimit: number;
  status: ApprovalStatus;
  doaCompliance: boolean;
};

// Bank Signatory Change specific fields
type BankSignatoryChangeDetails = {
  bankName: string;
  accountNumber: string;
  oldSignatory: string;
  newSignatory: string;
  reasonForChange: string;
  approvedBy: string;
  effectiveDate: string;
  status: ApprovalStatus;
};

// Approval Step Type for chronology
type ApprovalStepStatus = 'approved' | 'pending' | 'rejected' | 'waiting';
type ApprovalStep = {
  id: string;
  authority: string;
  role: string;
  status: ApprovalStepStatus;
  date?: string;
  time?: string;
  comment?: string;
};

// Escalation Alert Type
type EscalationAlert = {
  id: string;
  transactionId: string;
  value: number;
  treasuryType: TreasuryType;
  approvalStage: string;
  daysDelayed: number;
  isFortnightly: boolean;
  isHighRisk: boolean;
  riskComment?: string;
  requestedBy: string;
  requestedDate: string;
  description: string;
  escalatedTo: string;
  approvalFlow: ApprovalStep[];
  // Type-specific details
  bankTransferDetails?: BankTransferDetails;
  chequeSigningDetails?: ChequeSigningDetails;
  loanAgreementDetails?: LoanAgreementDetails;
  investmentDetails?: InvestmentDetails;
  bankSignatoryChangeDetails?: BankSignatoryChangeDetails;
};

// Escalation Alerts Data
const escalationAlerts: EscalationAlert[] = [
  {
    id: 'ESC001',
    transactionId: 'TXN-2025-1847',
    value: 24.5,
    treasuryType: 'Bank Transfers',
    approvalStage: 'CFO Approval',
    daysDelayed: 17,
    isFortnightly: true,
    isHighRisk: false,
    requestedBy: 'Rajesh Kumar',
    requestedDate: '2025-12-14',
    description: 'Inter-company fund transfer to subsidiary',
    escalatedTo: 'Group CFO',
    approvalFlow: [
      {
        id: '1',
        authority: 'Rajesh Kumar',
        role: 'Department Head',
        status: 'approved',
        date: '2025-12-19',
        time: '10:30 AM',
        comment: 'Verified transfer details and beneficiary account'
      },
      { id: '2', authority: 'Pending', role: 'CFO', status: 'pending' },
      { id: '3', authority: 'Waiting', role: 'Group CFO', status: 'waiting' }
    ],
    bankTransferDetails: {
      fromAccount: 'HDFC-1234567890 (Hero Motors)',
      toAccount: 'ICICI-9876543210 (Hero Cycles Ltd)',
      transferType: 'RTGS',
      approvalAuthority: 'CFO',
      approvalLimit: 25,
      approverName: 'Suresh Mehta',
      approvalStatus: 'Escalated',
      dateTime: '2025-12-19 14:30:00',
      doaCompliance: true
    }
  },
  {
    id: 'ESC002',
    transactionId: 'TXN-2025-1823',
    value: 156.8,
    treasuryType: 'Loan Agreements',
    approvalStage: 'Board Approval',
    daysDelayed: 18,
    isFortnightly: true,
    isHighRisk: false,
    requestedBy: 'Priya Sharma',
    requestedDate: '2025-12-13',
    description: 'Term loan facility from HDFC Bank',
    escalatedTo: 'Chairman',
    approvalFlow: [
      {
        id: '1',
        authority: 'Priya Sharma',
        role: 'Department Head',
        status: 'approved',
        date: '2025-12-13',
        time: '09:15 AM',
        comment:
          'Loan terms reviewed and found competitive. Interest rate is 0.5% below market average.'
      },
      {
        id: '2',
        authority: 'Vikram Mehta',
        role: 'CFO',
        status: 'approved',
        date: '2025-12-15',
        time: '02:45 PM',
        comment:
          'Financial covenants are acceptable. Debt-to-equity ratio remains healthy.'
      },
      {
        id: '3',
        authority: 'Suresh Pillai',
        role: 'Group CFO',
        status: 'approved',
        date: '2025-12-18',
        time: '11:30 AM',
        comment:
          'Approved. Recommend expedited board approval due to favorable market conditions.'
      },
      { id: '4', authority: 'Pending', role: 'Board', status: 'pending' }
    ],
    loanAgreementDetails: {
      loanType: 'Term Loan',
      lenderName: 'HDFC Bank Ltd',
      loanAmount: 156.8,
      tenure: '5 Years',
      interestType: 'Floating',
      interestRate: 9.25,
      approvalAuthority: 'Board',
      boardApprovalRequired: true,
      agreementStatus: 'Pending',
      doaCompliance: true
    }
  },
  {
    id: 'ESC003',
    transactionId: 'TXN-2025-1892',
    value: 45.2,
    treasuryType: 'Investment Creations',
    approvalStage: 'Treasury Head',
    daysDelayed: 8,
    isFortnightly: false,
    isHighRisk: false,
    requestedBy: 'Amit Verma',
    requestedDate: '2025-12-23',
    description: 'Fixed deposit placement with SBI',
    escalatedTo: 'CFO',
    approvalFlow: [
      {
        id: '1',
        authority: 'Amit Verma',
        role: 'Department Head',
        status: 'approved',
        date: '2025-12-23',
        time: '10:00 AM',
        comment: 'FD rate of 7.5% is best available in market currently'
      },
      {
        id: '2',
        authority: 'Pending',
        role: 'Treasury Head',
        status: 'pending'
      },
      { id: '3', authority: 'Waiting', role: 'CFO', status: 'waiting' }
    ],
    investmentDetails: {
      investmentType: 'Fixed Deposit',
      counterparty: 'State Bank of India',
      amount: 45.2,
      tenure: '12 Months',
      expectedReturn: 7.5,
      approvalAuthority: 'CFO',
      approvalLimit: 50,
      status: 'Pending',
      doaCompliance: true
    }
  },
  {
    id: 'ESC004',
    transactionId: 'TXN-2025-1756',
    value: 89.3,
    treasuryType: 'Loan Borrowing',
    approvalStage: 'Legal Review',
    daysDelayed: 21,
    isFortnightly: true,
    isHighRisk: false,
    requestedBy: 'Sunita Reddy',
    requestedDate: '2025-12-10',
    description: 'Bank guarantee for vendor contract',
    escalatedTo: 'Group CFO',
    approvalFlow: [
      {
        id: '1',
        authority: 'Sunita Reddy',
        role: 'Department Head',
        status: 'approved',
        date: '2025-12-10',
        time: '11:00 AM',
        comment: 'Vendor contract terms verified'
      },
      {
        id: '2',
        authority: 'Pending',
        role: 'Legal Review',
        status: 'pending'
      },
      { id: '3', authority: 'Waiting', role: 'CFO', status: 'waiting' },
      { id: '4', authority: 'Waiting', role: 'Group CFO', status: 'waiting' }
    ]
  },
  {
    id: 'ESC005',
    transactionId: 'TXN-2025-1901',
    value: 12.8,
    treasuryType: 'Bank Transfers',
    approvalStage: 'Finance Manager',
    daysDelayed: 9,
    isFortnightly: false,
    isHighRisk: false,
    requestedBy: 'Vikram Singh',
    requestedDate: '2025-12-22',
    description: 'Vendor payment - critical supplier',
    escalatedTo: 'Treasury Head',
    approvalFlow: [
      {
        id: '1',
        authority: 'Pending',
        role: 'Finance Manager',
        status: 'pending'
      },
      {
        id: '2',
        authority: 'Waiting',
        role: 'Treasury Head',
        status: 'waiting'
      }
    ],
    bankTransferDetails: {
      fromAccount: 'SBI-5678901234 (Hero Motors)',
      toAccount: 'Axis-3456789012 (Vendor - Steel Corp)',
      transferType: 'NEFT',
      approvalAuthority: 'Finance Manager',
      approvalLimit: 15,
      approverName: 'Anita Desai',
      approvalStatus: 'Pending',
      dateTime: '2025-12-22 09:15:00',
      doaCompliance: true
    }
  },
  {
    id: 'ESC006',
    transactionId: 'TXN-2025-1834',
    value: 234.6,
    treasuryType: 'Loan Agreements',
    approvalStage: 'CFO Approval',
    daysDelayed: 15,
    isFortnightly: true,
    isHighRisk: false,
    requestedBy: 'Neha Gupta',
    requestedDate: '2025-12-16',
    description: 'Working capital facility renewal',
    escalatedTo: 'Group CFO',
    approvalFlow: [
      {
        id: '1',
        authority: 'Neha Gupta',
        role: 'Department Head',
        status: 'approved',
        date: '2025-12-16',
        time: '09:00 AM',
        comment:
          'WC facility renewal is critical for Q1 operations. Terms are same as previous year.'
      },
      {
        id: '2',
        authority: 'Ramesh Iyer',
        role: 'Treasury Head',
        status: 'approved',
        date: '2025-12-17',
        time: '03:30 PM',
        comment:
          'Reviewed facility utilization. Average usage is 78%. Recommend renewal.'
      },
      { id: '3', authority: 'Pending', role: 'CFO', status: 'pending' },
      { id: '4', authority: 'Waiting', role: 'Group CFO', status: 'waiting' }
    ],
    loanAgreementDetails: {
      loanType: 'Working Capital',
      lenderName: 'ICICI Bank Ltd',
      loanAmount: 234.6,
      tenure: '1 Year (Renewable)',
      interestType: 'Floating',
      interestRate: 8.75,
      approvalAuthority: 'CFO',
      boardApprovalRequired: false,
      agreementStatus: 'Escalated',
      doaCompliance: true
    }
  },
  {
    id: 'ESC007',
    transactionId: 'TXN-2025-1878',
    value: 67.4,
    treasuryType: 'Investment Creations',
    approvalStage: 'Risk Committee',
    daysDelayed: 11,
    isFortnightly: false,
    isHighRisk: false,
    requestedBy: 'Arun Joshi',
    requestedDate: '2025-12-20',
    description: 'Mutual fund investment - debt scheme',
    escalatedTo: 'CFO',
    approvalFlow: [
      {
        id: '1',
        authority: 'Arun Joshi',
        role: 'Department Head',
        status: 'approved',
        date: '2025-12-20',
        time: '10:15 AM',
        comment:
          'HDFC Debt Fund has consistent 3-year returns. Low risk profile suitable for treasury.'
      },
      {
        id: '2',
        authority: 'Meena Kapoor',
        role: 'Treasury Head',
        status: 'approved',
        date: '2025-12-21',
        time: '04:00 PM',
        comment: 'Fund rating is AAA. Exit load is nil after 30 days.'
      },
      {
        id: '3',
        authority: 'Pending',
        role: 'Risk Committee',
        status: 'pending'
      },
      { id: '4', authority: 'Waiting', role: 'CFO', status: 'waiting' }
    ],
    investmentDetails: {
      investmentType: 'Mutual Fund',
      counterparty: 'HDFC AMC - Debt Fund',
      amount: 67.4,
      tenure: '6 Months',
      expectedReturn: 8.2,
      approvalAuthority: 'Risk Committee',
      approvalLimit: 75,
      status: 'Pending',
      doaCompliance: true
    }
  },
  {
    id: 'ESC008',
    transactionId: 'TXN-2025-1945',
    value: 125.0,
    treasuryType: 'Change in Bank Signatories',
    approvalStage: 'CFO Approval',
    daysDelayed: 10,
    isFortnightly: false,
    isHighRisk: false,
    requestedBy: 'Manoj Tiwari',
    requestedDate: '2025-12-21',
    description: 'High value cheque signing authority update',
    escalatedTo: 'Group CFO',
    approvalFlow: [
      {
        id: '1',
        authority: 'Manoj Tiwari',
        role: 'Department Head',
        status: 'approved',
        date: '2025-12-21',
        time: '11:00 AM',
        comment: 'Signatory update required due to designation change'
      },
      {
        id: '2',
        authority: 'Sunita Reddy',
        role: 'Treasury Head',
        status: 'approved',
        date: '2025-12-22',
        time: '02:00 PM',
        comment: 'Verified credentials and authorization limits'
      },
      { id: '3', authority: 'Pending', role: 'CFO', status: 'pending' },
      { id: '4', authority: 'Waiting', role: 'Group CFO', status: 'waiting' }
    ],
    chequeSigningDetails: {
      chequeAmountRange: { min: 50, max: 150 },
      numberOfSignatoriesRequired: 2,
      authorizedSignatories: [
        'Rajesh Mehta (CFO)',
        'Sunita Reddy (Treasury Head)',
        'Vikram Singh (Finance Controller)'
      ],
      validFrom: '2025-01-01',
      validTo: '2025-12-31',
      bankName: 'HDFC Bank',
      accountNumber: 'HDFC-1234567890',
      doaLevel: 'CFO'
    }
  },
  {
    id: 'ESC009',
    transactionId: 'TXN-2025-1967',
    value: 0,
    treasuryType: 'Change in Bank Signatories',
    approvalStage: 'Board Approval',
    daysDelayed: 19,
    isFortnightly: true,
    isHighRisk: false,
    requestedBy: 'HR Department',
    requestedDate: '2025-12-12',
    description: 'Change in authorized signatory due to resignation',
    escalatedTo: 'Chairman',
    approvalFlow: [
      {
        id: '1',
        authority: 'HR Department',
        role: 'Department Head',
        status: 'approved',
        date: '2025-12-17',
        time: '09:30 AM',
        comment:
          'New Finance Director joining confirmed. KYC documents verified.'
      },
      {
        id: '2',
        authority: 'Arvind Pandey',
        role: 'CFO',
        status: 'approved',
        date: '2025-12-18',
        time: '11:45 AM',
        comment:
          'Signatory change is necessary. Previous signatory access to be revoked immediately upon board approval.'
      },
      {
        id: '3',
        authority: 'Mohan Das',
        role: 'Group CFO',
        status: 'approved',
        date: '2025-12-20',
        time: '03:15 PM',
        comment:
          'Approved. Background verification complete. Recommend urgent board ratification.'
      },
      { id: '4', authority: 'Pending', role: 'Board', status: 'pending' }
    ],
    bankSignatoryChangeDetails: {
      bankName: 'State Bank of India',
      accountNumber: 'SBI-9876543210',
      oldSignatory: 'Rakesh Kumar (Ex-Finance Director)',
      newSignatory: 'Anita Sharma (New Finance Director)',
      reasonForChange: 'Previous signatory resigned from the organization',
      approvedBy: 'Pending Board Approval',
      effectiveDate: '2025-01-15',
      status: 'Pending'
    }
  },
  {
    id: 'ESC010',
    transactionId: 'TXN-2025-1989',
    value: 85.5,
    treasuryType: 'Investment Creations',
    approvalStage: 'Treasury Head',
    daysDelayed: 9,
    isFortnightly: false,
    isHighRisk: false,
    requestedBy: 'Kavita Menon',
    requestedDate: '2025-12-22',
    description: 'Corporate bond investment - AAA rated',
    escalatedTo: 'CFO',
    approvalFlow: [
      {
        id: '1',
        authority: 'Kavita Menon',
        role: 'Department Head',
        status: 'approved',
        date: '2025-12-22',
        time: '10:30 AM',
        comment:
          'Reliance bond series offers 9.1% yield. AAA rated by CRISIL and ICRA.'
      },
      {
        id: '2',
        authority: 'Pending',
        role: 'Treasury Head',
        status: 'pending'
      },
      { id: '3', authority: 'Waiting', role: 'CFO', status: 'waiting' }
    ],
    investmentDetails: {
      investmentType: 'Bonds',
      counterparty: 'Reliance Industries Ltd - Bond Series A',
      amount: 85.5,
      tenure: '3 Years',
      expectedReturn: 9.1,
      approvalAuthority: 'Treasury Head',
      approvalLimit: 100,
      status: 'Pending',
      doaCompliance: true
    }
  },
  // High Risk Flagged Alerts
  {
    id: 'RISK001',
    transactionId: 'TXN-2025-2001',
    value: 178.5,
    treasuryType: 'Bank Transfers',
    approvalStage: 'CFO Approval',
    daysDelayed: 3,
    isFortnightly: false,
    isHighRisk: true,
    riskComment:
      'Beneficiary account flagged by RBI for suspicious activity. Requires enhanced due diligence before proceeding.',
    requestedBy: 'Sanjay Patel',
    requestedDate: '2025-12-28',
    description: 'Urgent vendor payment - new supplier onboarding',
    escalatedTo: 'Risk Committee',
    approvalFlow: [
      {
        id: '1',
        authority: 'Sanjay Patel',
        role: 'Department Head',
        status: 'approved',
        date: '2025-12-28',
        time: '09:00 AM',
        comment:
          'Payment required for critical supply chain. However, flagging for risk review.'
      },
      { id: '2', authority: 'Pending', role: 'CFO', status: 'pending' },
      {
        id: '3',
        authority: 'Waiting',
        role: 'Risk Committee',
        status: 'waiting'
      }
    ],
    bankTransferDetails: {
      fromAccount: 'HDFC-1234567890 (Hero Motors)',
      toAccount: 'Yes Bank-5678901234 (New Vendor Corp)',
      transferType: 'RTGS',
      approvalAuthority: 'CFO',
      approvalLimit: 200,
      approverName: 'Pending',
      approvalStatus: 'Pending',
      dateTime: '2025-12-28 09:30:00',
      doaCompliance: true
    }
  },
  {
    id: 'RISK002',
    transactionId: 'TXN-2025-2015',
    value: 245.0,
    treasuryType: 'Investment Creations',
    approvalStage: 'Risk Committee',
    daysDelayed: 5,
    isFortnightly: false,
    isHighRisk: true,
    riskComment:
      'Investment in unrated bonds from new issuer. Credit rating pending. Potential default risk if issuer faces liquidity issues.',
    requestedBy: 'Deepak Sharma',
    requestedDate: '2025-12-26',
    description: 'Corporate bond investment - infrastructure company',
    escalatedTo: 'Board',
    approvalFlow: [
      {
        id: '1',
        authority: 'Deepak Sharma',
        role: 'Department Head',
        status: 'approved',
        date: '2025-12-26',
        time: '10:00 AM',
        comment: 'High yield opportunity but needs risk assessment'
      },
      {
        id: '2',
        authority: 'Treasury Head',
        role: 'Treasury Head',
        status: 'approved',
        date: '2025-12-27',
        time: '02:00 PM',
        comment: 'Flagging as high risk - issuer has no credit history'
      },
      {
        id: '3',
        authority: 'Pending',
        role: 'Risk Committee',
        status: 'pending'
      },
      { id: '4', authority: 'Waiting', role: 'Board', status: 'waiting' }
    ],
    investmentDetails: {
      investmentType: 'Bonds',
      counterparty: 'Greenfield Infra Ltd - Series B',
      amount: 245.0,
      tenure: '5 Years',
      expectedReturn: 12.5,
      approvalAuthority: 'Board',
      approvalLimit: 300,
      status: 'Pending',
      doaCompliance: true
    }
  },
  {
    id: 'RISK003',
    transactionId: 'TXN-2025-2023',
    value: 312.8,
    treasuryType: 'Loan Agreements',
    approvalStage: 'Legal Review',
    daysDelayed: 4,
    isFortnightly: false,
    isHighRisk: true,
    riskComment:
      'Loan covenants include unusual cross-default clauses. May trigger default on existing facilities if breached. Legal review mandatory.',
    requestedBy: 'Anita Verma',
    requestedDate: '2025-12-27',
    description: 'Term loan from foreign bank with forex exposure',
    escalatedTo: 'Group CFO',
    approvalFlow: [
      {
        id: '1',
        authority: 'Anita Verma',
        role: 'Department Head',
        status: 'approved',
        date: '2025-12-27',
        time: '11:00 AM',
        comment: 'Good rate but covenant terms need careful review'
      },
      {
        id: '2',
        authority: 'Pending',
        role: 'Legal Review',
        status: 'pending'
      },
      { id: '3', authority: 'Waiting', role: 'CFO', status: 'waiting' },
      { id: '4', authority: 'Waiting', role: 'Group CFO', status: 'waiting' }
    ],
    loanAgreementDetails: {
      loanType: 'Term Loan',
      lenderName: 'Deutsche Bank AG',
      loanAmount: 312.8,
      tenure: '7 Years',
      interestType: 'Floating',
      interestRate: 7.85,
      approvalAuthority: 'Board',
      boardApprovalRequired: true,
      agreementStatus: 'Pending',
      doaCompliance: true
    }
  },
  {
    id: 'RISK004',
    transactionId: 'TXN-2025-2031',
    value: 0,
    treasuryType: 'Change in Bank Signatories',
    approvalStage: 'Compliance Review',
    daysDelayed: 2,
    isFortnightly: false,
    isHighRisk: true,
    riskComment:
      'New signatory has pending litigation related to financial fraud at previous employer. Background verification incomplete.',
    requestedBy: 'HR Department',
    requestedDate: '2025-12-29',
    description: 'Addition of new signatory - Regional Finance Head',
    escalatedTo: 'Compliance Officer',
    approvalFlow: [
      {
        id: '1',
        authority: 'HR Department',
        role: 'Department Head',
        status: 'approved',
        date: '2025-12-29',
        time: '10:00 AM',
        comment:
          'Candidate qualifications verified. Flagging for compliance review due to pending case.'
      },
      {
        id: '2',
        authority: 'Pending',
        role: 'Compliance Review',
        status: 'pending'
      },
      { id: '3', authority: 'Waiting', role: 'CFO', status: 'waiting' }
    ],
    bankSignatoryChangeDetails: {
      bankName: 'Axis Bank',
      accountNumber: 'Axis-7890123456',
      oldSignatory: 'N/A (New Addition)',
      newSignatory: 'Ravi Krishnamurthy (Regional Finance Head)',
      reasonForChange: 'New hire - Regional Finance Head position',
      approvedBy: 'Pending Compliance Review',
      effectiveDate: '2026-01-15',
      status: 'Pending'
    }
  },
  {
    id: 'RISK005',
    transactionId: 'TXN-2025-2045',
    value: 156.2,
    treasuryType: 'Bank Transfers',
    approvalStage: 'Treasury Head',
    daysDelayed: 1,
    isFortnightly: false,
    isHighRisk: true,
    riskComment:
      'Transfer to overseas account in high-risk jurisdiction. FEMA compliance and source of funds documentation required.',
    requestedBy: 'International Division',
    requestedDate: '2025-12-30',
    description: 'Capital remittance to overseas subsidiary',
    escalatedTo: 'Compliance Officer',
    approvalFlow: [
      {
        id: '1',
        authority: 'International Division',
        role: 'Department Head',
        status: 'approved',
        date: '2025-12-30',
        time: '09:30 AM',
        comment:
          'Urgent capital infusion needed. Flagging for FEMA compliance check.'
      },
      {
        id: '2',
        authority: 'Pending',
        role: 'Treasury Head',
        status: 'pending'
      },
      {
        id: '3',
        authority: 'Waiting',
        role: 'Compliance Officer',
        status: 'waiting'
      },
      { id: '4', authority: 'Waiting', role: 'CFO', status: 'waiting' }
    ],
    bankTransferDetails: {
      fromAccount: 'SBI-9876543210 (Hero Motors)',
      toAccount: 'HSBC-UK-1234567 (Hero Motors UK Ltd)',
      transferType: 'RTGS',
      approvalAuthority: 'CFO',
      approvalLimit: 200,
      approverName: 'Pending',
      approvalStatus: 'Pending',
      dateTime: '2025-12-30 10:00:00',
      doaCompliance: true
    }
  }
];

const getTreasuryIcon = (type: TreasuryType) => {
  switch (type) {
    case 'Bank Transfers':
      return Building2;
    case 'Loan Agreements':
      return Landmark;
    case 'Investment Creations':
      return PiggyBank;
    case 'Change in Bank Signatories':
      return UserCog;
    case 'Loan Borrowing':
      return Landmark;
    default:
      return Building2;
  }
};

// Helper component to render alert details based on type
const AlertDetailsContent = ({ alert }: { alert: EscalationAlert }) => {
  // Bank Transfers Details
  if (alert.treasuryType === 'Bank Transfers' && alert.bankTransferDetails) {
    const details = alert.bankTransferDetails;
    return (
      <>
        <div className='rounded-lg border p-4'>
          <p className='text-muted-foreground mb-2 text-xs tracking-wider uppercase'>
            Account Flow
          </p>
          <div className='flex items-center gap-3'>
            <div className='flex-1 rounded-md bg-blue-50 p-2 dark:bg-blue-950/30'>
              <p className='text-muted-foreground text-[10px] uppercase'>
                From Account
              </p>
              <p className='text-sm font-medium'>{details.fromAccount}</p>
            </div>
            <ArrowUpRight className='h-5 w-5 rotate-45 text-blue-500' />
            <div className='flex-1 rounded-md bg-green-50 p-2 dark:bg-green-950/30'>
              <p className='text-muted-foreground text-[10px] uppercase'>
                To Account
              </p>
              <p className='text-sm font-medium'>{details.toAccount}</p>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-3 gap-3'>
          <div className='rounded-lg border p-3'>
            <p className='text-muted-foreground text-[10px] tracking-wider uppercase'>
              Amount
            </p>
            <p className='mt-1 text-lg font-bold'>₹{alert.value} CR</p>
          </div>
          <div className='rounded-lg border p-3'>
            <p className='text-muted-foreground text-[10px] tracking-wider uppercase'>
              Transfer Type
            </p>
            <Badge variant='outline' className='mt-1'>
              {details.transferType}
            </Badge>
          </div>
          <div className='rounded-lg border p-3'>
            <p className='text-muted-foreground text-[10px] tracking-wider uppercase'>
              Days Delayed
            </p>
            <p className='mt-1 text-lg font-bold text-red-600'>
              {alert.daysDelayed} days
            </p>
          </div>
        </div>
        <div className='bg-muted/50 rounded-lg p-4'>
          <p className='text-muted-foreground mb-3 text-xs tracking-wider uppercase'>
            Approval Details
          </p>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <p className='text-muted-foreground text-[10px] uppercase'>
                Approval Authority (DOA)
              </p>
              <p className='mt-0.5 font-medium'>{details.approvalAuthority}</p>
            </div>
            <div>
              <p className='text-muted-foreground text-[10px] uppercase'>
                Approval Limit
              </p>
              <p className='mt-0.5 font-medium'>₹{details.approvalLimit} CR</p>
            </div>
            <div>
              <p className='text-muted-foreground text-[10px] uppercase'>
                Approver Name
              </p>
              <p className='mt-0.5 font-medium'>{details.approverName}</p>
            </div>
            <div>
              <p className='text-muted-foreground text-[10px] uppercase'>
                Approval Status
              </p>
              <Badge
                variant={
                  details.approvalStatus === 'Escalated'
                    ? 'destructive'
                    : 'secondary'
                }
                className='mt-0.5'
              >
                {details.approvalStatus}
              </Badge>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <div className='rounded-lg border p-3'>
            <p className='text-muted-foreground text-[10px] tracking-wider uppercase'>
              Date & Time
            </p>
            <p className='mt-1 font-medium'>{details.dateTime}</p>
          </div>
          <div className='rounded-lg border p-3'>
            <p className='text-muted-foreground text-[10px] tracking-wider uppercase'>
              DOA Compliance
            </p>
            <div className='mt-1 flex items-center gap-2'>
              {details.doaCompliance ? (
                <>
                  <CheckCircle2 className='h-4 w-4 text-green-500' />
                  <span className='font-medium text-green-600'>Yes</span>
                </>
              ) : (
                <>
                  <X className='h-4 w-4 text-red-500' />
                  <span className='font-medium text-red-600'>No</span>
                </>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }

  // Loan Agreement Details
  if (alert.treasuryType === 'Loan Agreements' && alert.loanAgreementDetails) {
    const details = alert.loanAgreementDetails;
    return (
      <>
        <div className='grid grid-cols-3 gap-3'>
          <div className='rounded-lg border p-3'>
            <p className='text-muted-foreground text-[10px] tracking-wider uppercase'>
              Loan Amount
            </p>
            <p className='mt-1 text-lg font-bold'>₹{details.loanAmount} CR</p>
          </div>
          <div className='rounded-lg border p-3'>
            <p className='text-muted-foreground text-[10px] tracking-wider uppercase'>
              Loan Type
            </p>
            <Badge variant='outline' className='mt-1'>
              {details.loanType}
            </Badge>
          </div>
          <div className='rounded-lg border p-3'>
            <p className='text-muted-foreground text-[10px] tracking-wider uppercase'>
              Days Delayed
            </p>
            <p className='mt-1 text-lg font-bold text-red-600'>
              {alert.daysDelayed} days
            </p>
          </div>
        </div>
        <div className='rounded-lg border p-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <p className='text-muted-foreground text-[10px] uppercase'>
                Lender Name
              </p>
              <p className='mt-0.5 font-medium'>{details.lenderName}</p>
            </div>
            <div>
              <p className='text-muted-foreground text-[10px] uppercase'>
                Tenure
              </p>
              <p className='mt-0.5 font-medium'>{details.tenure}</p>
            </div>
          </div>
        </div>
        <div className='rounded-lg bg-blue-50 p-4 dark:bg-blue-950/30'>
          <div className='mb-3 flex items-center gap-2'>
            <Percent className='h-4 w-4 text-blue-600' />
            <p className='text-xs font-semibold tracking-wider text-blue-600 uppercase'>
              Interest Details
            </p>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <p className='text-muted-foreground text-[10px] uppercase'>
                Interest Type
              </p>
              <Badge variant='secondary' className='mt-0.5'>
                {details.interestType}
              </Badge>
            </div>
            <div>
              <p className='text-muted-foreground text-[10px] uppercase'>
                Interest Rate
              </p>
              <p className='mt-0.5 text-lg font-bold'>
                {details.interestRate}%
              </p>
            </div>
          </div>
        </div>
        <div className='bg-muted/50 rounded-lg p-4'>
          <p className='text-muted-foreground mb-3 text-xs tracking-wider uppercase'>
            Approval & Compliance
          </p>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <p className='text-muted-foreground text-[10px] uppercase'>
                Approval Authority
              </p>
              <p className='mt-0.5 font-medium'>{details.approvalAuthority}</p>
            </div>
            <div>
              <p className='text-muted-foreground text-[10px] uppercase'>
                Board Approval Required
              </p>
              <div className='mt-0.5 flex items-center gap-2'>
                {details.boardApprovalRequired ? (
                  <>
                    <CheckCircle2 className='h-4 w-4 text-amber-500' />
                    <span className='font-medium text-amber-600'>Yes</span>
                  </>
                ) : (
                  <>
                    <X className='h-4 w-4 text-gray-400' />
                    <span className='font-medium text-gray-500'>No</span>
                  </>
                )}
              </div>
            </div>
            <div>
              <p className='text-muted-foreground text-[10px] uppercase'>
                Agreement Status
              </p>
              <Badge
                variant={
                  details.agreementStatus === 'Escalated'
                    ? 'destructive'
                    : 'secondary'
                }
                className='mt-0.5'
              >
                {details.agreementStatus}
              </Badge>
            </div>
            <div>
              <p className='text-muted-foreground text-[10px] uppercase'>
                DOA Compliance
              </p>
              <div className='mt-0.5 flex items-center gap-2'>
                {details.doaCompliance ? (
                  <>
                    <CheckCircle2 className='h-4 w-4 text-green-500' />
                    <span className='font-medium text-green-600'>Yes</span>
                  </>
                ) : (
                  <>
                    <X className='h-4 w-4 text-red-500' />
                    <span className='font-medium text-red-600'>No</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Investment Details
  if (
    alert.treasuryType === 'Investment Creations' &&
    alert.investmentDetails
  ) {
    const details = alert.investmentDetails;
    return (
      <>
        <div className='grid grid-cols-3 gap-3'>
          <div className='rounded-lg border p-3'>
            <p className='text-muted-foreground text-[10px] tracking-wider uppercase'>
              Amount
            </p>
            <p className='mt-1 text-lg font-bold'>₹{details.amount} CR</p>
          </div>
          <div className='rounded-lg border p-3'>
            <p className='text-muted-foreground text-[10px] tracking-wider uppercase'>
              Investment Type
            </p>
            <Badge variant='outline' className='mt-1'>
              {details.investmentType}
            </Badge>
          </div>
          <div className='rounded-lg border p-3'>
            <p className='text-muted-foreground text-[10px] tracking-wider uppercase'>
              Days Delayed
            </p>
            <p className='mt-1 text-lg font-bold text-red-600'>
              {alert.daysDelayed} days
            </p>
          </div>
        </div>
        <div className='rounded-lg border p-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <p className='text-muted-foreground text-[10px] uppercase'>
                Counterparty
              </p>
              <p className='mt-0.5 font-medium'>{details.counterparty}</p>
            </div>
            <div>
              <p className='text-muted-foreground text-[10px] uppercase'>
                Tenure
              </p>
              <p className='mt-0.5 font-medium'>{details.tenure}</p>
            </div>
          </div>
        </div>
        <div className='rounded-lg bg-green-50 p-4 dark:bg-green-950/30'>
          <div className='mb-3 flex items-center gap-2'>
            <TrendingUp className='h-4 w-4 text-green-600' />
            <p className='text-xs font-semibold tracking-wider text-green-600 uppercase'>
              Expected Return
            </p>
          </div>
          <p className='text-2xl font-bold text-green-600'>
            {details.expectedReturn}% p.a.
          </p>
        </div>
        <div className='bg-muted/50 rounded-lg p-4'>
          <p className='text-muted-foreground mb-3 text-xs tracking-wider uppercase'>
            Approval & Compliance
          </p>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <p className='text-muted-foreground text-[10px] uppercase'>
                Approval Authority
              </p>
              <p className='mt-0.5 font-medium'>{details.approvalAuthority}</p>
            </div>
            <div>
              <p className='text-muted-foreground text-[10px] uppercase'>
                Approval Limit
              </p>
              <p className='mt-0.5 font-medium'>₹{details.approvalLimit} CR</p>
            </div>
            <div>
              <p className='text-muted-foreground text-[10px] uppercase'>
                Status
              </p>
              <Badge
                variant={
                  details.status === 'Escalated' ? 'destructive' : 'secondary'
                }
                className='mt-0.5'
              >
                {details.status}
              </Badge>
            </div>
            <div>
              <p className='text-muted-foreground text-[10px] uppercase'>
                DOA Compliance
              </p>
              <div className='mt-0.5 flex items-center gap-2'>
                {details.doaCompliance ? (
                  <>
                    <CheckCircle2 className='h-4 w-4 text-green-500' />
                    <span className='font-medium text-green-600'>Yes</span>
                  </>
                ) : (
                  <>
                    <X className='h-4 w-4 text-red-500' />
                    <span className='font-medium text-red-600'>No</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Cheque Signing Authority Details
  if (
    alert.treasuryType === 'Change in Bank Signatories' &&
    alert.chequeSigningDetails
  ) {
    const details = alert.chequeSigningDetails;
    return (
      <>
        <div className='rounded-lg border p-4'>
          <p className='text-muted-foreground mb-2 text-xs tracking-wider uppercase'>
            Cheque Amount Range
          </p>
          <div className='flex items-center gap-3'>
            <div className='flex-1 rounded-md bg-amber-50 p-3 text-center dark:bg-amber-950/30'>
              <p className='text-muted-foreground text-[10px] uppercase'>
                Minimum
              </p>
              <p className='text-lg font-bold'>
                ₹{details.chequeAmountRange.min} CR
              </p>
            </div>
            <ArrowUpRight className='h-5 w-5 rotate-45 text-amber-500' />
            <div className='flex-1 rounded-md bg-amber-50 p-3 text-center dark:bg-amber-950/30'>
              <p className='text-muted-foreground text-[10px] uppercase'>
                Maximum
              </p>
              <p className='text-lg font-bold'>
                ₹{details.chequeAmountRange.max} CR
              </p>
            </div>
          </div>
        </div>
        <div className='rounded-lg bg-blue-50 p-4 dark:bg-blue-950/30'>
          <div className='mb-3 flex items-center gap-2'>
            <Users className='h-4 w-4 text-blue-600' />
            <p className='text-xs font-semibold tracking-wider text-blue-600 uppercase'>
              Signatories Required
            </p>
          </div>
          <p className='text-2xl font-bold text-blue-600'>
            {details.numberOfSignatoriesRequired}
          </p>
        </div>
        <div className='rounded-lg border p-4'>
          <p className='text-muted-foreground mb-2 text-xs tracking-wider uppercase'>
            Authorized Signatories
          </p>
          <div className='space-y-2'>
            {details.authorizedSignatories.map((signatory, index) => (
              <div
                key={index}
                className='bg-muted/50 flex items-center gap-2 rounded-md p-2'
              >
                <div className='flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-600'>
                  {index + 1}
                </div>
                <span className='text-sm font-medium'>{signatory}</span>
              </div>
            ))}
          </div>
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <div className='rounded-lg border p-3'>
            <div className='mb-2 flex items-center gap-2'>
              <Calendar className='text-muted-foreground h-4 w-4' />
              <p className='text-muted-foreground text-[10px] uppercase'>
                Valid From
              </p>
            </div>
            <p className='font-medium'>{details.validFrom}</p>
          </div>
          <div className='rounded-lg border p-3'>
            <div className='mb-2 flex items-center gap-2'>
              <Calendar className='text-muted-foreground h-4 w-4' />
              <p className='text-muted-foreground text-[10px] uppercase'>
                Valid To
              </p>
            </div>
            <p className='font-medium'>{details.validTo}</p>
          </div>
        </div>
        <div className='bg-muted/50 rounded-lg p-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <p className='text-muted-foreground text-[10px] uppercase'>
                Bank Name
              </p>
              <p className='mt-0.5 font-medium'>{details.bankName}</p>
            </div>
            <div>
              <p className='text-muted-foreground text-[10px] uppercase'>
                Account Number
              </p>
              <p className='mt-0.5 font-medium'>{details.accountNumber}</p>
            </div>
            <div className='col-span-2'>
              <p className='text-muted-foreground text-[10px] uppercase'>
                DOA Level
              </p>
              <Badge variant='outline' className='mt-0.5'>
                {details.doaLevel}
              </Badge>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Bank Signatory Change Details
  if (
    alert.treasuryType === 'Change in Bank Signatories' &&
    alert.bankSignatoryChangeDetails
  ) {
    const details = alert.bankSignatoryChangeDetails;
    return (
      <>
        <div className='rounded-lg border p-4'>
          <p className='text-muted-foreground mb-2 text-xs tracking-wider uppercase'>
            Signatory Change
          </p>
          <div className='flex items-center gap-3'>
            <div className='flex-1 rounded-md bg-red-50 p-3 dark:bg-red-950/30'>
              <p className='text-muted-foreground text-[10px] uppercase'>
                Old Signatory
              </p>
              <p className='text-sm font-medium text-red-600'>
                {details.oldSignatory}
              </p>
            </div>
            <ArrowUpRight className='h-5 w-5 rotate-45 text-blue-500' />
            <div className='flex-1 rounded-md bg-green-50 p-3 dark:bg-green-950/30'>
              <p className='text-muted-foreground text-[10px] uppercase'>
                New Signatory
              </p>
              <p className='text-sm font-medium text-green-600'>
                {details.newSignatory}
              </p>
            </div>
          </div>
        </div>
        <div className='rounded-lg bg-amber-50 p-4 dark:bg-amber-950/30'>
          <div className='mb-2 flex items-center gap-2'>
            <AlertTriangle className='h-4 w-4 text-amber-600' />
            <p className='text-xs font-semibold tracking-wider text-amber-600 uppercase'>
              Reason for Change
            </p>
          </div>
          <p className='text-sm'>{details.reasonForChange}</p>
        </div>
        <div className='grid grid-cols-2 gap-4 rounded-lg border p-4'>
          <div>
            <p className='text-muted-foreground text-[10px] uppercase'>
              Bank Name
            </p>
            <p className='mt-0.5 font-medium'>{details.bankName}</p>
          </div>
          <div>
            <p className='text-muted-foreground text-[10px] uppercase'>
              Account Number
            </p>
            <p className='mt-0.5 font-medium'>{details.accountNumber}</p>
          </div>
        </div>
        <div className='bg-muted/50 rounded-lg p-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <p className='text-muted-foreground text-[10px] uppercase'>
                Approved By
              </p>
              <p className='mt-0.5 font-medium'>{details.approvedBy}</p>
            </div>
            <div>
              <p className='text-muted-foreground text-[10px] uppercase'>
                Effective Date
              </p>
              <p className='mt-0.5 font-medium'>{details.effectiveDate}</p>
            </div>
            <div>
              <p className='text-muted-foreground text-[10px] uppercase'>
                Status
              </p>
              <Badge
                variant={details.status === 'Pending' ? 'secondary' : 'default'}
                className='mt-0.5'
              >
                {details.status}
              </Badge>
            </div>
            <div>
              <p className='text-muted-foreground text-[10px] uppercase'>
                Days Delayed
              </p>
              <p className='mt-0.5 text-lg font-bold text-red-600'>
                {alert.daysDelayed} days
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Default/Generic Details (for Guarantee and others without specific details)
  return (
    <>
      <div className='grid grid-cols-2 gap-4 rounded-lg border p-4'>
        <div>
          <p className='text-muted-foreground text-xs tracking-wider uppercase'>
            Transaction Value
          </p>
          <p className='mt-1 text-xl font-bold'>₹{alert.value} CR</p>
        </div>
        <div>
          <p className='text-muted-foreground text-xs tracking-wider uppercase'>
            Treasury Type
          </p>
          <div className='mt-1 flex items-center gap-2'>
            <Badge variant='outline' className='font-medium'>
              {alert.treasuryType}
            </Badge>
          </div>
        </div>
        <div>
          <p className='text-muted-foreground text-xs tracking-wider uppercase'>
            Stuck At Stage
          </p>
          <p className='mt-1 font-semibold text-amber-600'>
            {alert.approvalStage}
          </p>
        </div>
        <div>
          <p className='text-muted-foreground text-xs tracking-wider uppercase'>
            Days Delayed
          </p>
          <p className='mt-1 text-xl font-bold text-red-600'>
            {alert.daysDelayed} days
          </p>
        </div>
      </div>
      <div className='bg-muted/50 grid grid-cols-2 gap-4 rounded-lg p-4'>
        <div>
          <p className='text-muted-foreground text-xs tracking-wider uppercase'>
            Requested By
          </p>
          <p className='mt-1 font-medium'>{alert.requestedBy}</p>
        </div>
        <div>
          <p className='text-muted-foreground text-xs tracking-wider uppercase'>
            Escalated To
          </p>
          <p className='mt-1 font-medium text-red-600'>{alert.escalatedTo}</p>
        </div>
      </div>
    </>
  );
};

// KPI Data Type
type KPIData = {
  totalTransactions: { count: number; value: number };
  approved: { count: number; value: number };
  pending: { count: number; value: number };
  exceedingDOA: { count: number; value: number };
  highRisk: { count: number; value: number };
  trend: number;
  avgWait: number;
  oldest: number;
};

// KPI Data by time period and transaction type
const kpiDataByPeriodAndType: Record<string, Record<string, KPIData>> = {
  CM: {
    all: {
      totalTransactions: { count: 24, value: 194.9 },
      approved: { count: 18, value: 156.3 },
      pending: { count: 4, value: 28.7 },
      exceedingDOA: { count: 1, value: 6.2 },
      highRisk: { count: 1, value: 3.7 },
      trend: 5.4,
      avgWait: 1.2,
      oldest: 3
    },
    'Bank Transfers': {
      totalTransactions: { count: 12, value: 78.4 },
      approved: { count: 10, value: 65.2 },
      pending: { count: 1, value: 8.5 },
      exceedingDOA: { count: 0, value: 0 },
      highRisk: { count: 1, value: 4.7 },
      trend: 4.2,
      avgWait: 0.8,
      oldest: 2
    },
    'Loan Agreements': {
      totalTransactions: { count: 4, value: 68.5 },
      approved: { count: 2, value: 45.2 },
      pending: { count: 2, value: 23.3 },
      exceedingDOA: { count: 1, value: 12.5 },
      highRisk: { count: 0, value: 0 },
      trend: 8.6,
      avgWait: 2.4,
      oldest: 5
    },
    'Investment Creations': {
      totalTransactions: { count: 5, value: 32.8 },
      approved: { count: 4, value: 28.4 },
      pending: { count: 1, value: 4.4 },
      exceedingDOA: { count: 0, value: 0 },
      highRisk: { count: 0, value: 0 },
      trend: 3.8,
      avgWait: 1.0,
      oldest: 2
    },
    'Change in Bank Signatories': {
      totalTransactions: { count: 2, value: 12.4 },
      approved: { count: 1, value: 8.2 },
      pending: { count: 0, value: 0 },
      exceedingDOA: { count: 0, value: 0 },
      highRisk: { count: 0, value: 0 },
      trend: 2.1,
      avgWait: 0.5,
      oldest: 1
    },
    'Loan Borrowing': {
      totalTransactions: { count: 1, value: 2.8 },
      approved: { count: 1, value: 2.8 },
      pending: { count: 0, value: 0 },
      exceedingDOA: { count: 0, value: 0 },
      highRisk: { count: 0, value: 0 },
      trend: 1.2,
      avgWait: 0.3,
      oldest: 1
    }
  },
  '3M': {
    all: {
      totalTransactions: { count: 68, value: 524.8 },
      approved: { count: 52, value: 398.2 },
      pending: { count: 11, value: 89.4 },
      exceedingDOA: { count: 3, value: 24.1 },
      highRisk: { count: 2, value: 13.1 },
      trend: 8.2,
      avgWait: 1.8,
      oldest: 4
    },
    'Bank Transfers': {
      totalTransactions: { count: 32, value: 186.5 },
      approved: { count: 28, value: 162.4 },
      pending: { count: 3, value: 18.2 },
      exceedingDOA: { count: 1, value: 5.9 },
      highRisk: { count: 0, value: 0 },
      trend: 6.4,
      avgWait: 1.2,
      oldest: 3
    },
    'Loan Agreements': {
      totalTransactions: { count: 12, value: 198.6 },
      approved: { count: 8, value: 142.5 },
      pending: { count: 3, value: 42.8 },
      exceedingDOA: { count: 1, value: 13.3 },
      highRisk: { count: 1, value: 8.4 },
      trend: 12.8,
      avgWait: 3.2,
      oldest: 6
    },
    'Investment Creations': {
      totalTransactions: { count: 14, value: 92.4 },
      approved: { count: 10, value: 68.2 },
      pending: { count: 3, value: 18.6 },
      exceedingDOA: { count: 1, value: 5.6 },
      highRisk: { count: 1, value: 4.7 },
      trend: 7.2,
      avgWait: 1.8,
      oldest: 4
    },
    'Change in Bank Signatories': {
      totalTransactions: { count: 6, value: 32.5 },
      approved: { count: 4, value: 18.6 },
      pending: { count: 1, value: 6.2 },
      exceedingDOA: { count: 0, value: 0 },
      highRisk: { count: 0, value: 0 },
      trend: 4.5,
      avgWait: 1.0,
      oldest: 2
    },
    'Loan Borrowing': {
      totalTransactions: { count: 4, value: 14.8 },
      approved: { count: 2, value: 6.5 },
      pending: { count: 1, value: 3.6 },
      exceedingDOA: { count: 0, value: 0 },
      highRisk: { count: 0, value: 0 },
      trend: 3.2,
      avgWait: 1.4,
      oldest: 3
    }
  },
  '6M': {
    all: {
      totalTransactions: { count: 142, value: 1089.3 },
      approved: { count: 108, value: 824.6 },
      pending: { count: 24, value: 178.2 },
      exceedingDOA: { count: 6, value: 52.4 },
      highRisk: { count: 4, value: 34.1 },
      trend: 10.6,
      avgWait: 2.1,
      oldest: 5
    },
    'Bank Transfers': {
      totalTransactions: { count: 68, value: 412.8 },
      approved: { count: 58, value: 356.4 },
      pending: { count: 8, value: 42.6 },
      exceedingDOA: { count: 2, value: 13.8 },
      highRisk: { count: 1, value: 8.2 },
      trend: 8.4,
      avgWait: 1.6,
      oldest: 4
    },
    'Loan Agreements': {
      totalTransactions: { count: 24, value: 386.2 },
      approved: { count: 16, value: 268.4 },
      pending: { count: 6, value: 86.5 },
      exceedingDOA: { count: 2, value: 31.3 },
      highRisk: { count: 2, value: 18.6 },
      trend: 14.2,
      avgWait: 3.6,
      oldest: 8
    },
    'Investment Creations': {
      totalTransactions: { count: 28, value: 186.5 },
      approved: { count: 22, value: 142.8 },
      pending: { count: 5, value: 32.4 },
      exceedingDOA: { count: 1, value: 11.3 },
      highRisk: { count: 1, value: 7.3 },
      trend: 9.8,
      avgWait: 2.2,
      oldest: 5
    },
    'Change in Bank Signatories': {
      totalTransactions: { count: 14, value: 68.4 },
      approved: { count: 8, value: 38.2 },
      pending: { count: 3, value: 12.5 },
      exceedingDOA: { count: 1, value: 6.0 },
      highRisk: { count: 0, value: 0 },
      trend: 6.2,
      avgWait: 1.8,
      oldest: 4
    },
    'Loan Borrowing': {
      totalTransactions: { count: 8, value: 35.4 },
      approved: { count: 4, value: 18.8 },
      pending: { count: 2, value: 4.2 },
      exceedingDOA: { count: 0, value: 0 },
      highRisk: { count: 0, value: 0 },
      trend: 4.8,
      avgWait: 2.0,
      oldest: 4
    }
  },
  '12M': {
    all: {
      totalTransactions: { count: 247, value: 1842.6 },
      approved: { count: 189, value: 1456.3 },
      pending: { count: 38, value: 287.4 },
      exceedingDOA: { count: 12, value: 64.8 },
      highRisk: { count: 8, value: 34.1 },
      trend: 12.4,
      avgWait: 2.3,
      oldest: 5
    },
    'Bank Transfers': {
      totalTransactions: { count: 124, value: 724.6 },
      approved: { count: 108, value: 628.4 },
      pending: { count: 12, value: 72.5 },
      exceedingDOA: { count: 3, value: 18.2 },
      highRisk: { count: 2, value: 12.4 },
      trend: 10.2,
      avgWait: 1.8,
      oldest: 4
    },
    'Loan Agreements': {
      totalTransactions: { count: 42, value: 642.8 },
      approved: { count: 28, value: 456.2 },
      pending: { count: 10, value: 142.6 },
      exceedingDOA: { count: 4, value: 44.0 },
      highRisk: { count: 4, value: 28.5 },
      trend: 16.8,
      avgWait: 4.2,
      oldest: 10
    },
    'Investment Creations': {
      totalTransactions: { count: 48, value: 312.4 },
      approved: { count: 36, value: 248.6 },
      pending: { count: 9, value: 48.2 },
      exceedingDOA: { count: 3, value: 15.6 },
      highRisk: { count: 2, value: 9.8 },
      trend: 11.4,
      avgWait: 2.4,
      oldest: 6
    },
    'Change in Bank Signatories': {
      totalTransactions: { count: 21, value: 108.6 },
      approved: { count: 12, value: 82.4 },
      pending: { count: 4, value: 16.8 },
      exceedingDOA: { count: 2, value: 9.4 },
      highRisk: { count: 0, value: 0 },
      trend: 8.6,
      avgWait: 2.0,
      oldest: 5
    },
    'Loan Borrowing': {
      totalTransactions: { count: 12, value: 54.2 },
      approved: { count: 5, value: 40.7 },
      pending: { count: 3, value: 7.3 },
      exceedingDOA: { count: 0, value: 0 },
      highRisk: { count: 0, value: 0 },
      trend: 6.4,
      avgWait: 2.6,
      oldest: 5
    }
  },
  YTD: {
    all: {
      totalTransactions: { count: 228, value: 1702.4 },
      approved: { count: 174, value: 1342.8 },
      pending: { count: 36, value: 268.2 },
      exceedingDOA: { count: 11, value: 58.6 },
      highRisk: { count: 7, value: 32.8 },
      trend: 11.8,
      avgWait: 2.2,
      oldest: 5
    },
    'Bank Transfers': {
      totalTransactions: { count: 112, value: 658.4 },
      approved: { count: 98, value: 572.6 },
      pending: { count: 10, value: 64.2 },
      exceedingDOA: { count: 3, value: 16.8 },
      highRisk: { count: 2, value: 10.6 },
      trend: 9.6,
      avgWait: 1.6,
      oldest: 4
    },
    'Loan Agreements': {
      totalTransactions: { count: 38, value: 586.4 },
      approved: { count: 26, value: 412.8 },
      pending: { count: 9, value: 128.4 },
      exceedingDOA: { count: 4, value: 38.2 },
      highRisk: { count: 3, value: 22.4 },
      trend: 15.4,
      avgWait: 3.8,
      oldest: 9
    },
    'Investment Creations': {
      totalTransactions: { count: 46, value: 298.6 },
      approved: { count: 34, value: 236.4 },
      pending: { count: 9, value: 46.8 },
      exceedingDOA: { count: 2, value: 12.4 },
      highRisk: { count: 2, value: 8.6 },
      trend: 10.8,
      avgWait: 2.2,
      oldest: 5
    },
    'Change in Bank Signatories': {
      totalTransactions: { count: 20, value: 102.4 },
      approved: { count: 11, value: 78.6 },
      pending: { count: 5, value: 18.2 },
      exceedingDOA: { count: 2, value: 5.6 },
      highRisk: { count: 0, value: 0 },
      trend: 7.8,
      avgWait: 1.8,
      oldest: 4
    },
    'Loan Borrowing': {
      totalTransactions: { count: 12, value: 56.6 },
      approved: { count: 5, value: 42.4 },
      pending: { count: 3, value: 10.6 },
      exceedingDOA: { count: 0, value: 0 },
      highRisk: { count: 0, value: 0 },
      trend: 5.8,
      avgWait: 2.4,
      oldest: 5
    }
  }
};

// Transaction Timeline Data (Dec 2024 onwards)
const transactionTimelineData = [
  {
    date: 'Dec 2024',
    approved: 142.5,
    pending: 28.3,
    breached: 8.2,
    total: 179.0
  },
  {
    date: 'Jan 2025',
    approved: 156.8,
    pending: 32.1,
    breached: 12.4,
    total: 201.3
  },
  {
    date: 'Feb 2025',
    approved: 138.2,
    pending: 24.6,
    breached: 6.8,
    total: 169.6
  },
  {
    date: 'Mar 2025',
    approved: 168.4,
    pending: 38.2,
    breached: 9.5,
    total: 216.1
  },
  {
    date: 'Apr 2025',
    approved: 152.6,
    pending: 29.8,
    breached: 11.2,
    total: 193.6
  },
  {
    date: 'May 2025',
    approved: 175.3,
    pending: 35.4,
    breached: 7.6,
    total: 218.3
  },
  {
    date: 'Jun 2025',
    approved: 163.8,
    pending: 31.2,
    breached: 10.8,
    total: 205.8
  },
  {
    date: 'Jul 2025',
    approved: 178.2,
    pending: 28.6,
    breached: 8.4,
    total: 215.2
  },
  {
    date: 'Aug 2025',
    approved: 185.4,
    pending: 33.8,
    breached: 12.1,
    total: 231.3
  },
  {
    date: 'Sep 2025',
    approved: 172.6,
    pending: 36.2,
    breached: 9.8,
    total: 218.6
  },
  {
    date: 'Oct 2025',
    approved: 189.3,
    pending: 29.4,
    breached: 7.2,
    total: 225.9
  },
  {
    date: 'Nov 2025',
    approved: 168.5,
    pending: 32.8,
    breached: 11.5,
    total: 212.8
  },
  {
    date: 'Dec 2025',
    approved: 156.3,
    pending: 28.7,
    breached: 9.9,
    total: 194.9
  }
];

const transactionTimelineConfig: ChartConfig = {
  approved: {
    label: 'Approved',
    color: '#22c55e'
  },
  pending: {
    label: 'Pending',
    color: '#f59e0b'
  },
  breached: {
    label: 'Breached',
    color: '#ef4444'
  }
};

// Transaction type options for filter
const transactionTypeOptions = [
  { value: 'all', label: 'All Types' },
  { value: 'Bank Transfers', label: 'Bank Transfers' },
  { value: 'Loan Agreements', label: 'Loan Agreements' },
  { value: 'Investment Creations', label: 'Investment Creations' },
  { value: 'Change in Bank Signatories', label: 'Change in Bank Signatories' },
  { value: 'Loan Borrowing', label: 'Loan Borrowing' }
];

export default function TreasuryManagementPage() {
  const [cardsPeriod, setCardsPeriod] = React.useState('12M');
  const [chartPeriod, setChartPeriod] = React.useState('12M');
  const [transactionType, setTransactionType] = React.useState('all');
  const [selectedAlert, setSelectedAlert] =
    React.useState<EscalationAlert | null>(null);
  const [alertDateFilter, setAlertDateFilter] = React.useState('all');
  const [alertTypeFilter, setAlertTypeFilter] = React.useState('all');

  // Approval state
  const [approvalComment, setApprovalComment] = React.useState('');
  const [showApprovalForm, setShowApprovalForm] = React.useState(false);
  const [approvalAction, setApprovalAction] = React.useState<
    'approve' | 'reject' | null
  >(null);

  // Check if selected alert has pending approval
  const hasPendingApproval = selectedAlert?.approvalFlow.some(
    (step) => step.status === 'pending'
  );
  const pendingStep = selectedAlert?.approvalFlow.find(
    (step) => step.status === 'pending'
  );

  // Approval handlers
  const handleApprove = () => {
    if (!selectedAlert) return;
    console.log(
      'Approving:',
      selectedAlert.transactionId,
      'Comment:',
      approvalComment
    );
    setApprovalComment('');
    setShowApprovalForm(false);
    setApprovalAction(null);
    setSelectedAlert(null);
  };

  const handleReject = () => {
    if (!selectedAlert || !approvalComment.trim()) return;
    console.log(
      'Rejecting:',
      selectedAlert.transactionId,
      'Reason:',
      approvalComment
    );
    setApprovalComment('');
    setShowApprovalForm(false);
    setApprovalAction(null);
    setSelectedAlert(null);
  };

  const openApprovalForm = (action: 'approve' | 'reject') => {
    setApprovalAction(action);
    setShowApprovalForm(true);
  };

  const cancelApprovalForm = () => {
    setShowApprovalForm(false);
    setApprovalAction(null);
    setApprovalComment('');
  };

  // Filter alerts by selected alert filters
  const filteredAlerts = escalationAlerts.filter((alert) => {
    const matchesType =
      alertTypeFilter === 'all' || alert.treasuryType === alertTypeFilter;

    // Date filter based on daysDelayed
    let matchesDate = true;
    if (alertDateFilter === '7d') {
      matchesDate = alert.daysDelayed <= 7;
    } else if (alertDateFilter === '14d') {
      matchesDate = alert.daysDelayed <= 14;
    } else if (alertDateFilter === '30d') {
      matchesDate = alert.daysDelayed <= 30;
    } else if (alertDateFilter === '14d+') {
      matchesDate = alert.daysDelayed > 14;
    }

    return matchesType && matchesDate;
  });

  // Separate into Delay Escalations and Risk Escalations
  const delayAlerts = filteredAlerts
    .filter((alert) => !alert.isHighRisk)
    .sort((a, b) => b.daysDelayed - a.daysDelayed);
  const riskAlerts = filteredAlerts
    .filter((alert) => alert.isHighRisk)
    .sort((a, b) => b.daysDelayed - a.daysDelayed);

  // Get KPI data based on selected period and transaction type
  const kpiData = kpiDataByPeriodAndType[cardsPeriod][transactionType];
  const approvalRate =
    kpiData.totalTransactions.count > 0
      ? (
          (kpiData.approved.count / kpiData.totalTransactions.count) *
          100
        ).toFixed(1)
      : '0.0';
  const alertsCount = kpiData.exceedingDOA.count + kpiData.highRisk.count;
  const alertsValue = kpiData.exceedingDOA.value + kpiData.highRisk.value;

  // Filter timeline data based on selected period
  const getFilteredTimelineData = () => {
    switch (chartPeriod) {
      case 'CM':
        return transactionTimelineData.slice(-1);
      case '3M':
        return transactionTimelineData.slice(-3);
      case '6M':
        return transactionTimelineData.slice(-6);
      case 'YTD':
        return transactionTimelineData.filter((item) =>
          item.date.includes('2025')
        );
      case '12M':
      default:
        return transactionTimelineData;
    }
  };

  const filteredTimelineData = getFilteredTimelineData();

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
              Monitor transactions, approvals, and risk alerts
            </p>
          </div>
        </div>

        {/* KPI Cards */}
        <TooltipProvider>
          <div className='mb-2 flex items-center justify-between'>
            <h3 className='text-lg font-semibold'>Transaction Summary</h3>
            <div className='flex items-center gap-2'>
              <Select value={cardsPeriod} onValueChange={setCardsPeriod}>
                <SelectTrigger className='w-36'>
                  <SelectValue placeholder='Select Period' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='CM'>Current Month</SelectItem>
                  <SelectItem value='3M'>Last 3 Months</SelectItem>
                  <SelectItem value='6M'>Last 6 Months</SelectItem>
                  <SelectItem value='12M'>Last 12 Months</SelectItem>
                  <SelectItem value='YTD'>Year to Date</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={transactionType}
                onValueChange={setTransactionType}
              >
                <SelectTrigger className='w-44'>
                  <SelectValue placeholder='Transaction Type' />
                </SelectTrigger>
                <SelectContent>
                  {transactionTypeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
            {/* Card 1: Transaction Overview */}
            <Card className='flex h-full flex-col p-5'>
              <div className='mb-3 flex h-8 items-start justify-between'>
                <div className='flex items-center gap-1'>
                  <h3 className='text-muted-foreground text-sm font-medium'>
                    Transaction Overview
                  </h3>
                  <UITooltip>
                    <TooltipTrigger asChild>
                      <Info className='text-muted-foreground/60 h-3 w-3 cursor-help' />
                    </TooltipTrigger>
                    <TooltipContent side='top' className='max-w-xs'>
                      <p className='text-xs'>
                        Total treasury transactions processed in the selected
                        period with cumulative value.
                      </p>
                    </TooltipContent>
                  </UITooltip>
                </div>
                <div className='rounded-full bg-blue-100 p-1.5 dark:bg-blue-950/30'>
                  <Receipt className='h-3.5 w-3.5 text-blue-600 dark:text-blue-400' />
                </div>
              </div>
              <div className='flex flex-1 flex-col'>
                <div className='mb-1 flex items-end gap-1'>
                  <span className='text-2xl leading-none font-bold'>
                    ₹{kpiData.totalTransactions.value}
                  </span>
                  <span className='text-muted-foreground mb-0.5 text-sm'>
                    CR
                  </span>
                </div>
                <p className='text-muted-foreground text-xs'>
                  {kpiData.totalTransactions.count} transactions
                </p>
                <div className='mt-3 flex items-center gap-1 border-t pt-3'>
                  <TrendingUp className='h-3 w-3 text-green-500' />
                  <span className='text-xs text-green-600'>
                    +{kpiData.trend}%
                  </span>
                  <span className='text-muted-foreground text-xs'>
                    vs last month
                  </span>
                </div>
              </div>
            </Card>

            {/* Card 2: Approval Status */}
            <Card className='flex h-full flex-col p-5'>
              <div className='mb-3 flex h-8 items-start justify-between'>
                <div className='flex items-center gap-1'>
                  <h3 className='text-muted-foreground text-sm font-medium'>
                    Approval Status
                  </h3>
                  <UITooltip>
                    <TooltipTrigger asChild>
                      <Info className='text-muted-foreground/60 h-3 w-3 cursor-help' />
                    </TooltipTrigger>
                    <TooltipContent side='top' className='max-w-xs'>
                      <p className='text-xs'>
                        Breakdown of approved vs pending transactions. Shows
                        approval rate and pending value requiring action.
                      </p>
                    </TooltipContent>
                  </UITooltip>
                </div>
                <div className='rounded-full bg-green-100 p-1.5 dark:bg-green-950/30'>
                  <CheckCircle2 className='h-3.5 w-3.5 text-green-600 dark:text-green-400' />
                </div>
              </div>
              <div className='flex flex-1 flex-col'>
                <div className='mb-1 flex items-end gap-1'>
                  <span className='text-2xl leading-none font-bold'>
                    {approvalRate}%
                  </span>
                  <span className='text-muted-foreground mb-0.5 text-sm'>
                    approved
                  </span>
                </div>
                <div className='mt-2 mb-2'>
                  <div className='flex gap-1'>
                    <div
                      className='h-2 rounded-l bg-green-500'
                      style={{ width: `${approvalRate}%` }}
                    />
                    <div
                      className='h-2 rounded-r bg-amber-400'
                      style={{ width: `${100 - parseFloat(approvalRate)}%` }}
                    />
                  </div>
                </div>
                <div className='flex justify-between text-xs'>
                  <span className='flex items-center gap-1'>
                    <span className='h-2 w-2 rounded-sm bg-green-500' />
                    <span className='text-muted-foreground'>
                      {kpiData.approved.count} approved
                    </span>
                  </span>
                  <span className='flex items-center gap-1'>
                    <span className='h-2 w-2 rounded-sm bg-amber-400' />
                    <span className='text-muted-foreground'>
                      {kpiData.pending.count} pending
                    </span>
                  </span>
                </div>
              </div>
            </Card>

            {/* Card 3: Pending Actions */}
            <Card className='flex h-full flex-col p-5'>
              <div className='mb-3 flex h-8 items-start justify-between'>
                <div className='flex items-center gap-1'>
                  <h3 className='text-muted-foreground text-sm font-medium'>
                    Pending Actions
                  </h3>
                  <UITooltip>
                    <TooltipTrigger asChild>
                      <Info className='text-muted-foreground/60 h-3 w-3 cursor-help' />
                    </TooltipTrigger>
                    <TooltipContent side='top' className='max-w-xs'>
                      <p className='text-xs'>
                        Transactions awaiting approval. Includes value at stake
                        and average pending time.
                      </p>
                    </TooltipContent>
                  </UITooltip>
                </div>
                <div className='rounded-full bg-amber-100 p-1.5 dark:bg-amber-950/30'>
                  <Clock className='h-3.5 w-3.5 text-amber-600 dark:text-amber-400' />
                </div>
              </div>
              <div className='flex flex-1 flex-col'>
                <div className='mb-1 flex items-end gap-1'>
                  <span className='text-2xl leading-none font-bold text-amber-600'>
                    {kpiData.pending.count}
                  </span>
                  <span className='text-muted-foreground mb-0.5 text-sm'>
                    pending
                  </span>
                </div>
                <p className='text-muted-foreground text-xs'>
                  ₹{kpiData.pending.value} CR awaiting approval
                </p>
                <div className='mt-3 grid grid-cols-2 gap-2 border-t pt-3'>
                  <div>
                    <p className='text-muted-foreground text-[11px]'>
                      Avg. Wait
                    </p>
                    <p className='text-xs font-semibold'>
                      {kpiData.avgWait} days
                    </p>
                  </div>
                  <div>
                    <p className='text-muted-foreground text-[11px]'>Oldest</p>
                    <p className='text-xs font-semibold text-amber-600'>
                      {kpiData.oldest} days
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Card 4: Risk Alerts */}
            <Card className='flex h-full flex-col p-5'>
              <div className='mb-3 flex h-8 items-start justify-between'>
                <div className='flex items-center gap-1'>
                  <h3 className='text-muted-foreground text-sm font-medium'>
                    Risk Alerts
                  </h3>
                  <UITooltip>
                    <TooltipTrigger asChild>
                      <Info className='text-muted-foreground/60 h-3 w-3 cursor-help' />
                    </TooltipTrigger>
                    <TooltipContent side='top' className='max-w-xs'>
                      <p className='text-xs'>
                        Transactions requiring attention - either exceeding DOA
                        limits or flagged as high risk.
                      </p>
                    </TooltipContent>
                  </UITooltip>
                </div>
                <div className='rounded-full bg-red-100 p-1.5 dark:bg-red-950/30'>
                  <ShieldAlert className='h-3.5 w-3.5 text-red-600 dark:text-red-400' />
                </div>
              </div>
              <div className='flex flex-1 flex-col'>
                <div className='mb-1 flex items-end gap-1'>
                  <span className='text-2xl leading-none font-bold text-red-600'>
                    {alertsCount}
                  </span>
                  <span className='text-muted-foreground mb-0.5 text-sm'>
                    alerts
                  </span>
                </div>
                <p className='text-muted-foreground text-xs'>
                  ₹{alertsValue.toFixed(1)} CR requires review
                </p>
                <div className='mt-3 grid grid-cols-2 gap-2 border-t pt-3'>
                  <div>
                    <p className='text-muted-foreground text-[11px]'>
                      Exceeding DOA
                    </p>
                    <p className='text-xs font-semibold text-orange-600'>
                      {kpiData.exceedingDOA.count}
                    </p>
                  </div>
                  <div>
                    <p className='text-muted-foreground text-[11px]'>
                      High Risk
                    </p>
                    <p className='text-xs font-semibold text-red-600'>
                      {kpiData.highRisk.count}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TooltipProvider>

        {/* Transaction Timeline Chart */}
        <Card>
          <CardHeader className='flex flex-row items-center justify-between'>
            <div>
              <CardTitle className='flex items-center gap-2'>
                <TrendingUp className='h-5 w-5 text-blue-500' />
                Transaction Timeline
              </CardTitle>
              <CardDescription>
                Monthly transaction values by status (in CR)
              </CardDescription>
            </div>
            <Select value={chartPeriod} onValueChange={setChartPeriod}>
              <SelectTrigger className='w-36'>
                <SelectValue placeholder='Select Period' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='CM'>Current Month</SelectItem>
                <SelectItem value='3M'>Last 3 Months</SelectItem>
                <SelectItem value='6M'>Last 6 Months</SelectItem>
                <SelectItem value='12M'>Last 12 Months</SelectItem>
                <SelectItem value='YTD'>Year to Date</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={transactionTimelineConfig}
              className='h-[300px] w-full'
            >
              <ResponsiveContainer width='100%' height='100%'>
                <LineChart
                  data={filteredTimelineData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray='3 3'
                    className='stroke-muted/30'
                  />
                  <XAxis
                    dataKey='date'
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => `₹${value}`}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        const total = payload.reduce(
                          (sum, entry) => sum + (entry.value as number),
                          0
                        );
                        return (
                          <div className='bg-background rounded-lg border p-3 shadow-lg'>
                            <p className='mb-2 font-medium'>{label}</p>
                            <div className='space-y-1'>
                              {payload.map((entry, index) => (
                                <div
                                  key={index}
                                  className='flex items-center justify-between gap-4 text-sm'
                                >
                                  <div className='flex items-center gap-2'>
                                    <div
                                      className='h-3 w-3 rounded-full'
                                      style={{ backgroundColor: entry.color }}
                                    />
                                    <span className='text-muted-foreground'>
                                      {entry.name}
                                    </span>
                                  </div>
                                  <span className='font-medium'>
                                    ₹{(entry.value as number).toFixed(1)} CR
                                  </span>
                                </div>
                              ))}
                            </div>
                            <div className='mt-2 flex items-center justify-between border-t pt-2 text-sm'>
                              <span className='font-medium'>Total</span>
                              <span className='font-bold'>
                                ₹{total.toFixed(1)} CR
                              </span>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend />
                  <Line
                    type='monotone'
                    dataKey='approved'
                    stroke='#22c55e'
                    strokeWidth={2}
                    dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#22c55e', strokeWidth: 2 }}
                    name='Approved'
                  />
                  <Line
                    type='monotone'
                    dataKey='pending'
                    stroke='#f59e0b'
                    strokeWidth={2}
                    dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#f59e0b', strokeWidth: 2 }}
                    name='Pending'
                  />
                  <Line
                    type='monotone'
                    dataKey='breached'
                    stroke='#ef4444'
                    strokeWidth={2}
                    dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#ef4444', strokeWidth: 2 }}
                    name='Breached'
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Alerts & Escalation Section */}
        <Card>
          <CardHeader className='pb-3'>
            <CardTitle className='flex items-center justify-between text-base'>
              <span className='flex items-center gap-2'>
                <ShieldAlert className='h-5 w-5 text-red-500' />
                Alerts & Escalation
                <UITooltip>
                  <TooltipTrigger asChild>
                    <Info className='text-muted-foreground/60 h-4 w-4 cursor-help' />
                  </TooltipTrigger>
                  <TooltipContent side='top' className='max-w-xs'>
                    <p className='text-xs'>
                      This section highlights transactions requiring immediate
                      attention due to approval delays or policy breaches.
                      Alerts help identify bottlenecks in the approval workflow.
                    </p>
                  </TooltipContent>
                </UITooltip>
              </span>
              <div className='flex items-center gap-2'>
                <Select
                  value={alertDateFilter}
                  onValueChange={setAlertDateFilter}
                >
                  <SelectTrigger className='h-8 w-32 text-xs'>
                    <SelectValue placeholder='Date Range' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>All Dates</SelectItem>
                    <SelectItem value='7d'>Up to 7 Days</SelectItem>
                    <SelectItem value='14d'>Up to 14 Days</SelectItem>
                    <SelectItem value='14d+'>Beyond 14 Days</SelectItem>
                    <SelectItem value='30d'>Up to 30 Days</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={alertTypeFilter}
                  onValueChange={setAlertTypeFilter}
                >
                  <SelectTrigger className='h-8 w-48 text-xs'>
                    <SelectValue placeholder='Type' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>All Types</SelectItem>
                    <SelectItem value='Bank Transfers'>
                      Bank Transfers
                    </SelectItem>
                    <SelectItem value='Loan Agreements'>
                      Loan Agreements
                    </SelectItem>
                    <SelectItem value='Investment Creations'>
                      Investment Creations
                    </SelectItem>
                    <SelectItem value='Change in Bank Signatories'>
                      Change in Bank Signatories
                    </SelectItem>
                    <SelectItem value='Loan Borrowing'>
                      Loan Borrowing
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Badge variant='destructive' className='text-xs'>
                  {filteredAlerts.length} Alerts
                </Badge>
              </div>
            </CardTitle>
            <CardDescription>
              Click on an alert to view detailed information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid gap-4 md:grid-cols-2'>
              {/* Delay Escalations */}
              <div className='rounded-lg border p-4'>
                <div className='mb-3 flex items-center gap-2'>
                  <Clock className='h-4 w-4 text-amber-500' />
                  <span className='text-sm font-semibold tracking-wider text-amber-600 uppercase'>
                    Delay Escalations
                  </span>
                  <UITooltip>
                    <TooltipTrigger asChild>
                      <Info className='text-muted-foreground/60 h-3.5 w-3.5 cursor-help' />
                    </TooltipTrigger>
                    <TooltipContent side='top' className='max-w-xs'>
                      <p className='text-xs'>
                        Transactions escalated due to approval delays. Items
                        pending beyond threshold are automatically flagged for
                        senior management review.
                      </p>
                    </TooltipContent>
                  </UITooltip>
                  <Badge
                    variant='secondary'
                    className='ml-auto bg-amber-100 text-xs text-amber-700'
                  >
                    {delayAlerts.length}
                  </Badge>
                </div>
                <ScrollArea className='h-[300px]'>
                  <div className='space-y-2 pr-2'>
                    {delayAlerts.length > 0 ? (
                      delayAlerts.map((alert) => {
                        const IconComponent = getTreasuryIcon(
                          alert.treasuryType
                        );
                        const approvedCount = alert.approvalFlow.filter(
                          (s) => s.status === 'approved'
                        ).length;
                        const totalSteps = alert.approvalFlow.length;
                        return (
                          <div
                            key={alert.id}
                            onClick={() => setSelectedAlert(alert)}
                            className='cursor-pointer rounded-lg border p-3 transition-all hover:border-amber-300 hover:bg-amber-50/50 dark:hover:bg-amber-950/20'
                          >
                            <div className='flex items-start gap-3'>
                              <div className='rounded-lg bg-amber-100 p-2 dark:bg-amber-950/50'>
                                <IconComponent className='h-4 w-4 text-amber-600' />
                              </div>
                              <div className='min-w-0 flex-1'>
                                <div className='flex items-center justify-between'>
                                  <p className='truncate font-medium'>
                                    {alert.transactionId}
                                  </p>
                                  <span className='text-sm font-bold text-amber-600'>
                                    {alert.daysDelayed}d
                                  </span>
                                </div>
                                <p className='text-muted-foreground text-sm'>
                                  {alert.treasuryType}
                                </p>
                                <p className='mt-1 text-xs text-amber-600'>
                                  Stuck: {alert.approvalStage}
                                </p>
                                <div className='mt-2 flex items-center gap-2'>
                                  <div className='flex gap-0.5'>
                                    {alert.approvalFlow.map((step, idx) => (
                                      <div
                                        key={idx}
                                        className={`h-1.5 w-4 rounded-full ${
                                          step.status === 'approved'
                                            ? 'bg-green-500'
                                            : step.status === 'pending'
                                              ? 'bg-amber-500'
                                              : 'bg-gray-200'
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <span className='text-muted-foreground text-[10px]'>
                                    {approvedCount}/{totalSteps}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className='text-muted-foreground flex h-full items-center justify-center text-sm'>
                        No delay escalations
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </div>

              {/* Risk Escalations */}
              <div className='rounded-lg border border-red-200 bg-red-50/30 p-4 dark:bg-red-950/10'>
                <div className='mb-3 flex items-center gap-2'>
                  <ShieldAlert className='h-4 w-4 text-red-600' />
                  <span className='text-sm font-semibold tracking-wider text-red-600 uppercase'>
                    Risk Escalations
                  </span>
                  <UITooltip>
                    <TooltipTrigger asChild>
                      <Info className='text-muted-foreground/60 h-3.5 w-3.5 cursor-help' />
                    </TooltipTrigger>
                    <TooltipContent side='top' className='max-w-xs'>
                      <p className='text-xs'>
                        Transactions flagged as high risk by the request raiser.
                        These require immediate review due to potential
                        compliance, credit, or operational risks.
                      </p>
                    </TooltipContent>
                  </UITooltip>
                  <Badge variant='destructive' className='ml-auto text-xs'>
                    {riskAlerts.length}
                  </Badge>
                </div>
                <ScrollArea className='h-[300px]'>
                  <div className='space-y-2 pr-2'>
                    {riskAlerts.length > 0 ? (
                      riskAlerts.map((alert) => {
                        const IconComponent = getTreasuryIcon(
                          alert.treasuryType
                        );
                        const approvedCount = alert.approvalFlow.filter(
                          (s) => s.status === 'approved'
                        ).length;
                        const totalSteps = alert.approvalFlow.length;
                        return (
                          <div
                            key={alert.id}
                            onClick={() => setSelectedAlert(alert)}
                            className='cursor-pointer rounded-lg border border-red-300 bg-white p-3 transition-all hover:border-red-400 hover:bg-red-100/50 dark:bg-red-950/20 dark:hover:bg-red-950/30'
                          >
                            <div className='flex items-start gap-3'>
                              <div className='rounded-lg bg-red-100 p-2 dark:bg-red-950/50'>
                                <IconComponent className='h-4 w-4 text-red-600' />
                              </div>
                              <div className='min-w-0 flex-1'>
                                <div className='flex items-center justify-between'>
                                  <p className='truncate font-medium'>
                                    {alert.transactionId}
                                  </p>
                                  <Badge
                                    variant='destructive'
                                    className='px-1.5 py-0 text-[10px]'
                                  >
                                    HIGH RISK
                                  </Badge>
                                </div>
                                <p className='text-muted-foreground text-sm'>
                                  {alert.treasuryType}
                                </p>
                                {alert.riskComment && (
                                  <p className='mt-1 line-clamp-2 text-xs text-red-600'>
                                    {alert.riskComment}
                                  </p>
                                )}
                                <div className='mt-2 flex items-center gap-2'>
                                  <div className='flex gap-0.5'>
                                    {alert.approvalFlow.map((step, idx) => (
                                      <div
                                        key={idx}
                                        className={`h-1.5 w-4 rounded-full ${
                                          step.status === 'approved'
                                            ? 'bg-green-500'
                                            : step.status === 'pending'
                                              ? 'bg-amber-500'
                                              : 'bg-gray-200'
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <span className='text-muted-foreground text-[10px]'>
                                    {approvedCount}/{totalSteps}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className='text-muted-foreground flex h-full items-center justify-center text-sm'>
                        No risk escalations
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alert Details Dialog */}
        <Dialog
          open={!!selectedAlert}
          onOpenChange={(open) => !open && setSelectedAlert(null)}
        >
          <DialogContent className='max-h-[90vh] max-w-3xl overflow-hidden'>
            {selectedAlert && (
              <>
                <DialogHeader>
                  <div className='flex items-center gap-3'>
                    {(() => {
                      const IconComponent = getTreasuryIcon(
                        selectedAlert.treasuryType
                      );
                      return (
                        <div
                          className={`rounded-lg p-3 ${selectedAlert.isHighRisk ? 'bg-red-100 dark:bg-red-950/30' : 'bg-amber-100 dark:bg-amber-950/30'}`}
                        >
                          <IconComponent
                            className={`h-6 w-6 ${selectedAlert.isHighRisk ? 'text-red-600' : 'text-amber-600'}`}
                          />
                        </div>
                      );
                    })()}
                    <div className='flex-1'>
                      <div className='flex items-center gap-2'>
                        <DialogTitle className='text-xl'>
                          {selectedAlert.transactionId}
                        </DialogTitle>
                        {selectedAlert.isHighRisk && (
                          <Badge variant='destructive' className='text-xs'>
                            HIGH RISK
                          </Badge>
                        )}
                      </div>
                      <DialogDescription>
                        {selectedAlert.description}
                      </DialogDescription>
                    </div>
                    <div className='text-right'>
                      <p className='text-muted-foreground text-xs'>
                        Requested on
                      </p>
                      <p className='text-sm font-medium'>
                        {selectedAlert.requestedDate}
                      </p>
                    </div>
                  </div>
                </DialogHeader>
                <ScrollArea className='max-h-[65vh] pr-4'>
                  <div className='space-y-4 py-4'>
                    {/* Risk Comment Section for High Risk Alerts */}
                    {selectedAlert.isHighRisk && selectedAlert.riskComment && (
                      <div className='rounded-lg border border-red-300 bg-red-50 p-4 dark:bg-red-950/20'>
                        <div className='flex items-start gap-2'>
                          <ShieldAlert className='mt-0.5 h-5 w-5 shrink-0 text-red-600' />
                          <div>
                            <h3 className='text-sm font-semibold text-red-700 dark:text-red-400'>
                              Risk Alert
                            </h3>
                            <p className='mt-1 text-sm text-red-600 dark:text-red-300'>
                              {selectedAlert.riskComment}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Type-specific Details */}
                    <AlertDetailsContent alert={selectedAlert} />

                    {/* Approval Chronology Section */}
                    <div className='rounded-lg border p-4'>
                      <div className='mb-4 flex items-center gap-2'>
                        <ChevronRight className='h-4 w-4 text-blue-600' />
                        <h3 className='text-sm font-semibold tracking-wider text-blue-600 uppercase'>
                          Approval Chronology
                        </h3>
                      </div>
                      <div className='relative space-y-0'>
                        {selectedAlert.approvalFlow.map((step, index) => (
                          <div
                            key={step.id}
                            className='relative pb-4 last:pb-0'
                          >
                            {index < selectedAlert.approvalFlow.length - 1 && (
                              <div
                                className={`absolute top-7 left-3 h-[calc(100%-4px)] w-0.5 ${
                                  step.status === 'approved'
                                    ? 'bg-green-300'
                                    : step.status === 'rejected'
                                      ? 'bg-red-300'
                                      : 'bg-gray-200'
                                }`}
                              />
                            )}
                            <div className='flex gap-3'>
                              <div
                                className={`relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                                  step.status === 'approved'
                                    ? 'bg-green-100 text-green-600'
                                    : step.status === 'rejected'
                                      ? 'bg-red-100 text-red-600'
                                      : step.status === 'pending'
                                        ? 'bg-amber-100 text-amber-600'
                                        : 'bg-gray-100 text-gray-400'
                                }`}
                              >
                                {step.status === 'approved' ? (
                                  <CheckCircle2 className='h-3.5 w-3.5' />
                                ) : step.status === 'rejected' ? (
                                  <X className='h-3.5 w-3.5' />
                                ) : step.status === 'pending' ? (
                                  <Clock className='h-3.5 w-3.5' />
                                ) : (
                                  <div className='h-2 w-2 rounded-full bg-gray-300' />
                                )}
                              </div>
                              <div className='bg-background flex-1 rounded-lg border p-3'>
                                <div className='flex items-start justify-between gap-2'>
                                  <div>
                                    <p className='text-sm font-semibold'>
                                      {step.role}
                                    </p>
                                    <p className='text-muted-foreground text-xs'>
                                      {step.status === 'approved' ||
                                      step.status === 'rejected'
                                        ? step.authority
                                        : step.status === 'pending'
                                          ? 'Awaiting Approval'
                                          : 'Next in Queue'}
                                    </p>
                                  </div>
                                  <div className='shrink-0 text-right'>
                                    <Badge
                                      className={`px-1.5 py-0 text-[10px] ${
                                        step.status === 'approved'
                                          ? 'bg-green-600'
                                          : step.status === 'rejected'
                                            ? 'bg-red-600'
                                            : step.status === 'pending'
                                              ? 'bg-amber-600'
                                              : 'bg-gray-400'
                                      }`}
                                    >
                                      {step.status === 'approved'
                                        ? 'Approved'
                                        : step.status === 'rejected'
                                          ? 'Rejected'
                                          : step.status === 'pending'
                                            ? 'Pending'
                                            : 'Waiting'}
                                    </Badge>
                                    {step.date && step.time && (
                                      <p className='text-muted-foreground mt-1 text-[10px]'>
                                        {step.date} at {step.time}
                                      </p>
                                    )}
                                  </div>
                                </div>
                                {step.comment && (
                                  <p className='text-muted-foreground mt-2 border-t pt-2 text-xs italic'>
                                    &ldquo;{step.comment}&rdquo;
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Approval Actions - Show when pending approval exists */}
                    {hasPendingApproval && pendingStep && (
                      <div className='rounded-lg border-2 border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-950/30'>
                        <div className='mb-3 flex items-center gap-2'>
                          <Clock className='h-4 w-4 text-amber-600' />
                          <h3 className='text-sm font-semibold text-amber-700 dark:text-amber-400'>
                            Pending Approval
                          </h3>
                        </div>
                        <p className='mb-4 text-sm text-amber-600 dark:text-amber-400'>
                          Awaiting approval from:{' '}
                          <span className='font-semibold'>
                            {pendingStep.role}
                          </span>
                        </p>
                        {!showApprovalForm ? (
                          <div className='flex gap-3'>
                            <Button
                              className='flex-1 bg-green-600 hover:bg-green-700'
                              onClick={() => openApprovalForm('approve')}
                            >
                              <CheckCircle2 className='mr-2 h-4 w-4' />
                              Approve
                            </Button>
                            <Button
                              variant='destructive'
                              className='flex-1'
                              onClick={() => openApprovalForm('reject')}
                            >
                              <X className='mr-2 h-4 w-4' />
                              Reject
                            </Button>
                          </div>
                        ) : (
                          <div className='space-y-3'>
                            <div className='flex items-center gap-2'>
                              <Badge
                                className={
                                  approvalAction === 'approve'
                                    ? 'bg-green-600'
                                    : 'bg-red-600'
                                }
                              >
                                {approvalAction === 'approve'
                                  ? 'Approving'
                                  : 'Rejecting'}
                              </Badge>
                              <Button
                                variant='ghost'
                                size='sm'
                                className='h-7 text-xs'
                                onClick={cancelApprovalForm}
                              >
                                Cancel
                              </Button>
                            </div>
                            <Textarea
                              placeholder={
                                approvalAction === 'approve'
                                  ? 'Add approval comment (optional)...'
                                  : 'Rejection reason (required)...'
                              }
                              value={approvalComment}
                              onChange={(e) =>
                                setApprovalComment(e.target.value)
                              }
                              className='dark:bg-background min-h-[80px] resize-none bg-white'
                            />
                            <Button
                              className={`w-full ${approvalAction === 'approve' ? 'bg-green-600 hover:bg-green-700' : ''}`}
                              variant={
                                approvalAction === 'reject'
                                  ? 'destructive'
                                  : 'default'
                              }
                              onClick={
                                approvalAction === 'approve'
                                  ? handleApprove
                                  : handleReject
                              }
                              disabled={
                                approvalAction === 'reject' &&
                                !approvalComment.trim()
                              }
                            >
                              {approvalAction === 'approve' ? (
                                <>
                                  <CheckCircle2 className='mr-2 h-4 w-4' />
                                  Confirm Approval
                                </>
                              ) : (
                                <>
                                  <X className='mr-2 h-4 w-4' />
                                  Confirm Rejection
                                </>
                              )}
                            </Button>
                          </div>
                        )}
                      </div>
                    )}

                    <div className='flex flex-wrap items-center gap-2 pt-2'>
                      {selectedAlert.isFortnightly && (
                        <Badge variant='destructive' className='gap-1'>
                          <ArrowUpRight className='h-3 w-3' />
                          Fortnightly Escalation
                        </Badge>
                      )}
                      {selectedAlert.daysDelayed > 14 && (
                        <Badge variant='destructive'>Critical Delay</Badge>
                      )}
                      {selectedAlert.daysDelayed > 7 &&
                        selectedAlert.daysDelayed <= 14 && (
                          <Badge
                            variant='secondary'
                            className='bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400'
                          >
                            Pending &gt; 7 days
                          </Badge>
                        )}
                    </div>
                  </div>
                </ScrollArea>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </PageContainer>
  );
}
