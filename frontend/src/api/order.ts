import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import axios from "./axios";

export const useOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data } = await axios.get(`/order/user`);
      return data.result;
    },
  });
};

export const useCodOrder = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({
      shippingAddress,
      totalAmount,
      paymentMethod,
    }: {
      shippingAddress: number;
      totalAmount: number;
      paymentMethod: string;
    }) => {
      return axios.post("/order", {
        shippingAddress,
        totalAmount,
        paymentMethod,
      });
    },
    onSuccess: () => {
      navigate("/success");
    },
  });
};

export const useStripeOrder = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({
      shippingAddress,
      totalAmount,
      paymentMethod,
      sessionId,
    }: {
      shippingAddress: number;
      totalAmount: number;
      paymentMethod: string;
      sessionId: string;
    }) => {
      return axios.post("/order/stripe", {
        shippingAddress,
        totalAmount,
        paymentMethod,
        sessionId,
      });
    },
    onError: () => {
      navigate("/cart");
    },
  });
};
