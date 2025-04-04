'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { columns } from './columns';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/redux/store';
import { setLoading } from '@/app/redux/slices/authslice';

import { ToastAtTopRight } from '@/lib/sweetalert';
import { getAllSubscriptions } from '@/app/redux/actions/subscriptionAction';
import { getUserBookedSubscriptions } from '@/app/redux/actions/userAction';

export const UserSubscriptionClient: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [loader, setLoader] = useState(true);
  const searchParams = useSearchParams();
  const userId = searchParams?.get('id') || ''; // Extract 'id' from URL

  const { bookedSubscriptions, loading } = useSelector((state: RootState) => state.user); // Accessing `bookedSubscriptions` from user slice
  console.log("Booked subscriptions:", bookedSubscriptions);

  const [data, setData] = useState(bookedSubscriptions);

  const handleSearch = (searchValue: string) => {
    const filteredData = data.filter((item: any) =>
      item.subscriptionPlan.toLowerCase().includes(searchValue.toLowerCase())
    );
    setData(filteredData);
  };

  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(getUserBookedSubscriptions(userId))
      .unwrap()
      .catch((err: any) => {
        ToastAtTopRight.fire({
          icon: 'warning',
          title: 'No booked subscriptions for this user',
        });
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, [dispatch, userId]);

  // const fetchAllSubscriptions = async () => {
  //   dispatch(setLoading(true));
  //   try {
  //     const resultAction: any = await dispatch(getAllSubscriptions({ page: 1, limit: 20 }));
      
  //     if (resultAction.type === 'subscriptions/getAll/fulfilled') {
  //       setData(resultAction?.payload?.data);
  //       console.log(resultAction);
  //       setLoader(false);
  //     } else {
  //       throw new Error(resultAction.payload?.message || 'Failed to fetch subscriptions');
  //     }
  //   } catch (error: any) {
  //     ToastAtTopRight.fire({
  //       icon: 'error',
  //       title: error.message || 'Failed to get subscriptions',
  //     });
  //   } finally {
  //     dispatch(setLoading(false));
  //   }
  // };

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
          title={`View User Subscription (${bookedSubscriptions?.length})`}
          description=""
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

      {loading ? 'Loading...' : (
              <DataTable
                searchKeys={['subscriptionPlan']}
                columns={columns}
                data={bookedSubscriptions}
                onSearch={handleSearch}
              />
            )}

      {/* {loader ? 'Loading...' :(
      <DataTable
        searchKeys={["subscriptionPlan"]}
        columns={columns}
        data={bookedSubscriptions}
        onSearch={handleSearch} 
        filters={filters}
      />
      )} */}
    </>
  );
};
