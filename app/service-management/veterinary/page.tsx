'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from '@/components/layout/main-layout';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Phone, MapPin, Trash2 } from 'lucide-react';
import { AppDispatch, RootState } from '@/app/redux/store';
import { ToastAtTopRight } from '@/lib/sweetalert';
import { createClinic, deleteClinic, getAllClinic, getAllServices, updateService } from '@/app/redux/actions/servicesAction';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import ProtectedRoute from '@/components/protectedRoute';


// Zod schema for validation
const chargeSchema = z.object({
  FixedCharges: z.number().nonnegative().min(0, "Fixed charge must be non-negative"),
  AdditionalPetCharge: z.number().nonnegative().min(0, "Additional pet charge must be non-negative"),
  PetHandlerCharge: z.number().nonnegative().min(0, "Pet handler charge must be non-negative"),
  HandlingAddOnCharge: z.number().nonnegative().min(0, "Handling add-on charge must be non-negative"),
  VetVisitAddOnCharge: z.number().nonnegative().min(0, "Vet visit add-on charge must be non-negative"),
  MinimumChargeIfNotFound: z.number().nonnegative().min(0, "Minimum charge if not found must be non-negative"),
  AdditionalTimeCharge: z.number().nonnegative().min(0, "Additional time charge must be non-negative"),
  FourHourCharge: z.number().nonnegative().min(0, "Four-hour charge must be non-negative"),
  TwelveHourCharge: z.number().nonnegative().min(0, "Twelve-hour charge must be non-negative"),
  TwentyFourHourCharge: z.number().nonnegative().min(0, "Twenty-four-hour charge must be non-negative"),
  IncludedTime: z.number().nonnegative().min(0, "Included time must be non-negative"),
});

// Zod schema for new clinic form
const clinicSchema = z.object({
  clinicName: z.string().min(1, "Clinic name is required"),
  ContactNo: z.string().length(10, "Contact number must be 10 digits"),
  address: z.string().min(1, "Address is required"),
});

type ChargeFormValues = z.infer<typeof chargeSchema>;
type ClinicFormValues = z.infer<typeof clinicSchema>;

