'use client';
import { useState, ChangeEvent } from 'react';
import MainLayout from '@/components/layout/main-layout';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function DogWalkingPage() {
  const [charges, setCharges] = useState({
    dailyPlan1: 300,
    weeklyPlan1: 300,
    monthlyPlan1: 300,
    dailyPlan2: 300,
    weeklyPlan2: 300,
    monthlyPlan2: 300
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>, field: string) => {
    const value = event.target.value ? Number(event.target.value) : '';
    setCharges(prevCharges => ({
      ...prevCharges,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Charges saved:', charges);
    // Add your save logic here
  };

  const handleCancel = () => {
    console.log('Cancelled');
    // Add your cancel logic here
  };

  return (
    <MainLayout meta={{ title: 'Service Management' }}>
      <ScrollArea className="h-full">
        <div className="container mx-auto p-8">
          <h1 className="text-3xl font-bold mb-8">Service Management</h1>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-8">Dog Walking</h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold">1 time dog walking per day</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="flex items-center">
                    <label className="block font-bold text-gray-700 w-full">Daily plan charges</label>
                    <input
                      type="number"
                      value={charges.dailyPlan1}
                      onChange={(e) => handleInputChange(e, 'dailyPlan1')}
                      className="mt-1 block w-20 border rounded p-2"
                    />
                    <span className="ml-2 font-bold">INR</span>
                  </div>
                  <div className="flex items-center">
                    <label className="block font-bold text-gray-700 w-full">Weekly plan charges</label>
                    <input
                      type="number"
                      value={charges.weeklyPlan1}
                      onChange={(e) => handleInputChange(e, 'weeklyPlan1')}
                      className="mt-1 block w-20 border rounded p-2"
                    />
                    <span className="ml-2 font-bold">INR</span>
                  </div>
                  <div className="flex items-center">
                    <label className="block font-bold text-gray-700 w-full">Monthly plan charges</label>
                    <input
                      type="number"
                      value={charges.monthlyPlan1}
                      onChange={(e) => handleInputChange(e, 'monthlyPlan1')}
                      className="mt-1 block w-20 border rounded p-2"
                    />
                    <span className="ml-2 font-bold">INR</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold">2 time dog walking per day</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="flex items-center">
                    <label className="block font-bold text-gray-700 w-full">Daily plan charges</label>
                    <input
                      type="number"
                      value={charges.dailyPlan2}
                      onChange={(e) => handleInputChange(e, 'dailyPlan2')}
                      className="mt-1 block w-20 border rounded p-2"
                    />
                    <span className="ml-2 font-bold">INR</span>
                  </div>
                  <div className="flex items-center">
                    <label className="block font-bold text-gray-700 w-full">Weekly plan charges</label>
                    <input
                      type="number"
                      value={charges.weeklyPlan2}
                      onChange={(e) => handleInputChange(e, 'weeklyPlan2')}
                      className="mt-1 block w-20 border rounded p-2"
                    />
                    <span className="ml-2 font-bold">INR</span>
                  </div>
                  <div className="flex items-center">
                    <label className="block font-bold text-gray-700 w-full">Monthly plan charges</label>
                    <input
                      type="number"
                      value={charges.monthlyPlan2}
                      onChange={(e) => handleInputChange(e, 'monthlyPlan2')}
                      className="mt-1 block w-20 border rounded p-2"
                    />
                    <span className="ml-2 font-bold">INR</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-start mt-8">
              <button
                className="bg-gray-200 text-gray-800 py-2 px-4 rounded mr-4"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="bg-yellow-500 text-white py-2 px-4 rounded"
                onClick={handleSubmit}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </ScrollArea>
    </MainLayout>
  );
}
