import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import axios from "./axios";
import { useNavigate } from "react-router-dom";

export const useOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data } = await axios.get(`/order/user`);
      return data.result;
    },
  });
};

export const useAddOrder = () => {
  const queryClient = useQueryClient();
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
      sessionId: string | null;
    }) => {
      return axios.post("/order", {
        shippingAddress,
        totalAmount,
        paymentMethod,
        sessionId,
      });
    },
    onSuccess: ({ data }) => {
      if (!data.result.session_id) {
        navigate("/success");
      }

      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};
