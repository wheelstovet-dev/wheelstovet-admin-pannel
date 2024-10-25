// src/app/redux/actions/employeeActions.ts
import apiCall from '@/lib/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

// Action to get all admins with pagination support
export const getAllUsers = createAsyncThunk<
  AxiosResponse<{ total: number; currentPage: number; totalPages: number; users: any[] }>, // Return type
  { page: number; limit: number }, // Input type
  { rejectValue: any }
>(
  'users/getAll',
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await apiCall('GET', `/admin/Users?page=${page}&limit=${limit}`);
    //   console.log('API Response for all admins:', response);
      return response; // Return full response including admin and pagination data
    } catch (error: any) {
      return rejectWithValue(error || 'Failed to fetch admin');
    }
  }
);