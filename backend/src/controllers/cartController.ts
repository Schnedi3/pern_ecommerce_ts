import { Request, Response } from "express";

import {
  addToCartDB,
  getCartDB,
  getCartIdByUserId,
  deleteFromCartDB,
  updateCartDB,
} from "../database/cartDB";

export const getCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;

    const cartId = await getCartIdByUserId(userId);
    const result = await getCartDB(cartId);

    res.status(200).json({ success: true, result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addToCart = async (req: Request, res: Response) => {
  const productId = Number(req.params.id);
  const { quantity, selectedSize } = req.body;

  try {
    const userId = req.user.id;

    const cartId = await getCartIdByUserId(userId);
    const result = await addToCartDB(cartId, productId, quantity, selectedSize);

    res.status(200).json({
      success: true,
      message: "Product added to cart",
      result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCart = async (req: Request, res: Response) => {
  const productId = Number(req.params.id);
  const { quantity, size } = req.body;
  try {
    const userId = req.user.id;

    const cartId = await getCartIdByUserId(userId);
    const result = await updateCartDB(quantity, cartId, productId, size);

    res
      .status(200)
      .json({ success: true, message: "Quantity updated", result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteFromCart = async (req: Request, res: Response) => {
  const productId = Number(req.params.id);
  const { size } = req.body;

  try {
    const userId = req.user.id;

    const cartId = await getCartIdByUserId(userId);
    await deleteFromCartDB(cartId, productId, size);

    res.status(200).json({ success: true, message: "Product removed" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
