import React from "react";
type RecommendedUserProps = {
  recommendedUserPhoto: string | undefined;
  recommendedUser: string;
  recommendedId: number | null;
  isFollowed: FollowState;
  handleFollowClick: () => void;
};
type FollowState = boolean;
const RecommendedItem: React.FC<RecommendedUserProps> = ({
  recommendedUserPhoto,
  recommendedUser,
  handleFollowClick,
  isFollowed,
}) => {
  return (
    <>
      <div className="col-[1/2] grid items-center ">
        <div className="flex items-center gap-3">
          <picture className="size-10 rounded-full border border-inherit">
            <img src={recommendedUserPhoto} alt="" />
          </picture>
          <h1 className={`${recommendedUser?.length > 10 ? "text-sm" : ""}`}>
            {recommendedUser}
          </h1>
        </div>
      </div>
      <div className="justify-self-center">
        <button
          onClick={() => {
            handleFollowClick();
          }}
          className={` ${
            isFollowed ? "bg-[#f4f5f7] text-black" : "bg-[#009fe3] text-white"
          } rounded-md border px-3 py-2`}
        >
          {isFollowed ? "Followed ✔" : "Follow"}
        </button>
      </div>
    </>
  );
};

export default RecommendedItem;
