'use client';

import { AlertModal } from '@/components/modal/alert-modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Enquiry } from '@/constants/enquiry-data';
import { Edit, MoreHorizontal, Trash, Eye, UserPlus, UserCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';


export const CellAction: React.FC<any> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  
  const onConfirm = async () => {
    console.log("data");
      // Your confirm logic here
    //   try {
    //     await dispatch(deleteComplaint(data._id)).unwrap();
    //     ToastAtTopRight.fire({
    //       icon: 'success',
    //       title: 'Complaint deleted successfully!',
    //     });
    //     dispatch(getAllComplaints({ page: 1, limit: 20 })); // Refresh the complaint list
    //   } catch (error: any) {
    //     ToastAtTopRight.fire({
    //       icon: 'error',
    //       title: error || 'Failed to delete complaint',
    //     });
    //   }
    };

  // const handleRegisterNewSubscription = () => {
  //   router.push('/subscription-management/register'); 
  // };

//   const updateDeliveryStatus = () => {
//     router.push(`/subscription-management/edit/${data.caseId}`); 
//   };

//   const handleViewAndManageOrder = () => {
//     router.push(`/subscription-management/view/${data.caseId}`); 
//   };

//   const hanldeResheduleAndSkips = () => {
//     router.push(`/subscription-management/toggleDeliveryDays/${data.caseId}`); 
//   };
//   const generatePackingList = () => {
//     router.push(`/subscription-management/manageCustomizationOption/${data.caseId}`); 
//   };
  // const assignDeliveryRoutes = () => {
  //   router.push(`/subscription-management/handleUpgradeAndRenewal/${data.orderId}`); 
  // };


  return (
    <>
      {/* <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
        className='enquiry-action'
      /> */}
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0 enquiry-action">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

         
          <DropdownMenuItem className='enquiry-action' onClick={onConfirm}>
            <Trash className="mr-2 h-4 w-4 enquiry-action" /> Delete
          </DropdownMenuItem>
          {/* <DropdownMenuItem onClick={hanldeResheduleAndSkips}>
            <UserCheck className="mr-2 h-4 w-4" /> Reschedule and Skips
          </DropdownMenuItem> */}
          {/* <DropdownMenuItem onClick={generatePackingList}>
            <UserCheck className="mr-2 h-4 w-4" /> Generate Packing List
          </DropdownMenuItem> */}
          {/* <DropdownMenuItem onClick={assignDeliveryRoutes}>
            <UserCheck className="mr-2 h-4 w-4" /> Assign Delivery Routes
          </DropdownMenuItem> */}
         
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};