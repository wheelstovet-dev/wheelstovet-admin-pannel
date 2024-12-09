// app/dashboard/user-management/page.tsx
// import BreadCrumb from '@/components/breadcrumb';
import MainLayout from '@/components/layout/main-layout';
import ProtectedRoute from '@/components/protectedRoute';
import { CouponsManagementClient } from '@/components/tables/coupons-management-tables/client';

// const breadcrumbItems = [
//     { title: 'Manage Routes', 
//         link: '/routes-management/'},
//     ];

export default function CouponsManagement() {
  return (
    <ProtectedRoute>
    <MainLayout meta={{ title: 'Manage Coupons' }}>
      <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">
        {/* <BreadCrumb items={breadcrumbItems} /> */}
        <CouponsManagementClient/>
      </div>
    </MainLayout>
    </ProtectedRoute>
  );
}

