import { forwardRef, ReactNode } from "react";
interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  padding?: "none" | "sm" | "md" | "lg";
  center?: boolean;
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      children,
      className = "",
      size = "lg",
      padding = "md",
      center = true,
      ...props
    },
    ref,
  ) => {
    const sizeClasses = {
      sm: "max-w-screen-sm",
      md: "max-w-screen-md",
      lg: "max-w-screen-lg",
      xl: "max-w-screen-xl",
      full: "max-w-full",
    };

    const paddingClasses = {
      none: "",
      sm: "px-2",
      md: "px-4 md:px-6",
      lg: "px-4 md:px-8",
    };

    const centerClass = center ? "mx-auto" : "";

    const containerClasses = [
      sizeClasses[size],
      paddingClasses[padding],
      centerClass,
      className,
    ].join(" ");

    return (
      <div className={containerClasses} ref={ref} {...props}>
        {children}
      </div>
    );
  },
);

Container.displayName = "Container";
interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  margin?: "none" | "sm" | "md" | "lg" | "xl";
  border?: boolean;
  rounded?: "none" | "sm" | "md" | "lg" | "full";
  shadow?: "none" | "sm" | "md" | "lg" | "xl";
  bg?: "primary" | "secondary" | "accent" | "white" | "none" | "alt";
}

export const Box = forwardRef<HTMLDivElement, BoxProps>(
  (
    {
      children,
      as = "div",
      className = "",
      padding = "none",
      margin = "none",
      border = false,
      rounded = "none",
      shadow = "none",
      bg = "none",
      ...props
    },
    ref,
  ) => {
    const Component = as;

    const paddingClasses = {
      none: "",
      sm: "p-2",
      md: "p-4",
      lg: "p-6",
      xl: "p-8",
    };

    const marginClasses = {
      none: "",
      sm: "m-2",
      md: "m-4",
      lg: "m-6",
      xl: "m-8",
    };

    const roundedClasses = {
      none: "",
      sm: "rounded",
      md: "rounded-md",
      lg: "rounded-lg",
      full: "rounded-full",
    };

    const shadowClasses = {
      none: "",
      sm: "shadow-sm",
      md: "shadow",
      lg: "shadow-lg",
      xl: "shadow-xl",
    };

    const bgClasses = {
      none: "",
      primary: "bg-primary-DEFAULT",
      secondary: "bg-secondary-DEFAULT",
      accent: "bg-accent-DEFAULT",
      white: "bg-white",
      alt: "bg-background-alt",
    };

    const borderClass = border ? "border border-border" : "";

    const boxClasses = [
      paddingClasses[padding],
      marginClasses[margin],
      roundedClasses[rounded],
      shadowClasses[shadow],
      bgClasses[bg],
      borderClass,
      className,
    ].join(" ");

    return (
      <Component className={boxClasses} ref={ref} {...props}>
        {children}
      </Component>
    );
  },
);

Box.displayName = "Box";
