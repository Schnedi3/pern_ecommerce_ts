import { useQuery } from "@tanstack/react-query";

import axios from "./axios";

export const addOrderRequest = (
  addressId: number,
  amount: number,
  paymentMethod: string
) => {
  return axios.post("/order", { addressId, amount, paymentMethod });
};

export const addStripeOrderRequest = (
  addressId: number,
  amount: number,
  paymentMethod: string,
  sessionId: string
) => {
  return axios.post("/order/stripe", {
    addressId,
    amount,
    paymentMethod,
    sessionId,
  });
};

export const useOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data } = await axios.get(`/order/user`);
      return data.result;
    },
  });
};
