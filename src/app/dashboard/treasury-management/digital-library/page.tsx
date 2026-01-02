'use client';

import * as React from 'react';
import {
  Search,
  FileText,
  Download,
  Eye,
  Filter,
  Calendar,
  Building2,
  Landmark,
  PiggyBank,
  Shield,
  FileSignature,
  UserCog,
  FolderOpen,
  File,
  FileSpreadsheet,
  FileImage,
  Clock,
  CheckCircle2,
  X
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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

// Document Types
type DocumentType =
  | 'Agreement'
  | 'Approval Letter'
  | 'Bank Statement'
  | 'Board Resolution'
  | 'Compliance Certificate'
  | 'Invoice'
  | 'Supporting Document';
type TreasuryType =
  | 'Bank Transfer'
  | 'Loan Agreement'
  | 'Investment Creation'
  | 'Guarantee'
  | 'Bank Signatory Change'
  | 'Loan Borrowing';

type Document = {
  id: string;
  transactionId: string;
  documentName: string;
  documentType: DocumentType;
  treasuryType: TreasuryType;
  uploadedBy: string;
  uploadedDate: string;
  fileSize: string;
  fileFormat: 'PDF' | 'XLSX' | 'DOCX' | 'PNG' | 'JPG';
  description: string;
  company: string;
  status: 'Active' | 'Archived' | 'Pending Review';
  version: string;
  tags: string[];
};

// Mock Documents Data
const mockDocuments: Document[] = [
  {
    id: 'DOC-001',
    transactionId: 'TXN-2025-00023',
    documentName: 'Loan Agreement - HDFC Bank',
    documentType: 'Agreement',
    treasuryType: 'Loan Agreement',
    uploadedBy: 'Deepak Verma',
    uploadedDate: '2025-12-12',
    fileSize: '2.4 MB',
    fileFormat: 'PDF',
    description: 'Term loan agreement document for capacity expansion',
    company: 'HMC Hive',
    status: 'Active',
    version: '1.0',
    tags: ['loan', 'hdfc', 'term-loan']
  },
  {
    id: 'DOC-002',
    transactionId: 'TXN-2025-00023',
    documentName: 'Board Resolution - Loan Approval',
    documentType: 'Board Resolution',
    treasuryType: 'Loan Agreement',
    uploadedBy: 'Anil Gupta',
    uploadedDate: '2025-12-10',
    fileSize: '1.1 MB',
    fileFormat: 'PDF',
    description: 'Board resolution approving the term loan facility',
    company: 'HMC Hive',
    status: 'Active',
    version: '1.0',
    tags: ['board', 'resolution', 'approval']
  },
  {
    id: 'DOC-003',
    transactionId: 'TXN-2025-00030',
    documentName: 'FD Investment Certificate - SBI',
    documentType: 'Compliance Certificate',
    treasuryType: 'Investment Creation',
    uploadedBy: 'Kavita Rao',
    uploadedDate: '2025-12-17',
    fileSize: '856 KB',
    fileFormat: 'PDF',
    description: 'Fixed deposit certificate for SBI investment',
    company: 'HMC Hive',
    status: 'Active',
    version: '1.0',
    tags: ['fd', 'sbi', 'investment']
  },
  {
    id: 'DOC-004',
    transactionId: 'TXN-2025-00031',
    documentName: 'Working Capital Loan Agreement',
    documentType: 'Agreement',
    treasuryType: 'Loan Borrowing',
    uploadedBy: 'Neeraj Agarwal',
    uploadedDate: '2025-12-19',
    fileSize: '3.2 MB',
    fileFormat: 'PDF',
    description: 'Working capital loan agreement with HDFC Bank',
    company: 'HMC Hive',
    status: 'Pending Review',
    version: '1.0',
    tags: ['working-capital', 'hdfc', 'loan']
  },
  {
    id: 'DOC-005',
    transactionId: 'TXN-2025-00032',
    documentName: 'Bank Transfer Authorization',
    documentType: 'Approval Letter',
    treasuryType: 'Bank Transfer',
    uploadedBy: 'Pooja Sharma',
    uploadedDate: '2025-12-22',
    fileSize: '524 KB',
    fileFormat: 'PDF',
    description: 'Authorization letter for inter-company fund transfer',
    company: 'Hero Cycles',
    status: 'Active',
    version: '1.0',
    tags: ['transfer', 'authorization']
  },
  {
    id: 'DOC-006',
    transactionId: 'TXN-2025-00034',
    documentName: 'Signatory Change Request Form',
    documentType: 'Supporting Document',
    treasuryType: 'Bank Signatory Change',
    uploadedBy: 'Ashok Mittal',
    uploadedDate: '2025-12-01',
    fileSize: '1.8 MB',
    fileFormat: 'PDF',
    description: 'Request form for change in authorized bank signatory',
    company: 'Munjal Group',
    status: 'Pending Review',
    version: '2.0',
    tags: ['signatory', 'change', 'bank']
  },
  {
    id: 'DOC-007',
    transactionId: 'TXN-2025-00034',
    documentName: 'KYC Documents - New Signatory',
    documentType: 'Supporting Document',
    treasuryType: 'Bank Signatory Change',
    uploadedBy: 'HR Department',
    uploadedDate: '2025-12-02',
    fileSize: '4.5 MB',
    fileFormat: 'PDF',
    description: 'KYC and identity documents for new signatory',
    company: 'Munjal Group',
    status: 'Active',
    version: '1.0',
    tags: ['kyc', 'signatory', 'identity']
  },
  {
    id: 'DOC-008',
    transactionId: 'TXN-2025-00036',
    documentName: 'Mutual Fund Investment Proposal',
    documentType: 'Supporting Document',
    treasuryType: 'Investment Creation',
    uploadedBy: 'Priya Menon',
    uploadedDate: '2025-12-23',
    fileSize: '2.1 MB',
    fileFormat: 'PDF',
    description: 'Investment proposal for HDFC Balanced Fund',
    company: 'HMC Hive',
    status: 'Active',
    version: '1.0',
    tags: ['mutual-fund', 'investment', 'hdfc']
  },
  {
    id: 'DOC-009',
    transactionId: 'TXN-2025-00037',
    documentName: 'Term Loan Sanction Letter - ICICI',
    documentType: 'Approval Letter',
    treasuryType: 'Loan Borrowing',
    uploadedBy: 'Arun Nair',
    uploadedDate: '2025-12-15',
    fileSize: '1.5 MB',
    fileFormat: 'PDF',
    description: 'Sanction letter from ICICI Bank for plant expansion loan',
    company: 'Hero Motors',
    status: 'Active',
    version: '1.0',
    tags: ['sanction', 'icici', 'loan']
  },
  {
    id: 'DOC-010',
    transactionId: 'TXN-2025-00037',
    documentName: 'Loan Amortization Schedule',
    documentType: 'Supporting Document',
    treasuryType: 'Loan Borrowing',
    uploadedBy: 'Arun Nair',
    uploadedDate: '2025-12-16',
    fileSize: '245 KB',
    fileFormat: 'XLSX',
    description: 'Repayment schedule for the term loan',
    company: 'Hero Motors',
    status: 'Active',
    version: '1.0',
    tags: ['amortization', 'schedule', 'repayment']
  },
  {
    id: 'DOC-011',
    transactionId: 'TXN-2025-00038',
    documentName: 'RBI Compliance Documents',
    documentType: 'Compliance Certificate',
    treasuryType: 'Bank Transfer',
    uploadedBy: 'Rohit Malhotra',
    uploadedDate: '2025-12-28',
    fileSize: '3.8 MB',
    fileFormat: 'PDF',
    description: 'RBI compliance documents for international transfer',
    company: 'Munjal Group',
    status: 'Pending Review',
    version: '1.0',
    tags: ['rbi', 'compliance', 'international']
  },
  {
    id: 'DOC-012',
    transactionId: 'TXN-2025-00039',
    documentName: 'Working Capital Facility Agreement - Axis',
    documentType: 'Agreement',
    treasuryType: 'Loan Agreement',
    uploadedBy: 'Manish Jain',
    uploadedDate: '2025-12-27',
    fileSize: '2.9 MB',
    fileFormat: 'PDF',
    description: 'Working capital facility agreement with Axis Bank',
    company: 'HMC Hive',
    status: 'Active',
    version: '1.0',
    tags: ['working-capital', 'axis', 'facility']
  },
  {
    id: 'DOC-013',
    transactionId: 'TXN-2025-00040',
    documentName: 'FD Receipt - SBI',
    documentType: 'Invoice',
    treasuryType: 'Investment Creation',
    uploadedBy: 'Divya Nair',
    uploadedDate: '2025-12-30',
    fileSize: '156 KB',
    fileFormat: 'PDF',
    description: 'Fixed deposit receipt for 6-month tenure',
    company: 'Hero Cycles',
    status: 'Active',
    version: '1.0',
    tags: ['fd', 'receipt', 'sbi']
  },
  {
    id: 'DOC-014',
    transactionId: 'TXN-2025-00042',
    documentName: 'Acquisition Financing Term Sheet',
    documentType: 'Agreement',
    treasuryType: 'Loan Borrowing',
    uploadedBy: 'Rajiv Mehta',
    uploadedDate: '2025-12-13',
    fileSize: '1.7 MB',
    fileFormat: 'PDF',
    description: 'Term sheet for acquisition financing from bank consortium',
    company: 'Munjal Group',
    status: 'Pending Review',
    version: '1.0',
    tags: ['acquisition', 'term-sheet', 'financing']
  },
  {
    id: 'DOC-015',
    transactionId: 'TXN-2025-00043',
    documentName: 'Board Resolution - New Signatory',
    documentType: 'Board Resolution',
    treasuryType: 'Bank Signatory Change',
    uploadedBy: 'Sandeep Joshi',
    uploadedDate: '2025-12-20',
    fileSize: '890 KB',
    fileFormat: 'PDF',
    description:
      'Board resolution for adding new Finance Director as signatory',
    company: 'HMC Hive',
    status: 'Active',
    version: '1.0',
    tags: ['board', 'signatory', 'resolution']
  }
];

// Helper functions
const getTreasuryIcon = (type: TreasuryType) => {
  switch (type) {
    case 'Bank Transfer':
      return Building2;
    case 'Loan Agreement':
    case 'Loan Borrowing':
      return Landmark;
    case 'Investment Creation':
      return PiggyBank;
    case 'Guarantee':
      return Shield;
    case 'Bank Signatory Change':
      return UserCog;
    default:
      return FileText;
  }
};

const getFileIcon = (format: string) => {
  switch (format) {
    case 'PDF':
      return FileText;
    case 'XLSX':
      return FileSpreadsheet;
    case 'DOCX':
      return File;
    case 'PNG':
    case 'JPG':
      return FileImage;
    default:
      return File;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Active':
      return 'bg-green-100 text-green-700 border-green-300';
    case 'Pending Review':
      return 'bg-amber-100 text-amber-700 border-amber-300';
    case 'Archived':
      return 'bg-gray-100 text-gray-700 border-gray-300';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-300';
  }
};

export default function DigitalLibraryPage() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [documentTypeFilter, setDocumentTypeFilter] =
    React.useState<string>('all');
  const [treasuryTypeFilter, setTreasuryTypeFilter] =
    React.useState<string>('all');
  const [statusFilter, setStatusFilter] = React.useState<string>('all');
  const [selectedDocument, setSelectedDocument] =
    React.useState<Document | null>(null);

  // Get unique values for filters
  const documentTypes = Array.from(
    new Set(mockDocuments.map((d) => d.documentType))
  );
  const treasuryTypes = Array.from(
    new Set(mockDocuments.map((d) => d.treasuryType))
  );

  // Filter documents
  const filteredDocuments = mockDocuments.filter((doc) => {
    const matchesSearch =
      searchQuery === '' ||
      doc.transactionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.documentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesDocType =
      documentTypeFilter === 'all' || doc.documentType === documentTypeFilter;
    const matchesTreasuryType =
      treasuryTypeFilter === 'all' || doc.treasuryType === treasuryTypeFilter;
    const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
    return (
      matchesSearch && matchesDocType && matchesTreasuryType && matchesStatus
    );
  });

  // Group documents by transaction ID for the search results
  const documentsByTransaction = filteredDocuments.reduce(
    (acc, doc) => {
      if (!acc[doc.transactionId]) {
        acc[doc.transactionId] = [];
      }
      acc[doc.transactionId].push(doc);
      return acc;
    },
    {} as Record<string, Document[]>
  );

  // Stats
  const totalDocuments = mockDocuments.length;
  const activeDocuments = mockDocuments.filter(
    (d) => d.status === 'Active'
  ).length;
  const pendingReview = mockDocuments.filter(
    (d) => d.status === 'Pending Review'
  ).length;

  return (
    <PageContainer>
      <div className='flex w-full min-w-0 flex-col gap-4'>
        {/* Header */}
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-2xl font-bold tracking-tight'>
              Digital Library
            </h1>
            <p className='text-muted-foreground text-sm'>
              Repository of all treasury documents - search by Transaction ID or
              keywords
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
          <Card className='p-4'>
            <div className='flex items-center gap-3'>
              <div className='rounded-lg bg-blue-100 p-2'>
                <FolderOpen className='h-5 w-5 text-blue-600' />
              </div>
              <div>
                <p className='text-2xl font-bold'>{totalDocuments}</p>
                <p className='text-muted-foreground text-xs'>Total Documents</p>
              </div>
            </div>
          </Card>
          <Card className='p-4'>
            <div className='flex items-center gap-3'>
              <div className='rounded-lg bg-green-100 p-2'>
                <CheckCircle2 className='h-5 w-5 text-green-600' />
              </div>
              <div>
                <p className='text-2xl font-bold'>{activeDocuments}</p>
                <p className='text-muted-foreground text-xs'>
                  Active Documents
                </p>
              </div>
            </div>
          </Card>
          <Card className='p-4'>
            <div className='flex items-center gap-3'>
              <div className='rounded-lg bg-amber-100 p-2'>
                <Clock className='h-5 w-5 text-amber-600' />
              </div>
              <div>
                <p className='text-2xl font-bold'>{pendingReview}</p>
                <p className='text-muted-foreground text-xs'>Pending Review</p>
              </div>
            </div>
          </Card>
          <Card className='p-4'>
            <div className='flex items-center gap-3'>
              <div className='rounded-lg bg-purple-100 p-2'>
                <FileText className='h-5 w-5 text-purple-600' />
              </div>
              <div>
                <p className='text-2xl font-bold'>
                  {Object.keys(documentsByTransaction).length}
                </p>
                <p className='text-muted-foreground text-xs'>Transactions</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className='overflow-hidden'>
          <CardHeader className='pb-3'>
            <CardTitle className='flex items-center gap-2 text-base'>
              <Search className='h-4 w-4' />
              Search Documents
            </CardTitle>
            <CardDescription>
              Search by Transaction ID, document name, description, or tags
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='flex flex-wrap gap-3'>
              <div className='relative min-w-[200px] flex-1'>
                <Search className='text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2' />
                <Input
                  placeholder='Search by Transaction ID, document name, or keywords...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='pl-9'
                />
              </div>
              <Select
                value={documentTypeFilter}
                onValueChange={setDocumentTypeFilter}
              >
                <SelectTrigger className='w-[160px]'>
                  <SelectValue placeholder='Document Type' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All Document Types</SelectItem>
                  {documentTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={treasuryTypeFilter}
                onValueChange={setTreasuryTypeFilter}
              >
                <SelectTrigger className='w-[160px]'>
                  <SelectValue placeholder='Treasury Type' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All Treasury Types</SelectItem>
                  {treasuryTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className='w-[130px]'>
                  <SelectValue placeholder='Status' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All Status</SelectItem>
                  <SelectItem value='Active'>Active</SelectItem>
                  <SelectItem value='Pending Review'>Pending Review</SelectItem>
                  <SelectItem value='Archived'>Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Documents Table */}
        <Card className='overflow-hidden'>
          <CardContent className='p-0'>
            <table className='w-full table-fixed border-collapse text-sm'>
              <thead>
                <tr className='bg-muted/50 border-b'>
                  <th className='h-10 w-[15%] px-4 text-left font-semibold'>
                    Transaction ID
                  </th>
                  <th className='h-10 w-[35%] px-4 text-left font-semibold'>
                    Document Name
                  </th>
                  <th className='h-10 w-[18%] px-4 text-left font-semibold'>
                    Type
                  </th>
                  <th className='h-10 w-[12%] px-4 text-left font-semibold'>
                    Uploaded
                  </th>
                  <th className='h-10 w-[10%] px-4 text-center font-semibold'>
                    Status
                  </th>
                  <th className='h-10 w-[10%] px-4 text-center font-semibold'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredDocuments.map((doc) => {
                  const FileIcon = getFileIcon(doc.fileFormat);
                  return (
                    <tr
                      key={doc.id}
                      className='hover:bg-muted/50 cursor-pointer border-b transition-colors'
                      onClick={() => setSelectedDocument(doc)}
                    >
                      <td className='h-11 px-4'>
                        <span className='font-medium text-blue-600'>
                          {doc.transactionId}
                        </span>
                      </td>
                      <td className='h-11 px-4'>
                        <div className='flex items-center gap-2'>
                          <FileIcon className='text-muted-foreground h-4 w-4 shrink-0' />
                          <span className='truncate font-medium'>
                            {doc.documentName}
                          </span>
                        </div>
                      </td>
                      <td className='h-11 truncate px-4'>{doc.documentType}</td>
                      <td className='text-muted-foreground h-11 px-4'>
                        {doc.uploadedDate}
                      </td>
                      <td className='h-11 px-4 text-center'>
                        <Badge
                          variant='outline'
                          className={`text-xs ${getStatusColor(doc.status)}`}
                        >
                          {doc.status}
                        </Badge>
                      </td>
                      <td className='h-11 px-4'>
                        <div className='flex items-center justify-center gap-1'>
                          <Button
                            variant='ghost'
                            size='sm'
                            className='h-7 w-7 p-0'
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedDocument(doc);
                            }}
                          >
                            <Eye className='h-4 w-4' />
                          </Button>
                          <Button
                            variant='ghost'
                            size='sm'
                            className='h-7 w-7 p-0'
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Download className='h-4 w-4' />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Document Detail Dialog */}
        <Dialog
          open={!!selectedDocument}
          onOpenChange={(open) => !open && setSelectedDocument(null)}
        >
          <DialogContent className='w-[700px] gap-0 overflow-hidden p-0'>
            {selectedDocument && (
              <>
                <DialogHeader className='bg-muted/30 border-b px-6 py-4'>
                  <div className='flex items-center gap-3'>
                    {(() => {
                      const FileIcon = getFileIcon(selectedDocument.fileFormat);
                      return (
                        <div className='rounded-lg bg-blue-100 p-3'>
                          <FileIcon className='h-6 w-6 text-blue-600' />
                        </div>
                      );
                    })()}
                    <div className='flex-1'>
                      <DialogTitle className='text-lg'>
                        {selectedDocument.documentName}
                      </DialogTitle>
                      <DialogDescription>
                        {selectedDocument.description}
                      </DialogDescription>
                    </div>
                    <Badge
                      variant='outline'
                      className={getStatusColor(selectedDocument.status)}
                    >
                      {selectedDocument.status}
                    </Badge>
                  </div>
                </DialogHeader>

                <div className='space-y-4 p-6'>
                  {/* Document Info Grid */}
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='rounded-lg border p-3'>
                      <p className='text-muted-foreground text-xs uppercase'>
                        Transaction ID
                      </p>
                      <p className='font-semibold text-blue-600'>
                        {selectedDocument.transactionId}
                      </p>
                    </div>
                    <div className='rounded-lg border p-3'>
                      <p className='text-muted-foreground text-xs uppercase'>
                        Document Type
                      </p>
                      <p className='font-medium'>
                        {selectedDocument.documentType}
                      </p>
                    </div>
                    <div className='rounded-lg border p-3'>
                      <p className='text-muted-foreground text-xs uppercase'>
                        Treasury Type
                      </p>
                      <p className='font-medium'>
                        {selectedDocument.treasuryType}
                      </p>
                    </div>
                    <div className='rounded-lg border p-3'>
                      <p className='text-muted-foreground text-xs uppercase'>
                        Company
                      </p>
                      <p className='font-medium'>{selectedDocument.company}</p>
                    </div>
                  </div>

                  {/* File Details */}
                  <div className='bg-muted/50 rounded-lg p-4'>
                    <p className='text-muted-foreground mb-3 text-xs uppercase'>
                      File Details
                    </p>
                    <div className='grid grid-cols-4 gap-4'>
                      <div>
                        <p className='text-muted-foreground text-xs'>Format</p>
                        <p className='font-medium'>
                          {selectedDocument.fileFormat}
                        </p>
                      </div>
                      <div>
                        <p className='text-muted-foreground text-xs'>Size</p>
                        <p className='font-medium'>
                          {selectedDocument.fileSize}
                        </p>
                      </div>
                      <div>
                        <p className='text-muted-foreground text-xs'>Version</p>
                        <p className='font-medium'>
                          {selectedDocument.version}
                        </p>
                      </div>
                      <div>
                        <p className='text-muted-foreground text-xs'>
                          Uploaded
                        </p>
                        <p className='font-medium'>
                          {selectedDocument.uploadedDate}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Uploaded By */}
                  <div className='rounded-lg border p-3'>
                    <p className='text-muted-foreground text-xs uppercase'>
                      Uploaded By
                    </p>
                    <p className='font-medium'>{selectedDocument.uploadedBy}</p>
                  </div>

                  {/* Tags */}
                  <div>
                    <p className='text-muted-foreground mb-2 text-xs uppercase'>
                      Tags
                    </p>
                    <div className='flex flex-wrap gap-2'>
                      {selectedDocument.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant='secondary'
                          className='text-xs'
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className='flex gap-3 pt-2'>
                    <Button className='flex-1'>
                      <Eye className='mr-2 h-4 w-4' />
                      Preview Document
                    </Button>
                    <Button variant='outline' className='flex-1'>
                      <Download className='mr-2 h-4 w-4' />
                      Download
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </PageContainer>
  );
}
