'use client';
import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, MoreHorizontal, Eye, Trash, Edit3, ChevronRight } from 'lucide-react';
import MainLayout from '@/components/layout/main-layout';
import { CalendarDateRangePicker } from '@/components/date-range-picker';
import { useRouter } from 'next/navigation';

const casesData = [
  { caseId: '12', petName: 'Rabies', startDate: '01 Dec 2023', endDate: '01 Dec 2023', assignEmployee: 'Jim Carloss', currentStatus: 'Dog Walking', time: '10:00 AM' },
  { caseId: '13', petName: 'Distemper', startDate: '27 Jun 2024', endDate: '27 Jun 2024', assignEmployee: 'Jim Brown', currentStatus: 'Salon', time: '11:00 AM' },
  { caseId: '14', petName: 'Calicivirus', startDate: '16 Sep 2024', endDate: '16 Sep 2024', assignEmployee: 'Helen Brooks', currentStatus: 'Salon', time: '02:00 PM' },
  { caseId: '15', petName: 'Bordetella', startDate: '11 Dec 2024', endDate: '11 Dec 2024', assignEmployee: 'Helen Brooks', currentStatus: 'Veterinary', time: '03:00 PM' },
  { caseId: '16', petName: 'Rabies', startDate: '01 Dec 2023', endDate: '01 Dec 2023', assignEmployee: 'Jim Carloss', currentStatus: 'Dog Walking', time: '10:00 AM' },
  { caseId: '17', petName: 'Distemper', startDate: '27 Jun 2024', endDate: '27 Jun 2024', assignEmployee: 'Jim Brown', currentStatus: 'Pet Taxi', time: '11:00 AM' },
  { caseId: '18', petName: 'Calicivirus', startDate: '16 Sep 2024', endDate: '16 Sep 2024', assignEmployee: 'Helen Brooks', currentStatus: 'Salon', time: '02:00 PM' },
];

export default function CaseManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('By type');
  const [sortStatus, setSortStatus] = useState('');
  const router = useRouter();

  const filteredCases = casesData
    .filter((caseItem) =>
      caseItem.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.assignEmployee.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((caseItem) => {
      if (sortStatus === '') return true;
      return caseItem.currentStatus === sortStatus;
    });

  const handleView = (index: number) => {
    router.push(`/case-management/view`);
  };

  const handleEdit = (index: number) => {
    router.push(`/case-management/update`);
  };

  const handleDelete = (index: number) => {
    // Implement delete logic here
  };

  return (
    <MainLayout meta={{ title: 'Case Management' }}>
      <ScrollArea className="h-full">
        <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Cases</h2>
            <div className="flex space-x-2 w-full max-w-3xl">
              <input
                type="text"
                placeholder="Search by pet name or assigned employee"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded-xl px-4 py-2 flex-1"
              />
              <div className="hidden items-center space-x-2 md:flex">
                <CalendarDateRangePicker />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center text-gray-600 border border-gray-300 rounded-xl px-4 py-2">
                  {filterType} <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger className="flex items-center text-gray-600 px-4 py-2">
                      Sort by status 
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem onClick={() => setSortStatus('Dog Walking')}>
                        Dog Walking
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortStatus('Salon')}>
                        Salon
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortStatus('Veterinary')}>
                        Veterinary
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortStatus('Pet Taxi')}>
                        Pet Taxi
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortStatus('Pet Rescue')}>
                        Pet Rescue
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => { setFilterType('By type'); setSortStatus(''); }}>
                        Reset
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="overflow-x-auto rounded-xl">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg">
              <thead>
                <tr className="bg-yellow-500 text-gray-600 text-center">
                  <th className="px-4 py-2 border-r-2 border-b">Case ID</th>
                  <th className="px-4 py-2 border-r-2 border-b">Pet Name</th>
                  <th className="px-4 py-2 border-r-2 border-b">Start Date</th>
                  <th className="px-4 py-2 border-r-2 border-b">End Date</th>
                  <th className="px-4 py-2 border-r-2 border-b">Assign Employee</th>
                  <th className="px-4 py-2 border-r-2 border-b">Current Status</th>
                  <th className="px-4 py-2 border-r-2 border-b">Time</th>
                  <th className="px-4 py-2 border-r-2 border-b">Action</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {filteredCases.map((caseItem, index) => (
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
                    <td className="px-4 py-6 border-b">{caseItem.time}</td>
                    <td className="px-4 py-6 border-b">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="text-gray-600 hover:text-gray-800">
                          <MoreHorizontal className="h-5 w-5" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => handleView(index)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(index)}>
                            <Edit3 className="h-4 w-4 mr-2" />
                            Assign Employee
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(index)}>
                            <Trash className="h-4 w-4 mr-2 text-red-500" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
