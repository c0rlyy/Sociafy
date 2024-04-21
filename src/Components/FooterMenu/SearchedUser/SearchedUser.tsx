import React from "react";

type Props = {
  userImage: string;
  userName: string;
  userEmail: string;
};

const SearchedUser: React.FC<Props> = ({ userEmail, userImage, userName }) => {
  return (
    <div className="flex place-items-center gap-3">
      <picture className="size-10 rounded-full border border-slate-500">
        <img className="h-full w-full rounded-full" src={userImage} alt="" />
      </picture>
      <div>
        <span className="font-bold">{userName}</span>
        <span className="italic">{userEmail}</span>
      </div>
    </div>
  );
};

export default SearchedUser;
