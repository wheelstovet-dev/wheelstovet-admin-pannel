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

export const SubscriptionHistoryClient: React.FC = () => {
  const [data, setData] = useState<any>([]);
  const dispatch = useDispatch<AppDispatch>();
  const [loader, setLoader] = useState(true);
  const searchParams = useSearchParams();
  const id = searchParams.get('id'); // Get the id from the URL

  const { walkRecords, loading, error } = useSelector((state: RootState) => state.subscription);

  useEffect(() => {
    if (id) {
      // Fetch the case data by ID
      dispatch(getWalkRecords({ id, page: 1, limit: 20 }));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (walkRecords?.length > 0) {
      setData(walkRecords);
    } else if (walkRecords?.length === 0) {
      // Show toast if no walk records are found
      ToastAtTopRight.fire({
        icon: 'warning',
        title: 'No walk records found for this subscription',
      });
    } else if (error) {
      ToastAtTopRight.fire({
        icon: 'error',
        title: 'Failed to get walk records',
      });
    }
  }, [walkRecords, loading, error]);

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

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Manage Subscription History [walk records] (${data?.length})`}
          description="Manage Subscription (Client side table functionalities.)"
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
    </>
  );
};
