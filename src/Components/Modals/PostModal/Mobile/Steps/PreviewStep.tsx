import { usePostStore } from "../../../../../store/post-store.";
import BackIcon from "../../../../Icon/BackIcon";
import { useMutation } from "@tanstack/react-query";
import { createPost } from "../../../../../api/post";
import { UserT } from "../../../../../types/auth";
import clsx from "clsx";
import toast from "react-hot-toast";
import useModalStore from "../../../../../modalStore/modalStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema } from "../../../../../schemas/schemas";
import { z } from "zod";
import { useStepper } from "../../../../../store/stepper-store";
import { useAuthStore } from "../../../../../store/auth-store.";
import PostItem from "../../../../Post/PostItem";
import { useEffect } from "react";
import PostPreview from "../../../../Post/PostPreview";
import { tryCatchErrorHandler } from "../../../../../utils/error";
import { useError } from "../../../../../store/ErrorContext";

type FormValues = z.infer<typeof postSchema>;
export default function PreviewStep({ user }: { user: UserT }) {
  const { postData, flushPostData } = usePostStore();
  const { close } = useModalStore();
  const { profilePictureUrl } = useAuthStore();
  const { onBack } = useStepper();
  const { showError } = useError();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(postSchema),
  });
  const { mutate, isPending } = useMutation({
    mutationFn: createPost,
    mutationKey: ["postData"],
    onSuccess: () => {
      toast.success("Post created successfully");
      close();
      flushPostData();
      onBack();
    },
    onError: (error) => {
      tryCatchErrorHandler(error, showError);
    },
  });
  const createPostHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({
      data: postData.caption,
      uploaded_files: postData.files,
    });
  };
  useEffect(() => {
    console.log(postData.files);
  }, [postData.files]);
  return (
    <main className="mt-4 flex w-full flex-col gap-6">
      <form className="flex flex-col gap-6" onSubmit={createPostHandler}>
        <BackIcon />
        <div className="flex flex-col items-center">
          <h1 className="text-4xl">Preview</h1>
          <span className="text-2xl">Here is your preview of post</span>
        </div>
        <PostPreview
          postId={1000}
          userId={user.id}
          imageFiles={postData.files}
          username={user.user_name as string}
          avatarUrl={profilePictureUrl || ""}
          images={postData.files as File[]}
          caption={postData.caption}
          likes={1000}
          comments={0}
          createdAt={new Date().toISOString()}
          location={"New York"}
          isLiked={true}
        />
        <div className="flex justify-center">
          <button
            type="submit"
            className={clsx(
              "flex w-1/2 items-center justify-center rounded-lg bg-blue-500 px-2 py-2.5 text-white",
              isPending && "opacity-50",
            )}
            disabled={isPending}
          >
            {isPending && <span>Loading...</span>}
            Create
          </button>
        </div>
      </form>
    </main>
  );
}
