import { ChangeEvent, forwardRef } from "react";
import { Box } from "../../atoms/Container/Container";
import FileInput from "../../atoms/File/FileInput";

import { Stack } from "../../atoms/Stack/Stack";
type InsertImagePropsT = {
  handleClick: () => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
};
import PlusIcon from "../Icon/PlusIcon";

export const InsertImage = forwardRef<HTMLInputElement, InsertImagePropsT>(
  ({ handleClick, handleChange }, ref) => {
    return (
      <Box
        onClick={handleClick}
        onChange={handleChange}
        rounded="lg"
        className=" size-32 cursor-pointer  bg-gray-100 transition-all hover:bg-gray-200"
      >
        <Stack
          className="h-full w-full"
          direction="col"
          justify="center"
          align="center"
        >
          <FileInput ref={ref} />
          <PlusIcon />
        </Stack>
      </Box>
    );
  },
);
export default InsertImage;
