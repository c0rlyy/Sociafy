import {
  MouseEventHandler,
  SyntheticEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import desc from "./ChooseImg";
import "./UserProfile.css";
import { useLoaderData, useParams } from "react-router-dom";
import { fetchMePicture, UserProfileProps } from "../Fetch/fetchMe";
import Layout from "../../Components/Layout/Layout";
import UserInfo from "./UserInfo/UserInfo";
import UserBio from "./UserBio/UserBio";
import PostContext from "../../store/PostContext";
import UserPosts from "./UserPosts";
import useFetchMyPost from "../../Hooks/useFetchMyPost";
import fetchUrl from "../Fetch/fetchUrl";
import ChooseImg from "./ChooseImg";
import {
  useProfile,
  UserProfileContext,
} from "../../store/UserProfile-context";
function UserProfile() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleOpenPost = (e: SyntheticEvent) => {
    console.log(e.target.tagName);
  };
  const { userProfile } = useProfile();
  const userData = useLoaderData() as UserProfileProps;
  let { prof_id } = useParams();
  useEffect(() => {
    console.log(prof_id);
  }, [prof_id]);
  return (
    <Layout>
      <div className={`col-[2/-1] row-[1] p-4`}>
        <div className="col-[2/3] row-[1/-1] grid grid-cols-userProfileUpperMenu grid-rows-3 items-center">
          <div className="flex items-center ">
            <div className="flex size-20 rounded-full border border-inherit">
              <img
                className="h-full w-full overflow-hidden rounded-full object-cover"
                alt=""
                src={userProfile?.profile_id}
              />
            </div>
          </div>
          <h1 className="font-bold">{userProfile?.username}</h1>
          {/* result of request here */}
          <UserInfo postsNumber={0} followers={0} following={0} />
          <UserBio desc={userProfile?.description} />
        </div>
        <div className="col-[2/3] grid auto-rows-userProfileRows grid-cols-userProfile ">
          <div
            onClick={handleOpenPost}
            className="col-[1/-1] row-span-2 grid grid-cols-subgrid grid-rows-subgrid py-3"
          >
            {userProfile?.posts?.length > 0 ? (
              userData.map((userPost) => (
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
            ) : (
              <h1>No posts were found</h1>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default UserProfile;
