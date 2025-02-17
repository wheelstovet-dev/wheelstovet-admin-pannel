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
  // const initialData: CouponManagement[] = CouponManagementData;
  // const [data, setData] = useState<CouponManagement[]>(initialData);
  const [pageNumber,setPageNumber]=useState(1);
  const [limit,setLimit]=useState(5);
  const [totalRecords,setTotalRecords]=useState(0);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('By type');

// -------
  const dispatch = useDispatch<AppDispatch>();

  const { Coupons, loading, error } = useSelector(
    (state: RootState) => state.coupons
  );

  const [data, setData] = useState(Coupons);

  const getAllCouponsData = async () => {
    // dispatch(setLoading(true)); // Assuming you have a loading state setter
  
    try {
      const resultAction: any = await dispatch(getAllCoupons({ page: pageNumber, limit: limit }));
  
      if (resultAction.type === 'coupons/getAll/fulfilled') {
        setData(resultAction?.payload?.data); // Update state with fetched data
        setTotalRecords(resultAction?.payload?.pagination?.total);
      } else {
        throw new Error(resultAction.payload?.message?.message || 'Failed to fetch coupons');
      }
    } catch (error: any) {
      ToastAtTopRight.fire({
        icon: 'error',
        title: error?.message?.fields?.message || 'Failed to fetch coupons',
      });
    } finally {
      // dispatch(setLoading(false));
    }
  };
  
  useEffect(() => {
    getAllCouponsData();
  }, [pageNumber, limit]); // Runs when pageNumber or limit changes
  

  useEffect(() => {
    setData(Coupons);
    
  }, [Coupons]);

  const handlePageChange=(newPage:number)=>{
    if(newPage>0 && newPage<=Math.ceil(totalRecords/limit)){
      setPageNumber(newPage);
    }
  }
//  ----------

  const handleSearch = (searchValue: string) => {
    const filteredData = data.filter(item =>
      item.CouponCode.toLowerCase().includes(searchValue.toLowerCase())
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
        <h2 className="text-2xl font-bold">Coupons {`(${totalRecords})`}</h2>
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
        searchKeys={["CouponCode"]}
        columns={columns}
        data={data}
        onSearch={handleSearch}
      />
      )}
      <div className="flex justify-end space-x-2 py-2">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(pageNumber - 1)}
            disabled={pageNumber === 1}
          >
            Previous
          </Button>
          <span className="text-sm text-gray-600">
            Page {pageNumber} of {Math.ceil(totalRecords / limit)}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(pageNumber + 1)}
            disabled={pageNumber >= Math.ceil(totalRecords / limit)}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
};
