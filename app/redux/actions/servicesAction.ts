import apiCall from '@/lib/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

// Action to get all dog walking plans without pagination
export const getDogWalkPlans = createAsyncThunk<
  any[], // Define return type as any[]
  void, // No input arguments
  { rejectValue: any }
>(
  'getDogWalkPlans/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiCall('GET', `/admin/getAllPlans`);
      return response.data; // Return only the data array
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch dog walk plans');
    }
  }
);

// Action to update an existing dog walking plans
export const updateDogPlan = createAsyncThunk<
  AxiosResponse<any>,
  { id: string; planData: any }, // Input type includes service ID and data
  { rejectValue: any }
>(
  'dogPlan/update',
  async ({ id, planData }, { rejectWithValue }) => {
    try {
      const response = await apiCall<any>('PATCH', `/admin/updatePlan/${id}`, planData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error || 'Failed to update Service');
    }
  }
);

// Action to get all services without pagination
export const getAllServices = createAsyncThunk<
  any[], // Define return type as any[]
  void, // No input arguments
  { rejectValue: any }
>(
  'getAllServices/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiCall('GET', `/admin/services`);
      return response.data; // Return only the data array
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch all services');
    }
  }
);

// Action to get all salons without pagination
export const getAllSalons = createAsyncThunk<
  any[], // Define return type as any[]
  void, // No input arguments
  { rejectValue: any }
>(
  'salons/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiCall('GET', `/admin/salon/getAll`);
      return response.data; // Return only the array of salons
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch salons');
    }
  }
);

// Action to create a new salon
export const createSalon = createAsyncThunk<AxiosResponse<any>, any, { rejectValue: any }>(
  'salon/create',
  async (salonData, { rejectWithValue }) => {
    try {
      // API call to create a salon
      const response = await apiCall<any>(
        'POST',
        '/admin/salon/create',
        salonData
      );
      // Return the full response
      return response;
    } catch (error: any) {
      // Handle errors and return error message
      return rejectWithValue(error || 'Failed to add salon');
    }
  }
);

// delete associated salon by id
export const deleteSalon = createAsyncThunk<
  void,
  string,
  { rejectValue: any }
>(
  'salon/delete',
  async (id, { rejectWithValue }) => {
    try {
      await apiCall('DELETE', `/admin/salon/${id}`);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to delete salon');
    }
  }
);

// Action to get all clinic [vet visit] without pagination
export const getAllClinic = createAsyncThunk<
  any[], // Define return type as any[]
  void, // No input arguments
  { rejectValue: any }
>(
  'clinic/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiCall('GET', `/admin/clinic/getALL`);
      return response.data; // Return only the array of clinic
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch clinic');
    }
  }
);

// Action to create a new clinic [vet visit]
export const createClinic = createAsyncThunk<AxiosResponse<any>, any, { rejectValue: any }>(
  'clinic/create',
  async (clinicData, { rejectWithValue }) => {
    try {
      // API call to create a salon
      const response = await apiCall<any>(
        'POST',
        '/admin/clinic/create',
        clinicData
      );
      // Return the full response
      return response;
    } catch (error: any) {
      // Handle errors and return error message
      // console.log(error);
      return rejectWithValue(error || 'Failed to add clinic');
    }
  }
);

// delete associated clicnic by id
export const deleteClinic = createAsyncThunk<
  void,
  string,
  { rejectValue: any }
>(
  'clinic/delete',
  async (id, { rejectWithValue }) => {
    try {
      await apiCall('DELETE', `/admin/clinic/${id}`);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to delete clinic');
    }
  }
);

// Action to update an existing service
export const updateService = createAsyncThunk<
  AxiosResponse<any>,
  { id: string; serviceData: any }, // Input type includes service ID and data
  { rejectValue: any }
>(
  'service/update',
  async ({ id, serviceData }, { rejectWithValue }) => {
    try {
      const response = await apiCall<any>('PATCH', `/admin/service/${id}`, serviceData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error || 'Failed to update Service');
    }
  }
);

// Action to create a new hostel
export const createHostel = createAsyncThunk<AxiosResponse<any>, any, { rejectValue: any }>(
  'hostel/create',
  async (hostelData, { rejectWithValue }) => {
    try {
      // API call to create a salon
      const response = await apiCall<any>(
        'POST',
        '/admin/hostel/Create',
        hostelData
      );
      // Return the full response
      return response;
    } catch (error: any) {
      // Handle errors and return error message
      return rejectWithValue(error || 'Failed to add hostel slot');
    }
  }
);

// Action to get all hostels without pagination
export const getAllHostels = createAsyncThunk<
  any[], // Define return type as any[]
  void, // No input arguments
  { rejectValue: any }
>(
  'hostels/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiCall('GET', `/admin/hostel/getAll`);
      return response.data; // Return only the array of clinic
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch hostel');
    }
  }
);

// delete associated hostel by id
export const deleteHostel = createAsyncThunk<
  void,
  string,
  { rejectValue: any }
>(
  'hostel/delete',
  async (id, { rejectWithValue }) => {
    try {
      await apiCall('DELETE', `/admin/hostel/${id}`);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to delete hostel');
    }
  }
);