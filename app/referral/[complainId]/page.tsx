// app/dashboard/user-management/page.tsx
import BreadCrumb from '@/components/breadcrumb';
import { ComplaintView } from '@/components/forms/complainView/ComplaintView';
import MainLayout from '@/components/layout/main-layout';
import ProtectedRoute from '@/components/protectedRoute';

const breadcrumbItems = [
    { title: 'Compaint', 
        link: '/complaint-management'},
    ];

export default function ComplaintViewPage() {
  return (
    <ProtectedRoute>
    <MainLayout meta={{ title: 'Complaint View' }}>
      <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <ComplaintView/>
      </div>
    </MainLayout>
    </ProtectedRoute>
  );
}