'use client';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
// import { UserManagement } from '@/constants/user-management-data';
import { Checkbox } from '@/components/ui/checkbox';
import { Mail, Phone } from 'lucide-react';

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
    enableHiding: false
  },
  // {
  //   accessorKey: 'userId',
  //   header: 'User Id'
  // },
  {
    accessorKey: 'FirstName',
    header: 'First Name'
  },
  {
    accessorKey: 'LastName',
    header: 'Last Name'
  },
  {
    accessorKey: 'contact',
    header: 'Contact',
    cell: ({ row }) => (
      <div className="flex flex-col me-5">
        <div className="flex items-center mt-1">
          <Mail className="text-blue-500 mr-2" width={15} height={15} />
          <span className="text-[12px]">{row.original.Email}</span>
        </div>
        <div className="flex items-center mt-2">
          <Phone className="text-green-500 mr-2" width={15} height={15} />
          <span className="text-[12px]">{row.original.MobileNo}</span>
        </div>
      </div>
    ),
  },
  // {
  //   accessorKey: 'AccountStatus',
  //   header: 'Activity Status',
   
  // },
  // {
  //   accessorKey: 'address',
  //   header: 'Address'
  // },
  // {
  //   accessorKey: 'city',
  //   header: 'City'
  // },
  // {
  //   accessorKey: 'state',
  //   header: 'State'
  // },
  // {
  //    accessorKey: 'IsSubscribed',
  //   header: 'Subscription'
  // },
//   {
//     accessorKey: 'lastLogin',
//    header: 'Last Login'
//  }
// {
//     accessorKey: 'LoginType',
//    header: 'Login Type'
//  },
  // {
  //   accessorKey: 'reference',
  //   header: 'Reference'
  // },
  {
      accessorKey: 'LocationDescription',
      header: 'Address'
    },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
