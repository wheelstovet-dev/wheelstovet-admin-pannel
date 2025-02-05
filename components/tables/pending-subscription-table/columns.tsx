'use client';

import { ColumnDef, Row } from '@tanstack/react-table';
// import { CellAction } from './cell-action';
// import { UserManagement } from '@/constants/user-management-data';
import { Checkbox } from '@/components/ui/checkbox';
// import { SubscriptionManagement } from '@/constants/subscription-management-data';
import { Calendar, Check, ChevronDown, Mail, Phone, X } from 'lucide-react';
import { useState } from 'react';
import { format } from 'date-fns';
import { updateSubscriptionStatus } from '@/app/redux/actions/subscriptionAction';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/redux/store';
import { CellAction } from './cell-actions';
import { ToastAtTopRight } from '@/lib/sweetalert';


const StatusCell = ({ row }: { row: Row<any> }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = useState(false);
  
  // Default to "Approval pending" if Status is undefined
  const [status, setStatus] = useState(row.original?.Status || 'Approval pending');

  const handleStatusChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value;
    console.log("Selected status:", newStatus);  // Check if new status is selected
    setStatus(newStatus);  // This should update the dropdown
  
    try {
      await dispatch(updateSubscriptionStatus({
        id: row.original?._id,
        status: newStatus,
      })).unwrap();
  
      ToastAtTopRight.fire({
        icon: 'success',
        title: `Status updated to ${newStatus}`,
      });
    } catch (error) {
      console.error('Failed to update status:', error);
      ToastAtTopRight.fire({
        icon: 'error',
        title: `Failed to update status`,
      });
    }
  };
  
  

  return (
    <div className="relative w-full">
      <select
  value={status}  // Ensure this matches one of the options exactly
  onChange={handleStatusChange}
  onFocus={() => setIsOpen(true)}
  onBlur={() => setIsOpen(false)}
  style={{ borderRadius: '20px' }}
  className={`appearance-none w-full px-4 py-2 pr-10 transition-all duration-200 ${
    isOpen
      ? 'bg-white text-black'
      : status === 'Approved'
      ? 'bg-green-400 text-white'
      : status === 'Not Approved'
      ? 'bg-red-400 text-white'
      : status === 'Approval pending'
      ? 'bg-yellow-400 text-black'
      : 'bg-gray-200 text-black'
  }`}
>
  <option value="Approval pending">Approval Pending</option>
  <option value="Approved">Approved</option>
  <option value="Not Approved">Not Approved</option>
</select>


      {/* Dropdown Arrow */}
      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
        <ChevronDown className="w-5 h-5 text-gray-600" />
      </div>
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
  //   enableHiding: false
  // },
  // {
  //   accessorKey: 'subscriptionId',
  //   header: 'Subscription ID',
  //   cell: ({ row }) => (
  //     <div className="flex justify-center">
  //      <span className="text-green-600 font-bold  px-1" style={{borderRadius:"50%"}} > {row.original.subscriptionId}</span>
  //     </div>
  //   )
  // },
  // {
  //   accessorKey: 'userId',
  //   header: 'User ID',
  //   cell: ({ row }) => (
  //     <div className="flex justify-center">
  //      <span className="  text-red-600 font-bold px-1" style={{borderRadius:"50%"}} > {row.original.userId}</span>
  //     </div>
  //   )
  // },
  {
    accessorKey: 'sno',
    header: 'S.no',
    cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
  },
  {
    accessorKey: 'Plan.Name',
    header: 'Plan',
  },
  {
    accessorKey: 'Plan.Frequency',
    header: 'Frequency'
  },
  {
    accessorKey: 'CreatedAt',
    header: 'Date',
    cell: ({ row }) => {
      const createdAt = row.original.CreatedAt;
      return createdAt ? format(new Date(createdAt), 'dd-MMM-yyyy') : 'N/A';
    },
  },
  
  {
    accessorKey: 'UserId',
    header: 'User Name',
    cell: ({ row }) => {
      const firstName = row.original?.UserId?.FirstName || 'N/A';
      const lastName = row.original?.UserId?.LastName || 'N/A';
      return `${firstName} ${lastName}`|| 'N/A';
    },
  },
  {
    accessorKey: 'UserId',
    header: 'Contact',
    cell: ({ row }) => (
      <div className="flex flex-col">
        <div className="flex items-center mt-1">
          <Mail className="text-blue-500 mr-2" width={15} height={15} />
          <span className="text-[12px]">{row.original?.UserId?.Email || 'N/A'}</span>
        </div>
        <div className="flex items-center mt-2">
          <Phone className="text-green-500 mr-2" width={15} height={15} />
          <span className="text-[12px]">{row.original?.UserId?.MobileNo || 'N/A'}</span>
        </div>
      </div>
    ),
  },
  // {
  //   accessorKey: 'Timeslot',
  //   header: 'Time Slot'
  // },
  // {
  //   accessorKey: 'subscriptionEndDate',
  //   header: 'Subscription End Date',
  //   cell: ({ row }) => (
  //     <div className="flex items-center mt-1">
  //       <Calendar className="text-blue-500 mr-2" width={16} height={16} />
  //       <span className="text-[12px]">{row.original.subscriptionEndDate}</span>
  //     </div>
  // )
  // },
  // {
  //   accessorKey: 'Status',
  //   header: 'Status',
  //   cell: ({ row }) => <span>{row.original?.Status}</span>,
  // },
  {
    accessorKey: 'Status',
    header: 'Status',
    cell: ({ row }) => <StatusCell row={row} />,
  },
  {
    accessorKey: 'IsActive',
    header: 'Activity',
    cell: ({ row }) => (
      <div 
        style={{ borderRadius: "20px" }}
        className={`flex items-center me-5 justify-between px-4 py-2 ${
          row.original.IsActive ? 'bg-yellow-400' : 'bg-red-400'
        }`}
      >
        {row.original.IsActive ? (
          <Check width={16} height={16} className="text-yellow-500 mr-2" />
        ) : (
          <X width={16} height={16} className="text-red-900 mr-2" />
        )}
        <span className='text-black '>{row.original.IsActive ? 'Active' : 'Inactive'}</span>
      </div>
    )
  },
 
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];