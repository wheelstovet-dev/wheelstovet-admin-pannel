'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
// import { UserManagement, userManagementData } from '@/constants/user-management-data';

import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { EmplpoyeeEsclated, EmplpoyeeEsclatedData } from '@/constants/employee-esclated-data';

export const EmployeeEsclatedClient: React.FC = () => {
  const router = useRouter();
  const initialData: EmplpoyeeEsclated[] = EmplpoyeeEsclatedData;
  const [data, setData] = useState<EmplpoyeeEsclated[]>(initialData);


  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Employee Esclation`}
          description=""
        />
        {/* <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/order`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button> */}
      </div>
      <Separator />
      <DataTable
        // searchKey=" assignedEmployee"
        columns={columns}
        data={data}

        
      />
    </>
  );
};