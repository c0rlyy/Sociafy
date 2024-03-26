import React from "react";
import ReelItem from "./ReelItem";
const Reels = () => {
  return (
    <div className="md:col-[2/3] md:row-[2/3] col-[1/3]">
      <ReelItem reelUserPhoto={""} reelUser={""} reel={""} />
    </div>
  );
};

export default Reels;
