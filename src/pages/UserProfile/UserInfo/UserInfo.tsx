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
    <ul className="text-md lg:text-md col-[2/3] row-[2] flex gap-2 ">
      <li>Posts: {postsNumber}</li>
      <li>Followers: {followers}</li>
      <li>Following: {following}</li>
    </ul>
  );
};

export default UserInfo;
