'use client'
import { Metadata } from 'next';
import UserAuthForm from '@/components/forms/sign-form';
import '@/app/globals.css';
import { useState } from 'react';

// export const metadata: Metadata = {
//   title: 'Authentication',
//   description: 'Authentication forms built using the components.',
// };

export default function Page() {

  const [step, setStep] = useState<'login' | 'email' | 'otp' | 'password'>('login');

  const goBack = () => {
    setStep((prev) => {
      if (prev === 'email') return 'login';
      if (prev === 'otp') return 'email';
      if (prev === 'password') return 'otp';
      return 'login';
    });
  };
  
  return (
    <div className="relative min-h-screen flex flex-col md:grid md:grid-cols-5">
      <div className="relative hidden md:flex flex-col items-start justify-center md:col-span-2 p-5">
        <div className="absolute inset-0 bg-cover bg-center transform scale-10">
          <img src="/images/Mask group.png" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 text-left">
          <p className="text-4xl font-bold text-black">HEY HOOOMANS</p>
          <p className="text-lg text-white mt-2">Get yourself Register to Pamper your babies</p>
        </div>
      </div>
      
      <div className="flex items-center justify-center bg-gray-100 relative md:col-span-3">
        <div className="relative p-4 lg:p-12 rounded-custom bg-white max-w-lg w-full">
        {step !== 'login' && (
                <button
                  type="button"
                  className="text-sm text-amber-500 hover:underline flex items-center gap-1"
                  onClick={goBack}
                >
                  <span>&larr;</span> Back
                  
                </button>
              )}
          <div className="flex items-center justify-center mt-2 mb-2">
            <img src="/images/Group 20.png" alt="Logo" className="h-14 w-13" />
          </div>
          <img src="/images/palmm.png" className="absolute top-56 left-0 h-11 w-11 m-4" />

          <div className="relative p-4 lg:p-12 rounded-custom bg-white max-w-lg w-full">
            <div className="w-full space-y-1 relative">
            
              <div className="text-left">
                <h1 className="text-2xl font-semibold tracking-tight mt-4">Sign In</h1>
                <p className="text-sm text-gray-600">Please fill your details to access your account.</p>
              </div>

              <UserAuthForm  step={step} setStep={setStep}/>

              <div className="flex items-center justify-between">
                {/* <div className="text-xs">
                  <a href="/forget-password" className="hover:underline text-customAmber">Forgot Password?</a>
                </div> */}
                {/* <div className="text-xs">
                  <a href="/signup" className="hover:underline text-customAmber">Don&apos;t have an account? Sign up</a>
                </div> */}
              </div>
              
              {/* <div className="mt-6 flex items-center justify-center mt-10">
                <button className="w-full py-3 px-6 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  Sign in with Google
                </button>
              </div> */}
            </div>
          </div>
          <img src="/images/Group 1000004801.png" alt="Bottom right" className="absolute bottom-56 right-0 h-10 w-10 m-4" />
        </div>
      </div>
    </div>
  );
}
