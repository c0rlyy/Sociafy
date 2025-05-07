import { useEffect, useState } from "react";
import { fetchCommentsCount } from "../../../api/comments";
import { tryCatchErrorHandler } from "../../../utils/error";
import { useError } from "../../../store/ErrorContext";
import { Paragraph } from "../../atoms/Typography/Typography";
import { Box } from "../../atoms/Container/Container";
type PostCommentsProps = {
  postId: number;
};

export default function PostComments({ postId }: PostCommentsProps) {
  const [countOfComments, setCountOfComments] = useState(0);
  const { showError } = useError();

  useEffect(() => {
    try {
      fetchCommentsCount(postId).then((r) => {
        setCountOfComments(r.post_comments_count);
      });
    } catch (e) {
      tryCatchErrorHandler(e, showError);
    }
  });

  return (
    <Box padding="sm">
      {countOfComments ? (
        <Paragraph variant="muted" size="sm">
          View all {countOfComments} comments
        </Paragraph>
      ) : (
        <Paragraph variant="muted" className="italic" size="sm">
          Be the first to comment
        </Paragraph>
      )}
    </Box>
  );
}
