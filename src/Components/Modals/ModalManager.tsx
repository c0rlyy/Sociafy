import useModalStore from "../../modalStore/modalStore"
import PostModal from "./PostModal/PostModal"

import SignUpModal from "./SignUpModal/SignUpModal"

const ModalManager = () => {
  const { modalType}=useModalStore()

  return (
  <>
    {modalType === "sign-up" && <SignUpModal />}
    {modalType==="post" && <PostModal/> }
  </>
  )
}
export default ModalManager
