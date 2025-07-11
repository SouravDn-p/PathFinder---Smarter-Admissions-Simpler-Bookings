import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const collegeApi = createApi({
  reducerPath: "collegeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["college", "user", "review"],
  endpoints: (builder) => ({
    getAllColleges: builder.query({
      query: () => "colleges",
      providesTags: ["college"],
    }),
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "auth/register",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["user"],
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "auth/forgot-password",
        method: "POST",
        body: { email },
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ token, password }) => ({
        url: "auth/reset-password",
        method: "POST",
        body: { token, password },
      }),
    }),
    getUserByEmail: builder.query({
      query: (email) => `user/${email}`,
      providesTags: (result, error, email) => [{ type: "user", id: email }],
    }),
    updateUser: builder.mutation({
      query: ({ email, data }) => ({
        url: `user/${email}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { email }) => [
        { type: "user", id: email },
      ],
    }),
    getReviews: builder.query({
      query: (collegeId) =>
        `reviews${collegeId ? `?collegeId=${collegeId}` : ""}`,
      providesTags: (result, error, collegeId) => [
        { type: "review", id: collegeId || "LIST" },
      ],
    }),
    addReview: builder.mutation({
      query: (reviewData) => ({
        url: "reviews",
        method: "POST",
        body: reviewData,
      }),
      invalidatesTags: (result, error, { collegeId }) => [
        { type: "review", id: collegeId },
        { type: "review", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllCollegesQuery,
  useRegisterUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetUserByEmailQuery,
  useUpdateUserMutation,
  useGetReviewsQuery,
  useAddReviewMutation,
} = collegeApi;
