'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from '@/components/layout/main-layout';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Phone, MapPin } from 'lucide-react';
import { getAllSalons, getAllServices, createSalon, updateService } from '@/app/redux/actions/servicesAction';
import { AppDispatch, RootState } from '@/app/redux/store';
import { ToastAtTopRight } from '@/lib/sweetalert';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Define Zod schema for salon charges validation
const chargesSchema = z.object({
  FixedCharges: z.number().nonnegative().min(0, "Fixed charge must be non-negative"),
  AdditionalPetCharge: z.number().nonnegative().min(0, "Additional pet charge must be non-negative"),
  PetHandlerCharge: z.number().nonnegative().min(0, "Pet handler charge must be non-negative"),
  HandlingAddOnCharge: z.number().nonnegative().min(0, "Handling add-on charge must be non-negative"),
  VetVisitAddOnCharge: z.number().nonnegative().min(0, "Vet visit add-on charge must be non-negative"),
  MinimumChargeIfNotFound: z.number().nonnegative().min(0, "Minimum charge if not found must be non-negative"),
  AdditionalTimeCost: z.number().nonnegative().min(0, "Additional time cost must be non-negative"),
  FourHourCharge: z.number().nonnegative().min(0, "Four-hour charge must be non-negative"),
  TwelveHourCharge: z.number().nonnegative().min(0, "Twelve-hour charge must be non-negative"),
  TwentyFourHourCharge: z.number().nonnegative().min(0, "Twenty-four-hour charge must be non-negative"),
  IncludedTime: z.number().nonnegative().min(0, "Included time must be non-negative"),
});

// Define Zod schema for the new salon form validation
const newSalonSchema = z.object({
  salonName: z.string().min(1, "Salon name is required"),
  ContactNo: z.string().length(10, "Contact number must be 10 digits"),
  address: z.string().min(1, "Address is required"),
});

type ChargesFormValues = z.infer<typeof chargesSchema>;
type NewSalonFormValues = z.infer<typeof newSalonSchema>;

