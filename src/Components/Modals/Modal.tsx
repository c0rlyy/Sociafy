import classes from "./Modal.module.css";
import ReactDOM from "react-dom";
import { ReactNode } from "react";
import { IoMdClose } from "react-icons/io";
interface OverlayProps {
  children: ReactNode;
  onClosePropFcOverlay: () => void;
}

interface ModalProps {
  children: ReactNode;
  onCloseProp: () => void;
}
const overlays = document.getElementById("overlays") as HTMLElement;
const Backdrop: React.FC = () => {
  return <div className={classes.backdrop}></div>;
};
const Overlay: React.FC<OverlayProps> = ({
  children,
  onClosePropFcOverlay,
}) => {
  return (
    <div className={classes.modal}>
      <IoMdClose onClick={onClosePropFcOverlay} size={"2rem"} />
      <div className={classes.content}>{children}</div>
    </div>
  );
};
const Modal: React.FC<ModalProps> = ({ children, onCloseProp }) => {
  return (
    <div>
      {ReactDOM.createPortal(<Backdrop />, overlays)}
      {ReactDOM.createPortal(
        <Overlay onClosePropFcOverlay={onCloseProp}>{children}</Overlay>,
        overlays,
      )}
    </div>
  );
};
export default Modal;
