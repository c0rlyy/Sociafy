import { create } from "zustand";
import type { ModalStoreT, ModalTypeT } from "../types/ui";

const useModalStore = create<ModalStoreT>((set) => ({
  isOpen: false,
  open: (type: ModalTypeT) => set(() => ({ isOpen: true, modalType: type })),
  close: () => set({ isOpen: false, modalType: "" }),
  onConfirm: () => {},
  modalType: "",
}));

export default useModalStore;
