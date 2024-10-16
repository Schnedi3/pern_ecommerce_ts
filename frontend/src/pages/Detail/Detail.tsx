import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

import { useAuthStore } from "../../store/authStore";
import { useCartStore } from "../../store/cartStore";
import { useProduct } from "../../api/product";
import { addToCartRequest, iconNext, iconPrevious } from "../../Routes";
import { DetailSkeleton } from "../../skeletons/DetailSkeleton";
import { formatCurrency } from "../../helpers/formatCurrency";
import { IProduct } from "../../types/types";
import { imagesURL } from "../config";
import styles from "./detail.module.css";

export const Detail = () => {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [currentImage, setCurrentImage] = useState(0);
  const { cart, getCartStore, addToCartStore } = useCartStore();
  const { isAuthenticated } = useAuthStore();

  const { id } = useParams();
  const { data: product, error, isLoading } = useProduct(Number(id));

    const addToCart = async (
    product: IProduct,
    quantity: number,
    selectedSize: string
  ) => {
    if (!selectedSize) return toast.error("Select a size first");
    if (!isAuthenticated) return toast.error("Login first");

    try {
      const { data } = await addToCartRequest(
        product.id,
        quantity,
        selectedSize
      );

      if (!data.success) {
        console.log(data.message);
      }

      addToCartStore(data.result);
      getCartStore();
      toast.success(data.message);
    } catch (error) {
      console.log(error instanceof Error ? error.message : "Unexpected error");
    }
  };

  const handlePrevious = () => {
    setCurrentImage(currentImage === 0 ? images.length - 1 : currentImage - 1);
  };

  const handleNext = () => {
    setCurrentImage(currentImage === images.length - 1 ? 0 : currentImage + 1);
  };

  const isSizeInCart = (size: string) => {
    return cart.some(
      (item) => item.product_id === product.id && item.size === size
    );
  };

  const handleSize = (size: string) => {
    setSelectedSize(selectedSize === size ? "" : size);
  };

  if (!product || error || isLoading) return <DetailSkeleton />;
  const { title, description, price, sizes, images } = product;

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
          {sizes.map((size: string) => (
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
