import { useNavigate } from "react-router-dom";

import { useAuthStore } from "../../store/authStore";
import {
  useCart,
  useDeleteFromCart,
  useUpdateProductQuantity,
} from "../../api/cart";
import { ICartItem } from "../../types/types";
import { formatCurrency } from "../../helpers/formatCurrency";
import { iconCart, iconDelete, Title } from "../../Routes";
import { imagesURL } from "../config";
import styles from "./cart.module.css";

export const Cart = () => {
  const { isAuthenticated } = useAuthStore();
  const { data: cart, error, isLoading } = useCart();
  const { mutate: updateProductQuantity } = useUpdateProductQuantity();
  const { mutate: deleteFromCart } = useDeleteFromCart();
  const navigate = useNavigate();

  const handleUpdateProductQuantity = (
    id: number,
    quantity: number,
    size: string
  ) => {
    updateProductQuantity({ id, quantity, size });
  };

  const handleDeleteFromCart = (id: number, size: string) => {
    deleteFromCart({ id, size });
  };

  const totalAmount = cart?.reduce(
    (acc: number, item: ICartItem) => acc + item.price * item.quantity,
    0
  );

  if (!isAuthenticated || !cart || error || isLoading) {
    return (
      <section className={styles.empty}>
        <img
          className={styles.emptyIcon}
          src={iconCart}
          alt="empty cart icon"
        />
        <p className={styles.emptyText}>No data available</p>
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

        {cart.map((product: ICartItem) => (
          <div className={styles.product} key={product.product_id}>
            <img
              className={styles.productImage}
              src={`${imagesURL}/${product.images[0]}`}
              alt={product.title}
            />
            <h3 className={styles.productTitle}>{product.title}</h3>
            <input
              className={styles.input}
              type="number"
              id="quantity"
              min={1}
              defaultValue={product.quantity}
              onChange={(e) =>
                handleUpdateProductQuantity(
                  product.product_id,
                  Number(e.target.value),
                  product.size
                )
              }
            />
            <p className={styles.productText}>{product.size}</p>
            <p className={styles.productText}>
              {formatCurrency(product.price)}
            </p>
            <img
              className={styles.delete}
              src={iconDelete}
              alt="delete product"
              onClick={() =>
                handleDeleteFromCart(product.product_id, product.size)
              }
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
