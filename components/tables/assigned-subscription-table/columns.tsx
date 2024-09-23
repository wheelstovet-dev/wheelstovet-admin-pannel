
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { Checkbox } from '@/components/ui/checkbox';
import { Check, X, Mail, Phone, MapPin, Award } from 'lucide-react';
import { AssignedSubscription } from '@/constants/assigned-subscription-data';
export const columns: ColumnDef<AssignedSubscription>[] = [
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
    accessorKey: 'caseId',
    header: 'Case ID',
    cell: ({ row }) => <span className="text-red-600 font-bold px-1" style={{ borderRadius: '50%' }}>{row.original.caseId}</span>,
  },
 
  {
    accessorKey: 'plan',
    header: 'Plan',
    cell: ({ row }) => <span>{row.original.plan}</span>,
  },
 
  
 
  {
    accessorKey: 'frequency',
    header: 'Frequency',
    cell: ({ row }) => <span>{row.original.frequency}</span>,
  },
  {
    accessorKey: 'userFeedback',
    header: 'userFeedback',
    cell: ({ row }) => <span>{row.original.userFeedback}</span>,
  },
  {
    accessorKey: 'assignedDate',
    header: 'Assigned Date',
    cell: ({ row }) => (
      <span>{row.original.assignedDate ? new Date(row.original.assignedDate).toLocaleDateString() : 'N/A'}</span>
    ),
  },
 
  {
    accessorKey: 'timeSlot',
    header: 'Time Slot',
    cell: ({ row }) => <span>{row.original.timeSlot}</span>,
  },
  
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
