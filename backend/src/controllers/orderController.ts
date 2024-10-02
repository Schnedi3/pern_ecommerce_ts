import { Request, Response } from "express";

import {
  addOrderDB,
  getOrdersDB,
  getUserOrdersDB,
  updateStatusDB,
  deleteOrderDB,
} from "../database/orderDB";
import { getCartIdByUserId } from "../database/cartDB";

export const addOrder = async (req: Request, res: Response) => {
  const { address_id, amount, payment_method } = req.body;

  try {
    const user_id = req.user.id;
    const cart_id = await getCartIdByUserId(user_id);

    const date = new Date();
    const orderDate = new Intl.DateTimeFormat('en-GB').format(date);

    const result = await addOrderDB(
      cart_id,
      user_id,
      address_id,
      amount,
      payment_method,
      orderDate
    );

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
    const user_id = req.user.id;
    const result = await getUserOrdersDB(user_id);

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
    const result = await deleteOrderDB(id);

    res.status(200).json({ success: true, message: "Order deleted", result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};