import { useEffect, useState } from "react";
import ChooseImg from "./ChooseImg";
import "./UserProfile.css";
import { useLoaderData } from "react-router-dom";
import { fetchMePicture, UserProfileProps } from "../Fetch/fetchMe";
import Layout from "../../Components/Layout/Layout";
import UserInfo from "./UserInfo/UserInfo";
import UserBio from "./UserBio/UserBio";
function UserProfile() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const openModalHandler = () => {
    setIsOpenModal(true);
    console.log(isOpenModal);
  };
  const userData = useLoaderData() as UserProfileProps;

  useEffect(() => {
    fetchMePicture(userData.profile.picture_id);
  });
  return (
    <Layout>
      <div className={`col-[2/-1] row-[2] p-4`}>
        <div className="col-[2/3] row-[1/-1] grid grid-cols-userProfileUpperMenu grid-rows-3 items-center">
          <div
            onClick={openModalHandler}
            className=" circle-container flex items-center border border-slate-500"
          >
            <div className="flex rounded-full border">
              <img
                onClick={openModalHandler}
                className=" rounded-full"
                alt=""
              />
            </div>
            {isOpenModal ? <ChooseImg /> : ""}
          </div>
          <h1 className="font-bold">{userData.user_name}</h1>
          {/* result of request here */}
          <UserInfo postsNumber={0} followers={0} following={0} />
          <UserBio desc={userData.profile.description} />
        </div>
        <div className="col-[2/3] grid auto-rows-userProfileRows grid-cols-userProfile ">
          <div className="col-userPictures row-span-2 grid grid-cols-subgrid grid-rows-subgrid py-3">
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
      <div className="col-start-2 col-end-3 grid auto-rows-userProfileRows grid-cols-userProfile ">
        {/* {userPosts.map((userPost) => (
        <UserPosts postImage={"cos"} />
      ))} */}
        <div className="col-userPictures row-span-2 grid grid-cols-subgrid grid-rows-subgrid py-3">
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
