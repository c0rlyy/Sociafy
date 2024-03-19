import React from "react";
import UserProfileProps from "../Fetch/fetchUsers";

const UserPosts: React.FC<UserPostsProps> = ({ postImage }) => {
  return (
    <picture>
      <img src={`${postImage}`} alt="" />
    </picture>
  );
};

export default UserPosts;
