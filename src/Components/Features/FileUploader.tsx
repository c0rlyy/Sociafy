import { type } from "@testing-library/user-event/dist/type";
import { HTMLAttributeAnchorTarget, useRef } from "react";
interface FileUploaderType {
  setFile: () => {};
}
const FileUploader: React.FC<FileUploaderType> = ({ setFile }) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    fileRef.current?.click();
  };
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const selectedFile = e.target.files?.[0];
    console.log(selectedFile);

    if (setFile) {
      setFile(selectedFile);
    }
  };
  return (
    <div>
      <button
        className=" w-full justify-center bg-[rgb(77,181,249)] rounded-lg px-2 py-2 text-white"
        onClick={handleClick}
      >
        Choose files from device
      </button>
      <input
        onChange={handleChange}
        className=" "
        type="file"
        ref={fileRef}
        name=""
        id="file-upload"
        style={{ display: "none" }}
      />
    </div>
  );
};
export default FileUploader;
