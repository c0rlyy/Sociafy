import React from "react";
import { CommentProps } from "./CommentItem";
import CommentItem from "./CommentItem";
import CreateComment from "./CreateComment/CreateComment";
import { ReadComments } from "../../../store/PostContext";
const Comments: React.FC<{ post_comments: ReadComments[] }> = ({
  post_comments,
}) => {
  if (!post_comments) {
    return <h1 className="text-center text-sm italic">No comments</h1>;
  }
  return (
    <div className="mt-2 flex h-[250px] flex-col items-start gap-3 overflow-y-scroll  sm:h-full">
      {post_comments?.map((comment) => (
        <CommentItem
          key={comment?.profile_id}
          profile_id={comment?.profile_id}
          profile={comment?.profile}
          comment_content={comment?.comment_content}
        />
      ))}
    </div>
  );
};

export default Comments;
