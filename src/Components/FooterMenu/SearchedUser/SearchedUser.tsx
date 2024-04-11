import React from "react";

type Props = {
  userImage: string;
  userName: string;
  userEmail: string;
};

const SearchedUser: React.FC<Props> = ({ userEmail, userImage, userName }) => {
  return (
    <div>
      <picture className="size-20 rounded-full border border-slate-500">
        <img className="w-full h-full rounded-full" src={userImage} alt="" />
      </picture>
      <div>
        <span className="font-bold">{userName}</span>
        <span className="italic">{userEmail}</span>
      </div>
    </div>
  );
};

export default SearchedUser;
