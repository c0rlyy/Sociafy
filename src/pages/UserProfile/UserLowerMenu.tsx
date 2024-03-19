import React, { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { UserProfileProps } from "../Fetch/fetchUsers";
const UserLowerMenu: React.FC<UserProfileProps> = () => {
  const userData = useLoaderData() as UserProfileProps;

  useEffect(() => {
    localStorage.setItem("user_id", `${userData.user_id}`);
    localStorage.setItem("profile_id", `${userData.profile_id}`);
    localStorage.setItem("user_name", `${userData.user_name}`);
    localStorage.setItem("exp", `${userData.exp}`);
  }, []);
  return (
    <div className="grid grid-cols-UserProfile ">
      <h1 className="font-bold md:text-4xl">Currently no post available</h1>
    </div>
  );
};
export default UserLowerMenu;
