import { useMutation, useQuery } from "@tanstack/react-query";

import axios from "./axios";
import { ICartItem } from "../types/types";

export const useFetchCheckoutSession = (sessionId: string) => {
  return useQuery({
    queryKey: ["session", sessionId],
    queryFn: async () => {
      const { data } = await axios.get(
        `/payment/checkout-session?session_id=${sessionId}`
      );
      return data;
    },
  });
};

export const useCheckoutSession = () => {
  return useMutation({
    mutationFn: ({
      cart,
      shippingAddress,
      totalAmount,
      paymentMethod,
    }: {
      cart: ICartItem[];
      shippingAddress: number;
      totalAmount: number;
      paymentMethod: string;
    }) => {
      return axios.post("/payment/checkout-session", {
        cart,
        shippingAddress,
        totalAmount,
        paymentMethod,
      });
    },
  });
};
