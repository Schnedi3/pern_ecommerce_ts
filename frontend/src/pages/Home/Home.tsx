import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

import { getProductsRequest } from "../../Routes";
import { IProduct } from "../../types/types";
import { ProductCard } from "./ProductCard";
import { Search } from "./Search";
import { Categories } from "./Categories";
import { HomeSkeleton } from "../../skeletons/HomeSkeleton";
import styles from "./home.module.css";
import "../globals.css";

export const defaultCategory: string = "All";

export const Home = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedCategory, setSelectedCategory] =
    useState<string>(defaultCategory);

  const getProducts = async () => {
    try {
      const response = await getProductsRequest();

      if (response.data.success) {
        setProducts(response.data.result);
      } else {
        toast.error(response.data.message);
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
    getProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (selectedCategory !== defaultCategory) {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (inputValue) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(inputValue.toLowerCase())
      );
    }

    return filtered;
  }, [selectedCategory, products, inputValue]);

  return (
    <section className={styles.home}>
      <header className={styles.header}>
        <Search inputValue={inputValue} setInputValue={setInputValue} />
        <Categories
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          products={products}
        />
      </header>

      {filteredProducts.length !== 0 ? (
        <ProductCard filteredProducts={filteredProducts} />
      ) : (
        <HomeSkeleton />
      )}
    </section>
  );
};
