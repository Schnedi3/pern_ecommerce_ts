import axios from "./axios";
import { ILogin } from "../types/types";

export const loginRequest = (user: ILogin) => {
  return axios.post("/auth/login", user);
};

export const loginGoogleRequest = (accessToken: string) => {
  return axios.post("/auth/google", { accessToken });
};
