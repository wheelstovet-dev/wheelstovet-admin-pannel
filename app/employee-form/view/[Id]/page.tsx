'use client';
import BreadCrumb from '@/components/breadcrumb';
import MainLayout from '@/components/layout/main-layout';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CreateEmployeeForm } from '@/components/forms/employee-stepper/create-employee';

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

  const isEnabled = true
  return (
    <MainLayout meta={{ title: 'View Employee Details' }}>
       <ScrollArea className="h-full">
       <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <CreateEmployeeForm initialData = {initialData} isEnabled = {isEnabled}/>
      </div>
      </ScrollArea>
    </MainLayout>
  );
}


  
  