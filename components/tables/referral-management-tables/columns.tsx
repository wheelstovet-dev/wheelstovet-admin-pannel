'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { Checkbox } from '@/components/ui/checkbox';
import { ReferralManagement } from '@/constants/referral-management-data';
import { useEffect } from 'react';

export const columns: ColumnDef<any>[] = [
  
  // {
  //   id: 'select',
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={table.getIsAllPageRowsSelected()}
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false
  // },
  // {
  //   accessorKey: 'id',
  //   header: 'ID'
  // },
  // {
  //   accessorKey: 'assignedTo',
  //   header: 'Assigned To'
  // },
  {
    accessorKey: 'sno',
    header: 'S.no',
    cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
  },
  {
    accessorKey: 'ReferredByPercentage',
    header: 'ReferredBy Percentage',
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span className='text-center' >{row.original?.ReferredByPercentage} %</span>
      </div>
    )
  },
  {
    accessorKey: 'ReferredToPercentage',
    header: 'ReferredTo Percentage',
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span className='text-center' >{row.original?.ReferredToPercentage} %</span>
      </div>
    )
  },
  // {
  //   accessorKey: 'discountPercentage',
  //   header: 'Discount',
  //   cell: ({ row }) => (
  //     <div className="flex justify-center">
  //       <span className='text-center' >{row.original.discountPercentage} %</span>
  //     </div>
  //   )
  // },
  {
    accessorKey: 'validForMonths',
    header: 'Validity',
    cell: ({ row }) => {
      const months = row.original?.validForMonths;
      return <span>{months} {months === 1 ? 'Month' : 'Months'}</span>;
    },
  },
  // {
  //   accessorKey: 'status',
  //   header: 'Status',
  //   cell: ({ row }) => (
  //     <div 
  //       style={{ borderRadius: "20px" }}
  //       className={`flex items-center px-2 py-1 ${
  //         row.original.status === 'Active' ? 'bg-yellow-400' :
  //         row.original.status === 'Inactive' ? 'bg-red-400' :
  //         'bg-red-400'
  //       }`}
  //     >
  //       <span className='text-black bold'>{row.original.status}</span>
  //     </div>
  //   )
  // },
  // {
  //     id: 'actions',
  //     header: 'Actions',
  //     cell: ({ row }) => (<div className='emp-action'><CellAction data={row.original} /></div>),
  //   },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];