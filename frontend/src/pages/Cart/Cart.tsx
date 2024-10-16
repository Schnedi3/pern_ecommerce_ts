import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useAuthStore } from "../../store/authStore";
import { useShopContext } from "../../context/useShopContext";
import { formatCurrency } from "../../helpers/formatCurrency";
import {
  deleteFromCartRequest,
  iconCart,
  iconDelete,
  Title,
  updateCartRequest,
} from "../../Routes";
import { imagesURL } from "../config";
import styles from "./cart.module.css";

export const Cart = () => {
  const { cart, setCart, getCart, totalAmount } = useShopContext();
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const updateQuantity = async (
    productId: number,
    quantity: number,
    size: string
  ) => {
    try {
      const response = await updateCartRequest(productId, quantity, size);

      if (response.data.success) {
        const updateItem = response.data.result;
        setCart(
          cart.map((item) => (item.id === productId ? updateItem : item))
        );
        getCart();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("An unexpected error occurred");
      }
    }
  };

  const deleteProduct = async (product_id: number, size: string) => {
    try {
      const response = await deleteFromCartRequest(product_id, size);

      if (response.data.success) {
        setCart(cart.filter((item) => item.id !== product_id));
        getCart();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("An unexpected error occurred");
      }
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
                updateQuantity(
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
              onClick={() => deleteProduct(item.product_id, item.size)}
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
