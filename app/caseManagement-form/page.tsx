import BreadCrumb from '@/components/breadcrumb';
import { CreateCaseForm } from '@/components/forms/case-stepper/createCase';
import { CreateSubscriptionForm } from '@/components/forms/subscription-stepper/create-subscription';
import MainLayout from '@/components/layout/main-layout';
import { ScrollArea } from '@/components/ui/scroll-area';

const breadcrumbItems = [{ title: 'Case',  link: '/dashboard/case' }];

export default function CaseForm() {
  return (
    <MainLayout meta={{ title: 'Subscription' }}>
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        < CreateCaseForm initialData={null} />
      </div>
      </ScrollArea>
    </MainLayout>
  );
}