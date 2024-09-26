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

interface SubscriptionFormType {
  initialData: any | null;
  isEnabled?: boolean;
}

const subscriptionFormSchema = z.object({
  subscriptionId: z.string().min(1, 'Subscription ID is required'),
  userId: z.string().min(1, 'User ID is required'),
  subscriptionPlan: z.string().min(1, 'Subscription Plan is required'),
  frequency: z.string().min(1, 'Frequency is required'),
  employeeId: z.string().min(1, 'Employee ID is required'),
  subscriptionStartDate: z.date({ required_error: 'Start Date is required.' }),
  subscriptionEndDate: z.date({ required_error: 'End Date is required.' }),
  morningTimeSlot: z.string().min(1, 'Morning time slot is required'),
  eveningTimeSlot: z.string().min(1, 'Evening time slot is required'),
  status: z.string().min(1, 'Status is required'),
  activity: z.string().min(1, 'Activity is required'),
});

export const CreateSubscriptionForm: React.FC<SubscriptionFormType> = ({ initialData, isEnabled }) => {
  const [loading, setLoading] = useState(false);

  const title = initialData && isEnabled ? "View Subscription" : initialData ? "Edit Subscription" : "Create New Subscription";
  const description = initialData && isEnabled 
    ? "View the subscription details." : initialData ? "Edit the subscription details."
    : "To create a new subscription, fill in the required information.";

  const action = initialData ? 'Save changes' : 'Create';

  const form = useForm({
    resolver: zodResolver(subscriptionFormSchema),
    defaultValues: initialData || {
      subscriptionId: '',
      userId: '',
      subscriptionPlan: '',
      frequency: '',
      employeeId: '',
      subscriptionStartDate: new Date(),
      subscriptionEndDate: new Date(),
      morningTimeSlot: '',
      eveningTimeSlot: '',
      status: '',
      activity: '',
    },
  });

  const { control, handleSubmit, formState: { errors } } = form;

  const onSubmit: SubmitHandler<typeof subscriptionFormSchema._type> = async (data) => {
    try {
      setLoading(true);
      if (initialData) {
        // Update existing subscription
      } else {
        // Create new subscription
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
            
            {/* Subscription ID */}
            <FormField
              control={control}
              name="subscriptionId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subscription ID</FormLabel>
                  <FormControl>
                    <Input type="text" disabled={isEnabled || loading} placeholder="Enter Subscription ID" {...field} />
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

            {/* Subscription Plan */}
            <FormField
              control={control}
              name="subscriptionPlan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subscription Plan</FormLabel>
                  <FormControl>
                    <Input type="text" disabled={isEnabled || loading} placeholder="Enter Subscription Plan" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Frequency */}
            <FormField
              control={control}
              name="frequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Frequency</FormLabel>
                  <FormControl>
                    <Input type="text" disabled={isEnabled || loading} placeholder="Enter Frequency" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Employee ID */}
            <FormField
              control={control}
              name="employeeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employee ID</FormLabel>
                  <FormControl>
                    <Input type="text" disabled={isEnabled || loading} placeholder="Enter Employee ID" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Subscription Start Date */}
            <FormField
              control={control}
              name="subscriptionStartDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subscription Start Date</FormLabel>
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

            {/* Subscription End Date */}
            <FormField
              control={control}
              name="subscriptionEndDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subscription End Date</FormLabel>
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

            {/* Timeslot (Morning & Evening) */}
            <div className="md:col-span-3">
              <FormLabel>Time Slot</FormLabel>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Morning Time Slot */}
                <FormField
                  control={control}
                  name="morningTimeSlot"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Morning Time Slot</FormLabel>
                      <FormControl>
                        <Input type="text" disabled={isEnabled || loading} placeholder="Enter Morning Time Slot" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Evening Time Slot */}
                <FormField
                  control={control}
                  name="eveningTimeSlot"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Evening Time Slot</FormLabel>
                      <FormControl>
                        <Input type="text" disabled={isEnabled || loading} placeholder="Enter Evening Time Slot" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

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
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Activity */}
            <FormField
              control={control}
              name="activity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Activity</FormLabel>
                  <FormControl>
                    <Select disabled={isEnabled || loading} onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Activity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

          </div>

         {/* Form Actions */}
         <div className="flex justify-end">
          { (!isEnabled)  && <Button
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
