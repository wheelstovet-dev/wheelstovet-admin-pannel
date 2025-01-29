'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
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
import { ChevronDown } from 'lucide-react';
import { DataTable } from '@/components/ui/data-table';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/redux/store';
import { setLoading } from '@/app/redux/slices/authslice';
import { ToastAtTopRight } from '@/lib/sweetalert';
import { getUserBookedCases } from '@/app/redux/actions/userAction';

const UserCasesClient: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const searchParams = useSearchParams();
  const userId = searchParams?.get('id') || ''; // Get 'id' from URL
  const router = useRouter();

  const { bookedCases, loading, error } = useSelector((state: RootState) => state.user); // Accessing `bookedCases` from user slice
  console.log("Booked cases",bookedCases);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('By type');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [filteredData, setFilteredData] = useState(bookedCases);

  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(getUserBookedCases(userId))
      .unwrap()
      .catch((err: any) => {
        ToastAtTopRight.fire({
          icon: 'warning',
          title: 'No booked cases for this user',
        });
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, [dispatch]);

  useEffect(() => {
    setFilteredData(bookedCases);
  }, [bookedCases]);

  const handleSearch = (searchValue: string) => {
    setSearchTerm(searchValue);
    const filtered = bookedCases.filter(
      (item: any) =>
        item.ServiceId.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.CurrentStatus.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(status);
    const filtered = status ? bookedCases.filter((item: any) => item.CurrentStatus === status) : bookedCases;
    setFilteredData(filtered);
  };

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`View Booked Cases (${filteredData?.length})`}
          description="Detailed information about the Booked Cases."
        />
      </div>
      
      <Separator />
      
      {loading ? 'Loading...' : (
        <DataTable
          searchKeys={['ServiceId', 'CurrentStatus']}
          columns={columns}
          data={filteredData}
          onSearch={handleSearch}
        />
      )}
    </>
  );
};

export default UserCasesClient;
