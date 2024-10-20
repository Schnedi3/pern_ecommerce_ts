import { Request, Response } from "express";

import {
  getUserDB,
  getUsersDB,
  deleteUserDB,
  updateUsernamerDB,
} from "../database/userDB";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await getUsersDB();

    res.status(200).json({ success: true, result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    const result = await getUserDB(id);

    res.status(200).json({ success: true, result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    await deleteUserDB(id);

    res.status(200).json({ success: true, message: "User removed" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateUsername = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { updatedUsername } = req.body;

  try {
    const result = await updateUsernamerDB(updatedUsername, id);

    res
      .status(200)
      .json({ success: true, message: "Username updated", result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
