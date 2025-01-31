// import BreadCrumb from "@/components/breadcrumb";
import BreadCrumb from "@/components/breadcrumb";
import MainLayout from "@/components/layout/main-layout";
import ProtectedRoute from "@/components/protectedRoute";
import { ComplaintManagementClient } from "@/components/tables/complaint-management-tables/client";
import ComplaintManagementUserPage from "@/components/tables/user-complaint-management-tables/client";
import { ScrollArea } from '@/components/ui/scroll-area';
const breadcrumbItems = [{ title: 'Complaint Management', link: '/dashboard/complaint-management' }];


export default function SubscriptionManagementPage() {
  return (
    <ProtectedRoute>
    <MainLayout meta={{ title: 'Complaint Management' }}>
      <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems}/>      
      <ComplaintManagementUserPage />
      </div>
      </ScrollArea>
    </MainLayout>
    </ProtectedRoute>
  );
}