export default function SalonVisitPage() {
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
  const { salons, services, loading } = useSelector((state: RootState) => state.service);

  // State to store initial charges
  const [initialCharges, setInitialCharges] = useState<ChargesFormValues>({} as ChargesFormValues);
  const [isFormVisible, setFormVisible] = useState(false);

  // React Hook Form setup for salon charges
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ChargesFormValues>({
    resolver: zodResolver(chargesSchema),
    defaultValues: {},
  });

  // React Hook Form setup for new salon creation
  const { register: registerSalon, handleSubmit: handleSalonSubmit, formState: { errors: salonErrors } } = useForm<NewSalonFormValues>({
    resolver: zodResolver(newSalonSchema),
    defaultValues: { salonName: '', ContactNo: '', address: '' },
  });

  useEffect(() => {
    dispatch(getAllSalons());
    dispatch(getAllServices());
  }, [dispatch]);

  useEffect(() => {
    if (services.length) {
      const salonService = services.find(service => service.serviceName === "Salon Visit");
      if (salonService) {
        const fetchedCharges: ChargesFormValues = {
          FixedCharges: salonService.fixedCharge || 0,
          AdditionalPetCharge: salonService.additionalPetCharge || 0,
          PetHandlerCharge: salonService.petHandlerCharge || 0,
          HandlingAddOnCharge: salonService.handlingAddOnCharge || 0,
          VetVisitAddOnCharge: salonService.vetVisitAddOnCharge || 0,
          MinimumChargeIfNotFound: salonService.minimumChargeIfNotFound || 0,
          AdditionalTimeCost: salonService.additionalTimeCharge || 0,
          FourHourCharge: salonService.fourHourCharge || 0,
          TwelveHourCharge: salonService.twelveHourCharge || 0,
          TwentyFourHourCharge: salonService.twentyFourHourCharge || 0,
          IncludedTime: salonService.includedTime || 0,
        };
        setInitialCharges(fetchedCharges);
        Object.entries(fetchedCharges).forEach(([key, value]) => setValue(key as keyof ChargesFormValues, value));
      } else {
        ToastAtTopRight.fire({
          icon: 'error',
          title: 'Failed to fetch Salon Visit service',
        });
        router.push('/service-management/');
      }
    }
  }, [services, router, setValue]);

  const onSubmitCharges = async(data: ChargesFormValues) => {
    if (serviceId) {
      try {
        const serviceData = {
          fixedCharge: data.FixedCharges,
          additionalPetCharge: data.AdditionalPetCharge,
          petHandlerCharge: data.PetHandlerCharge,
          handlingAddOnCharge: data.HandlingAddOnCharge,
          vetVisitAddOnCharge: data.VetVisitAddOnCharge,
          minimumChargeIfNotFound: data.MinimumChargeIfNotFound,
          additionalTimeCharge: data.AdditionalTimeCost,
          fourHourCharge: data.FourHourCharge,
          twelveHourCharge: data.TwelveHourCharge,
          twentyFourHourCharge: data.TwentyFourHourCharge,
          includedTime: data.IncludedTime,
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
    Object.entries(initialCharges).forEach(([key, value]) => setValue(key as keyof ChargesFormValues, value));
    ToastAtTopRight.fire({
      icon: 'info',
      title: 'Changes have been reset',
    });
  };

  const onSubmitSalon = async (data: NewSalonFormValues) => {
    try {
      await dispatch(createSalon(data));
      ToastAtTopRight.fire({
        icon: 'success',
        title: 'Salon created successfully!',
      });
      setFormVisible(false);
      dispatch(getAllSalons());
    } catch (error) {
      ToastAtTopRight.fire({
        icon: 'warning',
        title: 'Failed to create salon',
      });
    }
  };

  return (
    <MainLayout meta={{ title: 'Service Management' }}>
      <ScrollArea className="h-full">
        <div className="container mx-auto p-8">
          <h1 className="text-3xl font-bold mb-8">Service Management</h1>
          <div className="bg-white p-8 rounded-lg shadow-md mb-8">
            <h2 className="text-3xl font-bold mb-8">Salon Visit Charges</h2>
            <form onSubmit={handleSubmit(onSubmitCharges)} className="space-y-8">
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
                        <input
                          type="number"
                          {...register(key as keyof ChargesFormValues, { valueAsNumber: true })}
                          className="mt-1 block w-20 border rounded p-2"
                        />
                        <span className="ml-2 font-bold">
                          {key === "IncludedTime" ? "minutes" : "INR"}
                        </span>
                        {errors[key as keyof ChargesFormValues] && (
                          <p className="text-red-500">{errors[key as keyof ChargesFormValues]?.message}</p>
                        )}
                      </div>
                    ))}
                  </>
                )}
              </div>
              <div className="flex justify-start mt-8">
                <button
                  type="button"
                  className="bg-gray-200 text-gray-800 py-2 px-4 rounded mr-4"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-yellow-500 text-white py-2 px-4 rounded"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Associated Salon</h2>
              <button
                className="bg-yellow-500 text-white py-2 px-4 rounded"
                onClick={() => setFormVisible(true)}
              >
                + Add New
              </button>
            </div>
            <table className="min-w-full bg-white border border-gray-300 rounded-lg">
              <thead>
                <tr className="bg-yellow-500 text-left text-gray-600">
                  <th className="px-4 py-2 border-b border-r-2">Serial No</th>
                  <th className="px-4 py-2 border-b border-r-2">Salon Name</th>
                  <th className="px-4 py-2 border-b border-r-2">Contact No</th>
                  <th className="px-4 py-2 border-b border-r-2">Address</th>
                </tr>
              </thead>
              <tbody>
                {salons.map((salon, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-6 border-b text-center">{index + 1}</td>
                    <td className="px-4 py-6 border-b">{salon.salonName}</td>
                    <td className="px-4 py-6 border-b">{salon.ContactNo}</td>
                    <td className="px-4 py-6 border-b">{salon.address}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {isFormVisible && (
              <form onSubmit={handleSalonSubmit(onSubmitSalon)} className="mt-8 bg-gray-100 p-4 rounded-lg shadow-md">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex flex-col">
                    <label className="block font-bold text-gray-700">Salon Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      {...registerSalon("salonName")}
                      className="mt-1 block w-full border rounded p-2"
                    />
                    {salonErrors.salonName && <p className="text-red-500">{salonErrors.salonName.message}</p>}
                  </div>
                  <div className="flex flex-col">
                    <label className="block font-bold text-gray-700">Contact No <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      {...registerSalon("ContactNo")}
                      className="mt-1 block w-full border rounded p-2"
                      maxLength={10}
                    />
                    {salonErrors.ContactNo && <p className="text-red-500">{salonErrors.ContactNo.message}</p>}
                  </div>
                  <div className="flex flex-col">
                    <label className="block font-bold text-gray-700">Address <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      {...registerSalon("address")}
                      className="mt-1 block w-full border rounded p-2"
                    />
                    {salonErrors.address && <p className="text-red-500">{salonErrors.address.message}</p>}
                  </div>
                </div>
                <div className="flex justify-start mt-4">
                  <button
                    type="button"
                    className="bg-gray-200 text-gray-800 py-2 px-4 rounded mr-4"
                    onClick={() => setFormVisible(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-yellow-500 text-white py-2 px-4 rounded"
                  >
                    Create
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </ScrollArea>
    </MainLayout>
  );
}
