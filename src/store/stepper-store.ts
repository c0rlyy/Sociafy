import { create } from "zustand";
import type { StepperStoreT } from "../types/ui";
export const useStepper = create<StepperStoreT>((set) => ({
  currentStep: 2,
  totalSteps: 3,
  onNext: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  onBack: () => set((state) => ({ currentStep: state.currentStep - 1 })),
}));
