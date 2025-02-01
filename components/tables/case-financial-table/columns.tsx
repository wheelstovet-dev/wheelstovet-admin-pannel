'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { Checkbox } from '@/components/ui/checkbox';
import { FaRupeeSign } from 'react-icons/fa'; 
import { CaseFinance } from '@/constants/case-financial';



export const columns: ColumnDef<CaseFinance>[] = [
  {
    accessorKey: 'sno',
    header: 'S.no',
    cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
  },
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'referenceNo',
    header: 'Reference No'
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => <span>{new Date(row.original.date).toLocaleDateString()}</span>
  },
  {
    accessorKey: 'time',
    header: 'Time'
  },
  {
    accessorKey: 'paymentMethod',
    header: 'Payment Method'
  },
  {
    accessorKey: 'paymentStatus',
    header: 'Payment Status',
    cell: ({ row }) => (
      <span
        className={`px-2 py-1 rounded-full ${
          row.original.paymentStatus === 'paid' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
        }`}
      >
        {row.original.paymentStatus === 'paid' ? 'Paid' : 'Unpaid'}
      </span>
    )
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => (
      <div className="flex items-center space-x-1">
        <FaRupeeSign className="text-sm text-gray-500" />
        <span>{row.original.amount}</span>
      </div>
    )
  },
//   {
//     id: 'actions',
//     header: 'Actions',
//     cell: ({ row }) => <CellAction data={row.original} />
//   }
];
