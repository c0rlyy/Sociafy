import { forwardRef, ReactNode, Ref } from "react";
import ReactDOM from "react-dom";
import { IoMdClose } from "react-icons/io";
import ThemeProvider, { useTheme } from "../../store/themeContext";
import classes from "./AddPostOverlay.module.css";
type OverlayPropsTypes = {
  children: ReactNode;
  onClosePropFc: () => {};
};
function Backdrop({ onCloseProp }: { onCloseProp: () => {} }) {
  return (
    <div className={classes.backdrop}>
      <IoMdClose
        size={"3rem"}
        className={" top-0 hidden text-white md:fixed md:block "}
        onClick={onCloseProp}
      />
    </div>
  );
}
const Overlay = forwardRef(
  ({ children }: OverlayPropsTypes, ref: Ref<HTMLDivElement>) => {
    return (
      <div ref={ref} className={classes.modal}>
        <div className={classes.content}>{children}</div>
      </div>
    );
  },
);
function AddPostModal({ children, onClosePropFc }: OverlayPropsTypes) {
  const { theme } = useTheme();
  return (
    <ThemeProvider>
      <div className={`bg-inherit text-inherit`}>
        {ReactDOM.createPortal(
          <Backdrop onCloseProp={onClosePropFc} />,
          document.getElementById("overlays") as Element,
        )}
        {ReactDOM.createPortal(
          <Overlay onClosePropFc={onClosePropFc}>{children}</Overlay>,
          document.getElementById("overlays") as Element,
        )}
      </div>
    </ThemeProvider>
  );
}

export default AddPostModal;
