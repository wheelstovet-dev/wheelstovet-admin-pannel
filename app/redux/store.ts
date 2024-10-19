// src/app/redux/store.ts
'use client';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authslice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;