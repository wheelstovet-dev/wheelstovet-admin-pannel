'use client';
import { Suspense } from 'react';
import BreadCrumb from '@/components/breadcrumb';
import { CreateEmployeeForm } from '@/components/forms/employee-stepper/create-employee';
import MainLayout from '@/components/layout/main-layout';
import { ScrollArea } from '@/components/ui/scroll-area';


const breadcrumbItems = [{ title: 'Employee', link: '/dashboard/employee' }];

export default function Page() {
  return (
    <MainLayout meta={{ title: 'Employees' }}>
       <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <Suspense fallback={<div>Loading...</div>}>
        <CreateEmployeeForm />
        </Suspense>
        {/* Add your routing logic to switch between EmployeeManagementPage and EmployeeForm */}
      </div>
      </ScrollArea>
    </MainLayout>
  );
}
