import { Request, Response } from "express";

import {
  getAddressDB,
  addAddressDB,
  deleteAddressDB,
  updateAddressDB,
} from "../database/addressDB";

export const getAddress = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const result = await getAddressDB(userId);

    res.status(200).json({ success: true, result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addAddress = async (req: Request, res: Response) => {
  const {
    first_name,
    last_name,
    phone,
    street,
    number,
    door,
    city,
    state,
    zip_code,
  } = req.body;

  try {
    const userId = req.user.id;
    const result = await addAddressDB(
      first_name,
      last_name,
      phone,
      street,
      number,
      door,
      city,
      state,
      zip_code,
      userId
    );

    res.status(200).json({ success: true, message: "Address saved", result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteAddress = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    await deleteAddressDB(id);

    res.status(200).json({ success: true, message: "Address removed" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateAddress = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const {
    first_name,
    last_name,
    phone,
    street,
    number,
    door,
    city,
    state,
    zip_code,
  } = req.body;

  try {
    const result = await updateAddressDB(
      first_name,
      last_name,
      phone,
      street,
      number,
      door,
      city,
      state,
      zip_code,
      id
    );

    res.status(200).json({ success: true, message: "Address updated", result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
