'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { Heading } from '@/components/ui/heading';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from '@/components/ui/dropdown-menu';
import { CalendarDateRangePicker } from '@/components/date-range-picker';
import { ChevronDown, FileText} from 'lucide-react';
import { DataTable } from '@/components/ui/data-table';
import { CaseManagementUser , CaseManagementData} from '@/constants/case-management-data';
import { Separator } from '@radix-ui/react-dropdown-menu';

const CaseManagementClient: React.FC = () => {
  const router = useRouter();
  const initialData: CaseManagementUser[] = CaseManagementData;
  const [data, setData] = useState<CaseManagementUser[]>(initialData);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('By type');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [complaintByFilter, setComplaintByFilter] = useState<string | null>(null);

  const handleSearch = (searchValue: string) => {
    const filteredData = initialData.filter(item =>
      item.serviceName.toLowerCase().includes(searchValue.toLowerCase())
    );
    setData(filteredData);
  };

  const handleStatusFilterChange = (serviceName: string) => {
    setStatusFilter(serviceName);
    const filteredData = initialData.filter(item => item.serviceName === serviceName);
    setData(filteredData);
  };

//   const handleComplaintByFilterChange = (complaintBy: string) => {
//     setComplaintByFilter(complaintBy);
//     const filteredData = initialData.filter(item => item.complaintBy === complaintBy);
//     setData(filteredData);
//   };

  return (
    <>
    <div className="flex justify-end space-x-2">
          <Button variant="outline" className="flex text-white bg-yellow-500   hover:bg-yellow-600 hover:text-white items-center transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 ">
            <FileText height={16}  className="mr-2" />
           View Invoice
          </Button>
          
        </div>
    <div className="flex items-start justify-between">
    <Heading
          title={`Cases (${data.length})`}
          description="Manage Cases"
        />
            <div className="flex space-x-2 w-full max-w-3xl">
              <input
                type="text"
                placeholder="Search by pet name or assigned employee"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded-xl px-4 py-2 flex-1"
              />
              <div className="hidden items-center space-x-2 md:flex">
                <CalendarDateRangePicker />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center text-gray-600 border border-gray-300 rounded-xl px-4 py-2">
                  {filterType} <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger className="flex items-center text-gray-600 px-4 py-2">
                      Sort by Service
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem onClick={() => handleStatusFilterChange('Dog Walking')}>
                        Dog Walking
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusFilterChange('Salon')}>
                        Salon
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusFilterChange('Veterinary')}>
                        Veterinary
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusFilterChange('Pet Taxi')}>
                        Pet Taxi
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusFilterChange('Pet Rescue')}>
                        Pet Rescue
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => { setFilterType('By type'); handleStatusFilterChange(''); }}>
                        Reset
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
    </div>
         
    <Separator />
     
      <DataTable
        searchKeys={['name']}
        columns={columns}
        data={data}
        onSearch={handleSearch}
        // filters={filters}
      />
     
    </>
  );
};

export default CaseManagementClient;
