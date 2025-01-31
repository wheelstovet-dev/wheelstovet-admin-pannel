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
import ProtectedRoute from '@/components/protectedRoute';

// Define Zod schema for charges validation
const chargesSchema = z.object({
  FixedCharges: z.number().nonnegative().min(0, "Fixed charge must be non-negative"),
  // AdditionalPetCharge: z.number().nonnegative().min(0, "Additional pet charge must be non-negative"),
  // PetHandlerCharge: z.number().nonnegative().min(0, "Pet handler charge must be non-negative"),
  // HandlingAddOnCharge: z.number().nonnegative().min(0, "Handling add-on charge must be non-negative"),
  // VetVisitAddOnCharge: z.number().nonnegative().min(0, "Vet visit add-on charge must be non-negative"),
  // MinimumChargeIfNotFound: z.number().nonnegative().min(0, "Minimum charge if not found must be non-negative"),
  // AdditionalTimeCost: z.number().nonnegative().min(0, "Additional time cost must be non-negative"),
  AdditionalDistanceCharge: z.number().nonnegative().min(0, "Additional distance charge must be non-negative"),
  //FourHourCharge: z.number().nonnegative().min(0, "Four-hour charge must be non-negative"),
  //TwelveHourCharge: z.number().nonnegative().min(0, "Twelve-hour charge must be non-negative"),
  //TwentyFourHourCharge: z.number().nonnegative().min(0, "Twenty-four-hour charge must be non-negative"),
  // IncludedTime: z.number().nonnegative().min(0, "Included time must be non-negative"),
});

// Create a TypeScript type based on the Zod schema
type ChargesFormValues = z.infer<typeof chargesSchema>;

export default function PetRelocationPage() {
  const [serviceId, setServiceId] = useState<string | null>(null);
  // console.log(serviceId);
  const [totalCharges, setTotalCharges] = useState<number>(0); // State to track total charges

   // Set up React Hook Form with Zod schema resolver
   const { register, handleSubmit, setValue,watch, formState: { errors } } = useForm<ChargesFormValues>({
    resolver: zodResolver(chargesSchema),
    defaultValues: {},
  });

  useEffect(() => {
    // Parse the URL to get the 'id' parameter
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    setServiceId(id);
  }, []);

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { services, loading } = useSelector((state: RootState) => state.service);

  const [initialCharges, setInitialCharges] = useState<ChargesFormValues>({} as ChargesFormValues); // Store initial charges

 

  useEffect(() => {
    dispatch(getAllServices());
  }, [dispatch]);

  useEffect(() => {
    if (services.length) {
      const PetHandlingService = services.find(service => service.serviceName === "Pet Relocation");
      if (PetHandlingService) {
        const fetchedCharges: ChargesFormValues = {
           FixedCharges: PetHandlingService.fixedCharge || 0,
          // AdditionalPetCharge: PetHandlingService.additionalPetCharge || 0,
          // PetHandlerCharge: PetHandlingService.petHandlerCharge || 0,
          // HandlingAddOnCharge: PetHandlingService.handlingAddOnCharge || 0,
          // VetVisitAddOnCharge: PetHandlingService.vetVisitAddOnCharge || 0,
          // MinimumChargeIfNotFound: PetHandlingService.minimumChargeIfNotFound || 0,
          // AdditionalTimeCost: PetHandlingService.additionalTimeCharge || 0,
          AdditionalDistanceCharge: PetHandlingService.additionalDistanceCharge || 0,
          //FourHourCharge: PetHandlingService.fourHourCharge || 0,
          //TwelveHourCharge: PetHandlingService.twelveHourCharge || 0,
          //TwentyFourHourCharge: PetHandlingService.twentyFourHourCharge || 0,
          // IncludedTime: PetHandlingService.includedTime || 0,
        };

        // Set initial charges and default values in form
        setInitialCharges(fetchedCharges);
        Object.entries(fetchedCharges).forEach(([key, value]) => setValue(key as keyof ChargesFormValues, value));
      } else {
        ToastAtTopRight.fire({
          icon: 'error',
          title: 'Failed to fetch Pet relocation service',
        });
        router.push('/service-management/');
      }
    }
  }, [services, router, setValue]);

  // useEffect(() => {
  //   const calculateTotalCharges = () => {
  //     const total =
  //       (watch('FixedCharges') || 0) +
  //       (watch('TwentyFourHourCharge') || 0);
  //     setTotalCharges(total);
  //   };

  //   // Subscribe to changes in form values
  //   const subscription = watch(() => calculateTotalCharges());
  //   return () => subscription.unsubscribe(); // Cleanup subscription on unmount
  // }, [watch]);

  const onSubmit = async (data: ChargesFormValues) => {
    if (serviceId) {
      try {
        const serviceData = {
           fixedCharge: data.FixedCharges,
          // additionalPetCharge: data.AdditionalPetCharge,
          // petHandlerCharge: data.PetHandlerCharge,
          // handlingAddOnCharge: data.HandlingAddOnCharge,
          // vetVisitAddOnCharge: data.VetVisitAddOnCharge,
          // minimumChargeIfNotFound: data.MinimumChargeIfNotFound,
          // additionalTimeCharge: data.AdditionalTimeCost,
          //fourHourCharge: data.FourHourCharge,
          //twelveHourCharge: data.TwelveHourCharge,
          //twentyFourHourCharge: data.TwentyFourHourCharge,
          additionalDistanceCharge: data.AdditionalDistanceCharge,
          // includedTime: data.IncludedTime,
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
    Object.entries(initialCharges).forEach(([key, value]) => setValue(key as keyof ChargesFormValues, value));
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
            <h2 className="text-3xl font-bold mb-8">Pet Relocation</h2>
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
                            {key.replace(/([A-Z])/g, ' $1')} (<span className="ml-2 font-bold">
                              {key === "IncludedTime" ? "minutes" : key === "IncludedDistance" ? "KM" : "INR"}

                          </span> )
                          </label>
                        <Input
                          type="number"
                          {...register(key as keyof ChargesFormValues, { valueAsNumber: true })} // Register field for validation with valueAsNumber
                          className="mt-1 block w-20 border rounded p-2"
                        />
                          {errors[key as keyof ChargesFormValues] && (
                            <p className="text-red-500">{errors[key as keyof ChargesFormValues]?.message}</p>
                          )}
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
            {/* Display Total Charges */}
            
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
    </ProtectedRoute>
  );
}
