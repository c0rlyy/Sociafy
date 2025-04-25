import Modal from "../Modal";
import type { UserT } from "../../../types/auth";
import { ChangeEvent, useEffect, useRef } from "react";
import PostItem from "../../Post/PostPreview";
import { usePostStore } from "../../../store/post-store.";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema } from "../../../schemas/schemas";
import { z } from "zod";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { createPost } from "../../../api/post";
import useModalStore from "../../../modalStore/modalStore";
import { useAuthStore } from "../../../store/auth-store.";
import UserAvatar from "../../UserInfo/UserAvatar";
type FormValues = z.infer<typeof postSchema>;
export default function DesktopPostModal({ user }: { user: UserT }) {
  const { postData, updateField, removePostFile, flushPostData } =
    usePostStore();
  const { profilePictureUrl } = useAuthStore();
  const { close } = useModalStore();
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      caption: "",
      files: [],
    },
  });
  const watchedTitle = watch("caption");
  const fileRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    fileRef.current?.click();
    console.log("Opened file !");
  };
  const removeFileHandler = (index: number) => {
    removePostFile(index);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0] && e.target.files) {
      const selectedFile = e.target.files;
      console.log(selectedFile);
      if (!selectedFile) return;
      const fileUploadSchema = postSchema.pick({ files: true });
      const result = fileUploadSchema.safeParse({ files: selectedFile });
      if (result.success) {
        updateField("files", result.data.files);
        return;
      } else {
        toast.error(result.error.errors[0].message);
      }
    }
  };
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormValues) => {
      await createPost({
        data: data.caption,
        uploaded_files: data.files,
      });
    },
    onSuccess: () => {
      toast.success("Post created successfully");
      flushPostData();
      close();
    },
    onError: () => {
      toast.error("Post creation failed");
    },
  });

  useEffect(() => {
    const initializer = setTimeout(() => {
      updateField("caption", watchedTitle);
    }, 1500);
    return () => {
      clearTimeout(initializer);
    };
  }, [watchedTitle, updateField]);
  const createPostHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(postData);
  };
  return (
    <Modal size="full">
      <main className="grid h-full grid-cols-1 gap-6  rounded-lg p-6 lg:grid-cols-[600px_1fr] ">
        <form
          onSubmit={createPostHandler}
          className="flex flex-col gap-9 px-2 py-4 "
        >
          <h1 className=" border-b px-2 py-1 text-lg font-semibold">
            New post
          </h1>
          {/* User */}
          <div className="flex items-center justify-between rounded-md border-2 px-2 py-3 ">
            <div className="flex items-center gap-2">
              <UserAvatar />
              <span className="text-md font-semibold">{user.user_name}</span>
            </div>
            <div>
              <button className="flex items-center justify-center rounded-md border-2 bg-white px-2.5 py-2">
                <span className="text-sm font-medium "> Switch Account</span>
              </button>
            </div>
          </div>
          {/* Caption */}
          <div className="flex flex-col gap-2 rounded-lg border-2 px-4 py-4">
            <label
              className="text-sm font-semibold uppercase text-black text-opacity-25"
              htmlFor="caption"
            >
              Caption
            </label>
            <textarea
              {...register("caption")}
              className="min-h-[140px] w-full rounded-lg bg-black bg-opacity-5 px-2 py-2.5 outline-none"
              placeholder="Enter your post content"
            />
            {errors.caption && (
              <span className="text-red-500">{errors.caption?.message}</span>
            )}
            <div className="flex justify-end text-xs text-black text-opacity-50">
              <span>{watch("caption")?.length || 0}/2200 characters</span>
            </div>
          </div>
          {/* Add Files */}
          <div className="flex min-h-[400px] flex-col overflow-y-scroll rounded-lg border-2 px-4 py-4">
            <label
              className="text-sm font-semibold uppercase text-black text-opacity-25"
              htmlFor="add-images"
            >
              add images
            </label>
            <div className="flex max-h-[400px] flex-wrap gap-2 overflow-y-scroll">
              {postData.files.map((img, index) =>
                img.type.includes("image") ? (
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
                    <img
                      className="aspect-square h-full w-full object-cover"
                      alt={`${index}_photo`}
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
                    <video
                      className="aspect-square h-full w-full object-cover"
                      controls
                      key={index}
                      src={URL.createObjectURL(img)}
                    />
                  </div>
                ),
              )}
              {postData.files.length === 3 ? (
                ""
              ) : (
                <picture
                  onClick={handleClick}
                  onChange={handleFileChange}
                  className="flex size-[120px] cursor-pointer items-center justify-center rounded-md border bg-black bg-opacity-5 transition-all hover:bg-opacity-35"
                >
                  <input
                    {...register("files")}
                    type="file"
                    accept="image/* video/*"
                    multiple
                    className="hidden h-full w-full"
                    ref={fileRef}
                    name="file"
                  />
                  +
                </picture>
              )}
            </div>
          </div>
          {errors.files && <span>{errors.files?.message}</span>}
          <div className=" flex items-center justify-center gap-2">
            <button
              type="submit"
              className="flex w-1/2 items-center justify-center rounded-md bg-blue-500 px-2 py-2.5 font-medium text-white transition-all hover:bg-opacity-85  "
            >
              <span className="h-full w-full">Create</span>
              {isPending && <span>Loading...</span>}
            </button>
            <button
              type="button"
              className="flex w-1/2 items-center justify-center rounded-md bg-red-500 px-2 py-2.5 font-medium text-white transition-all hover:bg-opacity-85  "
              onClick={() => {
                flushPostData();
                close();
              }}
            >
              <span className="h-full w-full">Cancel</span>
            </button>
          </div>
        </form>
        <article className=" flex w-auto flex-col items-center justify-center px-2 py-2.5">
          {/* Preview */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col items-center gap-1.5 ">
              <h1 className="text-2xl font-semibold">Preview</h1>
              <span className="text-md  w-3/4 text-center text-black text-opacity-40 ">
                Preview shows how your content will look when published. Social
                network updates may alter for final appearance
              </span>
            </div>
            <PostItem
              username={user.user_name as string}
              avatarUrl={profilePictureUrl || ""}
              images={postData.files}
              comments={0}
              createdAt={new Date().toISOString()}
              location={"New York"}
              caption={postData.caption}
              likes={1000}
              isLiked={true}
            />
          </div>
        </article>
      </main>
    </Modal>
  );
}
