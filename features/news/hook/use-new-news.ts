import { create } from "zustand";

type NewNewsState = {
  isNewsOpen: boolean;
  onOpenNews: () => void;
  onCloseNews: () => void;
};

export const useNewNews = create<NewNewsState>((set) => ({
  isNewsOpen: false,
  onOpenNews: () => set({ isNewsOpen: true }),
  onCloseNews: () => set({ isNewsOpen: false }),
}));
