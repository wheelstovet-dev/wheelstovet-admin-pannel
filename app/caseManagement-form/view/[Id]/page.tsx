import BreadCrumb from '@/components/breadcrumb';
import { CreateCaseForm } from '@/components/forms/case-stepper/createCase';
import { CreateSubscriptionForm } from '@/components/forms/subscription-stepper/create-subscription';
import MainLayout from '@/components/layout/main-layout';
import CaseFinanceClient from '@/components/tables/case-financial-table/client';
import { ScrollArea } from '@/components/ui/scroll-area';

const breadcrumbItems = [{ title: 'Case',  link: '/dashboard/case' }];
const initialData = {
    caseId: 'CASE12345',
    userId: 'USER67890',
    petName: 'Buddy',
    bookingAt: 'Central Park',
    startDate: new Date('2024-10-01'), // October 1, 2024
    timeSlot: 'Morning',
    assignedEmployee: 'EMP001',
    currentStatus: 'active', // Options: 'active' | 'inactive'
    paymentMethod: 'credit', // Options: 'credit' | 'debit' | 'paypal'
    paymentStatus: 'paid', // Options: 'paid' | 'unpaid'
    document:'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-4.0.3'
};
export default function CaseForm() {
    const isEnabled = true
  return (
    <MainLayout meta={{ title: 'Subscription' }}>
    <ScrollArea className="h-full">

      <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <CreateCaseForm initialData={initialData} isEnabled = {isEnabled}/>
         <CaseFinanceClient/>
      </div>
      </ScrollArea>
    </MainLayout>
  );
}