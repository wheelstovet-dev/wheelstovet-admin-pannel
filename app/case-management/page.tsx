// import BreadCrumb from "@/components/breadcrumb";
import BreadCrumb from "@/components/breadcrumb";
import MainLayout from "@/components/layout/main-layout";
import ProtectedRoute from "@/components/protectedRoute";
import CaseManagementClient from "@/components/tables/cases-tables/client";
import DogManagementClient from "@/components/tables/dog-walking-tables/client";
import { ScrollArea } from '@/components/ui/scroll-area';
const breadcrumbItems = [{ title: 'Case Management', link: '/dashboard/case-management' }];

export default function CaseManagementPage() {
  return (
    <ProtectedRoute>
    <MainLayout meta={{ title: 'Case Management' }}>
      <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">      
        <BreadCrumb items={breadcrumbItems} />
        <CaseManagementClient/>
        <DogManagementClient/>
        
      </div>
      </ScrollArea>
    </MainLayout>
    </ProtectedRoute>
  );
}

