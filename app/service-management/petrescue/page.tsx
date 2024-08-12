'use client';
import { useState, ChangeEvent } from 'react';
import MainLayout from '@/components/layout/main-layout';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function PetRescuePage() {
  const [charges, setCharges] = useState({
    rescueCharges: 300,
    emergencyCharges: 300,
    transportationCharges: 300,
    additionalCharges: 300,
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>, field: string) => {
    const value = event.target.value === '' ? NaN : Number(event.target.value); // Changed this line
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

  return (
    <MainLayout meta={{ title: 'Service Management' }}>
      <ScrollArea className="h-full">
        <div className="container mx-auto p-8">
          <h1 className="text-3xl font-bold mb-8">Service Management</h1>
          <div className="bg-white p-8 rounded-lg shadow-md mb-8">
            <h2 className="text-3xl font-bold mb-8">Pet Rescue</h2>
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="flex items-center">
                  <label className="block font-bold text-gray-700 w-full">Fixed one time charges</label>
                  <input
                    type="number"
                    value={isNaN(charges.rescueCharges) ? '' : charges.rescueCharges}
                    onChange={(e) => handleInputChange(e, 'rescueCharges')}
                    className="mt-1 block w-20 border rounded p-2"
                  />
                  <span className="ml-2 font-bold">INR</span>
                </div>
                <div className="flex items-center">
                  <label className="block font-bold text-gray-700 w-full">Transportation distance included</label>
                  <input
                    type="number"
                    value={isNaN(charges.emergencyCharges) ? '' : charges.emergencyCharges}
                    onChange={(e) => handleInputChange(e, 'emergencyCharges')}
                    className="mt-1 block w-20 border rounded p-2"
                  />
                  <span className="ml-2 font-bold">INR</span>
                </div>
                <div className="flex items-center">
                  <label className="block font-bold text-gray-700 w-full">Additional transportation distance charges per 4 KM</label>
                  <input
                    type="number"
                    value={isNaN(charges.transportationCharges) ? '' : charges.transportationCharges}
                    onChange={(e) => handleInputChange(e, 'transportationCharges')}
                    className="mt-1 block w-20 border rounded p-2"
                  />
                  <span className="ml-2 font-bold">INR</span>
                </div>
                <div className="flex items-center">
                  <label className="block font-bold text-gray-700 w-full">Pet handling charges included</label>
                  <input
                    type="number"
                    value={isNaN(charges.additionalCharges) ? '' : charges.additionalCharges}
                    onChange={(e) => handleInputChange(e, 'additionalCharges')}
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
        </div>
      </ScrollArea>
    </MainLayout>
  );
}
