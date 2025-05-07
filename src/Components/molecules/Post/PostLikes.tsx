import { useEffect, useState } from "react";
import { fetchLikesCount } from "../../../api/likes";
import { tryCatchErrorHandler } from "../../../utils/error";
import { useError } from "../../../store/ErrorContext";
import { highNumbersConverter } from "../../../utils/helpers";
import { Box } from "../../atoms/Container/Container";
import { Paragraph } from "../../atoms/Typography/Typography";
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
    <Box>
      {countOfLikes ? (
        <Box>
          Likes:
          <Paragraph variant="default">
            {highNumbersConverter(countOfLikes)} likes
          </Paragraph>
        </Box>
      ) : (
        <Paragraph size="sm" variant="default">
          Be the first to like this post
        </Paragraph>
      )}
    </Box>
  );
}
