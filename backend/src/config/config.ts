import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT;
export const JWT_SECRET = process.env.JWT_SECRET as string;
export const FRONTEND_URL = process.env.FRONTEND_URL;

export const PG_DATABASE = process.env.PG_DATABASE;
export const PG_HOST = process.env.PG_HOST;
export const PG_PASSWORD = process.env.PG_PASSWORD;
export const PG_PORT = process.env.PG_PORT;
export const PG_USER = process.env.PG_USER;

export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

export const ACCESS_TOKEN = "accessToken";
export const REFRESH_TOKEN = "refreshToken";
