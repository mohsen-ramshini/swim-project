import { create } from "zustand";

type NewTagState = {
  isTagOpen: boolean;
  onOpenTag: () => void;
  onCloseTag: () => void;
};

export const useNewTag = create<NewTagState>((set) => ({
  isTagOpen: false,
  onOpenTag: () => {
    set({ isTagOpen: true });
    console.log(`tag is opening`);
  },
  onCloseTag: () => set({ isTagOpen: false }),
}));
