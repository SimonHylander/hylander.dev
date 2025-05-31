import { create } from "zustand";

type AboutStore = {
  initiallyLoaded: boolean;
  setInitiallyLoaded: (initiallyLoaded?: boolean) => void;
};

export const useAboutStore = create<AboutStore>((set) => ({
  initiallyLoaded: false,
  setInitiallyLoaded: (initiallyLoaded) =>
    set((state) => ({ ...state, initiallyLoaded })),
}));
