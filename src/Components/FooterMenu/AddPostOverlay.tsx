import { forwardRef, ReactNode, Ref } from "react";
import ReactDOM from "react-dom";
import classes from "./AddPostOverlay.module.css";
type OverlayPropsTypes = {
  children: ReactNode;
};
function Backdrop() {
  return <div className={classes.backdrop}></div>;
}

const Overlay = forwardRef(
  ({ children }: OverlayPropsTypes, ref: Ref<HTMLDivElement>) => {
    return (
      <div ref={ref} className={classes.modal}>
        <div className={classes.content}>{children}</div>
      </div>
    );
  }
);
function AddPostModal({ children }: OverlayPropsTypes) {
  return (
    <div>
      {ReactDOM.createPortal(
        <Backdrop />,
        document.getElementById("overlays") as Element
      )}
      {ReactDOM.createPortal(
        <Overlay>{children}</Overlay>,
        document.getElementById("overlays") as Element
      )}
    </div>
  );
}

export default AddPostModal;
