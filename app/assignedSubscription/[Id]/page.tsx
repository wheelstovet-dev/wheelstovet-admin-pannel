import BreadCrumb from '@/components/breadcrumb';
import MainLayout from '@/components/layout/main-layout';
import ProtectedRoute from '@/components/protectedRoute';
import { AssignedSubscriptionClient } from '@/components/tables/assigned-subscription-table/client';
import { ScrollArea } from '@/components/ui/scroll-area';

const breadcrumbItems = [{ title: 'Subscription', link: '/user/subscription' }];
export default function page() {
  return (
    <ProtectedRoute>
    <MainLayout meta={{ title: 'Subscription Histrory' }}>
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <AssignedSubscriptionClient/>
      </div>
    </ScrollArea>
    </MainLayout>
    </ProtectedRoute>
  );
}