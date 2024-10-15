import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../config/config";
import { IUser } from "../types/types";

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: string = req.cookies.accessToken;

  try {
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No token, authorization denied" });
    }

    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
      if (err) {
        return res
          .status(403)
          .json({ success: false, message: "verification failed" });
      }
      req.user = decodedToken as IUser;
      next();
    });
  } catch (error: any) {
    return res.status(403).json({ success: false, message: error.message });
  }
};
