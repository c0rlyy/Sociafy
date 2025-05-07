type ButtonVariant = "primary" | "secondary" | "outline" | "text" | "";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariant;
  size: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
}

export const baseClasses =
  "font-medium rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

export const variantClasses = {
  primary:
    "bg-primary text-white hover:bg-primary-dark focus:ring-primary-light",
  secondary:
    "bg-error text-white hover:bg-secondary-300 focus:ring-secondary-light",
  outline:
    "border bg-accent text-background hover:bg-accent-light focus:ring-accent",
  text: "text-primary hover:bg-primary-light/10 focus:ring-primary-light",
};

export const sizeClasses = {
  sm: "text-xs px-2.5 py-1.5",
  md: "text-sm px-4 py-2",
  lg: "text-base px-6 py-3",
};
