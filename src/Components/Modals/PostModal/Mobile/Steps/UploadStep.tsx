import { useRef } from "react";
import type { ChangeEvent } from "react";
import { usePostStore } from "../../../../../store/post-store.";
import { useStepper } from "../../../../../store/stepper-store";
import { postSchema } from "../../../../../schemas/schemas";
import toast from "react-hot-toast";
import useModalStore from "../../../../../modalStore/modalStore";
import { useError } from "../../../../../store/ErrorContext";
import { tryCatchErrorHandler } from "../../../../../utils/error";
export default function UploadStep() {
  const fileRef = useRef<HTMLInputElement>(null);
  const { onNext } = useStepper();
  const { close } = useModalStore();
  const { showError } = useError();
  const { updateField, postData, removePostFile, flushPostData } =
    usePostStore();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0] && e.target.files) {
      const selectedFile = e.target.files;
      const filesSchema = postSchema.pick({ files: true });
      const result = filesSchema.safeParse({ files: selectedFile });
      if (result.success) {
        updateField("files", result.data.files);
        return;
      } else {
        toast.error(result.error.errors[0].message);
      }
    }
  };
  const handleClick = () => {
    fileRef.current?.click();
  };
  const removeFileHandler = (index: number) => {
    removePostFile(index);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (postData.files.length === 0) {
        showError({ error: "Please upload at least one file" });
        return;
      }
      onNext();
    } catch (error) {
      tryCatchErrorHandler(error, showError);
    }
  };
  return (
    <main className="mt-4 flex w-full  flex-col  justify-center gap-6">
      <div className="text-center ">
        <h1 className="text-4xl">Upload file</h1>
        <span className="text-2xl font-thin">Insert file </span>
      </div>
      <form onSubmit={onSubmit} className="flex flex-col">
        <div className="flex min-h-[400px] flex-col overflow-y-scroll   rounded-lg border-4 px-4 py-4">
          <label
            className="text-sm font-semibold  uppercase text-black text-opacity-25"
            htmlFor="add-images"
          >
            add images
          </label>
          <div className="flex max-h-[400px]   flex-wrap justify-center gap-2 overflow-y-scroll">
            {postData.files.map((img, index) =>
              img.type.includes("video") ? (
                <picture
                  key={index}
                  className="relative flex size-[120px] items-center justify-center rounded-md border bg-black bg-opacity-5"
                >
                  <div
                    className="absolute right-0 top-0 z-30 flex size-6 cursor-pointer items-center justify-center rounded-full bg-black"
                    role="button"
                    aria-label="Close"
                    onClick={() => removeFileHandler(index)}
                  >
                    <span className="text-md text-white">×</span>
                  </div>
                  <video
                    className="aspect-square h-full w-full object-cover"
                    controls
                    alt={`${index}_video`}
                    key={index}
                    src={URL.createObjectURL(img)}
                  />
                </picture>
              ) : (
                <div className="relative flex size-[120px] items-center justify-center rounded-md border bg-black bg-opacity-5">
                  <div
                    className="absolute right-0 top-0 z-30 flex size-6 cursor-pointer items-center justify-center rounded-full bg-black"
                    role="button"
                    aria-label="Close"
                    onClick={() => removeFileHandler(index)}
                  >
                    <span className="text-md text-white">×</span>
                  </div>
                  <img
                    className="aspect-square h-full w-full object-cover"
                    alt={`${index}_photo`}
                    key={index}
                    src={URL.createObjectURL(img)}
                  />
                </div>
              ),
            )}
            {postData.files.length < 3 && (
              <picture
                onClick={handleClick}
                onChange={handleFileChange}
                className="flex size-[120px] cursor-pointer items-center justify-center rounded-md border bg-black bg-opacity-5 transition-all hover:bg-opacity-35"
              >
                <input
                  type="file"
                  className="hidden h-full w-full"
                  multiple
                  accept="image/* video/*"
                  ref={fileRef}
                  name="files"
                />
                +
              </picture>
            )}
          </div>
        </div>
        <div className="flex justify-center gap-4 p-4">
          <button
            type="submit"
            className="flex w-1/2 items-center justify-center self-center rounded-md bg-blue-500 px-2 py-2.5 text-white"
          >
            <span className="flex items-center justify-center">Next</span>
          </button>
          <button
            type="button"
            className="flex w-1/2 items-center justify-center self-center rounded-md bg-red-500 px-2 py-2.5 text-white"
            onClick={() => {
              close();
              flushPostData();
            }}
          >
            <span className="flex items-center justify-center">Close</span>
          </button>
        </div>
      </form>
    </main>
  );
}
