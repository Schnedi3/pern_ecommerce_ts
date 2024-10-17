import { Router } from "express";

import { validateSchema } from "../middleware/validateAuth";
import { registerSchema, loginSchema } from "../schemas/authSchema";
import {
  loginGoogle,
  login,
  register,
  resetPassword,
  tokenController,
} from "../controllers/authController";

const router = Router();

router.post("/google", loginGoogle);
router.post("/login", validateSchema(loginSchema), login);
router.post("/register", validateSchema(registerSchema), register);
router.put("/reset-password", validateSchema(loginSchema), resetPassword);
router.get("/refresh-token", tokenController);

export default router;
