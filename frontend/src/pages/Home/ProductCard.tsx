import { Link } from "react-router-dom";

import { useCartStore } from "../../store/cartStore";
import { formatCurrency } from "../../helpers/formatCurrency";
import { IProduct } from "../../types/types";
import { imagesURL } from "../config";
import styles from "./card.module.css";

interface IProductCardProps {
  filteredProducts: IProduct[];
}

export const ProductCard = ({ filteredProducts }: IProductCardProps) => {
  const { cart } = useCartStore();

  return (
    <section className={styles.cards}>
      {filteredProducts.map((product) => {
        const onCart = cart.some((item) => item.product_id === product.id);
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
