'use client';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { UserManagement, UserManagementData } from '@/constants/user-management-data';
import { useState } from 'react';

// interface ProductsClientProps {
//   data: User[];
// }
export const UserClient: React.FC = () => {
  const router = useRouter();
  const initialData: UserManagement[] = UserManagementData;
  const [data, setData] = useState<UserManagement[]>(initialData);


  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Users (${data.length})`}
          description="Manage users "
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/user`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKeys={["name"]} 
      columns={columns} 
      data={data} />
    </>
  );
};
