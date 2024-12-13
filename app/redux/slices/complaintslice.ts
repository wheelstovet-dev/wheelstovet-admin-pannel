import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteComplaint, getAllComplaints, getComplaintById, updateComplaint, updateComplaintStatus } from '../actions/complaintAction';
import { AxiosResponse } from 'axios';

interface ComplaintState {
  loading: boolean;
  complaints: any[];
  selectedComplaint: any | null;
  successMessage: string | null;
  error: string | null;
  currentPage: number;
  totalComplaints: number;
  totalPages: number;
}

const initialState: ComplaintState = {
  loading: false,
  complaints: [],
  selectedComplaint: null,
  successMessage: null,
  error: null,
  currentPage: 1,
  totalComplaints: 0,
  totalPages: 0,
};

const complaintslice = createSlice({
  name: 'complaints',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all complaints
      .addCase(getAllComplaints.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllComplaints.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.complaints = action.payload.data;
        state.totalComplaints = action.payload.total;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getAllComplaints.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get complaint by ID
      .addCase(getComplaintById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getComplaintById.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.selectedComplaint = action.payload.data;
      })
      .addCase(getComplaintById.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      //update  complaint by id
      .addCase(updateComplaint.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateComplaint.fulfilled, (state, action: PayloadAction<AxiosResponse<any>>) => {
        state.loading = false;
        const updatedComplaint = action.payload?.data;
      
        if (updatedComplaint && Array.isArray(state.complaints)) {
          state.complaints = state.complaints.map(complain =>
            complain?._id === updatedComplaint._id ? { ...complain, ...updatedComplaint } : complain
          );
        }
      
        if (updatedComplaint && state.selectedComplaint && state.selectedComplaint._id === updatedComplaint._id) {
          state.selectedComplaint = { ...state.selectedComplaint, ...updatedComplaint };
        }
      })
      
      .addCase(updateComplaint.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update complaint status
      .addCase(updateComplaintStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(updateComplaintStatus.fulfilled, (state, action: PayloadAction<AxiosResponse<any>>) => {
        state.loading = false;
        const updatedComplaint = action.payload.data;

        // Update the specific complaint in the complaints list
        state.complaints = state.complaints.map((complaint) =>
          complaint._id === updatedComplaint._id
            ? { ...complaint, Status: updatedComplaint.Status }
            : complaint
        );

        // Update the selected complaint if it matches
        if (state.selectedComplaint && state.selectedComplaint._id === updatedComplaint._id) {
          state.selectedComplaint = { ...state.selectedComplaint, Status: updatedComplaint.Status };
        }

        state.successMessage = 'Complaint status updated successfully.';
      })
      .addCase(updateComplaintStatus.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update complaint status.';
      })

      // Handle delete complaint
    builder.addCase(deleteComplaint.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      builder.addCase(deleteComplaint.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        // Remove the deleted complaint from the state
        state.complaints = state.complaints.filter((complaint) => complaint._id !== action.payload);
      })
      builder.addCase(deleteComplaint.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload || 'Failed to delete complaint';
      });
  },
});

export const { setCurrentPage } = complaintslice.actions;
export default complaintslice.reducer;
