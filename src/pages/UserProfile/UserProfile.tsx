import {
  MouseEventHandler,
  SyntheticEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import ChooseImg from "./ChooseImg";
import "./UserProfile.css";
import { useLoaderData } from "react-router-dom";
import { fetchMePicture, UserProfileProps } from "../Fetch/fetchMe";
import Layout from "../../Components/Layout/Layout";
import UserInfo from "./UserInfo/UserInfo";
import UserBio from "./UserBio/UserBio";
import PostContext from "../../store/post-context";
import UserPosts from "./UserPosts";
import useFetchMyPost from "../../Hooks/useFetchMyPost";
import fetchUrl from "../Fetch/fetchUrl";
function UserProfile() {
  const { userPosts } = useFetchMyPost();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [image, setImage] = useState("");
  const [userP, setUserP] = useState(userPosts);
  const postCtx = useContext(PostContext);
  const openModalHandler = () => {
    setIsOpenModal(true);
    console.log(isOpenModal);
  };
  const handleOpenPost = (e: SyntheticEvent) => {
    console.log(e.target);
  };
  const userData = useLoaderData() as UserProfileProps;
  console.log(userData);
  return (
    <Layout>
      <div className={`col-[2/-1] row-[1] p-4`}>
        <div className="col-[2/3] row-[1/-1] grid grid-cols-userProfileUpperMenu grid-rows-3 items-center">
          <div onClick={openModalHandler} className="flex items-center ">
            <div className="rond flex size-20 rounded-full border border-inherit">
              <img
                onClick={openModalHandler}
                className="h-full w-full overflow-hidden rounded-full  object-cover"
                alt=""
                src={image}
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
          <div
            onClick={handleOpenPost}
            className="col-[1/-1] row-span-2 grid grid-cols-subgrid grid-rows-subgrid py-3"
          >
            {userPosts?.length == 0
              ? userPosts.map((userPost) => (
                  <UserPosts
                    key={userPost.post_id}
                    postDESCRIPTION={userPost.post_description}
                    postIMAGE={userPost.post_photo}
                    postIMAGEID={0}
                    postID={0}
                    userID={0}
                    profileID={0}
                    isOpened={false}
                  />
                ))
              : ""}
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default UserProfile;
