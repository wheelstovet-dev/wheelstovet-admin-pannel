'use client';
import React from 'react';
import MainLayout from '@/components/layout/main-layout';
import { ScrollArea } from '@/components/ui/scroll-area';

const Edit = () => {
  // Simulated data, replace with actual data fetching logic
  const employeeData = {
    serialNo: '001',
    employeeName: 'John Doe',
    gender: 'Male',
    roleType: 'Dog Walking',
    address: '123 Main St, City, Country',
    contact: '+91 9898098980',
    email: 'john.doe@example.com',
    status: 'Available',
  };

  const roleTypeOptions = ['Dog Walking', 'Salon', 'Veterinary', 'Pet Taxi'];
  const statusOptions = ['Available', 'Unavailable'];

  return (
    <MainLayout meta={{ title: 'Employee Management' }}>
      <ScrollArea className="h-full">
        <div className="p-8 space-y-8">
          <div className="bg-white border p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-1">Employee Detail</h2>
            <p className="text-gray-600 mb-6">Details of the selected employee.</p>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block mb-2">Serial No</label>
                <input type="text" value={employeeData.serialNo} readOnly className="w-full border border-gray-300 p-2 rounded" />
              </div>
              <div>
                <label className="block mb-2">Employee Name</label>
                <input type="text" value={employeeData.employeeName} className="w-full border border-gray-300 p-2 rounded" />
              </div>
              <div>
                <label className="block mb-2">Gender</label>
                <input type="text" value={employeeData.gender} className="w-full border border-gray-300 p-2 rounded" />
              </div>
              <div>
                <label className="block mb-2">Role Type</label>
                <select value={employeeData.roleType} className="w-full border border-gray-300 p-2 rounded">
                  {roleTypeOptions.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-2">Address</label>
                <input type="text" value={employeeData.address} className="w-full border border-gray-300 p-2 rounded" />
              </div>
              <div>
                <label className="block mb-2">Contact</label>
                <input type="text" value={employeeData.contact} className="w-full border border-gray-300 p-2 rounded" />
              </div>
              <div>
                <label className="block mb-2">Email ID</label>
                <input type="text" value={employeeData.email} className="w-full border border-gray-300 p-2 rounded" />
              </div>
              <div>
                <label className="block mb-2">Status</label>
                <select value={employeeData.status} className="w-full border border-gray-300 p-2 rounded">
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-start space-x-4 mt-6">
              <button className="px-4 py-2 bg-gray-300 text-black rounded">Cancel</button>
              <button className="px-4 py-2 bg-yellow-500 text-white rounded">Save Changes</button>
            </div>
          </div>
        </div>
      </ScrollArea>
    </MainLayout>
  );
};

export default Edit;
