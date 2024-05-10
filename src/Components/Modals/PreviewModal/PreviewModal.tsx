import { ReactNode } from "react";
import preview from "../PreviewModal/PreviewModal.module.css";
const overlays = document.getElementById("overlays") as HTMLElement;
import ReactDOM from "react-dom";
import { IoMdClose } from "react-icons/io";
import { useProfile } from "../../../store/UserProfile-context";
const Backdrop: React.FC<{}> = () => {
  return <div className={preview.backdrop}></div>;
};
const PostPreviewOverlay: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { setOpenState } = useProfile();
  return (
    <div className={preview.modal}>
      <IoMdClose
        className="absolute right-0 top-0"
        onClick={() => setOpenState(false)}
        size={"2rem"}
      />
      <div className={preview.content}>{children}</div>
    </div>
  );
};
const PreviewModal: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div>
      {ReactDOM.createPortal(<Backdrop />, overlays)}
      {ReactDOM.createPortal(
        <PostPreviewOverlay>{children}</PostPreviewOverlay>,
        overlays,
      )}
    </div>
  );
};
export default PreviewModal;
