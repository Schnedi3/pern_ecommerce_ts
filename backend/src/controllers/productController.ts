import { Request, Response } from "express";

import { pool } from "../database/db";
import { PG_HOST, PORT } from "../config/config";

const BASE_URL = `http://${PG_HOST}:${PORT}`;

export const addProduct = async (req: Request, res: Response) => {
  const { title, description, price, category, subcategory, sizes } = req.body;
  const images = req.files as Express.Multer.File[];

  const imageUrls = images.map((file) => `${BASE_URL}/images/${file.filename}`);

  try {
    const addQuery =
      "INSERT INTO product (title, description, price, category, subcategory, sizes, images) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";

    const { rows } = await pool.query(addQuery, [
      title,
      description,
      price,
      category,
      subcategory,
      sizes,
      imageUrls,
    ]);

    res
      .status(200)
      .json({ success: true, message: "Product added", product: rows[0] });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const getQuery = "SELECT * FROM product";
    const { rows } = await pool.query(getQuery);

    res.status(200).json({ success: true, rows });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const removeProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const removeQuery = "DELETE FROM product WHERE id = $1";
    await pool.query(removeQuery, [id]);

    res.status(200).json({ success: true, message: "Product removed" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const singleProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const singleQuery = "SELECT * FROM product WHERE id = $1";
    const { rows } = await pool.query(singleQuery, [id]);

    res.status(200).json({ success: true, product: rows[0] });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};