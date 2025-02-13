import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { Checkbox } from '@/components/ui/checkbox';
import { Check, X, Mail, Phone, MapPin, Award } from 'lucide-react';
import { AssignedCase } from '@/constants/assigned-case-data';
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
  //   accessorKey: 'caseId',
  //   header: 'Case ID',
  //   cell: ({ row }) => <span className="text-red-600 font-bold px-1" style={{ borderRadius: '50%' }}>{row.original.caseId}</span>,
  // },
  {
    accessorKey: 'sno',
    header: 'S.no',
    cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
  },
  {
    accessorKey: 'ServiceId.serviceName',
    header: 'Assigned Service',
    cell: ({ row }) => <span>{row.original?.ServiceId?.serviceName || 'N/A'}</span>,
  },
  {
    accessorKey: 'CurrentStatus',
    header: 'Status',
    cell: ({ row }) => <span>{row.original?.CurrentStatus || 'N/A'}</span>,
  },
  {
    accessorKey: 'CreatedAt',
    header: 'Assigned Date',
    cell: ({ row }) => 
      <span>{row.original?.CreatedAt ? format(new Date(row.original.CreatedAt), 'dd-MMM-yyyy') : 'N/A'}</span>,
  },
  // {
  //   accessorKey: 'Charges',
  //   header: 'Charges',
  //   cell: ({ row }) => <span>{row.original?.Charges || 'N/A'}</span>,
  // },
  {
    accessorKey: 'PaymentMode',
    header: 'Payment Mode',
    cell: ({ row }) => <span>{row.original?.PaymentMode || 'N/A'}</span>,
  },
  {
    accessorKey: 'PickUp',
    header: 'Pickup Address',
    cell: ({ row }) => <span>{row.original?.PickUp || 'N/A'}</span>,
  },
  
  
  // {
  //   id: 'actions',
  //   cell: ({ row }) => <CellAction data={row.original} />,
  // },
];
