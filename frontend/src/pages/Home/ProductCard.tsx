import { Link } from "react-router-dom";

import { useCart } from "../../api/cart";
import { ICartItem, IProductCardProps } from "../../types/types";
import { formatCurrency } from "../../helpers/formatCurrency";
import { imagesURL } from "../config";
import styles from "./card.module.css";

export const ProductCard = ({ filteredProducts }: IProductCardProps) => {
  const { data: cart } = useCart();

  return (
    <section className={styles.cards}>
      {filteredProducts.map((product) => {
        const onCart = cart?.some(
          (item: ICartItem) => item.product_id === product.id
        );
        return (
          <Link
            className={styles.card}
            to={`/product/${product.id}`}
            key={product.id}
          >
            <img
              className={styles.cardImage}
              src={`${imagesURL}/${product.images[0]}`}
              alt={product.title}
            />
            <div className={styles.cardInfo}>
              <h4 className={styles.title}>{product.title}</h4>
              <div className={styles.onCart}>
                <h3>{formatCurrency(product.price)}</h3>
                {onCart && <p className={styles.badge}>on cart</p>}
              </div>
            </div>
          </Link>
        );
      })}
    </section>
  );
};
