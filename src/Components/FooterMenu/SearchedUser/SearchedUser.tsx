import React from "react";
import { CiUser } from "react-icons/ci";
type Props = {
  userImage: string;
  userName: string;
  userEmail: string;
  userId: number;
};

const SearchedUser: React.FC<Props> = ({
  userEmail,
  userImage,
  userName,
  userId,
}) => {
  return (
    <div data-userid={userId} className="flex place-items-center gap-3">
      <picture className="size-12 rounded-full border border-blue-500 ">
        {!userImage ? (
          <CiUser className="h-full w-full" />
        ) : (
          <img
            className={`h-full w-full rounded-full border border-slate-500`}
            src={userImage}
            alt=""
          />
        )}
      </picture>
      <div>
        <span className="font-bold text-inherit">{userName}</span>
        <span className="italic">{userEmail}</span>
      </div>
    </div>
  );
};

export default SearchedUser;
