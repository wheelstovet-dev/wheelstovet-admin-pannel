'use client';
import React from 'react';
import MainLayout from '@/components/layout/main-layout';
import { ScrollArea } from '@/components/ui/scroll-area';

const View = () => {
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
                <input type="text" value={employeeData.employeeName} readOnly className="w-full border border-gray-300 p-2 rounded" />
              </div>
              <div>
                <label className="block mb-2">Gender</label>
                <input type="text" value={employeeData.gender} readOnly className="w-full border border-gray-300 p-2 rounded" />
              </div>
              <div>
                <label className="block mb-2">Role Type</label>
                <input type="text" value={employeeData.roleType} readOnly className="w-full border border-gray-300 p-2 rounded" />
              </div>
              <div>
                <label className="block mb-2">Address</label>
                <input type="text" value={employeeData.address} readOnly className="w-full border border-gray-300 p-2 rounded" />
              </div>
              <div>
                <label className="block mb-2">Contact</label>
                <input type="text" value={employeeData.contact} readOnly className="w-full border border-gray-300 p-2 rounded" />
              </div>
              <div>
                <label className="block mb-2">Email ID</label>
                <input type="text" value={employeeData.email} readOnly className="w-full border border-gray-300 p-2 rounded" />
              </div>
              <div>
                <label className="block mb-2">Status</label>
                <input type="text" value={employeeData.status} readOnly className="w-full border border-gray-300 p-2 rounded" />
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </MainLayout>
  );
};

export default View;
