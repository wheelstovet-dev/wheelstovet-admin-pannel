import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { getAllReferrals, getReferralByUserId } from '../actions/referralAction';

interface ReferralState {
  loading: boolean;
  Referral: any[];
  selectedReferral: any | null;
  successMessage: string | null;
  error: string | null;
  currentPage: number;
  totalReferrals: number;
  totalPages: number;
}

const initialState: ReferralState = {
  loading: false,
  Referral: [],
  selectedReferral: null,
  successMessage: null,
  error: null,
  currentPage: 1,
  totalReferrals: 0,
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
      });

    //   //update  referral by id
    //   .addCase(updateReferrral.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(updateReferrral.fulfilled, (state, action: PayloadAction<AxiosResponse<any>>) => {
    //     state.loading = false;
    //     const updatedReferral = action.payload?.data;
      
    //     if (updatedReferral && Array.isArray(state.Referral)) {
    //       state.Referral = state.Referral.map(referral =>
    //         referral?._id === updatedReferral._id ? { ...referral, ...updatedReferral } : referral
    //       );
    //     }
      
    //     if (updatedReferral && state.selectedReferral && state.selectedReferral._id === updatedReferral._id) {
    //       state.selectedReferral = { ...state.selectedReferral, ...updatedReferral };
    //     }
    //   })
      
    //   .addCase(updateReferrral.rejected, (state, action: PayloadAction<any>) => {
    //     state.loading = false;
    //     state.error = action.payload;
    //   });

    },
});

export const { setCurrentPage } = referralslice.actions;
export default referralslice.reducer;