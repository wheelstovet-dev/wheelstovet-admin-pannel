'use client';

import { deleteCoupon, getAllCoupons } from '@/app/redux/actions/couponAction';
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
import { CouponManagement } from '@/constants/coupons-management-data';
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

  const onConfirm = async () => {
    // Logic for delete confirmation
    try {
      await dispatch(deleteCoupon(data._id)).unwrap();
      ToastAtTopRight.fire({
        icon: 'success',
        title: 'Coupon deleted successfully!',
      });
      dispatch(getAllCoupons({ page: 1, limit: 20 })); // Refresh the Coupon list
    } catch (error: any) {
      ToastAtTopRight.fire({
        icon: 'error',
        title: error || 'Failed to delete Coupon',
      });
    }
  };

  const handleUpdateCoupon = () => {
    router.push(`/coupons?mode=update&code=${data.CouponCode}&id=${data._id}`); 
  };

  const handleAssignCoupon = () => {
    router.push(`/coupons?mode=update&code=${data.CouponCode}`); 
  };

  const handleViewCoupon = () => {
    router.push(`/coupons?mode=view&code=${data.CouponCode}`); 
  };

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
          <DropdownMenuItem onClick={handleViewCoupon}>
            <Edit className="mr-2 h-4 w-4" /> View Coupon Details
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleUpdateCoupon}>
            <Edit className="mr-2 h-4 w-4" /> Update Coupon Details
          </DropdownMenuItem>
          {/* <DropdownMenuItem onClick={handleAssignCoupon}>
            <Edit className="mr-2 h-4 w-4" /> Assign Customers
          </DropdownMenuItem> */}
          {/* <DropdownMenuItem onClick={updateCouponVisibility}>
            <UserCheck className="mr-2 h-4 w-4" /> Update Coupon Visibility
          </DropdownMenuItem> */}
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
