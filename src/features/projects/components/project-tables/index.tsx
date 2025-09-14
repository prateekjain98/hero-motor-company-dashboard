'use client';

import { DataTableToolbar } from '@/components/ui/table/data-table-toolbar';
import { DataTablePagination } from '@/components/ui/table/data-table-pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { useDataTable } from '@/hooks/use-data-table';
import { getCommonPinningStyles } from '@/lib/data-table';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Project } from '@/constants/data';
import { useUserTypeStore } from '@/stores/user-type-store';
import { createColumns } from './columns';

import { ColumnDef, flexRender } from '@tanstack/react-table';
import { parseAsInteger, useQueryState } from 'nuqs';
import { useRouter } from 'next/navigation';

interface ProjectTableParams {
  data: Project[];
  totalItems: number;
  columns?: ColumnDef<Project>[];
}

export function ProjectTable({
  data,
  totalItems,
  columns: providedColumns
}: ProjectTableParams) {
  const { currentUserType } = useUserTypeStore();

  // Use provided columns or create columns based on user type
  const dynamicColumns = createColumns(currentUserType);
  const columns = providedColumns || dynamicColumns;
  const [pageSize] = useQueryState('perPage', parseAsInteger.withDefault(10));
  const router = useRouter();

  const pageCount = Math.ceil(totalItems / pageSize);

  const { table } = useDataTable({
    data, // project data
    columns, // project columns
    pageCount: pageCount,
    shallow: false, //Setting to false triggers a network request with the updated querystring.
    debounceMs: 500
  });

  const handleRowClick = (project: Project) => {
    router.push(`/dashboard/projects/${project.id}`);
  };

  return (
    <div className='flex flex-1 flex-col space-y-4'>
      <DataTableToolbar table={table} />
      <div className='relative flex flex-1'>
        <div className='absolute inset-0 flex overflow-hidden rounded-lg border'>
          <ScrollArea className='h-full w-full'>
            <Table>
              <TableHeader className='bg-muted sticky top-0 z-10'>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        colSpan={header.colSpan}
                        style={{
                          ...getCommonPinningStyles({ column: header.column })
                        }}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                      className='hover:bg-muted/50 cursor-pointer transition-colors'
                      onClick={(e) => {
                        // Don't trigger row click if clicking on action buttons
                        if (
                          (e.target as Element).closest('[data-action-cell]')
                        ) {
                          return;
                        }
                        handleRowClick(row.original);
                      }}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          style={{
                            ...getCommonPinningStyles({ column: cell.column })
                          }}
                          {...(cell.column.id === 'actions' && {
                            'data-action-cell': true
                          })}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={table.getAllColumns().length}
                      className='h-24 text-center'
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <ScrollBar orientation='horizontal' />
          </ScrollArea>
        </div>
      </div>
      <div className='flex flex-col gap-2.5'>
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
