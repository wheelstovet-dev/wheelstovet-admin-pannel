'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { Checkbox } from '@/components/ui/checkbox';
import { Mail, Phone } from 'lucide-react';
import { SetStateAction, useState } from 'react';
import { Row } from '@tanstack/react-table';
import { Switch } from "@/components/ui/switch";
import axios from 'axios';

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

interface RowData {
  status: boolean;
  id: string; // Unique identifier for each row, needed for API call
  [key: string]: any; // Additional dynamic fields
}

const StatusCell = ({ row }: { row: Row<RowData> }) => {
  const [status, setStatus] = useState(row.original.status);

  const handleStatusToggle = async (newStatus: boolean) => {
    setStatus(newStatus);
    try {
      await axios.post('your-api-url', {
        id: row.original.id,
        status: newStatus,
      });
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 rounded-lg gap-2">
      <span className="text-base">{status ? "Active" : "Inactive"}</span>
      <Switch
        checked={status}
        onCheckedChange={handleStatusToggle}
      />
    </div>
  );
};

export const columns: ColumnDef<any>[] = [
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
    enableHiding: false,
  },
  {
    accessorKey: 'Name',
    header: 'Name',
    cell: ({ row }) => (
      <div className="flex items-center">
        <div
          className="flex items-center justify-center w-8 h-8 rounded-full mr-2"
          style={{ backgroundColor: getRandomColor(), color: 'white' }}
        >
          {row.original.Name?.charAt(0)}
        </div>
        <span>{row.original.Name}</span>
      </div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'Gender',
    header: 'Gender',
  },
  {
    accessorKey: 'contact',
    header: 'Contact',
    cell: ({ row }) => (
      <div className="flex flex-col me-5">
        <div className="flex items-center mt-1">
          <Mail className="text-blue-500 mr-2" width={15} height={15} />
          <span className="text-[12px]">{row.original.MobileNo}</span>
        </div>
        <div className="flex items-center mt-2">
          <Phone className="text-green-500 mr-2" width={15} height={15} />
          <span className="text-[12px]">{row.original.Email}</span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'Role',
    header: 'Service Assigned',
  },
  {
    accessorKey: 'CreatedAt',
    header: 'Assigned Date',
  },
  {
    accessorKey: 'Status',
    header: 'Status',
    cell: (props) => <StatusCell row={props.row} />,
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
