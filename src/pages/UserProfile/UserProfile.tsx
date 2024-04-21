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
function UserProfile() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [image, setImage] = useState("");
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
  useEffect(() => {
    const fetchPicture = async () => {
      const image = await fetchMePicture(userData.profile.picture_id);
      setImage(image);
    };
    fetchPicture();
  });
  return (
    <Layout>
      <div className={`col-[2/-1] row-[1] p-4`}>
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
            {postCtx.posts.map((userPost) => (
              <UserPosts
                key={userPost.id}
                postID={userPost.id}
                postIMAGEID={userPost.postImage}
                postDESCRIPTION={userPost.postContent}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default UserProfile;
