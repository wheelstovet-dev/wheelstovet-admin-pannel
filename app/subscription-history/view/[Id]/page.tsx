import BreadCrumb from '@/components/breadcrumb';
import MainLayout from '@/components/layout/main-layout';
import { SubscriptionHistoryClient } from '@/components/tables/subscription-history-tables/client';
import { ScrollArea } from '@/components/ui/scroll-area';

const breadcrumbItems = [{ title: 'Subscription History', link: '/dashboard/subscriptionHistory' }];

export default function SubscriptionHistory() {
  return (
    <MainLayout meta={{ title: 'Subscription History' }}>
            <ScrollArea className="h-full">

      <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        < SubscriptionHistoryClient />
      </div>
      </ScrollArea>

    </MainLayout>
  );
}