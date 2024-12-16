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
  preferredDate: z.date({ required_error: 'Preferred Date is required.' }),
  preferredTime: z.string().min(1, 'Preferred Time is required'),
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  phoneNo: z.string().min(1, 'Phone number is required'),
  pickupAddress: z.string().min(1, 'Pickup Address is required'),
  status: z.enum(['pending', 'approve', 'reject'], {
    required_error: 'Status is required',
  }),
  note: z.string().optional()
});

export const CreateEnquiryForm: React.FC<EnquiryFormType> = ({ initialData, isEnabled }) => {
  const [loading, setLoading] = useState(false);
  console.log(initialData);

  const title = initialData && isEnabled ? "View Enquiry" : initialData ? "Edit Enquiry" : "Create New Enquiry";
  const description = initialData && isEnabled 
    ? "View the enquiry details." : initialData ? "Edit the enquiry details."
    : "To create a new enquiry, fill in the required information.";

  const action = initialData ? 'Save changes' : 'Create';

  const form = useForm({
    resolver: zodResolver(enquiryFormSchema),
    defaultValues: {
      enquiryName: `${initialData?.UserId?.FirstName } ${initialData?.UserId?.LastName }`.trim(),
      preferredDate: initialData?.PreferredDate ? new Date(initialData.PreferredDate) : new Date(),
      preferredTime: initialData?.PreferredHours ,
      email: initialData?.UserId?.Email ,
      phoneNo: initialData?.UserId?.MobileNo ,
      pickupAddress: initialData?.PickupLocation ,
      status: initialData?.Status || 'pending',
    },
  });

  // Reset form when initialData arrives
  useEffect(() => {
    if (initialData) {
      form.reset({
        enquiryName: `${initialData?.UserId?.FirstName || ''} ${initialData?.UserId?.LastName || ''}`.trim(),
        preferredDate: initialData?.PreferredDate ? new Date(initialData.PreferredDate) : new Date(),
        preferredTime: initialData?.PreferredHours || '',
        email: initialData?.UserId?.Email || '',
        phoneNo: initialData?.UserId?.MobileNo || '',
        pickupAddress: initialData?.PickupLocation || '',
        status: initialData?.Status || 'pending',
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
        <Heading title={title} description={description} />
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
                  <FormLabel>Enquiry Name</FormLabel>
                  <FormControl>
                    <Input type="text" disabled={isEnabled || loading} placeholder="Enter Enquiry Name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Preferred Date */}
            <FormField
              control={control}
              name="preferredDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            'w-full pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {/* {field.value ? format(field.value, 'PPP') : 'Pick a date'} */}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={isEnabled || loading} />
                    </PopoverContent>
                  </Popover>
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
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approve">Approve</SelectItem>
                        <SelectItem value="reject">Reject</SelectItem>
                      </SelectContent>
                    </Select>
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
