import axios from "./axios";

export const deleteOrderRequest = (id: number) => {
  return axios.delete(`/order/${id}`);
};

export const getOrderRequest = (id: number) => {
  return axios.get(`/order/${id}`);
};

export const getOrdersRequest = () => {
  return axios.get("/order");
};

export const updateOrderRequest = (id: number, status: string) => {
  return axios.put(`/order/${id}`, { status });
};
