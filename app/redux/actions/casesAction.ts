// src/app/redux/actions/employeeActions.ts
import apiCall from '@/lib/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Action to get all cases with pagination support
export const getAllCases = createAsyncThunk<
  any, // Return type as `any`
  { page: number; limit: number }, // Input type
  { rejectValue: any }
>(
  'cases/getAll',
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await apiCall('GET', `admin/getAllCases?page=${page}&limit=${limit}`);
      return response; // Return full response including cases and pagination data
    } catch (error: any) {
      return rejectWithValue(error || 'Failed to fetch cases');
    }
  }
);

// Action to get case by ID
export const getCaseById = createAsyncThunk<
  any, // Return type is the entire Axios response
  string, // Input type as a direct string for caseId
  { rejectValue: any } // Reject value type
>(
  'case/getById',
  async (caseId, { rejectWithValue }) => {
    try {
      // Make API call to get the case by ID
      const response = await apiCall('GET', `/admin/caseById/${caseId}`);

      // Return the entire response object
      return response; // Return the full response
    } catch (error: any) {
      // Handle errors and return the error message
      return rejectWithValue(error.response?.data || 'Failed to fetch case credentials');
    }
  }
);


