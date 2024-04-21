import React from "react";
import Buttons from "../Buttons/Buttons";
import { LazyLoadImage } from "react-lazy-load-image-component";
type postItemProps = {
  postTITLE: string;
  postID: number;
  postDESC: string;
  profileID: number;
  userIMG: string;
  username: string;
  postImage: string;
};
const PostItem: React.FC<postItemProps> = ({
  postDESC,
  userIMG,
  username,
  postImage,
}: postItemProps) => {
  return (
    <div className="mt-8 grid min-h-[50vh] grid-cols-PostCardColumns grid-rows-postCard  ">
      <div className="col-[2/3] row-span-4 grid grid-cols-subgrid grid-rows-subgrid">
        <div className="flex items-center gap-2">
          <picture className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-gray-300">
            <LazyLoadImage />
          </picture>
          <h1>{username}</h1>
        </div>
        <picture className="row-[2/3]">
          <img
            className="h-full w-full object-cover"
            src={`${postImage}`}
            alt=""
          />
        </picture>
        <Buttons />
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
