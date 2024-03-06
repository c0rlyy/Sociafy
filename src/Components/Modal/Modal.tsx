import createPortal from "react-dom";
import PostContext from "../../store/post-context";
import classes from "./Modal.module.css";
import ReactDOM from "react-dom";
import { forwardRef, ReactNode } from "react";
interface OverlayProps {
  children: ReactNode;
}

interface ModalProps {
  children: ReactNode;
}
const overlays = document.getElementById("overlays") as HTMLElement;

const Overlay: React.FC<OverlayProps> = ({ children }) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{children}</div>
    </div>
  );
};
const Modal: React.FC<ModalProps> = ({ children }) => {
  return (
    <div>{ReactDOM.createPortal(<Overlay>{children}</Overlay>, overlays)}</div>
  );
};
export default Modal;
