import { create } from "zustand";

type NewBookState = {
  IsBookOpen: boolean;
  OnOpenBook: () => void;
  OnCloseBook: () => void;
};

export const useNewBook = create<NewBookState>((set) => ({
  IsBookOpen: false,
  OnOpenBook: () => set({ IsBookOpen: true }),
  OnCloseBook: () => set({ IsBookOpen: false }),
}));
