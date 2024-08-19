import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface TInitialState {
  token: null;
  user: null;
  loading: boolean;
  error: null | unknown;
}

interface TCredentials {
  email: string;
  password: string;
}

export const login = createAsyncThunk(
  "login/user",
  async function (logins: TCredentials, thunkAPI) {
    try {
      const response = await axios.post(
        "https://books-api-rsnz.onrender.com/login",
        logins
      );

      return { token: response.data.token, user: response.data.user };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          return thunkAPI.rejectWithValue(error.response.data.message);
        }
      }
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState: TInitialState = {
  token: null,
  user: null,
  loading: false,
  error: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.user = null;
      state.token = null;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload?.token;
      state.user = action.payload?.user;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(login.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.user = null;
      state.token = null;
    });
  },
});

export const { logout } = AuthSlice.actions;
export default AuthSlice.reducer;
