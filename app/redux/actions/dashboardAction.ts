import apiCall from '@/lib/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

// -----------ENQUIRY SECTION --------------

// Action to get all enquiries with pagination support
export const getAllEnquiries = createAsyncThunk<
  any, // Return type as `any`
  { page: number; limit: number }, // Input type
  { rejectValue: any }
>('enquiries/getAll', async ({ page, limit }, { rejectWithValue }) => {
  try {
    const response = await apiCall(
      'GET',
      `/admin/allEnquiries?page=${page}&limit=${limit}`
    );
    return response; // Return full response including enquiries and pagination data
  } catch (error: any) {
    return rejectWithValue(error || 'Failed to fetch enquiries');
  }
});

// Action to get Enquiry by Id
export const getEnquiryId = createAsyncThunk<
  any, // Return type is the entire Axios response
  string, // Input type as a direct string for userId
  { rejectValue: any } // Reject value type
>('enquiry/getById', async (id, { rejectWithValue }) => {
  try {
    // Make API call to get the Enquiry by Id
    const response = await apiCall('GET', `/admin/enquiries/${id}`);

    // Return the entire response object
    return response; // Return the full response
  } catch (error: any) {
    // Handle errors and return the error message
    return rejectWithValue(
      error.response?.data || 'Failed to fetch Enquiry credentials'
    );
  }
});

// -----------PENDING SUBSCRIPTION SECTION --------------

// Action to get Pending Subscriptions
export const getPendingSubscriptions = createAsyncThunk<
  any, // Return type: expected API response
  { page: number; limit: number }, // No input arguments
  { rejectValue: any } // Reject value type
>('subscriptions/getPending', async (_, { rejectWithValue }) => {
  try {
    // Make API call to fetch pending subscriptions
    const response = await apiCall('GET', `/admin/getPendingSubscriptions`);
    return response; // Return the response object
  } catch (error: any) {
    // Handle errors and reject with meaningful error message
    return rejectWithValue(
      error.response?.data || 'Failed to fetch pending subscriptions'
    );
  }
});