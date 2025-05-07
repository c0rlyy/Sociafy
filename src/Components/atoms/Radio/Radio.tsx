import { forwardRef } from "react";

// RADIO BUTTON COMPONENT
interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  variant?: "primary" | "secondary" | "success" | "warning" | "info" | "error";
  labelClassName?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      label,
      className = "",
      variant = "primary",
      labelClassName = "",
      ...props
    },
    ref,
  ) => {
    const baseClasses =
      "h-4 w-4 cursor-pointer rounded-full focus:outline-none focus:ring-2 focus:ring-opacity-50";

    const variantClasses = {
      primary:
        "text-green-blue-500 border-green-blue-300 focus:ring-green-blue-300",
      secondary:
        "text-oxford-blue-500 border-oxford-blue-300 focus:ring-oxford-blue-300",
      success:
        "text-tea-green-500 border-tea-green-300 focus:ring-tea-green-300",
      warning: "text-thistle-500 border-thistle-300 focus:ring-thistle-300",
      info: "text-pale-azure-500 border-pale-azure-300 focus:ring-pale-azure-300",
      error:
        "text-oxford-blue-700 border-oxford-blue-400 focus:ring-oxford-blue-600",
    };

    const radioClasses = [baseClasses, variantClasses[variant], className].join(
      " ",
    );

    const labelClasses = [
      "ml-2 text-oxford-blue-DEFAULT text-sm",
      labelClassName,
    ].join(" ");

    return (
      <div className="flex items-center">
        <input type="radio" className={radioClasses} ref={ref} {...props} />
        {label && <label className={labelClasses}>{label}</label>}
      </div>
    );
  },
);

Radio.displayName = "Radio";
