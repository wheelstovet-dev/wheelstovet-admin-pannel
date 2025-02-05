'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
// import { columns } from './columns';

import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/redux/store';
import { setLoading } from '@/app/redux/slices/authslice';

import { ToastAtTopRight } from '@/lib/sweetalert';
import { getAllSubscriptions } from '@/app/redux/actions/subscriptionAction';
import { columns } from './columns';

export const SubscriptionManagementClient: React.FC = () => {
  const router = useRouter();
  const [data, setData] = useState<any>([]);
  const dispatch = useDispatch<AppDispatch>();
  const [loader, setLoader] = useState(true);
  const [pageNumber,setPageNumber]=useState(1);
  const [limit,setLimit]=useState(10);
  const [totalRecords,setTotalRecords]=useState(0);

  const handleSearch = (searchValue: string) => {
    const filteredData = data.filter((item: any) =>
      item.subscriptionPlan.toLowerCase().includes(searchValue.toLowerCase())
    );
    setData(filteredData);
  };

  useEffect(() => {
    fetchAllSubscriptions();
  }, [pageNumber,limit]);

  const fetchAllSubscriptions = async () => {
    dispatch(setLoading(true));
    try {
      const resultAction: any = await dispatch(getAllSubscriptions({ page: pageNumber, limit: limit }));
      
      if (resultAction.type === 'subscriptions/getAll/fulfilled') {
        setData(resultAction?.payload?.data);
        console.log(resultAction);
        setTotalRecords(resultAction?.payload?.pagination?.total)
        setLoader(false);
      } else {
        throw new Error(resultAction.payload?.message || 'Failed to fetch subscriptions');
      }
    } catch (error: any) {
      ToastAtTopRight.fire({
        icon: 'error',
        title: error.message || 'Failed to get subscriptions',
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  const filters = [
    {
      label: 'Subscription Status',
      subOptions: ['Active', 'In Active', 'All Subscription'],
    },
    {
      label: 'Subscription Plan',
      subOptions: ['Daily', 'Weekly', 'Monthly'],
    },
  ];

  const handlePageChange=(newPage:number)=>{
    if(newPage>0 && newPage<=Math.ceil(totalRecords/limit)){
      setPageNumber(newPage);
    }
  }

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Manage Subscription (${totalRecords})`}
          description="Manage Subscription (Client side table functionalities.)"
        />
        {/* Uncomment if you want to add a button for adding subscriptions */}
        {/* <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/subscription`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button> */}
      </div>
      <Separator />
      {loader ? 'Loading...' :
      <DataTable
        searchKeys={["subscriptionPlan"]}
        columns={columns}
        data={data}
        onSearch={handleSearch} 
        filters={filters}
      />
      }
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
