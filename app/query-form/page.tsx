'use client';
import BreadCrumb from '@/components/breadcrumb';
import MainLayout from '@/components/layout/main-layout';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CreateEnquiryForm } from '@/components/forms/query-stepper/create-query';

const breadcrumbItems = [{ title: 'Employee', link: '/dashboard/employee' }];

export default function Page() {
  return (
    <MainLayout meta={{ title: 'Employees' }}>
       <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <CreateEnquiryForm initialData = {null}/>
      </div>
      </ScrollArea>
    </MainLayout>
  );
}
