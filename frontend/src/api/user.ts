import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useAuthStore } from "../store/authStore";

import axios from "./axios";

export const useUpdateUsername = () => {
  const { authData } = useAuthStore();

  return useMutation({
    mutationFn: ({
      updatedUsername,
      id,
    }: {
      updatedUsername: string;
      id: number;
    }) => {
      return axios.put(`/user/${id}`, { updatedUsername });
    },
    onSuccess: ({ data }) => {
      authData(data.result);
      toast.success(data.message);
    },
  });
};
