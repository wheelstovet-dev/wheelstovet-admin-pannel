'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { Checkbox } from '@/components/ui/checkbox';
import { Mail, Phone, ChevronDown } from 'lucide-react';
import { EmployeeManagement } from '@/constants/employee-management-data';
import { SetStateAction, useState } from 'react';
import { Row } from '@tanstack/react-table';


const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
interface RowData {
  status: string;
  // Add other fields that exist in your table row, e.g., name, id, etc.
  [key: string]: any; // Optionally, add an index signature if you have dynamic fields
}

const StatusCell = ({ row }: { row: Row<RowData> }) => {
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
          status === 'Available' ? 'bg-yellow-400' :
          status === 'Unavailable' ? 'bg-red-400' :
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
            onClick={() => handleStatusChange('Available')}
          >
            Available
          </div>
          <div 
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => handleStatusChange('Unavailable')}
          >
            Unavailable
          </div>
        </div>
      )}
    </div>
  );
};

export const columns: ColumnDef<EmployeeManagement>[] = [
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
    accessorKey: 'caseId',
    header: 'Case Id',
   
  },

 
  {
    accessorKey: 'fullName',
    header: 'First Name',
    cell: ({ row }) => (
      <div className="flex items-center">
        <div
          className="flex items-center justify-center w-8 h-8 rounded-full mr-2"
          style={{ backgroundColor: getRandomColor(), color: 'white' }}
        >
          {row.original.fullName.charAt(0)}
        </div>
        <span>{row.original.fullName}</span>
      </div>
    ),
    enableSorting: true,
  },

  {
    accessorKey: 'gender',
    header: 'Gender'
  },
  {
    accessorKey: 'contact',
    header: 'Contact',
    cell: ({ row }) => (
      <div className="flex flex-col me-5">
        <div className="flex items-center mt-1">
          <Mail className="text-blue-500 mr-2" width={15} height={15} />
          <span className="text-[12px]">{row.original.email}</span>
        </div>
        <div className="flex items-center mt-2">
          <Phone className="text-green-500 mr-2" width={15} height={15} />
          <span className="text-[12px]">{row.original.phoneNumber}</span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'serviceAssigned',
    header: 'Service Assigned'
  },
  {
    accessorKey: 'assigneddate',
    header: 'Assigned Date'
  },
  // {
  //   accessorKey: 'timeSlot',
  //   header: 'Time Slot'
  // },
 
  {
    accessorKey: 'status',
    header: 'Status',
    cell: (props) => <StatusCell row={props.row} />, // Use the component here
  },
  
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
