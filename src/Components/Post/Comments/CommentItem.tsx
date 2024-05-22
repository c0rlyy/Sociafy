import React from "react";
import { ReadComments } from "../../../store/PostContext";
export type CommentProps = Pick<
  ReadComments,
  "comment_content" | "profile_id" | "post_id" | "profile"
>;

const CommentItem: React.FC<CommentProps> = ({ profile, comment_content }) => {
  return (
    <div>
      <div className="flex items-center gap-2">
        <picture className="size-10 overflow-hidden rounded-full">
          <img
            className="h-full w-full"
            src={profile?.profile_picture as string}
            alt=""
          />
        </picture>
        <p className="text-sm">{comment_content}</p>
      </div>
    </div>
  );
};

export default CommentItem;
