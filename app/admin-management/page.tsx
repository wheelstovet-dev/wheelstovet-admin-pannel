// app/dashboard/user-management/page.tsx
import BreadCrumb from '@/components/breadcrumb';
import MainLayout from '@/components/layout/main-layout';
import ProtectedRoute from '@/components/protectedRoute';
import { AdminManagementClient } from '@/components/tables/admin-management-tables/client';
import { ScrollArea } from '@/components/ui/scroll-area';

const breadcrumbItems = [{ title: 'Admin Management', link: '/dashboard/admin-management' }];

export default function SubscriptionManagementPage() {
  return (
    <ProtectedRoute>
    <MainLayout meta={{ title: 'Admin Management' }}>
      <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <AdminManagementClient />
      </div>
      </ScrollArea>
    </MainLayout>
    </ProtectedRoute>
  );
}

