'use client'
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

// Define Zod schema for rescue charges validation
const rescueChargesSchema = z.object({
  FixedCharges: z.number().nonnegative().min(0, "Fixed charge must be non-negative"),
  HandlingAddOnCharge: z.number().nonnegative().min(0, "Add-on charge must be non-negative"),
  VetVisitAddOnCharge: z.number().nonnegative().min(0, "VetVisit add-on charge must be non-negative"),
  MinimumChargeIfNotFound: z.number().nonnegative().min(0, "Minimum charge must be non-negative"),
});

// Create a TypeScript type based on the Zod schema
type RescueChargesFormValues = z.infer<typeof rescueChargesSchema>;

export default function PetRescuePage() {
  const [serviceId, setServiceId] = useState<string | null>(null); // State to store service ID from URL
  const [totalCharges, setTotalCharges] = useState<number>(0); // State to track total charges
  const [initialCharges, setInitialCharges] = useState<RescueChargesFormValues>({} as RescueChargesFormValues); // Initial charges from the API

  const router = useRouter(); // Router for navigation
  const dispatch = useDispatch<AppDispatch>(); // Redux dispatch
  const { services, loading } = useSelector((state: RootState) => state.service); // Select services from Redux state

  // Set up React Hook Form with Zod schema resolver
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<RescueChargesFormValues>({
    resolver: zodResolver(rescueChargesSchema),
    defaultValues: {},
  });

  useEffect(() => {
    // Parse the URL to get the 'id' parameter
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    setServiceId(id);
  }, []);

  useEffect(() => {
    // Fetch all services when the component mounts
    dispatch(getAllServices());
  }, [dispatch]);

  useEffect(() => {
    // Set initial form values and charges when services are loaded
    if (services.length) {
      const PetRescueService = services.find(service => service.serviceName === "Pet Rescue");
      if (PetRescueService) {
        const fetchedCharges: RescueChargesFormValues = {
          FixedCharges: PetRescueService.fixedCharge || 0,
          HandlingAddOnCharge: PetRescueService.handlingAddOnCharge || 0,
          VetVisitAddOnCharge: PetRescueService.vetVisitAddOnCharge || 0,
          MinimumChargeIfNotFound: PetRescueService.minimumChargeIfNotFound || 0,
        };

        // Update form values and initial charges
        setInitialCharges(fetchedCharges);
        Object.entries(fetchedCharges).forEach(([key, value]) => setValue(key as keyof RescueChargesFormValues, value));
      } else {
        // Show error toast and redirect if service not found
        ToastAtTopRight.fire({
          icon: 'error',
          title: 'Failed to fetch Pet Rescue service',
        });
        router.push('/service-management/');
      }
    }
  }, [services, router, setValue]);

  // Compute total charges dynamically whenever form values change
  useEffect(() => {
    const calculateTotalCharges = () => {
      const total =
        (watch('FixedCharges') || 0) +
        (watch('HandlingAddOnCharge') || 0) +
        (watch('VetVisitAddOnCharge') || 0) +
        (watch('MinimumChargeIfNotFound') || 0);
      setTotalCharges(total);
    };

    // Subscribe to changes in form values
    const subscription = watch(() => calculateTotalCharges());
    return () => subscription.unsubscribe(); // Cleanup subscription on unmount
  }, [watch]);

  const onSubmit = async (data: RescueChargesFormValues) => {
    if (serviceId) {
      try {
        // Prepare service data to update
        const serviceData = {
          fixedCharge: data.FixedCharges,
          handlingAddOnCharge: data.HandlingAddOnCharge,
          vetVisitAddOnCharge: data.VetVisitAddOnCharge,
          minimumChargeIfNotFound: data.MinimumChargeIfNotFound,
        };

        // Dispatch update service action
        await dispatch(updateService({ id: serviceId, serviceData })).unwrap();
        ToastAtTopRight.fire({
          icon: 'success',
          title: 'Service updated successfully!',
        });
      } catch (error) {
        // Show error toast if update fails
        ToastAtTopRight.fire({
          icon: 'error',
          title: error || 'Failed to update Service',
        });
      }
    }
  };

  const handleCancel = () => {
    // Reset form fields to initial charges
    Object.entries(initialCharges).forEach(([key, value]) => setValue(key as keyof RescueChargesFormValues, value));
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
                            {key.replace(/([A-Z])/g, ' $1')} {/* Format camelCase to readable text */}
                          </label>
                          <Input
                            type="number"
                            {...register(key as keyof RescueChargesFormValues, { valueAsNumber: true })} // Register form field
                            className="mt-1 block w-20 border rounded p-2"
                          />
                          <span className="ml-2 font-bold">INR</span>
                          {errors[key as keyof RescueChargesFormValues] && (
                            <p className="text-red-500">{errors[key as keyof RescueChargesFormValues]?.message}</p>
                          )}
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>

              {/* Display Total Charges */}
              <div className="mt-4">
                <h3 className="text-2xl font-bold">
                  Total Charges: <span className="text-yellow-500">{totalCharges} INR</span> {/* Display total charges dynamically */}
                </h3>
              </div>

              <div className="flex justify-start mt-8">
                <button
                  className="bg-gray-200 text-gray-800 py-2 px-4 rounded mr-4"
                  onClick={handleCancel} // Reset changes to initial state
                >
                  Cancel
                </button>
                <button
                  className="bg-yellow-500 text-white py-2 px-4 rounded"
                  onClick={handleSubmit(onSubmit)} // Submit form data
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
