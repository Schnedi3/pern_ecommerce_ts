import { useState } from "react";
import { toast } from "react-toastify";

import { addProductRequest } from "../../api/product";

import { iconUpload } from "../../Routes";
import "./new.css";
import "../globals.css";

export const NewProduct = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("Men");
  const [subcategory, setSubcategory] = useState<string>("Top");
  const [price, setPrice] = useState<string>("");
  const [sizes, setSizes] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);

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

    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("subcategory", subcategory);
      formData.append("price", price);
      sizes.forEach((size) => formData.append("sizes", size));
      images.forEach((image) => formData.append("images", image));

      const response = await addProductRequest(formData);

      if (response.data.success) {
        toast.success(response.data.message);
        setTitle("");
        setDescription("");
        setCategory("Men");
        setSubcategory("Top");
        setPrice("");
        setSizes([]);
        setImages([]);
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

  return (
    <form className="form container" onSubmit={handleSubmit}>
      <h2>Add product</h2>
      <article className="upload">
        <p>Images</p>
        <div>
          <label>
            <img src={iconUpload} />
            <input type="file" accept="image/*" onChange={handleImages} />
          </label>
          <ul>
            {images.map((image, index) => (
              <li key={index}>
                <img src={URL.createObjectURL(image)} />
              </li>
            ))}
          </ul>
        </div>
      </article>

      <label className="title">
        Title
        <input
          type="text"
          placeholder="product title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>

      <label className="desc">
        Description
        <textarea
          placeholder="product description"
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </label>

      <article className="categories">
        <div className="category">
          <p>Category</p>
          <select onChange={(e) => setCategory(e.target.value)}>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div className="subcategory">
          <p>Sub-category</p>
          <select onChange={(e) => setSubcategory(e.target.value)}>
            <option value="Top">Top</option>
            <option value="Bottom">Bottom</option>
          </select>
        </div>
        <label className="price">
          Price
          <input
            type="number"
            placeholder="10"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
      </article>

      <article className="sizes">
        <p>Sizes</p>
        <div>
          {sizesArray.map((size) => (
            <button
              key={size}
              type="button"
              className={sizes.includes(size) ? "selected" : ""}
              onClick={() => handleSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </article>

      <button
        className="dark_button"
        id={
          title === "" ||
          description === "" ||
          price === "" ||
          sizes.length === 0 ||
          images.length === 0
            ? "dark_button-disabled"
            : ""
        }
        type="submit"
      >
        Add
      </button>
    </form>
  );
};
