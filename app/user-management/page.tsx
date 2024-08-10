'use client';

import { useRouter } from 'next/navigation';
import { useState, ChangeEvent } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronDown, Eye, Trash, Edit3, MoreHorizontal, Phone, Mail, MapPin } from 'lucide-react';
import MainLayout from '@/components/layout/main-layout';

interface UserData {
  serialNo: string;
  parentFirstName: string;
  parentLastName: string;
  petName: string;
  city: string;
  mobileNo: string;
  email: string;
  address: string;
  associatedEmployee: string;
  status: 'Available' | 'Unavailable';
}

const initialUserData: UserData[] = [
  { serialNo: '123457', parentFirstName: 'Distemper', parentLastName: 'Smith', petName: 'Petname2', city: 'Baroda', mobileNo: '+91 9898098981', email: 'xyz@gmail.com', address: '123 Main St', associatedEmployee: 'Employee1', status: 'Available' },
  { serialNo: '123458', parentFirstName: 'Calicivirus', parentLastName: 'Johnson', petName: 'Petname3', city: 'Surat', mobileNo: '+91 9898098982', email: 'bac@gmail.com', address: '456 Elm St', associatedEmployee: 'Employee2', status: 'Unavailable' },
  { serialNo: '123456', parentFirstName: 'Rabies', parentLastName: 'Brown', petName: 'Petname1', city: 'Ahmedabad', mobileNo: '+91 9898098980', email: 'abc@gmail.com', address: '789 Pine St', associatedEmployee: 'Employee3', status: 'Available' },
  { serialNo: '123459', parentFirstName: 'Bordetella', parentLastName: 'Davis', petName: 'Petname4', city: 'Mumbai', mobileNo: '+91 9898098983', email: 'yzx@gmail.com', address: '101 Maple St', associatedEmployee: 'Employee4', status: 'Unavailable' },
  { serialNo: '123460', parentFirstName: 'Rabies', parentLastName: 'White', petName: 'Petname5', city: 'Noida', mobileNo: '+91 9898098984', email: 'opa@gmail.com', address: '202 Oak St', associatedEmployee: 'Employee5', status: 'Available' },
  { serialNo: '123461', parentFirstName: 'Distemper', parentLastName: 'Williams', petName: 'Petname6', city: 'Ludhiana', mobileNo: '+91 9898098985', email: 'abc@gmail.com', address: '303 Birch St', associatedEmployee: 'Employee6', status: 'Unavailable' },
  { serialNo: '123462', parentFirstName: 'Calicivirus', parentLastName: 'Taylor', petName: 'Petname7', city: 'Ahmedabad', mobileNo: '+91 9898098986', email: 'xuz@gmail.com', address: '404 Cedar St', associatedEmployee: 'Employee7', status: 'Available' },
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
    userItem.parentFirstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    userItem.parentLastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    userItem.mobileNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout meta={{ title: 'User Management' }}>
      <ScrollArea className="h-full">
        <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Users</h2>
            <div className="flex space-x-2 w-full max-w-3xl">
              <input
                type="text"
                placeholder="Search by parent name or phone number"
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
                <tr className="bg-yellow-500 text-center text-gray-600">
                  <th className="px-4 py-2 border-b border-r-2">S.No</th>
                  <th className="px-4 py-2 border-b border-r-2">Parent Name</th>
                  <th className="px-4 py-2 border-b border-r-2">Pet Name</th>
                  <th className="px-14 py-2 border-b border-r-2">Contact</th>
                  <th className="px-4 py-2 border-b border-r-2">Address</th>
                  <th className="px-4 py-2 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUserData.map((userItem, index) => (
                  <tr key={index} className="hover:bg-gray-50 text-center">
                    <td className="px-4 py-6 border-b">{userItem.serialNo}</td>
                    <td className="px-4 py-6 border-b">{`${userItem.parentFirstName} ${userItem.parentLastName}`}</td>
                    <td className="px-4 py-6 border-b">{userItem.petName}</td>
                    <td className="px-4 py-6 border-b">
                      <div className="flex flex-col items-center">
                        <span className="flex items-center">
                          <Phone className="h-3 w-3 mr-1 text-green-600" />
                          {userItem.mobileNo}
                        </span>
                        <span className="text-gray-500 text-sm flex items-center">
                          <Mail className="h-3 w-3 mr-1 text-blue-600" />
                          {userItem.email}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-6 border-b">
                      <div className="flex items-center justify-center">
                        <MapPin className="h-4 w-4 mr-2 text-red-600" />
                        {userItem.address}
                      </div>
                    </td>
                    <td className="px-4 py-6 border-b">
                      <div className="flex justify-center space-x-1">
                        <DropdownMenu>
                          <DropdownMenuTrigger className="flex items-center text-gray-600 p-1">
                            <MoreHorizontal className="h-4 w-4" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => handleView(index)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(index)}>
                              <Edit3 className="h-4 w-4 mr-2" />
                              Update
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDelete(index)}>
                              <Trash className="h-4 w-4 mr-2 text-red-500" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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
