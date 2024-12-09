// app/dashboard/user-management/sales-report/page.tsx
import BreadCrumb from '@/components/breadcrumb';
import {  ServiceReport } from '@/components/analytics/ServiceReport';
import MainLayout from '@/components/layout/main-layout';
import { ScrollArea } from '@/components/ui/scroll-area';
import ProtectedRoute from '@/components/protectedRoute';
const breadcrumbItems = [
  { title: 'Reports and Analytics', link: '/report' },
  { title: 'Service Report', link: '/report-management/serviceReport' }
];

export default function SalesReportPage() {
  return (
    <ProtectedRoute>
    <MainLayout meta={{ title: 'Service Report' }}>
       <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <ServiceReport />
      </div>
      </ScrollArea>
    </MainLayout>
    </ProtectedRoute>
  );
}
