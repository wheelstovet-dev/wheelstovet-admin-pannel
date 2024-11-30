'use client';

import { useEffect, useState } from 'react';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { useRouter, useSearchParams } from 'next/navigation';
import { columns } from './columns';
import { AppDispatch } from '@/app/redux/store';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/app/redux/slices/authslice';
import { ToastAtTopRight } from '@/lib/sweetalert';
import { getWalkRecords } from '@/app/redux/actions/subscriptionAction';

export const SubscriptionHistoryClient: React.FC = () => {
  const [data, setData] = useState<any>([]);
  const dispatch = useDispatch<AppDispatch>();
  const [loader, setLoader] = useState(true);
  const searchParams = useSearchParams();
  const id = searchParams.get('id'); // Get the id from the URL

  const handleSearch = (searchValue: string) => {
    const filteredData = data.filter((item: any) =>
      item.subscriptionPlan.toLowerCase().includes(searchValue.toLowerCase())
    );
    setData(filteredData);
  };

  useEffect(() => {
    if (id) {
      fetchWalkRecords(id);
    }
  }, [id]);

  const fetchWalkRecords = async (id: string) => {
    dispatch(setLoading(true));
    try {
      const resultAction: any = await dispatch(getWalkRecords({ id, page: 1, limit: 20 }));
      
      if (resultAction.type === 'subscriptions/getWalkRecords/fulfilled') {
        setData(resultAction?.payload?.data);
        setLoader(false);
      } else {
        throw new Error(resultAction.payload?.message || 'Failed to fetch walk records');
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

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Manage Subscription History [walk records] (${data?.length})`}
          description="Manage Subscription (Client side table functionalities.)"
        />
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
    </>
  );
};
