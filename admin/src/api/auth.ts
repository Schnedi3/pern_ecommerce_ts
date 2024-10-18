import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import axios from "./axios";
import { ILogin } from "../types/types";
import { useAuthStore } from "../store/authStore";

export const useLoginGoogle = () => {
  const { authData } = useAuthStore();

  return useMutation({
    mutationFn: (accessToken: string) => {
      return axios.post("/auth/google", { accessToken });
    },
    onSuccess: ({ data }) => {
      if (data.result.role === "user") {
        toast.error("Wrong credentials");
        return;
      }

      authData(data);
    },
  });
};

export const useLogin = () => {
  const { authData } = useAuthStore();

  return useMutation({
    mutationFn: (user: ILogin) => {
      return axios.post("/auth/login", user);
    },
    onSuccess: ({ data }) => {
      if (data.result.role === "user") {
        toast.error("Wrong credentials");
        return;
      }

      authData(data);
    },
  });
};
