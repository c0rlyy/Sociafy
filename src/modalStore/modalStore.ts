import { create } from 'zustand'
import type { ModalStore } from '../types'

const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  open: () => set((state) => ({ isOpen: !state.isOpen })),
  close: () => set({ isOpen: false }),
  modalType:"sign-up",
  modalData:"" ,
  setModalData: () => { },
  onConfirm: () => { },
}));

export default useModalStore;
