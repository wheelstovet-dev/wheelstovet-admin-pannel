'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { AdminManagement } from '@/constants/admin-management-data'; 

import { CellAction } from './cell-action'; 
import { Check, X, Mail, Phone, MapPin, Award } from 'lucide-react'; 
// Function to generate a random color in hex format
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const columns: ColumnDef<AdminManagement>[] = [
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
    accessorKey: 'adminID', 
    header: 'Admin ID',
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span className="text-red-600 font-bold px-1" style={{ borderRadius: '50%' }}>
          {row.original.sno} 
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'fullName', 
    header: 'Name',
    cell: ({ row }) => (
      <div className="flex items-center">
        <div 
          className="flex items-center justify-center w-8 h-8 rounded-full mr-2"
          style={{ backgroundColor: getRandomColor(), color: 'white' }}
        >
          {row.original.fullName?.charAt(0) || ''} 
        </div>
        <span>{row.original.fullName} </span> 
      </div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'contactInformation.email',
    header: 'Email',
    cell: ({ row }) => (
        <div className="flex items-center mt-1">
          <Mail className="text-blue-500 mr-2" width={10} height={10} />
          <span className="">{row.original.contactInformation.email}</span>
        </div>
    )
  },
 
  
  {
    accessorKey: 'status',
    header: 'Activity Status',
    cell: ({ row }) => (
      <div
        style={{ borderRadius: '20px' }}
        className={`flex items-center px-2 py-1 ${
          row.original.status === 'Active' ? 'bg-orange-400' : 'bg-red-600'
        }`}
      >
        {row.original.status === 'Active' ? (
          <Check width={16} height={16} className="text-orange-800 mr-2" />
        ) : (
          <X width={16} height={16} className="text-red-900 mr-2" />
        )}
        <span className="text-black bold">{row.original.status}</span>
      </div>
    ),
  },
 
 

  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  }
];