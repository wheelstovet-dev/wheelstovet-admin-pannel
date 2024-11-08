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
  const petId = searchParams.get('id'); // Get the pet ID from the URL
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
  
      if (resultAction.type === 'pets/getById/fulfilled') {
        setData([resultAction.payload.data]); // Wrap in array for single-record table display
        setLoader(false);
      }
      else if(resultAction.payload?.message === 'Request failed with status code 404'){
        ToastAtTopRight.fire({
            icon: 'warning',
            title: 'No pets found',
          }).then(() => {
            // Redirect to the previous page after showing the message
            router.push('/user-management');
          });
      }
      else {
        throw new Error(resultAction.payload?.message || 'Failed to fetch pet details');
        
      }
    } catch (error: any) {
      if (error.response && error?.response?.status === 404) {
        // Handle 404 error specifically
        ToastAtTopRight.fire({
          icon: 'warning',
          title: 'No pets found',
        });
      } else {
        // Handle other errors
        ToastAtTopRight.fire({
          icon: 'error',
          title: error.message || 'Failed to get pet details',
        });
      }
    } finally {
      dispatch(setLoading(false));
    }
  };
  
  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title="View Pet Details"
          description="Detailed information about the pet."
        />
      </div>
      <Separator />
      {loader ? 'Loading...' :
        <DataTable
          searchKeys={["Name", "Species", "Breed", "Temperament"]}
          columns={columns}
          data={data}
        />
      }
    </>
  );
};
