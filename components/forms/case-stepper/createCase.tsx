'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z, TypeOf } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { AppDispatch, RootState } from '@/app/redux/store';
import { useSearchParams } from 'next/navigation';
import { getCaseById } from '@/app/redux/actions/casesAction';
import Image from 'next/image';
import dog_loader from "@/public/images/Frame (2).png"

// Define the Zod schema for the form
const caseFormSchema = z.object({
  imageUrl: z.string().optional(),
  transactionId: z.string().optional(),
  transactionStatus: z.string().optional(),
  userId: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().optional(),
  serviceName: z.string().optional(),
  serviceType: z.string().optional(),
  currentStatus: z.string().optional(),
  pickupLocation: z.string().optional(),
  dropLocation: z.string().optional(),
  charges: z.number().optional(),
  paymentMode: z.string().optional(),
  timeSlot: z.string().optional(),
  emp: z.object({
    empName: z.string().optional(),
    mobileno: z.string().optional(),
  }).optional(),
  pet: z.object({
    name: z.string().optional(),
    species: z.string().optional(),
  }).optional(),

  clinic: z.object({
    clinicName: z.string().optional(),
    address: z.string().optional(),
  }).optional(),

  hostel: z.object({
    hostelName: z.string().optional(),
    address: z.string().optional(),
  }).optional(),

  salon: z.object({
    salonName: z.string().optional(),
    address: z.string().optional(),
  }).optional(),

  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// Define the TypeScript type from the Zod schema
type CaseFormSchemaType = TypeOf<typeof caseFormSchema>;

export const CreateCaseForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const searchParams = useSearchParams();
  const caseId = searchParams.get('id');

  const { selectedCase, loading } = useSelector((state: RootState) => state.caseManagement);

  const form = useForm<CaseFormSchemaType>({
    resolver: zodResolver(caseFormSchema),
    defaultValues: {},
  });

  const { control, reset } = form;

  useEffect(() => {
    if (caseId) {
      dispatch(getCaseById(caseId));
    }
  }, [caseId, dispatch]);

  useEffect(() => {
    if (selectedCase) {
      reset({
        imageUrl: selectedCase.ImageUrl,
        transactionId: selectedCase._id,
        transactionStatus: selectedCase.TransactionStatus,
        userId: selectedCase.UserId?._id,
        firstName: selectedCase.UserId?.FirstName,
        lastName: selectedCase.UserId?.LastName,
        email: selectedCase.UserId?.Email,
        serviceName: selectedCase.ServiceId?.serviceName,
        serviceType: selectedCase.ServiceId?.serviceType,
        currentStatus: selectedCase.CurrentStatus,
        pickupLocation: selectedCase.PickUp,
        dropLocation: selectedCase.Drop,
        charges: selectedCase.Charges ?? 0,
        paymentMode: selectedCase.PaymentMode,
        timeSlot: selectedCase.TimeSlot || '',
        emp: selectedCase.EmpId
        ? {
            empName: selectedCase.EmpId.Name,
            mobileno: selectedCase.EmpId.MobileNo,
          }
        : undefined,
        pet: selectedCase.PetId
        ? {
            name: selectedCase.PetId.Name,
            species: selectedCase.PetId.Species,
          }
        : undefined,

      clinic: selectedCase.ClinicId
        ? {
            clinicName: selectedCase.ClinicId.clinicName,
            address: selectedCase.ClinicId.address,
          }
        : undefined,

      hostel: selectedCase.HostelId
        ? {
            hostelName: selectedCase.HostelId.hostelName,
            address: selectedCase.HostelId.address,
          }
        : undefined,

      salon: selectedCase.SalonId
        ? {
            salonName: selectedCase.SalonId.salonName,
            address: selectedCase.SalonId.address,
          }
        : undefined,

        createdAt: selectedCase.CreatedAt ? new Date(selectedCase.CreatedAt) : undefined,
        updatedAt: selectedCase.UpdatedAt ? new Date(selectedCase.UpdatedAt) : undefined,
      });
    }
  }, [selectedCase, reset]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
  <Heading title="View Case" description="" />
</div>

<Separator />

<Form {...form}>
  <form className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-3">
      {/* Image Section */}
<div className="p-4 bg-white rounded-xl shadow-md">
  <FormField
    control={control}
    name="imageUrl"
    render={({ field }) => (
      <FormItem>
        <FormLabel className="text-lg font-semibold">Image</FormLabel>
        <FormControl>
          <Image
            src={field.value || dog_loader}
            alt="Transaction Image"
            width={200} // Increased width
            height={200} // Increased height
            className="w-48 h-48 object-cover rounded-md "
          />
        </FormControl>
      </FormItem>
    )}
  />
</div>


      {/* Transaction Section */}
      <div className="p-4 bg-white rounded-xl shadow-md">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">Transaction Details</h2>
        <FormField
          control={control}
          name="transactionId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transaction ID</FormLabel>
              <FormControl>
                <Input type="text" disabled className="border-gray-300" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="transactionStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transaction Status</FormLabel>
              <FormControl>
                <Input type="text" disabled className="border-gray-300" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      {/* User Information */}
      <div className="p-4 bg-white rounded-xl shadow-md">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">User Information</h2>
        <FormField
          control={control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input type="text" disabled className="border-gray-300" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input type="text" disabled className="border-gray-300" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" disabled className="border-gray-300" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      {/* Service Details */}
      <div className="p-4 bg-white rounded-xl shadow-md">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">Service Details</h2>
        <FormField
          control={control}
          name="serviceName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Name</FormLabel>
              <FormControl>
                <Input type="text" disabled className="border-gray-300" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="serviceType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Type</FormLabel>
              <FormControl>
                <Input type="text" disabled className="border-gray-300" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      {/* Employee Section */}
      {control._formValues.emp && (<div className="p-4 bg-white rounded-xl shadow-md">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">Employee Details</h2>
            <FormField
              control={control}
              name="emp.empName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employee Name</FormLabel>
                  <FormControl>
                    <Input type="text" disabled {...field} value={field.value} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="emp.mobileno"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile Number</FormLabel>
                  <FormControl>
                    <Input type="text" disabled {...field} value={field.value} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>)}

          {/* Pet details */}
          {control._formValues.pet && (<div className="p-4 bg-white rounded-xl shadow-md">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">Pet Details</h2>
            <FormField
              control={control}
              name="pet.name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pet Name</FormLabel>
                  <FormControl>
                    <Input type="text" disabled className="border-gray-300" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="pet.species"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pet Species</FormLabel>
                  <FormControl>
                    <Input type="text" disabled className="border-gray-300" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
)}
          
          {control._formValues.clinic && (
          <div className="p-4 bg-white rounded-xl shadow-md">
            {/* clinic details */}
            <h2 className="text-lg font-semibold text-gray-700 mb-3">Clinic Details</h2>
            <FormField
              control={control}
              name="clinic.clinicName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Clinic Name</FormLabel>
                  <FormControl>
                    <Input type="text" disabled className="border-gray-300" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="clinic.address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Clinic Address</FormLabel>
                  <FormControl>
                    <Input type="text" disabled className="border-gray-300" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            </div>)}
          
            {control._formValues.salon && (<div className="p-4 bg-white rounded-xl shadow-md">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">Salon Details</h2>
              {/* Salon Details */}
              <FormField
                control={control}
                name="salon.salonName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salon Name</FormLabel>
                    <FormControl>
                      <Input type="text" disabled className="border-gray-300" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="salon.address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salon Address</FormLabel>
                    <FormControl>
                      <Input type="text" disabled className="border-gray-300" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>)}
            

            {control._formValues.hostel && (<div className="p-4 bg-white rounded-xl shadow-md">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">Hostel Details</h2>
            {/* Hostel Details */}
            <FormField
              control={control}
              name="hostel.hostelName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hostel Name</FormLabel>
                  <FormControl>
                    <Input type="text" disabled className="border-gray-300" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="hostel.address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hostel Address</FormLabel>
                  <FormControl>
                    <Input type="text" disabled className="border-gray-300" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            </div>)}
            
      {/* Other Details */}
      <div className="p-4 bg-white rounded-xl shadow-md col-span-3">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">Other Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="currentStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Status</FormLabel>
                <FormControl>
                  <Input type="text" disabled className="border-gray-300" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="pickupLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pick-Up Location</FormLabel>
                <FormControl>
                  <Input type="text" disabled className="border-gray-300" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="dropLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Drop Location</FormLabel>
                <FormControl>
                  <Input type="text" disabled className="border-gray-300" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="charges"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Charges</FormLabel>
                <FormControl>
                  <Input type="number" disabled className="border-gray-300" {...field} value={field.value ?? 0} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="paymentMode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment Mode</FormLabel>
                <FormControl>
                  <Input type="text" disabled className="border-gray-300" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="timeSlot"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time Slot</FormLabel>
                <FormControl>
                  <Input type="text" disabled className="border-gray-300" {...field} value={field.value || ''} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
          control={control}
          name="createdAt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Created At</FormLabel>
              <FormControl>
                <Input type="text" disabled className="border-gray-300" value={field.value ? format(new Date(field.value), 'MM/dd/yyyy, h:mm:ss a') : ''} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="updatedAt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Updated At</FormLabel>
              <FormControl>
                <Input type="text" disabled className="border-gray-300" value={field.value ? format(new Date(field.value), 'MM/dd/yyyy, h:mm:ss a') : ''} />
              </FormControl>
            </FormItem>
          )}
        />
        </div>
      </div>
    </div>
  </form>
</Form>

    </>
  );
};
