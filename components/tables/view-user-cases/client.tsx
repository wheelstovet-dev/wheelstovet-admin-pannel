'use client';
import { useEffect, useState } from 'react';
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
import { ChevronDown } from 'lucide-react';
import { DataTable } from '@/components/ui/data-table';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/redux/store';
import { setLoading } from '@/app/redux/slices/authslice';
import { ToastAtTopRight } from '@/lib/sweetalert';
import { getAllCases } from '@/app/redux/actions/casesAction';

const UserCasesClient: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { cases, loading, error } = useSelector((state: RootState) => state.caseManagement);
  console.log(cases);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('By type');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [filteredData, setFilteredData] = useState(cases);

  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(getAllCases({ page: 1, limit: 20 }))
      .unwrap()
      .catch((err: any) => {
        ToastAtTopRight.fire({
          icon: 'error',
          title: err.message || 'Failed to fetch cases',
        });
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, [dispatch]);

  useEffect(() => {
    setFilteredData(cases);
  }, [cases]);

  const handleSearch = (searchValue: string) => {
    setSearchTerm(searchValue);
    const filtered = cases.filter(
      (item:any) =>
        item.serviceName.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.assignedEmployee.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleStatusFilterChange = (serviceName: string) => {
    setStatusFilter(serviceName);
    const filtered = serviceName ? cases.filter((item:any) => item.serviceName === serviceName) : cases;
    setFilteredData(filtered);
  };

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`View Case Details (${filteredData?.length})`}
          description="Detailed information about the Cases."
        />
        {/* <div className="flex space-x-2 w-full max-w-3xl">
          <input
            type="text"
            placeholder="Search by service name or assigned employee"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
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
        </div> */}
      </div>
      
      <Separator />
      
      {loading ? 'Loading...' : (
        <DataTable
          searchKeys={['serviceName', 'assignedEmployee']}
          columns={columns}
          data={filteredData}
          onSearch={handleSearch}
        />
      )}
    </>
  );
};

export default UserCasesClient;
