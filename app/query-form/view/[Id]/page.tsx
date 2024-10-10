'use client';
import BreadCrumb from '@/components/breadcrumb';
import MainLayout from '@/components/layout/main-layout';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CreateEnquiryForm } from '@/components/forms/query-stepper/create-query';

const breadcrumbItems = [{ title: 'Employee', link: '/dashboard/employee' }];

export default function Page() {
    const initialData = {
        sserviceName: 'Dog Walking',
        preferredDate: '2024-10-10',
        preferredTime: '08:00 AM - 09:00 AM',
        email: 'rajesh.kumar@example.com',
        phoneNo: '9876543210',
        pickupAddress: '123 Green Street, Delhi',
        status: 'pending',
      }

      const isEnabled = true
  return (
    <MainLayout meta={{ title: 'Employees' }}>
       <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <CreateEnquiryForm initialData = {initialData} isEnabled = {isEnabled}/>
      </div>
      </ScrollArea>
    </MainLayout>
  );
}
