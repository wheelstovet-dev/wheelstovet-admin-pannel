'use client';

import React, { useEffect, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { CellAction } from './cell-action';
import { Mail } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { updateAdminStatus } from '@/app/redux/actions/adminAction';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/redux/store';

// Function to generate a random color in hex format
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const IsActiveCell = ({ row }: { row: any }) => {
  // console.log(row.original);
  const [isActive, setIsActive] = useState(row.original.IsActive);
  const dispatch = useDispatch<AppDispatch>(); // Use dispatch to trigger actions

  const handleToggleStatus = async (newStatus: boolean) => {
    setIsActive(newStatus);
    try {
      // Dispatch the updateAdminStatus action instead of making the Axios call directly
      await dispatch(updateAdminStatus({ id: row.original._id, adminStatus: { IsActive: newStatus } }));
    } catch (error) {
      setIsActive(false);
      console.error("Failed to update status:", error);
    }
  };

  useEffect(() => {
    setIsActive(row.original.IsActive); // Sync with Redux store or response from getAllAdmin
  }, [row.original.IsActive]);

  return (
    <div className="flex items-center justify-between p-2">
      <span className="text-base">{isActive ? "Active" : "Inactive"}</span>
      <Switch checked={isActive} onCheckedChange={handleToggleStatus} color='red' />
    </div>
  );
};

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
  //   enableHiding: false,
  // },
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
    accessorKey: 'Email',
    header: 'Email',
    cell: ({ row }) => (
      <div className="flex items-center mt-1">
        <Mail className="text-blue-500 mr-2" width={10} height={10} />
        <span>{row.original.Email|| 'N/A'}</span>
      </div>
    ),
  },
  {
    accessorKey: 'IsActive',
    header: 'Activity Status',
    cell: (props) => <IsActiveCell row={props.row} />, // Use IsActiveCell component
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
