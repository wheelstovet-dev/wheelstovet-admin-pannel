import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createCoupon, getAllCoupons, getCouponByCode, updateCoupon } from '../actions/couponAction';
import { AxiosResponse } from 'axios';

interface CouponState {
  loading: boolean;
  Coupons: any[];
  selectedCoupons: any | null;
  successMessage: string | null;
  error: string | null;
  currentPage: number;
  totalCoupons: number;
  totalPages: number;
}

const initialState: CouponState = {
  loading: false,
  Coupons: [],
  selectedCoupons: null,
  successMessage: null,
  error: null,
  currentPage: 1,
  totalCoupons: 0,
  totalPages: 0,
};

const couponslice = createSlice({
  name: 'coupons',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

    //create coupon slice
    .addCase(createCoupon.pending, (state) => {
      state.loading = true;
    })
    .addCase(createCoupon.fulfilled, (state, action: PayloadAction<AxiosResponse<any>>) => {
      state.loading = false;
      const newCoupon = action.payload?.data;
      state.Coupons.push(newCoupon);
    })
    .addCase(createCoupon.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    })

      // Fetch all coupons
      .addCase(getAllCoupons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCoupons.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.Coupons = action.payload.data;
        state.totalCoupons = action.payload.total;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getAllCoupons.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get coupon by couponCode
      .addCase(getCouponByCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCouponByCode.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.selectedCoupons = action.payload.data;
      })
      .addCase(getCouponByCode.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      //update  coupon by id
      .addCase(updateCoupon.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCoupon.fulfilled, (state, action: PayloadAction<AxiosResponse<any>>) => {
        state.loading = false;
        const updatedCoupon = action.payload?.data;
      
        if (updatedCoupon && Array.isArray(state.Coupons)) {
          state.Coupons = state.Coupons.map(coupon =>
            coupon?._id === updatedCoupon._id ? { ...coupon, ...updatedCoupon } : coupon
          );
        }
      
        if (updatedCoupon && state.selectedCoupons && state.selectedCoupons._id === updatedCoupon._id) {
          state.selectedCoupons = { ...state.selectedCoupons, ...updatedCoupon };
        }
      })
      
      .addCase(updateCoupon.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
    },
});

export const { setCurrentPage } = couponslice.actions;
export default couponslice.reducer;