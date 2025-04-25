import { create } from "zustand";
import type { StepperStoreT } from "../types/ui";
export const useStepper = create<StepperStoreT>((set) => ({
  currentStep: 1,
  totalSteps: 3,
  setCurrentStep: (step: number) => set({ currentStep: step }),
  onNext: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  onBack: () => set((state) => ({ currentStep: state.currentStep - 1 })),
}));
