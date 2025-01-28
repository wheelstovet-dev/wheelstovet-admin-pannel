// app/dashboard/user-management/page.tsx
import BreadCrumb from '@/components/breadcrumb';
import MainLayout from '@/components/layout/main-layout';
import ProtectedRoute from '@/components/protectedRoute';
import { UserSubscriptionClient } from '@/components/tables/view-user-subscription/client';
import { ScrollArea } from '@/components/ui/scroll-area';

const breadcrumbItems = [{ title: 'View Subscription', link: '/user-management' }];

export default function SubscriptionManagementPage() {
  return (
    <ProtectedRoute>
    <MainLayout meta={{ title: 'View Subscription' }}>
          <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <UserSubscriptionClient/>
      </div>
      </ScrollArea>
    </MainLayout>
    </ProtectedRoute>
  );
}