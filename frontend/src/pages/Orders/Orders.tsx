import { useOrders } from "../../api/order";
import { Title } from "../../Routes";
import { formatCurrency } from "../../helpers/formatCurrency";
import { IOrder } from "../../types/types";
import { imagesURL } from "../config";
import { OrderSkeleton } from "../../skeletons/OrderSkeleton";
import styles from "./orders.module.css";

export const Orders = () => {
  const { data: orders, error, isLoading } = useOrders();

  if (!orders || orders?.length === 0 || error || isLoading) {
    return <OrderSkeleton />;
  }

  return (
    <ul className={styles.orders}>
      <Title title="All orders" />

      {orders.map(
        ({ order_date, order_id, order_status, products }: IOrder) => (
          <li className={styles.order} key={order_id}>
            {products.map(({ id, images, price, quantity, size, title }) => (
              <article className={styles.product} key={id}>
                <img
                  className={styles.productImage}
                  src={`${imagesURL}/${images[0]}`}
                  alt=""
                />

                <div className={styles.productInfo}>
                  <h3>{title}</h3>
                  <div>
                    <p>{formatCurrency(price)}</p>
                    <p>
                      <span className={styles.span}>Quantity:</span> {quantity}
                    </p>
                    <p>
                      <span className={styles.span}>Size:</span> {size}
                    </p>
                  </div>

                  <p>
                    <span className={styles.span}>Date:</span>{" "}
                    {new Date(order_date).toLocaleString()}
                  </p>
                </div>

                <p className={styles.status}>{order_status}</p>
              </article>
            ))}
          </li>
        )
      )}
    </ul>
  );
};
