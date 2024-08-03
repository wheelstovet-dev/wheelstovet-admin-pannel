'use client';
import { useState, ChangeEvent } from 'react';
import MainLayout from '@/components/layout/main-layout';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ServiceState {
  oneTimeCharge?: number;
  distanceIncluded?: number;
  additionalDistance?: number;
  petIncluded?: number;
  additionalPetCost?: number;
  fixedCharges?: number;
  petHandlerCost?: number;
  additionalTimeCost?: number;
  defaultVetTime?: number;
  fixedOneTimeCharges?: number;
  transportDistanceIncluded?: number;
  additionalTransportDistance?: number;
  petHandlingCharges?: number;
  dailyPlanCharges?: number;
  weeklyPlanCharges?: number;
  monthlyPlanCharges?: number;
  dailyPlanCharges2?: number;
  weeklyPlanCharges2?: number;
  monthlyPlanCharges2?: number;
  defaultSalonTime?: number;
  additionalSalonTimeCost?: number;
  additionalPetHandlerCost?: number;
  petHandlerIncluded?: number;
}

export default function ServiceManagementPage() {
  const [initialPayment, setInitialPayment] = useState<ServiceState>({
    oneTimeCharge: 300,
    distanceIncluded: 300,
    additionalDistance: 300,
    petIncluded: 300,
    additionalPetCost: 300
  });

  const [veterinaryVisit, setVeterinaryVisit] = useState<ServiceState>({
    fixedCharges: 300,
    petHandlerCost: 300,
    additionalTimeCost: 300,
    petHandlerIncluded: 300,
    defaultVetTime: 300
  });

  const [petRescue, setPetRescue] = useState<ServiceState>({
    fixedOneTimeCharges: 300,
    transportDistanceIncluded: 300,
    additionalTransportDistance: 300,
    petHandlingCharges: 300
  });

  const [dogWalking, setDogWalking] = useState<ServiceState>({
    dailyPlanCharges: 300,
    weeklyPlanCharges: 300,
    monthlyPlanCharges: 300,
    dailyPlanCharges2: 300,
    weeklyPlanCharges2: 300,
    monthlyPlanCharges2: 300
  });

  const [salonVisit, setSalonVisit] = useState<ServiceState>({
    fixedCharges: 300,
    defaultSalonTime: 300,
    additionalSalonTimeCost: 300
  });

  const [outingWithPet, setOutingWithPet] = useState<ServiceState>({
    oneTimeCharge: 300,
    petIncluded: 300,
    petHandlerIncluded: 300,
    additionalPetHandlerCost: 300
  });

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    section: string,
    field: string
  ) => {
    const value = Number(event.target.value);
    switch (section) {
      case 'initialPayment':
        setInitialPayment(prevState => ({
          ...prevState,
          [field]: value
        }));
        break;
      case 'veterinaryVisit':
        setVeterinaryVisit(prevState => ({
          ...prevState,
          [field]: value
        }));
        break;
      case 'petRescue':
        setPetRescue(prevState => ({
          ...prevState,
          [field]: value
        }));
        break;
      case 'dogWalking':
        setDogWalking(prevState => ({
          ...prevState,
          [field]: value
        }));
        break;
      case 'salonVisit':
        setSalonVisit(prevState => ({
          ...prevState,
          [field]: value
        }));
        break;
      case 'outingWithPet':
        setOutingWithPet(prevState => ({
          ...prevState,
          [field]: value
        }));
        break;
      default:
        break;
    }
  };

  return (
    <MainLayout meta={{ title: 'Service Management' }}>
      <ScrollArea className="h-full">
        <div className="space-y-8 p-8">
          {/* Initial Payment Section */}
          <div className="bg-white p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-4">Initial Payment</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between">
                <label className="w-full text-black font-bold mb-2">One time charge</label>
                <input
                  type="number"
                  value={initialPayment.oneTimeCharge}
                  onChange={(e) => handleInputChange(e, 'initialPayment', 'oneTimeCharge')}
                  className="w-20 p-2 border border-gray-300 rounded"
                />
                <span className="text-black font-bold ml-2">INR</span>
              </div>
              <div className="flex items-center justify-between">
                <label className="w-full text-black font-bold mb-2">Pet included within initial payment</label>
                <input
                  type="number"
                  value={initialPayment.petIncluded}
                  onChange={(e) => handleInputChange(e, 'initialPayment', 'petIncluded')}
                  className="w-20 p-2 border border-gray-300 rounded"
                />
                <span className="text-black font-bold ml-2">INR</span>
              </div>
              <div className="flex items-center justify-between">
                <label className="w-full text-black font-bold mb-2">Distance included in one time charge</label>
                <input
                  type="number"
                  value={initialPayment.distanceIncluded}
                  onChange={(e) => handleInputChange(e, 'initialPayment', 'distanceIncluded')}
                  className="w-20 p-2 border border-gray-300 rounded"
                />
                <span className="text-black font-bold ml-2">KM</span>
              </div>
              <div className="flex items-center justify-between">
                <label className="w-full text-black font-bold mb-2">Additional cost per pet</label>
                <input
                  type="number"
                  value={initialPayment.additionalPetCost}
                  onChange={(e) => handleInputChange(e, 'initialPayment', 'additionalPetCost')}
                  className="w-20 p-2 border border-gray-300 rounded"
                />
                <span className="text-black font-bold ml-2">INR</span>
              </div>
              <div className="flex items-center justify-between">
                <label className="w-full text-black font-bold mb-2">Additional distance charges per kilometre</label>
                <input
                  type="number"
                  value={initialPayment.additionalDistance}
                  onChange={(e) => handleInputChange(e, 'initialPayment', 'additionalDistance')}
                  className="w-20 p-2 border border-gray-300 rounded"
                />
                <span className="text-black font-bold ml-2">INR</span>
              </div>
            </div>
            <div className="flex mt-4 space-x-2">
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200">Cancel</button>
              <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">Save Changes</button>
            </div>
          </div>

          {/* Veterinary Visit Section */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-4">Veterinary Visit</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between">
                <label className="w-full text-black font-bold mb-2">Fixed charges</label>
                <input
                  type="number"
                  value={veterinaryVisit.fixedCharges}
                  onChange={(e) => handleInputChange(e, 'veterinaryVisit', 'fixedCharges')}
                  className="w-20 p-2 border border-gray-300 rounded"
                />
                <span className="text-black font-bold ml-2">INR</span>
              </div>
              <div className="flex items-center justify-between">
                <label className="w-full text-black font-bold mb-2">Pet handler included</label>
                <input
                  type="number"
                  value={veterinaryVisit.petHandlerIncluded}
                  onChange={(e) => handleInputChange(e, 'veterinaryVisit', 'petHandlerIncluded')}
                  className="w-20 p-2 border border-gray-300 rounded"
                />
                <span className="text-black font-bold ml-2">INR</span>
              </div>
              <div className="flex items-center justify-between">
                <label className="w-full text-black font-bold mb-2">Pet handler cost</label>
                <input
                  type="number"
                  value={veterinaryVisit.petHandlerCost}
                  onChange={(e) => handleInputChange(e, 'veterinaryVisit', 'petHandlerCost')}
                  className="w-20 p-2 border border-gray-300 rounded"
                />
                <span className="text-black font-bold ml-2">INR</span>
              </div>
              <div className="flex items-center justify-between">
                <label className="w-full text-black font-bold mb-2">Default vet time included</label>
                <input
                  type="number"
                  value={veterinaryVisit.defaultVetTime}
                  onChange={(e) => handleInputChange(e, 'veterinaryVisit', 'defaultVetTime')}
                  className="w-20 p-2 border border-gray-300 rounded"
                />
                <span className="text-black font-bold ml-2">INR</span>
              </div>
              <div className="flex items-center justify-between">
                <label className="w-full text-black font-bold mb-2">Additional time cost during vet visit per hour</label>
                <input
                  type="number"
                  value={veterinaryVisit.additionalTimeCost}
                  onChange={(e) => handleInputChange(e, 'veterinaryVisit', 'additionalTimeCost')}
                  className="w-20 p-2 border border-gray-300 rounded"
                />
                <span className="text-black font-bold ml-2">INR</span>
              </div>
            </div>
            <div className="flex mt-4 space-x-2">
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200">Cancel</button>
              <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">Save Changes</button>
            </div>
          </div>

          {/* Salon Visit Section */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-4">Salon Visit</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between">
                <label className="w-full text-black font-bold mb-2">Fixed charges</label>
                <input
                  type="number"
                  value={salonVisit.fixedCharges}
                  onChange={(e) => handleInputChange(e, 'salonVisit', 'fixedCharges')}
                  className="w-20 p-2 border border-gray-300 rounded"
                />
                <span className="text-black font-bold ml-2">INR</span>
              </div>
              <div className="flex items-center justify-between">
                <label className="w-full text-black font-bold mb-2">Default salon time included</label>
                <input
                  type="number"
                  value={salonVisit.defaultSalonTime}
                  onChange={(e) => handleInputChange(e, 'salonVisit', 'defaultSalonTime')}
                  className="w-20 p-2 border border-gray-300 rounded"
                />
                <span className="text-black font-bold ml-2">INR</span>
              </div>
              <div className="flex items-center justify-between">
                <label className="w-full text-black font-bold mb-2">Additional time cost during salon visit per hour</label>
                <input
                  type="number"
                  value={salonVisit.additionalSalonTimeCost}
                  onChange={(e) => handleInputChange(e, 'salonVisit', 'additionalSalonTimeCost')}
                  className="w-20 p-2 border border-gray-300 rounded"
                />
                <span className="text-black font-bold ml-2">INR</span>
              </div>
            </div>
            <div className="flex mt-4 space-x-2">
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200">Cancel</button>
              <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">Save Changes</button>
            </div>
          </div>

          {/* Outing with Pet Section */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-4">Outing with Pet</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between">
                <label className="w-full text-black font-bold mb-2">One time charges</label>
                <input
                  type="number"
                  value={outingWithPet.oneTimeCharge}
                  onChange={(e) => handleInputChange(e, 'outingWithPet', 'oneTimeCharge')}
                  className="w-20 p-2 border border-gray-300 rounded"
                />
                <span className="text-black font-bold ml-2">INR</span>
              </div>
              <div className="flex items-center justify-between">
                <label className="w-full text-black font-bold mb-2">Pet included within one time charges</label>
                <input
                  type="number"
                  value={outingWithPet.petIncluded}
                  onChange={(e) => handleInputChange(e, 'outingWithPet', 'petIncluded')}
                  className="w-20 p-2 border border-gray-300 rounded"
                />
                <span className="text-black font-bold ml-2">INR</span>
              </div>
              <div className="flex items-center justify-between">
                <label className="w-full text-black font-bold mb-2">Pet handler included within one time charges</label>
                <input
                  type="number"
                  value={outingWithPet.petHandlerIncluded}
                  onChange={(e) => handleInputChange(e, 'outingWithPet', 'petHandlerIncluded')}
                  className="w-20 p-2 border border-gray-300 rounded"
                />
                <span className="text-black font-bold ml-2">INR</span>
              </div>
              <div className="flex items-center justify-between">
                <label className="w-full text-black font-bold mb-2">Additional charges per pet handler</label>
                <input
                  type="number"
                  value={outingWithPet.additionalPetHandlerCost}
                  onChange={(e) => handleInputChange(e, 'outingWithPet', 'additionalPetHandlerCost')}
                  className="w-20 p-2 border border-gray-300 rounded"
                />
                <span className="text-black font-bold ml-2">INR</span>
              </div>
            </div>
            <div className="flex mt-4 space-x-2">
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200">Cancel</button>
              <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">Save Changes</button>
            </div>
          </div>

          {/* Pet Rescue Section */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-4">Pet Rescue</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between">
                <label className="w-full text-black font-bold mb-2">Fixed one time charges</label>
                <input
                  type="number"
                  value={petRescue.fixedOneTimeCharges}
                  onChange={(e) => handleInputChange(e, 'petRescue', 'fixedOneTimeCharges')}
                  className="w-20 p-2 border border-gray-300 rounded"
                />
                <span className="text-black font-bold ml-2">INR</span>
              </div>
              <div className="flex items-center justify-between">
                <label className="w-full text-black font-bold mb-2">Transportation distance included</label>
                <input
                  type="number"
                  value={petRescue.transportDistanceIncluded}
                  onChange={(e) => handleInputChange(e, 'petRescue', 'transportDistanceIncluded')}
                  className="w-20 p-2 border border-gray-300 rounded"
                />
                <span className="text-black font-bold ml-2">KM</span>
              </div>
              <div className="flex items-center justify-between">
                <label className="w-full text-black font-bold mb-2">Additional transportation distance charges per 4 KM</label>
                <input
                  type="number"
                  value={petRescue.additionalTransportDistance}
                  onChange={(e) => handleInputChange(e, 'petRescue', 'additionalTransportDistance')}
                  className="w-20 p-2 border border-gray-300 rounded"
                />
                <span className="text-black font-bold ml-2">INR</span>
              </div>
              <div className="flex items-center justify-between">
                <label className="w-full text-black font-bold mb-2">Pet handling charges included</label>
                <input
                  type="number"
                  value={petRescue.petHandlingCharges}
                  onChange={(e) => handleInputChange(e, 'petRescue', 'petHandlingCharges')}
                  className="w-20 p-2 border border-gray-300 rounded"
                />
                <span className="text-black font-bold ml-2">INR</span>
              </div>
            </div>
            <div className="flex mt-4 space-x-2">
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200">Cancel</button>
              <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">Save Changes</button>
            </div>
          </div>

          {/* Dog Walking Section */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-4">Dog Walking</h2>
            <div className="mb-4">
              <h3 className="text-xl font-bold mb-2">1 time dog walking per day</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-between">
                  <label className="w-full text-black font-bold mb-2">Daily plan charges</label>
                  <input
                    type="number"
                    value={dogWalking.dailyPlanCharges}
                    onChange={(e) => handleInputChange(e, 'dogWalking', 'dailyPlanCharges')}
                    className="w-20 p-2 border border-gray-300 rounded"
                  />
                  <span className="text-black font-bold ml-2">INR</span>
                </div>
                <div className="flex items-center justify-between">
                  <label className="w-full text-black font-bold mb-2">Monthly plan charges</label>
                  <input
                    type="number"
                    value={dogWalking.monthlyPlanCharges}
                    onChange={(e) => handleInputChange(e, 'dogWalking', 'monthlyPlanCharges')}
                    className="w-20 p-2 border border-gray-300 rounded"
                  />
                  <span className="text-black font-bold ml-2">INR</span>
                </div>
                <div className="flex items-center justify-between">
                  <label className="w-full text-black font-bold mb-2">Weekly plan charges</label>
                  <input
                    type="number"
                    value={dogWalking.weeklyPlanCharges}
                    onChange={(e) => handleInputChange(e, 'dogWalking', 'weeklyPlanCharges')}
                    className="w-20 p-2 border border-gray-300 rounded"
                  />
                  <span className="text-black font-bold ml-2">INR</span>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <h3 className="text-xl font-bold mb-2">2 time dog walking per day</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-between">
                  <label className="w-full text-black font-bold mb-2">Daily plan charges</label>
                  <input
                    type="number"
                    value={dogWalking.dailyPlanCharges2}
                    onChange={(e) => handleInputChange(e, 'dogWalking', 'dailyPlanCharges2')}
                    className="w-20 p-2 border border-gray-300 rounded"
                  />
                  <span className="text-black font-bold ml-2">INR</span>
                </div>
                <div className="flex items-center justify-between">
                  <label className="w-full text-black font-bold mb-2">Monthly plan charges</label>
                  <input
                    type="number"
                    value={dogWalking.monthlyPlanCharges2}
                    onChange={(e) => handleInputChange(e, 'dogWalking', 'monthlyPlanCharges2')}
                    className="w-20 p-2 border border-gray-300 rounded"
                  />
                  <span className="text-black font-bold ml-2">INR</span>
                </div>
                <div className="flex items-center justify-between">
                  <label className="w-full text-black font-bold mb-2">Weekly plan charges</label>
                  <input
                    type="number"
                    value={dogWalking.weeklyPlanCharges2}
                    onChange={(e) => handleInputChange(e, 'dogWalking', 'weeklyPlanCharges2')}
                    className="w-20 p-2 border border-gray-300 rounded"
                  />
                  <span className="text-black font-bold ml-2">INR</span>
                </div>
              </div>
            </div>
            <div className="flex mt-4 space-x-2">
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200">Cancel</button>
              <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">Save Changes</button>
            </div>
          </div>
        </div>
      </ScrollArea>
    </MainLayout>
  );
}
