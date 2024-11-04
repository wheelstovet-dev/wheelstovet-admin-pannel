'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useDispatch } from 'react-redux';
import { useRouter, useSearchParams } from 'next/navigation';
import { AppDispatch } from '@/app/redux/store';
import { setLoading } from '@/app/redux/slices/authslice';
import { createAdmin, getAdminById, updateAdmin } from '@/app/redux/actions/adminAction';
import { ToastAtTopRight } from '@/lib/sweetalert';
import { useEffect, useState } from 'react';

// Admin form schema for validation
const adminFormSchema = z.object({
  Name: z.string().min(1, 'Name is required'),
  Email: z.string().email('Invalid email format').min(1, 'Email is required'),
  Phone: z.number().min(1, 'Phone is required'),
  Password: z.string().min(1, 'Password is required'),
});

interface AdminFormProps {
  mode?: 'create' | 'view' | 'update'; // Optional because we'll get this from URL if not passed
}

export const AdminForm: React.FC<AdminFormProps> = ({ mode: propMode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  
  const searchParams = useSearchParams();
  const urlMode = searchParams.get('mode'); // Get the mode from URL (view, update, create)
  const adminId:any = searchParams.get('id'); // Get the admin ID from URL

  // State to track current mode
  const [currentMode, setCurrentMode] = useState<'create' | 'view' | 'update'>(propMode || (urlMode as 'create' | 'view' | 'update') || 'create');
  const [adminData, setAdminData] = useState();
  const [loader, setLoader] = useState<boolean>(false); // Track loading state

  // Update currentMode dynamically whenever URL mode or prop mode changes
  useEffect(() => {
    if (urlMode) {
      setCurrentMode(urlMode as 'create' | 'view' | 'update'); // Set mode from URL if available
    } else if (propMode) {
      setCurrentMode(propMode); // Otherwise, use the prop mode
    }
  }, [urlMode, propMode]);

  // Fetch admin data using your API when in view or update mode
  useEffect(() => {
    if ((currentMode === 'view' || currentMode === 'update') && adminId) {
      setLoader(true);
      
      dispatch(getAdminById(adminId)) // Dispatch the thunk action
        .unwrap() // Unwrap the result to handle it like a promise
        .then((data) => {
          setAdminData(data.data); // Set the fetched data to state
          form.reset(data.data); // Reset form values with fetched data
        })
        .catch((error) => {
          ToastAtTopRight.fire({
            icon: 'error',
            title: 'Error fetching admin data',
            text: error.message, // Show the error message to give context
          });
        })
        .finally(() => setLoader(false));
    }
  }, [currentMode, adminId, dispatch]); // Add dispatch to dependency array
  

  const form = useForm({
    resolver: zodResolver(adminFormSchema),
    defaultValues: adminData || {
      Name: '',
      Email: '',
      Phone: '',
      Password: '',
    },
  });

  const { control, handleSubmit, formState: { errors } } = form;

  // Log the data to make sure updated values are captured
  const onSubmit: SubmitHandler<any> = async (data: any) => {
    // console.log("Form data to be submitted:", data); // Debug: Log form data
    
    dispatch(setLoading(true));

    try {
      let resultAction: any;

      // Conditionally call the create or update API
      if (currentMode === 'create') {
        resultAction = await dispatch(createAdmin(data));
      } else if (currentMode === 'update') {
        resultAction = await dispatch(updateAdmin({ id: adminId, adminData:data })); // Pass both id and data for update
      }

      if (resultAction.type.endsWith('/fulfilled')) {
        ToastAtTopRight.fire({
          icon: 'success',
          title: `Admin ${currentMode === 'create' ? 'created' : 'updated'} successfully!`,
        });
        router.push('/admin-management');
      } else {
        throw new Error(resultAction?.payload?.fields?.message);
      }
    } catch (error: any) {
      ToastAtTopRight.fire({
        icon: 'error',
        title: error.message || `Failed to ${currentMode} Admin`,
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  const renderErrorMessage = (error: any) => {
    if (!error) return null;
    if (typeof error === 'string') return error;
    if (error.message) return error.message;
    return null;
  };

  if (loader) return <div>Loading...</div>; // Show loading state while fetching data

  return (
    <div className="container mx-auto p-4">
      <Separator />
      
      <h2 className="text-2xl font-bold mb-4">
        {currentMode === 'create' ? 'Create Admin' : currentMode === 'view' ? 'View Admin' : 'Update Admin'}
      </h2>

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-3">
            {/* Name Field */}
            <FormField
              control={control}
              name="Name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter Name"
                      {...field}
                      disabled={currentMode === 'view'}  // Disable in view mode
                    />
                  </FormControl>
                  <FormMessage>{renderErrorMessage(errors.Name)}</FormMessage>
                </FormItem>
              )}
            />
          
            {/* Phone Field */}
            <FormField
              control={control}
              name="Phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter Phone"
                      {...field}
                      disabled={currentMode === 'view'}  // Disable in view mode
                    />
                  </FormControl>
                  <FormMessage>{renderErrorMessage(errors.Phone)}</FormMessage>
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={control}
              name="Email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter Email"
                      {...field}
                      disabled={currentMode === 'view'}  // Disable in view mode
                    />
                  </FormControl>
                  <FormMessage>{renderErrorMessage(errors.Email)}</FormMessage>
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={control}
              name="Password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter Password"
                      {...field}
                      disabled={currentMode === 'view' || currentMode === 'update'}  // Disable in view mode or update if password can't be changed
                    />
                  </FormControl>
                  <FormMessage>{renderErrorMessage(errors.Password)}</FormMessage>
                </FormItem>
              )}
            />
          </div>

          {/* Conditional Button */}
          {currentMode === 'create' && (
            <Button type="submit" disabled={form.formState.isSubmitting}>
              Create Admin
            </Button>
          )}

          {currentMode === 'update' && (
            <Button type="submit" disabled={form.formState.isSubmitting}>
              Update Admin
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
};
