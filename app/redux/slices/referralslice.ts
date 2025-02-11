import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { 
  getAllReferrals, 
  getReferralByUserId, 
  getReferralDetails, 
  updateReferralPercentage 
} from '../actions/referralAction';

interface ReferralState {
  loading: boolean;
  Referral: any[];
  selectedReferral: any | null;
  totalReferrals: number;
  ReferralDetails: any | null;
  totalReferralDetails: number;
  successMessage: string | null;
  error: string | null;
  currentPage: number;
  totalPages: number;
}

const initialState: ReferralState = {
  loading: false,
  Referral: [],
  selectedReferral: null,
  totalReferrals: 0,
  ReferralDetails: null,
  totalReferralDetails: 0,
  successMessage: null,
  error: null,
  currentPage: 1,
  totalPages: 0,
};

const referralslice = createSlice({
  name: 'referral',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all referrals
      .addCase(getAllReferrals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllReferrals.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.Referral = action.payload.data;
        state.totalReferrals = action.payload.total;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getAllReferrals.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get referral by userId
      .addCase(getReferralByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReferralByUserId.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.selectedReferral = action.payload.data;
      })
      .addCase(getReferralByUserId.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch all referral details
      .addCase(getReferralDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReferralDetails.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.ReferralDetails = action.payload.data;
        state.totalReferralDetails = action.payload.total;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getReferralDetails.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Referral Percentage
      .addCase(updateReferralPercentage.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(updateReferralPercentage.fulfilled, (state, action: PayloadAction<AxiosResponse<any>>) => {
        state.loading = false;
        const updatedReferral = action.payload?.data;
        
        if (updatedReferral) {
          // Update the list of referrals
          state.Referral = state.Referral.map(referral =>
            referral._id === updatedReferral._id ? { ...referral, ...updatedReferral } : referral
          );

          // Update the selected referral if it matches
          if (state.selectedReferral && state.selectedReferral._id === updatedReferral._id) {
            state.selectedReferral = { ...state.selectedReferral, ...updatedReferral };
          }

          // Show success message
          state.successMessage = 'Referral percentage updated successfully';
        }
      })
      .addCase(updateReferralPercentage.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update referral percentage';
      });
  },
});

export const { setCurrentPage } = referralslice.actions;
export default referralslice.reducer;
