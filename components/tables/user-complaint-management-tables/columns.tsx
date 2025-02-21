'use client';

import { ColumnDef,Row } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronDown } from 'lucide-react';
import { ToastAtTopRight } from '@/lib/sweetalert';
import { useState } from 'react';
import { AppDispatch } from '@/app/redux/store';
import { useDispatch } from 'react-redux';
import { getAllComplaints, updateComplaintStatus } from '@/app/redux/actions/complaintAction';
// import { ComplaintManagementUser } from '@/constants/complaint-management-data-user';

const StatusCell = ({ row }: { row: Row<any> }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = useState(false);
  
  // Default to "Approval pending" if Status is undefined
  const [status, setStatus] = useState(row.original?.Status || 'pending');

  const handleStatusChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
     const newStatus = event.target.value;
     console.log("Selected status:", newStatus);  // Check if new status is selected
    setStatus(newStatus);  // This should update the dropdown
  
    try {
      await dispatch(updateComplaintStatus({
        id: row.original?._id,
        complaintStatus: { Status: newStatus },
      })).unwrap();
  
      ToastAtTopRight.fire({
        icon: 'success',
        title: `Status updated to ${newStatus}`,
      });
      dispatch(getAllComplaints({ page: 1, limit: 5 }));
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
    : status === 'resolved'
    ? 'bg-green-500 text-white'   // ✅ Green for resolved
    : status === 'inprogress'
    ? 'bg-yellow-400 text-black'  // ✅ Yellow for inprogress
    : status === 'pending'
    ? 'bg-red-500 text-white'     // ✅ Red for pending
    : 'bg-gray-200 text-black'
  }`}
>
        <option value="pending">Pending</option>
        <option value="inprogress">In Progress</option>
        <option value="resolved">Resolved</option>
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
  
  // {
  //   accessorKey: 'Status',
  //   header: 'Status',
  //   cell: ({ row }) => (
  //     <div
  //       style={{ borderRadius: "20px" }}
  //       className={`flex items-center justify-center px-2 py-1 ${
  //         row.original?.Status === 'RESOLVED' || row.original?.Status === 'resolved'
  //           ? 'bg-green-500'
  //           : row.original?.Status === 'PENDING' || row.original?.Status === 'pending'
  //           ? 'bg-red-400'
  //           : 'bg-yellow-400'
  //       }`}
  //     >
  //       <span className='text-black bold'>{row.original?.Status}</span>
  //     </div>
  //   )
  // }
  {
    accessorKey: 'Status',
    header: 'Status',
    cell: ({ row }) => <StatusCell row={row} />,
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
