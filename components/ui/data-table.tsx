'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  getSortedRowModel,
} from '@tanstack/react-table';

import { Table as UiTable, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from './input';
import { Button } from './button';
import { ScrollArea, ScrollBar } from './scroll-area';
import { useState } from 'react';
import { Plus, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from './dropdown-menu';

interface FilterOption {
  label: string;
  subOptions: string[];
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKeys?: string[];
  onSearch?: (value: string) => void;
  filters?: FilterOption[];
  meta?: {
    updateData: (rowIndex: number, columnId: string, value: any) => void;
    updateColumnData: (columnId: string, value: any) => void;
  };
  onRowClick?: (rowData: TData) => void;
  stopPropagationSelectors?: string[]; // Pass elements to ignore row click
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKeys = [],
  onSearch,
  filters,
  meta,
  onRowClick,
  stopPropagationSelectors
}: DataTableProps<TData, TValue>) {
  const [filterInput, setFilterInput] = useState('');

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter: filterInput,
    },
    onGlobalFilterChange: setFilterInput,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualSorting: true,
    meta,
  });

  const handleSearchChange = (e: any) => {
    const value = e.target.value;
    setFilterInput(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        {/* <Input
          value={filterInput}
          onChange={handleSearchChange}
          placeholder={`Search by ${searchKeys.join(', ') || 'defaultSearchKey'}`}
          className="max-w-xs"
        /> */}
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button style={{ background: '#04894d', color: 'white' }} className="text-xs md:text-sm">
              Filter <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-50">
            {filters?.map((filter) => (
              <DropdownMenuSub key={filter.label}>
                <DropdownMenuSubTrigger>{filter.label}</DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="w-48">
                  {filter.subOptions.map((subOption) => (
                    <DropdownMenuItem key={subOption}>{subOption}</DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            ))}
          </DropdownMenuContent>
        </DropdownMenu> */}

      </div>

      <ScrollArea className="rounded-md border min-h-[70vh] bg-white">
        <UiTable className="relative min-w-full">
          <TableHeader className="bg-yellow-500 text-gray-400">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="py-2 border-r-2 ">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}
                  onClick={() => onRowClick && onRowClick(row.original)} // Call onRowClick with row data
                  data-state={row.getIsSelected() && 'selected'} className={`py-2 px-6 border-b border-gray-200 ${onRowClick ? 'cursor-pointer hover:bg-gray-100 transition' : ''}`}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-4  ">
                      {/* <div onClick={(e) => e.stopPropagation()}> */}
                      <div onClick={(e) => {
                        if (
                          stopPropagationSelectors &&
                          stopPropagationSelectors.some((selector) =>
                            (e.target as HTMLElement)?.closest(selector) // Ensure proper typing
                          )
                        ) {
                          e.stopPropagation(); // Stop row navigation if the clicked element matches
                        }
                      }}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </UiTable>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </>
  );
}
