'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';

import { AdminManagement, AdminManagementData } from '@/constants/admin-management-data';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/redux/store';
import { setLoading } from '@/app/redux/slices/authslice';
import { getAllAdmin } from '@/app/redux/actions/adminAction';
import { ToastAtTopRight } from '@/lib/sweetalert';


export const AdminManagementClient: React.FC = () => {
  const router = useRouter();
  // const initialData: AdminManagement[] = AdminManagementData;
  const [data, setData] = useState<any>([]);
  const dispatch = useDispatch<AppDispatch>();
  const [loader, setLoader] = useState(true);

  const handleSearch = (searchValue: string) => {
    // const filteredData = initialData.filter(item =>
    //   item.fullName.toLowerCase().includes(searchValue.toLowerCase())
    // );
    // setData(filteredData);
  };

  useEffect(() => {
    getalladmin();
  }, [])

  const getalladmin = async () => {
    dispatch(setLoading(true));
    try {
      const resultAction: any = await dispatch(getAllAdmin({ page: 1, limit: 20 })); // Dispatch the getAllAdmin action
      // console.log(resultAction); 
  
      if (resultAction.type==='admin/getAll/fulfilled') {
        
        setData(resultAction?.payload?.data)
        setLoader(false);
        // console.log(resultAction.payload.data); 
        
      } else {
        throw new Error(resultAction.payload?.message || 'Failed to fetch admins');
      }
    } catch (error: any) {
      ToastAtTopRight.fire({
        icon: 'error',
        title: error.message || 'Failed to get admins',
      });
    } finally {
      dispatch(setLoading(false));
    }
  };
  

  // const handleSort = (sortBy: string, sortOrder: 'asc' | 'desc') => {
  //   // Example: Sorting by first name
  //   const sortedData = [...data].sort((a, b) => {
  //     if (sortOrder === 'asc') {
  //       return a.fullName.localeCompare(b.fullName);
  //     } else {
  //       return b.firstName.localeCompare(a.firstName);
  //     }
  //   });
  //   setData(sortedData);
  // };
//   const filters = [
//     {
//       label: 'Role ',
//       subOptions: ['Manager', 'Support Staff','Technician','Customer Service'],
//     }
  
//   ];
  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Admin (${data.length})`}
          description=""
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/admin`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      {loader ? 'Loading...' :
      <DataTable
        // searchKeys="fullName"
        columns={columns}
        data={data}
        onSearch={handleSearch} 
        // filters={filters}
        // onSort={handleSort} 
      />
}
    </>
  );
};
