'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/provider/auth.provider';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';
import { loginSuccess, setLoading } from '@/app/redux/slices/authslice';
import axios from 'axios';
import { setSessionStorageItem } from '@/utils/localStorage';
import { ToastAtTopRight } from '@/lib/sweetalert';


const formSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' }),
  password: z.string().min(1, 'Password is required'),
});

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm() {
  const router = useRouter();
  const dispatch = useDispatch();

  // Use loading and authentication state from Redux store
  const { loading } = useSelector((state: RootState) => state.auth);
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: UserFormValue) => {
    dispatch(setLoading(true)); 
    try {
      const response: any = await axios.post("http://15.206.246.97:3001/admin/adminLogin", {
        Email: data.email,
        Password: data.password,
      });
      if (response.data.statusCode === 200) {
        const token = response.data.data;
        setSessionStorageItem('token', token);
        // Dispatch Redux action
        dispatch(loginSuccess(token)); 
        router.push('/dashboard'); // Redirect after successful login
      } else {
        dispatch(setLoading(false)); 
        throw new Error('Invalid credentials'); // Handle unsuccessful login attempts
      }
    } catch (error: any) {
      dispatch(setLoading(false)); 
      ToastAtTopRight.fire({
        icon: 'error',
        title: error.response?.data?.fields?.message || 'Invalid credentials',
      });
    } 
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your email..."
                  disabled={loading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  disabled={loading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex items-center justify-center mt-4">
                <Button disabled={loading} type='submit' className="w-full py-5 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-customAmber hover:bg-amber-300 hover:text-black">
                {loading ? 'Signing in...' : 'Sign in'}
                </Button>
              </div>
      </form>
    </Form>
  );
}
