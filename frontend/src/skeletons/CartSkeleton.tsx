import styles from "./cart_skeleton.module.css";

export const CartSkeleton = () => {
  const cartItems = Array.from({ length: 2 });

  return (
    <section className={styles.cartSkeleton}>
      <article>
        <h2></h2>

        {cartItems.map((_, index) => (
          <div className={styles.productSkeleton} key={index}>
            <img className={styles.productImageSkeleton} />
            <h3></h3>
            <input />
            <p></p>
            <p></p>
            <img className={styles.deleteSkeleton} />
          </div>
        ))}
      </article>

      <article className={styles.totalSkeleton}>
        <h2></h2>
        <div className={styles.totalInfoSkeleton}>
          <p></p>
          <h3></h3>
        </div>
        <button></button>
      </article>
    </section>
  );
};
