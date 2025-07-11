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
  tagTypes: ["college", "user"],

  endpoints: (builder) => ({
    getAllColleges: builder.query({
      query: () => "colleges",
    }),

    registerUser: builder.mutation({
      query: (userData) => ({
        url: "auth/register",
        method: "POST",
        body: userData,
      }),
    }),

    getUserByEmail: builder.query({
      query: (email) => `users/${email}`,
      providesTags: (result, error, email) => [{ type: "user", id: email }],
    }),

    updateUser: builder.mutation({
      query: ({ email, data }) => ({
        url: `users/${email}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { email }) => [
        { type: "user", id: email },
      ],
    }),
  }),
});

export const {
  useGetAllCollegesQuery,
  useRegisterUserMutation,
  useGetUserByEmailQuery,
  useUpdateUserMutation,
} = collegeApi;
