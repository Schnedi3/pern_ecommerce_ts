import { Request, Response } from "express";
import bcrypt from "bcrypt";
import axios from "axios";
import jwt from "jsonwebtoken";

import {
  generateAccessToken,
  generateRefreshToken,
} from "../libs/generateToken";
import { createCartForUser } from "../database/cartDB";
import {
  createGoogleUserDB,
  loginDB,
  registerDB,
  resetPasswordDB,
} from "../database/authDB";
import { ACCESS_TOKEN, JWT_SECRET, REFRESH_TOKEN } from "../config/config";

export const loginGoogle = async (req: Request, res: Response) => {
  const { accessToken } = req.body;

  const tokenURL = `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`;

  try {
    const userInfo = await axios.get(tokenURL);
    const { name, email, sub } = userInfo.data;

    const result = await createGoogleUserDB(name, email, sub);

    // create a cart
    const userId = result.id;
    const cart = await createCartForUser(userId);

    const accessToken = generateAccessToken(result);
    const refreshToken = generateRefreshToken(result);
    setAccessCookie(res, accessToken);
    setRefreshCookie(res, refreshToken);

    res.status(200).json({
      success: true,
      message: "Logged in succesfully",
      result,
      cart,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await loginDB(email);

    const isMatch = await bcrypt.compare(password, result.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    }

    const accessToken = generateAccessToken(result);
    const refreshToken = generateRefreshToken(result);
    setAccessCookie(res, accessToken);
    setRefreshCookie(res, refreshToken);

    res.status(200).json({
      success: true,
      message: "Logged in succesfully",
      result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  // encrypt password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await registerDB(username, email, hashedPassword);

    // create a cart
    const userId = result.id;
    const cart = await createCartForUser(userId);

    const accessToken = generateAccessToken(result);
    const refreshToken = generateRefreshToken(result);
    setAccessCookie(res, accessToken);
    setRefreshCookie(res, refreshToken);

    res.status(200).json({
      success: true,
      message: "Registered succesfully",
      result,
      cart,
    });
  } catch (error: any) {
    if (error.code === "23505") {
      res.status(403).json({ success: false, message: "Email already exist" });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { password, email } = req.body;

  // encrypt password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await resetPasswordDB(hashedPassword, email);

    res
      .status(200)
      .json({ success: true, message: "Password updated succesfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const refreshToken = (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  try {
    jwt.verify(refreshToken, JWT_SECRET, (err: Error | null, result: any) => {
      if (err) {
        return res
          .status(401)
          .json({ success: false, message: "verification failed" });
      }

      const accessToken = generateAccessToken(result);
      setAccessCookie(res, accessToken);

      res.status(200).json({
        success: true,
        message: "Token refreshed succesfully",
      });
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const setAccessCookie = (res: Response, accessToken: string) => {
  res.cookie(ACCESS_TOKEN, accessToken, {
    httpOnly: true,
    secure: true,
    path: "/",
  });
};

const setRefreshCookie = (res: Response, refreshToken: string) => {
  res.cookie(REFRESH_TOKEN, refreshToken, {
    httpOnly: true,
    secure: true,
    path: "/",
  });
};
