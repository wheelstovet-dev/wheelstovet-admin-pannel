'use client';
import { Suspense, useEffect, useState } from 'react';
import BreadCrumb from '@/components/breadcrumb';
import { CreateEmployeeForm } from '@/components/forms/employee-stepper/create-employee';
import MainLayout from '@/components/layout/main-layout';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useRouter } from 'next/navigation';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import ProtectedRoute from '@/components/protectedRoute';
import { UpdateReferralForm } from '@/components/forms/update-referral-form';
// import WithAuth from '@/hoc/WithAuth';


const breadcrumbItems = [{ title: 'Referral', link: '/referral' },
  { title: '', link: '' }];

export default function Page() {

  // const router = useRouter();
  // const [id, setId] = useState<string | null>(null);

  // useEffect(() => {
  //   // Parse the URL to get the 'id' parameter
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const empid = urlParams.get('id');
  //   setId(empid);
  // }, []);

  // console.log(id);
  // const handleAssignedCases = () => {
  //   router.push(`/assignedCases/${id}`);

  // };
  // const handleSubscription = () => {
  //   router.push(`/assignedSubscription/${id}`);
  // };


  // const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  // console.log(isAuthenticated);



  return (
    <ProtectedRoute>
      <MainLayout meta={{ title: 'Referal Update' }}>
        <ScrollArea className="h-full">
          <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
            <BreadCrumb items={breadcrumbItems} />
            <Suspense fallback={<div>Loading...</div>}>
              <UpdateReferralForm/>
            </Suspense>
            {/* Add your routing logic to switch between EmployeeManagementPage and EmployeeForm */}
          </div>
          {/* <div className="relative mb-4 gap-8 rounded-md border p-4 md:flex md:items-center md:justify-center">

            <button
              onClick={handleAssignedCases}
              className="px-4 py-2 mt-4 bg-yellow-500 text-white rounded-md"
            >
              View Assigned Cases
            </button>
            <button
              onClick={handleSubscription}
              className="px-4 py-2 mt-4 bg-orange-500 text-white rounded-md"
            >
              View Subscription
            </button>
          </div> */}
        </ScrollArea>
      </MainLayout>
      </ProtectedRoute>
  );
}
