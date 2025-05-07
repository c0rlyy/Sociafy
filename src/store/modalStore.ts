import { create } from "zustand";
import type { ModalStoreT, ModalTypeT } from "../types/ui";

const useModalStore = create<ModalStoreT>((set) => ({
  isOpen: false,
  open: (type: ModalTypeT) => set(() => ({ isOpen: true, modalType: type })),
  close: () => {
    set({ isOpen: false, modalType: null });
    console.log("Clicked");
  },

  onConfirm: () => {},
  modalType: null,
}));

export default useModalStore;
