'use client';
import { useState, ChangeEvent } from 'react';
import MainLayout from '@/components/layout/main-layout';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Phone, MapPin } from 'lucide-react';

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

  const [clinics, setClinics] = useState([
    { serialNo: 1, name: 'Clinic A', contactNo: '+91 9876543210', address: '456 Elm St', price: 700 },
  ]);

  const [newClinic, setNewClinic] = useState({
    name: '',
    contactNo: '',
    address: '',
    price: 0,
  });

  const [isFormVisible, setFormVisible] = useState(false);

  const handleClinicInputChange = (event: ChangeEvent<HTMLInputElement>, field: string) => {
    const value = event.target.value;
    setNewClinic(prevClinic => ({
      ...prevClinic,
      [field]: value,
    }));
  };

  const handleAddNewClinic = () => {
    setFormVisible(true);
  };

  const handleCreateClinic = () => {
    const newSerialNo = clinics.length + 1;
    setClinics([...clinics, { serialNo: newSerialNo, ...newClinic }]);
    setNewClinic({ name: '', contactNo: '', address: '', price: 0 });
    setFormVisible(false);
  };

  const handleCancelAddClinic = () => {
    setFormVisible(false);
    setNewClinic({ name: '', contactNo: '', address: '', price: 0 });
  };

  const isFormValid = () => {
    return (
      newClinic.name.trim() !== '' &&
      newClinic.contactNo.trim() !== '' &&
      newClinic.contactNo.length === 13 && // Assuming the format is '+91 XXXXXXXXXX'
      newClinic.address.trim() !== '' &&
      newClinic.price > 0
    );
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
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Associated Clinic</h2>
              <button
                className="bg-yellow-500 text-white py-2 px-4 rounded"
                onClick={handleAddNewClinic}
              >
                + Add New
              </button>
            </div>
            <table className="min-w-full bg-white border border-gray-300 rounded-lg">
              <thead>
                <tr className="bg-yellow-500 text-left text-gray-600">
                  <th className="px-4 py-2 border-b border-r-2">Serial No</th>
                  <th className="px-4 py-2 border-b border-r-2">Clinic Name</th>
                  <th className="px-4 py-2 border-b border-r-2">Contact No</th>
                  <th className="px-4 py-2 border-b border-r-2">Address</th>
                  <th className="px-4 py-2 border-b">Price</th>
                </tr>
              </thead>
              <tbody>
                {clinics.map((clinic, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-6 border-b">{clinic.serialNo}</td>
                    <td className="px-4 py-6 border-b">{clinic.name}</td>
                    <td className="px-4 py-6 border-b">
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-green-600" />
                        {clinic.contactNo}
                      </div>
                    </td>
                    <td className="px-4 py-6 border-b">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-red-600" />
                        {clinic.address}
                      </div>
                    </td>
                    <td className="px-4 py-6 border-b">{clinic.price} INR</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {isFormVisible && (
              <div className="mt-8 bg-gray-100 p-4 rounded-lg shadow-md">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex flex-col">
                    <label className="block font-bold text-gray-700">Clinic Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={newClinic.name}
                      onChange={(e) => handleClinicInputChange(e, 'name')}
                      className="mt-1 block w-full border rounded p-2"
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="block font-bold text-gray-700">Contact No <span className="text-red-500">*</span></label>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-green-600" />
                      <input
                        type="text"
                        value={newClinic.contactNo}
                        onChange={(e) => handleClinicInputChange(e, 'contactNo')}
                        className="mt-1 block w-full border rounded p-2"
                        maxLength={13} // Assuming the format is '+91 XXXXXXXXXX'
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="block font-bold text-gray-700">Address <span className="text-red-500">*</span></label>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-red-600" />
                      <input
                        type="text"
                        value={newClinic.address}
                        onChange={(e) => handleClinicInputChange(e, 'address')}
                        className="mt-1 block w-full border rounded p-2"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="block font-bold text-gray-700">Price <span className="text-red-500">*</span></label>
                    <input
                      type="number"
                      value={newClinic.price}
                      onChange={(e) => handleClinicInputChange(e, 'price')}
                      className="mt-1 block w-full border rounded p-2"
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-start mt-4">
                  <button
                    className="bg-gray-200 text-gray-800 py-2 px-4 rounded mr-4"
                    onClick={handleCancelAddClinic}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-yellow-500 text-white py-2 px-4 rounded"
                    onClick={handleCreateClinic}
                    disabled={!isFormValid()}
                  >
                    Create
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </ScrollArea>
    </MainLayout>
  );
}
