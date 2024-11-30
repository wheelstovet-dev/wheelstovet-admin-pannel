'use client';
// import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
// import { Plus } from 'lucide-react';
// import { useRouter } from 'next/navigation';
import { columns } from './columns';
// import { UserManagement, UserManagementData } from '@/constants/user-management-data';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/redux/store';
import { setLoading } from '@/app/redux/slices/authslice';
import { getAllUsers } from '@/app/redux/actions/userAction';
import { ToastAtTopRight } from '@/lib/sweetalert';

// interface ProductsClientProps {
//   data: User[];
// }
export const UserClient: React.FC = () => {
  // const router = useRouter();

  const [data, setData] = useState<any>([]);
  const dispatch = useDispatch<AppDispatch>();
  const [loader, setLoader] = useState(true);


  useEffect(() => {
    getallusers();
  }, [])

  const getallusers = async () => {
    dispatch(setLoading(true));
    try {
      const resultAction: any = await dispatch(getAllUsers({ page: 1, limit: 10 })); // Dispatch the getAllAdmin action
      // console.log(resultAction); 
  
      if (resultAction.type==='users/getAll/fulfilled') {
        
        setData(resultAction?.payload?.data)
        setLoader(false);
        // console.log(resultAction.payload.data); 
        
      } else {
        throw new Error(resultAction.payload?.message.message || 'Failed to fetch users');
      }
    } catch (error: any) {
      ToastAtTopRight.fire({
        icon: 'error',
        title: error.message || 'Failed to get users',
      });
    } finally {
      dispatch(setLoading(false));
    }
  };


  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Users (${data.length})`}
          description="Manage users "
        />
        {/* <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/user`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button> */}
      </div>
      <Separator />
      {loader ? 'Loading...' :
      <DataTable searchKeys={["name"]} 
      columns={columns} 
      data={data} />
}
    </>
  );
};
