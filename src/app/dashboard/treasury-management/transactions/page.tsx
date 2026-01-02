'use client';

import * as React from 'react';
import {
  CheckCircle2,
  Clock,
  XCircle,
  MessageSquare,
  Send,
  ArrowUpRight,
  Building2,
  Landmark,
  PiggyBank,
  Shield,
  FileSignature,
  UserCog,
  ChevronRight,
  Search
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

// Types
type TransactionStatus = 'Pending' | 'Approved' | 'Rejected' | 'Escalated';
type TreasuryType =
  | 'Bank Transfer'
  | 'Loan Agreement'
  | 'Investment Creation'
  | 'Guarantee'
  | 'Charge Creation'
  | 'Loan Borrowing'
  | 'Cheque Signing'
  | 'Bank Signatory Change';
type ApprovalStepStatus = 'approved' | 'pending' | 'rejected' | 'waiting';
type Company = 'HMC Hive' | 'Hero Cycles' | 'Hero Motors' | 'Munjal Group';

type ApprovalStep = {
  id: string;
  authority: string;
  role: string;
  status: ApprovalStepStatus;
  date?: string;
  comment?: string;
};

type Comment = {
  id: string;
  user: string;
  role: string;
  date: string;
  message: string;
  type: 'comment' | 'escalation' | 'rejection' | 'approval';
};

type Transaction = {
  id: string;
  company: Company;
  type: TreasuryType;
  amount: number;
  doaLimit: number;
  status: TransactionStatus;
  pendingWith: string;
  daysPending: number;
  approvalFlow: ApprovalStep[];
  doaCompliance: 'Breach' | 'Compliant';
  description: string;
  requestedBy: string;
  requestedDate: string;
  comments: Comment[];
  rejectionReason?: string;
};

// Mock Data
const mockTransactions: Transaction[] = [
  {
    id: 'TXN-2025-00020',
    company: 'HMC Hive',
    type: 'Charge Creation',
    amount: 20.1,
    doaLimit: 5.0,
    status: 'Pending',
    pendingWith: 'CFO',
    daysPending: 22,
    approvalFlow: [
      {
        id: '1',
        authority: 'Rajesh Kumar',
        role: 'Department Head',
        status: 'approved',
        date: '2025-12-09',
        comment: 'Approved as per policy'
      },
      { id: '2', authority: 'Pending', role: 'CFO', status: 'pending' },
      { id: '3', authority: 'Waiting', role: 'CEO', status: 'waiting' }
    ],
    doaCompliance: 'Breach',
    description: 'Charge creation for new equipment purchase',
    requestedBy: 'Amit Sharma',
    requestedDate: '2025-12-09',
    comments: [
      {
        id: '1',
        user: 'Amit Sharma',
        role: 'Manager',
        date: '2025-12-09 10:30',
        message: 'Urgent requirement for Q1 operations',
        type: 'comment'
      },
      {
        id: '2',
        user: 'Rajesh Kumar',
        role: 'Department Head',
        date: '2025-12-10 14:15',
        message: 'Approved. Please expedite CFO approval.',
        type: 'approval'
      }
    ]
  },
  {
    id: 'TXN-2025-00021',
    company: 'HMC Hive',
    type: 'Guarantee',
    amount: 29.45,
    doaLimit: 25.0,
    status: 'Pending',
    pendingWith: 'Group CFO',
    daysPending: 19,
    approvalFlow: [
      {
        id: '1',
        authority: 'Priya Singh',
        role: 'Department Head',
        status: 'approved',
        date: '2025-12-12',
        comment: 'Verified and approved'
      },
      {
        id: '2',
        authority: 'Vikram Mehta',
        role: 'CFO',
        status: 'approved',
        date: '2025-12-14',
        comment: 'Within policy limits'
      },
      { id: '3', authority: 'Pending', role: 'Group CFO', status: 'pending' },
      { id: '4', authority: 'Waiting', role: 'Board', status: 'waiting' }
    ],
    doaCompliance: 'Compliant',
    description: 'Bank guarantee for vendor contract',
    requestedBy: 'Suresh Patel',
    requestedDate: '2025-12-12',
    comments: [
      {
        id: '1',
        user: 'Suresh Patel',
        role: 'Procurement Manager',
        date: '2025-12-12 09:00',
        message: 'Required for new supplier agreement',
        type: 'comment'
      },
      {
        id: '2',
        user: 'Priya Singh',
        role: 'Department Head',
        date: '2025-12-12 16:30',
        message: 'Standard guarantee terms applicable',
        type: 'approval'
      },
      {
        id: '3',
        user: 'Vikram Mehta',
        role: 'CFO',
        date: '2025-12-14 11:20',
        message: 'Approved within DOA limits',
        type: 'approval'
      }
    ]
  },
  {
    id: 'TXN-2025-00023',
    company: 'HMC Hive',
    type: 'Loan Agreement',
    amount: 42.95,
    doaLimit: 25.0,
    status: 'Rejected',
    pendingWith: 'Department Head',
    daysPending: 19,
    approvalFlow: [
      {
        id: '1',
        authority: 'Anil Gupta',
        role: 'Department Head',
        status: 'rejected',
        date: '2025-12-12',
        comment: 'Interest rate not competitive'
      }
    ],
    doaCompliance: 'Breach',
    description: 'Term loan for capacity expansion',
    requestedBy: 'Deepak Verma',
    requestedDate: '2025-12-12',
    comments: [
      {
        id: '1',
        user: 'Deepak Verma',
        role: 'Finance Manager',
        date: '2025-12-12 10:00',
        message: 'Loan required for Phase 2 expansion',
        type: 'comment'
      },
      {
        id: '2',
        user: 'Anil Gupta',
        role: 'Department Head',
        date: '2025-12-12 15:45',
        message:
          'Rejected due to high interest rate of 12.5%. Please negotiate with bank for better terms.',
        type: 'rejection'
      }
    ],
    rejectionReason:
      'Interest rate not competitive. Current offer at 12.5% is above market rate of 10.5%. Please renegotiate terms.'
  },
  {
    id: 'TXN-2025-00030',
    company: 'HMC Hive',
    type: 'Investment Creation',
    amount: 42.23,
    doaLimit: 25.0,
    status: 'Pending',
    pendingWith: 'CFO',
    daysPending: 14,
    approvalFlow: [
      {
        id: '1',
        authority: 'Meena Kapoor',
        role: 'Department Head',
        status: 'approved',
        date: '2025-12-17',
        comment: 'Good investment opportunity'
      },
      { id: '2', authority: 'Pending', role: 'CFO', status: 'pending' },
      { id: '3', authority: 'Waiting', role: 'Board', status: 'waiting' }
    ],
    doaCompliance: 'Breach',
    description: 'Fixed deposit investment with SBI',
    requestedBy: 'Kavita Rao',
    requestedDate: '2025-12-17',
    comments: [
      {
        id: '1',
        user: 'Kavita Rao',
        role: 'Treasury Analyst',
        date: '2025-12-17 11:00',
        message: 'FD at 7.5% for 1 year tenure',
        type: 'comment'
      },
      {
        id: '2',
        user: 'Meena Kapoor',
        role: 'Department Head',
        date: '2025-12-17 16:00',
        message: 'Approved. Good rate compared to market.',
        type: 'approval'
      }
    ]
  },
  {
    id: 'TXN-2025-00031',
    company: 'HMC Hive',
    type: 'Loan Borrowing',
    amount: 25.82,
    doaLimit: 25.0,
    status: 'Pending',
    pendingWith: 'Group CFO',
    daysPending: 12,
    approvalFlow: [
      {
        id: '1',
        authority: 'Rahul Joshi',
        role: 'Department Head',
        status: 'approved',
        date: '2025-12-19',
        comment: 'Verified documentation'
      },
      {
        id: '2',
        authority: 'Sanjay Malhotra',
        role: 'CFO',
        status: 'approved',
        date: '2025-12-20',
        comment: 'Within borrowing limits'
      },
      { id: '3', authority: 'Pending', role: 'Group CFO', status: 'pending' },
      { id: '4', authority: 'Waiting', role: 'Board', status: 'waiting' }
    ],
    doaCompliance: 'Compliant',
    description: 'Working capital loan from HDFC Bank',
    requestedBy: 'Neeraj Agarwal',
    requestedDate: '2025-12-19',
    comments: [
      {
        id: '1',
        user: 'Neeraj Agarwal',
        role: 'Finance Executive',
        date: '2025-12-19 09:30',
        message: 'Working capital requirement for Q4',
        type: 'comment'
      },
      {
        id: '2',
        user: 'Rahul Joshi',
        role: 'Department Head',
        date: '2025-12-19 14:00',
        message: 'Documentation complete',
        type: 'approval'
      },
      {
        id: '3',
        user: 'Sanjay Malhotra',
        role: 'CFO',
        date: '2025-12-20 10:30',
        message: 'Approved. Interest rate acceptable at 9.75%',
        type: 'approval'
      }
    ]
  },
  {
    id: 'TXN-2025-00032',
    company: 'Hero Cycles',
    type: 'Bank Transfer',
    amount: 15.5,
    doaLimit: 20.0,
    status: 'Approved',
    pendingWith: '-',
    daysPending: 0,
    approvalFlow: [
      {
        id: '1',
        authority: 'Anita Desai',
        role: 'Department Head',
        status: 'approved',
        date: '2025-12-22',
        comment: 'Routine transfer approved'
      },
      {
        id: '2',
        authority: 'Manoj Tiwari',
        role: 'CFO',
        status: 'approved',
        date: '2025-12-23',
        comment: 'Transfer authorized'
      }
    ],
    doaCompliance: 'Compliant',
    description: 'Inter-company fund transfer',
    requestedBy: 'Pooja Sharma',
    requestedDate: '2025-12-22',
    comments: [
      {
        id: '1',
        user: 'Pooja Sharma',
        role: 'Accounts Manager',
        date: '2025-12-22 10:00',
        message: 'Monthly inter-company settlement',
        type: 'comment'
      },
      {
        id: '2',
        user: 'Anita Desai',
        role: 'Department Head',
        date: '2025-12-22 14:30',
        message: 'Verified against ledger',
        type: 'approval'
      },
      {
        id: '3',
        user: 'Manoj Tiwari',
        role: 'CFO',
        date: '2025-12-23 09:15',
        message: 'Transfer completed',
        type: 'approval'
      }
    ]
  },
  {
    id: 'TXN-2025-00033',
    company: 'Hero Motors',
    type: 'Cheque Signing',
    amount: 8.75,
    doaLimit: 10.0,
    status: 'Pending',
    pendingWith: 'CFO',
    daysPending: 5,
    approvalFlow: [
      {
        id: '1',
        authority: 'Vivek Choudhary',
        role: 'Department Head',
        status: 'approved',
        date: '2025-12-26',
        comment: 'Cheque signing authority verified'
      },
      { id: '2', authority: 'Pending', role: 'CFO', status: 'pending' }
    ],
    doaCompliance: 'Compliant',
    description: 'Vendor payment cheque authorization',
    requestedBy: 'Ritu Bhatt',
    requestedDate: '2025-12-26',
    comments: [
      {
        id: '1',
        user: 'Ritu Bhatt',
        role: 'Accounts Executive',
        date: '2025-12-26 11:30',
        message: 'Vendor payment for raw materials',
        type: 'comment'
      }
    ]
  },
  {
    id: 'TXN-2025-00034',
    company: 'Munjal Group',
    type: 'Bank Signatory Change',
    amount: 0,
    doaLimit: 0,
    status: 'Escalated',
    pendingWith: 'Board',
    daysPending: 30,
    approvalFlow: [
      {
        id: '1',
        authority: 'Kiran Shah',
        role: 'Department Head',
        status: 'approved',
        date: '2025-12-01',
        comment: 'Documentation verified'
      },
      {
        id: '2',
        authority: 'Arvind Pandey',
        role: 'CFO',
        status: 'approved',
        date: '2025-12-02',
        comment: 'Signatory change justified'
      },
      { id: '3', authority: 'Pending', role: 'Group CFO', status: 'pending' },
      { id: '4', authority: 'Waiting', role: 'Board', status: 'waiting' }
    ],
    doaCompliance: 'Breach',
    description: 'Change in authorized bank signatory',
    requestedBy: 'Ashok Mittal',
    requestedDate: '2025-12-01',
    comments: [
      {
        id: '1',
        user: 'Ashok Mittal',
        role: 'Company Secretary',
        date: '2025-12-01 10:00',
        message: 'Signatory change due to retirement of Mr. Gupta',
        type: 'comment'
      },
      {
        id: '2',
        user: 'Kiran Shah',
        role: 'Department Head',
        date: '2025-12-01 15:00',
        message: 'All documents in order',
        type: 'approval'
      },
      {
        id: '3',
        user: 'Arvind Pandey',
        role: 'CFO',
        date: '2025-12-02 11:00',
        message: 'Approved. Escalating to Group CFO for final approval.',
        type: 'approval'
      },
      {
        id: '4',
        user: 'System',
        role: 'Auto',
        date: '2025-12-15 00:00',
        message: 'Auto-escalated due to pending approval beyond 14 days',
        type: 'escalation'
      }
    ]
  },
  {
    id: 'TXN-2025-00035',
    company: 'Hero Cycles',
    type: 'Bank Transfer',
    amount: 8.25,
    doaLimit: 10.0,
    status: 'Pending',
    pendingWith: 'Department Head',
    daysPending: 3,
    approvalFlow: [
      {
        id: '1',
        authority: 'Pending',
        role: 'Department Head',
        status: 'pending'
      },
      { id: '2', authority: 'Waiting', role: 'CFO', status: 'waiting' }
    ],
    doaCompliance: 'Compliant',
    description: 'Vendor payment transfer to ABC Suppliers',
    requestedBy: 'Rakesh Sharma',
    requestedDate: '2025-12-28',
    comments: [
      {
        id: '1',
        user: 'Rakesh Sharma',
        role: 'Purchase Manager',
        date: '2025-12-28 09:00',
        message: 'Urgent payment for raw materials delivery',
        type: 'comment'
      }
    ]
  },
  {
    id: 'TXN-2025-00036',
    company: 'HMC Hive',
    type: 'Investment Creation',
    amount: 75.0,
    doaLimit: 50.0,
    status: 'Pending',
    pendingWith: 'Board',
    daysPending: 8,
    approvalFlow: [
      {
        id: '1',
        authority: 'Sunita Reddy',
        role: 'Department Head',
        status: 'approved',
        date: '2025-12-23',
        comment: 'Excellent returns projected'
      },
      {
        id: '2',
        authority: 'Ramesh Iyer',
        role: 'CFO',
        status: 'approved',
        date: '2025-12-24',
        comment: 'Risk assessment complete'
      },
      {
        id: '3',
        authority: 'Mohan Das',
        role: 'Group CFO',
        status: 'approved',
        date: '2025-12-26',
        comment: 'Within investment policy'
      },
      { id: '4', authority: 'Pending', role: 'Board', status: 'pending' }
    ],
    doaCompliance: 'Breach',
    description: 'Mutual fund investment in HDFC Balanced Fund',
    requestedBy: 'Priya Menon',
    requestedDate: '2025-12-23',
    comments: [
      {
        id: '1',
        user: 'Priya Menon',
        role: 'Investment Analyst',
        date: '2025-12-23 10:30',
        message: 'Expected returns of 12% based on historical performance',
        type: 'comment'
      },
      {
        id: '2',
        user: 'Sunita Reddy',
        role: 'Department Head',
        date: '2025-12-23 14:00',
        message: 'Good diversification opportunity',
        type: 'approval'
      },
      {
        id: '3',
        user: 'Ramesh Iyer',
        role: 'CFO',
        date: '2025-12-24 11:30',
        message: 'Approved after risk review',
        type: 'approval'
      }
    ]
  },
  {
    id: 'TXN-2025-00037',
    company: 'Hero Motors',
    type: 'Loan Borrowing',
    amount: 120.0,
    doaLimit: 100.0,
    status: 'Approved',
    pendingWith: '-',
    daysPending: 0,
    approvalFlow: [
      {
        id: '1',
        authority: 'Vijay Kumar',
        role: 'Department Head',
        status: 'approved',
        date: '2025-12-15',
        comment: 'Terms are favorable'
      },
      {
        id: '2',
        authority: 'Neeta Shah',
        role: 'CFO',
        status: 'approved',
        date: '2025-12-16',
        comment: 'Interest rate negotiated well'
      },
      {
        id: '3',
        authority: 'Suresh Pillai',
        role: 'Group CFO',
        status: 'approved',
        date: '2025-12-18',
        comment: 'Final approval granted'
      },
      {
        id: '4',
        authority: 'Board Committee',
        role: 'Board',
        status: 'approved',
        date: '2025-12-20',
        comment: 'Unanimously approved'
      }
    ],
    doaCompliance: 'Breach',
    description: 'Term loan from ICICI Bank for plant expansion',
    requestedBy: 'Arun Nair',
    requestedDate: '2025-12-15',
    comments: [
      {
        id: '1',
        user: 'Arun Nair',
        role: 'Finance Director',
        date: '2025-12-15 09:00',
        message: 'Loan for Phase 3 plant expansion in Gujarat',
        type: 'comment'
      },
      {
        id: '2',
        user: 'Vijay Kumar',
        role: 'Department Head',
        date: '2025-12-15 16:00',
        message: 'Documentation complete',
        type: 'approval'
      },
      {
        id: '3',
        user: 'Neeta Shah',
        role: 'CFO',
        date: '2025-12-16 10:00',
        message: 'Rate at 9.25% is competitive',
        type: 'approval'
      },
      {
        id: '4',
        user: 'Board Committee',
        role: 'Board',
        date: '2025-12-20 15:00',
        message: 'Approved in board meeting',
        type: 'approval'
      }
    ]
  },
  {
    id: 'TXN-2025-00038',
    company: 'Munjal Group',
    type: 'Bank Transfer',
    amount: 35.5,
    doaLimit: 25.0,
    status: 'Rejected',
    pendingWith: 'CFO',
    daysPending: 6,
    approvalFlow: [
      {
        id: '1',
        authority: 'Amit Bansal',
        role: 'Department Head',
        status: 'approved',
        date: '2025-12-25',
        comment: 'Verified request'
      },
      {
        id: '2',
        authority: 'Geeta Krishnan',
        role: 'CFO',
        status: 'rejected',
        date: '2025-12-27',
        comment: 'Insufficient documentation for large transfer'
      }
    ],
    doaCompliance: 'Breach',
    description: 'Inter-company transfer to subsidiary in Singapore',
    requestedBy: 'Rohit Malhotra',
    requestedDate: '2025-12-25',
    comments: [
      {
        id: '1',
        user: 'Rohit Malhotra',
        role: 'Treasury Manager',
        date: '2025-12-25 11:00',
        message: 'Quarterly fund transfer to Singapore entity',
        type: 'comment'
      },
      {
        id: '2',
        user: 'Amit Bansal',
        role: 'Department Head',
        date: '2025-12-25 15:30',
        message: 'Request seems valid',
        type: 'approval'
      },
      {
        id: '3',
        user: 'Geeta Krishnan',
        role: 'CFO',
        date: '2025-12-27 10:00',
        message:
          'Need RBI compliance documents and board resolution for international transfer above 25 Cr',
        type: 'rejection'
      }
    ],
    rejectionReason:
      'Missing RBI compliance documents and board resolution required for international transfers exceeding DOA limit.'
  },
  {
    id: 'TXN-2025-00039',
    company: 'HMC Hive',
    type: 'Loan Agreement',
    amount: 55.0,
    doaLimit: 50.0,
    status: 'Pending',
    pendingWith: 'Group CFO',
    daysPending: 4,
    approvalFlow: [
      {
        id: '1',
        authority: 'Rekha Gupta',
        role: 'Department Head',
        status: 'approved',
        date: '2025-12-27',
        comment: 'Terms reviewed'
      },
      {
        id: '2',
        authority: 'Sanjay Kapoor',
        role: 'CFO',
        status: 'approved',
        date: '2025-12-28',
        comment: 'Covenants are acceptable'
      },
      { id: '3', authority: 'Pending', role: 'Group CFO', status: 'pending' },
      { id: '4', authority: 'Waiting', role: 'Board', status: 'waiting' }
    ],
    doaCompliance: 'Breach',
    description: 'Working capital facility from Axis Bank',
    requestedBy: 'Manish Jain',
    requestedDate: '2025-12-27',
    comments: [
      {
        id: '1',
        user: 'Manish Jain',
        role: 'Finance Manager',
        date: '2025-12-27 09:30',
        message: 'WC facility for Q1 operations',
        type: 'comment'
      },
      {
        id: '2',
        user: 'Rekha Gupta',
        role: 'Department Head',
        date: '2025-12-27 14:00',
        message: 'Legal has reviewed the agreement',
        type: 'approval'
      },
      {
        id: '3',
        user: 'Sanjay Kapoor',
        role: 'CFO',
        date: '2025-12-28 11:00',
        message: 'Interest rate of 9.5% approved',
        type: 'approval'
      }
    ]
  },
  {
    id: 'TXN-2025-00040',
    company: 'Hero Cycles',
    type: 'Investment Creation',
    amount: 18.0,
    doaLimit: 20.0,
    status: 'Approved',
    pendingWith: '-',
    daysPending: 0,
    approvalFlow: [
      {
        id: '1',
        authority: 'Lalita Sharma',
        role: 'Department Head',
        status: 'approved',
        date: '2025-12-29',
        comment: 'Low risk investment'
      },
      {
        id: '2',
        authority: 'Prakash Rao',
        role: 'CFO',
        status: 'approved',
        date: '2025-12-30',
        comment: 'Approved for execution'
      }
    ],
    doaCompliance: 'Compliant',
    description: 'Fixed deposit with SBI for 6 months',
    requestedBy: 'Divya Nair',
    requestedDate: '2025-12-29',
    comments: [
      {
        id: '1',
        user: 'Divya Nair',
        role: 'Treasury Executive',
        date: '2025-12-29 10:00',
        message: 'Parking surplus funds in FD at 7.25%',
        type: 'comment'
      },
      {
        id: '2',
        user: 'Lalita Sharma',
        role: 'Department Head',
        date: '2025-12-29 14:30',
        message: 'Good use of idle funds',
        type: 'approval'
      },
      {
        id: '3',
        user: 'Prakash Rao',
        role: 'CFO',
        date: '2025-12-30 09:00',
        message: 'Execute immediately',
        type: 'approval'
      }
    ]
  },
  {
    id: 'TXN-2025-00041',
    company: 'Hero Motors',
    type: 'Bank Transfer',
    amount: 12.75,
    doaLimit: 15.0,
    status: 'Pending',
    pendingWith: 'CFO',
    daysPending: 2,
    approvalFlow: [
      {
        id: '1',
        authority: 'Karthik Menon',
        role: 'Department Head',
        status: 'approved',
        date: '2025-12-29',
        comment: 'Verified against PO'
      },
      { id: '2', authority: 'Pending', role: 'CFO', status: 'pending' }
    ],
    doaCompliance: 'Compliant',
    description: 'Payment to machinery supplier',
    requestedBy: 'Anand Kumar',
    requestedDate: '2025-12-29',
    comments: [
      {
        id: '1',
        user: 'Anand Kumar',
        role: 'Procurement Head',
        date: '2025-12-29 11:30',
        message: 'Final payment for CNC machines',
        type: 'comment'
      },
      {
        id: '2',
        user: 'Karthik Menon',
        role: 'Department Head',
        date: '2025-12-29 16:00',
        message: 'Delivery confirmed, payment due',
        type: 'approval'
      }
    ]
  },
  {
    id: 'TXN-2025-00042',
    company: 'Munjal Group',
    type: 'Loan Borrowing',
    amount: 200.0,
    doaLimit: 150.0,
    status: 'Escalated',
    pendingWith: 'Board',
    daysPending: 18,
    approvalFlow: [
      {
        id: '1',
        authority: 'Harsh Vardhan',
        role: 'Department Head',
        status: 'approved',
        date: '2025-12-13',
        comment: 'Strategic loan for acquisition'
      },
      {
        id: '2',
        authority: 'Meera Reddy',
        role: 'CFO',
        status: 'approved',
        date: '2025-12-14',
        comment: 'Debt ratios within limits'
      },
      {
        id: '3',
        authority: 'Vikram Singh',
        role: 'Group CFO',
        status: 'approved',
        date: '2025-12-16',
        comment: 'Approved subject to board ratification'
      },
      { id: '4', authority: 'Pending', role: 'Board', status: 'pending' }
    ],
    doaCompliance: 'Breach',
    description: 'Acquisition financing from consortium of banks',
    requestedBy: 'Rajiv Mehta',
    requestedDate: '2025-12-13',
    comments: [
      {
        id: '1',
        user: 'Rajiv Mehta',
        role: 'M&A Director',
        date: '2025-12-13 09:00',
        message: 'Financing for XYZ Company acquisition',
        type: 'comment'
      },
      {
        id: '2',
        user: 'Harsh Vardhan',
        role: 'Department Head',
        date: '2025-12-13 17:00',
        message: 'Due diligence complete',
        type: 'approval'
      },
      {
        id: '3',
        user: 'Meera Reddy',
        role: 'CFO',
        date: '2025-12-14 12:00',
        message: 'Leverage acceptable',
        type: 'approval'
      },
      {
        id: '4',
        user: 'System',
        role: 'Auto',
        date: '2025-12-28 00:00',
        message: 'Escalated - pending board approval for 14+ days',
        type: 'escalation'
      }
    ]
  },
  {
    id: 'TXN-2025-00043',
    company: 'HMC Hive',
    type: 'Bank Signatory Change',
    amount: 0,
    doaLimit: 0,
    status: 'Approved',
    pendingWith: '-',
    daysPending: 0,
    approvalFlow: [
      {
        id: '1',
        authority: 'Sandeep Joshi',
        role: 'Department Head',
        status: 'approved',
        date: '2025-12-20',
        comment: 'New joiner authorization'
      },
      {
        id: '2',
        authority: 'Nisha Patel',
        role: 'CFO',
        status: 'approved',
        date: '2025-12-21',
        comment: 'Verified credentials'
      },
      {
        id: '3',
        authority: 'Anil Sharma',
        role: 'Group CFO',
        status: 'approved',
        date: '2025-12-22',
        comment: 'Approved'
      }
    ],
    doaCompliance: 'Compliant',
    description: 'Add new Finance Director as signatory',
    requestedBy: 'HR Department',
    requestedDate: '2025-12-20',
    comments: [
      {
        id: '1',
        user: 'HR Department',
        role: 'HR',
        date: '2025-12-20 10:00',
        message: 'New Finance Director Mr. Sharma joining',
        type: 'comment'
      },
      {
        id: '2',
        user: 'Sandeep Joshi',
        role: 'Department Head',
        date: '2025-12-20 15:00',
        message: 'Background verification complete',
        type: 'approval'
      },
      {
        id: '3',
        user: 'Nisha Patel',
        role: 'CFO',
        date: '2025-12-21 11:00',
        message: 'Signatory limits set as per policy',
        type: 'approval'
      }
    ]
  }
];

// Helper function to get treasury icon
const getTreasuryIcon = (type: TreasuryType) => {
  switch (type) {
    case 'Bank Transfer':
      return Landmark;
    case 'Loan Agreement':
    case 'Loan Borrowing':
      return Building2;
    case 'Investment Creation':
      return PiggyBank;
    case 'Guarantee':
      return Shield;
    case 'Cheque Signing':
      return FileSignature;
    case 'Bank Signatory Change':
      return UserCog;
    default:
      return Building2;
  }
};

// Approval Flow Indicator Component
const ApprovalFlowIndicator = ({ steps }: { steps: ApprovalStep[] }) => {
  return (
    <TooltipProvider>
      <div className='flex items-center gap-1'>
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <Tooltip>
              <TooltipTrigger>
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full ${
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
                    <CheckCircle2 className='h-4 w-4' />
                  ) : step.status === 'rejected' ? (
                    <XCircle className='h-4 w-4' />
                  ) : step.status === 'pending' ? (
                    <Clock className='h-4 w-4' />
                  ) : (
                    <div className='h-2 w-2 rounded-full bg-gray-300' />
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className='font-medium'>{step.role}</p>
                <p className='text-muted-foreground text-xs'>
                  {step.status === 'approved'
                    ? `Approved by ${step.authority}`
                    : step.status === 'rejected'
                      ? `Rejected by ${step.authority}`
                      : step.status === 'pending'
                        ? 'Pending Approval'
                        : 'Waiting'}
                </p>
              </TooltipContent>
            </Tooltip>
            {index < steps.length - 1 && (
              <div
                className={`h-0.5 w-3 ${
                  step.status === 'approved'
                    ? 'bg-green-300'
                    : step.status === 'rejected'
                      ? 'bg-red-300'
                      : 'bg-gray-200'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </TooltipProvider>
  );
};

export default function TransactionsPage() {
  const [statusFilter, setStatusFilter] = React.useState<string>('all');
  const [typeFilter, setTypeFilter] = React.useState<string>('all');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedTransaction, setSelectedTransaction] =
    React.useState<Transaction | null>(null);
  const [newComment, setNewComment] = React.useState('');

  // Excluded transaction types
  const excludedTypes = ['Charge Creation', 'Guarantee', 'Cheque Signing'];

  // Status priority for sorting: Escalated (0) → Pending (1) → Rejected (2) → Approved (3)
  const statusPriority: Record<TransactionStatus, number> = {
    Escalated: 0,
    Pending: 1,
    Rejected: 2,
    Approved: 3
  };

  // Filter and sort transactions
  const filteredTransactions = mockTransactions
    .filter((txn) => {
      const isExcludedType = excludedTypes.includes(txn.type);
      if (isExcludedType) return false;

      const matchesStatus =
        statusFilter === 'all' || txn.status === statusFilter;
      const matchesType = typeFilter === 'all' || txn.type === typeFilter;
      const matchesSearch =
        searchQuery === '' ||
        txn.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        txn.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesType && matchesSearch;
    })
    .sort((a, b) => {
      // First sort by status priority
      const statusDiff = statusPriority[a.status] - statusPriority[b.status];
      if (statusDiff !== 0) return statusDiff;

      // Then by days pending (descending - more days first)
      const daysDiff = b.daysPending - a.daysPending;
      if (daysDiff !== 0) return daysDiff;

      // Then by amount (descending - higher amount first)
      return b.amount - a.amount;
    });

  // Get unique types for filters (excluding certain types)
  const types = Array.from(new Set(mockTransactions.map((t) => t.type))).filter(
    (type) => !excludedTypes.includes(type)
  );

  const [approvalComment, setApprovalComment] = React.useState('');
  const [showApprovalDialog, setShowApprovalDialog] = React.useState(false);
  const [approvalAction, setApprovalAction] = React.useState<
    'approve' | 'reject' | null
  >(null);

  // Check if current transaction has pending approval
  const hasPendingApproval = selectedTransaction?.approvalFlow.some(
    (step) => step.status === 'pending'
  );
  const pendingStep = selectedTransaction?.approvalFlow.find(
    (step) => step.status === 'pending'
  );

  const handleAddComment = () => {
    if (!newComment.trim() || !selectedTransaction) return;
    // In real app, this would make an API call
    console.log('Adding comment:', newComment);
    setNewComment('');
  };

  const handleEscalate = () => {
    if (!selectedTransaction) return;
    // In real app, this would make an API call
    console.log('Escalating transaction:', selectedTransaction.id);
  };

  const handleApprove = () => {
    if (!selectedTransaction) return;
    // In real app, this would make an API call
    console.log(
      'Approving transaction:',
      selectedTransaction.id,
      'Comment:',
      approvalComment
    );
    setApprovalComment('');
    setShowApprovalDialog(false);
    setApprovalAction(null);
    setSelectedTransaction(null);
    // Show success message or refresh data
  };

  const handleReject = () => {
    if (!selectedTransaction || !approvalComment.trim()) return;
    // In real app, this would make an API call
    console.log(
      'Rejecting transaction:',
      selectedTransaction.id,
      'Reason:',
      approvalComment
    );
    setApprovalComment('');
    setShowApprovalDialog(false);
    setApprovalAction(null);
    setSelectedTransaction(null);
    // Show success message or refresh data
  };

  const openApprovalDialog = (action: 'approve' | 'reject') => {
    setApprovalAction(action);
    setShowApprovalDialog(true);
  };

  return (
    <PageContainer>
      <div className='flex h-full w-full flex-col gap-4'>
        {/* Header & Filters */}
        <div className='flex flex-wrap items-center justify-between gap-4'>
          <div>
            <h1 className='text-2xl font-bold tracking-tight'>Transactions</h1>
            <p className='text-muted-foreground text-sm'>
              View and manage all treasury transactions
            </p>
          </div>
          <div className='flex flex-wrap items-center gap-3'>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className='w-[140px]'>
                <SelectValue placeholder='All Status' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Status</SelectItem>
                <SelectItem value='Pending'>Pending</SelectItem>
                <SelectItem value='Approved'>Approved</SelectItem>
                <SelectItem value='Rejected'>Rejected</SelectItem>
                <SelectItem value='Escalated'>Escalated</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className='w-[160px]'>
                <SelectValue placeholder='All Types' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Types</SelectItem>
                {types.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className='relative'>
              <Search className='text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2' />
              <Input
                placeholder='Search...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='w-[200px] pl-9'
              />
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <Card className='flex-1'>
          <CardContent className='h-full overflow-auto p-0'>
            <table className='w-full border-collapse text-sm'>
              <thead>
                <tr className='bg-muted/50 border-b'>
                  <th className='h-11 px-3 text-left font-semibold whitespace-nowrap'>
                    Transaction ID
                  </th>
                  <th className='h-11 px-3 text-left font-semibold whitespace-nowrap'>
                    Type
                  </th>
                  <th className='h-11 px-3 text-right font-semibold whitespace-nowrap'>
                    Amount
                  </th>
                  <th className='h-11 px-3 text-right font-semibold whitespace-nowrap'>
                    DOA Limit
                  </th>
                  <th className='h-11 px-3 text-left font-semibold whitespace-nowrap'>
                    Status
                  </th>
                  <th className='h-11 px-3 text-left font-semibold whitespace-nowrap'>
                    Pending With
                  </th>
                  <th className='h-11 px-3 text-center font-semibold whitespace-nowrap'>
                    Days Pending
                  </th>
                  <th className='h-11 px-3 text-left font-semibold whitespace-nowrap'>
                    Approval Flow
                  </th>
                  <th className='h-11 px-3 text-left font-semibold whitespace-nowrap'>
                    DOA
                  </th>
                  <th className='h-11 px-3 text-left font-semibold whitespace-nowrap'>
                    Initiated On
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((txn) => (
                  <tr
                    key={txn.id}
                    className='hover:bg-muted/50 cursor-pointer border-b transition-colors'
                    onClick={() => setSelectedTransaction(txn)}
                  >
                    <td className='h-12 px-3 font-medium whitespace-nowrap text-blue-600'>
                      {txn.id}
                    </td>
                    <td className='h-12 px-3 whitespace-nowrap'>{txn.type}</td>
                    <td className='h-12 px-3 text-right font-semibold whitespace-nowrap tabular-nums'>
                      {txn.amount > 0 ? `₹${txn.amount.toFixed(2)} Cr` : '-'}
                    </td>
                    <td className='text-muted-foreground h-12 px-3 text-right whitespace-nowrap tabular-nums'>
                      {txn.doaLimit > 0
                        ? `₹${txn.doaLimit.toFixed(2)} Cr`
                        : '-'}
                    </td>
                    <td className='h-12 px-3 whitespace-nowrap'>
                      <Badge
                        variant={
                          txn.status === 'Approved'
                            ? 'default'
                            : txn.status === 'Rejected'
                              ? 'destructive'
                              : txn.status === 'Escalated'
                                ? 'destructive'
                                : 'secondary'
                        }
                        className={
                          txn.status === 'Approved'
                            ? 'bg-green-600'
                            : txn.status === 'Pending'
                              ? 'bg-amber-600'
                              : ''
                        }
                      >
                        {txn.status}
                      </Badge>
                    </td>
                    <td className='h-12 px-3 whitespace-nowrap'>
                      {txn.pendingWith}
                    </td>
                    <td className='h-12 px-3 text-center whitespace-nowrap'>
                      <span
                        className={
                          txn.daysPending > 14
                            ? 'font-semibold text-red-600'
                            : txn.daysPending > 7
                              ? 'font-medium text-amber-600'
                              : ''
                        }
                      >
                        {txn.daysPending > 0 ? `${txn.daysPending} days` : '-'}
                      </span>
                    </td>
                    <td className='h-12 px-3 whitespace-nowrap'>
                      <ApprovalFlowIndicator steps={txn.approvalFlow} />
                    </td>
                    <td className='h-12 px-3 whitespace-nowrap'>
                      <Badge
                        variant='outline'
                        className={
                          txn.doaCompliance === 'Breach'
                            ? 'border-red-300 bg-red-50 text-red-600'
                            : 'border-green-300 bg-green-50 text-green-600'
                        }
                      >
                        {txn.doaCompliance}
                      </Badge>
                    </td>
                    <td className='text-muted-foreground h-12 px-3 whitespace-nowrap'>
                      {txn.requestedDate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Transaction Detail Dialog - Horizontal Layout */}
        <Dialog
          open={!!selectedTransaction}
          onOpenChange={(open) => !open && setSelectedTransaction(null)}
        >
          <DialogContent className='h-[580px] w-[1100px] gap-0 overflow-hidden p-0'>
            {selectedTransaction && (
              <div className='flex h-full'>
                {/* Left Panel - Transaction Details */}
                <div className='bg-muted/30 w-[320px] shrink-0 overflow-auto border-r p-5'>
                  <div className='mb-5 flex items-center gap-3'>
                    {(() => {
                      const IconComponent = getTreasuryIcon(
                        selectedTransaction.type
                      );
                      return (
                        <div className='rounded-lg bg-blue-100 p-2.5 dark:bg-blue-950/30'>
                          <IconComponent className='h-5 w-5 text-blue-600' />
                        </div>
                      );
                    })()}
                    <div>
                      <h2 className='text-lg font-bold'>
                        {selectedTransaction.id}
                      </h2>
                      <p className='text-muted-foreground text-xs'>
                        {selectedTransaction.type}
                      </p>
                    </div>
                  </div>

                  <div className='mb-5 flex gap-2'>
                    <Badge
                      className={`px-2 py-0.5 text-xs ${
                        selectedTransaction.status === 'Approved'
                          ? 'bg-green-600'
                          : selectedTransaction.status === 'Rejected'
                            ? 'bg-red-600'
                            : selectedTransaction.status === 'Escalated'
                              ? 'bg-red-600'
                              : 'bg-amber-600'
                      }`}
                    >
                      {selectedTransaction.status}
                    </Badge>
                    <Badge
                      variant='outline'
                      className={`px-2 py-0.5 text-xs ${
                        selectedTransaction.doaCompliance === 'Breach'
                          ? 'border-red-400 bg-red-50 text-red-600'
                          : 'border-green-400 bg-green-50 text-green-600'
                      }`}
                    >
                      DOA: {selectedTransaction.doaCompliance}
                    </Badge>
                  </div>

                  <p className='text-muted-foreground mb-5 text-sm'>
                    {selectedTransaction.description}
                  </p>

                  <div className='space-y-3'>
                    <div className='grid grid-cols-2 gap-3'>
                      <div className='bg-background rounded-lg border p-3'>
                        <p className='text-muted-foreground text-[10px] uppercase'>
                          Amount
                        </p>
                        <p className='text-base font-bold'>
                          {selectedTransaction.amount > 0
                            ? `₹${selectedTransaction.amount.toFixed(2)} Cr`
                            : 'N/A'}
                        </p>
                      </div>
                      <div className='bg-background rounded-lg border p-3'>
                        <p className='text-muted-foreground text-[10px] uppercase'>
                          DOA Limit
                        </p>
                        <p className='text-base font-bold'>
                          {selectedTransaction.doaLimit > 0
                            ? `₹${selectedTransaction.doaLimit.toFixed(2)} Cr`
                            : 'N/A'}
                        </p>
                      </div>
                    </div>

                    <div className='grid grid-cols-2 gap-3'>
                      <div className='bg-background rounded-lg border p-3'>
                        <p className='text-muted-foreground text-[10px] uppercase'>
                          Days Pending
                        </p>
                        <p
                          className={`text-base font-bold ${selectedTransaction.daysPending > 14 ? 'text-red-600' : selectedTransaction.daysPending > 7 ? 'text-amber-600' : ''}`}
                        >
                          {selectedTransaction.daysPending} days
                        </p>
                      </div>
                      <div className='bg-background rounded-lg border p-3'>
                        <p className='text-muted-foreground text-[10px] uppercase'>
                          Pending With
                        </p>
                        <p className='text-sm font-semibold'>
                          {selectedTransaction.pendingWith}
                        </p>
                      </div>
                    </div>

                    <div className='grid grid-cols-2 gap-3'>
                      <div className='bg-background rounded-lg border p-3'>
                        <p className='text-muted-foreground text-[10px] uppercase'>
                          Initiated On
                        </p>
                        <p className='text-sm font-semibold'>
                          {selectedTransaction.requestedDate}
                        </p>
                      </div>
                      <div className='bg-background rounded-lg border p-3'>
                        <p className='text-muted-foreground text-[10px] uppercase'>
                          Requested By
                        </p>
                        <p className='text-sm font-medium'>
                          {selectedTransaction.requestedBy}
                        </p>
                      </div>
                    </div>

                    {selectedTransaction.rejectionReason && (
                      <div className='rounded-lg border-2 border-red-300 bg-red-50 p-3'>
                        <div className='mb-1 flex items-center gap-1.5'>
                          <XCircle className='h-4 w-4 text-red-600' />
                          <p className='text-xs font-semibold text-red-700'>
                            Rejection Reason
                          </p>
                        </div>
                        <p className='text-xs text-red-600'>
                          {selectedTransaction.rejectionReason}
                        </p>
                      </div>
                    )}

                    {/* Approval Actions - Show when pending approval exists */}
                    {hasPendingApproval && pendingStep && (
                      <div className='mt-4 border-t pt-4'>
                        <div className='mb-3 rounded-lg border border-amber-200 bg-amber-50 p-3'>
                          <p className='mb-1 text-xs font-semibold text-amber-700'>
                            Pending Approval
                          </p>
                          <p className='text-xs text-amber-600'>
                            Awaiting approval from:{' '}
                            <span className='font-medium'>
                              {pendingStep.role}
                            </span>
                          </p>
                        </div>
                        {!showApprovalDialog ? (
                          <div className='flex gap-2'>
                            <Button
                              size='sm'
                              className='h-9 flex-1 bg-green-600 hover:bg-green-700'
                              onClick={() => openApprovalDialog('approve')}
                            >
                              <CheckCircle2 className='mr-1.5 h-4 w-4' />
                              Approve
                            </Button>
                            <Button
                              size='sm'
                              variant='destructive'
                              className='h-9 flex-1'
                              onClick={() => openApprovalDialog('reject')}
                            >
                              <XCircle className='mr-1.5 h-4 w-4' />
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
                                className='h-6 text-xs'
                                onClick={() => {
                                  setShowApprovalDialog(false);
                                  setApprovalAction(null);
                                  setApprovalComment('');
                                }}
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
                              className='min-h-[60px] resize-none text-sm'
                            />
                            <Button
                              size='sm'
                              className={`h-9 w-full ${approvalAction === 'approve' ? 'bg-green-600 hover:bg-green-700' : ''}`}
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
                                  <CheckCircle2 className='mr-1.5 h-4 w-4' />
                                  Confirm Approval
                                </>
                              ) : (
                                <>
                                  <XCircle className='mr-1.5 h-4 w-4' />
                                  Confirm Rejection
                                </>
                              )}
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Middle Panel - Approval Chronology */}
                <div className='flex-1 overflow-auto border-r p-5'>
                  <h3 className='mb-4 flex items-center gap-2 text-sm font-semibold'>
                    <ChevronRight className='h-4 w-4' />
                    Approval Chronology
                  </h3>
                  <div className='relative space-y-0'>
                    {selectedTransaction.approvalFlow.map((step, index) => (
                      <div key={step.id} className='relative pb-4 last:pb-0'>
                        {index <
                          selectedTransaction.approvalFlow.length - 1 && (
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
                              <XCircle className='h-3.5 w-3.5' />
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
                                {step.date && (
                                  <p className='text-muted-foreground mt-1 text-[10px]'>
                                    {step.date}
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

                {/* Right Panel - Comments & Activity */}
                <div className='flex w-[350px] shrink-0 flex-col overflow-hidden p-5'>
                  <h3 className='mb-4 flex items-center gap-2 text-sm font-semibold'>
                    <MessageSquare className='h-4 w-4' />
                    Comments & Activity
                  </h3>
                  <div className='flex-1 space-y-3 overflow-auto pr-1'>
                    {selectedTransaction.comments.map((comment) => (
                      <div
                        key={comment.id}
                        className={`rounded-lg border p-3 ${
                          comment.type === 'rejection'
                            ? 'border-red-200 bg-red-50/50'
                            : comment.type === 'escalation'
                              ? 'border-amber-200 bg-amber-50/50'
                              : comment.type === 'approval'
                                ? 'border-green-200 bg-green-50/50'
                                : 'bg-muted/30'
                        }`}
                      >
                        <div className='mb-2 flex items-start justify-between'>
                          <div className='flex items-center gap-2'>
                            <div
                              className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-semibold ${
                                comment.type === 'rejection'
                                  ? 'bg-red-100 text-red-600'
                                  : comment.type === 'escalation'
                                    ? 'bg-amber-100 text-amber-600'
                                    : comment.type === 'approval'
                                      ? 'bg-green-100 text-green-600'
                                      : 'bg-blue-100 text-blue-600'
                              }`}
                            >
                              {comment.user
                                .split(' ')
                                .map((n) => n[0])
                                .join('')}
                            </div>
                            <div>
                              <p className='text-xs font-semibold'>
                                {comment.user}
                              </p>
                              <p className='text-muted-foreground text-[10px]'>
                                {comment.role}
                              </p>
                            </div>
                          </div>
                          <div className='text-right'>
                            {comment.type !== 'comment' && (
                              <Badge
                                variant='outline'
                                className={`mb-0.5 px-1.5 py-0 text-[10px] ${
                                  comment.type === 'rejection'
                                    ? 'border-red-300 text-red-600'
                                    : comment.type === 'escalation'
                                      ? 'border-amber-300 text-amber-600'
                                      : 'border-green-300 text-green-600'
                                }`}
                              >
                                {comment.type === 'rejection'
                                  ? 'Rejected'
                                  : comment.type === 'escalation'
                                    ? 'Escalated'
                                    : 'Approved'}
                              </Badge>
                            )}
                            <p className='text-muted-foreground text-[10px]'>
                              {comment.date}
                            </p>
                          </div>
                        </div>
                        <p className='text-xs'>{comment.message}</p>
                      </div>
                    ))}
                  </div>

                  {/* Add Comment */}
                  {selectedTransaction.status !== 'Approved' &&
                    selectedTransaction.status !== 'Rejected' && (
                      <div className='mt-4 space-y-2 border-t pt-4'>
                        <Textarea
                          placeholder='Add a comment...'
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          className='min-h-[60px] resize-none text-sm'
                        />
                        <div className='flex items-center gap-2'>
                          <Button
                            size='sm'
                            onClick={handleAddComment}
                            disabled={!newComment.trim()}
                            className='h-8 flex-1 text-xs'
                          >
                            <Send className='mr-1.5 h-3 w-3' />
                            Comment
                          </Button>
                          {selectedTransaction.daysPending > 7 && (
                            <Button
                              size='sm'
                              variant='destructive'
                              onClick={handleEscalate}
                              className='h-8 text-xs'
                            >
                              <ArrowUpRight className='mr-1.5 h-3 w-3' />
                              Escalate
                            </Button>
                          )}
                        </div>
                      </div>
                    )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </PageContainer>
  );
}
