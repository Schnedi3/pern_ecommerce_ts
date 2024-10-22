import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

import { useAuthStore } from "../../store/authStore";
import { useAddToCart, useCart } from "../../api/cart";
import { useProduct } from "../../api/product";
import { iconNext, iconPrevious } from "../../Routes";
import { ICartItem } from "../../types/types";
import { formatCurrency } from "../../helpers/formatCurrency";
import { DetailSkeleton } from "../../skeletons/DetailSkeleton";
import { imagesURL } from "../config";
import styles from "./detail.module.css";

export const Detail = () => {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [currentImage, setCurrentImage] = useState(0);
  const { isAuthenticated } = useAuthStore();
  const { id } = useParams();
  const { data: product, error, isLoading } = useProduct(Number(id));
  const { data: cart } = useCart();
  const { mutate: addToCart } = useAddToCart();

  const handleAddToCart = (
    id: number,
    quantity: number,
    selectedSize: string
  ) => {
    if (!selectedSize) return toast.error("Select a size first");
    if (!isAuthenticated) return toast.error("Login first");

    addToCart({ id, quantity, selectedSize });
  };

  const handlePrevious = () => {
    setCurrentImage(currentImage === 0 ? images.length - 1 : currentImage - 1);
  };
  const handleNext = () => {
    setCurrentImage(currentImage === images.length - 1 ? 0 : currentImage + 1);
  };

  const handleSize = (size: string) => {
    setSelectedSize(selectedSize === size ? "" : size);
  };

  const isSizeInCart = (size: string) => {
    return cart?.some(
      (item: ICartItem) => item.product_id === product.id && item.size === size
    );
  };

  if (!product || error || isLoading) {
    return <DetailSkeleton />;
  }

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
            handleAddToCart(product.id, 1, selectedSize), setSelectedSize("");
          }}
        >
          Add to Cart
        </button>
      </article>
    </section>
  );
};
