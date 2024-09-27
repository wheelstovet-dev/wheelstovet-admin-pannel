'use client';

import { ColumnDef, Row } from '@tanstack/react-table';
import { CellAction } from './cell-action';
// import { UserManagement } from '@/constants/user-management-data';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar, Check, ChevronDown, X } from 'lucide-react';
import { useState } from 'react';
import { SubscriptionHistory } from '@/constants/subscriptionHistory';
// interface SubscriptionManagement {
//   status: string;
//   // Add other fields that exist in your table row, e.g., name, id, etc.
//   [key: string]: any; // Optionally, add an index signature if you have dynamic fields
// }

const StatusCell = ({ row }: { row: Row<SubscriptionHistory> }) => {
  const [isOpen, setIsOpen] = useState(false);
  

  const handleStatusChange = (newStatus: string) => {

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
export const columns: ColumnDef<SubscriptionHistory>[] = [
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
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => (
      <div className="">
        <span className="text-[12px]">{row.original.date}</span>
      </div>
    ),
  },
  {
    accessorKey: 'timeIn',
    header: 'Time In',
    cell: ({ row }) => (
      <div className="">
        <span className="text-[12px]">{row.original.timeIn}</span>
      </div>
    ),
  },
  {
    accessorKey: 'timeOut',
    header: 'Time Out',
    cell: ({ row }) => (
      <div className="">
        <span className="text-[12px]">{row.original.timeOut}</span>
      </div>
    ),
  },
  {
    accessorKey: 'duration',
    header: 'Duration',
    cell: ({ row }) => (
      <div className="">
        <span className="text-[12px]">{row.original.duration}</span>
      </div>
    ),
  },
  {
    accessorKey: 'note',
    header: 'Note',
    cell: ({ row }) => (
      <div className="">
        <span className="text-[12px]">{row.original.note}</span>
      </div>
    ),
  },
  {
    accessorKey: 'escalate',
    header: 'Escalate',
    cell: ({ row }) => (
      <div className="">
      <span className="text-[12px]">{row.original.escalate}</span>
      </div>
    ),
  },
  // {
  //   id: 'actions',
  //   cell: ({ row }) => <CellAction data={row.original} />
  // }
];