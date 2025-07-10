import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import { collegeApi } from "./api/collegeApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [collegeApi.reducerPath]: collegeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(collegeApi.middleware),
});
