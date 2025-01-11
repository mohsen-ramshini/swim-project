import { create } from "zustand";

type NewArticleState = {
  isCategoryOpen: boolean;
  onOpenCategory: () => void;
  onCloseCategory: () => void;
};

export const useNewCategory = create<NewArticleState>((set) => ({
  isCategoryOpen: false,
  onOpenCategory: () => set({ isCategoryOpen: true }),
  onCloseCategory: () => set({ isCategoryOpen: false }),
}));
