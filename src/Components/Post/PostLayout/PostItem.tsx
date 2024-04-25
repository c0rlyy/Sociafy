import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FaHeart } from "react-icons/fa";
import Buttons from "../Buttons/Buttons";
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
  eventButtonHandler,
}: postItemProps) => {
  return (
    <div
      data-postid={postID}
      className="mt-8 grid min-h-[50vh] grid-cols-PostCardColumns grid-rows-postCard  "
    >
      <div className="col-[2/3] row-span-4 grid grid-cols-subgrid grid-rows-subgrid">
        <div className="flex items-center gap-2">
          <picture className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-gray-300">
            {userIMG ? (
              <img src={userIMG} className="h-full w-full object-cover" />
            ) : (
              ""
            )}
          </picture>
          <h1>{username}</h1>
        </div>
        <picture className="row-[2/3]">
          <img className="h-full w-full" src={postPhotos} alt="" />
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
