import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { createAdmin, getAdminById, getAllAdmin } from '../actions/adminAction';

interface AdminState {
  loading: boolean;
  admin: any[];
  selectedAdmin: any | null;
  error: string | null;
  currentPage: number;
  totalAdmin: number;
  totalPages: number;
}

const initialState: AdminState = {
  loading: false,
  admin: [],
  selectedAdmin: null,
  error: null,
  currentPage: 1,
  totalAdmin: 0,
  totalPages: 0,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload; // Update currentPage in state
    },
  },
  extraReducers: (builder) => {
    builder
    //create admin slice
    .addCase(createAdmin.pending, (state) => {
      state.loading = true;
    })
    .addCase(createAdmin.fulfilled, (state, action: PayloadAction<AxiosResponse<any>>) => {
      state.loading = false;
      const newAdmin = action.payload.data;
      state.admin.push(newAdmin);
    })
    .addCase(createAdmin.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    })

    //get admin by id
    .addCase(getAdminById.pending, (state) => {
      state.loading = true;
    })
    .addCase(getAdminById.fulfilled, (state, action: PayloadAction<AxiosResponse<any>>) => {
      state.loading = false;
      state.selectedAdmin = action.payload.data;
    })
    .addCase(getAdminById.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    })

    //get all admins slice
      .addCase(getAllAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getAllAdmin.fulfilled,
        (state, action: PayloadAction<AxiosResponse<{ total: number; currentPage: number; totalPages: number; admin: any[] }>>) => {
          state.loading = false;
          // Accessing data from action.payload.data
          state.admin = action.payload.data.admin; // Set admin from response
          state.totalAdmin = action.payload.data.total; // Total Admin from response
          state.currentPage = action.payload.data.currentPage; // Current page from response
          state.totalPages = action.payload.data.totalPages; // Total pages from response
        }
      )
      .addCase(getAllAdmin.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCurrentPage } = adminSlice.actions;
export default adminSlice.reducer;
