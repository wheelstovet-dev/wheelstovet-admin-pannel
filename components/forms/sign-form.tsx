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
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';
import { loginSuccess, setLoading } from '@/app/redux/slices/authslice';
import axios from 'axios';
import { setSessionStorageItem } from '@/utils/localStorage';
import { ToastAtTopRight } from '@/lib/sweetalert';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp';

// Schema Definitions
const loginSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' }),
  password: z.string().min(1, 'Password is required'),
});

const emailSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' }),
});

const otpSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits'),
});

const passwordSchema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

type LoginFormValue = z.infer<typeof loginSchema>;
type EmailFormValue = z.infer<typeof emailSchema>;
type OTPFormValue = z.infer<typeof otpSchema>;
type PasswordFormValue = z.infer<typeof passwordSchema>;

export default function UserAuthForm({ step,
  setStep,
}: {
  step: 'login' | 'email' | 'otp' | 'password';
  setStep: (step: 'login' | 'email' | 'otp' | 'password') => void;
}) {
  const router = useRouter();
  const dispatch = useDispatch();

  const { loading } = useSelector((state: RootState) => state.auth);
  // const [step, setStep] = useState<'login' | 'email' | 'otp' | 'password'>('login');
  const [email, setEmail] = useState('');

  // Forms Initialization
  const loginForm = useForm<LoginFormValue>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const emailForm = useForm<EmailFormValue>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: '' },
  });

  const otpForm = useForm<OTPFormValue>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: '' },
  });

  const passwordForm = useForm<PasswordFormValue>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { password: '' },
  });

  const onLogin = async (data: LoginFormValue) => {
    dispatch(setLoading(true));
    try {
      const response: any = await axios.post('http://15.206.246.97:3001/admin/adminLogin', {
        Email: data.email,
        Password: data.password,
      });
      if (response.data.statusCode === 200) {
        const token = response.data.data;
        setSessionStorageItem('token', token);
        dispatch(loginSuccess(token));
        router.push('/dashboard');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error: any) {
      ToastAtTopRight.fire({
        icon: 'error',
        title: error.response?.data?.fields?.message || 'Invalid credentials',
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  const onSendOTP = async (data: EmailFormValue) => {
    setStep('otp');
    dispatch(setLoading(true));
    try {
      const response = await axios.post('http://15.206.246.97:3001/admin/sendEmailOtp', {
        Email: data.email,
      });
      if (response.data.statusCode === 200) {
        setEmail(data.email);
        setStep('otp');
        ToastAtTopRight.fire({
          icon: 'success',
          title: 'OTP sent successfully!',
        });
      } else throw new Error('Failed to send OTP');
    } catch (error: any) {
      ToastAtTopRight.fire({
        icon: 'error',
        title: error.response?.data?.message || 'Error sending OTP',
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  const onVerifyOTP = async (data: OTPFormValue) => {
    setStep('password');
    dispatch(setLoading(true));
    try {
      const response = await axios.post('http://15.206.246.97:3001/admin/verifyEmailOtp', {
        Email: email,
        Otp: data.otp,
      });
      if (response.data.statusCode === 200) {
        setStep('password');
        ToastAtTopRight.fire({
          icon: 'success',
          title: 'OTP verified successfully!',
        });
      } else throw new Error('Invalid OTP');
    } catch (error: any) {
      ToastAtTopRight.fire({
        icon: 'error',
        title: error.response?.data?.message || 'Invalid OTP',
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  const onResetPassword = async (data: PasswordFormValue) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.post('http://15.206.246.97:3001/admin/resetPassword', {
        Email: email,
        NewPassword: data.password,
      });
      if (response.data.statusCode === 200) {
        ToastAtTopRight.fire({
          icon: 'success',
          title: 'Password reset successfully!',
        });
        setStep('login');
      } else throw new Error('Failed to reset password');
    } catch (error: any) {
      ToastAtTopRight.fire({
        icon: 'error',
        title: error.response?.data?.message || 'Error resetting password',
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  // const renderBackButton = () => (
  //   <button
  //     type="button"
  //     className="absolute top-4 left-4 text-blue-600 hover:underline"
  //     onClick={() => setStep((prev) => {
  //       if (prev === 'email') return 'login';
  //       if (prev === 'otp') return 'email';
  //       if (prev === 'password') return 'otp';
  //       return 'login';
  //     })}
  //   >
  //     &larr; Back
  //   </button>
  // );

  return (
    <div className="relative">
      {step !== 'login'}

      {step === 'login' && (
        <Form {...loginForm}>
          <form onSubmit={loginForm.handleSubmit(onLogin)}>
            <FormField
              control={loginForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email..." {...field} disabled={loading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={loginForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter your password" {...field} disabled={loading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={loading} type="submit" className="w-full mt-4 bg-customAmber hover:bg-amber-300 hover:text-black">
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => setStep('email')}
                className="text-sm text-amber-500 hover:underline"
              >
                Forgot Password?
              </button>
            </div>
          </form>
        </Form>
      )}

      {step === 'email' && (
        <Form {...emailForm}>
          <form onSubmit={emailForm.handleSubmit(onSendOTP)}>
            <FormField
              control={emailForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email..." {...field} disabled={loading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={loading} type="submit" className="w-full mt-4 bg-customAmber hover:bg-amber-300 hover:text-black">
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </Button>
          </form>
        </Form>
      )}

      {step === 'otp' && (
        <Form {...otpForm}>
          <form onSubmit={otpForm.handleSubmit(onVerifyOTP)}>
            <FormField
              control={otpForm.control}
              name="otp" // Ensure the field name is the same as in the schema
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup className="flex space-x-4">
                          <InputOTPSlot
                            index={0}
                            className="text-xl font-bold text-center border border-black"
                          />
                          <InputOTPSlot
                            index={1}
                            className="text-xl font-bold text-center border border-black"
                          />
                          <InputOTPSlot
                            index={2}
                            className="text-xl font-bold text-center border border-black"
                          />
                          <InputOTPSlot
                            index={3}
                            className="text-xl font-bold text-center border border-black"
                          />
                          <InputOTPSlot
                            index={4}
                            className="text-xl font-bold text-center border border-black"
                          />
                          <InputOTPSlot
                            index={5}
                            className="text-xl font-bold text-center border border-black"
                          />
                        </InputOTPGroup>
                      </InputOTP>
                      <FormMessage />
                    </>
                  </FormControl>
                </FormItem>
              )}
            />
            <Button disabled={loading} type="submit" className="w-full mt-4 bg-customAmber hover:bg-amber-300 hover:text-black">
              {loading ? 'Verifying OTP...' : 'Verify OTP'}
            </Button>
          </form>
        </Form>
      )}

      {step === 'password' && (
        <Form {...passwordForm}>
          <form onSubmit={passwordForm.handleSubmit(onResetPassword)}>
            <FormField
              control={passwordForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter new password"
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={loading} type="submit" className="w-full mt-4 bg-customAmber hover:bg-amber-300 hover:text-black">
              {loading ? 'Resetting Password...' : 'Reset Password'}
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
}
