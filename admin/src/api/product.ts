import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import axios from "./axios";

export const useAddProduct = () => {
  return useMutation({
    mutationFn: (formData: FormData) => {
      return axios.post("/product", formData);
    },
    onSuccess: ({ data }) => {
      toast.success(data.message);
    },
  });
};

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axios.get(`/product`);
      return data.result;
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => {
      return axios.delete(`/product/${id}`);
    },
    onSuccess: ({ data }) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
