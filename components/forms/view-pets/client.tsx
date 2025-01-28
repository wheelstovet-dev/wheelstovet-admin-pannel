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
import { getPetById } from '@/app/redux/actions/userAction';

export const ViewPetClient: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const [loader, setLoader] = useState(true);
  const searchParams = useSearchParams();
  const petId = searchParams?.get('id') || ''; // Fallback for missing 'id'
  const router = useRouter();

  useEffect(() => {
    if (petId) {
      fetchPetDetails(petId);
    }
  }, [petId]);

  const fetchPetDetails = async (id: string) => {
    dispatch(setLoading(true));
    try {
      const resultAction: any = await dispatch(getPetById(id));
      setLoader(false);

      if (resultAction?.type === 'pets/getById/fulfilled') {
        setData(Array.isArray(resultAction.payload.data) ? resultAction.payload.data : [resultAction.payload.data]);

        ToastAtTopRight.fire({
          icon: 'success',
          title: resultAction.payload.message,
        });
      } else if (resultAction?.payload?.message === 'Request failed with status code 404') {
        ToastAtTopRight.fire({
          icon: 'warning',
          title: 'No pets found',
        });
      }
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        ToastAtTopRight.fire({
          icon: 'warning',
          title: 'No pets found',
        });
      } else {
        ToastAtTopRight.fire({
          icon: 'error',
          title: 'Failed to get pet details',
        });
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading title="View Pet Details" description="Detailed information about the pet." />
      </div>
      <Separator />
      {loader ? (
        <div>Loading...</div>
      ) : data.length ? (
        <DataTable
          searchKeys={['Name', 'Species', 'Breed', 'Temperament']}
          columns={columns}
          data={data}
        />
      ) : (
        <div>No Pet Found for this User</div>
      )}
    </>
  );
};
