import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FaHeart } from "react-icons/fa";
import Buttons from "../Buttons/Buttons";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { usePost } from "../../../store/PostContext";
import CreateComment from "../Comments/CreateComment/CreateComment";
import { Modal } from "@mui/base";
import { Dialog } from "@mui/material";
import ShareModal from "../../Modals/ShareModal/ShareModal";
import { useInView } from "react-intersection-observer";
type postItemProps = {
  postTITLE: string;
  postID: number;
  postDESC: string;
  profileID: number;
  eventButtonHandler: () => void;
  userIMG: string;
  username: string ;
  // postFiles: postFiles[];
  likeState: boolean;
  commentState: boolean;
  shareState: boolean;
  postPhotos: string;
  postFilms: string;
  userID: number,
  postLikes: number;
  postComments: string;
};
type postFiles = {
  path: string;
  file_type: string;
  file_id: number;
};
const PostItem: React.FC<postItemProps> = ({
  postDESC,
  userIMG,
  username,
  postPhotos,
  postID,
  shareState,
  likeState,
  commentState,
  postFilms,
  userID,
  postLikes,
  postComments,
  profilePicture,
  eventButtonHandler,
}: postItemProps) => {
  const [postLikesState, setPostLikesState] = useState<number>(postLikes);
  const { buttonsState, isShareModalOpened } = usePost();
  const { ref, inView } = useInView({ threshold: 0.225 });
  // const { data: likesCount, isLoading: isPostsLikesLoading } = useQuery({
  //   queryKey: ["likes"],
  //   queryFn: async () => {
  //     const CountPostLikes = await countPostLikes(postID);
  //     return CountPostLikes;
  //   },
  // });
  // useEffect(() => {
  //   console.log(`Is inView: ${inView}`);
  // }, [inView]);
  return (
    <div
      ref={ref}
      className="grid min-h-[50vh] grid-rows-postCard sm:grid-cols-PostCardColumns  "
    >
      <div className=" col-[1/-1] row-span-4 grid grid-cols-subgrid grid-rows-subgrid sm:col-[2/3]">
        <div className="flex items-center gap-2">
          <picture className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-gray-300">
            {userIMG && (
              <Link className="h-full w-full" to={`/User/${userID}`}>
                <img src={userIMG} className="h-full w-full  object-cover" />
              </Link>
            )}
          </picture>
          <h1>{username}</h1>
        </div>
        <picture className="row-[2/3] h-full w-full">
          {postPhotos && (
            <img
              className={`h-full max-h-full w-full max-w-full object-cover transition-all ${!inView ? "blur-3xl" : ""}`}
              src={postPhotos}
              alt=""
            />
          )}
          {postFilms && (
            <video
              controls
              src={postFilms}
              playsInline
              className={`h-full w-full ${!inView ? "blur-3xl" : ""}`}
              title="Post Film"
              loop
            ></video>
          )}
        </picture>
        <Buttons
          like={"like"}
          comment={"comment"}
          share={"share"}
          postId={postID}
          likeStateProp={likeState}
          commentStateProp={commentState}
          shareStateProp={shareState}
          eventButtonHandlerActionProp={(action: string, post_id: number) => {
            eventButtonHandler(action, postID);
          }}
        />
        <div>
          {buttonsState?.[postID]?.isCreateCommentOpened && (
            <CreateComment userProfileImage={profilePicture} postID={postID} />
          )}
          <ShareModal open={isShareModalOpened} />

          <h1>{`Likes: ${postLikes}`}</h1>
          <div>
            <span className={`text-bold flex gap-2`}>
              {username}:
              <p>
                {postDESC.length > 30
                  ? postDESC.slice(0, 25) + "..."
                  : postDESC}
              </p>
            </span>
            <span
              data-userid={userID}
              data-postid={postID}
              className="font-thin italic"
            >{`See comments `}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PostItem;
