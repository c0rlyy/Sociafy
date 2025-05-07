import { Box } from "../Container/Container";

type GridPropsT = {
  columns: string | number;
  rows?: string | number;
  gap?: string | number;
  columnGap?: string | number;
  rowGap?: string | number;
  alignItems?: string;
  justifyItems?: string;
  justifyContent?: string;
  alignContent?: string;
  className?: string;
  children: React.ReactNode;
};
export default function Grid({
  columns,
  rows,
  alignContent,
  gap,
  rowGap,
  alignItems,
  justifyContent,
  justifyItems,
  className,
  columnGap,
  children,
}: GridPropsT) {
  const getGridTemplateValue = (value: string | number | undefined) => {
    if (Array.isArray(value)) {
      return value
        .map((val) => {
          if (
            typeof val === "string" &&
            (val.includes("px") ||
              val.includes("fr") ||
              val.includes("%") ||
              val.includes("auto"))
          ) {
            return val;
          }
          return `${val}fr`;
        })
        .join(" ");
    }
    if (typeof value === "number") {
      return `repeat(${value},1fr)`;
    }
    return value;
  };
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: getGridTemplateValue(columns),
    gridTemplateRows: getGridTemplateValue(rows),
    gap: gap,
    columnGap: columnGap || undefined,
    rowGap: rowGap || undefined,
    justifyItems,
    alignItems,
    justifyContent,
    alignContent,
  };
  return (
    <Box className={`grid-container ${className}`} style={gridStyle}>
      {children}
    </Box>
  );
}
