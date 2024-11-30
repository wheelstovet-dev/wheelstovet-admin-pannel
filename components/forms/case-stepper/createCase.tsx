'use client';

import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
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

// Define the Zod schema for the form
const caseFormSchema = z.object({
  userId: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().optional(),
  petId: z.string().optional(),
  serviceName: z.string().optional(),
  serviceType: z.string().optional(),
  currentStatus: z.string().optional(),
  pickupLocation: z.string().optional(),
  dropLocation: z.string().optional(),
  charges: z.number().optional(),
  paymentMode: z.string().optional(),
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
        userId: selectedCase.UserId?._id,
        firstName: selectedCase.UserId?.FirstName,
        lastName: selectedCase.UserId?.LastName,
        email: selectedCase.UserId?.Email,
        petId: selectedCase.PetId?._id,
        serviceName: selectedCase.ServiceId?.serviceName,
        serviceType: selectedCase.ServiceId?.serviceType,
        currentStatus: selectedCase.CurrentStatus,
        pickupLocation: selectedCase.PickUp,
        dropLocation: selectedCase.Drop,
        charges: selectedCase.Charges,
        paymentMode: selectedCase.PaymentMode,
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
      <div className="flex items-center justify-between">
        <Heading title="View Case" description="View the case details." />
      </div>
      <Separator />
      <Form {...form}>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-3">

            {/* User Information */}
            <FormField
              control={control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input type="text" disabled {...field} />
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
                    <Input type="text" disabled {...field} />
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
                    <Input type="email" disabled {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Service Information */}
            <FormField
              control={control}
              name="serviceName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Name</FormLabel>
                  <FormControl>
                    <Input type="text" disabled {...field} />
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
                    <Input type="text" disabled {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Case Details */}
            <FormField
              control={control}
              name="currentStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Status</FormLabel>
                  <FormControl>
                    <Input type="text" disabled {...field} />
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
                    <Input type="text" disabled {...field} />
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
                    <Input type="text" disabled {...field} />
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
                    <Input type="number" disabled {...field} />
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
                    <Input type="text" disabled {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Timestamps */}
            <FormField
              control={control}
              name="createdAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Created At</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      disabled
                      value={field.value ? format(new Date(field.value), 'PPP') : ''}
                    />
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
                    <Input
                      type="text"
                      disabled
                      value={field.value ? format(new Date(field.value), 'PPP') : ''}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </>
  );
};
