'use client';
import { useAuthContext } from '@/provider/auth.provider';
import { IAuthContext } from '@/types';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuth, loading } = useAuthContext() as IAuthContext;
  const { push } = useRouter();

  useEffect(() => {
    console.log('isAuth', isAuth);
    if (!isAuth) {
      push('/auth/login');
    }
  }, [loading, isAuth]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuth) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
