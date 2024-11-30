'use client';

import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/main-layout';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ToastAtTopRight } from '@/lib/sweetalert';
import { getAllServices, updateService } from '@/app/redux/actions/servicesAction';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/redux/store';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Define Zod schema for rescue charges validation
const rescueChargesSchema = z.object({
  FixedCharges: z.number().nonnegative().min(0, "Fixed charge must be non-negative"),
  TransportationIncluded: z.number().nonnegative().min(0, "Transportation included must be non-negative"),
  AdditionalTransportationChargePer4KM: z.number().nonnegative().min(0, "Additional transportation charge must be non-negative"),
  PetHandlingIncludedCharge: z.number().nonnegative().min(0, "Pet handling charge must be non-negative"),
});

// Create a TypeScript type based on the Zod schema
type RescueChargesFormValues = z.infer<typeof rescueChargesSchema>;

export default function PetRescuePage() {
  const [serviceId, setServiceId] = useState<string | null>(null);
  console.log(serviceId);

  useEffect(() => {
    // Parse the URL to get the 'id' parameter
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    setServiceId(id);
  }, []);

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { services, loading } = useSelector((state: RootState) => state.service);

  const [initialCharges, setInitialCharges] = useState<RescueChargesFormValues>({} as RescueChargesFormValues); // Store initial charges

  // Set up React Hook Form with Zod schema resolver
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<RescueChargesFormValues>({
    resolver: zodResolver(rescueChargesSchema),
    defaultValues: {},
  });

  useEffect(() => {
    dispatch(getAllServices());
  }, [dispatch]);

  useEffect(() => {
    if (services.length) {
      const PetRescueService = services.find(service => service.serviceName === "Pet Rescue");
      if (PetRescueService) {
        const fetchedCharges: RescueChargesFormValues = {
          FixedCharges: PetRescueService.fixedCharge || 0,
          TransportationIncluded: PetRescueService.transportationIncluded || 0,
          AdditionalTransportationChargePer4KM: PetRescueService.additionalTransportationChargePer4KM || 0,
          PetHandlingIncludedCharge: PetRescueService.petHandlingIncludedCharge || 0,
        };

        // Set initial charges and default values in form
        setInitialCharges(fetchedCharges);
        Object.entries(fetchedCharges).forEach(([key, value]) => setValue(key as keyof RescueChargesFormValues, value));
      } else {
        ToastAtTopRight.fire({
          icon: 'error',
          title: 'Failed to fetch Pet Rescue service',
        });
        router.push('/service-management/');
      }
    }
  }, [services, router, setValue]);

  const onSubmit = async (data: RescueChargesFormValues) => {
    if (serviceId) {
      try {
        const serviceData = {
          fixedCharge: data.FixedCharges,
          transportationIncluded: data.TransportationIncluded,
          additionalTransportationChargePer4KM: data.AdditionalTransportationChargePer4KM,
          petHandlingIncludedCharge: data.PetHandlingIncludedCharge,
        };

        console.log(serviceData);

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
    // Reset charges to initial charges from API
    Object.entries(initialCharges).forEach(([key, value]) => setValue(key as keyof RescueChargesFormValues, value));
    ToastAtTopRight.fire({
      icon: 'info',
      title: 'Changes have been reset',
    });
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
                {loading ? (
                  <div className="flex justify-center py-8">
                    <span className="text-gray-500">Loading ...</span>
                  </div>
                ) : (
                  <>
                    {Object.keys(initialCharges).map((key) => (
                      <div key={key} className="flex items-center">
                        <label className="block font-bold text-gray-700 w-full">
                          {key.replace(/([A-Z])/g, ' $1')}
                        </label>
                        <Input
                          type="number"
                          {...register(key as keyof RescueChargesFormValues, { valueAsNumber: true })} // Register field for validation with valueAsNumber
                          className="mt-1 block w-20 border rounded p-2"
                        />
                        <span className="ml-2 font-bold">
                          {key === "TransportationIncluded" ? "KM" : "INR"}
                        </span>
                        {errors[key as keyof RescueChargesFormValues] && (
                          <p className="text-red-500">{errors[key as keyof RescueChargesFormValues]?.message}</p>
                        )}
                      </div>
                    ))}
                  </>
                )}
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
                onClick={handleSubmit(onSubmit)} // Use handleSubmit from React Hook Form
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
