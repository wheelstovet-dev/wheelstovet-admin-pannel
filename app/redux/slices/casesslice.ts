import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAllCases, getCaseById } from '../actions/casesAction';

interface UserState {
  loading: boolean;
  cases: any;
  selectedCase: any | null;
  error: string | null;
  currentPage: number;
  totalCases: number;
  totalPages: number;
}

const initialState: UserState = {
  loading: false,
  cases: [],
  selectedCase: null,
  error: null,
  currentPage: 1,
  totalCases: 0,
  totalPages: 0
};

const caseslice = createSlice({
  name: 'cases',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<any>) {
      state.currentPage = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCases.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCases.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        // console.log(action.payload);
        state.cases = action.payload.data;
        // console.log(state.cases);
        state.totalCases = action.payload.total;
        // console.log(state.totalCases);
        state.currentPage = action.payload.currentPage;
        // console.log(state.currentPage);
        state.totalPages = action.payload.totalPages;
        // console.log(state.totalPages);
      })
      .addCase(getAllCases.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Get case by ID
      .addCase(getCaseById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCaseById.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        console.log(action.payload);
        state.selectedCase = action.payload.data; // Update selectedCase with the fetched case data
      })
      .addCase(getCaseById.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setCurrentPage } = caseslice.actions;
export default caseslice.reducer;
