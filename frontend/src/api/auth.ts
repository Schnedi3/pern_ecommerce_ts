import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import axios from "./axios";
import { useAuthStore } from "../store/authStore";
import { IUser } from "../types/types";

export const useLoginGoogle = () => {
  const { authData } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (accessToken: string) => {
      return axios.post("/auth/google", { accessToken });
    },
    onSuccess: ({ data }) => {
      if (data.result.role === "user") {
        toast.error("Wrong credentials");
        return;
      }

      authData(data.result);
      navigate("/");
    },
  });
};

export const useLogin = () => {
  const { authData } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (user: IUser) => {
      return axios.post("/auth/login", user);
    },
    onSuccess: ({ data }) => {
      if (data.result.role === "user") {
        toast.error("Wrong credentials");
        return;
      }

      authData(data.result);
      navigate("/");
    },
  });
};

export const useRegister = () => {
  const { authData } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (user: IUser) => {
      return axios.post("/auth/register", user);
    },
    onSuccess: ({ data }) => {
      authData(data.result);
      navigate("/");
    },
  });
};

export const useResetPassword = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (user: IUser) => {
      return axios.put("/auth/reset-password", user);
    },
    onSuccess: ({ data }) => {
      toast.success(data.message);
      navigate("/login");
    },
  });
};

// export const generateRefreshToken = () => {
//   return axios.get("/auth/refresh-token");
// };

// axios.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         await generateRefreshToken();
//         return axios(originalRequest);
//       } catch (refreshError) {
//         console.log(`Token refresh error: ${refreshError}`);
//       }
//     }
//     return Promise.reject(error);
//   }
// );
