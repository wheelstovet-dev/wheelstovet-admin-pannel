import apiCall from '@/lib/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';


// Action to get all referrals with pagination support
export const getAllReferrals = createAsyncThunk<
  any, // Return type as `any`
  { page: number; limit: number }, // Input type
  { rejectValue: any }
>('referrals/getAll', async ({ page, limit }, { rejectWithValue }) => {
  try {
    const response = await apiCall(
      'GET',
      `/admin/referrals?page=${page}&limit=${limit}`
    );
    return response; // Return full response including referrals and pagination data
  } catch (error: any) {
    return rejectWithValue(error || 'Failed to fetch referrals');
  }
});

// Action to get referral by userId
export const getReferralByUserId = createAsyncThunk<
  any, // Return type is the entire Axios response
  string, // Input type as a direct string for userId
  { rejectValue: any } // Reject value type
>('coupon/userId', async (userId, { rejectWithValue }) => {
  try {
    // Make API call to get the referral by userId
    const response = await apiCall('GET', `/admin/referrals/${userId}`);

    // Return the entire response object
    return response; // Return the full response
  } catch (error: any) {
    // Handle errors and return the error message
    return rejectWithValue(
      error.response?.data || 'Failed to fetch referral credentials'
    );
  }
});


// Action to get all referral details with pagination support
export const getReferralDetails = createAsyncThunk<
  any, // Return type as `any`
  { page: number; limit: number }, // Input type
  { rejectValue: any }
>('referralDetails/getAll', async ({ page, limit }, { rejectWithValue }) => {
  try {
    const response = await apiCall(
      'GET',
      `/admin/ReferralPercentage?page=${page}&limit=${limit}`
    );
    return response; // Return full response including referral details and pagination data
  } catch (error: any) {
    return rejectWithValue(error || 'Failed to fetch referral details');
  }
});


// Action to update referral percentage
export const updateReferralPercentage = createAsyncThunk<
  AxiosResponse<any>,
  { id: string; referralData: any }, // Accepts referral ID and updated data
  { rejectValue: any }
>(
  'referral/updatePercentage',
  async ({ id, referralData }, { rejectWithValue }) => {
    try {
      const response = await apiCall<any>(
        'PATCH',
        `/admin/ReferralPercentage/${id}`,
        referralData
      );
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to update referral percentage');
    }
  }
);