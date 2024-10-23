import { useNavigate } from "react-router-dom";

import { useAuthStore } from "../../store/authStore";
import {
  useCart,
  useDeleteFromCart,
  useUpdateProductQuantity,
} from "../../api/cart";
import { ICartItem } from "../../types/types";
import { formatCurrency } from "../../helpers/formatCurrency";
import { iconDelete, Title } from "../../Routes";
import { imagesURL } from "../config";
import { CartSkeleton } from "../../skeletons/CartSkeleton";
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

  if (!isAuthenticated || !cart || cart.length === 0 || error || isLoading) {
    return <CartSkeleton />;
  }

  return (
    <section className={styles.cart}>
      <article>
        <Title title="Cart" />

        {cart.map(
          ({ images, price, product_id, quantity, size, title }: ICartItem) => (
            <div className={styles.product} key={product_id}>
              <img
                className={styles.productImage}
                src={`${imagesURL}/${images[0]}`}
                alt={title}
              />
              <h3 className={styles.productTitle}>{title}</h3>
              <input
                className={styles.input}
                type="number"
                id="quantity"
                min={1}
                defaultValue={quantity}
                onChange={(e) =>
                  handleUpdateProductQuantity(
                    product_id,
                    Number(e.target.value),
                    size
                  )
                }
              />
              <p className={styles.productText}>{size}</p>
              <p className={styles.productText}>{formatCurrency(price)}</p>
              <img
                className={styles.delete}
                src={iconDelete}
                alt="delete product"
                onClick={() => handleDeleteFromCart(product_id, size)}
              />
            </div>
          )
        )}
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
        <button className="dark_button" onClick={() => navigate("/checkout")}>
          proceed to summary
        </button>
      </article>
    </section>
  );
};
