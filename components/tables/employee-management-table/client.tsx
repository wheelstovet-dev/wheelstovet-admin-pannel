'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { EmployeeManagement, EmployeeManagementData } from '@/constants/employee-management-data';

import { Plus, UserCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { FaUserCheck } from 'react-icons/fa';
import { setLoading } from '@/app/redux/slices/authslice';
import { useDispatch } from 'react-redux';
import { ToastAtTopRight } from '@/lib/sweetalert';
import { getAllEmployees } from '@/app/redux/actions/employeeAction';
import { AppDispatch } from '@/app/redux/store';


export const EmployeeManagementClient: React.FC = () => {
  const router = useRouter();
  // const initialData: EmployeeManagement[] = EmployeeManagementData;
  const [data, setData] = useState<any>([]);
  const dispatch = useDispatch<AppDispatch>();
  const [loader, setLoader] = useState(true);


  const handleSearch = (searchValue: string) => {
    // const filteredData = initialData.filter(item =>
    //   item.status.toLowerCase().includes(searchValue.toLowerCase())
    // );
    // setData(filteredData);
  };

  useEffect(() => {
    getallemployee();
  }, [])
  
  const getallemployee = async () =>{
    dispatch(setLoading(true));
    try {
      const resultAction:any = await dispatch(getAllEmployees({ page: 1, limit: 10 }));
      // console.log(resultAction);

      if (resultAction.type==='employees/getAll/fulfilled') {
        setData(resultAction?.payload?.data)
        setLoader(false);
        // console.log(resultAction);
      } else {
        throw new Error(resultAction.payload.message || 'Failed to fetch employees');
      }
    } catch (error: any) {
      ToastAtTopRight.fire({
        icon: 'error',
        title: error.message || 'Failed to get employees',
      });
    } finally {
      dispatch(setLoading(false));
    }
  }

  const handleSort = (sortBy: string, sortOrder: 'asc' | 'desc') => {

    const sortedData = [...data].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.fullName.localeCompare(b.fullName);
      } else {
        return b.fullName.localeCompare(a.fullName);
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
          title={`Employee (${data.length})`}
          description="Manage Employee"
        />
        <Button
          className="text-xs md:text-sm bg-yellow-500 hover:bg-yellow-600"
          onClick={() => router.push(`/employee-form`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
        
      </div>
      <div className="flex justify-end ">
      <Button
          className="text-xs md:text-sm  bg-yellow-500 hover:bg-yellow-600"
          onClick={() => router.push(`/`)}
        >
          <FaUserCheck className="mr-2 h-4 w-4" /> Assign
        </Button>
        </div>
      <Separator />
      {loader ? 'Loading...' :
      <DataTable
        searchKeys={["fullName"]}
        columns={columns}
        data={data}
        onSearch={handleSearch} 
        filters={filters}
      />
}
    </>
  );
};