import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../../../api/api";
import axios from "axios";
import { getUserInfos } from "./userSlice";

interface InitialState {
  access_token: string | null;
  refresh_token: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  access_token: localStorage.getItem("access_token") || null,
  refresh_token: localStorage.getItem("refresh_token") || null,
  isLoading: false,
  error: null,
};

interface LoginData {
  email: string;
  password: string;
}

export const loginUser = createAsyncThunk(
  "login",
  async (data: LoginData, { dispatch }) => {
    try {
      const response = await axios.post(`${baseURL}/auth/signin`, data);
      let token = await response.data.access_token;
      if (token) {
        console.log("token is here");
      } else {
        console.log("there is no token");
      }
      //await dispatch(getUserInfos(token));
      return response.data;
    } catch (err: any) {
      // Throw an error to trigger the 'rejected' action
      throw err.response.data.message;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateAccessToken(state, action) {
      state.access_token = action.payload.new_access_token;
      localStorage.setItem("access_token", action.payload.access_token);
    },
    logout(state, action) {
      state.access_token = null;
      state.access_token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    }),
      builder.addCase(loginUser.fulfilled, (state, action) => {
        state.access_token = action.payload.access_token;
        state.refresh_token = action.payload.refresh_token;

        //set the tokens to the local storage
        localStorage.setItem("access_token", action.payload.access_token);
        localStorage.setItem("refresh_token", action.payload.refresh_token);
      }),
      builder.addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message!;
        console.log("rejected", action.error.message);
      });
  },
});

export const { logout, updateAccessToken } = authSlice.actions;
export default authSlice.reducer;
