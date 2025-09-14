'use client';
import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { Project } from '@/constants/data';
import { Column, ColumnDef } from '@tanstack/react-table';
import {
  CheckCircle2,
  Text,
  XCircle,
  Hash,
  Calendar,
  DollarSign,
  FileText
} from 'lucide-react';
import { CellAction } from './cell-action';
import { CATEGORY_OPTIONS } from './options';

export const columns: ColumnDef<Project>[] = [
  {
    id: 'id',
    accessorKey: 'id',
    header: ({ column }: { column: Column<Project, unknown> }) => (
      <DataTableColumnHeader column={column} title='Project ID' />
    ),
    cell: ({ cell }) => (
      <div className='flex items-center gap-2 font-mono text-sm'>
        <Hash className='text-muted-foreground h-3 w-3' />#
        {cell.getValue<Project['id']>()}
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
    id: 'category',
    accessorKey: 'category',
    header: ({ column }: { column: Column<Project, unknown> }) => (
      <DataTableColumnHeader column={column} title='Category' />
    ),
    cell: ({ cell }) => {
      const category = cell.getValue<Project['category']>();
      const isActive = category.toLowerCase() === 'active';
      const Icon = isActive ? CheckCircle2 : XCircle;

      return (
        <Badge
          variant={isActive ? 'default' : 'secondary'}
          className='whitespace-nowrap capitalize'
        >
          <Icon className='mr-1 h-3 w-3' />
          {category}
        </Badge>
      );
    },
    enableColumnFilter: true,
    meta: {
      label: 'Category',
      variant: 'multiSelect',
      options: CATEGORY_OPTIONS
    },
    size: 120
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
        displayValue = `₹${(price / 10000000).toFixed(2)} Cr`;
      } else if (price >= 100000) {
        // 1 Lakh = 100,000
        displayValue = `₹${(price / 100000).toFixed(2)} L`;
      } else {
        displayValue = `₹${price.toLocaleString()}`;
      }

      return (
        <div className='flex items-center gap-2 font-medium'>
          <DollarSign className='text-muted-foreground h-3 w-3' />
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
