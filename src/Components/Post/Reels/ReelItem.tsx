import React from "react";
import Reel from "./Reel.module.css";
import ReelModal from "../../Modal/ReelModal/ReelModal";
import { IoMdCloseCircle } from "react-icons/io";
type ReelItemProps = {
  reelUserPhoto: string;
  reelUser: string;
  reelID: string;
};
const ReelItem: React.FC<ReelItemProps> = ({
  reelUserPhoto,
  reelUser,
  reelID,
}) => {
  return (
    <div data-reelid={reelID} aria-label={reelID} className={Reel.user}>
      <picture data-reelid={reelID} className={Reel.userImageBox}>
        <img
          data-reelid={reelID}
          className={Reel.userImage}
          src={`${reelUserPhoto}`}
          alt=""
        />
      </picture>
      <span className={Reel.reelUser}>
        {reelUser.length > 5 ? reelUser.slice(0, 5) + "..." : reelUser}
      </span>
    </div>
  );
};

export default ReelItem;
