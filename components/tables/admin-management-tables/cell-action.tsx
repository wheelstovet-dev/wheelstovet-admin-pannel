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
//   data: AdminManagement;
// }

export const CellAction: React.FC<any> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  // console.log("admin data- "+data._id);

  const onConfirm = async () => {
    // Your confirm logic here
  };

  // Navigate to the admin page with mode=view and admin ID
  const viewAdmin = () => {
    router.push(`/admin?mode=view&id=${data._id}`); // Pass mode and id as query parameters
  };

  // Navigate to the admin page with mode=update and admin ID
  const editAdmin = () => {
    router.push(`/admin?mode=update&id=${data._id}`); // Pass mode and id as query parameters
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
          
          {/* View Admin Action */}
          <DropdownMenuItem onClick={viewAdmin}>
            <Eye className="mr-2 h-4 w-4" /> View Admin
          </DropdownMenuItem>

          {/* Update Admin Action */}
          <DropdownMenuItem onClick={editAdmin}>
            <UserCheck className="mr-2 h-4 w-4" /> Update Admin
          </DropdownMenuItem>
          
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
