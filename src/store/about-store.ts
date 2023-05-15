import { create } from "zustand";
import { Language } from "~/data/about";

type AboutStore = {
  initiallyLoaded: boolean;
  selectedCard?: Language;
  fadeInCard: boolean;
  setInitiallyLoaded: (initiallyLoaded?: boolean) => void;
  setSelectedCard: (card?: Language) => void;
};

export const useAboutStore = create<AboutStore>((set) => ({
  initiallyLoaded: false,
  fadeInCard: false,
  setInitiallyLoaded: (initiallyLoaded) =>
    set((state) => ({ ...state, initiallyLoaded })),
  setSelectedCard: (card) => {
    set((state) => ({
      ...state,
      selectedCard: card,
      fadeInCard: card ? true : false,
    }));
  },
}));
