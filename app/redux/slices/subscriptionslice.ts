import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { getAllSubscriptions, getSubscriptionById, getWalkRecords, updateSubscriptionStatus } from '../actions/subscriptionAction';


interface SubscriptionState {
  loading: boolean;
  subscriptions: any[];
  selectedSubscription: any | null;
  walkRecords: any[];
  error: string | null;
  currentPage: number;
  totalSubscriptions: number;
  totalPages: number;
}

const initialState: SubscriptionState = {
  loading: false,
  subscriptions: [],
  walkRecords: [], // Add walkRecords to initial state
  selectedSubscription: null,
  error: null,
  currentPage: 1,
  totalSubscriptions: 0,
  totalPages: 0,
};

const subscriptionSlice = createSlice({
  name: 'subscriptions',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload; // Update currentPage in state
    },
  },
  extraReducers: (builder) => {
    builder
      // get all subscriptions slice
      .addCase(getAllSubscriptions.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getAllSubscriptions.fulfilled,
        (state, action: PayloadAction<AxiosResponse<{ total: number; currentPage: number; totalPages: number; subscriptions: any[] }>>) => {
          state.loading = false;
          // Accessing data from action.payload.data
          state.subscriptions = action.payload.data.subscriptions; // Set subscriptions from response
          state.totalSubscriptions = action.payload.data.total; // Total subscriptions from response
          state.currentPage = action.payload.data.currentPage; // Current page from response
          state.totalPages = action.payload.data.totalPages; // Total pages from response
        }
      )
      .addCase(getAllSubscriptions.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      //get Subscription by id
    .addCase(getSubscriptionById.pending, (state) => {
      state.loading = true;
    })
    .addCase(getSubscriptionById.fulfilled, (state, action: PayloadAction<AxiosResponse<any>>) => {
      state.loading = false;
      state.selectedSubscription = action.payload.data;
    })
    .addCase(getSubscriptionById.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    })

      // get walk records slice
      .addCase(getWalkRecords.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getWalkRecords.fulfilled,
        (state, action: PayloadAction<AxiosResponse<{ total: number; currentPage: number; totalPages: number; subscriptions: any[] }>>) => {
          state.loading = false;
          state.walkRecords = action.payload.data.subscriptions; // Store walk records in walkRecords array
          state.currentPage = action.payload.data.currentPage;
          state.totalPages = action.payload.data.totalPages;
        }
      )
      .addCase(getWalkRecords.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      // slice to update the status of subscription
      .addCase(updateSubscriptionStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateSubscriptionStatus.fulfilled,
        (state, action: PayloadAction<AxiosResponse<any>>) => {
          state.loading = false;
          const updatedSubscription = action.payload.data;
          if (Array.isArray(state.subscriptions)) {
            state.subscriptions = state.subscriptions.map((subscription) =>
              subscription._id === updatedSubscription._id ? updatedSubscription : subscription
            );
          }
          state.selectedSubscription = updatedSubscription;
        }
      )
      .addCase(updateSubscriptionStatus.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update subscription Status';
      });
  },
});

export const { setCurrentPage } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
