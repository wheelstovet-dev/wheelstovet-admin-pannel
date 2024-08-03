'use client'; 
import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import MainLayout from '@/components/layout/main-layout';
const breadcrumbItems = [{ title: 'Cases', link: '/dashboard/cases' }];

const casesData = [
  { caseId: '#123456', petName: 'Rabies', startDate: '01 Dec 2023', endDate: '01 Dec 2023', assignEmployee: 'Jim Carloss', currentStatus: 'Dog Walking' },
  { caseId: '#123457', petName: 'Distemper', startDate: '27 Jun 2024', endDate: '27 Jun 2024', assignEmployee: 'Jim Brown', currentStatus: 'Salon' },
  { caseId: '#123458', petName: 'Calicivirus', startDate: '16 Sep 2024', endDate: '16 Sep 2024', assignEmployee: 'Helen Brooks', currentStatus: 'Salon' },
  { caseId: '#123459', petName: 'Bordetella', startDate: '11 Dec 2024', endDate: '11 Dec 2024', assignEmployee: 'Helen Brooks', currentStatus: 'Veterinary' },
  { caseId: '#123460', petName: 'Rabies', startDate: '01 Dec 2023', endDate: '01 Dec 2023', assignEmployee: 'Jim Carloss', currentStatus: 'Dog Walking' },
  { caseId: '#123461', petName: 'Distemper', startDate: '27 Jun 2024', endDate: '27 Jun 2024', assignEmployee: 'Jim Brown', currentStatus: 'Pet Taxi' },
  { caseId: '#123462', petName: 'Calicivirus', startDate: '16 Sep 2024', endDate: '16 Sep 2024', assignEmployee: 'Helen Brooks', currentStatus: 'Salon' },
];

export default function CaseManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('By type');

  return (
    <MainLayout meta={{ title: 'Case Management' }}>
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
                  <th className="px-4 py-5 border-b">Case ID</th>
                  <th className="px-4 py-5 border-b">Pet Name</th>
                  <th className="px-4 py-5 border-b">Start Date</th>
                  <th className="px-4 py-5 border-b">End Date</th>
                  <th className="px-4 py-5 border-b">Assign Employee</th>
                  <th className="px-4 py-5 border-b">Current Status</th>
                  <th className="px-4 py-5 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {casesData
                  .filter((caseItem) =>
                    caseItem.petName.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((caseItem, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-6 border-b">{caseItem.caseId}</td>
                      <td className="px-4 py-6 border-b">{caseItem.petName}</td>
                      <td className="px-4 py-6 border-b">{caseItem.startDate}</td>
                      <td className="px-4 py-6 border-b">{caseItem.endDate}</td>
                      <td className="px-4 py-6 border-b">
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-md border border-yellow-300">
                          {caseItem.assignEmployee}
                        </span>
                      </td>
                      <td className="px-4 py-6 border-b">
                        <span className={`px-2 py-1 rounded-md border ${
                          caseItem.currentStatus === 'Dog Walking'
                            ? 'bg-pink-100 text-pink-800 border-pink-300'
                            : caseItem.currentStatus === 'Salon'
                            ? 'bg-green-100 text-green-800 border-green-300'
                            : caseItem.currentStatus === 'Veterinary'
                            ? 'bg-orange-100 text-orange-800 border-orange-300'
                            : 'bg-blue-100 text-blue-800 border-blue-300'
                        }`}>
                          {caseItem.currentStatus}
                        </span>
                      </td>
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
