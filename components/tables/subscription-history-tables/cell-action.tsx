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
import { SubscriptionHistory } from '@/constants/subscriptionHistory';
import { Edit, MoreHorizontal, Trash, Eye, UserPlus, UserCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface CellActionProps {
  data: SubscriptionHistory;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onConfirm = async () => {
    // Your confirm logic here
  };

  const handleViewSubscriptionHistory = () => {
    router.push('/subscription-management/register'); 
  };

  const handleEditSubscription = () => {
    router.push(`/subscription-management/edit/${data.subscriptionId}`); 
  };

  const handleViewSubscriptionDetail = () => {
    router.push(`/subscription-form/view/${data.subscriptionId}`); 
  };

 
//   const assignEmployee = () => {
//     router.push(`/employee-management/${data.caseId}`); 
//   };
  


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
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          {/* <DropdownMenuItem onClick={handleViewSubscriptionHistory}>
            <UserPlus className="mr-2 h-4 w-4" /> View Subscription History
          </DropdownMenuItem> */}
          {/* <DropdownMenuItem onClick={handleEditSubscription}>
            <Edit className="mr-2 h-4 w-4" /> Edit Subscription Details
          </DropdownMenuItem> */}
          {/* <DropdownMenuItem onClick={handleViewSubscriptionDetail}>
            <Eye className="mr-2 h-4 w-4" /> View Subscription Details
          </DropdownMenuItem> */}
        
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Deactivate Subscription
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};