import React from "react";
import UserProfileProps from "../Fetch/fetchUsers";
import { CurrentUserProfilePosts } from "../Fetch/fetchMyPosts";
import PostPreview from "./PostModal/PostPreview";
export type UserProfilePostProps = {
  postIMAGEID: number;
  postID: number;
  userID: number;
  profileID: number;
  postDESCRIPTION: string;
  postIMAGE: string;
  isOpened: boolean;
};
const UserPosts: React.FC<UserProfilePostProps> = ({
  postIMAGEID,
  postID,
  userID,
  profileID,
  postDESCRIPTION,
  postIMAGE,
  isOpened,
}) => {
  return (
    <>
      <picture data-id={postIMAGEID} className="h-full w-full">
        <img
          className="h-full w-full overflow-hidden object-cover"
          src={`${postIMAGEID}`}
          alt=""
        />
      </picture>
      {isOpened ? (
        <PostPreview
          postIMAGEID={postIMAGEID}
          postID={postID}
          userID={postID}
          profileID={profileID}
          postDESCRIPTION={postDESCRIPTION}
          postIMAGE={postIMAGE}
          isOpened={false}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default UserPosts;
