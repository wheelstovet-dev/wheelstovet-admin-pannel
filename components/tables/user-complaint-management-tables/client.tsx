'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { ChevronDown, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { ComplaintManagementUser, ComplaintManagementUserData } from '@/constants/complaint-management-data-user';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const ComplaintManagementUserPage: React.FC = () => {
  const router = useRouter();
  const initialData: ComplaintManagementUser[] = ComplaintManagementUserData;
  const [data, setData] = useState<ComplaintManagementUser[]>(initialData);

  const handleSearch = (searchValue: string) => {
    const filteredData = initialData.filter(item =>
      item.description.toLowerCase().includes(searchValue.toLowerCase())
    );
    setData(filteredData);
  };

  const handleSort = (sortBy: string, sortOrder: 'asc' | 'desc') => {
    const sortedData = [...data].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.complaintBy.localeCompare(b.complaintBy);
      } else {
        return b.complaintBy.localeCompare(a.complaintBy);
      }
    });
    setData(sortedData);
  };
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('By type');
  const filters = [
    {
      label: 'Status',
      subOptions: ['Open', 'Closed'],
    },
    {
      label: 'Complaint By',
      subOptions: ['User', 'Employee', 'User', 'Employee'],
    },
  ];

  return (
    <>
      <div className="flex items-start justify-between">
        {/* <Heading
          title={`Received Complaint`}
          description=""
        /> */}
        {/* <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/received-complaint`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button> */}
      </div>
      <div className="flex justify-between items-center mb-1">
            <h1 className="text-2xl font-bold">Complaints</h1>
            <div className="flex space-x-2 w-full max-w-3xl">
              <input
                type="text"
                placeholder="Search by name or phone number"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded-xl px-4 py-2 flex-1"
              />
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center text-gray-600 border border-gray-300 rounded-xl px-4 py-2">
                  {filterType} <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {['Type 1', 'Type 2', 'Type 3'].map((type) => (
                    <DropdownMenuItem key={type} onClick={() => setFilterType(type)}>
                      {type}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
      <DataTable
        searchKeys={["name"]}
        columns={columns}
        data={data}
        onSearch={handleSearch} 
        filters={filters}
      />
    </>
  );
};

export default ComplaintManagementUserPage;
