import { create } from 'zustand'
import type { ModalStoreT } from '../types/ui';

const useModalStore = create<ModalStoreT>((set) => ({
  isOpen: false,
  open: (type:string, data=null ) => set(() => ({ isOpen: true, modalType:type, modalData:data })),
  close: () => set({ isOpen: false, modalType:"", modalData:"" }),
  setModalData: (data: any) => set((modalData) => ({modalData:modalData})),
  onConfirm: () => { },
  modalType:""
}));

export default useModalStore;
