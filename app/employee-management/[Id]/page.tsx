'use client';
import { Suspense } from 'react';
// import BreadCrumb from "@/components/breadcrumb";
import MainLayout from "@/components/layout/main-layout";
import { EmployeeManagementClient } from "@/components/tables/employee-management-table/client";

import { ScrollArea } from '@/components/ui/scroll-area';
import ProtectedRoute from '@/components/protectedRoute';

const breadcrumbItems = [{ title: 'Employee Management', link: '/dashboard/employees' }];

export default function EmployeeManagementPage() {
  return (
    <ProtectedRoute>
    <MainLayout meta={{ title: 'Employee Management' }}>
      <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">      
      <Suspense fallback={<div>Loading...</div>}>
        <EmployeeManagementClient/>
        </Suspense>
      </div>
      </ScrollArea>
    </MainLayout>
    </ProtectedRoute>
  );
}

