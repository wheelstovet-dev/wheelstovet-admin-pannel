'use client';
import BreadCrumb from '@/components/breadcrumb';
import { CreateEmployeeForm } from '@/components/forms/employee-stepper/create-employee';
import MainLayout from '@/components/layout/main-layout';
import { ScrollArea } from '@/components/ui/scroll-area';


const breadcrumbItems = [{ title: 'Edit Employee Detail', link: '/dashboard/employee' }];

export default function Page() {
  // const initialData = {
  //   fullName: 'John Doe',
  //   caseId: 'C12345',
  //   aadharNo: '1234-5678-9012',
  //   totalExperience: '5 years',
  //   phoneNumber: '9876543210',
  //   alternatePhoneNumber: '9123456780',
  //   emailId: 'john.doe@example.com',
  //   role: 'Veterinary Visit',
  //   dateOfBirth: '1990-01-01',
  //   gender: 'Male',
  //   streetAddress: '123 Main St',
  //   city: 'Mumbai',
  //   state: 'Maharashtra',
  // };


  return (
    <MainLayout meta={{ title: 'Edit Employee Details' }}>
       <ScrollArea className="h-full">
       <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <CreateEmployeeForm mode='create'  />
      </div>
      </ScrollArea>
    </MainLayout>
  );
}


  
  