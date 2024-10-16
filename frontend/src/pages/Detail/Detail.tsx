import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

import { useAuthStore } from "../../store/authStore";
import { useShopContext } from "../../context/useShopContext";
import {
  addToCartRequest,
  getProductRequest,
  iconNext,
  iconPrevious,
} from "../../Routes";
import { DetailSkeleton } from "../../skeletons/DetailSkeleton";
import { formatCurrency } from "../../helpers/formatCurrency";
import { IProduct } from "../../types/types";
import { imagesURL } from "../config";
import styles from "./detail.module.css";

export const Detail = () => {
  const [product, setProduct] = useState<IProduct | undefined>(undefined);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [currentImage, setCurrentImage] = useState(0);
  const { id } = useParams<string>();
  const { cart, setCart, getCart } = useShopContext();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    const getProduct = async () => {
      try {
        if (id) {
          const response = await getProductRequest(parseInt(id));

          if (response.data.success) {
            setProduct(response.data.result);
          } else {
            toast.error(response.data.message);
          }
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log(error.message);
        } else {
          console.log("An unexpected error occurred");
        }
      }
    };

    getProduct();
  }, [id]);

  const handlePrevious = () => {
    setCurrentImage(currentImage === 0 ? images.length - 1 : currentImage - 1);
  };

  const handleNext = () => {
    setCurrentImage(currentImage === images.length - 1 ? 0 : currentImage + 1);
  };

  const addToCart = async (
    product: IProduct,
    quantity: number,
    selectedSize: string
  ) => {
    if (!selectedSize) return toast.error("Select a size first");
    if (!isAuthenticated) return toast.error("Login first");

    try {
      const response = await addToCartRequest(
        product.id,
        quantity,
        selectedSize
      );

      if (response.data.success) {
        const newItem = response.data.result;
        setCart([...cart, newItem]);
        getCart();
        toast.success(response.data.message);
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

  if (!product) return <DetailSkeleton />;
  const { title, description, price, sizes, images } = product;

  const isSizeInCart = (size: string) => {
    return cart.some(
      (item) => item.product_id === product.id && item.size === size
    );
  };

  const handleSize = (size: string) => {
    setSelectedSize(selectedSize === size ? "" : size);
  };

  const variants = {
    initial: { scale: 0.5 },
    animate: { scale: 1 },
    exit: { scale: 0.5 },
  };

  return (
    <section className={styles.detail}>
      <article className={styles.images}>
        <span className={styles.span} onClick={handlePrevious}>
          <img
            className={styles.spanIcon}
            src={iconPrevious}
            alt="previous image"
          />
        </span>
        <motion.img
          className={styles.image}
          key={currentImage}
          src={`${imagesURL}/${images[currentImage]}`}
          alt="sneakers image"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.5 }}
        />
        <span className={styles.span} onClick={handleNext}>
          <img className={styles.spanIcon} src={iconNext} alt="next image" />
        </span>
      </article>
      <article className={styles.detailInfo}>
        <h3 className={styles.title}>{title}</h3>
        <h4 className={styles.price}>{formatCurrency(price)}</h4>
        <p className={styles.desc}>{description}</p>
        <ul className={styles.sizes}>
          {sizes.map((size) => (
            <li key={size}>
              <button
                className={`${styles.size} ${
                  selectedSize === size ? styles.selectedSize : ""
                } ${isSizeInCart(size) ? styles.disabledSize : ""}`}
                onClick={() => handleSize(size)}
              >
                {size}
              </button>
            </li>
          ))}
        </ul>
        <button
          className={`dark_button ${styles.darkButtonDetail} ${
            !selectedSize ? "dark_button-disabled" : ""
          }`}
          onClick={() => {
            addToCart(product, 1, selectedSize), setSelectedSize("");
          }}
        >
          Add to Cart
        </button>
      </article>
    </section>
  );
};
