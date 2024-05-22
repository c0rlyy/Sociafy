import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import React, { FormEventHandler, ReactEventHandler } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { usePost } from "../../../../store/PostContext";
type createCommentProps = {
  userProfileImage: string | null;
  postID: number;
};

const CreateComment = ({ userProfileImage, postID }: createCommentProps) => {
  //   const { data: createCommentData, isLoading: isCreatingComment } = useQuery({
  //     queryKey: ["comment"],
  //     queryFn: async () => {
  //       const CreatedComment = await createComment(postID,register);
  //       return CreatedComment;
  //     },
  //   });
  const { createComment } = usePost();
  type commentType = {
    comment: string;
  };
  const commentSchema = z.object({
    comment: z.string().min(1),
  });
  const { register, handleSubmit } = useForm<commentType>({
    resolver: zodResolver(commentSchema),
  });
  const onCreateComment = async (data: commentType) => {
    const CreateComment = await createComment(postID, data.comment);
    return CreateComment;
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit(onCreateComment)();
    }
  };
  return (
    <div>
      <div className="row-[3/4] flex items-center ">
        <picture className="size-10 overflow-hidden rounded-full">
          <img className="h-full w-full" src={userProfileImage} alt="" />
        </picture>
        <form className="p-2" onSubmit={handleSubmit(onCreateComment)}>
          <input
            type="text"
            {...register("comment")}
            onKeyDown={handleKeyPress}
            className="black h-5/6 rounded-md border border-slate-500"
            placeholder="Write your comment..."
            name="comment"
          />
        </form>
      </div>
    </div>
  );
};

export default CreateComment;
