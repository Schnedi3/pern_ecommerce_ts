import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { IProduct } from "../../types/types";
import { formatCurrency } from "../../helpers/formatCurrency";
import {
  deleteProductRequest,
  getProductsRequest,
  iconDelete,
  iconList,
  Title,
} from "../../Routes";
import { imagesURL } from "../Config";
import styles from "./products.module.css";

export const Products = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  const getProducts = async () => {
    try {
      const { data } = await getProductsRequest();

      if (!data.success) {
        console.log(data.message);
      }

      setProducts(data.result);
    } catch (error) {
      console.log(error instanceof Error ? error.message : "Unexpected error");
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      const { data } = await deleteProductRequest(id);

      if (!data.success) {
        console.log(data.message);
      }

      setProducts(products.filter((item) => item.id !== id));
      toast.success(data.message);
    } catch (error) {
      console.log(error instanceof Error ? error.message : "Unexpected error");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  if (products.length === 0) {
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
        {products.map((item) => (
          <li className={styles.singleProduct} key={item.id}>
            <img
              className={styles.productImage}
              src={`${imagesURL}/${item.images[0]}`}
            />
            <h3>{item.title}</h3>
            <h4>{item.category}</h4>
            <p>{formatCurrency(item.price)}</p>
            <img
              className={styles.productDelete}
              src={iconDelete}
              alt="remove product"
              onClick={() => deleteProduct(item.id)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};
