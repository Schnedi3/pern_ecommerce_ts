import axios from "./axios";

export const addToCartRequest = (
  productId: number,
  quantity: number,
  size: string
) => {
  return axios.post(`/cart/${productId}`, { quantity, size });
};

export const deleteFromCartRequest = (productId: number, size: string) => {
  return axios.delete(`/cart/${productId}`, { data: { size } });
};

export const getCartRequest = () => {
  return axios.get("/cart");
};

export const updateProductQuantityRequest = (
  productId: number,
  quantity: number,
  size: string
) => {
  return axios.put(`/cart/${productId}`, { quantity, size });
};
