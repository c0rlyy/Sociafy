import { ReactNode, createContext, useContext } from "react";
import ReactDOM from "react-dom";
import useModalStore from "../../../store/modalStore";

// Size classes for modal components
const sizeClasses = {
  xs: {
    container: "max-w-xs w-full",
    content: "p-3",
    header: "text-sm font-medium mb-2",
    footer: "mt-2 flex justify-end gap-2",
  },
  sm: {
    container: "max-w-sm w-full",
    content: "p-4",
    header: "text-base font-medium mb-3",
    footer: "mt-3 flex justify-end gap-2",
  },
  md: {
    container: "max-w-md w-full",
    content: "p-5",
    header: "text-lg font-medium mb-4",
    footer: "mt-4 flex justify-end gap-3",
  },
  lg: {
    container: "max-w-lg w-full",
    content: "p-6",
    header: "text-xl font-semibold mb-4",
    footer: "mt-5 flex justify-end gap-3",
  },
  xl: {
    container: "max-w-xl w-full",
    content: "p-6",
    header: "text-xl font-semibold mb-5",
    footer: "mt-5 flex justify-end gap-3",
  },
  full: {
    container: "max-w-full w-full",
    content: "p-6",
    header: "text-xl font-semibold mb-5",
    footer: "mt-5 flex justify-end gap-3",
  },
};

// Create Modal Context to share size and other props
const ModalContext = createContext<{
  size: keyof typeof sizeClasses;
}>({
  size: "md",
});

// Export the context hook for use in components
export const useModalContext = () => useContext(ModalContext);

// Interface for Modal props
interface ModalProps {
  children: ReactNode;
  size?: keyof typeof sizeClasses;
  overlays?: HTMLElement | null;
  onClose?: () => void;
}

export default function Modal({
  children,
  size = "md",
  overlays,
  onClose,
}: ModalProps) {
  const { close } = useModalStore();
  const handleClose = close;

  const modalOverlays = overlays || document.getElementById("overlays");

  if (!modalOverlays) return null;

  const baseModalClass =
    "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg bg-white";

  const modalClasses = [
    baseModalClass,
    sizeClasses[size].container,
    sizeClasses[size].content,
  ].join(" ");

  return (
    <ModalContext.Provider value={{ size }}>
      {ReactDOM.createPortal(<Backdrop />, modalOverlays)}
      {ReactDOM.createPortal(
        <div className={modalClasses}>
          <div className="relative">
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
              aria-label="Close modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M18 6L6 18" />
                <path d="M6 6l12 12" />
              </svg>
            </button>
            {children}
          </div>
        </div>,
        modalOverlays,
      )}
    </ModalContext.Provider>
  );
}

// Helper Components
interface ModalSubComponentProps {
  children: ReactNode;
  className?: string;
}

// Backdrop Component
function Backdrop() {
  return (
    <div className="fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity" />
  );
}

// Export separate components
export function ModalHeader({
  children,
  className = "",
}: ModalSubComponentProps) {
  const { size } = useModalContext();
  const headerClasses = [sizeClasses[size].header, className].join(" ");

  return <div className={headerClasses}>{children}</div>;
}

export function ModalBody({
  children,
  className = "",
}: ModalSubComponentProps) {
  return <div className={className}>{children}</div>;
}

export function ModalFooter({
  children,
  className = "",
}: ModalSubComponentProps) {
  const { size } = useModalContext();
  const footerClasses = [sizeClasses[size].footer, className].join(" ");

  return <div className={footerClasses}>{children}</div>;
}
