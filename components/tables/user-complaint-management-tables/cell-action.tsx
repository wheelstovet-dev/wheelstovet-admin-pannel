'use client';

import { deleteComplaint, getAllComplaints } from '@/app/redux/actions/complaintAction';
import { AppDispatch } from '@/app/redux/store';
import { AlertModal } from '@/components/modal/alert-modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ComplaintManagement } from '@/constants/complaint-management-data';
import { ComplaintManagementUser } from '@/constants/complaint-management-data-user';
import { ToastAtTopRight } from '@/lib/sweetalert';
import { Edit, MoreHorizontal, Trash, Eye, UserPlus, UserCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch } from 'react-redux';



export const CellAction: React.FC<any> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();


  console.log("complaint data- "+data);

  const onConfirm = async () => {
    // Your confirm logic here
    try {
      await dispatch(deleteComplaint(data._id)).unwrap();
      ToastAtTopRight.fire({
        icon: 'success',
        title: 'Complaint deleted successfully!',
      });
      dispatch(getAllComplaints({ page: 1, limit: 20 })); // Refresh the complaint list
    } catch (error: any) {
      ToastAtTopRight.fire({
        icon: 'error',
        title: error || 'Failed to delete complaint',
      });
    }
  };

  const handleRegisterNewSubscription = () => {
    router.push('/complaint-management/register'); 
  };

  const editComplaintMessage = () => {
    router.push(`/complaint-management/editComplaintMessage/${data}`); 
  };

  const viewComplaint = () => {
    // console.log("complaint data- "+data);
    if (data?._id) {
      router.push(`/complaint-form?mode=view&id=${data._id}`);
    } else {
      console.error('Complaint ID not found');
    }
  };

  const updateComplaint = () => {
    if (data?._id) {
      router.push(`/complaint-form?mode=update&id=${data._id}`);
    } else {
      console.error('Complaint ID not found');
    }
  };
  const recordResolution = () => {
    router.push(`/complaint-management/recordResolution/${data}`); 
  };

  // const handleDelete = async (complaintId: string) => {
  //   try {
  //     await dispatch(deleteComplaint(complaintId)).unwrap();
  //     ToastAtTopRight.fire({
  //       icon: 'success',
  //       title: 'Hostel deleted successfully!',
  //     });
  //     dispatch(getAllComplaints({ page: 1, limit: 20 })); // Refresh the hostels list
  //   } catch (error: any) {
  //     ToastAtTopRight.fire({
  //       icon: 'error',
  //       title: error || 'Failed to delete hostel',
  //     });
  //   }
  // };



  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}

          {/* <DropdownMenuItem onClick={handleRegisterNewSubscription}>
            <UserPlus className="mr-2 h-4 w-4" /> Create New Subscription
          </DropdownMenuItem> */}
          {/* <DropdownMenuItem onClick={editComplaintMessage}>
            <Edit className="mr-2 h-4 w-4" /> Edit Complaint Message
          </DropdownMenuItem> */}
          <DropdownMenuItem onClick={viewComplaint}>
            <Eye className="mr-2 h-4 w-4" /> View Complaint 
          </DropdownMenuItem>
          <DropdownMenuItem onClick={updateComplaint}>
            <UserCheck className="mr-2 h-4 w-4" /> Update Complaint
          </DropdownMenuItem>
          {/* <DropdownMenuItem onClick={recordResolution}>
            <UserCheck className="mr-2 h-4 w-4" /> Record Resolution
          </DropdownMenuItem> */}
          
          <DropdownMenuItem onClick={() => setOpen(true)}>
            {/* <Trash className="mr-2 h-4 w-4" onClick={() => handleDelete(data._id)} /> Delete */}
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
