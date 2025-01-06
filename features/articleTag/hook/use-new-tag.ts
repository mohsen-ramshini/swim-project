import { create } from "zustand";

type NewArticleState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useNewTag = create<NewArticleState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
