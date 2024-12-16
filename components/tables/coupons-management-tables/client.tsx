'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronDown, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { CouponManagement, CouponManagementData } from '@/constants/coupons-management-data';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/redux/store';
import { getAllCoupons } from '@/app/redux/actions/couponAction';
import { ToastAtTopRight } from '@/lib/sweetalert';

export const CouponsManagementClient: React.FC = () => {
  const router = useRouter();
  const initialData: CouponManagement[] = CouponManagementData;
  // const [data, setData] = useState<CouponManagement[]>(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('By type');

// -------
  const dispatch = useDispatch<AppDispatch>();

  const { Coupons, loading, error } = useSelector(
    (state: RootState) => state.coupons
  );

  const [data, setData] = useState(Coupons);

  useEffect(() => {
    dispatch(getAllCoupons({ page: 1, limit: 20 }))
      .unwrap()
      .catch((err: any) => {
        const errorMessage = err.message || 'Failed to fetch coupons';
        ToastAtTopRight.fire({
          icon: 'error',
          title: typeof errorMessage === 'string' ? errorMessage : 'An error occurred',
        });
      });
  }, [dispatch]);

  useEffect(() => {
    setData(Coupons);
  }, [Coupons]);

//  ----------

  const handleSearch = (searchValue: string) => {
    const filteredData = initialData.filter(item =>
      item.code.toLowerCase().includes(searchValue.toLowerCase())
    );
    setData(filteredData);
  };

  const handleSort = (sortBy: string, sortOrder: 'asc' | 'desc') => {
    const sortedData = [...data].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.code.localeCompare(b.code);
      } else {
        return b.code.localeCompare(a.code);
      }
    });
    setData(sortedData);
  };

  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm]);

  return (
    <>
      <div className="flex items-end justify-end">
        <Button
          className="text-xs md:text-sm bg-yellow-500 hover:bg-yellow-400"
          onClick={() => router.push(`/coupons?mode=create`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Coupons</h2>
        <div className="flex space-x-2 w-full max-w-3xl">
          <input
            type="text"
            placeholder="Search by Coupon Code"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-xl px-4 py-2 flex-1"
          />
          {/* <DropdownMenu>
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
          </DropdownMenu> */}
        </div>
      </div>
      {loading ? 'Loading...' : (
      <DataTable
        searchKeys={["code"]}
        columns={columns}
        data={data}
        onSearch={handleSearch}
      />
      )}
    </>
  );
};
