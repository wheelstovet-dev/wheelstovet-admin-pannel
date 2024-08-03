'use client';
import BreadCrumb from '@/components/breadcrumb';
import MainLayout from '@/components/layout/main-layout';

import EmployeeForm from '@/components/forms/employee-form';

const breadcrumbItems = [{ title: 'Employee', link: '/dashboard/employee' }];

export default function Page() {
  return (
    <MainLayout meta={{ title: 'Employees' }}>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <EmployeeForm/>
        {/* Add your routing logic to switch between EmployeeManagementPage and EmployeeForm */}
      </div>
    </MainLayout>
  );
}
