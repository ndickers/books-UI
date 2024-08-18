import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface TBookDetails {
  data: Array<{
    title: string;
    author: string;
    year: number;
    id: number;
  }>;
}

export interface TIBook {
  title: string;
  author: string;
  year: number;
  user_id: number;
}
export type TUpdateBook = Omit<TIBook, "user_id"> & {
  id: number | null;
};
export interface TPostBook {
  message: string;
  data: Array<{ id: number }>;
}
export const bookApi = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/",
    prepareHeaders: (headers, { getState, endpoint }) => {
      if (endpoint === "getUserBooks" || endpoint === "createBook") {
        const token = (getState() as any).login.token as string;
        headers.set("Authorization", token);
      }
      return headers;
    },
  }),
  tagTypes: ["Books", "Book"],
  endpoints: (builder) => ({
    getUserBooks: builder.query<TBookDetails, number>({
      query: (id: number) => `books/${id}`,
      providesTags: ["Books"],
    }),
    createBook: builder.mutation<TPostBook, TIBook>({
      query: (bookDetail) => ({
        url: "books",
        method: "POST",
        body: bookDetail,
      }),
      invalidatesTags: ["Books"],
    }),

    updateBook: builder.mutation({
      query: ({ id, bookDetail }) => ({
        url: `/books/${id}`,
        method: "PUT",
        body: bookDetail,
      }),
      invalidatesTags: ["Books"],
    }),
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
    deleteBook: builder.mutation({
      query: (id: number) => ({ url: `books/${id}`, method: "DELETE" }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useResetPassMutation,
  useUpdateBookMutation,
  useCreateBookMutation,
  useDeleteBookMutation,
  useUpdatePassMutation,
  useConfirmRegistrationMutation,
  useGetUserBooksQuery,
} = bookApi;
