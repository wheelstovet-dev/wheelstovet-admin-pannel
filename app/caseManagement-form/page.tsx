import BreadCrumb from '@/components/breadcrumb';
import { CreateCaseForm } from '@/components/forms/case-stepper/createCase';
import MainLayout from '@/components/layout/main-layout';
import ProtectedRoute from '@/components/protectedRoute';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Suspense } from 'react';

const breadcrumbItems = [{ title: 'Case',  link: '/dashboard/case' }];

export default function CaseForm() {
  return (
    <ProtectedRoute>
    <MainLayout meta={{ title: 'Subscription' }}>
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <Suspense fallback={<div>Loading...</div>}>
        < CreateCaseForm />
        </Suspense>
      </div>
      </ScrollArea>
    </MainLayout>
    </ProtectedRoute>
  );
}