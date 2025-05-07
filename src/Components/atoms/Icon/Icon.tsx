import { ReactNode } from "react";

type IconSize = {
  sm: "size-8";
  md: "size-12";
  lg: "size-18";
};
export interface IconPropsT {
  size: "sm" | "md" | "lg";
  className?: string;
  children: ReactNode;
  handler?: () => void;
}
export default function Icon({
  size,
  children,
  className = "",
  handler,
}: IconPropsT) {
  const baseClasses = "bg-white text-black rounded-full";
  const sizeClasses: IconSize = {
    sm: "size-8",
    md: "size-12",
    lg: "size-18",
  };
  const iconClasses = [baseClasses, sizeClasses[size], className].join();
  return (
    <div onClick={handler} className={iconClasses}>
      {children}
    </div>
  );
}
