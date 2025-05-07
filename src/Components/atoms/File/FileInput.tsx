import { forwardRef } from "react";
import Input from "../Input/Input";

const FileInput = forwardRef<HTMLInputElement>((_, ref) => {
  return (
    <Input
      accept="image/* video/*"
      multiple
      ref={ref}
      variant="primary"
      className="hidden h-full w-full"
      type="file"
      name="file"
    />
  );
});
export default FileInput;
