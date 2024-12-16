// app/dashboard/user-management/page.tsx
import BreadCrumb from '@/components/breadcrumb';
import { ScrollArea } from '@/components/ui/scroll-area';
import MainLayout from '@/components/layout/main-layout';
import ProtectedRoute from '@/components/protectedRoute';
import { Suspense } from 'react';
import { CreateCoupons } from '@/components/forms/coupons-stepper/create-coupons';

const breadcrumbItems = [
    { title: 'Manage Routes', 
        link: '/routes-management/'},
    ];

export default function CouponsManagement() {
  return (
    <ProtectedRoute>
    <MainLayout meta={{ title: 'Manage Coupons' }}>
       <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <Suspense fallback={<div>Loading...</div>}>
        <CreateCoupons/>
        </Suspense>
      </div>
      </ScrollArea>
    </MainLayout>
    </ProtectedRoute>
  );
}

