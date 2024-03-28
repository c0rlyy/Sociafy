import React, { ReactNode } from "react";
import loaderModal from "./LoaderModal.module.css";
import ReactDOM from "react-dom";
type ModalProps = {
  children: ReactNode;
};
function Backdrop() {
  return <div className={loaderModal.backdrop}></div>;
}
const overlays = document.getElementById("overlays") as HTMLElement;
const Overlay: React.FC<ModalProps> = ({ children }) => {
  return (
    <div className={loaderModal.modal}>
      <div className={loaderModal.content}>{children}</div>
    </div>
  );
};

const LoaderModal: React.FC<ModalProps> = ({ children }) => {
  return (
    <div>
      {ReactDOM.createPortal(<Backdrop />, overlays)}
      {ReactDOM.createPortal(<Overlay>{children}</Overlay>, overlays)}
    </div>
  );
};

export default LoaderModal;
