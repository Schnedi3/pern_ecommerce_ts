import { create } from "zustand";
import { persist } from "zustand/middleware";

import { IAuthStore } from "../types/types";

export const useAuthStore = create(
  persist<IAuthStore>(
    (set) => ({
      isAuthenticated: false,
      user: null,

      authData: (data) =>
        set(() => ({
          isAuthenticated: true,
          user: data.result,
        })),

      logoutAuth: () =>
        set(() => ({
          isAuthenticated: false,
          user: null,
        })),
    }),
    {
      name: "userData",
    }
  )
);
