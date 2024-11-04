'use client';
import React from 'react';
import BreadCrumb from '@/components/breadcrumb';
import MainLayout from '@/components/layout/main-layout';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ViewUser } from '@/components/forms/view-user/view-user';




const breadcrumbItems = [{ title: 'View', link: '/user-management/page.tsx' }];

export default function View() {
  return (
    <MainLayout meta={{ title: 'View User' }}>
      <ScrollArea className="h-full">
        <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
          <BreadCrumb items={breadcrumbItems} />
          <ViewUser />
        </div>
      </ScrollArea>
    </MainLayout>
  );
}
