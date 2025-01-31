// import BreadCrumb from "@/components/breadcrumb";
import BreadCrumb from "@/components/breadcrumb";
import MainLayout from "@/components/layout/main-layout";
import ProtectedRoute from "@/components/protectedRoute";
import { UserClient } from "@/components/tables/user-tables/client";
import { ScrollArea } from '@/components/ui/scroll-area';

const breadcrumbItems = [{ title: 'User Management', link: '/dashboard/user-management' }];

export default function CaseManagementPage() {
  return (
    <ProtectedRoute>
    <MainLayout meta={{ title: 'User Management' }}>
      <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">  
        <BreadCrumb items={breadcrumbItems} />
        <UserClient/>
      </div>
      </ScrollArea>
    </MainLayout>
    </ProtectedRoute>
  );
}

