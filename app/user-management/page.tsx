'use client'; 
import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import MainLayout from '@/components/layout/main-layout';
const breadcrumbItems = [{ title: 'Cases', link: '/dashboard/cases' }];

const userData = [
  { serialNo: '#001', petName: 'Rabbies', age: 29, lastService: '01 Jan 2020' },
  { serialNo: '#002', petName: 'Distemper', age: 34, lastService: '15 Mar 2021' },
  { serialNo: '#003', petName: 'Alice', age: 25, lastService: '20 Feb 2022' },
  { serialNo: '#004', petName: 'Bob', age: 40, lastService: '30 Nov 2019' },
  { serialNo: '#005', petName: 'Charlie', age: 28, lastService: '05 Jul 2021' },
  { serialNo: '#006', petName: 'Eve', age: 32, lastService: '22 Aug 2020' },
];

export default function UserManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('By type');

  return (
    <MainLayout meta={{ title: 'User Management' }}>
      <ScrollArea className="h-full">
        <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
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
                  <th className="px-4 py-5 border-b">Pet Name</th>
                  <th className="px-4 py-5 border-b">Age</th>
                  <th className="px-4 py-5 border-b">Last Service</th>
                  <th className="px-4 py-5 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {userData
                  .filter((userItem) =>
                    userItem.petName.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((userItem, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-6 border-b">{userItem.serialNo}</td>
                      <td className="px-4 py-6 border-b">{userItem.petName}</td>
                      <td className="px-4 py-6 border-b">{userItem.age}</td>
                      <td className="px-4 py-6 border-b">{userItem.lastService}</td>
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
