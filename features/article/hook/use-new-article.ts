import { create } from "zustand";

type NewArticleState = {
  isArticleOpen: boolean;
  onOpenArticle: () => void;
  onCloseArticle: () => void;
};

export const useNewArticle = create<NewArticleState>((set) => ({
  isArticleOpen: false,
  onOpenArticle: () => set({ isArticleOpen: true }),
  onCloseArticle: () => set({ isArticleOpen: false }),
}));
