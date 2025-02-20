'use client';
import BreadCrumb from '@/components/breadcrumb';
import MainLayout from '@/components/layout/main-layout';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CreateEnquiryForm } from '@/components/forms/query-stepper/create-query';
import ProtectedRoute from '@/components/protectedRoute';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/redux/store';
import { useEffect, useState } from 'react';
import { getEnquiryId } from '@/app/redux/actions/dashboardAction';
import { ToastAtTopRight } from '@/lib/sweetalert';
import { useParams } from 'next/navigation';

const breadcrumbItems = [{ title: 'Employee', link: '/dashboard/employee' }];

export default function Page() {
    // const initialData = {
    //     sserviceName: 'Dog Walking',
    //     preferredDate: '2024-10-10',
    //     preferredTime: '08:00 AM - 09:00 AM',
    //     email: 'rajesh.kumar@example.com',
    //     phoneNo: '9876543210',
    //     pickupAddress: '123 Green Street, Delhi',
    //     status: 'pending',
    //   }

    //   const isEnabled = true

      //  -------Api integration--------
  const dispatch = useDispatch<AppDispatch>();
  const { selectedEnquiry, loading, error } = useSelector(
    (state: RootState) => state.dashboard
  );

  const params = useParams(); // Use useParams to get the route parameters
  const id:any = params.Id; // Access the ID directly
  console.log(params);

 const getData =async()=>{
   await dispatch(getEnquiryId(id))
    
      
 }
  useEffect(() => {
    if(id){
    getData();
    }
  }, [dispatch,id]);

  return (
    <ProtectedRoute>
    <MainLayout meta={{ title: 'Enquiry' }}>
       <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <CreateEnquiryForm initialData = {selectedEnquiry} isEnabled = {true}/>
      </div>
      </ScrollArea>
    </MainLayout>
    </ProtectedRoute>
  );
}
