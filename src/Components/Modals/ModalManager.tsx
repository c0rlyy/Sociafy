import useModalStore from "../../modalStore/modalStore";
import PostModalWrapper from "./PostModal/PostModalWrapper";

import SignUpModal from "./SignUpModal/SignUpModal";

const ModalManager = () => {
  const { modalType } = useModalStore();

  return (
    <>
      {modalType === "sign-up" && <SignUpModal />}
      {modalType === "post-modal-wrapper" && <PostModalWrapper />}
    </>
  );
};
export default ModalManager;
