'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/main-layout';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

const employeeData = [
  { serialNo: '#001', employeeName: 'John Doe', mobileNo: '+91 9898098980', emailId: 'john.doe@example.com' },
  { serialNo: '#002', employeeName: 'Jane Smith', mobileNo: '+91 9898098981', emailId: 'jane.smith@example.com' },
  { serialNo: '#003', employeeName: 'Alice Johnson', mobileNo: '+91 9898098982', emailId: 'alice.johnson@example.com' },
  { serialNo: '#004', employeeName: 'Bob Brown', mobileNo: '+91 9898098983', emailId: 'bob.brown@example.com' },
  { serialNo: '#005', employeeName: 'Charlie Davis', mobileNo: '+91 9898098984', emailId: 'charlie.davis@example.com' },
  { serialNo: '#006', employeeName: 'Eve White', mobileNo: '+91 9898098985', emailId: 'eve.white@example.com' },
];

export default function EmployeeManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('By type');
  const router = useRouter();

  const handleAddAdminClick = () => {
    router.push('/employee-form');
  };

  return (
    <MainLayout meta={{ title: 'Employee Management' }}>
      <ScrollArea className="h-full">
        <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
          <div className="flex">
            <button
              className="ml-auto bg-yellow-500 text-white px-4 py-2 rounded-lg justify-end"
              onClick={handleAddAdminClick}
            >
              + Add Admin
            </button>
          </div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Cases</h2>
            <div className="flex space-x-2 w-full max-w-3xl">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded-xl px-4 py-2 flex-1"
              />
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center text-gray-600 border border-gray-300 rounded-xl px-4 py-2">
                  {filterType} <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {['Type 1', 'Type 2', 'Type 3'].map((type) => (
                    <DropdownMenuItem key={type} onClick={() => setFilterType(type)}>
                      {type}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="overflow-x-auto rounded-xl">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg">
              <thead>
                <tr className="bg-gray-100 text-left text-gray-600">
                  <th className="px-4 py-5 border-b">Serial No</th>
                  <th className="px-4 py-5 border-b">Employee Name</th>
                  <th className="px-4 py-5 border-b">Mobile No</th>
                  <th className="px-4 py-5 border-b">Email ID</th>
                  <th className="px-4 py-5 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {employeeData
                  .filter((employee) =>
                    employee.employeeName.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((employee, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-6 border-b">{employee.serialNo}</td>
                      <td className="px-4 py-6 border-b">{employee.employeeName}</td>
                      <td className="px-4 py-6 border-b">{employee.mobileNo}</td>
                      <td className="px-4 py-6 border-b">{employee.emailId}</td>
                      <td className="px-4 py-6 border-b">
                        <button className="text-blue-500 hover:text-blue-700">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828zM12.828 7H11v1.828l4.586-4.586 1.828 1.828L12.828 7z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </ScrollArea>
    </MainLayout>
  );
}
