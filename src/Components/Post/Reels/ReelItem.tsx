import React from "react";
type ReelItemProps = {
  reelUserPhoto: string;
  reelUser: string;
};
const ReelItem: React.FC<ReelItemProps> = ({ reelUserPhoto, reelUser }) => {
  return (
    <div className="flex flex-col">
      <picture className="flex justify-center items-center h-14 w-14 rounded-full overflow-hidden border-2 border-[#0093E9] border-[linear-gradient(195deg,#0093E9_0%,#80D0C7_100%)]">
        <img
          className="object-cover h-full w-full"
          src={`${reelUserPhoto}`}
          alt=""
        />
      </picture>
      <span>{(reelUser = "Jaca")}</span>
    </div>
  );
};

export default ReelItem;
