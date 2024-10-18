import { useDeleteProduct, useProducts } from "../../api/product";
import { IProduct } from "../../types/types";
import { formatCurrency } from "../../helpers/formatCurrency";
import { iconDelete, iconList, Title } from "../../Routes";
import { imagesURL } from "../Config";
import styles from "./products.module.css";

export const Products = () => {
  const { data: products, error, isLoading } = useProducts();
  const { mutate: deleteProduct } = useDeleteProduct();

  if (!products || products.length === 0 || error || isLoading) {
    return (
      <section className={styles.empty}>
        <img className={styles.emptyIcon} src={iconList} alt="" />
        <p className={styles.emptyText}>No products yet</p>
      </section>
    );
  }

  return (
    <section className={styles.products}>
      <Title title="Products" />
      <ul className={styles.product}>
        {products.map((product: IProduct) => (
          <li className={styles.singleProduct} key={product.id}>
            <img
              className={styles.productImage}
              src={`${imagesURL}/${product.images[0]}`}
            />
            <h3>{product.title}</h3>
            <h4>{product.category}</h4>
            <p>{formatCurrency(product.price)}</p>
            <img
              className={styles.productDelete}
              src={iconDelete}
              alt="remove product"
              onClick={() => deleteProduct(product.id)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};
