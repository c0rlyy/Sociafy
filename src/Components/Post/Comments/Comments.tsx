import React from "react";
import { CommentProps } from "./CommentItem";
import CommentItem from "./CommentItem";
import CreateComment from "./CreateComment/CreateComment";
const Comments: React.FC<{ post_comments: [] }> = ({ post_comments }) => {
  if (!post_comments) {
    return <h1 className="text-center text-sm italic">No comments</h1>;
  }
  return (
    <div className="flex flex-col items-center gap-3 overflow-hidden">
      {post_comments?.map((comment, index) => (
        <CommentItem
          key={index}
          post_id={comment.post_id}
          profile_id={comment.profile_id}
          profile={comment.profile}
          comment_content={comment.comment_content}
        />
      ))}
    </div>
  );
};

export default Comments;
