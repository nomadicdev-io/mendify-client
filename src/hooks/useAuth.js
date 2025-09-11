import { create } from "zustand";

const useAuthStore = create((set) => ({
  auth: null,
  setAuth: (auth) => set({ auth }),
}));

export default useAuthStore;