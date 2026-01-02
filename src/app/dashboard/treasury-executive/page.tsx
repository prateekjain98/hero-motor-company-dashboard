'use client';

import * as React from 'react';
import {
  Plus,
  FileText,
  Send,
  Building2,
  Landmark,
  PiggyBank,
  FileSignature,
  Upload,
  Briefcase,
  FileUp,
  Eye,
  Edit,
  Trash2,
  X,
  Save
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
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Types
type TransactionType =
  | 'Bank Transfers'
  | 'Loan Agreements'
  | 'Investment Creations'
  | 'Change in Bank Signatories'
  | 'Loan Borrowing';
type DraftStatus = 'Draft' | 'Submitted' | 'Returned' | 'Approved';

type DraftTransaction = {
  id: string;
  type: TransactionType;
  description: string;
  amount: number;
  status: DraftStatus;
  createdDate: string;
  lastModified: string;
  submittedTo?: string;
  returnReason?: string;
};

// Mock data for drafts
const mockDrafts: DraftTransaction[] = [
  {
    id: 'TXN-001',
    type: 'Bank Transfers',
    description: 'Vendor payment - ABC Suppliers',
    amount: 15.5,
    status: 'Draft',
    createdDate: '2025-12-28',
    lastModified: '2025-12-30'
  },
  {
    id: 'TXN-002',
    type: 'Loan Agreements',
    description: 'Working capital facility request',
    amount: 125.0,
    status: 'Submitted',
    createdDate: '2025-12-25',
    lastModified: '2025-12-26',
    submittedTo: 'Department Head'
  },
  {
    id: 'TXN-003',
    type: 'Investment Creations',
    description: 'Fixed deposit with HDFC Bank',
    amount: 50.0,
    status: 'Returned',
    createdDate: '2025-12-20',
    lastModified: '2025-12-28',
    returnReason: 'Please provide updated interest rate quotation'
  },
  {
    id: 'TXN-004',
    type: 'Bank Transfers',
    description: 'Inter-company transfer to subsidiary',
    amount: 45.8,
    status: 'Approved',
    createdDate: '2025-12-15',
    lastModified: '2025-12-22',
    submittedTo: 'CFO'
  },
  {
    id: 'TXN-005',
    type: 'Change in Bank Signatories',
    description: 'Bank signatory change - ICICI Account',
    amount: 0,
    status: 'Draft',
    createdDate: '2025-12-29',
    lastModified: '2025-12-30'
  }
];

const getTypeIcon = (type: TransactionType) => {
  switch (type) {
    case 'Bank Transfers':
      return Building2;
    case 'Loan Agreements':
      return Landmark;
    case 'Investment Creations':
      return PiggyBank;
    case 'Change in Bank Signatories':
      return FileSignature;
    case 'Loan Borrowing':
      return Landmark;
    default:
      return FileText;
  }
};

const getStatusBadge = (status: DraftStatus) => {
  switch (status) {
    case 'Draft':
      return (
        <Badge variant='secondary' className='bg-gray-100 text-gray-700'>
          Draft
        </Badge>
      );
    case 'Submitted':
      return (
        <Badge variant='secondary' className='bg-blue-100 text-blue-700'>
          Submitted
        </Badge>
      );
    case 'Returned':
      return <Badge variant='destructive'>Returned</Badge>;
    case 'Approved':
      return <Badge className='bg-green-600'>Approved</Badge>;
    default:
      return <Badge variant='secondary'>{status}</Badge>;
  }
};

export default function TreasuryExecutivePage() {
  const [drafts, setDrafts] = React.useState<DraftTransaction[]>(mockDrafts);
  const [activeTab, setActiveTab] = React.useState('all');
  const [selectedType, setSelectedType] = React.useState<
    TransactionType | 'all'
  >('all');
  const [showForm, setShowForm] = React.useState(false);

  // Bank Transfer form state
  const [bankTransferForm, setBankTransferForm] = React.useState({
    transactionId: '',
    fromAccount: '',
    toAccount: '',
    amount: '',
    transferType: '',
    approvalAuthority: '',
    approvalLimit: '',
    approverName: '',
    approvalStatus: '',
    dateTime: '',
    doaCompliance: ''
  });

  // Loan form state
  const [loanForm, setLoanForm] = React.useState({
    loanType: '',
    lenderName: '',
    loanAmount: '',
    tenure: '',
    interestType: '',
    approvalAuthority: '',
    boardApprovalRequired: '',
    agreementStatus: '',
    doaCompliance: ''
  });

  // Investment form state
  const [investmentForm, setInvestmentForm] = React.useState({
    investmentType: '',
    counterparty: '',
    amount: '',
    tenure: '',
    expectedReturn: '',
    approvalAuthority: '',
    approvalLimit: '',
    status: '',
    doaCompliance: ''
  });

  // Cheque Signing (Bank Signatory) form state
  const [signatoryForm, setSignatoryForm] = React.useState({
    bankName: '',
    accountNumber: '',
    oldSignatory: '',
    newSignatory: '',
    reasonForChange: '',
    approvedBy: '',
    effectiveDate: '',
    status: ''
  });

  const resetForms = () => {
    setBankTransferForm({
      transactionId: '',
      fromAccount: '',
      toAccount: '',
      amount: '',
      transferType: '',
      approvalAuthority: '',
      approvalLimit: '',
      approverName: '',
      approvalStatus: '',
      dateTime: '',
      doaCompliance: ''
    });
    setLoanForm({
      loanType: '',
      lenderName: '',
      loanAmount: '',
      tenure: '',
      interestType: '',
      approvalAuthority: '',
      boardApprovalRequired: '',
      agreementStatus: '',
      doaCompliance: ''
    });
    setInvestmentForm({
      investmentType: '',
      counterparty: '',
      amount: '',
      tenure: '',
      expectedReturn: '',
      approvalAuthority: '',
      approvalLimit: '',
      status: '',
      doaCompliance: ''
    });
    setSignatoryForm({
      bankName: '',
      accountNumber: '',
      oldSignatory: '',
      newSignatory: '',
      reasonForChange: '',
      approvedBy: '',
      effectiveDate: '',
      status: ''
    });
  };

  const handleTypeChange = (value: string) => {
    setSelectedType(value as TransactionType | 'all');
    if (value !== 'all') {
      setShowForm(true);
      resetForms();
    } else {
      setShowForm(false);
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setSelectedType('all');
    resetForms();
  };

  const handleSaveDraft = () => {
    if (selectedType === 'all') return;

    let description = '';
    let amount = 0;

    switch (selectedType) {
      case 'Bank Transfers':
        description = `Transfer from ${bankTransferForm.fromAccount} to ${bankTransferForm.toAccount}`;
        amount = parseFloat(bankTransferForm.amount) || 0;
        break;
      case 'Loan Agreements':
        description = `${loanForm.loanType} - ${loanForm.lenderName}`;
        amount = parseFloat(loanForm.loanAmount) || 0;
        break;
      case 'Investment Creations':
        description = `${investmentForm.investmentType} - ${investmentForm.counterparty}`;
        amount = parseFloat(investmentForm.amount) || 0;
        break;
      case 'Change in Bank Signatories':
        description = `Bank Signatory Change - ${signatoryForm.bankName}`;
        amount = 0;
        break;
      case 'Loan Borrowing':
        description = `Loan Borrowing - ${loanForm.lenderName}`;
        amount = parseFloat(loanForm.loanAmount) || 0;
        break;
    }

    const newDraft: DraftTransaction = {
      id: `TXN-${String(drafts.length + 1).padStart(3, '0')}`,
      type: selectedType,
      description,
      amount,
      status: 'Draft',
      createdDate: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0]
    };

    setDrafts([newDraft, ...drafts]);
    handleCancelForm();
  };

  const handleSubmitForApproval = () => {
    if (selectedType === 'all') return;

    let description = '';
    let amount = 0;

    switch (selectedType) {
      case 'Bank Transfers':
        description = `Transfer from ${bankTransferForm.fromAccount} to ${bankTransferForm.toAccount}`;
        amount = parseFloat(bankTransferForm.amount) || 0;
        break;
      case 'Loan Agreements':
        description = `${loanForm.loanType} - ${loanForm.lenderName}`;
        amount = parseFloat(loanForm.loanAmount) || 0;
        break;
      case 'Investment Creations':
        description = `${investmentForm.investmentType} - ${investmentForm.counterparty}`;
        amount = parseFloat(investmentForm.amount) || 0;
        break;
      case 'Change in Bank Signatories':
        description = `Bank Signatory Change - ${signatoryForm.bankName}`;
        amount = 0;
        break;
      case 'Loan Borrowing':
        description = `Loan Borrowing - ${loanForm.lenderName}`;
        amount = parseFloat(loanForm.loanAmount) || 0;
        break;
    }

    const newDraft: DraftTransaction = {
      id: `TXN-${String(drafts.length + 1).padStart(3, '0')}`,
      type: selectedType,
      description,
      amount,
      status: 'Submitted',
      createdDate: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0],
      submittedTo: 'Department Head'
    };

    setDrafts([newDraft, ...drafts]);
    handleCancelForm();
  };

  const filteredDrafts = drafts.filter((d) => {
    const matchesStatus =
      activeTab === 'all' || d.status.toLowerCase() === activeTab;
    return matchesStatus;
  });

  // Bank Transfer Form
  const renderBankTransferForm = () => (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Building2 className='h-5 w-5' />
          Bank Transfer
        </CardTitle>
        <CardDescription>Control cash movement</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className='max-h-[60vh] pr-4'>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
            <div className='space-y-2'>
              <Label>Transaction ID</Label>
              <Input
                placeholder='Auto-generated'
                value={bankTransferForm.transactionId}
                onChange={(e) =>
                  setBankTransferForm({
                    ...bankTransferForm,
                    transactionId: e.target.value
                  })
                }
              />
            </div>
            <div className='space-y-2'>
              <Label>From Account *</Label>
              <Input
                placeholder='Enter source account'
                value={bankTransferForm.fromAccount}
                onChange={(e) =>
                  setBankTransferForm({
                    ...bankTransferForm,
                    fromAccount: e.target.value
                  })
                }
              />
            </div>
            <div className='space-y-2'>
              <Label>To Account *</Label>
              <Input
                placeholder='Enter destination account'
                value={bankTransferForm.toAccount}
                onChange={(e) =>
                  setBankTransferForm({
                    ...bankTransferForm,
                    toAccount: e.target.value
                  })
                }
              />
            </div>
            <div className='space-y-2'>
              <Label>Amount (CR) *</Label>
              <Input
                type='number'
                placeholder='0.00'
                value={bankTransferForm.amount}
                onChange={(e) =>
                  setBankTransferForm({
                    ...bankTransferForm,
                    amount: e.target.value
                  })
                }
              />
            </div>
            <div className='space-y-2'>
              <Label>Transfer Type *</Label>
              <Select
                value={bankTransferForm.transferType}
                onValueChange={(value) =>
                  setBankTransferForm({
                    ...bankTransferForm,
                    transferType: value
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select type' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='RTGS'>RTGS</SelectItem>
                  <SelectItem value='NEFT'>NEFT</SelectItem>
                  <SelectItem value='Internal'>Internal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='space-y-2'>
              <Label>Approval Authority (as per DOA)</Label>
              <Input
                placeholder='Enter approval authority'
                value={bankTransferForm.approvalAuthority}
                onChange={(e) =>
                  setBankTransferForm({
                    ...bankTransferForm,
                    approvalAuthority: e.target.value
                  })
                }
              />
            </div>
            <div className='space-y-2'>
              <Label>Approval Limit (CR)</Label>
              <Input
                type='number'
                placeholder='0.00'
                value={bankTransferForm.approvalLimit}
                onChange={(e) =>
                  setBankTransferForm({
                    ...bankTransferForm,
                    approvalLimit: e.target.value
                  })
                }
              />
            </div>
            <div className='space-y-2'>
              <Label>Approver Name</Label>
              <Input
                placeholder='Enter approver name'
                value={bankTransferForm.approverName}
                onChange={(e) =>
                  setBankTransferForm({
                    ...bankTransferForm,
                    approverName: e.target.value
                  })
                }
              />
            </div>
            <div className='space-y-2'>
              <Label>Approval Status</Label>
              <Select
                value={bankTransferForm.approvalStatus}
                onValueChange={(value) =>
                  setBankTransferForm({
                    ...bankTransferForm,
                    approvalStatus: value
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select status' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='Pending'>Pending</SelectItem>
                  <SelectItem value='Approved'>Approved</SelectItem>
                  <SelectItem value='Rejected'>Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='space-y-2'>
              <Label>Date & Time</Label>
              <Input
                type='datetime-local'
                value={bankTransferForm.dateTime}
                onChange={(e) =>
                  setBankTransferForm({
                    ...bankTransferForm,
                    dateTime: e.target.value
                  })
                }
              />
            </div>
            <div className='space-y-2'>
              <Label>DOA Compliance *</Label>
              <Select
                value={bankTransferForm.doaCompliance}
                onValueChange={(value) =>
                  setBankTransferForm({
                    ...bankTransferForm,
                    doaCompliance: value
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='Yes'>Yes</SelectItem>
                  <SelectItem value='No'>No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* Attachments */}
          <div className='mt-6 space-y-2'>
            <Label>Attachments</Label>
            <div className='rounded-lg border-2 border-dashed p-6 text-center'>
              <Upload className='text-muted-foreground mx-auto mb-2 h-8 w-8' />
              <p className='text-muted-foreground text-sm'>
                Drag and drop files here, or click to browse
              </p>
              <Button variant='outline' size='sm' className='mt-2'>
                <FileUp className='mr-2 h-4 w-4' />
                Browse Files
              </Button>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );

  // Loan Form
  const renderLoanForm = () => (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Landmark className='h-5 w-5' />
          Loan Agreement
        </CardTitle>
        <CardDescription>Debt governance</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className='max-h-[60vh] pr-4'>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
            <div className='space-y-2'>
              <Label>Loan Type *</Label>
              <Select
                value={loanForm.loanType}
                onValueChange={(value) =>
                  setLoanForm({ ...loanForm, loanType: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select loan type' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='Term Loan'>Term Loan</SelectItem>
                  <SelectItem value='Working Capital'>
                    Working Capital (WC)
                  </SelectItem>
                  <SelectItem value='Overdraft'>Overdraft (OD)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='space-y-2'>
              <Label>Lender Name *</Label>
              <Input
                placeholder='Enter lender name'
                value={loanForm.lenderName}
                onChange={(e) =>
                  setLoanForm({ ...loanForm, lenderName: e.target.value })
                }
              />
            </div>
            <div className='space-y-2'>
              <Label>Loan Amount (CR) *</Label>
              <Input
                type='number'
                placeholder='0.00'
                value={loanForm.loanAmount}
                onChange={(e) =>
                  setLoanForm({ ...loanForm, loanAmount: e.target.value })
                }
              />
            </div>
            <div className='space-y-2'>
              <Label>Tenure *</Label>
              <Input
                placeholder='e.g., 5 Years'
                value={loanForm.tenure}
                onChange={(e) =>
                  setLoanForm({ ...loanForm, tenure: e.target.value })
                }
              />
            </div>
            <div className='space-y-2'>
              <Label>Interest Type *</Label>
              <Select
                value={loanForm.interestType}
                onValueChange={(value) =>
                  setLoanForm({ ...loanForm, interestType: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select interest type' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='Fixed'>Fixed</SelectItem>
                  <SelectItem value='Floating'>Floating</SelectItem>
                  <SelectItem value='Mixed'>Mixed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='space-y-2'>
              <Label>Approval Authority</Label>
              <Input
                placeholder='Enter approval authority'
                value={loanForm.approvalAuthority}
                onChange={(e) =>
                  setLoanForm({
                    ...loanForm,
                    approvalAuthority: e.target.value
                  })
                }
              />
            </div>
            <div className='space-y-2'>
              <Label>Board Approval Required *</Label>
              <Select
                value={loanForm.boardApprovalRequired}
                onValueChange={(value) =>
                  setLoanForm({ ...loanForm, boardApprovalRequired: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='Yes'>Yes</SelectItem>
                  <SelectItem value='No'>No</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='space-y-2'>
              <Label>Agreement Status</Label>
              <Select
                value={loanForm.agreementStatus}
                onValueChange={(value) =>
                  setLoanForm({ ...loanForm, agreementStatus: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select status' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='Draft'>Draft</SelectItem>
                  <SelectItem value='Under Review'>Under Review</SelectItem>
                  <SelectItem value='Approved'>Approved</SelectItem>
                  <SelectItem value='Active'>Active</SelectItem>
                  <SelectItem value='Closed'>Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='space-y-2'>
              <Label>DOA Compliance *</Label>
              <Select
                value={loanForm.doaCompliance}
                onValueChange={(value) =>
                  setLoanForm({ ...loanForm, doaCompliance: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='Yes'>Yes</SelectItem>
                  <SelectItem value='No'>No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* Attachments */}
          <div className='mt-6 space-y-2'>
            <Label>Attachments</Label>
            <div className='rounded-lg border-2 border-dashed p-6 text-center'>
              <Upload className='text-muted-foreground mx-auto mb-2 h-8 w-8' />
              <p className='text-muted-foreground text-sm'>
                Drag and drop files here, or click to browse
              </p>
              <Button variant='outline' size='sm' className='mt-2'>
                <FileUp className='mr-2 h-4 w-4' />
                Browse Files
              </Button>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );

  // Investment Form
  const renderInvestmentForm = () => (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <PiggyBank className='h-5 w-5' />
          Investment Creation
        </CardTitle>
        <CardDescription>Cash surplus utilization</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className='max-h-[60vh] pr-4'>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
            <div className='space-y-2'>
              <Label>Investment Type *</Label>
              <Select
                value={investmentForm.investmentType}
                onValueChange={(value) =>
                  setInvestmentForm({
                    ...investmentForm,
                    investmentType: value
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select investment type' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='Fixed Deposit'>
                    Fixed Deposit (FD)
                  </SelectItem>
                  <SelectItem value='Mutual Fund'>Mutual Fund (MF)</SelectItem>
                  <SelectItem value='Bonds'>Bonds</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='space-y-2'>
              <Label>Counterparty *</Label>
              <Input
                placeholder='Enter counterparty name'
                value={investmentForm.counterparty}
                onChange={(e) =>
                  setInvestmentForm({
                    ...investmentForm,
                    counterparty: e.target.value
                  })
                }
              />
            </div>
            <div className='space-y-2'>
              <Label>Amount (CR) *</Label>
              <Input
                type='number'
                placeholder='0.00'
                value={investmentForm.amount}
                onChange={(e) =>
                  setInvestmentForm({
                    ...investmentForm,
                    amount: e.target.value
                  })
                }
              />
            </div>
            <div className='space-y-2'>
              <Label>Tenure *</Label>
              <Input
                placeholder='e.g., 12 Months'
                value={investmentForm.tenure}
                onChange={(e) =>
                  setInvestmentForm({
                    ...investmentForm,
                    tenure: e.target.value
                  })
                }
              />
            </div>
            <div className='space-y-2'>
              <Label>Expected Return (%) *</Label>
              <Input
                type='number'
                placeholder='0.00'
                value={investmentForm.expectedReturn}
                onChange={(e) =>
                  setInvestmentForm({
                    ...investmentForm,
                    expectedReturn: e.target.value
                  })
                }
              />
            </div>
            <div className='space-y-2'>
              <Label>Approval Authority</Label>
              <Input
                placeholder='Enter approval authority'
                value={investmentForm.approvalAuthority}
                onChange={(e) =>
                  setInvestmentForm({
                    ...investmentForm,
                    approvalAuthority: e.target.value
                  })
                }
              />
            </div>
            <div className='space-y-2'>
              <Label>Approval Limit (CR)</Label>
              <Input
                type='number'
                placeholder='0.00'
                value={investmentForm.approvalLimit}
                onChange={(e) =>
                  setInvestmentForm({
                    ...investmentForm,
                    approvalLimit: e.target.value
                  })
                }
              />
            </div>
            <div className='space-y-2'>
              <Label>Status</Label>
              <Select
                value={investmentForm.status}
                onValueChange={(value) =>
                  setInvestmentForm({ ...investmentForm, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select status' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='Pending'>Pending</SelectItem>
                  <SelectItem value='Active'>Active</SelectItem>
                  <SelectItem value='Matured'>Matured</SelectItem>
                  <SelectItem value='Withdrawn'>Withdrawn</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='space-y-2'>
              <Label>DOA Compliance *</Label>
              <Select
                value={investmentForm.doaCompliance}
                onValueChange={(value) =>
                  setInvestmentForm({ ...investmentForm, doaCompliance: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='Yes'>Yes</SelectItem>
                  <SelectItem value='No'>No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* Attachments */}
          <div className='mt-6 space-y-2'>
            <Label>Attachments</Label>
            <div className='rounded-lg border-2 border-dashed p-6 text-center'>
              <Upload className='text-muted-foreground mx-auto mb-2 h-8 w-8' />
              <p className='text-muted-foreground text-sm'>
                Drag and drop files here, or click to browse
              </p>
              <Button variant='outline' size='sm' className='mt-2'>
                <FileUp className='mr-2 h-4 w-4' />
                Browse Files
              </Button>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );

  // Cheque Signing (Bank Signatory Change) Form
  const renderSignatoryForm = () => (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <FileSignature className='h-5 w-5' />
          Change in Bank Signatories
        </CardTitle>
        <CardDescription>Risk & fraud prevention</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className='max-h-[60vh] pr-4'>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
            <div className='space-y-2'>
              <Label>Bank Name *</Label>
              <Input
                placeholder='Enter bank name'
                value={signatoryForm.bankName}
                onChange={(e) =>
                  setSignatoryForm({
                    ...signatoryForm,
                    bankName: e.target.value
                  })
                }
              />
            </div>
            <div className='space-y-2'>
              <Label>Account Number *</Label>
              <Input
                placeholder='Enter account number'
                value={signatoryForm.accountNumber}
                onChange={(e) =>
                  setSignatoryForm({
                    ...signatoryForm,
                    accountNumber: e.target.value
                  })
                }
              />
            </div>
            <div className='space-y-2'>
              <Label>Old Signatory *</Label>
              <Input
                placeholder='Enter old signatory name'
                value={signatoryForm.oldSignatory}
                onChange={(e) =>
                  setSignatoryForm({
                    ...signatoryForm,
                    oldSignatory: e.target.value
                  })
                }
              />
            </div>
            <div className='space-y-2'>
              <Label>New Signatory *</Label>
              <Input
                placeholder='Enter new signatory name'
                value={signatoryForm.newSignatory}
                onChange={(e) =>
                  setSignatoryForm({
                    ...signatoryForm,
                    newSignatory: e.target.value
                  })
                }
              />
            </div>
            <div className='space-y-2 md:col-span-2'>
              <Label>Reason for Change *</Label>
              <Textarea
                placeholder='Enter reason for signatory change'
                value={signatoryForm.reasonForChange}
                onChange={(e) =>
                  setSignatoryForm({
                    ...signatoryForm,
                    reasonForChange: e.target.value
                  })
                }
              />
            </div>
            <div className='space-y-2'>
              <Label>Approved By</Label>
              <Input
                placeholder='Enter approver name'
                value={signatoryForm.approvedBy}
                onChange={(e) =>
                  setSignatoryForm({
                    ...signatoryForm,
                    approvedBy: e.target.value
                  })
                }
              />
            </div>
            <div className='space-y-2'>
              <Label>Effective Date *</Label>
              <Input
                type='date'
                value={signatoryForm.effectiveDate}
                onChange={(e) =>
                  setSignatoryForm({
                    ...signatoryForm,
                    effectiveDate: e.target.value
                  })
                }
              />
            </div>
            <div className='space-y-2'>
              <Label>Status</Label>
              <Select
                value={signatoryForm.status}
                onValueChange={(value) =>
                  setSignatoryForm({ ...signatoryForm, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select status' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='Pending'>Pending</SelectItem>
                  <SelectItem value='Approved'>Approved</SelectItem>
                  <SelectItem value='Rejected'>Rejected</SelectItem>
                  <SelectItem value='Completed'>Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* Attachments */}
          <div className='mt-6 space-y-2'>
            <Label>Attachments</Label>
            <div className='rounded-lg border-2 border-dashed p-6 text-center'>
              <Upload className='text-muted-foreground mx-auto mb-2 h-8 w-8' />
              <p className='text-muted-foreground text-sm'>
                Drag and drop files here, or click to browse
              </p>
              <Button variant='outline' size='sm' className='mt-2'>
                <FileUp className='mr-2 h-4 w-4' />
                Browse Files
              </Button>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );

  const renderSelectedForm = () => {
    switch (selectedType) {
      case 'Bank Transfers':
        return renderBankTransferForm();
      case 'Loan Agreements':
        return renderLoanForm();
      case 'Investment Creations':
        return renderInvestmentForm();
      case 'Change in Bank Signatories':
        return renderSignatoryForm();
      case 'Loan Borrowing':
        return renderLoanForm();
      default:
        return null;
    }
  };

  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-6'>
        {/* Header */}
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              Treasury Executive Portal
            </h2>
            <p className='text-muted-foreground'>
              Upload documents and fill forms for treasury transactions
            </p>
          </div>
          <div className='flex items-center gap-3'>
            <Select value={selectedType} onValueChange={handleTypeChange}>
              <SelectTrigger className='w-[220px]'>
                <SelectValue placeholder='Select transaction type' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>Select Type</SelectItem>
                <SelectItem value='Bank Transfers'>
                  <div className='flex items-center gap-2'>
                    <Building2 className='h-4 w-4' />
                    Bank Transfers
                  </div>
                </SelectItem>
                <SelectItem value='Loan Agreements'>
                  <div className='flex items-center gap-2'>
                    <Landmark className='h-4 w-4' />
                    Loan Agreements
                  </div>
                </SelectItem>
                <SelectItem value='Investment Creations'>
                  <div className='flex items-center gap-2'>
                    <PiggyBank className='h-4 w-4' />
                    Investment Creations
                  </div>
                </SelectItem>
                <SelectItem value='Change in Bank Signatories'>
                  <div className='flex items-center gap-2'>
                    <FileSignature className='h-4 w-4' />
                    Change in Bank Signatories
                  </div>
                </SelectItem>
                <SelectItem value='Loan Borrowing'>
                  <div className='flex items-center gap-2'>
                    <Landmark className='h-4 w-4' />
                    Loan Borrowing
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            {!showForm && (
              <Button
                onClick={() => setShowForm(true)}
                disabled={selectedType === 'all'}
                className='gap-2'
              >
                <Plus className='h-4 w-4' />
                New Transaction
              </Button>
            )}
          </div>
        </div>

        {/* Form Section - Shows when a type is selected */}
        {showForm && selectedType !== 'all' && (
          <div className='space-y-4'>
            {renderSelectedForm()}
            {/* Form Actions */}
            <div className='flex items-center justify-end gap-3'>
              <Button
                variant='outline'
                onClick={handleCancelForm}
                className='gap-2'
              >
                <X className='h-4 w-4' />
                Cancel
              </Button>
              <Button
                variant='secondary'
                onClick={handleSaveDraft}
                className='gap-2'
              >
                <Save className='h-4 w-4' />
                Save as Draft
              </Button>
              <Button onClick={handleSubmitForApproval} className='gap-2'>
                <Send className='h-4 w-4' />
                Submit for Approval
              </Button>
            </div>
          </div>
        )}

        {/* My Requests Table */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Briefcase className='h-5 w-5' />
              My Transaction Requests
            </CardTitle>
            <CardDescription>
              View and manage your transaction requests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className='mb-4'>
                <TabsTrigger value='all'>All</TabsTrigger>
                <TabsTrigger value='draft'>Drafts</TabsTrigger>
                <TabsTrigger value='submitted'>Submitted</TabsTrigger>
                <TabsTrigger value='returned'>Returned</TabsTrigger>
                <TabsTrigger value='approved'>Approved</TabsTrigger>
              </TabsList>
              <TabsContent value={activeTab}>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className='whitespace-nowrap'>
                        Request ID
                      </TableHead>
                      <TableHead className='whitespace-nowrap'>Type</TableHead>
                      <TableHead className='whitespace-nowrap'>
                        Description
                      </TableHead>
                      <TableHead className='whitespace-nowrap'>
                        Amount (CR)
                      </TableHead>
                      <TableHead className='whitespace-nowrap'>
                        Status
                      </TableHead>
                      <TableHead className='whitespace-nowrap'>
                        Created
                      </TableHead>
                      <TableHead className='whitespace-nowrap'>
                        Last Modified
                      </TableHead>
                      <TableHead className='whitespace-nowrap'>
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDrafts.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={8}
                          className='text-muted-foreground py-8 text-center'
                        >
                          No requests found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredDrafts.map((draft) => {
                        const IconComponent = getTypeIcon(draft.type);
                        return (
                          <TableRow key={draft.id}>
                            <TableCell className='font-medium whitespace-nowrap'>
                              {draft.id}
                            </TableCell>
                            <TableCell className='whitespace-nowrap'>
                              <div className='flex items-center gap-2'>
                                <IconComponent className='text-muted-foreground h-4 w-4' />
                                {draft.type}
                              </div>
                            </TableCell>
                            <TableCell className='max-w-[200px] truncate'>
                              {draft.description}
                            </TableCell>
                            <TableCell className='whitespace-nowrap'>
                              {draft.amount > 0
                                ? `₹${draft.amount.toFixed(2)}`
                                : '-'}
                            </TableCell>
                            <TableCell className='whitespace-nowrap'>
                              {getStatusBadge(draft.status)}
                              {draft.returnReason && (
                                <p
                                  className='mt-1 max-w-[150px] truncate text-[10px] text-red-600'
                                  title={draft.returnReason}
                                >
                                  {draft.returnReason}
                                </p>
                              )}
                            </TableCell>
                            <TableCell className='whitespace-nowrap'>
                              {draft.createdDate}
                            </TableCell>
                            <TableCell className='whitespace-nowrap'>
                              {draft.lastModified}
                            </TableCell>
                            <TableCell className='whitespace-nowrap'>
                              <div className='flex items-center gap-1'>
                                <Button
                                  variant='ghost'
                                  size='sm'
                                  className='h-8 w-8 p-0'
                                >
                                  <Eye className='h-4 w-4' />
                                </Button>
                                {(draft.status === 'Draft' ||
                                  draft.status === 'Returned') && (
                                  <>
                                    <Button
                                      variant='ghost'
                                      size='sm'
                                      className='h-8 w-8 p-0'
                                    >
                                      <Edit className='h-4 w-4' />
                                    </Button>
                                    <Button
                                      variant='ghost'
                                      size='sm'
                                      className='h-8 w-8 p-0 text-red-600 hover:text-red-700'
                                    >
                                      <Trash2 className='h-4 w-4' />
                                    </Button>
                                  </>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
