'use client';

import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';


interface CaseFormType {
  initialData: any | null;
  isEnabled?: boolean;
}

const caseFormSchema = z.object({
  caseId: z.string().min(1, 'Case ID is required'),
  userId: z.string().min(1, 'User ID is required'),
  petName: z.string().min(1, 'Pet Name is required'),
  bookingAt: z.string().min(1, 'Booking At is required'),
  startDate: z.date({ required_error: 'Start Date is required.' }),
  timeSlot: z.string().min(1, 'Time Slot is required'),
  assignedEmployee: z.string().min(1, 'Assigned Employee is required'),
  currentStatus: z.string().min(1, 'Current Status is required'),
  paymentMethod: z.string().min(1, 'Payment Method is required'),
  paymentStatus: z.string().min(1, 'Payment Status is required'),
  document: z.any().optional()
});

export const CreateCaseForm: React.FC<CaseFormType> = ({ initialData, isEnabled }) => {
  const [loading, setLoading] = useState(false);

  const title = initialData && isEnabled ? "View Case" : initialData ? "Edit Case" : "Create New Case";
  const description = initialData && isEnabled
    ? "View the case details." : initialData ? "Edit the case details."
      : "To create a new case, fill in the required information.";

  const action = initialData ? 'Save changes' : 'Create';

  const form = useForm({
    resolver: zodResolver(caseFormSchema),
    defaultValues: initialData || {
      caseId: '',
      userId: '',
      petName: '',
      bookingAt: '',
      startDate: new Date(),
      timeSlot: '',
      assignedEmployee: '',
      currentStatus: '',
      paymentMethod: '',
      paymentStatus: '',
      document: null
    },
  });

  const { control, handleSubmit, watch, formState: { errors } } = form;

  const onSubmit: SubmitHandler<typeof caseFormSchema._type> = async (data) => {
    try {
      setLoading(true);
      if (initialData) {
        // Update existing case
      } else {
        // Create new case
      }
      // Refresh or redirect after submission
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Watch uploaded document
  const uploadedDocument = watch('document');

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-3">

            {/* Case ID */}
            <FormField
              control={control}
              name="caseId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Case ID</FormLabel>
                  <FormControl>
                    <Input type="text" disabled={isEnabled || loading} placeholder="Enter Case ID" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* User ID */}
            <FormField
              control={control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User ID</FormLabel>
                  <FormControl>
                    <Input type="text" disabled={isEnabled || loading} placeholder="Enter User ID" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Pet Name */}
            <FormField
              control={control}
              name="petName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pet Name</FormLabel>
                  <FormControl>
                    <Input type="text" disabled={isEnabled || loading} placeholder="Enter Pet Name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Booking At */}
            <FormField
              control={control}
              name="bookingAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Booking At</FormLabel>
                  <FormControl>
                    <Input type="text" disabled={isEnabled || loading} placeholder="Enter Booking Location" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Start Date */}
            <FormField
              control={control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
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
                          {field.value ? format(field.value, 'PPP') : 'Pick a date'}
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

            {/* Time Slot */}
            <FormField
              control={control}
              name="timeSlot"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time Slot</FormLabel>
                  <FormControl>
                    <Input type="text" disabled={isEnabled || loading} placeholder="Enter Time Slot" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Assigned Employee */}
            <FormField
              control={control}
              name="assignedEmployee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assigned Employee</FormLabel>
                  <FormControl>
                    <Input type="text" disabled={isEnabled || loading} placeholder="Enter Assigned Employee ID" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Current Status */}
            <FormField
              control={control}
              name="currentStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Status</FormLabel>
                  <FormControl>
                    <Select disabled={isEnabled || loading} onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Payment Method */}
            <FormField
              control={control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Method</FormLabel>
                  <FormControl>
                    <Select disabled={isEnabled || loading} onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Payment Method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="credit">Credit Card</SelectItem>
                        <SelectItem value="debit">Debit Card</SelectItem>
                        <SelectItem value="paypal">PayPal</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Payment Status */}
            <FormField
              control={control}
              name="paymentStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Status</FormLabel>
                  <FormControl>
                    <Select disabled={isEnabled || loading} onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Payment Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="unpaid">Unpaid</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Document Upload */}
            <FormField
              control={control}
              name="document" // Assuming document URL is stored in initialData.document
              render={() => (
                <FormItem>
                  <FormLabel>Document</FormLabel>
                  <FormControl>
                    {initialData?.document ? (
                      // Show the document link if the document URL is available
                      <img
                      src={initialData.document}
                      alt="Document"
                      className="w-auto h-20 object-cover"
                    />
                    ) : (
                      // Show placeholder text if no document is available
                      <p className="text-gray-500">No document available</p>
                    )}
                  </FormControl>
                </FormItem>
              )}
            />



          </div>
          <div className="flex justify-end">
            {(!isEnabled) && <Button
              type="submit"
              disabled={isEnabled || loading}
              className="ml-4 w-full"
            >
              {action}
            </Button>
            }
          </div>
        </form>
      </Form>
    </>
  );
};
