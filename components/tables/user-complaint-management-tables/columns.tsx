'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { Checkbox } from '@/components/ui/checkbox';
// import { ComplaintManagementUser } from '@/constants/complaint-management-data-user';

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
  {
    accessorKey: 'sno',
    header: 'S.no',
    cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
  },

  {
    accessorKey: '', // A generic accessor key
    header: 'Name',
    cell: ({ row }) => {
      const firstName = row.original?.UserId?.FirstName || row.original?.EmployeeId?.Name || '';
      const lastName = row.original?.UserId?.LastName || row.original?.EmployeeId?.LastName || '';
      return firstName || lastName ? `${firstName} ${lastName}` : 'N/A';
    },
  },
  {
    accessorKey: 'ComplaintBy',
    header: 'Complaint By',
    cell: ({ row }) => row.original?.ComplaintBy || 'N/A',
  },
  {
    accessorKey: 'Description',
    header: 'Description',
    cell: ({ row }) => row.original?.Description || 'No description provided',
  },
  
  {
    accessorKey: 'Status',
    header: 'Status',
    cell: ({ row }) => (
      <div
        style={{ borderRadius: "20px" }}
        className={`flex items-center justify-center px-2 py-1 ${
          row.original?.Status === 'RESOLVED' || row.original?.Status === 'resolved'
            ? 'bg-green-500'
            : row.original?.Status === 'PENDING' || row.original?.Status === 'pending'
            ? 'bg-red-400'
            : 'bg-yellow-400'
        }`}
      >
        <span className='text-black bold'>{row.original?.Status}</span>
      </div>
    )
  }
  ,

  // {
  //   accessorKey: 'resolution',
  //   header: 'Resolution'
  // },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
