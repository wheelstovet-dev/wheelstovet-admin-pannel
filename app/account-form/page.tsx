'use client';

import BreadCrumb from '@/components/breadcrumb';
import MainLayout from '@/components/layout/main-layout';
import { ScrollArea } from '@/components/ui/scroll-area';
import AccountForm from '@/components/forms/account-form'; 
import ProtectedRoute from '@/components/protectedRoute';

const breadcrumbItems = [{ title: 'Account', link: '/dashboard/account' }];

const AccountFormPage: React.FC = () => {
  return (
    <ProtectedRoute>
    <MainLayout meta={{ title: 'Account' }}>
      <ScrollArea className="h-full">
        <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
          <BreadCrumb items={breadcrumbItems} />
          <AccountForm/>
        </div>
      </ScrollArea>
    </MainLayout>
    </ProtectedRoute>
  );
};

export default AccountFormPage;
