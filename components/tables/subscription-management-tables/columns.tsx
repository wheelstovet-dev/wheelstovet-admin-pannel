'use client';

import { ColumnDef, Row } from '@tanstack/react-table';
import { CellAction } from './cell-action';
// import { UserManagement } from '@/constants/user-management-data';
import { Checkbox } from '@/components/ui/checkbox';
import { SubscriptionManagement } from '@/constants/subscription-management-data';
import { Calendar, Check, ChevronDown, X } from 'lucide-react';
import { useState } from 'react';
// interface SubscriptionManagement {
//   status: string;
//   // Add other fields that exist in your table row, e.g., name, id, etc.
//   [key: string]: any; // Optionally, add an index signature if you have dynamic fields
// }

const StatusCell = ({ row }: { row: Row<SubscriptionManagement> }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState(row.original.status);

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    setIsOpen(false);
    // Optionally handle any additional logic such as API calls to save status change
  };

  return (
    <div className="relative">
      <div 
        style={{ borderRadius: "20px", cursor: "pointer" }}
        className={`flex justify-between items-center px-4 py-2 ${
          status === 'Approve' ? 'bg-green-400' :
          status === 'Reject' ? 'bg-red-400' :
          status === 'Pending' ? 'bg-yellow-400' :
          'bg-gray-400'
        }`}
      >
        <span className='text-black font'>{status}</span>
        <button 
          className="focus:outline-none ml-auto"
          onClick={() => setIsOpen(!isOpen)}
        >
          <ChevronDown className="text-black" size={16} />
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          <div 
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => handleStatusChange('Approve')}
          >
            Approve
          </div>
          <div 
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => handleStatusChange('Reject')}
          >
           Reject
          </div>
          <div 
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => handleStatusChange('Pending')}
          >
           Pending
          </div>
        </div>
      )}
    </div>
  );
};
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
    accessorKey: 'frequency',
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
  // {
  //   accessorKey: 'Timeslot',
  //   header: 'Time Slot'
  // },
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
    accessorKey: 'status',
    header: 'Status',
    cell: (props) => <StatusCell row = {props.row} />, // Use the component here
  },
  {
    accessorKey: 'activity',
    header: 'Activity',
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