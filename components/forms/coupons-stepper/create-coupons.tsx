"use client";

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { createCoupon, getCouponByCode, updateCoupon } from '@/app/redux/actions/couponAction';
import { AppDispatch, RootState } from '@/app/redux/store';
import { ToastAtTopRight } from '@/lib/sweetalert';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

const couponFormSchema = z
  .object({
    CouponType: z.enum(['petTaxi', 'subscription']).optional(),
    CouponCode: z.string().min(1, 'Coupon Code is required'),
    DiscountType: z.enum(['price', 'percentage']),
    StartDate: z.date({ required_error: 'Starting Date is required.' }),
    EndDate: z.date({ required_error: 'Ending Date is required.' }),
    CouponVisibility: z.enum(['public', 'private']),
    NoOfTimesCanBeApplied: z
      .preprocess((val) => (val !== '' ? Number(val) : undefined), z.number().positive('Must be greater than zero')),
    Description: z.string().optional(),
    UsageLimit: z.string().optional(),
    UsageCount: z.string().optional(),
    Status: z.enum(['active', 'inactive']),
  })
  .and(
    z
      .object({
        // DiscountType: z.literal('Discount Percentage'),
        DiscountPercentage: z
          .preprocess((val) => (val !== '' ? Number(val) : undefined), z.number().positive().max(100)),
        DiscountPrice: z.undefined(),
      })
      .or(
        z.object({
          // DiscountType: z.literal('Discount Price'),
          DiscountPrice: z
            .preprocess((val) => (val !== '' ? Number(val) : undefined), z.number().positive()),
          DiscountPercentage: z.undefined(),
        })
      )
  );

export type CouponFormSchema = z.infer<typeof couponFormSchema>;

