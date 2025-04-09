import useModalStore from "../../modalStore/modalStore"

import SignUpModal from "./SignUpModal/SignUpModal"

const ModalManager = () => {
  const { modalType}=useModalStore()

  return (
  <>
    {modalType === "sign-up" && <SignUpModal />}
  </>
  )
}
export default ModalManager
