import styles from "./order_skeleton.module.css";

export const OrderSkeleton = () => {
  const orderItems = Array.from({ length: 3 });

  return (
    <ul className={styles.orderSkeleton}>
      <h2></h2>

      {orderItems.map((_, index) => (
        <li key={index}>
          <article key={index}>
            <img />

            <div>
              <h3></h3>
              <div>
                <p></p>
                <p></p>
                <p></p>
              </div>

              <p></p>
            </div>

            <p></p>
          </article>
        </li>
      ))}
    </ul>
  );
};
