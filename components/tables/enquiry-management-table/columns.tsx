'use client';

import { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';
import { ChevronDown, Mail, Phone } from 'lucide-react';
import { CellAction } from './cell-action';
import { Enquiry } from '@/constants/enquiry-data';
import { format } from 'date-fns';
import axios from 'axios';
import { ToastAtTopRight } from '@/lib/sweetalert';


// // StatusDropdown component
// const StatusDropdown = ({ currentStatus }: { currentStatus: string }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [status, setStatus] = useState(currentStatus);

//   const handleStatusChange = (newStatus: string) => {
//     setStatus(newStatus);
//     setIsOpen(false);
//   };

//   return (
//     <div>
//       <div
//         onClick={() => setIsOpen(!isOpen)}
//         style={{ borderRadius: '20px', cursor: 'pointer' }}
//         className={`flex items-center px-2 py-1 ${
//           status === 'Approved'
//             ? 'bg-green-400'
//             : status === 'Pending'
//             ? 'bg-yellow-400'
//             : status === 'Rejected'
//             ? 'bg-red-400'
//             : 'bg-gray-400'
//         }`}
//       >
//         <span className="text-black font">{status}</span>
//         <button className="ml-auto focus:outline-none">
//           <ChevronDown className="text-black" size={16} />
//         </button>
//       </div>
//       {isOpen && (
//         <div className="absolute mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
//           <div
//             className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//             onClick={() => handleStatusChange('Approved')}
//           >
//             Approve
//           </div>
//           <div
//             className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//             onClick={() => handleStatusChange('Pending')}
//           >
//             Pending
//           </div>
//           <div
//             className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//             onClick={() => handleStatusChange('Rejected')}
//           >
//             Reject
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// interface StatusDropdownProps {
//   currentStatus: string; // Current status from API response
//   onStatusChange: (newStatus: string) => void; // Callback for handling status changes
// }

// const StatusDropdown: React.FC<StatusDropdownProps> = ({
//   currentStatus,
//   onStatusChange,
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [status, setStatus] = useState(currentStatus);

//   const statusOptions = ['pending', 'resolved']; // Restricted dropdown options

//   const handleStatusChange = (newStatus: string) => {
//     setStatus(newStatus);
//     setIsOpen(false);
//     onStatusChange(newStatus); // Trigger callback
//   };

//   return (
//     <div>
//       {/* Status Display */}
//       <div
//         onClick={() => setIsOpen(!isOpen)}
//         style={{ borderRadius: '20px', cursor: 'pointer' }}
//         className={`flex items-center px-2 py-1 ${
//           status === 'resolved'
//             ? 'bg-green-400'
//             : status === 'pending'
//             ? 'bg-yellow-400'
//             : 'bg-gray-400'
//         }`}
//       >
//         <span className="text-black">{status}</span>
//         <button className="ml-auto focus:outline-none">
//           <ChevronDown className="text-black" size={16} />
//         </button>
//       </div>

//       {/* Dropdown Options */}
//       {isOpen && (
//         <div className="absolute mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
//           {statusOptions.map((statusOption) => (
//             <div
//               key={statusOption}
//               className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//               onClick={() => handleStatusChange(statusOption)}
//             >
//               {statusOption.charAt(0).toUpperCase() + statusOption.slice(1)}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

interface StatusDropdownProps {
  currentStatus: string; // Current status from API
  rowId: string; // ID for the row to identify which item to update
  onStatusChange: (newStatus: string) => void; // Callback for handling status changes
}

const StatusDropdown: React.FC<StatusDropdownProps> = ({
  currentStatus,
  rowId,
  onStatusChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState(currentStatus);
  const [isUpdating, setIsUpdating] = useState(false); // Loading state for API call

  const statusOptions = ['pending', 'resolved'];

  const handleStatusChange = async (newStatus: string) => {
    if (newStatus === status) return; // Avoid unnecessary API calls

    setIsUpdating(true); // Set loading state
    try {
      // API call to update status
      const response = await axios.put(`http://15.206.246.97:3001/admin/updateEnquiry/${rowId}`, {
        status: newStatus,
      });

      // Update status on success
      if (response.status === 200) {
        setStatus(newStatus);
        onStatusChange(newStatus); // Notify parent component
        ToastAtTopRight.fire({
          icon: 'success',
          title: 'Status updated successfully!',
        });
      } 
    } catch (error:any) {
      ToastAtTopRight.fire({
        icon: 'error',
        title: 'Failed to update status',
        text: error.message || 'Failed to update status',
      });
      // console.error('Error updating status:', error);
    } finally {
      setIsUpdating(false);
      setIsOpen(false);
    }
  };

  return (
    <div>
      {/* Status Display */}
      <div
        onClick={() => !isUpdating && setIsOpen(!isOpen)}
        style={{ borderRadius: '20px', cursor: 'pointer', opacity: isUpdating ? 0.6 : 1 }}
        className={`flex items-center px-2 py-1 ${
          status === 'resolved'
            ? 'bg-green-400'
            : status === 'pending'
            ? 'bg-yellow-400'
            : 'bg-gray-400'
        }`}
      >
        <span className="text-black">{isUpdating ? 'Updating...' : status}</span>
        <button className="ml-auto focus:outline-none">
          <ChevronDown className="text-black" size={16} />
        </button>
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <div className="absolute mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          {statusOptions.map((statusOption) => (
            <div
              key={statusOption}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleStatusChange(statusOption)}
            >
              {statusOption.charAt(0).toUpperCase() + statusOption.slice(1)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


// Columns definition
export const columns: ColumnDef<any>[] = [
    // {
    //     accessorKey: 'caseId',
    //     header: 'Case Id',
    //     cell: ({ row }) => <span>{row.original.caseId}</span>,
    //   },
  {
    accessorKey: 'ServiceId',
    header: 'Service Name',
    cell: ({ row }) => <span>{row.original.ServiceId?.serviceName}</span>,
  },
  {
    accessorKey: 'PreferredDates',
    header: 'Preferred Date',
    cell: ({ row }) => {
      const preferredDates = row.original.PreferredDates;
      const expectedTravelDate = row.original.ExpectedTravelDate;
  
      if (preferredDates && preferredDates.length > 0) {
        return preferredDates
          .map((date: string) => format(new Date(date), 'dd-MMM-yyyy'))
          .join(', ');
      }
  
      if (expectedTravelDate) {
        return format(new Date(expectedTravelDate), 'dd-MMM-yyyy');
      }
  
      return 'Not Provided';
    },
  },  
  {
    accessorKey: 'preferredHours',
    header: 'Preferred Hours',
    cell: ({ row }) => {
      const hours = row.original.PreferredHours || 0; // Default to 0 if no value
  
      // Create a date object starting at midnight (00:00:00) and add the hours
      const time = new Date(0); // Epoch start
      time.setHours(hours, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds
  
      // Format the time in HH:mm:ss
      const formattedTime = format(time, 'HH:mm:ss');
  
      return <span>{formattedTime}</span>;
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
  {
    accessorKey: 'PickupLocation',
    header: 'Pickup Address',
    cell: ({ row }) => <span>{row.original?.PickupLocation || 'N/A'}</span>,
  },
  // {
  //   accessorKey: 'updateStatus',
  //   header: 'Status',
  //   cell: ({ row }) => (
  //     <StatusDropdown
  //       currentStatus={row.original.CurrentStatus || 'pending'} // Current status of the row
  //       statusFlow={['pending', 'assigned', 'inProgress', 'completed', 'canceled']} // Pass the statusFlow array
  //       onStatusChange={(newStatus) => {
  //         console.log('Row Data:', row); // Log the entire row data
  //         console.log('Status updated to:', newStatus); // Log the updated status
  //         // Handle the status update here (e.g., make an API call)
  //       }}
  //     />
  //   ),
  // },
  {
    accessorKey: 'updateStatus',
    header: 'Status',
    cell: ({ row }) => (
      <StatusDropdown
        currentStatus={row.original.CurrentStatus || 'pending'} // Current status from API
        rowId={row.original._id} // Unique ID to identify the row
        onStatusChange={(newStatus) => {
          console.log('Status updated to:', newStatus);
          // Optionally trigger table re-fetch or update local state
        }}
      />
    ),
  },
  
  
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
