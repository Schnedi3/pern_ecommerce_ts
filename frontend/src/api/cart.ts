import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import axios from "./axios";

export const useCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const { data } = await axios.get("/cart");
      return data.result;
    },
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      quantity,
      selectedSize,
    }: {
      id: number;
      quantity: number;
      selectedSize: string;
    }) => {
      return axios.post(`/cart/${id}`, { quantity, selectedSize });
    },
    onSuccess: ({ data }) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

export const useUpdateProductQuantity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      quantity,
      size,
    }: {
      id: number;
      quantity: number;
      size: string;
    }) => {
      return axios.put(`/cart/${id}`, { quantity, size });
    },
    onSuccess: ({ data }) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

export const useDeleteFromCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, size }: { id: number; size: string }) => {
      return axios.delete(`/cart/${id}`, { data: { size } });
    },
    onSuccess: ({ data }) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};
