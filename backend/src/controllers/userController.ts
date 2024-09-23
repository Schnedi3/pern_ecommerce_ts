import { Request, Response } from "express";

import { pool } from "../database/db";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const getQuery = "SELECT * FROM users";

    const { rows } = await pool.query(getQuery);

    res.status(200).json({ success: true, rows });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const getUserQuery = "SELECT * FROM users WHERE id = $1";

    const { rows } = await pool.query(getUserQuery, [id]);

    res.status(200).json({ success: true, user: rows[0] });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const removeUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const removeQuery = "DELETE FROM users WHERE id = $1";

    await pool.query(removeQuery, [id]);

    res.status(200).json({ success: true, message: "User removed" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
