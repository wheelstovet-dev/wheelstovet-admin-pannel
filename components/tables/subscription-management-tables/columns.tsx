'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
// import { UserManagement } from '@/constants/user-management-data';
import { Checkbox } from '@/components/ui/checkbox';
import { SubscriptionManagement } from '@/constants/subscription-management-data';
import { Calendar, Check, X } from 'lucide-react';

export const columns: ColumnDef<SubscriptionManagement>[] = [
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
    accessorKey: 'subscriptionId',
    header: 'Subscription ID',
    cell: ({ row }) => (
      <div className="flex justify-center">
       <span className="text-green-600 font-bold  px-1" style={{borderRadius:"50%"}} > {row.original.subscriptionId}</span>
      </div>
    )
  },
  {
    accessorKey: 'userId',
    header: 'User ID',
    cell: ({ row }) => (
      <div className="flex justify-center">
       <span className="  text-red-600 font-bold px-1" style={{borderRadius:"50%"}} > {row.original.userId}</span>
      </div>
    )
  },
  {
    accessorKey: 'subscriptionPlan',
    header: 'Plan'
  },
  {
    accessorKey: 'Frequency',
    header: 'Frequency'
  },
  {
    accessorKey: 'employeeId',
    header: 'Employee ID',
    cell: ({ row }) => (
      <div className="flex justify-center">
       <span className="  text-yellow-600 font-bold px-1" style={{borderRadius:"50%"}} > {row.original.userId}</span>
      </div>
    )
  },
  {
    accessorKey: 'subscriptionStartDate',
    header: 'Start Date',
    cell: ({ row }) => (
      <div className="flex items-center mt-1">
        <Calendar className="text-blue-500 mr-2" width={16} height={16} />
        <span className="text-[12px]">{row.original.subscriptionStartDate}</span>
      </div>
   
  )
  },
  {
    accessorKey: 'Timeslot',
    header: 'Time Slot'
  },
  // {
  //   accessorKey: 'subscriptionEndDate',
  //   header: 'Subscription End Date',
  //   cell: ({ row }) => (
  //     <div className="flex items-center mt-1">
  //       <Calendar className="text-blue-500 mr-2" width={16} height={16} />
  //       <span className="text-[12px]">{row.original.subscriptionEndDate}</span>
  //     </div>
  // )
  // },
  {
    accessorKey: 'subscriptionStatus',
    header: 'Status',
    cell: ({ row }) => (
      <div 
        style={{ borderRadius: "20px" }}
        className={`flex items-center px-2 py-1 me-5  ${
          row.original.subscriptionStatus === 'Active' ? 'bg-yellow-400' : 'bg-red-400'
        }`}
      >
        {row.original.subscriptionStatus === 'Active' ? (
          <Check width={16} height={16} className="text-yellow-500 mr-2" />
        ) : (
          <X width={16} height={16} className="text-red-900 mr-2" />
        )}
        <span className='text-black bold'>{row.original.subscriptionStatus}</span>
      </div>
    )
  },
 
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];