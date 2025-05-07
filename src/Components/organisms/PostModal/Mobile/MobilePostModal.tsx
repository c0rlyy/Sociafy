import UploadStep from "./Steps/UploadStep";
import CaptionStep from "./Steps/CaptionStep";
import PreviewStep from "./Steps/PreviewStep";
import { useStepper } from "../../../../store/stepper-store";
import MobileNavigation from "./MobileNavigation";
import { UserT } from "../../../../types/auth";
import Modal, { ModalBody, ModalHeader } from "../../../molecules/Modal/Modal";
export default function MobilePostModal({ user }: { user: UserT }) {
  const { currentStep, onBack, onNext } = useStepper();
  return (
    <Modal size="full">
      <ModalHeader>
        <MobileNavigation
          currentStep={currentStep}
          totalSteps={3}
          onNext={onNext}
          onBack={onBack}
        />
      </ModalHeader>
      <ModalBody>
        {currentStep === 1 && <UploadStep />}
        {currentStep === 2 && <CaptionStep />}
        {currentStep === 3 && <PreviewStep user={user} />}
      </ModalBody>
    </Modal>
  );
}
