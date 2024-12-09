// app/dashboard/user-management/page.tsx
import BreadCrumb from '@/components/breadcrumb';
import MainLayout from '@/components/layout/main-layout';
import ProtectedRoute from '@/components/protectedRoute';
import { SubscriptionManagementClient } from '@/components/tables/subscription-management-tables/client';
import { ScrollArea } from '@/components/ui/scroll-area';

const breadcrumbItems = [{ title: 'Subscription Management', link: '/dashboard/subscription-management' }];

export default function SubscriptionManagementPage() {
  return (
    <ProtectedRoute>
    <MainLayout meta={{ title: 'Subscription Management' }}>
          <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <SubscriptionManagementClient  />
      </div>
      </ScrollArea>
    </MainLayout>
    </ProtectedRoute>
  );
}