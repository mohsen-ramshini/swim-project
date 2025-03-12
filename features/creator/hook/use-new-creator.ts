import { create } from "zustand";

type NewCreatorState = {
  isCreatorOpen: boolean;
  onOpenCreator: () => void;
  onCloseCreator: () => void;
};

export const useNewCreator = create<NewCreatorState>((set) => ({
  isCreatorOpen: false,
  onOpenCreator: () => set({ isCreatorOpen: true }),
  onCloseCreator: () => set({ isCreatorOpen: false }),
}));
