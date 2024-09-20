'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { Checkbox } from '@/components/ui/checkbox';
import { CaseManagementUser } from '@/constants/case-management-data';

export const columns: ColumnDef<CaseManagementUser>[] = [
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
    accessorKey: 'userId',
    header: 'User Id'
  },
//   {
//     accessorKey: 'serviceName',
//     header: 'Service Name'
//   },
  {
    accessorKey: 'currentStatus',
    header: 'Current Status'
  },
  {
    accessorKey: 'assignedEmployee',
    header: 'Assigned Employee'
  },
  {
    accessorKey: 'date',
    header: 'Date'
  },
  {
    accessorKey: 'timeSlot',
    header: 'Time Slot'
  },
//   {
//     accessorKey: 'status',
//     header: 'Status',
//     cell: ({ row }) => (
//       <div 
//         style={{ borderRadius: "20px" }}
//         className={`flex items-center justify-center px-2 py-1 ${
//           row.original.status === 'Open' ? 'bg-yellow-400' :
//           row.original.status === 'Closed' ? 'bg-green-300' :
//           'bg-red-200'
//         }`}
//       >
//         <span className='text-black bold'>{row.original.status}</span>
//       </div>
//     )
//   },

  
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
