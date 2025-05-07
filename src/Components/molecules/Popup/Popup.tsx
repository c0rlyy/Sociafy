import { PopupPropsT } from ".";
import { Box } from "../../atoms/Container/Container";

export function Popup({
  size = "sm",
  children,
  position = "bottom-center",
  id,
  variant = "default",
  behavior = "tooltip",
}: PopupPropsT) {
  const basePopupClass =
    "max-h-screen overflow-auto rounded-lg transition-all duration-200";

  const popupSizeClasses = {
    sm: "max-w-sm w-full p-4",
    md: "max-w-md w-full p-6",
    lg: "max-w-lg w-full p-8",
  };

  // Complete revision of positioning system using fixed positioning for more reliable placement
  const popupPositionClasses = {
    "top-left": "fixed top-4 left-4",
    "top-right": "fixed top-4 right-4",
    "top-center": "fixed top-4 left-1/2 transform -translate-x-1/2",
    center:
      "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
    "bottom-right": "fixed bottom-4 right-4",
    "bottom-left": "fixed bottom-4 left-4",
    "bottom-center": "fixed bottom-4 left-1/2 transform -translate-x-1/2",
  };

  const popupBehaviorVariants = {
    modal:
      "fixed inset-0 bg-secondary-900/70 flex items-center justify-center z-50",
    tooltip: "z-40",
    dropdown: "z-30",
    persistent: "z-50",
    dismissible: "z-20",
  };

  const popupVariants = {
    default: "bg-white border border-gray-200",
    outlined: "bg-white border-2 border-primary-500",
    filled: "bg-primary-100 text-white",
    info: "bg-info-100 border border-info-500 text-info-900",
    warning: "bg-warning-100 border border-warning-500 text-warning-900",
    ghost: "bg-white/90 backdrop-blur-sm border border-gray-200",
    danger: "bg-error-100 border border-error-500 text-error-900",
  };

  // Special handling for modal behavior
  const isModal = behavior === "modal";

  // For modals, use the modal-specific layout
  if (isModal) {
    return (
      <Box id={id} className={popupBehaviorVariants.modal}>
        <Box
          shadow="xl"
          className={`${popupSizeClasses[size]} ${popupVariants[variant]} m-auto rounded-xl shadow-xl`}
        >
          {children}
        </Box>
      </Box>
    );
  }

  // For everything else, use the position-based layout
  const wrapperClasses = [
    popupPositionClasses[position],
    popupBehaviorVariants[behavior],
    basePopupClass,
    popupSizeClasses[size],
    popupVariants[variant],
  ].join(" ");

  return (
    <Box id={id} shadow="md" className={wrapperClasses}>
      {children}
    </Box>
  );
}
