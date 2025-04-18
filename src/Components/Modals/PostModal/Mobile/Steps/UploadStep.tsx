/* eslint-disable @typescript-eslint/no-misused-promises */
import { useEffect, useRef } from "react";
import type { ChangeEvent } from "react";
import { usePostStore } from "../../../../../store/post-store.";
import { useStepper } from "../../../../../store/stepper-store";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema } from "../../../../../schemas/schemas";
import { z } from "zod";
type FormInputT = z.infer<typeof postSchema>;

export default function UploadStep() {
  const fileRef = useRef<HTMLInputElement>(null);
  const { onNext } = useStepper();
  const { updateField, postData, removePostFile } = usePostStore();
  const filesObj = postSchema.pick({ files: true });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormInputT>({
    resolver: zodResolver(filesObj),
    defaultValues: {
      files: [],
    },
  });

  // Syncing store state with actual form state
  useEffect(() => {
    if (postData.files.length > 0) {
      setValue("files", postData.files, { shouldValidate: true });
    }
  }, [postData.files, setValue]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0] && e.target.files) {
      const selectedFile = e.target.files[0];
      updateField("files", [selectedFile]);
    }
  };
  const handleClick = () => {
    fileRef.current?.click();
  };
  const removeFileHandler = (index: number) => {
    removePostFile(index);
  };

  const onSubmit: SubmitHandler<FormInputT> = (data) => {
    console.log(data);
    onNext();
  };
  return (
    <main className="mt-4 flex w-full  flex-col  justify-center gap-6">
      <div className="text-center ">
        <h1 className="text-4xl">Upload file</h1>
        <span className="text-2xl font-thin">Insert file </span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <div className="flex min-h-[400px] flex-col overflow-y-scroll   rounded-lg border-4 px-4 py-4">
          <label
            className="text-sm font-semibold  uppercase text-black text-opacity-25"
            htmlFor="add-images"
          >
            add images
          </label>
          <div className="flex max-h-[400px]   flex-wrap justify-center gap-2 overflow-y-scroll">
            {postData.files.map((img, index) => (
              <picture
                key={index}
                className="relative flex size-[120px] items-center justify-center rounded-md border bg-black bg-opacity-5 "
              >
                <div
                  className="absolute right-0 top-0 z-30 flex size-6 cursor-pointer items-center justify-center rounded-full bg-black"
                  role="button"
                  aria-label="Close"
                  onClick={() => removeFileHandler(index)}
                >
                  <span className="text-md text-white">×</span>
                </div>

                <img
                  img-index={index}
                  className="aspect-square h-full w-full object-cover hover:opacity-35"
                  alt={`${index}_photo`}
                  key={index}
                  src={URL.createObjectURL(img as File)}
                />
              </picture>
            ))}
            {postData.files.length < 3 && (
              <picture
                onClick={handleClick}
                onChange={handleFileChange}
                className="flex size-[120px] cursor-pointer items-center justify-center rounded-md border bg-black bg-opacity-5 transition-all hover:bg-opacity-35"
              >
                <input
                  {...register("files")}
                  type="file"
                  className="hidden h-full w-full"
                  multiple
                  accept="image/png, image/jpeg, image/gif, image/webp, video/mp4"
                  ref={fileRef}
                  name="files"
                />
                +
              </picture>
            )}
          </div>
        </div>
        {errors && (
          <span className="flex w-full text-center text-red-500">
            {errors.files?.message}
          </span>
        )}
        <button
          type="submit"
          className="flex w-1/2 items-center justify-center self-center rounded-md bg-black px-2 py-2.5 text-white"
        >
          <span className="flex items-center justify-center">Next</span>
        </button>
      </form>
    </main>
  );
}
