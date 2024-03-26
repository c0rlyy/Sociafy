import React from "react";
import Reel from "./Reel.module.css";
import ReelModal from "../../Modal/ReelModal/ReelModal";
type ReelItemProps = {
  reelUserPhoto: string;
  reelUser: string;
  reel: string;
};
const ReelItem: React.FC<ReelItemProps> = ({
  reelUserPhoto,
  reelUser,
  reel,
}) => {
  return (
    <>
      <div className={Reel.user}>
        <picture className={Reel.userImageBox}>
          <img className={Reel.userImage} src={`${reelUserPhoto}`} alt="" />
        </picture>
        <span>{reelUser}</span>
      </div>
      <div className={Reel.content}>{reel}</div>
    </>
  );
};

export default ReelItem;
