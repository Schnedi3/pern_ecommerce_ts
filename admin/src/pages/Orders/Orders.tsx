import { useOrders, useUpdateOrder, useDeleteOrder } from "../../api/order";

import { formatCurrency } from "../../helpers/formatCurrency";
import { iconBox, iconDelete, Title } from "../../Routes";
import { IOrder } from "../../types/types";
import { imagesURL } from "../Config";
import styles from "./orders.module.css";

export const Orders = () => {
  const { data: orders, error, isLoading } = useOrders();
  const { mutate: updateOrder } = useUpdateOrder();
  const { mutate: deleteOrder } = useDeleteOrder();

  const handleOnChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    id: number
  ) => {
    const status = e.target.value;
    updateOrder({ id, status });
  };

  if (!orders || orders.length === 0 || error || isLoading) {
    return (
      <section className={styles.empty}>
        <img className={styles.emptyIcon} src={iconBox} alt="" />
        <p className={styles.emptyText}>No data available</p>
      </section>
    );
  }

  return (
    <section className={styles.orders}>
      <Title title="Orders" />
      <ul className="order">
        {orders.map((order: IOrder) => (
          <li className={styles.singleOrder} key={order.order_id}>
            {order.products.map((item) => (
              <img
                className={styles.itemImage}
                src={`${imagesURL}/${item.images[0]}`}
                key={item.id}
              />
            ))}

            <article>
              {order.products.map((item) => (
                <div key={item.id}>
                  <p>{item.title}</p>
                  <p>
                    <span className={styles.orderSpan}>Quantity:</span>{" "}
                    {item.quantity}
                  </p>
                  <p>
                    <span className={styles.orderSpan}>Size:</span> {item.size}
                  </p>
                </div>
              ))}
              <br />
              <p>
                {order.first_name} {order.last_name}
              </p>
              <p>
                {order.street}, {order.number} - {order.door}
              </p>
              <p>
                {order.city}, {order.state} - {order.zip_code}
              </p>
              <p>
                <span className={styles.orderSpan}>Phone number:</span>{" "}
                {order.phone}
              </p>
            </article>

            <article>
              <p>
                <span className={styles.orderSpan}>Items:</span>{" "}
                {order.products.length}
              </p>
              <p>
                <span className={styles.orderSpan}>Payment method:</span>{" "}
                {order.payment_method}
              </p>
              <p>
                <span className={styles.orderSpan}>Date:</span>{" "}
                {new Date(order.order_date).toLocaleString()}
              </p>
            </article>

            <h3>{formatCurrency(order.order_amount)}</h3>

            <select
              className={styles.orderSelect}
              value={order.order_status}
              onChange={(e) => handleOnChange(e, order.order_id)}
            >
              <option value="Order placed">Order placed</option>
              <option value="On transit">On transit</option>
              <option value="Delivered">Delivered</option>
            </select>

            <img
              className={styles.orderDelete}
              src={iconDelete}
              alt="delete order"
              onClick={() => deleteOrder(order.order_id)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};
