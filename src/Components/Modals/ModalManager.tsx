import useModalStore from "../../store/modalStore";
import PostModalWrapper from "../organisms/PostModal/PostModalWrapper";
import SignUpModal from "../molecules/SignUpModal/SignUpModal";

type ModalComponentsT = {
  [key: string]: React.ComponentType;
};

const MODAL_COMPONENTS: ModalComponentsT = {
  "sign-up": SignUpModal,
  "post-modal-wrapper": PostModalWrapper,
};

const ModalManager = () => {
  const { modalType } = useModalStore();

  if (!modalType) return null;

  const ModalComponent = MODAL_COMPONENTS[modalType];

  return ModalComponent ? <ModalComponent /> : null;
};

export default ModalManager;
