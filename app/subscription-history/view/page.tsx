'use client';
import React, { Suspense } from 'react';
import BreadCrumb from '@/components/breadcrumb';
import MainLayout from '@/components/layout/main-layout';
import { SubscriptionHistoryClient } from '@/components/tables/subscription-history-tables/client';
import { ScrollArea } from '@/components/ui/scroll-area';
import ProtectedRoute from '@/components/protectedRoute';

const breadcrumbItems = [{ title: 'Subscription Management', link: '/subscription-management' },
  { title: 'Walk History Details ', link: '' }
];

export default function SubscriptionHistory() {
  return (
    <ProtectedRoute>
    <MainLayout meta={{ title: 'Subscription History' }}>
            <ScrollArea className="h-full">

      <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <Suspense fallback={<div>Loading...</div>}>
        < SubscriptionHistoryClient />
        </Suspense>
      </div>
      </ScrollArea>

    </MainLayout>
    </ProtectedRoute>
  );
}