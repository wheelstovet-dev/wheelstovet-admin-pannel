'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/main-layout';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronDown, Eye, Trash, Edit3, MoreHorizontal, ToggleLeft, Phone, Mail, MapPin } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent
} from '@/components/ui/dropdown-menu';

const employeeData = [
  { serialNo: '001', firstName: 'John', lastName: 'Doe', gender: 'Male', roleType: 'Dog Walking', address: '123 Main St, City, Country', mobileNo: '+91 9898098980', emailId: 'john.doe@example.com', status: 'Available' },
  { serialNo: '002', firstName: 'Jane', lastName: 'Smith', gender: 'Female', roleType: 'Salon Visit', address: '456 Elm St, City, Country', mobileNo: '+91 9898098981', emailId: 'jane.smith@example.com', status: 'Unavailable' },
  { serialNo: '003', firstName: 'Alice', lastName: 'Johnson', gender: 'Female', roleType: 'Veterinary Visit', address: '789 Pine St, City, Country', mobileNo: '+91 9898098982', emailId: 'alice.johnson@example.com', status: 'Available' },
  { serialNo: '004', firstName: 'Bob', lastName: 'Brown', gender: 'Male', roleType: 'Pet Taxi', address: '101 Maple St, City, Country', mobileNo: '+91 9898098983', emailId: 'bob.brown@example.com', status: 'Unavailable' },
  { serialNo: '005', firstName: 'Charlie', lastName: 'Davis', gender: 'Male', roleType: 'Pet Handling', address: '202 Oak St, City, Country', mobileNo: '+91 9898098984', emailId: 'charlie.davis@example.com', status: 'Available' },
  { serialNo: '006', firstName: 'Eve', lastName: 'White', gender: 'Female', roleType: 'Pet Rescue', address: '303 Birch St, City, Country', mobileNo: '+91 9898098985', emailId: 'eve.white@example.com', status: 'Unavailable' },
];

export default function EmployeeManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('By type');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [employees, setEmployees] = useState(employeeData);
  const router = useRouter();

  const handleAddAdminClick = () => {
    router.push('/employee-form');
  };

  const handleToggleStatus = (index: number) => {
    const newEmployees = [...employees];
    newEmployees[index].status = newEmployees[index].status === 'Available' ? 'Unavailable' : 'Available';
    setEmployees(newEmployees);
  };

  const handleView = (index: number) => {
    router.push("/employee-management/view")
    console.log(`Viewing employee: ${employees[index].firstName} ${employees[index].lastName}`);
  };

  const handleEdit = (index: number) => {
    router.push("/employee-management/update")
    console.log(`Editing employee: ${employees[index].firstName} ${employees[index].lastName}`);
  };

  const handleDelete = (index: number) => {
    const newEmployees = [...employees];
    newEmployees.splice(index, 1);
    setEmployees(newEmployees);
  };

  const filteredEmployees = employees
    .filter((employee) =>
      `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.mobileNo.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((employee) => {
      if (filterStatus && filterRole) return employee.status === filterStatus && employee.roleType === filterRole;
      if (filterStatus) return employee.status === filterStatus;
      if (filterRole) return employee.roleType === filterRole;
      return true;
    });

  return (
    <MainLayout meta={{ title: 'Employee Management' }}>
      <ScrollArea className="h-full">
        <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
          <div className="flex">
            <button
              className="ml-auto bg-yellow-500 text-white px-4 py-2 rounded-lg justify-end"
              onClick={handleAddAdminClick}
            >
              + Add New
            </button>
          </div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Employee</h2>
            <div className="flex space-x-2 w-full max-w-3xl">
              <input
                type="text"
                placeholder="Search by name or phone number"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded-xl px-4 py-2 flex-1"
              />
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center text-gray-600 border border-gray-300 rounded-xl px-4 py-2">
                  {filterType} <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Sort by status</DropdownMenuSubTrigger>
                    <DropdownMenuSubContent className="w-48">
                      <DropdownMenuItem onClick={() => setFilterStatus('Available')}>Available</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setFilterStatus('Unavailable')}>Unavailable</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => { setFilterType('By type'); setFilterStatus(''); }}>Reset</DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Sort by role</DropdownMenuSubTrigger>
                    <DropdownMenuSubContent className="w-48">
                      <DropdownMenuItem onClick={() => setFilterRole('Dog Walking')}>Dog Walking</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setFilterRole('Pet Taxi')}>Pet Taxi</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setFilterRole('Pet Rescue')}>Pet Rescue</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setFilterRole('Salon Visit')}>Salon Visit</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setFilterRole('Veterinary Visit')}>Veterinary Visit</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setFilterRole('Pet Handling')}>Pet Handling</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => { setFilterType('By type'); setFilterRole(''); }}>Reset</DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="overflow-x-auto rounded-xl">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg">
              <thead>
                <tr className="bg-yellow-500 text-gray-600">
                  <th className="px-4 py-2 border-b border-r-2 text-center w-20">S.No</th>
                  <th className="px-4 py-2 border-b border-r-2 text-center w-32"> Name</th>
                  <th className="px-4 py-2 border-b border-r-2 text-center w-24">Gender</th>
                  <th className="px-4 py-2 border-b border-r-2 text-center w-32">Role Type</th>
                  <th className="px-4 py-2 border-b border-r-2 text-center w-48">Address</th>
                  <th className="px-4 py-2 border-b border-r-2 text-center w-48">Contact</th>
                  <th className="px-4 py-2 border-b border-r-2 text-center w-24">Status</th>
                  <th className="px-4 py-2 border-b border-r-2 text-center w-24">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-6 border-b text-center">{employee.serialNo}</td>
                    <td className="px-1 py-6 border-b text-center">{employee.firstName} {employee.lastName}</td>
                    <td className="px-4 py-6 border-b text-center">{employee.gender}</td>
                    <td className="px-4 py-6 border-b text-center">{employee.roleType}</td>
                    <td className="px-4 py-6 border-b text-center">
                      <div className="flex items-center justify-center">
                        <MapPin className="h-7 w-7 mr-1 text-red-600" />
                        {employee.address}
                      </div>
                    </td>
                    <td className="px-4 py-6 border-b text-center">
                      <div className="flex flex-col items-center">
                        <span className="flex items-center">
                          <Phone className="h-3 w-3 mr-1 text-green-600 " />
                          {employee.mobileNo}
                        </span>
                        <span className="text-gray-500 text-sm flex items-center">
                          <Mail className="h-3 w-3 mr-1 text-blue-600" />
                          {employee.emailId}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-6 border-b text-center">
                      <span className={`px-2 py-1 rounded-lg ${employee.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {employee.status}
                      </span>
                    </td>
                    <td className="px-4 py-6 border-b text-center">
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
                            <DropdownMenuItem onClick={() => handleToggleStatus(index)}>
                              <ToggleLeft className="h-4 w-4 mr-2" />
                              Status
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
