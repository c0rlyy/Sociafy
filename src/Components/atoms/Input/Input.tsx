import { forwardRef } from "react";

export type InputVariantsT =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "info"
  | "error";

export interface InputPropsT
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  variant: InputVariantsT;
}

const Input = forwardRef<HTMLInputElement, InputPropsT>(
  ({ variant, className, ...props }, ref) => {
    const baseClasses =
      "px-4 py-2 rounded-md border outline-none focus:ring-2 focus:ring-opacity-50 transition-colors w-full";

    const variantClasses = {
      primary:
        "border-green-blue-500 bg-white focus:border-green-blue-600 focus:ring-green-blue-300 text-oxford-blue-500",
      secondary:
        "border-oxford-blue-500 bg-white focus:border-oxford-blue-600 focus:ring-oxford-blue-300 text-oxford-blue-500",
      info: "border-pale-azure-500 bg-pale-azure-100 focus:border-pale-azure-600 focus:ring-pale-azure-300 text-oxford-blue-500",
      success:
        "border-tea-green-500 bg-tea-green-900 focus:border-tea-green-600 focus:ring-tea-green-400 text-oxford-blue-500",
      warning:
        "border-thistle-500 bg-thistle-900 focus:border-thistle-400 focus:ring-thistle-300 text-oxford-blue-500",
      error:
        "border-oxford-blue-700 bg-thistle-100 focus:border-oxford-blue-800 focus:ring-oxford-blue-600 text-white",
    };

    const inpClasses = [baseClasses, variantClasses[variant], className]
      .filter(Boolean) // prevent undefined className
      .join(" ");

    return <input ref={ref} className={inpClasses} {...props} />;
  },
);

Input.displayName = "Input";

export default Input;
