import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      authenticate: false,

      login: () => set({ authenticate: true }),
      logout: () => set({ authenticate: false }),
    }),
    {
      name: "auth-storage",
    }
  )
);