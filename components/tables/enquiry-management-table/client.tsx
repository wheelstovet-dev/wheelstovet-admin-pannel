'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/redux/store';
import { getAllEnquiries } from '@/app/redux/actions/dashboardAction';
import { ToastAtTopRight } from '@/lib/sweetalert';



interface EnquiryManagementClientProps {
  initialData: any[];
  loading:boolean;
}

export const EnquiryClient: React.FC= () => {
  const dispatch = useDispatch<AppDispatch>();
  const [pageNumber, setPageNumber] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalRecords, setTotalRecords] = useState(0);
  const [data, setData] = useState<any>([]);

  const { Enquiries, loading, error } = useSelector(
    (state: RootState) => state.dashboard
  );
  //==============ENQUIRY=================
  // const getEnqueries =async()=>{
  //   await dispatch(getAllEnquiries({ page: 1, limit: 5 }))
    
  //   .unwrap()
  //   .catch((err: any) => {
  //     const errorMessage = err.message || 'Failed to fetch Enquiries';
  //     ToastAtTopRight.fire({
  //       icon: 'error',
  //       title: typeof errorMessage === 'string' ? errorMessage : 'An error occurred',
  //     });
  //   });
       
  // }
  const router = useRouter();

  const getEnqueries = async () => {
      // dispatch(setLoading(true));
      try {
        const resultAction: any = await dispatch(getAllEnquiries({ page: pageNumber, limit: limit }));
        console.log("resultAction.type",resultAction.type);
        if (resultAction.type === 'enquiries/getAll/fulfilled') {
          setData(resultAction?.payload?.data);
          //setFilteredUsers(resultAction?.payload?.data);
          //setLoader(false);
          setTotalRecords(resultAction?.payload?.pagination?.total);
        } else {
          throw new Error(resultAction.payload?.message.message || 'Failed to fetch enqquiry');
        }
      } catch (error: any) {
        ToastAtTopRight.fire({
          icon: 'error',
          title: error.message || 'Failed to get enquiry',
        });
      } finally {
        //dispatch(setLoading(false));
      }
    };
  
    useEffect(() => {
      getEnqueries();
    }, [pageNumber, limit]);
  
    const handlePageChange = (newPage: number) => {
      if (newPage > 0 && newPage <= Math.ceil(totalRecords / limit)) {
        setPageNumber(newPage);
      }
    };


  // useEffect(() => {
  //   setData(initialData || []);
  // }, [initialData]);

  
   // Handle row click and navigate with ID
   const handleRowClick = (data:any) => {
    // console.log(data._id);
    if (data?._id) {
      router.push(`/query-form/view/${data._id}`); // Redirect to details page with ID
    }
  };

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Enquiry (${totalRecords})`}
          description=""
        />
        {/* <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/order`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button> */}
      </div>
      <Separator />
      {loading ? 'Loading...' : (
      <DataTable
        // searchKey=" assignedEmployee"
        columns={columns}
        data={data}
        onRowClick={handleRowClick}
        stopPropagationSelectors={[".enquiryStatus-update",".enquiry-action",".select-button"]} // pass the class name of the column element to prevent event bubbling
      />
      )}

      {/* Pagination */}
      <div className="flex justify-end space-x-2 py-2">
        <div className="space-x-2">
          <Button variant="outline" size="sm" onClick={() => handlePageChange(pageNumber - 1)} disabled={pageNumber === 1}>
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