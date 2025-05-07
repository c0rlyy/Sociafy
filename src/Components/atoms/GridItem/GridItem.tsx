import { forwardRef, ReactNode } from "react";

interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  col?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "full" | "auto";
  colStart?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "auto";
  colEnd?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | "auto";
  row?: 1 | 2 | 3 | 4 | 5 | 6 | "auto";
  rowStart?: 1 | 2 | 3 | 4 | 5 | 6 | "auto";
  rowEnd?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | "auto";
}

export const GridItem = forwardRef<HTMLDivElement, GridItemProps>(
  (
    {
      children,
      className = "",
      col,
      colStart,
      colEnd,
      row,
      rowStart,
      rowEnd,
      ...props
    },
    ref,
  ) => {
    const colClasses = {
      1: "col-span-1",
      2: "col-span-2",
      3: "col-span-3",
      4: "col-span-4",
      5: "col-span-5",
      6: "col-span-6",
      7: "col-span-7",
      8: "col-span-8",
      9: "col-span-9",
      10: "col-span-10",
      11: "col-span-11",
      12: "col-span-12",
      full: "col-span-full",
      auto: "col-auto",
    };

    const colStartClasses = {
      1: "col-start-1",
      2: "col-start-2",
      3: "col-start-3",
      4: "col-start-4",
      5: "col-start-5",
      6: "col-start-6",
      7: "col-start-7",
      8: "col-start-8",
      9: "col-start-9",
      10: "col-start-10",
      11: "col-start-11",
      12: "col-start-12",
      auto: "col-start-auto",
    };

    const colEndClasses = {
      1: "col-end-1",
      2: "col-end-2",
      3: "col-end-3",
      4: "col-end-4",
      5: "col-end-5",
      6: "col-end-6",
      7: "col-end-7",
      8: "col-end-8",
      9: "col-end-9",
      10: "col-end-10",
      11: "col-end-11",
      12: "col-end-12",
      13: "col-end-13",
      auto: "col-end-auto",
    };

    const rowClasses = {
      1: "row-span-1",
      2: "row-span-2",
      3: "row-span-3",
      4: "row-span-4",
      5: "row-span-5",
      6: "row-span-6",
      auto: "row-auto",
    };

    const rowStartClasses = {
      1: "row-start-1",
      2: "row-start-2",
      3: "row-start-3",
      4: "row-start-4",
      5: "row-start-5",
      6: "row-start-6",
      auto: "row-start-auto",
    };

    const rowEndClasses = {
      1: "row-end-1",
      2: "row-end-2",
      3: "row-end-3",
      4: "row-end-4",
      5: "row-end-5",
      6: "row-end-6",
      7: "row-end-7",
      auto: "row-end-auto",
    };

    const classes = [
      col ? colClasses[col] : "",
      colStart ? colStartClasses[colStart] : "",
      colEnd ? colEndClasses[colEnd] : "",
      row ? rowClasses[row] : "",
      rowStart ? rowStartClasses[rowStart] : "",
      rowEnd ? rowEndClasses[rowEnd] : "",
      className,
    ].join(" ");

    return (
      <div className={classes} ref={ref} {...props}>
        {children}
      </div>
    );
  },
);

GridItem.displayName = "GridItem";
