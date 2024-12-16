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

// // Action to update an existing referral
// export const updateReferrral = createAsyncThunk<
//   AxiosResponse<any>,
//   { id: string; referralData: any }, // Input type includes referral ID and data
//   { rejectValue: any }
// >('referral/update', async ({ id, referralData }, { rejectWithValue }) => {
//   try {
//     const response = await apiCall<any>(
//       'PUT',
//       `/admin/referrals/${id}`,
//       referralData
//     );
//     // console.log('API Response:', response);
//     return response;
//   } catch (error: any) {
//     return rejectWithValue(error || 'Failed to update referral');
//   }
// });
