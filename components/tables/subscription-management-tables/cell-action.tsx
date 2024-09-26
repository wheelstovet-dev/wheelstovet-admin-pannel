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
import { SubscriptionManagement } from '@/constants/subscription-management-data';
import { Edit, MoreHorizontal, Trash, Eye, UserPlus, UserCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface CellActionProps {
  data: SubscriptionManagement;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onConfirm = async () => {
    // Your confirm logic here
  };

  const handleRegisterNewSubscription = () => {
    router.push('/subscription-management/register'); 
  };

  const handleEditSubscription = () => {
    router.push(`/subscription-management/edit/${data.subscriptionId}`); 
  };

  const handleViewSubscriptionHistory = () => {
    router.push(`/subscription-form/view/${data.subscriptionId}`); 
  };

 
  const assignEmployee = () => {
    router.push(`/employee-management/${data.caseId}`); 
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
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          {/* <DropdownMenuItem onClick={handleRegisterNewSubscription}>
            <UserPlus className="mr-2 h-4 w-4" /> Create New Subscription
          </DropdownMenuItem> */}
          {/* <DropdownMenuItem onClick={handleEditSubscription}>
            <Edit className="mr-2 h-4 w-4" /> Edit Subscription Details
          </DropdownMenuItem> */}
          <DropdownMenuItem onClick={handleViewSubscriptionHistory}>
            <Eye className="mr-2 h-4 w-4" /> View Subscription History
          </DropdownMenuItem>
          <DropdownMenuItem onClick={assignEmployee}>
            <UserCheck className="mr-2 h-4 w-4" /> Assign Employee
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Deactivate Subscription
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};