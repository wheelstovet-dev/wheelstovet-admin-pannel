import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { getAllUsers, getPetById, getUserBookedCases, getUserBookedSubscriptions } from '../actions/userAction';

interface UserState {
  loading: boolean;
  users: any[];
  selectedUsers: any | null;
  error: string | null;
  currentPage: number;
  totalUsers: number;
  totalPages: number;
  selectedPet: any | null; // State for selected pet details
  pets: any[]; // List of pets for a user
  bookedCases: any[]; // List of booked cases for a user
  bookedSubscriptions: any[]; // List of booked subscriptions for a user
}

const initialState: UserState = {
  loading: false,
  users: [],
  selectedUsers: null,
  error: null,
  currentPage: 1,
  totalUsers: 0,
  totalPages: 0,
  selectedPet: null, // Initialize selected pet
  pets: [], // Initialize pets list
  bookedCases: [], // Initialize booked cases
  bookedSubscriptions: [], // Initialize booked subscriptions
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload; // Update currentPage in state
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getAllUsers.fulfilled,
        (state, action: PayloadAction<AxiosResponse<{ total: number; currentPage: number; totalPages: number; users: any[] }>>) => {
          state.loading = false;
          state.users = action.payload.data.users; // Set admin from response
          state.totalUsers = action.payload.data.total; // Total Admin from response
          state.currentPage = action.payload.data.currentPage; // Current page from response
          state.totalPages = action.payload.data.totalPages; // Total pages from response
        }
      )
      .addCase(getAllUsers.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.message.message;
      })

      // Get pet by ID
      .addCase(getPetById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPetById.fulfilled, (state, action: PayloadAction<AxiosResponse<any>>) => {
        state.loading = false;
        state.selectedPet = action.payload.data; // Set selected pet details
      })
      .addCase(getPetById.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get booked cases for a user
      .addCase(getUserBookedCases.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserBookedCases.fulfilled, (state, action: PayloadAction<AxiosResponse<any>>) => {
        state.loading = false;
        state.bookedCases = action.payload.data; // Set booked cases data
      })
      .addCase(getUserBookedCases.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get booked subscriptions for a user
      .addCase(getUserBookedSubscriptions.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserBookedSubscriptions.fulfilled, (state, action: PayloadAction<AxiosResponse<any>>) => {
        state.loading = false;
        state.bookedSubscriptions = action.payload.data; // Set booked subscriptions data
      })
      .addCase(getUserBookedSubscriptions.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCurrentPage } = userSlice.actions;
export default userSlice.reducer;
