interface LabelPropsT extends React.LabelHTMLAttributes<HTMLLabelElement> {
  text: string;
  htmlFor: string;
  className?: string;
  variant?: LabelVariant;
  color?: LabelColor;
}
// Types for label variants
type LabelVariant =
  | "default"
  | "outline"
  | "filled"
  | "subtle"
  | "bordered"
  | "pill"
  | "dot";

type LabelColor =
  | "primary"
  | "secondary"
  | "success"
  | "info"
  | "accent"
  | "neutral";

export interface LabelProps {
  variant?: LabelVariant;
  color?: LabelColor;
  children?: React.ReactNode;
  className?: string;
}

// Base styles that apply to all variants
const baseClasses = "inline-flex items-center text-xs font-medium";

// Variant-specific styles
export const labelVariants = {
  default: "rounded px-2.5 py-0.5",
  outline: "rounded ring-1 ring-inset px-2.5 py-0.5",
  filled: "rounded px-2.5 py-0.5",
  subtle: "rounded bg-opacity-10 px-2.5 py-0.5",
  bordered: "border-l-4 pl-2 pr-3 py-0.5",
  pill: "rounded-full px-3 py-0.5",
  dot: "pl-2.5 pr-3 py-0.5 before:mr-1.5 before:inline-block before:h-1.5 before:w-1.5 before:rounded-full before:content-['']",
};

// Color-specific styles for each variant
export const labelColors = {
  primary: {
    default: "bg-primary text-white",
    outline: "text-primary ring-primary",
    filled: "bg-primary text-white",
    subtle: "bg-primary text-primary",
    bordered: "border-primary text-primary",
    pill: "bg-primary text-white",
    dot: "text-primary before:bg-primary",
  },
  secondary: {
    default: "bg-secondary text-white",
    outline: "text-secondary ring-secondary",
    filled: "bg-secondary text-white",
    subtle: "bg-secondary text-secondary",
    bordered: "border-secondary text-secondary",
    pill: "bg-secondary text-white",
    dot: "text-secondary before:bg-secondary",
  },
  success: {
    default: "bg-success text-success-100",
    outline: "text-success-dark ring-success",
    filled: "bg-success-dark text-white",
    subtle: "bg-success text-success-dark",
    bordered: "border-success text-success-dark",
    pill: "bg-success-dark text-white",
    dot: "text-success-dark before:bg-success",
  },
  info: {
    default: "bg-info text-info-100",
    outline: "text-info-dark ring-info",
    filled: "bg-info-dark text-white",
    subtle: "bg-info text-info-dark",
    bordered: "border-info text-info-dark",
    pill: "bg-info-dark text-white",
    dot: "text-info-dark before:bg-info",
  },
  accent: {
    default: "bg-accent text-accent-100",
    outline: "text-accent-dark ring-accent",
    filled: "bg-accent-dark text-white",
    subtle: "bg-accent text-accent-dark",
    bordered: "border-accent text-accent-dark",
    pill: "bg-accent-dark text-white",
    dot: "text-accent-dark before:bg-accent",
  },
  neutral: {
    default: "bg-text-muted text-white",
    outline: "text-text ring-text-muted",
    filled: "bg-text text-white",
    subtle: "bg-text-muted text-text",
    bordered: "border-text-muted text-text",
    pill: "bg-text-muted text-white",
    dot: "text-text before:bg-text-muted",
  },
};
export default function Label({
  variant = "default",
  color = "primary",
  className = "",
  props,
  htmlFor,
  text,
}: LabelPropsT) {
  return (
    <label
      className={`
      ${baseClasses} 
      ${labelVariants[variant]} 
      ${labelColors[color][variant]} 
      ${className}
    `}
      {...props}
      htmlFor={htmlFor}
    >
      {text}
    </label>
  );
}
