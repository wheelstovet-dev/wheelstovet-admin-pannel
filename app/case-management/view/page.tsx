'use client';
import React from 'react';
import MainLayout from '@/components/layout/main-layout';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useRouter } from 'next/navigation';

const View = () => {
  const router = useRouter();
  const caseId = '12'; // Replace this with the dynamic caseId as needed

  // Simulated data, replace with actual data fetching logic
  const caseData = {
    petName: 'Rabies',
    startDate: '01 Dec 2023',
    endDate: '01 Dec 2023',
    assignEmployee: 'Jim Carloss',
    currentStatus: 'Dog Walking',
  };

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
                <input type="text" value={caseId} readOnly className="w-full border border-gray-300 p-2 rounded" />
              </div>
              <div>
                <label className="block mb-2">Pet Name</label>
                <input type="text" value={caseData.petName} readOnly className="w-full border border-gray-300 p-2 rounded" />
              </div>
              <div>
                <label className="block mb-2">Start Date</label>
                <input type="text" value={caseData.startDate} readOnly className="w-full border border-gray-300 p-2 rounded" />
              </div>
              <div>
                <label className="block mb-2">End Date</label>
                <input type="text" value={caseData.endDate} readOnly className="w-full border border-gray-300 p-2 rounded" />
              </div>
              <div>
                <label className="block mb-2">Assign Employee</label>
                <input type="text" value={caseData.assignEmployee} readOnly className="w-full border border-gray-300 p-2 rounded" />
              </div>
              <div>
                <label className="block mb-2">Current Status</label>
                <input type="text" value={caseData.currentStatus} readOnly className="w-full border border-gray-300 p-2 rounded" />
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </MainLayout>
  );
};

export default View;
