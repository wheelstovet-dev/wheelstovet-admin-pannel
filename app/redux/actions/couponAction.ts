import apiCall from '@/lib/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

// Action to create coupons
export const createCoupon = createAsyncThunk<
  AxiosResponse<any>,
  any,
  { rejectValue: any }
>('coupon/create', async (couponData, { rejectWithValue }) => {
  try {
    // Make API call to create an coupons
    const response = await apiCall<any>(
      'POST',
      '/admin/coupons',
      couponData
    );
    // console.log('API Response:', response); // Log the full response for debugging

    // Return the entire response object
    return response; // Return the full response
  } catch (error: any) {
    // Handle errors and return the error message
    return rejectWithValue(error || 'Failed to create coupon');
  }
});

// Action to get all coupons with pagination support
export const getAllCoupons = createAsyncThunk<
  any, // Return type as `any`
  { page: number; limit: number }, // Input type
  { rejectValue: any }
>('coupons/getAll', async ({ page, limit }, { rejectWithValue }) => {
  try {
    const response = await apiCall(
      'GET',
      `/admin/coupons?page=${page}&limit=${limit}`
    );
    return response; // Return full response including coupons and pagination data
  } catch (error: any) {
    return rejectWithValue(error || 'Failed to fetch coupons');
  }
});

// Action to get coupon by couponcode
export const getCouponByCode = createAsyncThunk<
  any, // Return type is the entire Axios response
  string, // Input type as a direct string for couponcode
  { rejectValue: any } // Reject value type
>('coupon/getByCode', async (couponCode, { rejectWithValue }) => {
  try {
    // Make API call to get the coupon by couponCode
    const response = await apiCall('GET', `/admin/coupons/${couponCode}`);

    // Return the entire response object
    return response; // Return the full response
  } catch (error: any) {
    // Handle errors and return the error message
    return rejectWithValue(
      error.response?.data || 'Failed to fetch coupon credentials'
    );
  }
});

// Action to update an existing coupon
export const updateCoupon = createAsyncThunk<
  AxiosResponse<any>,
  { id: string; couponData: any }, // Input type includes coupon ID and data
  { rejectValue: any }
>('coupon/update', async ({ id, couponData }, { rejectWithValue }) => {
  try {
    const response = await apiCall<any>(
      'PUT',
      `/admin/coupons/${id}`,
      couponData
    );
    // console.log('API Response:', response);
    return response;
  } catch (error: any) {
    return rejectWithValue(error || 'Failed to update coupon');
  }
});
