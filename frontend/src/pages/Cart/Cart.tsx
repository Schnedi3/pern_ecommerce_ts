import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useCartStore } from "../../store/cartStore";
import { useAuthStore } from "../../store/authStore";
import { formatCurrency } from "../../helpers/formatCurrency";
import {
  deleteFromCartRequest,
  iconCart,
  iconDelete,
  Title,
  updateProductQuantityRequest,
} from "../../Routes";
import { imagesURL } from "../config";
import styles from "./cart.module.css";

export const Cart = () => {
  const { isAuthenticated } = useAuthStore();
  const {
    cart,
    getCartStore,
    deleteFromCartStore,
    updateProductQuantityStore,
    totalAmount,
  } = useCartStore();
  const navigate = useNavigate();

  // const getCart = useCallback(async () => {
  //   try {
  //     const { data } = await getCartRequest();

  //     if (!data.success) {
  //       console.log(data.message);
  //     }

  //     getCartStore(data.result);
  //   } catch (error) {
  //     console.log(error instanceof Error ? error.message : "Unexpected error");
  //   }
  // }, [getCartStore]);

  useEffect(() => {
    getCartStore();
  }, [getCartStore]);

  const deleteFromCart = async (productId: number, size: string) => {
    try {
      const { data } = await deleteFromCartRequest(productId, size);

      if (!data.success) {
        console.log(data.message);
      }

      deleteFromCartStore(productId);
      getCartStore();
      toast.success(data.message);
    } catch (error) {
      console.log(error instanceof Error ? error.message : "Unexpected error");
    }
  };

  const updateProductQuantity = async (
    productId: number,
    quantity: number,
    size: string
  ) => {
    try {
      const { data } = await updateProductQuantityRequest(
        productId,
        quantity,
        size
      );

      if (!data.success) {
        console.log(data.message);
      }

      updateProductQuantityStore(productId, data.result);
      getCartStore();
      toast.success(data.message);
    } catch (error) {
      console.log(error instanceof Error ? error.message : "Unexpected error");
    }
  };

  if (!isAuthenticated) {
    return (
      <section className={styles.empty}>
        <img
          className={styles.emptyIcon}
          src={iconCart}
          alt="empty cart icon"
        />
        <p className={styles.emptyText}>Please login first</p>
      </section>
    );
  }

  if (cart.length === 0) {
    return (
      <section className={styles.empty}>
        <img
          className={styles.emptyIcon}
          src={iconCart}
          alt="empty cart icon"
        />
        <p className={styles.emptyText}>Your cart is empty</p>
      </section>
    );
  }

  return (
    <section className={styles.cart}>
      <article>
        <Title title="Cart" />

        {cart.map((item, index) => (
          <div className={styles.product} key={index}>
            <img
              className={styles.productImage}
              src={`${imagesURL}/${item.images[0]}`}
              alt={item.title}
            />
            <h3 className={styles.productTitle}>{item.title}</h3>
            <input
              className={styles.input}
              type="number"
              id="quantity"
              min={1}
              defaultValue={item.quantity}
              onChange={(e) =>
                updateProductQuantity(
                  item.product_id,
                  Number(e.target.value),
                  item.size
                )
              }
            />
            <p className={styles.productText}>{item.size}</p>
            <p className={styles.productText}>{formatCurrency(item.price)}</p>
            <img
              className={styles.delete}
              src={iconDelete}
              alt="delete product"
              onClick={() => deleteFromCart(item.product_id, item.size)}
            />
          </div>
        ))}
      </article>

      <article className={styles.total}>
        <Title title="Total" />
        <div className={styles.totalInfo}>
          <p className={styles.shipping}>
            Shipping <span>Free</span>
          </p>
          <h3 className={styles.totalAmount}>
            Total <span>{formatCurrency(totalAmount)}</span>
          </h3>
        </div>
        <button
          className="dark_button"
          onClick={() => navigate("/order-summary")}
        >
          proceed to summary
        </button>
      </article>
    </section>
  );
};
