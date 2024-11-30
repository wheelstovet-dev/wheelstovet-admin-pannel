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

// Action to get an admin by ID
export const getUserById = createAsyncThunk<
  AxiosResponse<any>, // Return type is the entire Axios response
  string, // Input type of the admin ID as a string
  { rejectValue: any } // Reject value type
>(
  'user/getById',
  async (UserId, { rejectWithValue }) => {
    try {
      // Make API call to get the user by ID
      const response = await apiCall('GET', `/admin/UserById/${UserId}`);
      // console.log('API Response:', response); // Log the full response for debugging

      // Return the entire response object
      return response; // Return the full response
    } catch (error: any) {
      // Handle errors and return the error message
      return rejectWithValue(error || 'Failed to fetch user credentials');
    }
  }
);

// Action to get a pet by ID
export const getPetById = createAsyncThunk<
  AxiosResponse<any>, // Return type is the entire Axios response
  string, // Input type of the pet ID as a string
  { rejectValue: any } // Reject value type
>(
  'pets/getById',
  async (petId, { rejectWithValue }) => {
    try {
      // Make API call to get the pet by ID
      const response = await apiCall('GET', `/admin/userPets/${petId}`);
      // console.log('API Response:', response); // Log the full response for debugging

      // Return the entire response object
      return response;
    } catch (error: any) {
      // Handle errors and return the error message
      return rejectWithValue(error || 'Failed to fetch pet details');
    }
  }
);
