import Modal from "../../Modal";
import UploadStep from "./Steps/UploadStep";
import CaptionStep from "./Steps/CaptionStep";
import PreviewStep from "./Steps/PreviewStep";
import { useStepper } from "../../../../store/stepper-store";
import MobileNavigation from "./MobileNavigation";
import { UserT } from "../../../../types/auth";
export default function MobilePostModal({ user }: { user: UserT }) {
  const { currentStep, onBack, onNext } = useStepper();
  return (
    <Modal size="full">
      <MobileNavigation
        currentStep={currentStep}
        totalSteps={3}
        onNext={onNext}
        onBack={onBack}
      />
      {currentStep === 1 && <UploadStep />}
      {currentStep === 2 && <CaptionStep />}
      {currentStep === 3 && <PreviewStep user={user} />}
    </Modal>
  );
}
