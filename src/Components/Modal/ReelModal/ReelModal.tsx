import classes from "./ReelModal.module.css";
import ReactDOM from "react-dom";
import { ReactNode } from "react";
interface OverlayProps {
  children: ReactNode;
}

interface ReelModalProps {
  children: ReactNode;
}
export const Backdrop = () => {
  return <div className={classes.backdrop}></div>;
};
const overlays = document.getElementById("overlays") as HTMLElement;

export const ReelOverlay: React.FC<OverlayProps> = ({ children }) => {
  return (
    <div className={classes.reelModal}>
      <div className={classes.reelContent}>{children}</div>
    </div>
  );
};
const ReelModal: React.FC<ReelModalProps> = ({ children }) => {
  return (
    <div>
      {ReactDOM.createPortal(<Backdrop />, overlays)}
      {ReactDOM.createPortal(<ReelOverlay>{children}</ReelOverlay>, overlays)}
    </div>
  );
};
export default ReelModal;
