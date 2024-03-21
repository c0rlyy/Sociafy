import React from "react";

type UserInfoProps = {
  postsNumber: number;
  followers: number;
  following: number;
};

const UserInfo: React.FC<UserInfoProps> = ({
  postsNumber,
  followers,
  following,
}) => {
  return (
    <ul className="flex gap-2 col-start-2 col-end-3 row-start-1 ">
      <li>Posts: {postsNumber}</li>
      <li>Followers: {followers}</li>
      <li>Following: {following}</li>
    </ul>
  );
};

export default UserInfo;
