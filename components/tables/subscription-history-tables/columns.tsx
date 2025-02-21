'use client';

import { ColumnDef, Row } from '@tanstack/react-table';
// import { UserManagement } from '@/constants/user-management-data';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar, Check, ChevronDown, Mail, Phone, X } from 'lucide-react';
import { useState } from 'react';
import { format, formatDuration } from 'date-fns';
import { timeEnd } from 'console';

// interface SubscriptionManagement {
//   status: string;
//   // Add other fields that exist in your table row, e.g., name, id, etc.
//   [key: string]: any; // Optionally, add an index signature if you have dynamic fields
// }

// const StatusCell = ({ row }: { row: Row<any> }) => {
//   const [isOpen, setIsOpen] = useState(false);
  

//   const handleStatusChange = (newStatus: string) => {

//     setIsOpen(false);
//     // Optionally handle any additional logic such as API calls to save status change
//   };

//   return (
//     <div className="relative">
//       <div 
//         style={{ borderRadius: "20px", cursor: "pointer" }}
//         className={`flex justify-between items-center px-4 py-2 ${
//           status === 'Approve' ? 'bg-green-400' :
//           status === 'Reject' ? 'bg-red-400' :
//           status === 'Pending' ? 'bg-yellow-400' :
//           'bg-gray-400'
//         }`}
//       >
//         <span className='text-black font'>{status}</span>
//         <button 
//           className="focus:outline-none ml-auto"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           <ChevronDown className="text-black" size={16} />
//         </button>
//       </div>

//       {isOpen && (
//         <div className="absolute right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
//           <div 
//             className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//             onClick={() => handleStatusChange('Approve')}
//           >
//             Approve
//           </div>
//           <div 
//             className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//             onClick={() => handleStatusChange('Reject')}
//           >
//            Reject
//           </div>
//           <div 
//             className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//             onClick={() => handleStatusChange('Pending')}
//           >
//            Pending
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
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

  // {
  //   accessorKey: 'EmployeeId',
  //   header: 'Employee Details',
  //   cell: ({ row }) => {
  //     const formatName = (name:any) => {
  //       if (!name) return 'N/A';
  //       return name
  //         .split(' ') // Split by space
  //         .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter
  //         .join(' '); // Join back with space
  //     };
  
  //     return (
  //       <div className="flex flex-col me-5 text-center">
  //       <span>{formatName(row.original?.EmployeeId?.Name) || 'N/A'}</span>
  //       <div className="flex items-center mt-2">
  //         <Phone className="text-green-500 mr-2" width={15} height={15} />
  //         <span className="text-[12px]">{row.original?.EmployeeId?.MobileNo || 'N/A'}</span>
  //       </div>
  //     </div>
  //     );
  //   },
  // }, 
  // {
  //   accessorKey: 'SubscriptionId',
  //   header: 'User Details',
  //   cell: ({ row }) => {
  //     const user = row.original?.SubscriptionId?.UserId;
  //     return (
  //       <div className="flex flex-col me-5">
  //       <div className="text-center">
  //         {user ? `${user.FirstName} ${user.LastName}` : 'N/A'}
  //       </div>
  //       <div className="flex items-center mt-1">
  //       <Mail className="text-blue-500 mr-2" width={15} height={15} />
  //       <span className="text-[12px]">{row.original?.SubscriptionId?.UserId?.Email || 'N/A'}</span>
  //     </div>
  //     </div>
  //     );
  //   },
  // },
  // {
  //   accessorKey: 'contact',
  //   header: 'Contact',
  //   cell: ({ row }) => (
  //     <div className="flex flex-col me-5">
  //       <div className="flex items-center mt-1">
  //         <Mail className="text-blue-500 mr-2" width={15} height={15} />
  //         <span className="text-[12px]">{row.original.MobileNo}</span>
  //       </div>
  //       <div className="flex items-center mt-2">
  //         <Phone className="text-green-500 mr-2" width={15} height={15} />
  //         <span className="text-[12px]">{row.original.Email}</span>
  //       </div>
  //     </div>
  //   ),
  // }, 
  
  {
    accessorKey: 'Date',
    header: 'Date',
    cell: ({ row }) => {
      const date = row.original?.Date;
      return <span>{date ? format(new Date(date), 'dd-MMM-yyyy') : 'N/A'}</span>;
    },
  },

  {
    accessorKey: 'PickupTime',
    header: 'Pickup Time',
    cell: ({ row }) => {
      const date = row.original.PickupTime ? new Date(row.original.PickupTime) : null;
      return date && !isNaN(date.getTime()) ? format(date, 'hh:mm a') : 'N/A';
    },
  },
  
  {
    accessorKey: 'DropTime',
    header: 'Drop Time',
    cell: ({ row }) => {
      const date = row.original.DropTime ? new Date(row.original.DropTime) : null;
      return date && !isNaN(date.getTime()) ? format(date, 'hh:mm a') : 'N/A';
    },
  },
  
  
  // {
  //   accessorKey: 'LatePickup',
  //   header: 'Ontime Pickup',
  //   cell: ({ row }) => (
  //     <div className='text-center'>
  //       <span>{row.original.LatePickup ? "No" : "Yes"}</span>
  //     </div>
  //   ),
  // },  
  // {
  //   accessorKey: 'LateDrop',
  //   header: 'Ontime Drop',
  //   cell: ({ row }) => (
  //     <div className="text-center">
  //       <span>{row.original.LateDrop ? "No" : "Yes"}</span>
  //     </div>
  //   ),
  // },
  {
    accessorKey: 'Duration',
    header: 'Duration',
    cell: ({ row }) => (
      <div className="">
        <span>{row.original?.Duration} min</span>
      </div>
    ),
  },
  {
    accessorKey: 'TimeSlot',
    header: 'Time Slot',
    cell: ({ row }) => (
      <div className="">
        <span>{row.original?.TimeSlot || 'N/A'}</span>
      </div>
    ),
  },
  {
    accessorKey: 'Note',
    header: 'Note',
    cell: ({ row }) => (
      <div className="">
        <span>{row.original?.Note}</span>
      </div>
    ),
  },

  {
    accessorKey: 'Status',
    header: 'Status',
    cell: ({ row }) => <span>{row.original?.Status || 'N/A'}</span>,
  },
];
