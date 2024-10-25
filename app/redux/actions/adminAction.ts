// src/app/redux/actions/employeeActions.ts
import apiCall from '@/lib/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

export const createAdmin = createAsyncThunk<AxiosResponse<any>,any,{ rejectValue: any }>('admin/create', async (adminData, { rejectWithValue }) => {
  try {
    // Make API call to create an employee
    const response = await apiCall<any>(
      'POST',
      '/admin/createAdmin',
      adminData
    );
    // console.log('API Response:', response); // Log the full response for debugging

    // Return the entire response object
    return response; // Return the full response
  } catch (error: any) {
    // Handle errors and return the error message
    return rejectWithValue(error || 'Failed to create admin');
  }
});

// Action to get all admins with pagination support
export const getAllAdmin = createAsyncThunk<
  AxiosResponse<{ total: number; currentPage: number; totalPages: number; admin: any[] }>, // Return type
  { page: number; limit: number }, // Input type
  { rejectValue: any }
>(
  'admin/getAll',
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await apiCall('GET', `/admin/getAllAdmins?page=${page}&limit=${limit}`);
      // console.log('API Response for all admins:', response);
      return response; // Return full response including admin and pagination data
    } catch (error: any) {
      return rejectWithValue(error || 'Failed to fetch admin');
    }
  }
);

// Action to get an employee by ID
export const getAdminById = createAsyncThunk<
  AxiosResponse<any>, // Return type is the entire Axios response
  string, // Input type of the admin ID as a string
  { rejectValue: any } // Reject value type
>(
  'admin/getById',
  async (AdminId, { rejectWithValue }) => {
    try {
      // Make API call to get the employee by ID
      const response = await apiCall('GET', `/admin/getAdmin${AdminId}`);
      // console.log('API Response:', response); // Log the full response for debugging

      // Return the entire response object
      return response; // Return the full response
    } catch (error: any) {
      // Handle errors and return the error message
      return rejectWithValue(error || 'Failed to fetch admin credentials');
    }
  }
);