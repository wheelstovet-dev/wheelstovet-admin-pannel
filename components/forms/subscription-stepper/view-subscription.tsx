'use client';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import { AppDispatch } from '@/app/redux/store';
import { ToastAtTopRight } from '@/lib/sweetalert';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { getSubscriptionById } from '@/app/redux/actions/subscriptionAction';

interface SubscriptionFormProps {
  mode?: 'view' | 'create';
}

export const ViewSubscriptionForm: React.FC<SubscriptionFormProps> = ({ mode: propMode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const searchParams = useSearchParams();
  const subscriptionId = searchParams.get('id');
  const urlMode = searchParams.get('mode') as 'view' | 'create';

  const [currentMode, setCurrentMode] = useState<'view' | 'create'>(propMode || urlMode || 'view');
  const [subscriptionData, setSubscriptionData] = useState<any>(null);
  const [loader, setLoader] = useState<boolean>(true);

  const form = useForm({
    defaultValues: subscriptionData || {
      userName: '',
      email: '',
      mobileNumber: '',
      plan: '',
      walkFrequency: '',
      selectedTime: '',
      pickupLocation: '',
      includeSundays: '',
      status: '',
      asignedEmployee: '',
    },
  });

  useEffect(() => {
    if (urlMode) {
      setCurrentMode(urlMode);
    } else if (propMode) {
      setCurrentMode(propMode);
    }
  }, [urlMode, propMode]);

  useEffect(() => {
    if (currentMode === 'view' && subscriptionId) {
      dispatch(getSubscriptionById(subscriptionId))
        .unwrap()
        .then((data) => {
          const subscription = data.data;

          // Check if AssignedEmp is null or not before accessing properties
          const user = subscription.UserId || {};
          const assignedEmp = subscription.AssignedEmp || {};
          setSubscriptionData(subscription);
          form.reset({
            userName: `${user.FirstName || ''} ${user.LastName || ''}`,
            email: user.Email || '',
            mobileNumber: user.MobileNo || '',
            plan: subscription.Plan.Name || '',
            walkFrequency: subscription.WalkFrequency || '',
            selectedTime: subscription.MorningDuration > 0 ? 'Morning' : 'Evening', // Adjust this based on your use case
            pickupLocation: subscription.PickupLocation || '',
            includeSundays: subscription.IncludeSundays ? 'Yes' : 'No',
            status: subscription.Status || '',
            asignedEmployee: assignedEmp?.Name || '',
          });
        })
        .catch((error) => {
          ToastAtTopRight.fire({
            icon: 'error',
            title: 'Error fetching subscription data',
            text: error.message,
          });
        })
        .finally(() => setLoader(false));
    } else {
      setLoader(false);
    }
  }, [currentMode, subscriptionId, dispatch, form]);

  const { control, handleSubmit, formState: { isSubmitting } } = form;

  const onSubmit: SubmitHandler<any> = async (data) => {
    // if (currentMode === 'create') {
    //   try {
    //     await dispatch(createSubscription(data)).unwrap();
    //     ToastAtTopRight.fire({
    //       icon: 'success',
    //       title: 'Subscription created successfully!',
    //     });
    //   } catch (error: any) {
    //     ToastAtTopRight.fire({
    //       icon: 'error',
    //       title: 'Error creating subscription',
    //       text: error.message,
    //     });
    //   }
    // }
  };

  if (loader) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">
        {currentMode === 'create' ? 'Create Subscription' : 'Subscription Details'}
      </h2>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-3">
            <FormField control={control} name="userName" render={({ field }) => (
              <FormItem>
                <FormLabel>User Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter Full Name" {...field} disabled={currentMode === 'view'} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Enter Email" {...field} disabled={currentMode === 'view'} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={control} name="mobileNumber" render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile Number</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter Mobile Number" {...field} disabled={currentMode === 'view'} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={control} name="plan" render={({ field }) => (
              <FormItem>
                <FormLabel>Plan</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter Plan" {...field} disabled={currentMode === 'view'} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={control} name="walkFrequency" render={({ field }) => (
              <FormItem>
                <FormLabel>Walk Frequency</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter Walk Frequency" {...field} disabled={currentMode === 'view'} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={control} name="selectedTime" render={({ field }) => (
              <FormItem>
                <FormLabel>Selected Time</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter Selected Time" {...field} disabled={currentMode === 'view'} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={control} name="pickupLocation" render={({ field }) => (
              <FormItem>
                <FormLabel>Pickup Location</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter Pickup Location" {...field} disabled={currentMode === 'view'} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={control} name="includeSundays" render={({ field }) => (
              <FormItem>
                <FormLabel>Include Sundays</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Include Sundays?" {...field} disabled={currentMode === 'view'} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={control} name="status" render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter Status" {...field} disabled={currentMode === 'view'} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={control} name="asignedEmployee" render={({ field }) => (
              <FormItem>
                <FormLabel>Asigned Employee</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter asigned employee name" {...field} disabled={currentMode === 'view'} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>

          {currentMode === 'create' && (
            <button type="submit" className="btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Subscription'}
            </button>
          )}
        </form>
      </Form>
    </div>
  );
};
