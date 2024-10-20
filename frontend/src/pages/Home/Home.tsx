import { useMemo, useState } from "react";

import { useProducts } from "../../api/product";
import { ProductCard } from "./ProductCard";
import { Search } from "./Search";
import { Categories } from "./Categories";
import { HomeSkeleton } from "../../skeletons/HomeSkeleton";
import { IProduct } from "../../types/types";
import styles from "./home.module.css";
import "../globals.css";

export const defaultCategory: string = "All";

export const Home = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedCategory, setSelectedCategory] =
    useState<string>(defaultCategory);
  const { data: products, error, isLoading } = useProducts();

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (selectedCategory !== defaultCategory) {
      filtered = filtered.filter(
        (product: IProduct) => product.category === selectedCategory
      );
    }

    if (inputValue) {
      filtered = filtered.filter((product: IProduct) =>
        product.title.toLowerCase().includes(inputValue.toLowerCase())
      );
    }

    return filtered;
  }, [selectedCategory, products, inputValue]);

  if (!products || error || isLoading) return <HomeSkeleton />;

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

      <ProductCard filteredProducts={filteredProducts} />
    </section>
  );
};
