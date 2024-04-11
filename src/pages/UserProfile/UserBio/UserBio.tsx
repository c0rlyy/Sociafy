import React from "react";
type UserBioProps = {
  desc: string | null;
};
const UserBio: React.FC<UserBioProps> = ({ desc }) => {
  return (
    <div className=" col-[2/3] row-[3]">
      <p>{desc === null ? "Write something about you" : desc}</p>
    </div>
  );
};

export default UserBio;
