import { useLoaderData } from "react-router-dom";
import UserPosts from "./UserPosts";
import { CurrentUserProfilePosts } from "../Fetch/fetchMyPosts";
import React from "react";
// import PostContext from "../../store/post-context";
// import kubaPng from "../../assets/kubus.jpg";
// import rafalPng from "../../assets/rafal.jpg";
// import ja_wyciety from "../../assets/Ja_wyciety.png";
const UserLowerMenu: React.FC<CurrentUserProfilePosts> = () => {
  const userPosts = useLoaderData() as CurrentUserProfilePosts;

  // useEffect(() => {
  //   localStorage.setItem("user_id", `${userPosts.user_id}`);
  //   localStorage.setItem("profile_id", `${userPosts.profile_id}`);
  //   localStorage.setItem("user_name", `${userPosts.}`);
  //   localStorage.setItem("exp", `${userPosts.exp}`);
  // }, []);
  const handleClick = (e) => {
    console.log(e.target);
  };
  return (
    
  );
};
export default UserLowerMenu;
