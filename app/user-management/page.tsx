// import BreadCrumb from "@/components/breadcrumb";
import MainLayout from "@/components/layout/main-layout";
import ProtectedRoute from "@/components/protectedRoute";
import { UserClient } from "@/components/tables/user-tables/client";
import { ScrollArea } from '@/components/ui/scroll-area';

const breadcrumbItems = [{ title: 'Users', link: '/dashboard/users' }];

export default function CaseManagementPage() {
  return (
    <ProtectedRoute>
    <MainLayout meta={{ title: 'User Management' }}>
      <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">      
        <UserClient/>
      </div>
      </ScrollArea>
    </MainLayout>
    </ProtectedRoute>
  );
}

