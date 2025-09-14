'use client';
import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { ResourceUsageEntry } from '@/constants/data';
import { Column, ColumnDef } from '@tanstack/react-table';
import { Calendar, Text, User } from 'lucide-react';
import { CellAction } from './cell-action';

export const columns: ColumnDef<ResourceUsageEntry>[] = [
  {
    id: 'plant_name',
    accessorKey: 'plant_name',
    header: ({ column }: { column: Column<ResourceUsageEntry, unknown> }) => (
      <DataTableColumnHeader column={column} title='Plant Name' />
    ),
    cell: ({ cell, row }) => (
      <div className='min-w-48'>
        <div className='font-medium'>
          {cell.getValue<ResourceUsageEntry['plant_name']>()}
        </div>
        <div className='text-muted-foreground text-xs'>
          {row.original.plant_location}
        </div>
      </div>
    ),
    meta: {
      label: 'Plant Name',
      placeholder: 'Search plants...',
      variant: 'text',
      icon: Text
    },
    enableColumnFilter: true,
    size: 250
  },
  {
    accessorKey: 'entry_month',
    header: ({ column }: { column: Column<ResourceUsageEntry, unknown> }) => (
      <DataTableColumnHeader column={column} title='Month' />
    ),
    cell: ({ cell }) => {
      const month = cell.getValue<string>();
      const monthName = new Date(`${month}-01`).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short'
      });

      return (
        <Badge variant='secondary' className='whitespace-nowrap'>
          <Calendar className='mr-1 h-3 w-3' />
          {monthName}
        </Badge>
      );
    },
    size: 120
  },
  {
    accessorKey: 'production_output',
    header: ({ column }: { column: Column<ResourceUsageEntry, unknown> }) => (
      <DataTableColumnHeader column={column} title='Production' />
    ),
    cell: ({ cell }) => (
      <div className='font-medium'>
        {cell.getValue<number>().toLocaleString()} units
      </div>
    ),
    size: 110
  },
  {
    accessorKey: 'paint_consumption',
    header: ({ column }: { column: Column<ResourceUsageEntry, unknown> }) => (
      <DataTableColumnHeader column={column} title='Paint (L)' />
    ),
    cell: ({ cell }) => <div>{cell.getValue<number>().toLocaleString()} L</div>,
    size: 90
  },
  {
    accessorKey: 'energy_consumption',
    header: ({ column }: { column: Column<ResourceUsageEntry, unknown> }) => (
      <DataTableColumnHeader column={column} title='Energy (kWh)' />
    ),
    cell: ({ cell }) => (
      <div>{cell.getValue<number>().toLocaleString()} kWh</div>
    ),
    size: 110
  },
  {
    accessorKey: 'efficiency_rating',
    header: ({ column }: { column: Column<ResourceUsageEntry, unknown> }) => (
      <DataTableColumnHeader column={column} title='Efficiency' />
    ),
    cell: ({ cell }) => {
      const efficiency = cell.getValue<number>();
      const color =
        efficiency >= 90
          ? 'text-green-600'
          : efficiency >= 80
            ? 'text-yellow-600'
            : 'text-red-600';

      return (
        <div className={`font-medium ${color}`}>{efficiency.toFixed(1)}%</div>
      );
    },
    size: 100
  },
  {
    accessorKey: 'cost_total',
    header: ({ column }: { column: Column<ResourceUsageEntry, unknown> }) => (
      <DataTableColumnHeader column={column} title='Total Cost' />
    ),
    cell: ({ cell }) => {
      const cost = cell.getValue<number>();

      // Convert to Crores and Lakhs format
      let displayValue = '';
      if (cost >= 10000000) {
        // 1 Crore = 10,000,000
        displayValue = `₹${(cost / 10000000).toFixed(2)} Cr`;
      } else if (cost >= 100000) {
        // 1 Lakh = 100,000
        displayValue = `₹${(cost / 100000).toFixed(2)} L`;
      } else {
        displayValue = `₹${cost.toLocaleString()}`;
      }

      return <div className='font-medium'>{displayValue}</div>;
    },
    size: 120
  },
  {
    accessorKey: 'entered_by',
    header: 'Project Manager',
    cell: ({ cell }) => (
      <div className='flex items-center gap-2'>
        <User className='text-muted-foreground h-4 w-4' />
        <span className='text-sm'>
          {cell.getValue<ResourceUsageEntry['entered_by']>()}
        </span>
      </div>
    ),
    size: 160
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
