// app/dashboard/user-management/page.tsx
import BreadCrumb from '@/components/breadcrumb';
import NotificationSettingForm from '@/components/forms/settingsForm/NotificationForms';
import MainLayout from '@/components/layout/main-layout';
import ProtectedRoute from '@/components/protectedRoute';
import { ScrollArea } from '@/components/ui/scroll-area';
const breadcrumbItems = [
    { title: 'Settings', 
        link: '/settings-management/notifications'},
        { title: 'Notifications Settings', 
            link: '/settings-management/notifications' }
    ];

export default function NotificationSettings() {
  return (
    <ProtectedRoute>
    <MainLayout meta={{ title: 'Notifications Settings' }}>
          <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <NotificationSettingForm/>
      </div>
      </ScrollArea>
    </MainLayout>
    </ProtectedRoute>
  );
}