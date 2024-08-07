'use client';
import { useState, ChangeEvent } from 'react';
import MainLayout from '@/components/layout/main-layout';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function SalonVisitPage() {
  const [charges, setCharges] = useState({
    fixedCharges: 300,
    additionalTimeCost: 300,
    defaultTimeIncluded: 300,
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>, field: string) => {
    const value = Number(event.target.value);
    setCharges(prevCharges => ({
      ...prevCharges,
      [field]: value,
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

  const [salon, setSalon] = useState({
    name: '',
    location: '',
  });

  const handleSalonInputChange = (event: ChangeEvent<HTMLInputElement>, field: string) => {
    const value = event.target.value;
    setSalon(prevSalon => ({
      ...prevSalon,
      [field]: value,
    }));
  };

  const handleSalonSubmit = () => {
    console.log('Salon saved:', salon);
    // Add your save logic here
  };

  const handleSalonCancel = () => {
    console.log('Salon addition cancelled');
    // Add your cancel logic here
  };

  return (
    <MainLayout meta={{ title: 'Service Management' }}>
      <ScrollArea className="h-full">
        <div className="container mx-auto p-8">
          <h1 className="text-3xl font-bold mb-8">Service Management</h1>
          <div className="bg-white p-8 rounded-lg shadow-md mb-8">
            <h2 className="text-3xl font-bold mb-8">Salon Visit</h2>
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="flex items-center">
                  <label className="block font-bold text-gray-700 w-full">Fixed charges</label>
                  <input
                    type="number"
                    value={charges.fixedCharges}
                    onChange={(e) => handleInputChange(e, 'fixedCharges')}
                    className="mt-1 block w-20 border rounded p-2"
                  />
                  <span className="ml-2 font-bold">INR</span>
                </div>
                <div className="flex items-center">
                  <label className="block font-bold text-gray-700 w-full">Additional time cost during salon visit per hour</label>
                  <input
                    type="number"
                    value={charges.additionalTimeCost}
                    onChange={(e) => handleInputChange(e, 'additionalTimeCost')}
                    className="mt-1 block w-20 border rounded p-2"
                  />
                  <span className="ml-2 font-bold">INR</span>
                </div>
                <div className="flex items-center">
                  <label className="block font-bold text-gray-700 w-full">Default salon time included</label>
                  <input
                    type="number"
                    value={charges.defaultTimeIncluded}
                    onChange={(e) => handleInputChange(e, 'defaultTimeIncluded')}
                    className="mt-1 block w-20 border rounded p-2"
                  />
                  <span className="ml-2 font-bold">INR</span>
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

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-8">Add Salon</h2>
            <div className="space-y-8">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                <div className="flex flex-col">
                  <label className="block font-bold text-gray-700">Salon Name</label>
                  <input
                    type="text"
                    value={salon.name}
                    onChange={(e) => handleSalonInputChange(e, 'name')}
                    className="mt-1 block w-full border rounded p-2"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block font-bold text-gray-700">Location</label>
                  <input
                    type="text"
                    value={salon.location}
                    onChange={(e) => handleSalonInputChange(e, 'location')}
                    className="mt-1 block w-full border rounded p-2"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-start mt-8">
              <button
                className="bg-gray-200 text-gray-800 py-2 px-4 rounded mr-4"
                onClick={handleSalonCancel}
              >
                Cancel
              </button>
              <button
                className="bg-yellow-500 text-white py-2 px-4 rounded"
                onClick={handleSalonSubmit}
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
