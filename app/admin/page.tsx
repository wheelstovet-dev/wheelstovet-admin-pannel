import { Suspense } from 'react';
import BreadCrumb from '@/components/breadcrumb';
import { AdminForm } from '@/components/forms/admin-stepper/create-admin';
// import { ComplaintForm } from '@/components/forms/complaint-stepper/create-complaint';
import MainLayout from '@/components/layout/main-layout';
import { ScrollArea } from '@/components/ui/scroll-area';
import ProtectedRoute from '@/components/protectedRoute';
// import { ComplaintManagementData } from '@/constants/complaint-management-data';

const breadcrumbItems = [{ title: 'Employee', link: '/dashboard/employee' }];
export default function page() {
  // Example structure of user options

  return (
    <ProtectedRoute>
    <MainLayout meta={{ title: 'Create Admin' }}>

    <ScrollArea className="h-full">
      <div className="flex-1 min-h-screen space-y-4 p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <Suspense fallback={<div>Loading...</div>}>
        <AdminForm mode='create'  />
        </Suspense>
      </div>
    </ScrollArea>
    </MainLayout>
    </ProtectedRoute>
  );
}