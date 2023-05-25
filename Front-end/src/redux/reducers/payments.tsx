import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  error: false,
  success: false,
  payments: [],
};

export const paymentReducer = createReducer(initialState, {
  createPaymentRequest: (state: any) => {
    state.isLoading = true;
  },
  createPaymentSuccess: (state: any, action: any) => {
    state.isLoading = false;
    state.success = true;
  },
  createPaymentFail: (state: any, action: any) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },

  getAllPaymentsRequest: (state: any) => {
    state.isLoading = true;
  },
  getAllPaymentsSuccess: (state: any, action: any) => {
    state.isLoading = false;
    state.payments = action.payload;
    state.success = true;
  },
  getAllPaymentsFail: (state: any, action: any) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },
});
