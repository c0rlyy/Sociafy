export type popoverStoreT = {
  isPopoverOpened: boolean;
  popoverType: "user-popup" | "";
  openPopover: () => void;
  closePopover: () => void;
};

export type ModalTypeT = "sign-up" | "post-modal-wrapper" | null;
export interface ModalStoreT {
  open: (modalType: ModalTypeT) => void;
  isOpen: boolean;
  onConfirm: () => void;
  modalType: ModalTypeT;
  close: () => void;
}
export interface StepperStoreT {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
}
