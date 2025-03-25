import ReactDOM from "react-dom";
import { ReactNode } from "react";
import { IoMdClose } from "react-icons/io";
import useModalStore from "../../modalStore/modalStore";
import classes from "./Modal.module.css";

interface OverlayProps {
  children: ReactNode;
  size: "sm" | "md" | "lg" | "full";
  color?: string;
}

const overlays = document.getElementById("overlays") as HTMLElement;

const Backdrop: React.FC = () => {
  const { isOpen, close } = useModalStore();
  return (
    <div
      className={`${classes.backdrop} ${isOpen ? "block" : "hidden"}`}
      onClick={close}
    ></div>
  );
};

const Overlay: React.FC<OverlayProps> = ({ children, size, color }) => {
  const setSize = () => {
    switch (size) {
      case "sm":
        return "w-[90%] max-w-[350px] sm:w-[70%] md:w-[50%] lg:w-[40%] h-auto top-[15%] right-[15%]";
      case "md":
        return "w-[95%] h-[80%] max-w-[550px] sm:w-[75%] md:w-[60%] lg:w-[50%] h-auto top-[15%] right-[25%]";
      case "lg":
        return "w-[95%] max-w-[800px] sm:w-[80%] md:w-[65%] lg:w-[55%] h-auto top-[15%] right-[23%] ";
      case "full":
        return "w-full h-full";
      default:
        return "w-[90%] max-w-[350px] h-auto"; // Default size
    }
  };

  const setColor = () => {
    if (color === undefined) {
      return "bg-zinc-50"
    }
    switch (color) {
      case color==="":
        return "bg-zinc-50"
      case color == undefined:
        return "bg-black"
      case color.startsWith("#"):
        return `bg-[${color}]`
      case color ==="black":
        return "bg-black"
      case color === "white":
        return "bg-white"
      default:
        return "bg-zinc-50"
    }
  }
  console.log(color)
  const { isOpen } = useModalStore();
  return (
    <div
      className={`${setColor()} ${setSize()} absolute p-4 rounded-lg shadow-lg z-[30000] animate-slide-down m-0 mx-auto overflow-hidden ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className={classes.content}>{children}</div>
    </div>
  );
};

interface ModalProps {
  children: ReactNode;
  size: "sm" | "md" | "lg" | "full";
  color?: string;
}

const Modal: React.FC<ModalProps> = ({ children, size, color }) => {
  const { isOpen } = useModalStore();

  if (!isOpen) return null;

  return (
    <>
      {ReactDOM.createPortal(<Backdrop />, overlays)}
      {ReactDOM.createPortal(
        <Overlay size={size} color={color}>{children}</Overlay>,
        overlays
      )}
    </>
  );
};

export default Modal;