export default function VeterinaryVisitPage() {
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
  const { clinics, services, loading } = useSelector((state: RootState) => state.service);

  // State to hold initial charge values
  const [initialChargeValues, setInitialChargeValues] = useState<ChargeFormValues>({} as ChargeFormValues);
  const [isFormVisible, setFormVisible] = useState(false);

  // React Hook Form setup for charges
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ChargeFormValues>({
    resolver: zodResolver(chargeSchema),
    defaultValues: {},
  });

  // React Hook Form setup for new clinic
  const { register: registerClinic, handleSubmit: handleClinicSubmit, formState: { errors: clinicErrors } } = useForm<ClinicFormValues>({
    resolver: zodResolver(clinicSchema),
    defaultValues: { clinicName: '', ContactNo: '', address: '' },
  });

  useEffect(() => {
    dispatch(getAllClinic());
    dispatch(getAllServices());
  }, [dispatch]);

  useEffect(() => {
    if (services.length) {
      const clinicService = services.find(service => service.serviceName === "Vet Visit");
      if (clinicService) {
        const fetchedCharges: ChargeFormValues = {
          FixedCharges: clinicService.fixedCharge || 0,
          AdditionalPetCharge: clinicService.additionalPetCharge || 0,
          PetHandlerCharge: clinicService.petHandlerCharge || 0,
          HandlingAddOnCharge: clinicService.handlingAddOnCharge || 0,
          VetVisitAddOnCharge: clinicService.vetVisitAddOnCharge || 0,
          MinimumChargeIfNotFound: clinicService.minimumChargeIfNotFound || 0,
          AdditionalTimeCharge: clinicService.AdditionalTimeCost || 0,
          FourHourCharge: clinicService.fourHourCharge || 0,
          TwelveHourCharge: clinicService.twelveHourCharge || 0,
          TwentyFourHourCharge: clinicService.twentyFourHourCharge || 0,
          IncludedTime: clinicService.includedTime || 0,
        };
        setInitialChargeValues(fetchedCharges);
        Object.entries(fetchedCharges).forEach(([key, value]) => setValue(key as keyof ChargeFormValues, value));
      } else {
        ToastAtTopRight.fire({
          icon: 'error',
          title: 'Failed to fetch Vet Visit service',
        });
        router.push('/service-management/');
      }
    }
  }, [services, router, setValue]);

  const onSubmitCharges = async (data: ChargeFormValues) => {
    if (serviceId) {
      try {
        const serviceData = {
          fixedCharge: data.FixedCharges,
          additionalPetCharge: data.AdditionalPetCharge,
          petHandlerCharge: data.PetHandlerCharge,
          handlingAddOnCharge: data.HandlingAddOnCharge,
          vetVisitAddOnCharge: data.VetVisitAddOnCharge,
          minimumChargeIfNotFound: data.MinimumChargeIfNotFound,
          additionalTimeCharge: data.AdditionalTimeCharge,
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

  const handleCancelCharges = () => {
    Object.entries(initialChargeValues).forEach(([key, value]) => setValue(key as keyof ChargeFormValues, value));
    ToastAtTopRight.fire({
      icon: 'info',
      title: 'Changes have been reset',
    });
  };
  
  const handleDelete = async (clinicId: string) => {
    try {
      await dispatch(deleteClinic(clinicId)).unwrap();
      ToastAtTopRight.fire({
        icon: 'success',
        title: 'Clinic deleted successfully!',
      });
      dispatch(getAllClinic()); // Refresh the clinics list
    } catch (error: any) {
      ToastAtTopRight.fire({
        icon: 'error',
        title: error || 'Failed to delete clinic',
      });
    }
  };

  const onSubmitClinic = async (data: ClinicFormValues) => {
    try {
      // Use unwrap to handle success and failure correctly
      await dispatch(createClinic(data)).unwrap();
      ToastAtTopRight.fire({
        icon: 'success',
        title: 'Clinic created successfully!',
      });
      setFormVisible(false);
      dispatch(getAllClinic());
    } catch (error:any) {
      // console.log(error.message.fields.message);
      ToastAtTopRight.fire({
        icon: 'warning',
        title: error?.message?.fields?.message || 'Failed to create clinic',
      });
    }
  };

  return (
    <ProtectedRoute>
    <MainLayout meta={{ title: 'Veterinary Visit Management' }}>
      <ScrollArea className="h-full">
        <div className="container mx-auto p-8">
          <h1 className="text-3xl font-bold mb-8">Veterinary Visit Management</h1>
          <div className="bg-white p-8 rounded-lg shadow-md mb-8">
            <h2 className="text-3xl font-bold mb-8">Veterinary Visit Charges</h2>
            <form onSubmit={handleSubmit(onSubmitCharges)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {loading ? (
                  <div className="flex justify-center py-8">
                    <span className="text-gray-500">Loading ...</span>
                  </div>
                ) : (
                  <>
                    {Object.keys(initialChargeValues).map((key) => (
                      <div key={key} className="flex items-center">
                        <label className="block font-bold text-gray-700 w-full">
                          {key.replace(/([A-Z])/g, ' $1')}
                        </label>
                        <input
                          type="number"
                          {...register(key as keyof ChargeFormValues, { valueAsNumber: true })}
                          className="mt-1 block w-20 border rounded p-2"
                        />
                        <span className="ml-2 font-bold">
                          {key === "IncludedTime" ? "minutes" : "INR"}
                        </span>
                        {errors[key as keyof ChargeFormValues] && (
                          <p className="text-red-500">{errors[key as keyof ChargeFormValues]?.message}</p>
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
                  onClick={handleCancelCharges}
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
              <h2 className="text-3xl font-bold">Associated Clinics</h2>
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
                  <th className="px-4 py-2 border-b border-r-2">Clinic Name</th>
                  <th className="px-4 py-2 border-b border-r-2">Contact No</th>
                  <th className="px-4 py-2 border-b border-r-2">Address</th>
                  <th className="px-4 py-2 border-b border-r-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {clinics.map((clinic, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-6 border-b text-center">{index + 1}</td>
                    <td className="px-4 py-6 border-b">{clinic.clinicName}</td>
                    <td className="px-4 py-6 border-b">
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-green-600" />
                        {clinic.ContactNo}
                      </div>
                    </td>
                    <td className="px-4 py-6 border-b">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-red-600" />
                        {clinic.address}
                      </div>
                    </td>
                    <td className="px-4 py-6 border-b">
                      <div className="flex items-center">
                        {/* <TrashIcon className="h-4 w-4 mr-2 text-red-600"/> */}
                        <Trash2 className=" mr-2 text-red-600 cursor-pointer" onClick={() => handleDelete(clinic._id)} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {isFormVisible && (
              <form onSubmit={handleClinicSubmit(onSubmitClinic)} className="mt-8 bg-gray-100 p-4 rounded-lg shadow-md">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex flex-col">
                    <label className="block font-bold text-gray-700">Clinic Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      {...registerClinic("clinicName")}
                      className="mt-1 block w-full border rounded p-2"
                    />
                    {clinicErrors.clinicName && <p className="text-red-500">{clinicErrors.clinicName.message}</p>}
                  </div>
                  <div className="flex flex-col">
                    <label className="block font-bold text-gray-700">Contact No <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      {...registerClinic("ContactNo")}
                      className="mt-1 block w-full border rounded p-2"
                      maxLength={10}
                    />
                    {clinicErrors.ContactNo && <p className="text-red-500">{clinicErrors.ContactNo.message}</p>}
                  </div>
                  <div className="flex flex-col">
                    <label className="block font-bold text-gray-700">Address <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      {...registerClinic("address")}
                      className="mt-1 block w-full border rounded p-2"
                    />
                    {clinicErrors.address && <p className="text-red-500">{clinicErrors.address.message}</p>}
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
    </ProtectedRoute>
  );
}
