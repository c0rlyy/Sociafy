import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FaHeart } from "react-icons/fa";
import Buttons from "../Buttons/Buttons";
import { Link, useParams } from "react-router-dom";
type postItemProps = {
  postTITLE: string;
  postID: number;
  postDESC: string;
  profileID: number;
  eventButtonHandler: () => void;
  userIMG: string;
  username: string;
  // postFiles: postFiles[];
  likeState: boolean;
  commentState: boolean;
  shareState: boolean;
  postPhotos: string;
  postFilms: string;
  userID: string;
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
  eventButtonHandler,
}: postItemProps) => {
  return (
    <div
      data-userid={userID}
      data-postid={postID}
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
              className="h-full max-h-full w-full max-w-full object-cover"
              src={postPhotos}
              alt=""
            />
          )}
          {postFilms && (
            <video
              controls
              src={postFilms}
              playsInline
              className="h-full w-full"
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
          eventButtonClick={(action) =>
            eventButtonHandler(
              action,
              postID /*<- That postID from Buttons component */,
            )
          }
          likeStateProp={likeState}
          commentStateProp={commentState}
          shareStateProp={shareState}
        />
        <div>
          <h1>{`Likes: ${1133}`}</h1>
          <div>
            <span className="text-bold flex gap-2">
              {username}:<p>{postDESC}</p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PostItem;
