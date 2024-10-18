import { useEffect, useState } from "react";

import { useAddProduct } from "../../api/product";
import { iconUpload, Title } from "../../Routes";
import styles from "./new.module.css";
import "../globals.css";

export const NewProduct = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("Men");
  const [subcategory, setSubcategory] = useState<string>("Top");
  const [price, setPrice] = useState<string>("");
  const [sizes, setSizes] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const { mutate: addProduct, data } = useAddProduct();

  const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];

      if (
        images.some(
          (image) => image.name === file.name && image.size === file.size
        )
      )
        return;

      setImages([...images, file]);
    }
  };

  const sizesArray = ["S", "M", "L", "XL"];
  const handleSize = (size: string) => {
    setSizes(
      sizes.includes(size) ? sizes.filter((s) => s !== size) : [...sizes, size]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("subcategory", subcategory);
    formData.append("price", price);
    sizes.forEach((size) => formData.append("sizes", size));
    images.forEach((image) => formData.append("images", image));

    addProduct(formData);
  };

  useEffect(() => {
    if (data?.data.success) {
      setTitle("");
      setDescription("");
      setCategory("Men");
      setSubcategory("Top");
      setPrice("");
      setSizes([]);
      setImages([]);
    }
  }, [data]);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Title title="Add product" />

      <article>
        <h4 className={styles.subtitle}>Images</h4>
        <div className={styles.uploadSection}>
          <label className={styles.upload}>
            <img className={styles.uploadIcon} src={iconUpload} />
            <input type="file" accept="image/*" onChange={handleImages} />
          </label>
          <ul className={styles.uploadedImages}>
            {images.map((image, index) => (
              <li key={index}>
                <img
                  className={styles.uploadedImage}
                  src={URL.createObjectURL(image)}
                />
              </li>
            ))}
          </ul>
        </div>
      </article>

      <label>
        <h4 className={styles.subtitle}>Title</h4>
        <input
          type="text"
          className={styles.input}
          placeholder="product title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>

      <label>
        <h4 className={styles.subtitle}>Description</h4>
        <textarea
          className={styles.input}
          placeholder="product description"
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </label>

      <article className={styles.categories}>
        <label>
          <h4 className={styles.subtitle}>Category</h4>
          <select
            className={styles.category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </label>

        <label>
          <h4 className={styles.subtitle}>Sub-category</h4>
          <select
            className={styles.category}
            onChange={(e) => setSubcategory(e.target.value)}
          >
            <option value="Top">Top</option>
            <option value="Bottom">Bottom</option>
          </select>
        </label>

        <label>
          <h3 className={styles.subtitle}>Price</h3>
          <input
            type="number"
            className={styles.category}
            placeholder="10"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
      </article>

      <article>
        <h4 className={styles.subtitle}>Sizes</h4>
        <div className={styles.sizes}>
          {sizesArray.map((size) => (
            <button
              key={size}
              type="button"
              className={`${styles.size} ${
                sizes.includes(size) ? styles.selected : ""
              }`}
              onClick={() => handleSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </article>

      <button
        className={`dark_button ${
          title === "" ||
          description === "" ||
          price === "" ||
          sizes.length === 0 ||
          images.length === 0
            ? "dark_button-disabled"
            : ""
        }`}
        type="submit"
      >
        Add
      </button>
    </form>
  );
};
