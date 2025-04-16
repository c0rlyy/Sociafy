import { useEffect, useState } from "react";
import { fetchCommentsCount } from "../../api/comments";

type PostCommentsProps = {
  postId: number;
};

export default function PostComments({ postId }: PostCommentsProps) {
  const [countOfComments, setCountOfComments] = useState(0);

  useEffect(() => {
    try {
      fetchCommentsCount(postId).then((r) => {
        setCountOfComments(r.post_comments_count);
      });
    } catch (e) {
      console.log(e)
    }
  });

  return (
    <div className="px-3 pb-2">
      {countOfComments ? (
        <p className="text-sm text-gray-500">
          View all {countOfComments} comments
        </p>
      ) : (
        <p className="text-sm italic text-gray-400">Be the first to comment</p>
      )}
    </div>
  );
}
