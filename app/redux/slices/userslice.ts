import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { getAllUsers } from '../actions/userAction';

interface UserState {
  loading: boolean;
  users: any[];
  selectedUsers: any | null;
  error: string | null;
  currentPage: number;
  totalUsers: number;
  totalPages: number;
}

const initialState: UserState = {
  loading: false,
  users: [],
  selectedUsers: null,
  error: null,
  currentPage: 1,
  totalUsers: 0,
  totalPages: 0,
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
          // Accessing data from action.payload.data
          state.users = action.payload.data.users; // Set admin from response
          state.totalUsers = action.payload.data.total; // Total Admin from response
          state.currentPage = action.payload.data.currentPage; // Current page from response
          state.totalPages = action.payload.data.totalPages; // Total pages from response
        }
      )
      .addCase(getAllUsers.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCurrentPage } = userSlice.actions;
export default userSlice.reducer;
