// import BreadCrumb from "@/components/breadcrumb";
import MainLayout from "@/components/layout/main-layout";
import { EmployeeManagementClient } from "@/components/tables/employee-management-table/client";

import { ScrollArea } from '@/components/ui/scroll-area';

const breadcrumbItems = [{ title: 'Employee Management', link: '/dashboard/employees' }];

export default function EmployeeManagementPage() {
  return (
    <MainLayout meta={{ title: 'Employee Management' }}>
      <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">      
       
        <EmployeeManagementClient/>
      </div>
      </ScrollArea>
    </MainLayout>
  );
}

