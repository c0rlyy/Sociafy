import React, { forwardRef } from "react";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  variant?: "primary" | "secondary" | "success" | "warning" | "info" | "error";
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", variant = "primary", ...props }, ref) => {
    const baseClasses =
      "w-full px-4 py-2 rounded-md border outline-none focus:ring-2 focus:ring-opacity-50 transition-colors";

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

    const textareaClasses = [
      baseClasses,
      variantClasses[variant],
      className,
    ].join(" ");

    return <textarea className={textareaClasses} ref={ref} {...props} />;
  },
);

Textarea.displayName = "Textarea";
