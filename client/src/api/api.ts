import axios from "axios";
import { getUserInfos } from "../redux/features/slices/userSlice";
import { updateAccessToken } from "../redux/features/slices/authSlice";

//const apiUrl = process.env.apiUrl;
export const baseURL = "http://localhost:3000";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": ["application/json"],
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Add authorization token to headers if available
    const accessToken = localStorage.getItem("access_token");
    console.log("access token ", accessToken);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    console.log("config :", config);
    return config;
  },
  (error) => {
    console.log("err :", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    // Handle token expiration and refresh logic
    if (
      error.response.data.message == "invalid access_token" &&
      error.response.data.statusCode == 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      //get refresh token from localstorage
      const refreshToken = localStorage.getItem("refresh_token");

      if (refreshToken) {
        try {
          const res = await axios.post(`${baseURL}auth/refresh`, {
            refresh_token: refreshToken,
          });

          //add new access token
          updateAccessToken(res.data.new_access_token);

          //get user informations with the new token
          getUserInfos(res.data.new_access_token);

          return axiosInstance(originalRequest);
        } catch (refreshError) {
          //invalid refresh token , logout user

          console.error("Refresh token error:", refreshError);
        }
      } else {
        //invalid refresh token , logout user
      }
    }
    console.log("response err : ", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
