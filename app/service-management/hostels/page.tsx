'use client';

import { useEffect, useState } from 'react';
import MainLayout from '@/components/layout/main-layout';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Phone, MapPin, Trash2, Edit } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/redux/store';
import { getAllServices, updateService, createHostel, getAllHostels, deleteHostel } from '@/app/redux/actions/servicesAction';
import { ToastAtTopRight } from '@/lib/sweetalert';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import ProtectedRoute from '@/components/protectedRoute';
import apiCall from '@/lib/axios';

// Define Zod schema for charge validation
const chargeSchema = z.object({
  FixedCharges: z.number().nonnegative().min(0, "Fixed charge must be non-negative"),
  AdditionalPetCharge: z.number().nonnegative().min(0, "Additional pet charge must be non-negative"),
  AdditionalDistanceCharge: z.number().nonnegative().min(0, "Additional distance charge must be non-negative"),
  // PetHandlerCharge: z.number().nonnegative().min(0, "Pet handler charge must be non-negative"),
  HandlingAddOnCharge: z.number().nonnegative().min(0, "Handling add-on charge must be non-negative"),
  // VetVisitAddOnCharge: z.number().nonnegative().min(0, "Vet visit add-on charge must be non-negative"),
  // MinimumChargeIfNotFound: z.number().nonnegative().min(0, "Minimum charge if not found must be non-negative"),
  // AdditionalTimeCost: z.number().nonnegative().min(0, "Additional time cost must be non-negative"),
  // FourHourCharge: z.number().nonnegative().min(0, "Four-hour charge must be non-negative"),
  // TwelveHourCharge: z.number().nonnegative().min(0, "Twelve-hour charge must be non-negative"),
  // TwentyFourHourCharge: z.number().nonnegative().min(0, "Twenty-four-hour charge must be non-negative"),
  // IncludedTime: z.number().nonnegative().min(0, "Included time must be non-negative"),
  IncludedDistance: z.number().nonnegative().min(0, "Included distance must be non-negative"),
});

// Define Zod schema for the new hostel form validation
const newHostelSchema = z.object({
  hostelName: z.string().min(1, "Hostel name is required"),
  // ContactNo: z.string()
  //   .trim()
  //   .regex(/^\d{10}$/, "Contact number must be exactly 10 digits and numeric"),
  ContactNo: z.preprocess(
    (val) => {
      if (typeof val === "number") {
        return val.toString(); // Convert number to string for regex validation
      }
      return val;
    },
    z.string()
      .regex(/^\d{10}$/, "Contact number must be exactly 10 digits and numeric")
      .transform((val) => Number(val)) // Convert back to number after validation
  ),
  address: z.string().min(1, "Address is required"),
});

type ChargeFormValues = z.infer<typeof chargeSchema>;
type NewHostelFormValues = z.infer<typeof newHostelSchema>;

