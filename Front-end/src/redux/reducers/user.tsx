import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
};

export const userReducer = createReducer(initialState, {
  LoadUserRequest: (state: any) => {
    state.loading = true;
  },
  LoadUserSuccess: (state: any, action) => {
    state.isAuthenticated = true;
    state.loading = false;
    state.user = action.payload;
  },
  LoadUserFail: (state: any, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },

  // update user information
  updateUserInfoRequest: (state: any) => {
    state.loading = true;
  },
  updateUserInfoSuccess: (state: any, action) => {
    state.loading = false;
    state.user = action.payload;
  },
  updateUserInfoFailed: (state: any, action) => {
    state.loading = false;
    state.error = action.payload;
  },
});
