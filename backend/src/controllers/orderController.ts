import { Request, Response } from "express";

import {
  addOrderDB,
  getOrdersDB,
  getUserOrdersDB,
  updateStatusDB,
  deleteOrderDB,
} from "../database/orderDB";
import { emptyCartDb, getCartIdByUserId } from "../database/cartDB";

export const addOrder = async (req: Request, res: Response) => {
  const { shippingAddress, totalAmount, paymentMethod, sessionId } = req.body;

  try {
    const userId = req.user.id;
    const cartId = await getCartIdByUserId(userId);
    const date = new Date();

    const result = await addOrderDB(
      cartId,
      userId,
      shippingAddress,
      totalAmount,
      paymentMethod,
      date,
      sessionId
    );

    // empty cart
    await emptyCartDb(cartId);

    res.status(200).json({ success: true, message: "Order placed", result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    const result = await getOrdersDB();

    res.status(200).json({ success: true, result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserOrders = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const result = await getUserOrdersDB(userId);

    res.status(200).json({ success: true, result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateStatus = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { status } = req.body;

  try {
    const result = await updateStatusDB(status, id);

    res.status(200).json({ success: true, message: "Status updated", result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    await deleteOrderDB(id);

    res.status(200).json({ success: true, message: "Order deleted" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
