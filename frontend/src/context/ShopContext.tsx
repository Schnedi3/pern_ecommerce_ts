import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";

import { CartItem, ShopContextType } from "../types/types";
import { getCartRequest } from "../Routes";

export const ShopContext = createContext<ShopContextType | undefined>(
  undefined
);

export const ShopProvider = ({ children }: PropsWithChildren) => {
  // cart
  const [cart, setCart] = useState<CartItem[]>([]);
  const [itemsInCart, setItemsInCart] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  // ----- cart ----- //
  const getCart = useCallback(async () => {
    try {
      const response = await getCartRequest();

      if (response.data.success) {
        setCart(response.data.result);
      } else {
        console.log(response.data.message);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("An unexpected error occurred");
      }
    }
  }, [setCart]);

  useEffect(() => {
    const quantityInCart = cart.reduce((acc, item) => acc + item.quantity, 0);
    setItemsInCart(quantityInCart);
  }, [cart]);

  useEffect(() => {
    const totalCart = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalAmount(totalCart);
  }, [cart]);

  return (
    <ShopContext.Provider
      value={{
        // cart
        cart,
        setCart,
        getCart,
        itemsInCart,
        totalAmount,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
