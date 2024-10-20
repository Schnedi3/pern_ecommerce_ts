import { useQuery } from "@tanstack/react-query";

import axios from "./axios";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axios.get("/product");
      return data.result;
    },
  });
};

export const useProduct = (id: number) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data } = await axios.get(`/product/${id}`);
      return data.result;
    },
  });
};
