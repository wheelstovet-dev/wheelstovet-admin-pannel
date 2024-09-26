import BreadCrumb from '@/components/breadcrumb';
import { CreateSubscriptionForm } from '@/components/forms/subscription-stepper/create-subscription';
import MainLayout from '@/components/layout/main-layout';
import { ScrollArea } from '@/components/ui/scroll-area';

const breadcrumbItems = [{ title: 'Subscription', link: '/dashboard/subscription' }];
const initialData = {
    subscriptionId: 'SUB123456',
    userId: 'USR78910',
    subscriptionPlan: 'Dog Walking',
    frequency: 'Weekly',
    employeeId: 'EMP2345',
    subscriptionStartDate: new Date('2024-01-01'),  // Assuming ISO format
    subscriptionEndDate: new Date('2024-12-31'),
    morningTimeSlot: '6:00 AM - 8:00 AM',
    eveningTimeSlot: '4:00 PM - 6:00 PM',
    status: 'Approved',  
    activity: 'Active', 
  };
export default function SubscriptionForm() {
    const isEnabled = true
  return (
    <MainLayout meta={{ title: 'Subscription' }}>
         <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        < CreateSubscriptionForm initialData={initialData} isEnabled = {isEnabled}/>
      </div>
      </ScrollArea>
    </MainLayout>
  );
}