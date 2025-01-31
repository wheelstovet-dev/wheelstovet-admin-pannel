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
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

// interface ProductsClientProps {
//   data: User[];
// }
export const UserClient: React.FC = () => {
  const router = useRouter();

  const [data, setData] = useState<any>([]);
  const dispatch = useDispatch<AppDispatch>();
  const [loader, setLoader] = useState(true);
  const [pageNumber,setPageNumber]=useState(1);
  const [limit,setLimit]=useState(5);
  const [totalRecords,setTotalRecords]=useState(0);


  

  const getallusers = async () => {
    dispatch(setLoading(true));
    try {
      const resultAction: any = await dispatch(getAllUsers({ page: pageNumber, limit: limit })); // Dispatch the getAllAdmin action
      // console.log(resultAction); 
  
      if (resultAction.type==='users/getAll/fulfilled') {
        
        setData(resultAction?.payload?.data)
        setLoader(false);
        setTotalRecords(resultAction?.payload?.pagination?.total)
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
  // Handle row click and navigate with ID
  const handleRowClick = (data:any) => {
    // console.log(data._id);
    if (data?._id) {
      router.push(`/view-user?id=${data._id}`) // Redirect to details page with ID
    }
  };

  useEffect(() => {
    getallusers();
  }, [pageNumber,limit])
  
  const handlePageChange=(newPage:number)=>{
    if(newPage>0 && newPage<=Math.ceil(totalRecords/limit)){
      setPageNumber(newPage);
    }
  }

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Users (${totalRecords})`}
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
      data={data} 
      onRowClick={handleRowClick}
      stopPropagationSelectors={[".user-action"]} // pass the class name of the column element to prevent event bubbling
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
