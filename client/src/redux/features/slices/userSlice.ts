import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance, { baseURL } from "../../../api/api";
import axios from "axios";

enum UserRole {
  "ADMIN",
  "USER",
}

interface UserInfos {
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole | null;
}

interface InitialState {
  user: UserInfos;
  isLoading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  user: {
    firstName: "",
    lastName: "",
    email: "",
    role: null,
  },
  isLoading: false,
  error: null,
};

interface LoginData {
  email: string;
  password: string;
}

export const getUserInfos = createAsyncThunk(
  "userInfos",
  async (token: string) => {
    try {
      const response = await axiosInstance.post(`${baseURL}/user/me`, {
        token,
      });
      return response.data;
    } catch (err: any) {
      // Throw an error to trigger the 'rejected' action
      throw err.response.data.message;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserInfos.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    }),
      builder.addCase(getUserInfos.fulfilled, (state, action) => {
        console.log(action.payload);
        state.user = action.payload.user;
      }),
      builder.addCase(getUserInfos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message!;
        console.log("rejected", action.error.message);
      });
  },
});

export default userSlice.reducer;
