'use client';
import { useState, ChangeEvent } from 'react';
import MainLayout from '@/components/layout/main-layout';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function PetHandlingPage() {
  const [charges, setCharges] = useState({
    oneTimeCharges: 300,
    petHandlerIncludedCharges: 300,
    petIncludedCharges: 300,
    additionalPetHandlerCharges: 300,
    petHandling24HoursCharges: 300,  // Added this line
    petHandling12HoursCharges: 300,  // Added this line
    petHandling8HoursCharges: 300,   // Added this line
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>, field: string) => {
    const value = event.target.value === '' ? NaN : Number(event.target.value); 
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
            <h2 className="text-3xl font-bold mb-8">Pet Handling</h2>
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="flex items-center">
                  <label className="block font-bold text-gray-700 w-full">One time charge</label>
                  <input
                    type="number"
                    value={isNaN(charges.oneTimeCharges) ? '' : charges.oneTimeCharges}
                    onChange={(e) => handleInputChange(e, 'oneTimeCharges')}
                    className="mt-1 block w-20 border rounded p-2"
                  />
                  <span className="ml-2 font-bold">INR</span>
                </div>
                <div className="flex items-center">
                  <label className="block font-bold text-gray-700 w-full">Pet included within initial payment</label>
                  <input
                    type="number"
                    value={isNaN(charges.petHandlerIncludedCharges) ? '' : charges.petHandlerIncludedCharges}
                    onChange={(e) => handleInputChange(e, 'petHandlerIncludedCharges')}
                    className="mt-1 block w-20 border rounded p-2"
                  />
                  <span className="ml-2 font-bold">INR</span>
                </div>
                <div className="flex items-center">
                  <label className="block font-bold text-gray-700 w-full">Distance included in one time charge</label>
                  <input
                    type="number"
                    value={isNaN(charges.petIncludedCharges) ? '' : charges.petIncludedCharges}
                    onChange={(e) => handleInputChange(e, 'petIncludedCharges')}
                    className="mt-1 block w-20 border rounded p-2"
                  />
                  <span className="ml-2 font-bold">KM</span>
                </div>
                <div className="flex items-center">
                  <label className="block font-bold text-gray-700 w-full">Additional cost per pet</label>
                  <input
                    type="number"
                    value={isNaN(charges.additionalPetHandlerCharges) ? '' : charges.additionalPetHandlerCharges}
                    onChange={(e) => handleInputChange(e, 'additionalPetHandlerCharges')}
                    className="mt-1 block w-20 border rounded p-2"
                  />
                  <span className="ml-2 font-bold">INR</span>
                </div>
                <div className="flex items-center">
                  <label className="block font-bold text-gray-700 w-full">24 hours pet handling cost</label>
                  <input
                    type="number"
                    value={isNaN(charges.petHandling24HoursCharges) ? '' : charges.petHandling24HoursCharges}
                    onChange={(e) => handleInputChange(e, 'petHandling24HoursCharges')}
                    className="mt-1 block w-20 border rounded p-2"
                  />
                  <span className="ml-2 font-bold">INR</span>
                </div>
                <div className="flex items-center">
                  <label className="block font-bold text-gray-700 w-full">12 hours pet handling cost</label>
                  <input
                    type="number"
                    value={isNaN(charges.petHandling12HoursCharges) ? '' : charges.petHandling12HoursCharges}
                    onChange={(e) => handleInputChange(e, 'petHandling12HoursCharges')}
                    className="mt-1 block w-20 border rounded p-2"
                  />
                  <span className="ml-2 font-bold">INR</span>
                </div>
                <div className="flex items-center">
                  <label className="block font-bold text-gray-700 w-full">8 hours pet handling cost</label>
                  <input
                    type="number"
                    value={isNaN(charges.petHandling8HoursCharges) ? '' : charges.petHandling8HoursCharges}
                    onChange={(e) => handleInputChange(e, 'petHandling8HoursCharges')}
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
