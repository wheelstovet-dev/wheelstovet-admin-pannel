'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { Checkbox } from '@/components/ui/checkbox';
import { format } from 'date-fns';

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
  //   enableHiding: false
  // },
  //------remove case id and user id to be viewed in ui----------
  // {
  //   accessorKey: 'caseId',
  //   header: 'Case Id',
   
  // },

  // {
  //   accessorKey: 'userId',
  //   header: 'User Id'
  // },
  {
    accessorKey: 'sno',
    header: 'S.no',
    cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
  },
  {
    accessorKey: 'ServiceId.serviceName',
    header: 'Service Name'
  },
  {
    accessorKey: 'CurrentStatus',
    header: 'Current Status'
  },
  {
    accessorKey: 'EmpId',
    header: 'Assigned Employee',
    cell: ({ row }) => {
      const firstName = row.original?.EmpId?.FirstName;
      const lastName = row.original?.EmpId?.LastName;
      return `${firstName && lastName ? firstName + ' ' + lastName : 'N/A'}`;
    },
  },
  {
    accessorKey: 'CreatedAt',
    header: 'Date',
    cell: ({ row }) => format(new Date(row.original.CreatedAt), 'dd-MMM-yyyy'),
  },
  {
    accessorKey: 'TimeSlot', // Use 'TimeSlot' instead of 'CreatedAt'
    header: 'Time Slot',
    cell: ({ row }) => row.original.TimeSlot, // Directly access 'TimeSlot' from the data
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
