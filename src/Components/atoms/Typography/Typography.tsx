import { ReactNode } from "react";

interface HeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: ReactNode;
  className?: string;
  variant?: "default" | "light" | "muted";
}

export function Heading({
  level = 1,
  children,
  className = "",
  variant = "default",
}: HeadingProps) {
  const Component = `h${level}` as keyof JSX.IntrinsicElements;

  const baseClasses = "font-semibold leading-tight";

  const variantClasses = {
    default: "text-oxford-blue-DEFAULT",
    light: "text-text-light",
    muted: "text-text-muted",
  };

  const sizeClasses = {
    1: "text-4xl md:text-5xl",
    2: "text-3xl md:text-4xl",
    3: "text-2xl md:text-3xl",
    4: "text-xl md:text-2xl",
    5: "text-lg md:text-xl",
    6: "text-base md:text-lg",
  };

  const headingClasses = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[level],
    className,
  ].join(" ");

  return <Component className={headingClasses}>{children}</Component>;
}

interface ParagraphProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "light" | "muted";
  size?: "sm" | "base" | "lg";
}

export function Paragraph({
  children,
  className = "",
  variant = "default",
  size = "base",
}: ParagraphProps) {
  const baseClasses = "leading-relaxed";

  const variantClasses = {
    default: "text-text",
    light: "text-900",
    muted: "text-secondary-900",
  };

  const sizeClasses = {
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
  };

  const paragraphClasses = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className,
  ].join(" ");

  return <p className={paragraphClasses}>{children}</p>;
}
