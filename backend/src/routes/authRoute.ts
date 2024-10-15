import { Router } from "express";

import { validateSchema } from "../middleware/validateAuth";
import { registerSchema, loginSchema } from "../schemas/authSchema";
import {
  loginAdmin,
  loginGoogle,
  loginUser,
  registerUser,
  resetPassword,
  refreshToken,
} from "../controllers/authController";

const router = Router();

// admin
router.post("/admin", validateSchema(loginSchema), loginAdmin);

// user
router.post("/google", loginGoogle);
router.post("/login", validateSchema(loginSchema), loginUser);
router.post("/register", validateSchema(registerSchema), registerUser);
router.put("/reset-password", validateSchema(loginSchema), resetPassword);

// both
router.post("/refresh-token", refreshToken);

export default router;
