'use client';
import { useState, ChangeEvent } from 'react';
import MainLayout from '@/components/layout/main-layout';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function VeterinaryVisitPage() {
  const [charges, setCharges] = useState({
    fixedCharges: 300,
    petHandlerCost: 300,
    additionalTimeCost: 300,
    petHandlerIncluded: 300,
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

  const [clinic, setClinic] = useState({
    name: '',
    location: '',
  });

  const handleClinicInputChange = (event: ChangeEvent<HTMLInputElement>, field: string) => {
    const value = event.target.value;
    setClinic(prevClinic => ({
      ...prevClinic,
      [field]: value,
    }));
  };

  const handleClinicSubmit = () => {
    console.log('Clinic saved:', clinic);
    // Add your save logic here
  };

  const handleClinicCancel = () => {
    console.log('Clinic addition cancelled');
    // Add your cancel logic here
  };

  return (
    <MainLayout meta={{ title: 'Service Management' }}>
      <ScrollArea className="h-full">
        <div className="container mx-auto p-8">
          <h1 className="text-3xl font-bold mb-8">Service Management</h1>
          <div className="bg-white p-8 rounded-lg shadow-md mb-8">
            <h2 className="text-3xl font-bold mb-8">Veterinary Visit</h2>
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
                  <label className="block font-bold text-gray-700 w-full">Pet handler cost</label>
                  <input
                    type="number"
                    value={charges.petHandlerCost}
                    onChange={(e) => handleInputChange(e, 'petHandlerCost')}
                    className="mt-1 block w-20 border rounded p-2"
                  />
                  <span className="ml-2 font-bold">INR</span>
                </div>
                <div className="flex items-center">
                  <label className="block font-bold text-gray-700 w-full">Additional time cost during vet visit per hour</label>
                  <input
                    type="number"
                    value={charges.additionalTimeCost}
                    onChange={(e) => handleInputChange(e, 'additionalTimeCost')}
                    className="mt-1 block w-20 border rounded p-2"
                  />
                  <span className="ml-2 font-bold">INR</span>
                </div>
                <div className="flex items-center">
                  <label className="block font-bold text-gray-700 w-full">Pet handler included</label>
                  <input
                    type="number"
                    value={charges.petHandlerIncluded}
                    onChange={(e) => handleInputChange(e, 'petHandlerIncluded')}
                    className="mt-1 block w-20 border rounded p-2"
                  />
                  <span className="ml-2 font-bold">INR</span>
                </div>
                <div className="flex items-center">
                  <label className="block font-bold text-gray-700 w-full">Default vet time included</label>
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
            <h2 className="text-3xl font-bold mb-8">Add Clinic</h2>
            <div className="space-y-8">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                <div className="flex flex-col">
                  <label className="block font-bold text-gray-700">Clinic Name</label>
                  <input
                    type="text"
                    value={clinic.name}
                    onChange={(e) => handleClinicInputChange(e, 'name')}
                    className="mt-1 block w-full border rounded p-2"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block font-bold text-gray-700">Location</label>
                  <input
                    type="text"
                    value={clinic.location}
                    onChange={(e) => handleClinicInputChange(e, 'location')}
                    className="mt-1 block w-full border rounded p-2"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-start mt-8">
              <button
                className="bg-gray-200 text-gray-800 py-2 px-4 rounded mr-4"
                onClick={handleClinicCancel}
              >
                Cancel
              </button>
              <button
                className="bg-yellow-500 text-white py-2 px-4 rounded"
                onClick={handleClinicSubmit}
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
