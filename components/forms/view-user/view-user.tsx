'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ToastAtTopRight } from '@/lib/sweetalert';
import { getUserById } from '@/app/redux/actions/userAction';
import { AppDispatch } from '@/app/redux/store';
import { useSearchParams } from 'next/navigation';

// User form schema for validation (adjust fields as needed)
const userFormSchema = z.object({
    FirstName: z.string(),
    LastName: z.string(),
    Email: z.string(),
    Phone: z.number(),
    LocationDescription: z.string(),
    AccountStatus: z.boolean(),
    LoginType: z.string(),
    IsSubscribed: z.boolean(),
    CreatedAt: z.string(),
    UpdatedAt: z.string(),
});

export const ViewUser: React.FC<any> = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [userData, setUserData] = useState();
    const [loading, setLoading] = useState<boolean>(true); // Track loading state
    //   const userId: any = window.location.href.split('/').filter(Boolean).pop();
    const searchParams = useSearchParams();
    const userId: any = searchParams.get('id'); // Get the user ID from URL
    // console.log(userId);

    const form = useForm({
        resolver: zodResolver(userFormSchema),
        defaultValues: userData || {
            FirstName: '',
            LastName: '',
            Email: '',
            Phone: '',
            LocationDescription: '',
            AccountStatus: false,
            LoginType: '',
            IsSubscribed: false,
            CreatedAt: '',
            UpdatedAt: '',
        },
    });

    const { control } = form;

    // Fetch user data when component mounts
    useEffect(() => {
        setLoading(true);
        dispatch(getUserById(userId))
            .unwrap() // Unwrap the result to handle it like a promise
            .then((data: any) => {
                // console.log(data);
                setUserData(data.data); // Set the fetched data to state
                form.reset(data.data); // Reset form values with fetched data
            })
            .catch((error: any) => {
                ToastAtTopRight.fire({
                    icon: 'error',
                    title: 'Error fetching user data',
                    text: error.message,
                });
            })
            .finally(() => setLoading(false));
    }, [userId, dispatch, form]);

    if (loading) return <div>Loading...</div>; // Display loading indicator

    return (
        <div className="container mx-auto p-4">
            <Separator />

            <h2 className="text-2xl font-bold mb-4">View User</h2>

            <Form {...form}>
                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-3">
                        {/* First Name */}
                        <FormField
                            control={control}
                            name="FirstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="First Name" {...field} disabled />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {/* Last Name */}
                        <FormField
                            control={control}
                            name="LastName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Last Name" {...field} disabled />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {/* Email */}
                        <FormField
                            control={control}
                            name="Email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="Email" {...field} disabled />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {/* Phone */}
                        <FormField
                            control={control}
                            name="Phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Phone" {...field} disabled />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {/* Location */}
                        <FormField
                            control={control}
                            name="LocationDescription"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Location</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Location" {...field} disabled />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {/* Account Status */}
                        <FormField
                            control={control}
                            name="AccountStatus"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Account Status</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Account Status" value={field.value ? 'Active' : 'Inactive'} disabled />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {/* Login Type */}
                        <FormField
                            control={control}
                            name="LoginType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Login Type</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Login Type" {...field} disabled />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {/* Subscription Status */}
                        <FormField
                            control={control}
                            name="IsSubscribed"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Subscription Status</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Subscription Status" value={field.value ? 'Subscribed' : 'Not Subscribed'} disabled />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {/* Created At */}
                        <FormField
                            control={control}
                            name="CreatedAt"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Account Created At</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Created At" value={new Date(field.value).toLocaleString()} disabled />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {/* Updated At */}
                        <FormField
                            control={control}
                            name="UpdatedAt"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Last Updated At</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Updated At" value={new Date(field.value).toLocaleString()} disabled />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                </form>
            </Form>
        </div>
    );
};
