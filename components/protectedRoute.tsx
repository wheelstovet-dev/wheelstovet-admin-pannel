'use client';
import { ReactNode } from 'react';
import { RootState } from '@/app/redux/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLocalStorageItem, getSessionStorageItem } from '@/utils/localStorage';


import { setLoading } from '@/app/redux/slices/authslice';
import Loader from './loader/Loader';

interface ProtectedRouteProps {
  children: ReactNode; // Define children as a ReactNode prop
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // const { loading } = useSelector((state: RootState) => state.auth);
  const AuthenticatedData:any  = getSessionStorageItem('token');
  const isAuthenticated = AuthenticatedData?.token;
//   const { loading } = useSelector((state: RootState) => state.auth);

  const { push } = useRouter();
  const dispatch=useDispatch()

  useEffect(() => {
    dispatch(setLoading(true)); 
    const isAuthenticated:any  = getSessionStorageItem('token');
    if (!isAuthenticated?.token) {
      push('/auth/login');
    }
      dispatch(setLoading(false)); 
  }, [push,isAuthenticated]);

//   if (loading) {
//     return  <div className='  min-h-[100vh] min-w-full flex justify-center items-center' >
//     <Loader/>
//     </div>
//   }

  if (!isAuthenticated) {
    return <div className='  min-h-[100vh] min-w-full flex justify-center items-center' >
    <Loader/>
    </div>
  }


  // Render children if authenticated
  return <>{children}</>;
};

export default ProtectedRoute;