import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import axios from "./axios";

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axios.get(`/user`);
      return data.result;
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => {
      return axios.delete(`/user/${id}`);
    },
    onSuccess: ({ data }) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
