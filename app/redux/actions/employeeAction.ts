// src/app/redux/actions/employeeActions.ts
import apiCall from '@/lib/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

// Action to create a new employee
// Action to create a new employee
export const createEmployee = createAsyncThunk<AxiosResponse<any>,any,{ rejectValue: any }>('employees/create', async (employeeData, { rejectWithValue }) => {
  try {
    // Make API call to create an employee
    const response = await apiCall<any>(
      'POST',
      '/admin/createEmp',
      employeeData
    );
    // console.log('API Response:', response); // Log the full response for debugging

    // Return the entire response object
    return response; // Return the full response
  } catch (error: any) {
    // Handle errors and return the error message
    return rejectWithValue(error || 'Failed to create employee');
  }
});

// Action to get an employee by ID
export const getEmployeeById = createAsyncThunk<
  AxiosResponse<any>, // Return type is the entire Axios response
  string, // Input type is the employee ID as a string
  { rejectValue: any } // Reject value type
>(
  'employees/getById',
  async (employeeId, { rejectWithValue }) => {
    try {
      // Make API call to get the employee by ID
      const response = await apiCall('GET', `/admin/employee/${employeeId}`);
      // console.log('API Response:', response); // Log the full response for debugging

      // Return the entire response object
      return response; // Return the full response
    } catch (error: any) {
      // Handle errors and return the error message
      return rejectWithValue(error || 'Failed to fetch employee credentials');
    }
  }
);

// Action to update an existing employee
export const updateEmployee = createAsyncThunk<
  AxiosResponse<any>,
  { id: string; employeeData: any }, // Input type includes employee ID and data
  { rejectValue: any }
>(
  'employees/update',
  async ({ id, employeeData }, { rejectWithValue }) => {
    try {
      const response = await apiCall<any>('PUT', `/admin/updateEmp/${id}`, employeeData);
      // console.log('API Response:', response);
      return response;
    } catch (error: any) {
      return rejectWithValue(error || 'Failed to update employee');
    }
  }
);

// Action to update the status of an existing employee
export const updateEmployeeStatus = createAsyncThunk<
  AxiosResponse<any>,
  { id: string; status: string }, // Input type with employee ID and status
  { rejectValue: any }
>(
  'employees/updateStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await apiCall<any>('PUT', `/admin/updateAvailability/${id}`, { status });
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to update employee status');
    }
  }
);

// Action to get all employees with pagination support
export const getAllEmployees = createAsyncThunk<
  AxiosResponse<{ total: number; currentPage: number; totalPages: number; employees: any[] }>, // Return type
  { page: number; limit: number }, // Input type
  { rejectValue: any }
>(
  'employees/getAll',
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await apiCall('GET', `/admin/allEmp`);
      // console.log('API Response for all employees:', response);
      return response; // Return full response including employees and pagination data
    } catch (error: any) {
      return rejectWithValue(error || 'Failed to fetch employees');
    }
  }
);

//Action to assign employees with subscription id
export const assignEmployee = createAsyncThunk<
  AxiosResponse<any>, // Return type
  { id: string; employeeId: string }, // Input type
  { rejectValue: any } // Reject value type
>(
  'employees/assignEmployee',
  async ({ id, employeeId }, { rejectWithValue }) => {
    try {
      const response = await apiCall<any>('POST', '/admin/assignEmp', { id, employeeId });
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to assign employee');
    }
  }
);

//Action to assign employees with case id
export const assignEmployeeByCase = createAsyncThunk<
  AxiosResponse<any>, // Return type
  { caseId: string; employeeId: string }, // Input type
  { rejectValue: any } // Reject value type
>(
  'case/assignEmployee',
  async ({ caseId, employeeId }, { rejectWithValue }) => {
    try {
      const response = await apiCall<any>('POST', '/admin/assignEmployee', { caseId, employeeId });
      return response;
    } catch (error: any) {
      console.log("error response",error);
      return rejectWithValue(error?.message?.fields?.message);
    }
  }
);


// Action to get assigned cases of employee by ID
export const getAssignedCasesById = createAsyncThunk<
  AxiosResponse<any>, // Return type is the entire Axios response
  string, // Input type is the employee ID as a string
  { rejectValue: any } // Reject value type
>(
  'AssignedCases/getById',
  async (employeeId, { rejectWithValue }) => {
    try {
      // Make API call to get the employee by ID
      const response = await apiCall('GET', `/admin/employee/getAssignedCases/${employeeId}`);
      // console.log('API Response:', response); // Log the full response for debugging

      // Return the entire response object
      return response; // Return the full response
    } catch (error: any) {
      // Handle errors and return the error message
      return rejectWithValue(error || 'Failed to fetch assigned cases details');
    }
  }
);

// Action to get assigned cases of employee by ID
export const getAssignedSubscriptionById = createAsyncThunk<
  AxiosResponse<any>, // Return type is the entire Axios response
  string, // Input type is the employee ID as a string
  { rejectValue: any } // Reject value type
>(
  'AssignedSubscription/getById',
  async (employeeId, { rejectWithValue }) => {
    try {
      // Make API call to get the employee by ID
      const response = await apiCall('GET', `/admin/employee/getAssignedSubscriptions/${employeeId}`);
      // console.log('API Response:', response); // Log the full response for debugging

      // Return the entire response object
      return response; // Return the full response
    } catch (error: any) {
      // Handle errors and return the error message
      return rejectWithValue(error || 'Failed to fetch assigned subscription details');
    }
  }
);