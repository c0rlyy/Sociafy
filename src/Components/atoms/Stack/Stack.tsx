import { forwardRef, ReactNode } from "react";

interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  direction?: "row" | "col";
  wrap?: boolean;
  justify?: "start" | "end" | "center" | "between" | "around" | "evenly";
  align?: "start" | "end" | "center" | "baseline" | "stretch";
  gap?: "none" | "sm" | "md" | "lg" | "xl";
}

export const Stack = forwardRef<HTMLDivElement, StackProps>(
  (
    {
      children,
      className = "",
      direction = "col",
      wrap = false,
      justify = "start",
      align = "start",
      gap = "md",
      ...props
    },
    ref,
  ) => {
    const directionClasses = {
      row: "flex-row",
      col: "flex-col",
    };

    const justifyClasses = {
      start: "justify-start",
      end: "justify-end",
      center: "justify-center",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
    };

    const alignClasses = {
      start: "items-start",
      end: "items-end",
      center: "items-center",
      baseline: "items-baseline",
      stretch: "items-stretch",
    };

    const gapClasses = {
      none: "",
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-8",
    };

    const wrapClass = wrap ? "flex-wrap" : "";

    const stackClasses = [
      "flex",
      directionClasses[direction],
      justifyClasses[justify],
      alignClasses[align],
      gapClasses[gap],
      wrapClass,
      className,
    ].join(" ");

    return (
      <div className={stackClasses} ref={ref} {...props}>
        {children}
      </div>
    );
  },
);

Stack.displayName = "Stack";