export const CreateCoupons: React.FC<{ mode?: 'create' | 'update' | 'view' }> = ({ mode: propMode }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlMode = searchParams.get('mode');
  const couponId = searchParams.get('id');
  const couponCode = searchParams.get('code');
  const dispatch = useDispatch<AppDispatch>();
  
  const [couponData, setCouponData] = useState({} as CouponFormSchema);
  console.log(couponData);
  const [loading, setLoading] = useState<boolean>(false);

  // const { selectedCoupons, loading } = useSelector((state: RootState) => state.coupons);
  const [currentMode, setCurrentMode] = useState<'create' | 'update' | 'view'>(
    (urlMode as 'create' | 'view' | 'update') || 'create'
  );

  const [discountType, setDiscountType] = useState(couponData?.DiscountType||'');

  useEffect(() => {
    if (urlMode) {
      setCurrentMode(urlMode as 'create' | 'view' | 'update');
    } else if (propMode) {
      setCurrentMode(propMode);
    }
  }, [urlMode, propMode]);

  useEffect(() => {
    if ((currentMode === 'view' || currentMode === 'update') && couponCode) {
      setLoading(true);
      dispatch(getCouponByCode(couponCode))
      .unwrap()
        .then((data) => {
          console.log(data);
          setCouponData(data.data);
          form.reset(data.data);
        })
        .catch((error) => {
          ToastAtTopRight.fire({
            icon: 'error',
            title: 'Error fetching Coupon data',
            text: error.message,
          });
        })
        .finally(() => setLoading(false));
    }
  }, [currentMode, couponCode, dispatch]);

  const form = useForm<CouponFormSchema>({
    resolver: zodResolver(couponFormSchema),
    mode: 'onChange',
    defaultValues: couponData ||{
      CouponType: undefined,
      CouponCode: '',
      DiscountType: undefined,
      DiscountPercentage: undefined,
      DiscountPrice: undefined,
      StartDate: undefined,
      EndDate: undefined,
      CouponVisibility: 'public',
      NoOfTimesCanBeApplied: undefined,
      Description: '',
      UsageLimit: '',
      UsageCount: '0',
      Status: 'active',
    },
  });

  const { handleSubmit, control, reset, formState: { errors } } = form;

  useEffect(() => {
    if (couponData && currentMode !== 'create') {
      reset({
        ...couponData,
        StartDate: couponData.StartDate ? new Date(couponData.StartDate) : undefined,
        EndDate: couponData.EndDate ? new Date(couponData.EndDate) : undefined,
      });
    }
  }, [couponData, currentMode, reset]);

  const onSubmit = async (data: CouponFormSchema) => {
    const formattedData = {
      ...data,
      StartDate: data.StartDate ? data.StartDate.toISOString() : null,
      EndDate: data.EndDate ? data.EndDate.toISOString() : null,
    };

    try {
      if (currentMode === 'create') {
        await dispatch(createCoupon(formattedData)).unwrap();
        ToastAtTopRight.fire({
          icon: 'success',
          title: 'Coupon created successfully!',
        });
      } else if (currentMode === 'update' && couponId) {
        await dispatch(updateCoupon({ id: couponId, couponData: formattedData })).unwrap();
        ToastAtTopRight.fire({
          icon: 'success',
          title: 'Coupon updated successfully!',
        });
      }
      router.push('/coupons-management');
    } catch (error: any) {
      ToastAtTopRight.fire({
        icon: 'error',
        title: 'Error processing coupon',
        text: error.message || 'Failed to process coupon',
      });
    }
  };

  

  return (
    <div>
      <Heading
        title={
          currentMode === 'create'
            ? 'Create Coupon'
            : currentMode === 'update'
              ? 'Update Coupon'
              : 'View Coupon'
        }
        description={
          currentMode === 'create'
            ? 'Fill out the form below to create a new coupon.'
            : currentMode === 'update'
              ? 'Modify the details of the coupon.'
              : 'View the details of the coupon.'
        }
      />
      <Separator />
      <Form {...form}>
      <form onSubmit={currentMode !== 'view' ? handleSubmit(onSubmit, (err) => console.log('Validation Errors:', err)) : undefined} className="space-y-8">
      <div className="w-full gap-8 md:grid md:grid-cols-3">
            {/* Coupon Type */}
            <FormField
              control={control}
              name="CouponType"
              render={({ field }) => (
                <FormField
                  control={control}
                  name="CouponType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Coupon Type</FormLabel>
                      <FormControl>
                        <Select
                          disabled={loading || currentMode === 'view'}
                          onValueChange={(value) => field.onChange(value || undefined)}
                          value={field.value ?? undefined}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Coupon Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="petTaxi">Pet Taxi</SelectItem>
                            <SelectItem value="subscription">Subscription</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage>{errors.CouponType?.message}</FormMessage>
                    </FormItem>
                  )}
                />

              )}
            />

            {/* Coupon Code */}
            <FormField
              control={control}
              name="CouponCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Coupon Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Coupon Code" {...field} disabled={loading || currentMode === 'view'} />
                  </FormControl>
                  <FormMessage>{errors.CouponCode?.message}</FormMessage>
                </FormItem>
              )}
            />

            {/* Discount Type */}
            <FormField
              control={control}
              name="DiscountType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount Type</FormLabel>
                  <FormControl>
                    <Select
                      disabled={loading || currentMode === 'view'}
                      onValueChange={(value) => {
                        setDiscountType(value as 'price' | 'percentage');
                        field.onChange(value);
                        console.log(value);
                      }}
                      value={field.value || undefined}  // Ensure a fallback default
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Discount Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="price">Discount Price</SelectItem>
                        <SelectItem value="percentage">Discount Percentage</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage>{errors.DiscountType?.message}</FormMessage>
                </FormItem>
              )}
            />


           {/* Discount Percentage (Only if Discount Type is Percentage) */}
          {(discountType == "percentage" || couponData?.DiscountType === 'percentage') && (
            <FormField
              control={control}
              name="DiscountPercentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount Percentage</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter Discount Percentage"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value === null ? undefined : Number(e.target.value))}
                      disabled={loading || currentMode === 'view'}
                    />
                  </FormControl>
                  <FormMessage>{errors.DiscountPercentage?.message}</FormMessage>
                </FormItem>
              )}
            />
          )}

            {/* Discount Price (Only if Discount Type is Price) */}
            {(discountType == "price" || couponData?.DiscountType === 'price') && (
              <FormField
                control={control}
                name="DiscountPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discount Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter Discount Price"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value === null ? undefined : Number(e.target.value))}
                        disabled={loading || currentMode === 'view'}
                      />
                    </FormControl>
                    <FormMessage>{errors.DiscountPrice?.message}</FormMessage>
                  </FormItem>
                )}
              />
            )}


            {/* Start Date */}
            <FormField
              control={control}
              name="StartDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                            disabled={loading || currentMode === 'view'}
                          >
                            {field.value ? (
                              format(field.value, "dd MMM yyyy")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={loading || currentMode === 'view'}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage>{errors.StartDate?.message}</FormMessage>
                </FormItem>
              )}
            />


            {/* End Date */}
            <FormField
              control={control}
              name="EndDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                            disabled={loading || currentMode === 'view'}
                          >
                            {field.value ? (
                              format(field.value, "dd MMM yyyy")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={loading || currentMode === 'view'}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage>{errors.EndDate?.message}</FormMessage>
                </FormItem>
              )}
            />


            {/* Coupon Visibility */}
            <FormField
              control={control}
              name="CouponVisibility"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Coupon Visibility</FormLabel>
                  <FormControl>
                    <Select
                      disabled={loading || currentMode === 'view'}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Visibility" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage>{errors.CouponVisibility?.message}</FormMessage>
                </FormItem>
              )}
            />

            {/* No of Times Can Be Applied */}
            <FormField
              control={control}
              name="NoOfTimesCanBeApplied"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Times Can Be Applied</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter No of Times"
                      {...field}
                      disabled={loading || currentMode === 'view'}
                    />
                  </FormControl>
                  <FormMessage>{errors.NoOfTimesCanBeApplied?.message}</FormMessage>
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={control}
              name="Description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter Description"
                      {...field}
                      disabled={loading || currentMode === 'view'}
                    />
                  </FormControl>
                  <FormMessage>{errors.Description?.message}</FormMessage>
                </FormItem>
              )}
            />

            {/* Usage Limit */}
            <FormField
              control={control}
              name="UsageLimit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Usage Limit</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter Usage Limit"
                      {...field}
                      disabled={loading || currentMode === 'view'}
                    />
                  </FormControl>
                  <FormMessage>{errors.UsageLimit?.message}</FormMessage>
                </FormItem>
              )}
            />

            {/* Usage Count */}
            <FormField
              control={control}
              name="UsageCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Usage Count</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter Usage Count"
                      {...field}
                      disabled={loading || currentMode === 'view'}
                    />
                  </FormControl>
                  <FormMessage>{errors.UsageCount?.message}</FormMessage>
                </FormItem>
              )}
            />

            {/* Status */}
            <FormField
              control={control}
              name="Status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select
                      disabled={loading || currentMode === 'view'}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage>{errors.Status?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>


          {currentMode !== 'view' && (
            <Button type="submit" disabled={loading} className="w-full">
              {currentMode === 'create' ? 'Create Coupon' : 'Update Coupon'}
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
};