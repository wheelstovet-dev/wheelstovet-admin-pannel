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
import {CaseManagementUser } from '@/constants/case-management-data';

import { Edit, MoreHorizontal, Trash, Eye, UserPlus, UserCheck, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';



export const CellAction: React.FC<any> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onConfirm = async () => {
    // Your confirm logic here
  };

  
  

  const viewCase = () => {
    router.push(`/caseManagement-form/view/?id=${data._id}`); 
  };

  const assignEmployee = () => {
    router.push(`/employee-management?caseId=${data._id}`); 
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

          {/* <DropdownMenuItem onClick={handleRegisterNewSubscription}>
            <UserPlus className="mr-2 h-4 w-4" /> Create New Subscription
          </DropdownMenuItem> */}
         
          <DropdownMenuItem onClick={viewCase}>
            <Eye className="mr-2 h-4 w-4" /> View Case Details
          </DropdownMenuItem>
          <DropdownMenuItem onClick={assignEmployee}>
            <UserCheck className="mr-2 h-4 w-4" /> Assign Employee
          </DropdownMenuItem>
          {/* <DropdownMenuItem onClick={() => setOpen(true)}>
            <FileText height={16}  className="mr-2" />
           View Invoice
           </DropdownMenuItem> */}
          {/* <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
