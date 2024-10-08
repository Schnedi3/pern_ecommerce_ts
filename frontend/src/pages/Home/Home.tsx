import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { useShopContext } from "../../context/useShopContext";
import { formatCurrency } from "../../helpers/formatCurrency";
import { getProductsRequest } from "../../Routes";
import { IProduct } from "../../types/types";
import { Search } from "./Search";
import { Categories } from "./Categories";
import { HomeSkeleton } from "../../skeletons/HomeSkeleton";
import { imagesURL } from "../config";
import "./home.css";

export const defaultCategory: string = "All";

export const Home = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedCategory, setSelectedCategory] =
    useState<string>(defaultCategory);
  const { cart } = useShopContext();

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

  if (!filteredProducts || filteredProducts.length === 0)
    return <HomeSkeleton />;

  return (
    <section className="home_container container">
      <header className="header">
        <Search inputValue={inputValue} setInputValue={setInputValue} />
        <Categories
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          products={products}
        />
      </header>

      <article className="cards">
        {filteredProducts.map((product) => {
          const onCart = cart.some((item) => item.productId === product.id);
          return (
            <Link
              to={`/product/${product.id}`}
              className="card_container"
              key={product.id}
            >
              <img
                src={`${imagesURL}/${product.images[0]}`}
                alt={product.title}
              />
              <div className="card_info">
                <h4>{product.title}</h4>
                <div>
                  <h3>{formatCurrency(product.price)}</h3>
                  {onCart && <p className="home_badge">on cart</p>}
                </div>
              </div>
            </Link>
          );
        })}
      </article>
    </section>
  );
};
