import { useMutation, useQuery } from "@tanstack/react-query";
import { loadStripe } from "@stripe/stripe-js";

import axios from "./axios";
import { ICartItem } from "../types/types";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

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

export const useCreateCheckoutSession = () => {
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
    onSuccess: async ({ data }) => {
      const stripe = await stripePromise;

      if (stripe) {
        stripe.redirectToCheckout({ sessionId: data.id });
      }
    },
  });
};
