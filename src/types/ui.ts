export type popoverStoreT={
  isPopoverOpened:boolean,
  popoverData:string,
  setPopoverData:(data:any)=>void,
  popoverType:"user-popup" | "",
  openPopover:()=>void,
  closePopover:()=>void,
}
type ModalDataT =
  | {
      [key: string]: string;
    }
  | "";
export type ModalTypeT = "sign-up" | "post";
export interface ModalStoreT {
  open: (modalType: ModalTypeT) => void;
  isOpen: boolean;
  onConfirm: () => void;
  setModalData: (data: ModalDataT) => void;
  modalType: ModalTypeT;
  close: () => void;
}
