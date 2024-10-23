import { Router } from "express";

import {
  addOrder,
  getOrders,
  getUserOrders,
  updateStatus,
  deleteOrder,
} from "../controllers/orderController";
import { validateToken } from "../middleware/validateToken";

const router = Router();

// admin
router.get("/", validateToken, getOrders);
router.put("/:id", validateToken, updateStatus);
router.delete("/:id", validateToken, deleteOrder);

// user
router.post("/", validateToken, addOrder);
router.get("/user", validateToken, getUserOrders);

export default router;
