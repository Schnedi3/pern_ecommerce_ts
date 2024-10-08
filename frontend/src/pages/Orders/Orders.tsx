import { useEffect, useState } from "react";

import { getUserOrdersRequest, iconBox } from "../../Routes";
import { formatCurrency } from "../../helpers/formatCurrency";
import { IOrder } from "../../types/types";
import { imagesURL } from "../config";

import "./orders.css";
import "../globals.css";

export const Orders = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);

  const getUserOrders = async () => {
    try {
      const response = await getUserOrdersRequest();

      if (response.data.success) {
        setOrders(response.data.result);
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
  };

  useEffect(() => {
    getUserOrders();
  }, []);

  if (orders.length === 0) {
    return (
      <section className="orders_empty container">
        <img src={iconBox} alt="" />
        <p>No orders yet</p>
      </section>
    );
  }

  return (
    <ul className="order_container container">
      <h2>All orders</h2>
      {orders.map((order) => (
        <li className="order" key={order.order_id}>
          {order.products.map((item) => (
            <article key={item.id}>
              <img src={`${imagesURL}/${item.images[0]}`} alt="" />

              <div>
                <h3>{item.title}</h3>
                <div>
                  <p>{formatCurrency(item.price)}</p>
                  <p>
                    <span>Quantity:</span> {item.quantity}
                  </p>
                  <p>
                    <span>Size:</span> {item.size}
                  </p>
                </div>

                <p>
                  <span>Date:</span>{" "}
                  {new Date(order.order_date).toLocaleString()}
                </p>
              </div>

              <p>{order.order_status}</p>
            </article>
          ))}
        </li>
      ))}
    </ul>
  );
};
