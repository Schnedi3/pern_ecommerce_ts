import { create } from "zustand";

import { ICartStore } from "../types/types";
import { getCartRequest } from "../Routes";

export const useCartStore = create<ICartStore>((set) => ({
  cart: [],
  itemsInCart: 0,
  totalAmount: 0,

  getCartStore: async () => {
    try {
      const { data } = await getCartRequest();

      if (!data.success) {
        console.log(data.message);
      }

      set(() => ({
        cart: data,
      }));
    } catch (error) {
      console.log(error instanceof Error ? error.message : "Unexpected error");
    }
  },

  addToCartStore: (product) =>
    set((state) => ({
      cart: [...state.cart, product],
    })),

  deleteFromCartStore: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),

  updateProductQuantityStore: (id, updatedItem) =>
    set((state) => ({
      cart: state.cart.map((item) => (item.id === id ? updatedItem : item)),
    })),

  quantityInCart: () =>
    set((state) => ({
      itemsInCart: state.cart.reduce((acc, item) => acc + item.quantity, 0),
    })),

  totalCart: () =>
    set((state) => ({
      totalAmount: state.cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      ),
    })),
}));
