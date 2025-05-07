import { Box } from "../Container/Container";
import { Paragraph } from "../Typography/Typography";

interface BadgePropsT {
  size: "small" | "medium" | "large";
  variant:
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning"
    | "error"
    | "outline"
    | "ghost";
  className?: string;
  text: string;
}

export default function Badge({
  size = "medium",
  variant = "primary",
  text,
}: BadgePropsT) {
  const baseBadgeClassname =
    "flex cursor-pointer justify-center rounded-lg px-[4px] py-[3px] transition-all hover:bg-opacity-60";

  const variantClasses = {
    primary: "bg-white border border-primary-500 text-primary-700",
    secondary: "bg-white border border-secondary-500 text-secondary-700",
    info: "bg-info-700 border border-info-500 text-secondary-600",
    success: "bg-success-700 border border-success-500 text-secondary-700",
    warning: "bg-warning-700 border border-warning-500 text-secondary-700",
    error: "bg-error-700 border border-error-500 text-secondary-700",
    outline: "bg-white border border-gray-300 text-gray-700",
    ghost: "bg-transparent text-gray-700",
  };

  const sizeClasses = {
    small: "text-xs px-2 py-0.5",
    medium: "text-sm px-2.5 py-1",
    large: "text-base px-3 py-1.5",
  };

  const classes = `${baseBadgeClassname} ${sizeClasses[size]} ${variantClasses[variant]}`;

  return (
    <Box className={classes}>
      <Paragraph className="truncate text-ellipsis text-xs">{text}</Paragraph>
    </Box>
  );
}
