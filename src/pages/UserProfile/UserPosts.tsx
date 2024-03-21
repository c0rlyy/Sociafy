import React from "react";
import UserProfileProps from "../Fetch/fetchUsers";
import { CurrentUserProfilePosts } from "../Fetch/fetchMyPosts";
type UserProfilePostProps = {
  postIMAGEID: number;
  postID: number;
  userID: number;
  profileID: number;
  postDESCRIPTION: string;
  postIMAGE: string;
};
const UserPosts: React.FC<UserProfilePostProps> = ({
  postIMAGEID,
  postID,
  userID,
  profileID,
  postDESCRIPTION,
  postIMAGE,
}) => {
  return (
    <picture data-id={postIMAGEID} className="max-w-full max-h-full mt-2">
      <img
        className="max-w-full max-h-full object-cover"
        src={`${postIMAGEID}`}
        alt=""
      />
    </picture>
  );
};

export default UserPosts;
