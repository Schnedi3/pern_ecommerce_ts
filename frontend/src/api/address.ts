import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import axios from "./axios";
import { IAddress } from "../types/types";

export const useAddress = () => {
  return useQuery({
    queryKey: ["addresses"],
    queryFn: async () => {
      const { data } = await axios.get("/address");
      return data.result;
    },
  });
};

export const useAddAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (address: IAddress) => {
      return axios.post("/address", address);
    },
    onSuccess: ({ data }) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
  });
};

export const useUpdateAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ address, id }: { address: IAddress; id: number }) => {
      return axios.put(`/address/${id}`, address);
    },
    onSuccess: ({ data }) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
  });
};

export const useDeleteAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => {
      return axios.delete(`/address/${id}`);
    },
    onSuccess: ({ data }) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
  });
};
