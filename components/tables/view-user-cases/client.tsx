'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { columns } from './columns';
import { Heading } from '@/components/ui/heading';
import { DataTable } from '@/components/ui/data-table';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/redux/store';
import { setLoading } from '@/app/redux/slices/authslice';
import { ToastAtTopRight } from '@/lib/sweetalert';
import { getUserBookedCases } from '@/app/redux/actions/userAction';
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

const UserCasesClient: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const searchParams = useSearchParams();
  const userId = searchParams?.get('id') || ''; // Get 'id' from URL
  const router = useRouter();

  const { bookedCases, loading } = useSelector((state: RootState) => state.user); // Accessing `bookedCases` from user slice
  const [filteredCases, setFilteredCases] = useState(bookedCases);
  const [filterType, setFilterType] = useState('By Service');

  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(getUserBookedCases(userId))
      .unwrap()
      .catch(() => {
        ToastAtTopRight.fire({
          icon: 'warning',
          title: 'No booked cases for this user',
        });
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, [dispatch, userId]);

  useEffect(() => {
    setFilteredCases(bookedCases);
  }, [bookedCases]);

  const handleFilterChange = (serviceName: string | null) => {
    setFilterType(serviceName || 'By Service');
    if (serviceName) {
      setFilteredCases(bookedCases.filter((caseItem: any) => caseItem.ServiceId?.serviceName === serviceName));
    } else {
      setFilteredCases(bookedCases);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Booked Cases (${filteredCases?.length})`} description="" />

        {/* Service Name Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center text-gray-600 border border-gray-300 rounded-xl px-4 py-2">
            {filterType} <ChevronDown className="ml-1 h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="flex items-center text-gray-600 px-4 py-2">
                Filter by Service
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                {['Salon Visit', 'Vet Visit', 'To Hostel', 'Pet Taxi'].map((service) => (
                  <DropdownMenuItem key={service} onClick={() => handleFilterChange(service)}>
                    {service}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem onClick={() => handleFilterChange(null)}>Reset</DropdownMenuItem>
              </DropdownMenuSubContent>
              
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Separator />

      {loading ? 'Loading...' : <DataTable columns={columns} data={filteredCases} />}
    </>
  );
};

export default UserCasesClient;
