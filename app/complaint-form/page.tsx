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
import { ComplaintForm } from '@/components/forms/complaint-stepper/create-complaint';
// import WithAuth from '@/hoc/WithAuth';


const breadcrumbItems = [{ title: 'Employee', link: '/dashboard/employee' }];

export default function Page() {

  // const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  // console.log(isAuthenticated);



  return (
    <ProtectedRoute>
      <MainLayout meta={{ title: 'Employees' }}>
        <ScrollArea className="h-full">
          <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
            <BreadCrumb items={breadcrumbItems} />
            <Suspense fallback={<div>Loading...</div>}>
              {/* <CreateEmployeeForm /> */}
              <ComplaintForm/>
            </Suspense>
            {/* Add your routing logic to switch between EmployeeManagementPage and EmployeeForm */}
          </div>
        </ScrollArea>
      </MainLayout>
      </ProtectedRoute>
  );
}
