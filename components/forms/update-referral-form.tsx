'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch } from 'react-redux';
import { useRouter, useSearchParams } from 'next/navigation';
import { AppDispatch } from '@/app/redux/store';
import { setLoading } from '@/app/redux/slices/authslice';
import { updateReferralPercentage } from '@/app/redux/actions/referralAction';
import { ToastAtTopRight } from '@/lib/sweetalert';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

// Update the Zod schema to allow string types initially
const referralFormSchema = z.object({
  ReferredByPercentage: z.string().min(1, 'Referred By Percentage is required'),
  ReferredToPercentage: z.string().min(1, 'Referred To Percentage is required'),
  validForMonths: z.string().min(1, 'Valid for months is required'),
});

export const UpdateReferralForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const referralId = searchParams.get('id') || '';
  console.log(referralId);
  const [loading, setLoading] = useState(false);

  // Initialize form with default values from provided response data
  const form = useForm({
    resolver: zodResolver(referralFormSchema),
    defaultValues: {
      ReferredByPercentage: '20',  // Ensure these are strings
      ReferredToPercentage: '15',   // Ensure these are strings
      validForMonths: '3',          // Ensure these are strings
    },
  });

  const { control, handleSubmit, formState: { errors } } = form;

  const onSubmit: SubmitHandler<any> = async (data) => {
    console.log("Updating Referral Percentage:", data);
    setLoading(true);
    
    try {
      if (!referralId) {
        ToastAtTopRight.fire({
          icon: 'error',
          title: 'Referral ID is missing',
        });
        setLoading(false);
        return;
      }

      // Convert strings to numbers here before dispatching
      const parsedData = {
        ReferredByPercentage: parseFloat(data.ReferredByPercentage),
        ReferredToPercentage: parseFloat(data.ReferredToPercentage),
        validForMonths: parseInt(data.validForMonths, 10),
      };

      const resultAction: any = await dispatch(updateReferralPercentage({ id: referralId, referralData: parsedData }));

      if (resultAction.type.endsWith('/fulfilled')) {
        ToastAtTopRight.fire({
          icon: 'success',
          title: 'Referral Percentage updated successfully!',
        });
        router.push('/referral'); // Redirect after update
      } else {
        throw new Error(resultAction.payload.message);
      }
    } catch (error: any) {
      ToastAtTopRight.fire({
        icon: 'error',
        title: error.message || 'Failed to update referral percentage',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Update Referral Percentage</h2>

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormField control={control} name="ReferredByPercentage" render={({ field }) => (
            <FormItem>
              <FormLabel>Referred By Percentage</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage>{errors.ReferredByPercentage?.message}</FormMessage>
            </FormItem>
          )} />

          <FormField control={control} name="ReferredToPercentage" render={({ field }) => (
            <FormItem>
              <FormLabel>Referred To Percentage</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage>{errors.ReferredToPercentage?.message}</FormMessage>
            </FormItem>
          )} />

          <FormField control={control} name="validForMonths" render={({ field }) => (
            <FormItem>
              <FormLabel>Valid for Months</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage>{errors.validForMonths?.message}</FormMessage>
            </FormItem>
          )} />

          <Button type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Update Referral'}
          </Button>
        </form>
      </Form>
    </div>
  );
};
