import React, {
  ChangeEvent,
  ReactEventHandler,
  useEffect,
  useState,
} from "react";
import { AiFillHeart, AiOutlineHeart, AiOutlineLike } from "react-icons/ai";
import { FaHeart, FaRegComment } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { usePost } from "../../../store/PostContext";
import Comments from "../Comments/Comments";
import CreateComment from "../Comments/CreateComment/CreateComment";
export type ButtonsEventNamesAndFuncs = {
  like: "like";
  comment: "comment";
  share: "share";
  eventButtonClick: (action: string, post_id: number) => void;
  postId: number;
  likeStateProp: boolean;
  commentStateProp: boolean;
  shareStateProp: boolean;
};

const Buttons: React.FC<ButtonsEventNamesAndFuncs> = ({
  like,
  comment,
  share,
  // postId prop for handling which post
  postId,
  eventButtonClick,
  likeStateProp,
  commentStateProp,
  shareStateProp,
  postComments,
  handleClick,
  eventButtonHandlerActionProp,
}) => {
  const [likeStatus, setlikeStatus] = useState();
  useEffect(() => {
    console.log(like);
  }, [like]);
  const {
    buttonsState,
    likeButtonToggleHandler,
    shareButtonToggleHandler,
    commentButtonToggleHandler,
    isShareModalOpened,
  } = usePost();
  useEffect(() => {
    console.log(isShareModalOpened);
  }, [isShareModalOpened]);
  return (
    // Event delegation on parent div element
    <div
      className="row-[3/4] flex gap-5 self-center"
      onClick={(e) => {
        const ActionButtonType = e.target.getAttribute("name");
        if (ActionButtonType) {
          eventButtonHandlerActionProp(ActionButtonType, postId);
        }
      }}
    >
      {/* Toggle between outline and filled heart icons based on likeStateProp */}
      {buttonsState?.[postId]?.isLiked ? (
        <AiFillHeart
          onClick={() => likeButtonToggleHandler(postId)}
          name="like"
          size={"2rem"}
          color={"red"}
        />
      ) : (
        <AiOutlineHeart
          onClick={() => likeButtonToggleHandler(postId)}
          name="like"
          size={"2rem"}
        />
      )}
      <FaRegComment name={(comment = "comment")} size={"2rem"} />
      <FiSend name={(share = "share")} size={"2rem"} />
    </div>
  );
};
export default Buttons;
