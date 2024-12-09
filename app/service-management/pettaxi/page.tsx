'use client';
import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/main-layout';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/redux/store';
import { getAllServices, updateService } from '@/app/redux/actions/servicesAction';
import { ToastAtTopRight } from '@/lib/sweetalert';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/protectedRoute';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Define Zod schema for validation
const chargesSchema = z.object({
  FixedCharges: z.number().nonnegative().min(0, 'Fixed charge must be non-negative'),
  HandlingAddOnCharge: z.number().nonnegative().min(0, 'Handling Add-On charge must be non-negative'),
});

type ChargesFormValues = z.infer<typeof chargesSchema>;

export default function PetTaxiPage() {
  const [serviceId, setServiceId] = useState<string | null>(null);

  const [distance, setDistance] = useState(0); // Distance in KM
  const [additionalTime, setAdditionalTime] = useState(0); // Additional time in minutes

  const [totalCost, setTotalCost] = useState(0); // Total cost state

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { services, loading } = useSelector((state: RootState) => state.service);

  const [initialCharges, setInitialCharges] = useState<ChargesFormValues>({} as ChargesFormValues);

  const { register, setValue, watch, handleSubmit, formState: { errors } } = useForm<ChargesFormValues>({
    resolver: zodResolver(chargesSchema),
    defaultValues: {},
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    setServiceId(id);
    dispatch(getAllServices());
  }, [dispatch]);

  useEffect(() => {
    if (services.length) {
      const PetTaxiService = services.find(service => service.serviceName === 'Pet Taxi');
      if (PetTaxiService) {
        const fetchedCharges: ChargesFormValues = {
          FixedCharges: PetTaxiService.fixedCharge || 0,
          HandlingAddOnCharge: PetTaxiService.handlingAddOnCharge || 0,
        };

        setInitialCharges(fetchedCharges);
        Object.entries(fetchedCharges).forEach(([key, value]) => setValue(key as keyof ChargesFormValues, value));
      } else {
        ToastAtTopRight.fire({
          icon: 'error',
          title: 'Failed to fetch Pet Taxi service',
        });
        router.push('/service-management/');
      }
    }
  }, [services, router, setValue]);

  // Dynamically calculate total charges whenever form fields change
  useEffect(() => {
    const calculateTotalCost = () => {
      // Start with FixedCharges from the input field
      let cost = watch('FixedCharges') || 0;
  
      let extraDistance = distance - 3;
  
      if (extraDistance > 0 && extraDistance <= 17) {
        cost += extraDistance * 26; // For distance between 4 and 20 KM
      } else if (extraDistance > 17 && extraDistance <= 147) {
        cost += (17 * 26) + (extraDistance - 17) * 24; // For distance between 20 and 150 KM
      }
  
      const handlingAddOnCharge = watch('HandlingAddOnCharge') || 0;
      cost += handlingAddOnCharge; // Add handling charge
  
      if (additionalTime > 45) {
        const extraHours = Math.ceil((additionalTime - 45) / 60);
        cost += extraHours * 120; // Add additional time charges
      }
  
      setTotalCost(cost); // Update total cost state
    };
  
    // Subscribe to changes in the watched fields
    calculateTotalCost();
  }, [watch('FixedCharges'), watch('HandlingAddOnCharge'), distance, additionalTime]);
  


  const onSubmit = async (data: ChargesFormValues) => {
    if (serviceId) {
      try {
        const serviceData = {
          fixedCharge: data.FixedCharges,
          handlingAddOnCharge: data.HandlingAddOnCharge,
        };
        console.log('Submitted Data:', serviceData);

        await dispatch(updateService({ id: serviceId, serviceData })).unwrap();
        ToastAtTopRight.fire({
          icon: 'success',
          title: 'Service updated successfully!',
        });
      } catch (error) {
        console.log(error);
        ToastAtTopRight.fire({
          icon: 'error',
          title: error || 'Failed to update Service',
        });
      }
    }
  };

  const handleCancel = () => {
    Object.entries(initialCharges).forEach(([key, value]) => setValue(key as keyof ChargesFormValues, value));
    setDistance(0);
    setAdditionalTime(0);
    setTotalCost(0);
    ToastAtTopRight.fire({
      icon: 'info',
      title: 'Changes have been reset',
    });
  };

  return (
    <ProtectedRoute>
      <MainLayout meta={{ title: 'Service Management' }}>
        <ScrollArea className="h-full">
          <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-8">Service Management</h1>
            <div className="bg-white p-8 rounded-lg shadow-md mb-8">
              <h2 className="text-3xl font-bold mb-8">Pet Taxi Charges</h2>
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {loading ? (
                    <div className="flex justify-center py-8">
                      <span className="text-gray-500">Loading ...</span>
                    </div>
                  ) : (
                    <>
                      {Object.keys(initialCharges).map(key => (
                        <div key={key} className="flex items-center">
                          <label className="block font-bold text-gray-700 w-full">
                            {key.replace(/([A-Z])/g, ' $1')}
                          </label>
                          <input
                            type="number"
                            {...register(key as keyof ChargesFormValues, { valueAsNumber: true })}
                            className="mt-1 block w-20 border rounded p-2"
                          />
                          <span className="ml-2 font-bold">INR</span>
                          {errors[key as keyof ChargesFormValues] && (
                            <p className="text-red-500">{errors[key as keyof ChargesFormValues]?.message}</p>
                          )}
                        </div>
                      ))}
                      <div className="flex items-center">
                        <label className="block font-bold text-gray-700 w-full">Distance (KM)</label>
                        <input
                          type="number"
                          defaultValue={distance} // Use defaultValue instead of value
                          onChange={(e) => setDistance(Number(e.target.value))}
                          className="mt-1 block w-20 border rounded p-2"
                        />
                        <span className="ml-2 font-bold">KM</span>
                      </div>
                      <div className="flex items-center">
                        <label className="block font-bold text-gray-700 w-full">Additional Time (Minutes)</label>
                        <input
                          type="number"
                          defaultValue={additionalTime} // Use defaultValue instead of value
                          onChange={(e) => setAdditionalTime(Number(e.target.value))}
                          className="mt-1 block w-20 border rounded p-2"
                        />
                        <span className="ml-2 font-bold">Minutes</span>
                      </div>

                    </>
                  )}
                </div>
              </div>

              {/* Display Total Charges */}
              <div className="mt-4">
                <h3 className="text-2xl font-bold">
                  Total Charges: <span className="text-yellow-500">{totalCost} INR</span>
                </h3>
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
                  onClick={handleSubmit(onSubmit)}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </ScrollArea>
      </MainLayout>
    </ProtectedRoute>
  );
}
