// app/dashboard/user-management/page.tsx
import BreadCrumb from '@/components/breadcrumb';
import { SettingForm } from '@/components/forms/settingsForm/SettingsForms';
import MainLayout from '@/components/layout/main-layout';
import ProtectedRoute from '@/components/protectedRoute';
import { ScrollArea } from '@/components/ui/scroll-area';


const breadcrumbItems = [
    { title: 'Settings', 
        link: '/settings-management/payment'},
        { title: 'Payments Settings', 
            link: '/settings-management/payment' }
    ];

export default function PaymentSettings() {
  return (
    <ProtectedRoute>
    <MainLayout meta={{ title: 'Payments Settings' }}>
      <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <SettingForm/>
      </div>
      </ScrollArea>
    </MainLayout>
    </ProtectedRoute>
  );
}