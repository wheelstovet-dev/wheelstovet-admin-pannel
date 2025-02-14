'use client';
import React, { Suspense } from 'react';
import BreadCrumb from '@/components/breadcrumb';
import { SubscriptionVieForm } from '@/components/forms/subscription-stepper/create-subscription';


import MainLayout from '@/components/layout/main-layout';
import ProtectedRoute from '@/components/protectedRoute';
import { ViewSubscriptionForm } from '@/components/forms/subscription-stepper/view-subscription';
import { ScrollArea } from '@/components/ui/scroll-area';

const breadcrumbItems = [{ title: 'Subscription', link: '/dashboard/subscription' }];

export default function SubscriptionForm() {
  return (
    <ProtectedRoute>
    <MainLayout meta={{ title: 'Subscription' }}>
    <ScrollArea className="h-full">
    <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <Suspense fallback={<div>Loading...</div>}>
        {/* < SubscriptionVieForm mode='view' /> */}
        <ViewSubscriptionForm mode='view'/>
        </Suspense>
      </div>
    </ScrollArea>
    </MainLayout>
    </ProtectedRoute>
  );
}