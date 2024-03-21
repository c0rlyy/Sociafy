import { useState } from "react";
import ChooseImg from "./ChooseImg";
import "./UserProfile.css";
import { useLoaderData } from "react-router-dom";
import { UserProfileProps } from "../Fetch/fetchUsers";
import Layout from "../../Components/Layout/Layout";
import UserInfo from "./UserInfo/UserInfo";
import UserBio from "./UserBio/UserBio";
import UserPosts from "./UserPosts";

function UserProfile() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const openModalHandler = () => {
    setIsOpenModal(true);
  };
  const userPosts = useLoaderData();
  const userName = (userPosts as UserProfileProps).user_name;
  const handleClick = (e) => {
    console.log(e.target);
  };
  return (
    <Layout>
      <div className="grid grid-cols-userProfileLayoutGrid grid-rows-userProfileContainerRows">
        <div className="col-start-2 col-end-3 row-start-1 row-end-2 grid grid-cols-userProfileUpperMenu">
          <div className=" circle-container flex items-center border border-slate-500">
            <div
              onClick={openModalHandler}
              className="flex rounded-full border"
            >
              <img className=" rounded-full" alt="" />
            </div>
            {isOpenModal ? <ChooseImg /> : ""}
          </div>
          <h1 className="font-bold">{userName}</h1>
          {/* result of request here */}
          <UserInfo postsNumber={0} followers={0} following={0} />
          <UserBio />
        </div>
        <div
          onClick={handleClick}
          className="grid col-start-2 col-end-3 grid-cols-userProfile auto-rows-userProfileRows "
        >
          <div className="col-userPictures grid grid-cols-subgrid grid-rows-subgrid row-span-2 py-3">
            {/* {userPosts.map((userPost) => (
              <UserPosts
                key={userPost.post_id}
                postID={userPost.profile_id}
                postIMAGEID={userPost.profile_id}
                postDESCRIPTION={userPost.post_description}
              />
            ))} */}
          </div>
        </div>
      </div>
      <div
        onClick={handleClick}
        className="grid col-start-2 col-end-3 grid-cols-userProfile auto-rows-userProfileRows "
      >
        {/* {userPosts.map((userPost) => (
        <UserPosts postImage={"cos"} />
      ))} */}
        <div className="col-userPictures grid grid-cols-subgrid grid-rows-subgrid row-span-2 py-3">
          {/* {userPosts.map((userPost) => (
          <UserPosts
            key={userPost.post_id}
            postID={userPost.profile_id}
            postIMAGEID={userPost.profile_id}
          />
        ))} */}
        </div>
      </div>
    </Layout>
  );
}
export default UserProfile;
