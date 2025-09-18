'use client';
import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { Project } from '@/constants/data';
import { Column, ColumnDef, Cell } from '@tanstack/react-table';
import {
  Text,
  Hash,
  Calendar,
  IndianRupee,
  TrendingUp,
  Clock
} from 'lucide-react';
import { CellAction } from './cell-action';
import { DEPARTMENT_OPTIONS } from './options';
import { UserType } from '@/stores/user-type-store';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import Image from 'next/image';

// Company Group component for PMO view
const CompanyGroupIcon = ({ companyGroup }: { companyGroup: string }) => {
  const getCompanyInfo = (group: string) => {
    switch (group) {
      case 'hero-cycles':
        return { name: 'Hero Cycles', logo: '/assets/logos/hero-cycles.png' };
      case 'hero-motors':
        return { name: 'Hero Motors', logo: '/assets/logos/hero-motors.png' };
      case 'hmc-hive':
        return { name: 'HMC Hive', logo: '/assets/logos/hmc-hive.png' };
      case 'munjal':
        return { name: 'Munjal', logo: '/assets/logos/munjal.png' };
      default:
        return { name: 'Unknown', logo: '/assets/logos/hmc.png' };
    }
  };

  const company = getCompanyInfo(companyGroup);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className='flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 transition-colors hover:bg-gray-100'>
            <Image
              src={company.logo}
              alt={company.name}
              width={20}
              height={20}
              className='h-5 w-5 object-contain'
            />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className='text-sm font-medium'>{company.name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

// Create columns function that takes userType as parameter
export const createColumns = (
  currentUserType: UserType
): ColumnDef<Project>[] => [
  // Company Group column (only for PMO)
  ...(currentUserType === UserType.PMO
    ? [
        {
          id: 'company_group',
          accessorKey: 'company_group',
          header: ({ column }: { column: Column<Project, unknown> }) => (
            <DataTableColumnHeader column={column} title='Group' />
          ),
          cell: ({ cell }: { cell: Cell<Project, unknown> }) => {
            const companyGroup = cell.getValue<Project['company_group']>();
            return <CompanyGroupIcon companyGroup={companyGroup} />;
          },
          size: 60
        }
      ]
    : []),
  {
    id: 'id',
    accessorKey: 'id',
    header: ({ column }: { column: Column<Project, unknown> }) => (
      <DataTableColumnHeader column={column} title='Project ID' />
    ),
    cell: ({ cell }) => (
      <div className='flex items-center gap-2 font-mono text-sm'>
        <Hash className='text-muted-foreground h-3 w-3' />
        HMC-{String(cell.getValue<Project['id']>()).padStart(4, '0')}
      </div>
    ),
    size: 100
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: ({ column }: { column: Column<Project, unknown> }) => (
      <DataTableColumnHeader column={column} title='Project Name' />
    ),
    cell: ({ cell, row }) => (
      <div className='min-w-48'>
        <div className='font-medium'>{cell.getValue<Project['name']>()}</div>
        <div className='text-muted-foreground max-w-48 truncate text-xs'>
          {row.original.description}
        </div>
      </div>
    ),
    meta: {
      label: 'Project Name',
      placeholder: 'Search projects...',
      variant: 'text',
      icon: Text
    },
    enableColumnFilter: true,
    size: 250
  },
  {
    accessorKey: 'department',
    header: ({ column }: { column: Column<Project, unknown> }) => (
      <DataTableColumnHeader column={column} title='Department' />
    ),
    cell: ({ cell }) => {
      const department = cell.getValue<Project['department']>();
      const departmentOption = DEPARTMENT_OPTIONS.find(
        (option) => option.value === department
      );

      if (!departmentOption) return null;

      const Icon = departmentOption.icon;

      return (
        <div className='flex items-center gap-2'>
          <Icon className='text-muted-foreground h-3 w-3' />
          <Badge variant='outline' className='whitespace-nowrap capitalize'>
            {departmentOption.label}
          </Badge>
        </div>
      );
    },
    enableColumnFilter: true,
    meta: {
      label: 'Department',
      variant: 'multiSelect',
      options: DEPARTMENT_OPTIONS
    },
    size: 140
  },
  {
    accessorKey: 'stage',
    header: ({ column }: { column: Column<Project, unknown> }) => (
      <DataTableColumnHeader column={column} title='Stage' />
    ),
    cell: ({ cell, row }) => {
      const stage = cell.getValue<Project['stage']>();
      const project = row.original;

      const getStageColor = (stage: string) => {
        switch (stage) {
          case 'L0':
            return 'bg-gray-100 text-gray-800 border-gray-300';
          case 'L1':
            return 'bg-blue-100 text-blue-800 border-blue-300';
          case 'L2':
            return 'bg-yellow-100 text-yellow-800 border-yellow-300';
          case 'L3':
            return 'bg-orange-100 text-orange-800 border-orange-300';
          case 'L4':
            return 'bg-green-100 text-green-800 border-green-300';
          case 'L5':
            return 'bg-purple-100 text-purple-800 border-purple-300';
          default:
            return 'bg-gray-100 text-gray-800 border-gray-300';
        }
      };

      return (
        <div className='flex items-center gap-2'>
          <TrendingUp className='text-muted-foreground h-3 w-3' />
          <Badge className={`${getStageColor(stage)} font-medium`}>
            {stage}
          </Badge>
          {project.pending_approval && (
            <Badge
              variant='outline'
              className='border-amber-200 bg-amber-50 text-xs text-amber-700'
            >
              <Clock className='mr-1 h-2 w-2' />
              Pending
            </Badge>
          )}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    size: 140
  },
  {
    accessorKey: 'created_at',
    header: ({ column }: { column: Column<Project, unknown> }) => (
      <DataTableColumnHeader column={column} title='Created Date' />
    ),
    cell: ({ cell }) => {
      const date = new Date(cell.getValue<string>());
      const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });

      return (
        <Badge variant='secondary' className='whitespace-nowrap'>
          <Calendar className='mr-1 h-3 w-3' />
          {formattedDate}
        </Badge>
      );
    },
    size: 130
  },
  {
    accessorKey: 'price',
    header: ({ column }: { column: Column<Project, unknown> }) => (
      <DataTableColumnHeader column={column} title='Budget' />
    ),
    cell: ({ cell }) => {
      const price = cell.getValue<number>();

      // Convert to Crores and Lakhs format like resources table
      let displayValue = '';
      if (price >= 10000000) {
        // 1 Crore = 10,000,000
        displayValue = `${(price / 10000000).toFixed(2)} Cr`;
      } else if (price >= 100000) {
        // 1 Lakh = 100,000
        displayValue = `${(price / 100000).toFixed(2)} L`;
      } else {
        displayValue = price.toLocaleString();
      }

      return (
        <div className='flex items-center gap-2 font-medium'>
          <IndianRupee className='text-muted-foreground h-3 w-3' />
          {displayValue}
        </div>
      );
    },
    size: 120
  },
  {
    accessorKey: 'updated_at',
    header: ({ column }: { column: Column<Project, unknown> }) => (
      <DataTableColumnHeader column={column} title='Last Updated' />
    ),
    cell: ({ cell }) => {
      const date = new Date(cell.getValue<string>());
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - date.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      let displayText = '';
      if (diffDays === 1) {
        displayText = 'Today';
      } else if (diffDays <= 7) {
        displayText = `${diffDays} days ago`;
      } else {
        displayText = date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric'
        });
      }

      return <div className='text-muted-foreground text-sm'>{displayText}</div>;
    },
    size: 120
  },

  {
    id: 'actions',
    cell: ({ row }) => (
      <div>
        <CellAction data={row.original} />
      </div>
    ),
    size: 50
  }
];

// Default export for backwards compatibility (uses project manager view)
export const columns = createColumns(UserType.PROJECT_MANAGER);
