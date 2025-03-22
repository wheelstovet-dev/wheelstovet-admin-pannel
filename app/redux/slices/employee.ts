
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { assignEmployee, assignEmployeeByCase, createEmployee, getAllEmployees, getAssignedCasesById, getAssignedSubscriptionById, getEmployeeById, updateEmployee, updateEmployeeStatus } from '../actions/employeeAction';
import { AxiosResponse } from 'axios';

interface EmployeeState {
  loading: boolean;
  employees: any[];
  selectedEmployee: any | null;
  error: string | null;
  currentPage: number; // Track the current page
  totalEmployees: number; // Track the total number of employees
  totalPages: number; // Track the total number of pages
  assignmentStatus: string | null; // Track the assignment status
  assignedCases: any[];
  assignedSubscription: any[];
}

const initialState: EmployeeState = {
  loading: false,
  employees: [],
  selectedEmployee: null,
  error: null,
  currentPage: 1,
  totalEmployees: 0,
  totalPages: 0,
  assignmentStatus: null, // Initialize assignmentStatus as null
  assignedCases:[],
  assignedSubscription:[],
};

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload; // Update currentPage in state
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(createEmployee.fulfilled, (state, action: PayloadAction<AxiosResponse<any>>) => {
         console.log('emp'+ action.payload);
        state.loading = false;
        const newEmployee = action.payload;
        state.employees.push(newEmployee);
      })
      .addCase(createEmployee.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      //get employee by id
      .addCase(getEmployeeById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEmployeeById.fulfilled, (state, action: PayloadAction<AxiosResponse<any>>) => {
        state.loading = false;
        state.selectedEmployee = action.payload.data;
      })
      .addCase(getEmployeeById.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      //get all employee
      .addCase(getAllEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllEmployees.fulfilled, (state, action: PayloadAction<AxiosResponse<{ total: number; currentPage: number; totalPages: number; employees: any[] }>>) => {
        // console.log(action.payload);
        state.loading = false;
        state.employees = action.payload.data.employees; // Directly set employees from response
        state.totalEmployees = action.payload.data.total; // Total employees from response
        state.currentPage = action.payload.data.currentPage; // Current page from response
        state.totalPages = action.payload.data.totalPages; // Total pages from response
      })
      .addCase(getAllEmployees.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      //update  employee by id
      .addCase(updateEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateEmployee.fulfilled, (state, action: PayloadAction<AxiosResponse<any>>) => {
        state.loading = false;
        const updatedEmployee = action.payload?.data;
      
        if (updatedEmployee && Array.isArray(state.employees)) {
          state.employees = state.employees.map(employee =>
            employee?._id === updatedEmployee._id ? { ...employee, ...updatedEmployee } : employee
          );
        }
      
        if (updatedEmployee && state.selectedEmployee && state.selectedEmployee._id === updatedEmployee._id) {
          state.selectedEmployee = { ...state.selectedEmployee, ...updatedEmployee };
        }
      })
      
      .addCase(updateEmployee.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Status
      .addCase(updateEmployeeStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateEmployeeStatus.fulfilled, (state, action: PayloadAction<AxiosResponse<any>>) => {
        state.loading = false;
        const updatedStatus = action.payload?.data;

        if (updatedStatus && Array.isArray(state.employees)) {
          state.employees = state.employees.map(employee =>
            employee?._id === updatedStatus._id ? { ...employee, status: updatedStatus.status } : employee
          );
        }

        if (updatedStatus && state.selectedEmployee && state.selectedEmployee._id === updatedStatus._id) {
          state.selectedEmployee = { ...state.selectedEmployee, status: updatedStatus.status };
        }
      })
      .addCase(updateEmployeeStatus.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Assign Employee to Subscription
      .addCase(assignEmployee.pending, (state) => {
        state.loading = true;
        state.assignmentStatus = null; // Reset assignment status on new request
      })
      .addCase(assignEmployee.fulfilled, (state, action: PayloadAction<AxiosResponse<any>>) => {
        state.loading = false;
        state.assignmentStatus = 'success'; // Set success status
      })
      .addCase(assignEmployee.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.assignmentStatus = 'failed'; // Set failed status
        state.error = action.payload;
      })

      // Assign Employee to case
      .addCase(assignEmployeeByCase.pending, (state) => {
        state.loading = true;
        state.assignmentStatus = null; // Reset assignment status on new request
      })
      .addCase(assignEmployeeByCase.fulfilled, (state, action: PayloadAction<AxiosResponse<any>>) => {
        state.loading = false;
        state.assignmentStatus = 'success'; // Set success status
      })
      .addCase(assignEmployeeByCase.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.assignmentStatus = 'failed'; // Set failed status
        state.error = action.payload;
      })

      //get assigned cases by id
      .addCase(getAssignedCasesById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAssignedCasesById.fulfilled, (state, action: PayloadAction<AxiosResponse<any>>) => {
        state.loading = false;
        state.assignedCases = action.payload.data;
      })
      .addCase(getAssignedCasesById.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      //get assigned subscription by id
      .addCase(getAssignedSubscriptionById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAssignedSubscriptionById.fulfilled, (state, action: PayloadAction<AxiosResponse<any>>) => {
        state.loading = false;
        state.assignedSubscription = action.payload.data;
        console.log("state",state.assignedSubscription);
      })
      .addCase(getAssignedSubscriptionById.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCurrentPage } = employeeSlice.actions; // Export the action

export default employeeSlice.reducer;