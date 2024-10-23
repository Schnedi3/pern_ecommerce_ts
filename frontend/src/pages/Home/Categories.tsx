import { useEffect, useState } from "react";

import { defaultCategory } from "./Home";
import { ICategoriesProps } from "../../types/types";
import { iconArrow } from "../../Routes";
import styles from "./categories.module.css";

export const Categories = ({
  products,
  selectedCategory,
  setSelectedCategory,
}: ICategoriesProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const closeModal = () => setIsModalOpen(false);

  const uniqueCategories = [
    defaultCategory,
    ...new Set(products.map((product) => product.category)),
  ];

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    closeModal();
  };

  useEffect(() => {
    window.addEventListener("resize", closeModal);

    return () => {
      window.removeEventListener("resize", closeModal);
    };
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  return (
    <article className={styles.categories}>
      <button className={styles.toggleModal} onClick={toggleModal}>
        {defaultCategory === selectedCategory
          ? "Filter by category"
          : selectedCategory}{" "}
        <span className={styles.span}></span>
        <img
          className={styles.iconArrow}
          src={iconArrow}
          alt="Modal toggle icon"
        />
      </button>

      <ul className={`${styles.modal} ${isModalOpen ? styles.modalOpen : ""}`}>
        {uniqueCategories.map((category) => (
          <li
            className={`${styles.category} ${
              category === selectedCategory ? styles.active : ""
            }`}
            key={category}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </li>
        ))}
      </ul>

      <span
        className={`${styles.modalBackdrop} ${
          isModalOpen ? styles.modalBackdropVisible : ""
        }`}
        onClick={closeModal}
      ></span>
    </article>
  );
};
