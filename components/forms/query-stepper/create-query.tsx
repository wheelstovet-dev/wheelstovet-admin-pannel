import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface EnquiryFormType {
  initialData: any | null;
  isEnabled?: boolean;
}

const enquiryFormSchema = z.object({
  enquiryName: z.string().min(1, 'Enquiry Name is required'),
  preferredDate: z.array(z.date()).or(z.null()), // Use null to indicate "Not Available"
  preferredTime: z.string().min(1, 'Preferred Time is required'),
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  phoneNo: z.string().min(1, 'Phone number is required'),
  pickupAddress: z.string().min(1, 'Pickup Address is required'),
  RescueDropLocation: z.string().optional(),
  TakePetToVet: z.boolean(),
  DropCity: z.string().optional(),
  status: z.enum(['pending', 'resolved'], {
    required_error: 'Status is required',
  }),
  note: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const CreateEnquiryForm: React.FC<EnquiryFormType> = ({ initialData, isEnabled }) => {
  const [loading, setLoading] = useState(false);
  console.log(initialData);

  const title = initialData && isEnabled ? "View Enquiry" : initialData ? "Edit Enquiry" : "Create New Enquiry";
  // const description = initialData && isEnabled 
  //   ? "View the enquiry details." : initialData ? "Edit the enquiry details."
  //   : "To create a new enquiry, fill in the required information.";

  const action = initialData ? 'Save changes' : 'Create';

  const form = useForm({
    resolver: zodResolver(enquiryFormSchema),
    defaultValues: {
      enquiryName: initialData?.ServiceId?.serviceName || '',
      preferredDate: initialData?.PreferredDates?.length
      ? initialData.PreferredDates.map((date: string) => new Date(date))
      : null, // Use null to indicate "Not Available"
    
      preferredTime: initialData?.PreferredHours ,
      email: initialData?.UserId?.Email ,
      phoneNo: initialData?.UserId?.MobileNo ,
      pickupAddress: initialData?.PickupLocation ,
      status: initialData?.CurrentStatus || 'N/A',
      RescueDropLocation: initialData?.RescueDropLocation || '',
      TakePetToVet: initialData?.TakePetToVet ?? false,
      DropCity: initialData?.DropCity || '',
      createdAt: initialData?.CreatedAt ? new Date(initialData?.CreatedAt) : undefined,
      updatedAt: initialData?.UpdatedAt ? new Date(initialData?.UpdatedAt) : undefined,
    },
  });

  // Reset form when initialData arrives
  useEffect(() => {
    if (initialData) {
      form.reset({
        enquiryName: initialData?.ServiceId?.serviceName || '',
        preferredDate: initialData?.PreferredDates?.length
      ? initialData.PreferredDates.map((date: string) => new Date(date))
      : null, // Use null to indicate "Not Available"
        preferredTime: initialData?.PreferredHours ? `${initialData.PreferredHours}` : '',

        email: initialData?.UserId?.Email || '',
        phoneNo: initialData?.UserId?.MobileNo || '',
        pickupAddress: initialData?.PickupLocation || '',
        RescueDropLocation: initialData?.RescueDropLocation || 'N/A',
        TakePetToVet: initialData?.TakePetToVet ?? false,
        DropCity: initialData?.DropCity || 'N/A',
        status: initialData?.CurrentStatus || 'N/A',
        createdAt: initialData?.CreatedAt ? new Date(initialData?.CreatedAt) : undefined,
      updatedAt: initialData?.UpdatedAt ? new Date(initialData?.UpdatedAt) : undefined,
      });
    }
  }, [initialData, form.reset]);

  const { control, handleSubmit, formState: { errors } } = form;

  const onSubmit: SubmitHandler<typeof enquiryFormSchema._type> = async (data) => {
    try {
      setLoading(true);
      if (initialData) {
        // Update existing enquiry
      } else {
        // Create new enquiry
      }
      // Refresh or redirect after submission
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description="" />
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-3">
            
            {/* enquiry Name */}
            <FormField
              control={control}
              name="enquiryName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Enquired</FormLabel>
                  <FormControl>
                    <Input type="text" disabled={isEnabled || loading} placeholder="Enter Enquiry Name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Preferred Dates */}
              <FormField
                control={control}
                name="preferredDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Dates</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        disabled={isEnabled || loading}
                        placeholder="Enter Preferred Dates"
                        value={
                          field.value?.length
                            ? field.value.map((date: Date) => format(new Date(date), 'PPP')).join(', ')
                            : 'Not Available'
                        }
                        onChange={(e) => {
                          const dates = e.target.value
                            .split(',')
                            .map((date) => date.trim())
                            .filter((date) => date) // Remove empty values
                            .map((date) => new Date(date)); // Convert to Date objects
                          field.onChange(dates.length ? dates : null);
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />




            {/* Preferred Time */}
            <FormField
              control={control}
              name="preferredTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Time</FormLabel>
                  <FormControl>
                    <Input type="text" disabled={isEnabled || loading} placeholder="Enter Preferred Time" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Contact Email */}
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Email</FormLabel>
                  <FormControl>
                    <Input type="email" disabled={isEnabled || loading} placeholder="Enter Email" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Contact Phone No */}
            <FormField
              control={control}
              name="phoneNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input type="text" disabled={isEnabled || loading} placeholder="Enter Phone Number" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Pickup Address */}
            <FormField
              control={control}
              name="pickupAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pickup Address</FormLabel>
                  <FormControl>
                    <Input type="text" disabled={isEnabled || loading} placeholder="Enter Pickup Address" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* RescueDropLocation */}
            <FormField
              control={control}
              name="RescueDropLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rescue Drop Location</FormLabel>
                  <FormControl>
                    <Input type="text" disabled={isEnabled || loading} placeholder="Enter Rescue Drop Location" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            {/* TakePetToVet */}
            <FormField
              control={control}
              name="TakePetToVet"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Take Pet To Vet</FormLabel>
                  <FormControl>
                    <Input type="text" disabled={isEnabled || loading} placeholder="Enter Take Pet To Vet" value={field.value ? "Yes" : "No"}   />
                  </FormControl>
                </FormItem>
              )}
            />
            {/* DropCity */}
            <FormField
              control={control}
              name="DropCity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Drop City</FormLabel>
                  <FormControl>
                    <Input type="text" disabled={isEnabled || loading} placeholder="Enter Drop City" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Status */}
            <FormField
              control={control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select disabled={isEnabled || loading} onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Converted">Converted </SelectItem>
                        <SelectItem value="Rejected">Rejected </SelectItem>
                      </SelectContent>
                    </Select>
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

            {/* Note
            <FormField
              control={control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note</FormLabel>
                  <FormControl>
                    <Input type="text" disabled={isEnabled || loading} placeholder="No additional notes" {...field} />
                  </FormControl>
                </FormItem>
              )}
            /> */}
          </div>

          <div className="flex justify-end">
            {!isEnabled && (
              <Button
                type="submit"
                disabled={isEnabled || loading}
                className="ml-4 w-full"
              >
                {action}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </>
  );
};
