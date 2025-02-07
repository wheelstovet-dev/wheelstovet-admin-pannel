'use client';

import { useEffect, useState } from 'react';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { useSearchParams } from 'next/navigation';
import { columns } from './columns';
import { AppDispatch, RootState } from '@/app/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/app/redux/slices/authslice';
import { ToastAtTopRight } from '@/lib/sweetalert';
import { getWalkRecords } from '@/app/redux/actions/subscriptionAction';
import { Button } from '@/components/ui/button';

export const SubscriptionHistoryClient: React.FC = () => {
  const [data, setData] = useState<any>([]);
  const dispatch = useDispatch<AppDispatch>();
  const [loader, setLoader] = useState(true);
  const searchParams = useSearchParams();
  const id = searchParams.get('id'); // Get the id from the URL
  const [pageNumber,setPageNumber]=useState(1);
  const [limit,setLimit]=useState(5);
  const [totalRecords,setTotalRecords]=useState(0);

  const { walkRecords, loading, error } = useSelector((state: RootState) => state.subscription);

  console.log('walkRecords', walkRecords);

  useEffect(() => {
      (fetchwalkRecords());
    }, [id,pageNumber,limit]);
  
    const fetchwalkRecords = async () => {
      dispatch(setLoading(true));
      try {
        if(id){
        const resultAction: any = await dispatch(getWalkRecords({id, page: pageNumber, limit: limit }));
        console.log('resultAction', resultAction.type);
        if (resultAction.type === 'subscriptions/getWalkRecords/fulfilled') {
          setData(resultAction?.payload?.data);
          ToastAtTopRight.fire({
            icon: 'success',
            title:resultAction?.payload?.message || 'Walk records fetched successfully',
          });
          //console.log(resultAction);
          setTotalRecords(resultAction?.payload?.pagination?.total)
          setLoader(false);
        } else {
          throw new Error(resultAction.payload?.message || 'Failed to fetch walk records');
        }
      }
      } catch (error: any) {
        ToastAtTopRight.fire({
          icon: 'error',
          title: error.message || 'Failed to get walk records',
        });
      } finally {
        dispatch(setLoading(false));
      }
    };


  const handleSearch = (searchValue: string) => {
    const filteredData = data.filter((item: any) =>
      item.subscriptionPlan.toLowerCase().includes(searchValue.toLowerCase())
    );
    setData(filteredData);
  };

  const handleSort = (sortBy: string, sortOrder: 'asc' | 'desc') => {
    const sortedData = [...data].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.date.localeCompare(b.date);
      } else {
        return b.date.localeCompare(a.date);
      }
    });
    setData(sortedData);
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
          title={`Subscription History [walk records] (${totalRecords})`}
          description="View Subscription (Client side table functionalities.)"
        />
      </div>
      <Separator />
      <DataTable
        searchKeys={['subscriptionPlan']}
        columns={columns}
        data={data}
        onSearch={handleSearch}
        filters={filters}
      />
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
