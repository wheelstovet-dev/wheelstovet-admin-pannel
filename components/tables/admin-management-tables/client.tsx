'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';

import { AdminManagement, AdminManagementData } from '@/constants/admin-management-data';

export const AdminManagementClient: React.FC = () => {
  const router = useRouter();
  const initialData: AdminManagement[] = AdminManagementData;
  const [data, setData] = useState<AdminManagement[]>(initialData);

  const handleSearch = (searchValue: string) => {
    const filteredData = initialData.filter(item =>
      item.fullName.toLowerCase().includes(searchValue.toLowerCase())
    );
    setData(filteredData);
  };

  // const handleSort = (sortBy: string, sortOrder: 'asc' | 'desc') => {
  //   // Example: Sorting by first name
  //   const sortedData = [...data].sort((a, b) => {
  //     if (sortOrder === 'asc') {
  //       return a.fullName.localeCompare(b.fullName);
  //     } else {
  //       return b.firstName.localeCompare(a.firstName);
  //     }
  //   });
  //   setData(sortedData);
  // };
//   const filters = [
//     {
//       label: 'Role ',
//       subOptions: ['Manager', 'Support Staff','Technician','Customer Service'],
//     }
  
//   ];
  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Admin (${data.length})`}
          description="Manage Admin (Client side table functionalities.)"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/admin`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable
        // searchKeys="fullName"
        columns={columns}
        data={data}
        onSearch={handleSearch} 
        // filters={filters}
        // onSort={handleSort} 
      />
    </>
  );
};
