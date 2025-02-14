'use client';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { CellAction } from './cell-action';
import { Mail, Phone } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/redux/store';
import { updateEmployeeStatus } from '@/app/redux/actions/employeeAction';

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const StatusCell = ({ row }: { row: any }) => {
  const [status, setStatus] = useState(row.original.Status);
  const dispatch = useDispatch<AppDispatch>();

  const handleToggleStatus = async (newStatus: boolean) => {
    setStatus(newStatus);
    try {
      // Dispatch the updateEmployeeStatus action
      await dispatch(updateEmployeeStatus({ id: row.original._id, status: newStatus ? 'Available' : 'Unavailable' }));
    } catch (error) {
      console.error("Failed to update status:", error);
      // Revert the toggle in case of an error
      setStatus(!newStatus);
    }
  };

  useEffect(() => {
    setStatus(row.original.Status === 'Available'); // Sync with the latest response or Redux store
  }, [row.original.Status]);

  return (
    <div className="employee-status flex items-center justify-between p-2">
      <span className="text-base">{status ? "Active" : "Inactive"}</span>
      <Switch checked={status} onCheckedChange={handleToggleStatus} />
    </div>
  );
};

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'sno',
    header: 'S.no',
    cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
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
          {row.original.Name?.charAt(0) || 'N/A'}
        </div>
        <span>{row.original.Name || 'N/A'}</span>
      </div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'Gender',
    header: 'Gender',
    cell: ({ row }) => <span>{row.original.Gender || 'N/A'}</span>,
  },
  {
    accessorKey: 'contact',
    header: 'Contact',
    cell: ({ row }) => (
      <div className="flex flex-col me-5">
        <div className="flex items-center mt-1">
          <Mail className="text-blue-500 mr-2" width={15} height={15} />
          <span className="text-[12px]">{row.original.MobileNo || 'N/A'}</span>
        </div>
        <div className="flex items-center mt-2">
          <Phone className="text-green-500 mr-2" width={15} height={15} />
          <span className="text-[12px]">{row.original.Email || 'N/A'}</span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'Role',
    header: 'Role',
    cell: ({ row }) => <span>{row.original.Role || 'N/A'}</span>,
  },
  {
    accessorKey: 'CreatedAt',
    header: 'Joined Date',
    cell: ({ row }) => (
      <span>{row.original.CreatedAt ? format(new Date(row.original.CreatedAt), 'dd-MMM-yyyy') : 'N/A'}</span>
    ),
  },
  {
    accessorKey: 'Status',
    header: 'Status',
    cell: (props) => <StatusCell row={props.row} />,
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <div className="emp-action"><CellAction data={row.original} /></div>,
  },
];

