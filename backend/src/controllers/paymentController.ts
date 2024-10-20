import { Request, Response } from "express";
import Stripe from "stripe";

import { FRONTEND_URL, STRIPE_SECRET_KEY } from "../config/config";
const stripe = new Stripe(STRIPE_SECRET_KEY as string);

export const createCheckoutSession = async (req: Request, res: Response) => {
  const { cart, shippingAddress, totalAmount, paymentMethod } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: cart.map((item: any) => ({
        price_data: {
          currency: "eur",
          product_data: {
            name: item.title,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${FRONTEND_URL}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${FRONTEND_URL}/cart`,
      metadata: { shippingAddress, totalAmount, paymentMethod },
    });

    res.json({ success: true, id: session.id });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getCheckoutSession = async (req: Request, res: Response) => {
  const { session_id } = req.query;

  if (!session_id) {
    return res.status(400).json({ error: "Session ID is required" });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(
      session_id as string
    );
    res.json(session);
  } catch (error: any) {
    console.error("Error retrieving checkout session:", error);
    res.status(500).json({ error: error.message });
  }
};
