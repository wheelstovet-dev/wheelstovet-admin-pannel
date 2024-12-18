'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ToastAtTopRight } from '@/lib/sweetalert';

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('https://your-api-endpoint.com/forgot-password', { email });
      ToastAtTopRight.fire({
        icon: 'success',
        title: 'Reset link sent successfully. Please check your email.'
      });
      setEmail('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'We cannot find your email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <div className="text-center">
          <div className="flex items-center justify-center w-16 h-16 mx-auto bg-blue-100 rounded-full">
            <svg
              className="w-8 h-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 16h-1v-4h-1m-2 4h8a2 2 0 002-2V9a2 2 0 00-2-2h-3l-1-2H9l-1 2H5a2 2 0 00-2 2v7a2 2 0 002 2h2m4 0v2m0-6v6"
              ></path>
            </svg>
          </div>
          <h2 className="mt-4 text-lg font-semibold text-gray-700">Forgot Password</h2>
          <p className="mt-1 text-sm text-gray-500">
            Enter your email and we’ll send you a link to reset your password.
          </p>
        </div>

        <form className="mt-6" onSubmit={handleForgotPassword}>
          <div className="mb-4">
            <Input
              type="email"
              placeholder="youremail@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>

          <Button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white rounded-lg p-2"
            // disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => router.push('/auth/login')}
            className="text-sm text-blue-500 hover:underline"
          >
            &lt; Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}