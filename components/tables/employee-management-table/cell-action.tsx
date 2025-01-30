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

import { Eye, UserCheck, MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// interface CellActionProps {
//   data: EmployeeManagement;
// }

export const CellAction: React.FC<any> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  // console.log("admin data- "+data);

  const onConfirm = async () => {
    // Logic for delete confirmation
  };

  // Navigate to view employee page with query parameters
  const viewEmployee = () => {
    router.push(`/employee-form?mode=view&id=${data._id}`);
  };

  // Navigate to update employee page with query parameters
  const updateEmployee = () => {
    router.push(`/employee-form?mode=update&id=${data._id}`);
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
          
          {/* View Employee Action */}
          {/* <DropdownMenuItem onClick={viewEmployee}>
            <Eye className="mr-2 h-4 w-4" /> View Employee
          </DropdownMenuItem> */}

          {/* Update Employee Action */}
          <DropdownMenuItem onClick={updateEmployee} className='emp-action'>
            <UserCheck className="mr-2 h-4 w-4" /> Update Employee
          </DropdownMenuItem>

          {/* Delete Employee Action
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete Employee
          </DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
