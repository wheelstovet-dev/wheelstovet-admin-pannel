// src/app/redux/actions/adminActions.ts
import apiCall from '@/lib/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

// Action to get all subscription with pagination support
export const getAllSubscriptions = createAsyncThunk<
  AxiosResponse<{ total: number; currentPage: number; totalPages: number; subscriptions: any[] }>, // Return type
  { page: number; limit: number }, // Input type
  { rejectValue: any }
>(
  'subscriptions/getAll',
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await apiCall('GET', `/admin/getSubscriptions?page=${page}&limit=${limit}`);
      // console.log('API Response for all subscriptions:', response);
      return response; // Return full response including subscriptions and pagination data
    } catch (error: any) {
      return rejectWithValue(error || 'Failed to fetch subscriptions');
    }
  }
);

// Action to get subscription by ID
export const getSubscriptionById = createAsyncThunk<
  AxiosResponse<any>, // Return type is the entire Axios response
  string, // Input type of the admin ID as a string
  { rejectValue: any } // Reject value type
>(
  'subscriptions/getSubscriptionById',
  async (SubscriptionId, { rejectWithValue }) => {
    try {
      // Make API call to get the user by ID
      const response = await apiCall('GET', `/admin/getSubscriptionById/${SubscriptionId}`);
      // console.log('API Response:', response); // Log the full response for debugging

      // Return the entire response object
      return response; // Return the full response
    } catch (error: any) {
      // Handle errors and return the error message
      return rejectWithValue(error || 'Failed to fetch Subscription details');
    }
  }
);

// Action to get walk records subscription with pagination support
export const getWalkRecords = createAsyncThunk<
  AxiosResponse<{ total: number; currentPage: number; totalPages: number; subscriptions: any[] }>, // Return type
  { id: string; page: number; limit: number }, // Input type including id, page, and limit
  { rejectValue: any }
>(
  'subscriptions/getWalkRecords',
  async ({ id, page, limit }, { rejectWithValue }) => {
    try {
      const response = await apiCall('GET', `/admin/walk-records/history?subscriptionId=${id}&page=${page}&limit=${limit}`);
      // Return full response including subscriptions and pagination data
      console.log('API Response for walk records:', response);
      return response;
    } catch (error: any) {
      return rejectWithValue(error || 'Failed to fetch subscriptions');
    }
  }
);



// Action to update the status of subscription
export const updateSubscriptionStatus = createAsyncThunk<
  AxiosResponse<any>,
  { id: string; status: string }, // Input type includes subsciption ID and status
  { rejectValue: any }
>(
  'subsciption/updateStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await apiCall<any>('PUT', `/admin/updateStatus/${id}`, { status });
      return response;
    } catch (error: any) {
      return rejectWithValue(error || 'Failed to update Admin Status');
    }
  }
);