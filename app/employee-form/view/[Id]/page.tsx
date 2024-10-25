'use client';
import BreadCrumb from '@/components/breadcrumb';
import CreateEmployeeForm from '@/components/forms/employee-stepper/create-employee';
import MainLayout from '@/components/layout/main-layout';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useRouter } from 'next/navigation';

const breadcrumbItems = [{ title: 'View Employee Detail', link: '/dashboard/employee' }];

export default function Page() {
  const initialData = {
    fullName: 'John Doe',
    caseId: 'C12345',
    aadharNo: '1234-5678-9012',
    totalExperience: '5 years',
    phone: '9876543210',
    alternatePhoneNumber: '9123456780',
    emailId: 'john.doe@example.com',
    role: 'Veterinary Visit',
    dateOfBirth: '1990-01-01',
    gender: 'Male',
    streetAddress: '123 Main St',
    city: 'Mumbai',
    state: 'Maharashtra',
  };

  const router = useRouter();

  const isEnabled = true
  const handleAssignedCases = () => {
    router.push(`/assignedCases/${initialData.caseId}`); 

  };
  const handleSubscription = () => {
    router.push(`/assignedSubscription/${initialData.caseId}`); 
};
  return (
    <MainLayout meta={{ title: 'View Employee Details' }}>
       <ScrollArea className="h-full">
       <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <CreateEmployeeForm />
      </div>
      <div className="relative mb-4 gap-8 rounded-md border p-4 md:flex md:items-center md:justify-center">

            <button
              onClick={handleAssignedCases}
              className="px-4 py-2 mt-4 bg-yellow-500 text-white rounded-md"
            >
              View Assigned Cases
            </button>
            <button
              onClick={handleSubscription}
              className="px-4 py-2 mt-4 bg-orange-500 text-white rounded-md"
            >
              View Subscription
            </button>
          </div>
      </ScrollArea>
    </MainLayout>
  );
}
