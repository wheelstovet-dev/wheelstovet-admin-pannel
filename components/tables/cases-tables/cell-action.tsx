'use client';

import { AlertModal } from '@/components/modal/alert-modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ToastAtTopRight } from '@/lib/sweetalert';
import { Eye, MoreHorizontal, UserCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export const CellAction: React.FC<any> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onConfirm = async () => {
    // Your confirm logic here
    console.log(data);
  };

  const viewCase = () => {
    router.push(`/caseManagement-form/view/?id=${data?._id}`);
  };

  const assignEmployee = () => {
    console.log("Data ",data);

    if (data.EmpId && data.CurrentStatus === "Assigned") {
      router.push(`/employee-management?caseId=${data?._id}`);
      return;
    }
    if (!data.EmpId) {
      router.push(`/employee-management?caseId=${data?._id}`);
    } else {
      ToastAtTopRight.fire({
        icon: 'warning',
        title: `Employee:${data?.EmpId?.Name} Already assigned — Status: ${data?.CurrentStatus}`,
      });
    }
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
          <DropdownMenuItem onClick={viewCase}>
            <Eye className="mr-2 h-4 w-4" /> View Case Details
          </DropdownMenuItem>
          <DropdownMenuItem onClick={assignEmployee}>
            <UserCheck className="mr-2 h-4 w-4" /> Assign Employee
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
