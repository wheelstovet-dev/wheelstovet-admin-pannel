'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { ChevronDown } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from '@/components/ui/dropdown-menu';
import { AppDispatch, RootState } from '@/app/redux/store';
import { ToastAtTopRight } from '@/lib/sweetalert';
import { columns } from './columns';
import { getAllComplaints } from '@/app/redux/actions/complaintAction';

const ComplaintManagementUserPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { complaints, loading, error } = useSelector(
    (state: RootState) => state.complaintManagement
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('By type');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [filteredData, setFilteredData] = useState(complaints);

  useEffect(() => {
    dispatch(getAllComplaints({ page: 1, limit: 20 }))
      .unwrap()
      .catch((err: any) => {
        const errorMessage = err.message || 'Failed to fetch complaints';
        ToastAtTopRight.fire({
          icon: 'error',
          title: typeof errorMessage === 'string' ? errorMessage : 'An error occurred',
        });
      });
  }, [dispatch]);

  useEffect(() => {
    setFilteredData(complaints);
  }, [complaints]);

  const handleSearch = (searchValue: string) => {
    setSearchTerm(searchValue);
    const filtered = complaints.filter((item: any) =>
      item.description.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(status);
    const filtered = status
      ? complaints.filter((item: any) => item.status === status)
      : complaints;
    setFilteredData(filtered);
  };

  const handleComplaintByFilterChange = (complaintBy: string) => {
    const filtered = complaintBy
      ? complaints.filter((item: any) => item.complaintBy === complaintBy)
      : complaints;
    setFilteredData(filtered);
  };

  const filters = [
    {
      label: 'Status',
      subOptions: ['Open', 'Closed'],
    },
    {
      label: 'Complaint By',
      subOptions: ['User', 'Employee'],
    },
  ];

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading title={`All Complaints (${filteredData?.length})`} description="Manage Complaints" />
      </div>
      <div className="flex justify-between items-center mb-1">
        <input
          type="text"
          placeholder="Search by description"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="border border-gray-300 rounded-xl px-4 py-2 flex-1"
        />
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center text-gray-600 border border-gray-300 rounded-xl px-4 py-2">
            {filterType} <ChevronDown className="ml-1 h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {filters.map((filter) => (
              <DropdownMenuSub key={filter.label}>
                <DropdownMenuSubTrigger className="flex items-center justify-between">
                  {filter.label}
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  {filter.subOptions.map((subOption) => (
                    <DropdownMenuItem
                      key={subOption}
                      onClick={() => {
                        if (filter.label === 'Status') {
                          handleStatusFilterChange(subOption);
                        } else if (filter.label === 'Complaint By') {
                          handleComplaintByFilterChange(subOption);
                        }
                      }}
                    >
                      {subOption}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Separator />
      {loading ? 'Loading...' : (
        <DataTable
          searchKeys={["description"]}
          columns={columns}
          data={filteredData}
          onSearch={handleSearch}
        />
      )}
    </>
  );
};

export default ComplaintManagementUserPage;
