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
      LocationDescription: '',

      
      planID: '',
      plan: '',
      Frequency: '',


      WalkFrequency: '',
      MorningTimeSlot: '',
      EveningTimeSlot: '',
      MorningDuration: '',
      EveningDuration: '',

      pickupLocation: '',
      includeSundays: '',
      status: '',
      TransactionStatus : '',

      asignedEmployeeName: '',
      asignedEmployeeMobileNo: '',
      asignedEmployeeEmail: '',

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
            userName: `${user.FirstName || 'Not Available'} ${user.LastName || 'Not Available'}`,
            email: user.Email || 'Not Available',
            mobileNumber: user.MobileNo || 'Not Available',
            LocationDescription: user.LocationDescription || 'Not Available',


            planID: subscription.Plan._id || 'Not Available',
            plan: subscription.Plan.Name || 'Not Available',
            Frequency: subscription.Plan.Frequency || 'Not Available',

            walkFrequency: subscription.WalkFrequency || 'Not Available',
            MorningTimeSlot: subscription.MorningTimeSlot || 'Not Available',
            EveningTimeSlot: subscription.EveningTimeSlot || 'Not Available',
            MorningDuration: subscription.MorningDuration || 'Not Available',
            EveningDuration: subscription.EveningDuration || 'Not Available',

            pickupLocation: subscription.PickupLocation || '',
            includeSundays: subscription.IncludeSundays ? 'Yes' : 'No',
            status: subscription.Status || '',
            TransactionStatus: subscription.TransactionStatus || 'Not Available',

            asignedEmployeeName: assignedEmp?.Name || 'Not Assigned',
            asignedEmployeeMobileNo: assignedEmp?.MobileNo || 'Not Available',
            asignedEmployeeEmail: assignedEmp?.Email || 'Not Available',
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
            <div className="p-4 bg-white rounded-xl shadow-md">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">User Details</h2>
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
            <FormField control={control} name="LocationDescription" render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter Location" {...field} disabled={currentMode === 'view'} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            </div>

           
            <div className="p-4 bg-white rounded-xl shadow-md">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">Plan Details</h2>
            <FormField control={control} name="planID" render={({ field }) => (
              <FormItem>
                <FormLabel>Plan ID</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter Plan ID" {...field} disabled={currentMode === 'view'} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={control} name="plan" render={({ field }) => (
              <FormItem>
                <FormLabel>Plan Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter Plan" {...field} disabled={currentMode === 'view'} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={control} name="Frequency" render={({ field }) => (
              <FormItem>
                <FormLabel>Frequency</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter Frequency" {...field} disabled={currentMode === 'view'} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            </div>

            <div className="p-4 bg-white rounded-xl shadow-md">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">Assigned Employee</h2>
            <FormField control={control} name="asignedEmployeeName" render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enteremployee name" {...field} disabled={currentMode === 'view'} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={control} name="asignedEmployeeMobileNo" render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile No</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter employee mobile number" {...field} disabled={currentMode === 'view'} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={control} name="asignedEmployeeEmail" render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter employee email" {...field} disabled={currentMode === 'view'} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            </div>

            <div className="p-4 bg-white rounded-xl shadow-md col-span-3">
              <h2 className="text-lg font-semibold text-gray-700 mb-3">Other Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={control} name="MorningTimeSlot" render={({ field }) => (
              <FormItem>
                <FormLabel>Morning Time Slot</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter Morning Time Slot" {...field} disabled={currentMode === 'view'} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={control} name="EveningTimeSlot" render={({ field }) => (
              <FormItem>
                <FormLabel>Evening Time Slot</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter Evening Time Slot" {...field} disabled={currentMode === 'view'} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={control} name="MorningDuration" render={({ field }) => (
              <FormItem>
                <FormLabel>Morning Duration (min)</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter Morning Duration" {...field} disabled={currentMode === 'view'} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={control} name="EveningDuration" render={({ field }) => (
              <FormItem>
                <FormLabel>Evening Duration (min)</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter Evening Duration" {...field} disabled={currentMode === 'view'} />
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


            <FormField control={control} name="status" render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter Status" {...field} disabled={currentMode === 'view'} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={control} name="TransactionStatus" render={({ field }) => (
              <FormItem>
                <FormLabel>Transaction Status</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter Transaction Status" {...field} disabled={currentMode === 'view'} />
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


              </div>
            </div>

            
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
