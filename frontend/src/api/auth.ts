import axios from "./axios";

import { IUser } from "../types/types";

export const loginGoogleRequest = (accessToken: string) => {
  return axios.post("/auth/google", { accessToken });
};

export const loginRequest = (user: IUser) => {
  return axios.post("/auth/login", user);
};

export const registerRequest = (user: IUser) => {
  return axios.post("/auth/register", user);
};

export const resetPasswordRequest = (user: IUser) => {
  return axios.put("/auth/reset-password", user);
};

export const generateRefreshToken = () => {
  return axios.post("/auth/refresh-token");
};

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await generateRefreshToken();
        return axios(originalRequest);
      } catch (refreshError) {
        console.log(`Token refresh error: ${refreshError}`);
      }
    }
    return Promise.reject(error);
  }
);
