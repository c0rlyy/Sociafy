/* eslint-disable @typescript-eslint/no-misused-promises */
import { clsx } from "clsx";
import { useStepper } from "../../../../../store/stepper-store";
import BackIcon from "../../../../Icon/BackIcon";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema } from "../../../../../schemas/schemas";
import { usePostStore } from "../../../../../store/post-store.";
import { z } from "zod";
import { SubmitHandler } from "react-hook-form";
type FormValues = z.infer<typeof postSchema>;
export default function CaptionStep() {
  const caption = postSchema.pick({ caption: true });
  const { postData } = usePostStore();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({ resolver: zodResolver(caption) });
  const { onNext } = useStepper();
  const { updateField } = usePostStore();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    updateField("caption", data.caption);
    onNext();
  };
  return (
    <main className="mt-4 flex w-full flex-col gap-6">
      <form
        className="flex flex-col gap-6"
        onSubmit={handleSubmit(onSubmit)}
        action=""
      >
        <BackIcon />
        <div className="text-center">
          <h1 className="text-4xl">Caption </h1>
          <span className="text-2xl">Enter your post content</span>
        </div>
        <div className="flex w-full flex-col">
          <textarea
            {...register("caption")}
            className="min-h-[500px] p-3 outline-none"
            placeholder="Post content here..."
            name="caption"
            id=""
            defaultValue={postData.caption}
          />
        </div>
        {errors && (
          <span className="text-red-500">{errors?.caption?.message}</span>
        )}
        <div className="flex justify-center ">
          <button
            className={clsx(
              "w-full rounded-lg bg-blue-500  px-2 py-2.5 text-white transition-all hover:bg-opacity-65",
            )}
            type="submit"
          >
            <span>Next</span>
          </button>
        </div>
      </form>
    </main>
  );
}
