import { clsx } from "clsx";
import { motion } from "framer-motion";

type MobileNavigationPropsT = {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
};

export default function MobileNavigation({
  currentStep,
}: MobileNavigationPropsT) {
  return (
    <nav className="flex gap-4">
      {[1, 2, 3].map((step) => (
        <motion.div
          key={step}
          className={clsx(
            "flex size-12 items-center justify-center rounded-full border-2 font-medium",
            currentStep === step ? "text-white" : "bg-white text-black",
          )}
          animate={{
            backgroundColor: currentStep === step ? "#000" : "#fff",
            color: currentStep === step ? "#fff" : "#000",
            scale: currentStep === step ? 1.1 : 1,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <span>{step}</span>
        </motion.div>
      ))}
    </nav>
  );
}
