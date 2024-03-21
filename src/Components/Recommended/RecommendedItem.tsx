import React from "react";
type RecommendedUserProps = {
  recommendedUserPhoto: string;
  recommendedUser: string;
};
const RecommendedItem: React.FC<RecommendedUserProps> = ({
  recommendedUserPhoto,
  recommendedUser,
}) => {
  return (
    <>
      <div className="flex gap-5 mt-3 col-start-1 col-end-2 grid items-center">
        <div className="flex">
          <img src={`${recommendedUserPhoto}`} alt="" />
          <h1>{recommendedUser}</h1>
        </div>
      </div>
      <div>
        <button>Obserwuj +</button>
      </div>
    </>
  );
};

export default RecommendedItem;
