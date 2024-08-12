import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface TUserDetails {
  email: string;
  userName: string;
  password: string;
}

export const bookApi = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<{ message: string }, any>({
      query: (userDetails) => ({
        url: "register",
        method: "POST",
        body: userDetails,
      }),
    }),
    confirmRegistration: builder.mutation<{ message: string }, any>({
      query: (token: string) => ({
        url: "confirmation",
        method: "POST",
        body: token,
      }),
    }),
    resetPass: builder.mutation({
      query: (email: { email: string }) => ({
        url: "reset-password",
        method: "POST",
        body: email,
      }),
    }),
    updatePass: builder.mutation({
      query: (resetDetails: { token: string; password: string }) => ({
        url: "new-password",
        method: "PUT",
        body: resetDetails,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useResetPassMutation,
  useUpdatePassMutation,
  useConfirmRegistrationMutation,
} = bookApi;
