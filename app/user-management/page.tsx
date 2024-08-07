'use client';

import { useRouter } from 'next/navigation';
import { useState, ChangeEvent } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronDown, Eye, Trash, Edit3 } from 'lucide-react';
import MainLayout from '@/components/layout/main-layout';

interface UserData {
  serialNo: string;
  parentName: string;
  petName: string;
  city: string;
  mobileNo: string;
  email: string;
}

const initialUserData: UserData[] = [
  { serialNo: '123457', parentName: 'Distemper', petName: 'Petname2', city: 'Baroda', mobileNo: '+91 9898098981', email: 'xyz@gmail.com' },
  { serialNo: '123458', parentName: 'Calicivirus', petName: 'Petname3', city: 'Surat', mobileNo: '+91 9898098982', email: 'bac@gmail.com' },
  { serialNo: '123456', parentName: 'Rabies', petName: 'Petname1', city: 'Ahmedabad', mobileNo: '+91 9898098980', email: 'abc@gmail.com' },
  { serialNo: '123459', parentName: 'Bordetella', petName: 'Petname4', city: 'Mumbai', mobileNo: '+91 9898098983', email: 'yzx@gmail.com' },
  { serialNo: '123460', parentName: 'Rabies', petName: 'Petname5', city: 'Noida', mobileNo: '+91 9898098984', email: 'opa@gmail.com' },
  { serialNo: '123461', parentName: 'Distemper', petName: 'Petname6', city: 'Ludhiana', mobileNo: '+91 9898098985', email: 'abc@gmail.com' },
  { serialNo: '123462', parentName: 'Calicivirus', petName: 'Petname7', city: 'Ahmedabad', mobileNo: '+91 9898098986', email: 'xuz@gmail.com' },
];

export default function UserManagementPage() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterType, setFilterType] = useState<string>('By type');
  const [userData, setUserData] = useState<UserData[]>(initialUserData);
  const router = useRouter();

  const handleView = (index: number) => {
    const selectedUser = userData[index];
    router.push(`/view-user/${selectedUser.serialNo}`);
  };

  const handleDelete = (index: number) => {
    const newUserData = [...userData];
    newUserData.splice(index, 1);
    setUserData(newUserData);
  };

  const handleEdit = (index: number) => {
    const selectedUser = userData[index];
    router.push(`/edit-user/${selectedUser.serialNo}`);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredUserData = userData.filter((userItem) =>
    userItem.petName.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                onChange={handleSearchChange}
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
                  <th className="px-4 py-5 border-b">Parent Name</th>
                  <th className="px-4 py-5 border-b">Pet Name</th>
                  <th className="px-4 py-5 border-b">City</th>
                  <th className="px-4 py-5 border-b">Mobile No</th>
                  <th className="px-4 py-5 border-b">Email ID</th>
                  <th className="px-14 py-5 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUserData.map((userItem, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-6 border-b">{userItem.serialNo}</td>
                    <td className="px-4 py-6 border-b">{userItem.parentName}</td>
                    <td className="px-4 py-6 border-b">{userItem.petName}</td>
                    <td className="px-4 py-6 border-b">{userItem.city}</td>
                    <td className="px-4 py-6 border-b">{userItem.mobileNo}</td>
                    <td className="px-4 py-6 border-b">{userItem.email}</td>
                    <td className="px-4 py-6 border-b">
                      <div className="flex space-x-2">
                        <button className="bg-gray-100 p-2 rounded-md hover:bg-gray-200" onClick={() => handleView(index)}>
                          <Eye className="h-5 w-5 text-black" />
                        </button>
                        <button
                          className="bg-gray-100 p-2 rounded-md hover:bg-gray-200" onClick={() => handleDelete(index)}
                        >
                          <Trash className="h-5 w-5 text-black" />
                        </button>
                        <button
                          className="bg-gray-100 p-2 rounded-md hover:bg-gray-200"
                          onClick={() => handleEdit(index)}
                        >
                          <Edit3 className="h-5 w-5 text-black" />
                        </button>
                      </div>
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
