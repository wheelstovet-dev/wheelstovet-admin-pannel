// app/dashboard/user-management/page.tsx
import BreadCrumb from '@/components/breadcrumb';
import MainLayout from '@/components/layout/main-layout';
import { AdminManagementClient } from '@/components/tables/admin-management-tables/client';

const breadcrumbItems = [{ title: 'Admin Management', link: '/dashboard/admin-management' }];

export default function SubscriptionManagementPage() {
  return (
    <MainLayout meta={{ title: 'Admin Management' }}>
      <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <AdminManagementClient />
      </div>
    </MainLayout>
  );
}