export default function HostelVisitPage() {
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
  const { services, hostels, loading } = useSelector((state: RootState) => state.service);
  const [initialChargeValues, setInitialChargeValues] = useState<ChargeFormValues>({} as ChargeFormValues);
  const [isFormVisible, setFormVisible] = useState(false);

  const [editMode, setEditMode] = useState(false);
  const [editingHostelId, setEditingHostelId] = useState<string | null>(null);


  // React Hook Form setup for hostel charges
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ChargeFormValues>({
    resolver: zodResolver(chargeSchema),
    defaultValues: {},
  });

  // React Hook Form setup for new hostel creation
  const { register: registerHostel, reset, handleSubmit: handleHostelSubmit, formState: { errors: hostelErrors } } = useForm<NewHostelFormValues>({
    resolver: zodResolver(newHostelSchema),
    defaultValues: { hostelName: '', ContactNo: undefined, address: '' },
  });

  useEffect(() => {
    dispatch(getAllServices());
    dispatch(getAllHostels());
  }, [dispatch]);

  useEffect(() => {
    if (services.length) {
      const HostelService = services.find(service => service.serviceName === "Hostel");
      if (HostelService) {
        const initialCharges: ChargeFormValues = {
          FixedCharges: HostelService.fixedCharge || 0,
          AdditionalPetCharge: HostelService.additionalPetCharge || 0,
          AdditionalDistanceCharge: HostelService.additionalDistanceCharge || 0,
          // PetHandlerCharge: HostelService.petHandlerCharge || 0,
          HandlingAddOnCharge: HostelService.handlingAddOnCharge || 0,
          // VetVisitAddOnCharge: HostelService.vetVisitAddOnCharge || 0,
          // MinimumChargeIfNotFound: HostelService.minimumChargeIfNotFound || 0,
          // AdditionalTimeCost: HostelService.additionalTimeCharge || 0,
          // FourHourCharge: HostelService.fourHourCharge || 0,
          // TwelveHourCharge: HostelService.twelveHourCharge || 0,
          // TwentyFourHourCharge: HostelService.twentyFourHourCharge || 0,
          // IncludedTime: HostelService.includedTime || 0,
          IncludedDistance: HostelService.includedDistance || 0,
        };
        setInitialChargeValues(initialCharges);
        Object.entries(initialCharges).forEach(([key, value]) => setValue(key as keyof ChargeFormValues, value));
      } else {
        ToastAtTopRight.fire({
          icon: 'error',
          title: 'Failed to fetch Hostel service',
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
          additionalDistanceCharge: data.AdditionalDistanceCharge,
          // petHandlerCharge: data.PetHandlerCharge,
          handlingAddOnCharge: data.HandlingAddOnCharge,
          // vetVisitAddOnCharge: data.VetVisitAddOnCharge,
          // minimumChargeIfNotFound: data.MinimumChargeIfNotFound,
          // additionalTimeCharge: data.AdditionalTimeCost,
          // fourHourCharge: data.FourHourCharge,
          // twelveHourCharge: data.TwelveHourCharge,
          // twentyFourHourCharge: data.TwentyFourHourCharge,
          // includedTime: data.IncludedTime,
          includedDistance: data.IncludedDistance,
        };

        await dispatch(updateService({ id: serviceId, serviceData })).unwrap();
        ToastAtTopRight.fire({
          icon: 'success',
          title: 'Service updated successfully!',
        });
      } catch (error) {
        ToastAtTopRight.fire({
          icon: 'error',
          title: error || 'Failed to update Service',
        });
      }
    }
  };

  const handleChargesCancel = () => {
    Object.entries(initialChargeValues).forEach(([key, value]) => setValue(key as keyof ChargeFormValues, value));
    ToastAtTopRight.fire({
      icon: 'info',
      title: 'Changes have been reset',
    });
  };

  const handleDelete = async (hostelId: string) => {
    try {
      await dispatch(deleteHostel(hostelId)).unwrap();
      ToastAtTopRight.fire({
        icon: 'success',
        title: 'Hostel deleted successfully!',
      });
      dispatch(getAllHostels()); // Refresh the hostels list
    } catch (error: any) {
      ToastAtTopRight.fire({
        icon: 'error',
        title: error || 'Failed to delete hostel',
      });
    }
  };


  const onSubmitHostel = async (data: NewHostelFormValues) => {
    try {
      // console.log(data);
      if (editMode && editingHostelId) {
        // await dispatch(updateHostel({ id: editingHostelId, data })).unwrap();
        await apiCall('PUT', `admin/hostel/${editingHostelId}`,data);
        ToastAtTopRight.fire({ icon: 'success', title: 'Hostel updated successfully!' });
      } else {
        await dispatch(createHostel(data)).unwrap();
        ToastAtTopRight.fire({
          icon: 'success',
          title: 'Hostel created successfully!',
        });
      }
      setFormVisible(false);
      setEditMode(false);
      setEditingHostelId(null);
      reset();
      dispatch(getAllHostels());
    } catch (error: any) {
      ToastAtTopRight.fire({
        icon: 'error',
        title: error?.message || 'Failed to process hostel request',
      });
    }
  };

  const handleEdit = (hostel: any) => {
    reset({
      hostelName: hostel.hostelName,
      ContactNo: hostel.ContactNo,
      address: hostel.address,
    });
    setEditingHostelId(hostel._id);
    setEditMode(true);
    setFormVisible(true);
  };


  const handleCancel = () => {
    setFormVisible(false);
    setEditMode(false);
    setEditingHostelId(null);
    reset();
  };


  return (
    <ProtectedRoute>
      <MainLayout meta={{ title: 'Hostel Service Management' }}>
        <ScrollArea className="h-full">
          <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-8">Hostel Service Management</h1>
            <div className="bg-white p-8 rounded-lg shadow-md mb-8">
              <h2 className="text-3xl font-bold mb-8">Hostel Visit Charges</h2>
              <form onSubmit={handleSubmit(onSubmitCharges)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {loading ? (
                    <div className="flex justify-center py-8">
                      <span className="text-gray-500">Loading ...</span>
                    </div>
                  ) : (
                    <>
                      {Object.keys(chargeSchema.shape).map((key) => (
                        <div key={key} className="flex items-center">
                          <label className="block font-bold text-gray-700 w-full">
                            {key.replace(/([A-Z])/g, ' $1')} (<span className="ml-2 font-bold">
                              {key === "IncludedTime" ? "minutes" : key === "IncludedDistance" ? "KM" : "INR"}

                          </span> )
                          </label>
                          <input
                            type="number"
                            {...register(key as keyof ChargeFormValues, { valueAsNumber: true })}
                            className="mt-1 block w-20 border rounded p-2"
                          />
                
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
                    onClick={handleChargesCancel}
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
                <h2 className="text-3xl font-bold">Associated Hostels</h2>
                <button
                  className="bg-yellow-500 text-white py-2 px-4 rounded"
                  onClick={() => { setFormVisible(true); setEditMode(false); reset(); }}
                >
                  + Add New
                </button>
              </div>
              <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                <thead>
                  <tr className="bg-yellow-500 text-left text-gray-600">
                    <th className="px-4 py-2 border-b border-r-2">Serial No</th>
                    <th className="px-4 py-2 border-b border-r-2">Hostel Name</th>
                    <th className="px-4 py-2 border-b border-r-2">Contact No</th>
                    <th className="px-4 py-2 border-b border-r-2">Address</th>
                    <th className="px-4 py-2 border-b border-r-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {hostels.map((hostel, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-6 border-b text-center">{index + 1}</td>
                      <td className="px-4 py-6 border-b">{hostel.hostelName}</td>
                      <td className="px-4 py-6 border-b">{hostel.ContactNo}</td>
                      <td className="px-4 py-6 border-b">{hostel.address}</td>
                      <td className="px-4 py-6 border-b">
                        <div className="flex items-center gap-4 justify-center">
                          {/* <TrashIcon className="h-4 w-4 mr-2 text-red-600"/> */}
                          <Edit className="text-yellow-500 cursor-pointer" onClick={() => handleEdit(hostel)} />
                          <Trash2 className=" mr-2 text-red-600 cursor-pointer" onClick={() => handleDelete(hostel._id)} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {isFormVisible && (
                <form onSubmit={handleHostelSubmit(onSubmitHostel)} className="mt-8 bg-gray-100 p-4 rounded-lg shadow-md">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="flex flex-col">
                      <label className="block font-bold text-gray-700">Hostel Name <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        {...registerHostel("hostelName")}
                        className="mt-1 block w-full border rounded p-2"
                      />
                      {hostelErrors.hostelName && <p className="text-red-500">{hostelErrors.hostelName.message}</p>}
                    </div>
                    <div className="flex flex-col">
                      <label className="block font-bold text-gray-700">Contact No <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        {...registerHostel("ContactNo")}
                        className="mt-1 block w-full border rounded p-2"
                        maxLength={13} // Assuming the format is '+91 XXXXXXXXXX'
                      />
                      {hostelErrors.ContactNo && <p className="text-red-500">{hostelErrors.ContactNo.message}</p>}
                    </div>
                    <div className="flex flex-col">
                      <label className="block font-bold text-gray-700">Address <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        {...registerHostel("address")}
                        className="mt-1 block w-full border rounded p-2"
                      />
                      {hostelErrors.address && <p className="text-red-500">{hostelErrors.address.message}</p>}
                    </div>
                  </div>
                  <div className="flex justify-start mt-4">
                    <button
                      type="button"
                      className="bg-gray-200 text-gray-800 py-2 px-4 rounded mr-4"
                      onClick={() => {
                        if (editMode) {
                          handleCancel();
                        } else {
                          setFormVisible(false);
                        }
                      }}
                    >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-yellow-500 text-white py-2 px-4 rounded"
                  >
                    {editMode ? 'Update' : 'Create'}
                  </button>
                </div>
                </form>
              )}
          </div>
        </div>
      </ScrollArea>
    </MainLayout>
    </ProtectedRoute >
  );
}
