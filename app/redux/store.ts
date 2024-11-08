// src/app/redux/store.ts
'use client';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authslice';
import employeeReducer from './slices/employee';
import adminReducer from './slices/adminslice';
import userReducer from './slices/userslice';
import subscriptionReducer from './slices/subscriptionslice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    employee: employeeReducer,
    admin:adminReducer,
    user: userReducer,
    subscription: subscriptionReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
