'use client';

import { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';
import { ChevronDown, Mail, Phone } from 'lucide-react';
import { CellAction } from './cell-action';
import { Enquiry } from '@/constants/enquiry-data';

// StatusDropdown component
const StatusDropdown = ({ currentStatus }: { currentStatus: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState(currentStatus);

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    setIsOpen(false);
  };

  return (
    <div>
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{ borderRadius: '20px', cursor: 'pointer' }}
        className={`flex items-center px-2 py-1 ${
          status === 'Approved'
            ? 'bg-green-400'
            : status === 'Pending'
            ? 'bg-yellow-400'
            : status === 'Rejected'
            ? 'bg-red-400'
            : 'bg-gray-400'
        }`}
      >
        <span className="text-black font">{status}</span>
        <button className="ml-auto focus:outline-none">
          <ChevronDown className="text-black" size={16} />
        </button>
      </div>
      {isOpen && (
        <div className="absolute mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          <div
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => handleStatusChange('Approved')}
          >
            Approve
          </div>
          <div
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => handleStatusChange('Pending')}
          >
            Pending
          </div>
          <div
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => handleStatusChange('Rejected')}
          >
            Reject
          </div>
        </div>
      )}
    </div>
  );
};

// Columns definition
export const columns: ColumnDef<Enquiry>[] = [
    // {
    //     accessorKey: 'caseId',
    //     header: 'Case Id',
    //     cell: ({ row }) => <span>{row.original.caseId}</span>,
    //   },
  {
    accessorKey: 'serviceName',
    header: 'Service Name',
    cell: ({ row }) => <span>{row.original.serviceName}</span>,
  },
  {
    accessorKey: 'preferredDate',
    header: 'Preferred Date',
    cell: ({ row }) => new Date(row.original.preferredDate).toLocaleDateString(),
  },
  {
    accessorKey: 'preferredTime',
    header: 'Preferred Time',
    cell: ({ row }) => <span>{row.original.preferredTime}</span>,
  },
  {
    accessorKey: 'contact',
    header: 'Contact',
    cell: ({ row }) => (
      <div className="flex flex-col">
        <div className="flex items-center mt-1">
          <Mail className="text-blue-500 mr-2" width={15} height={15} />
          <span className="text-[12px]">{row.original.email}</span>
        </div>
        <div className="flex items-center mt-2">
          <Phone className="text-green-500 mr-2" width={15} height={15} />
          <span className="text-[12px]">{row.original.phone}</span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'pickupAddress',
    header: 'Pickup Address',
    cell: ({ row }) => <span>{row.original.pickupAddress}</span>,
  },
  {
    accessorKey: 'updateStatus',
    header: 'Status',
    cell: ({ row }) => <StatusDropdown currentStatus={row.original.updateStatus} />,
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
