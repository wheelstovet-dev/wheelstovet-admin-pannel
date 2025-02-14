
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { Checkbox } from '@/components/ui/checkbox';
import { Check, X, Mail, Phone, MapPin, Award } from 'lucide-react';
import { AssignedSubscription } from '@/constants/assigned-subscription-data';
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
  //   enableHiding: false,
  // },
  // {
  //   accessorKey: 'UserId',
  //   header: 'Employee Name',
  //   cell: ({ row }) => {
  //     const firstName = row.original?.UserId?.FirstName;
  //     const lastName = row.original?.UserId?.LastName;
  //     return `${firstName && lastName ? firstName + ' ' + lastName : 'N/A'}`;
  //   },
  // },
  {
    accessorKey: 'sno',
    header: 'S.no',
    cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
  },
  {
    accessorKey: 'AssignedEmp',
    header: 'Employee Name',
    cell: ({ row }) => {
      const Name = row.original?.AssignedEmp?.Name;
      return Name || 'N/A';
    },
  },
  {
    accessorKey: 'Plan',
    header: 'Plan',
    cell: ({ row }) => <span>{row.original?.Plan?.Name || 'N/A'}</span>,
  },
  {
    accessorKey: 'Frequency',
    header: 'Frequency',
    cell: ({ row }) => <span>{row.original?.Plan?.Frequency || 'N/A'}</span>,
  },
  {
    accessorKey: 'Status',
    header: 'Status',
    cell: ({ row }) => <span>{row.original?.Status || 'N/A'}</span>,
  },
  {
    accessorKey: 'PickupLocation',
    header: 'Pickup Location',
    cell: ({ row }) => <span>{row.original?.PickupLocation || 'N/A'}</span>,
  },
  {
    accessorKey: 'CreatedAt',
    header: 'Assigned Date',
    cell: ({ row }) => 
      <span>{row.original?.CreatedAt ? format(new Date(row.original.CreatedAt), 'dd-MMM-yyyy') : 'N/A'}</span>,
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },  
];
