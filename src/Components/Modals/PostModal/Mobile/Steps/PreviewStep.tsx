/* eslint-disable @typescript-eslint/no-misused-promises */
import { useForm } from "react-hook-form";
import { usePostStore } from "../../../../../store/post-store.";
import BackIcon from "../../../../Icon/BackIcon";
import PostItem from "../../../../Post/post-item";
import { useMutation } from "@tanstack/react-query";
import { createPost } from "../../../../../api/post";
import { z } from "zod";
import { postSchema } from "../../../../../schemas/schemas";
import { UserT } from "../../../../../types/auth";
type FormValues = z.infer<typeof postSchema>;
export default function PreviewStep({ user }: { user: UserT }) {
  const { postData } = usePostStore();
  const { handleSubmit } = useForm<FormValues>();
  const { mutate } = useMutation({
    mutationFn: createPost,
    mutationKey: ["postData"],
  });
  const createPostHandler = () => {
    console.log(postData);
    mutate(postData);
  };
  return (
    <main className="mt-4 flex w-full flex-col gap-6">
      <form onSubmit={handleSubmit(createPostHandler)}>
        <BackIcon />
        <div className="flex flex-col items-center">
          <h1 className="text-4xl">Preview</h1>
          <span className="text-2xl">Here is your preview of post</span>
        </div>
        <PostItem
          caption={postData.caption}
          images={postData.files as File[]}
          likes={1000}
          isLiked={true}
          comments={0}
          username={user.user_name as string}
          avatarUrl={""}
          createdAt={new Date().toISOString()}
          location={"New York"}
        />
        <div className="flex justify-center">
          <button
            type="submit"
            className="flex w-1/2 items-center justify-center rounded-lg bg-blue-500 px-2 py-2.5 text-white"
          >
            Create
          </button>
        </div>
      </form>
    </main>
  );
}
