import { useEffect, useState } from "react";
import { fetchCommentsCount, fetchLikesCount } from "../../api/post";

interface PostLikesProps{
  postId:number
}

export default function PostLikes({ postId }: PostLikesProps) {
  const [countOfLikes, setCountOfLikes] = useState(0);

  useEffect(() => {
    try {
      fetchLikesCount(postId).then((r) => {
        setCountOfLikes(r.post_likes_count);
      });
    } catch (e) {
      console.log(e)
    }
  });

  return (
    <div className="px-3 pb-2">
      {countOfLikes ? (
        <p className="text-sm text-gray-500">
          {countOfLikes} likes
        </p>
      ) : (
        <p className="text-sm italic text-gray-400">Be the first to like this</p>
      )}
    </div>
  );
}
