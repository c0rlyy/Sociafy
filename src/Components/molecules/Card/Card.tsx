import React, { ReactNode, forwardRef } from "react";
import { Box, Container } from "../../atoms/Container/Container";
import { Stack } from "../../atoms/Stack/Stack";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  variant?: "default" | "outline" | "ghost" | "elevated";
  padding?: "none" | "sm" | "md" | "lg";
  hover?: boolean;
  clickable?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      className = "",
      variant = "default",
      padding = "md",
      hover = false,
      clickable = false,
      as = "div",
      ...props
    },
    ref,
  ) => {
    const baseClasses = "rounded-lg transition-all duration-200";

    const variantClasses = {
      default: "bg-white border border-border",
      outline: "bg-transparent border border-border",
      ghost: "bg-transparent",
      elevated: "bg-white border border-border shadow-md",
    };

    const paddingClasses = {
      none: "",
      sm: "p-3",
      md: "p-4",
      lg: "p-6",
    };

    const hoverClasses = hover ? "hover:shadow-lg hover:-translate-y-1" : "";
    const clickableClasses = clickable ? "cursor-pointer" : "";

    const cardClasses = [
      baseClasses,
      variantClasses[variant],
      paddingClasses[padding],
      hoverClasses,
      clickableClasses,
      className,
    ].join(" ");

    return (
      <Box as={as} shadow="md" className={cardClasses} ref={ref} {...props}>
        {children}
      </Box>
    );
  },
);

Card.displayName = "Card";

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
  border?: boolean;
}

export const CardHeader = ({
  children,
  className = "",
  border = false,
}: CardHeaderProps) => {
  const borderClass = border ? "border-b border-border pb-3 mb-3" : "";
  const headerClasses = [borderClass, className].join(" ");

  return <Box className={headerClasses}>{children}</Box>;
};

interface CardBodyProps {
  children: ReactNode;
  className?: string;
}

export const CardBody = ({ children, className = "" }: CardBodyProps) => {
  return <Box className={className}>{children}</Box>;
};

interface CardFooterProps {
  children: ReactNode;
  className?: string;
  border?: boolean;
}

export const CardFooter = ({
  children,
  className = "",
  border = false,
}: CardFooterProps) => {
  const borderClass = border ? "border-t border-border pt-3 mt-3" : "";
  const footerClasses = [borderClass, className].join(" ");

  return <Box className={footerClasses}>{children}</Box>;
};
