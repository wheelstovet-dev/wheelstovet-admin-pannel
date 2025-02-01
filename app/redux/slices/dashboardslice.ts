import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAllEnquiries, getEnquiryId, getPendingSubscriptions, getUnassignedCases, getTodaysCases } from '../actions/dashboardAction';

interface DashboardState {
  loading: boolean;

  Enquiries: any[];
  selectedEnquiry: any | null;
  totalEnquiry: number;

  pendingSubscriptions: any[];
  selectedPendingSubs: any | null;
  totalPendingSubs: number;

  unassignedCases: any[];
  selectedUnassignedCase: any | null;
  totalUnassignedCases: number;

  todaysCases: any[];  // Added today's cases state
  successMessage: string | null;
  error: string | null;
  currentPage: number;
  totalPages: number;
}

const initialState: DashboardState = {
  loading: false,

  Enquiries: [],
  selectedEnquiry: null,
  totalEnquiry: 0,

  pendingSubscriptions: [],
  selectedPendingSubs: null,
  totalPendingSubs: 0,

  unassignedCases: [],
  selectedUnassignedCase: null,
  totalUnassignedCases: 0,

  todaysCases: [],  // Initialize today's cases array
  successMessage: null,
  error: null,
  currentPage: 1,
  totalPages: 0,
};

const dashboardslice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      // -----------ENQUIRY SECTION --------------

      // Fetch all enquiries
      .addCase(getAllEnquiries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllEnquiries.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.Enquiries = action.payload.data;
        state.totalEnquiry = action.payload.total;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getAllEnquiries.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Enquiry by Id
      .addCase(getEnquiryId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEnquiryId.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.selectedEnquiry = action.payload.data;
      })
      .addCase(getEnquiryId.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      // -----------PENDING SUBSCRIPTION SECTION --------------

      // Fetch Pending Subscriptions
      .addCase(getPendingSubscriptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPendingSubscriptions.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.pendingSubscriptions = action.payload.data;
        state.totalPendingSubs = action.payload.total;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getPendingSubscriptions.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      // -----------UNASSIGNED CASES SECTION --------------

      // Fetch Unassigned Cases
      .addCase(getUnassignedCases.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUnassignedCases.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.unassignedCases = action.payload.data;
        state.totalUnassignedCases = action.payload.total;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getUnassignedCases.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      // -----------TODAY'S CASES SECTION --------------

      // Fetch Today's Cases
      .addCase(getTodaysCases.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTodaysCases.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.todaysCases = action.payload.data; // Update today's cases in the state
      })
      .addCase(getTodaysCases.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCurrentPage } = dashboardslice.actions;
export default dashboardslice.reducer;
