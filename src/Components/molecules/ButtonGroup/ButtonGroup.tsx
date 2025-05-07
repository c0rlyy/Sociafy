import { ReactNode } from "react";
import { Box } from "../../atoms/Container/Container";
import { Stack } from "../../atoms/Stack/Stack";

export default function ButtonGroup({
  children,
  direction = "row",
}: {
  children: ReactNode;
  direction?: "col" | "row";
  className?: string;
}) {
  return (
    <Box className="w-full  ">
      <Stack justify="center" align="center" direction={direction}>
        {children}
      </Stack>
    </Box>
  );
}
