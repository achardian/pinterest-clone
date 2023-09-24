import { create } from "zustand";

type OpenCommentStore = {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
};

const useOpenCommentStore = create<OpenCommentStore>((set) => ({
  isOpen: false,
  setIsOpen: (state) => set(() => ({ isOpen: state })),
}));

export default useOpenCommentStore;
