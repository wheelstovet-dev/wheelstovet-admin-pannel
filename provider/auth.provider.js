// 'use client';

// import { useRouter } from 'next/navigation';
// import React, { createContext, useContext, useState } from 'react';
// import { userService } from '@/services';
// import storage from '@/utils/storage';

// const Context = createContext(null);

// const AuthProvider = ({ children }) => {
//   const router = useRouter();
//   const [user, setUser] = useState(null);
//   const [isAuth, setIsAuth] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const login = async (data) => {
//     setLoading(true);
//     try {
//       const res = await userService.login({
//         Email: data?.email,
//         Password: data?.password,
//       });
//       // console.log(res?.data?.token);

//       if (res && res?.data?.token) {
        
//         setIsAuth(true);
//         setUser(res?.admin); // Assuming 'admin' is the user object
//         storage.setToken(res?.data?.token); // Store token using storage
//         router.push('/dashboard'); // Redirect to dashboard
//       }
//     } catch (err) {
//       console.error('Login failed', err);

//       setIsAuth(false);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const logout = () => {
//     userService.logout(); // Clear token via userService
//     setIsAuth(false);
//     setUser(null);
//     router.push('/auth/login'); // Redirect to login page
//   };

//   const providerValues = { user, isAuth, loading, login, logout };

//   return (
//     <Context.Provider value={providerValues}>
//       {children}
//     </Context.Provider>
//   );
// };

// export const useAuthContext = () => {
//   const context = useContext(Context);
//   if (!context) {
//     throw new Error('useAuthContext must be used within an AuthProvider');
//   }
//   return context;
// };

// export default AuthProvider;

'use client';

import { useRouter } from 'next/navigation';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react';

import { userService } from '@/services';
import Storage from '@/utils/storage';

const Context = createContext({});

const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  // const fetchUser = useCallback(async () => {
  //   try {
  //     let token = Storage.getToken();
  //     if (!token) {
  //       router.push('/auth/login');
  //       setIsAuth(false);
  //     }
  //     const res = await userService.getProfile();
  //     if (res.data) {
  //       setIsAuth(true);
  //       setUser(res.data);
  //       Storage.setToken(res.data.token);
  //     }
  //   } catch (err) {
  //     Storage.clearToken();
  //     router.push('/auth/login');
  //   }
  //   setLoading(false);
  // }, [router]);

  // useEffect(() => {
  //   fetchUser();
  // }, [fetchUser]);

  const logout = () => {
    setIsAuth(false);
    setUser(null);
    Storage.clearToken();
    router.push('/auth/login');
  };

  const login = (data) => {
    return userService
      .login(data)
      .then((res) => {
        if (res.data) {
          setIsAuth(true);
          setUser(res.data);
          Storage.setToken(res.data.token);
          router.push('/dashboard');
        }
      })
      .catch((err) => {});
  };

  const providerValues = { user, setUser, logout, login, isAuth, loading };
  return (
    <Context.Provider value={providerValues}> {children} </Context.Provider>
  );
};

export const useAuthContext = () => useContext(Context);
export const AuthContext = Context;
export default AuthProvider;
