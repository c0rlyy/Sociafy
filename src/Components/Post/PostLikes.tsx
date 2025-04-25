import { useEffect, useState } from "react";
import { fetchLikesCount } from "../../api/likes";
import { tryCatchErrorHandler } from "../../utils/error";
import { useError } from "../../store/ErrorContext";
import { highNumbersConverter } from "../../utils/helpers";
interface PostLikesProps {
  postId: number;
}

export default function PostLikes({ postId }: PostLikesProps) {
  const [countOfLikes, setCountOfLikes] = useState(0);
  const { showError } = useError();
  useEffect(() => {
    try {
      fetchLikesCount(postId).then((r) => {
        setCountOfLikes(r.post_likes_count);
      });
    } catch (e) {
      console.log(e);
      tryCatchErrorHandler(e, showError);
    }
  });

  return (
    <div className="px-3 pb-2">
      {countOfLikes ? (
        <p className="text-sm text-gray-500">
          {highNumbersConverter(countOfLikes)} likes
        </p>
      ) : (
        <p className="text-sm italic text-gray-400">
          Be the first to like this
        </p>
      )}
    </div>
  );
}
