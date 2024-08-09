'use client';
import React from 'react';
import MainLayout from '@/components/layout/main-layout';
import { ScrollArea } from '@/components/ui/scroll-area';

const Edit = () => {
  // Simulated data, replace with actual data fetching logic
  const caseData = {
    caseId: '12',
    petName: 'Rabies',
    startDate: '01 Dec 2023',
    endDate: '01 Dec 2023',
    assignEmployee: 'Jim Carloss',
    currentStatus: 'Dog Walking',
  };

  const statusOptions = ['Dog Walking', 'Salon', 'Veterinary', 'Pet Taxi'];

  return (
    <MainLayout meta={{ title: 'Case Management' }}>
      <ScrollArea className="h-full">
        <div className="p-8 space-y-8">
          <div className="bg-white border p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-1">Case Detail</h2>
            <p className="text-gray-600 mb-6">Details of the selected case.</p>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block mb-2">Case ID</label>
                <input type="text" value={caseData.caseId} readOnly className="w-full border border-gray-300 p-2 rounded" />
              </div>
              <div>
                <label className="block mb-2">Pet Name</label>
                <input type="text" value={caseData.petName} className="w-full border border-gray-300 p-2 rounded" />
              </div>
              <div>
                <label className="block mb-2">Start Date</label>
                <input type="text" value={caseData.startDate} className="w-full border border-gray-300 p-2 rounded" />
              </div>
              <div>
                <label className="block mb-2">End Date</label>
                <input type="text" value={caseData.endDate} className="w-full border border-gray-300 p-2 rounded" />
              </div>
              <div>
                <label className="block mb-2">Assign Employee</label>
                <input type="text" value={caseData.assignEmployee} className="w-full border border-gray-300 p-2 rounded" />
              </div>
              <div>
                <label className="block mb-2">Current Status</label>
                <select value={caseData.currentStatus} className="w-full border border-gray-300 p-2 rounded">
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
