import apiCall from '@/lib/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

// Action to get all complaint with pagination support
export const getAllComplaints = createAsyncThunk<
  any, // Return type as `any`
  { page: number; limit: number }, // Input type
  { rejectValue: any }
>(
  'complaints/getAll',
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await apiCall('GET', `/admin/complaints?page=${page}&limit=${limit}`);
      return response; // Return full response including cases and pagination data
    } catch (error: any) {
      return rejectWithValue(error || 'Failed to fetch complaints');
    }
  }
);

// Action to get complaint by ID
export const getComplaintById = createAsyncThunk<
  any, // Return type is the entire Axios response
  string, // Input type as a direct string for caseId
  { rejectValue: any } // Reject value type
>(
  'complaint/getById',
  async (complaintId, { rejectWithValue }) => {
    try {
      // Make API call to get the case by ID
      const response = await apiCall('GET', `/admin/complaints/${complaintId}`);

      // Return the entire response object
      return response; // Return the full response
    } catch (error: any) {
      // Handle errors and return the error message
      return rejectWithValue(error.response?.data || 'Failed to fetch complaint credentials');
    }
  }
);


// // Action to update the status of a complaint
export const updateComplaintStatus = createAsyncThunk<
AxiosResponse<any>,
{ id: string; complaintStatus: { Status: string } }, // Input type includes complaint ID and status
{ rejectValue: any }
>(
'complaints/updateStatus',
async ({ id, complaintStatus }, { rejectWithValue }) => {
  try {
    const response = await apiCall<any>('PUT', `/admin/complaints/${id}/status`, complaintStatus);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || 'Failed to update complaint status');
  }
}
);

// Action to update an existing complaint
export const updateComplaint = createAsyncThunk<
  AxiosResponse<any>,
  { id: string; complaintData: any }, // Input type includes complaint ID and data
  { rejectValue: any }
>(
  'complaint/update',
  async ({ id, complaintData }, { rejectWithValue }) => {
    try {
      const response = await apiCall<any>('PUT', `/admin/complaints/${id}`, complaintData);
      // console.log('API Response:', response);
      return response;
    } catch (error: any) {
      return rejectWithValue(error || 'Failed to update complaint');
    }
  }
);

// delete complaint by id
export const deleteComplaint = createAsyncThunk<
  void,
  string,
  { rejectValue: any }
>(
  'complaint/delete',
  async (id, { rejectWithValue }) => {
    try {
      await apiCall('DELETE', `/admin/complaints/${id}`);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to delete complaint');
    }
  }
);