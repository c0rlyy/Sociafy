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
import { useQuery } from "@tanstack/react-query";
function UserProfile() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleOpenPost = (e: SyntheticEvent) => {
    console.log(e.target.tagName);
  };
  const { getUser, getUserProfilePicUrl, userPosts, receivePostPicture } =
    useProfile();
  let { user_id } = useParams();
  const { data: userProfilePosts, isLoading: isUserProfilePostsLoading } =
    useQuery({
      queryKey: ["userPosts"],
      queryFn: async () => {
        const UserPosts = await userPosts(user_id);
        const UserData = await receivePostPicture(UserPosts);
        return UserData;
      },
    });
  if (isUserProfilePostsLoading) {
    return <div>Loading</div>;
  }
  return (
    <Layout>
      <div className={`col-[2/-1] row-[1] p-4`}>
        <div className="col-[2/3] row-[1/-1] grid grid-cols-userProfileUpperMenu grid-rows-3 items-center">
          <div className="flex items-center ">
            <div className="flex size-20 rounded-full border border-inherit">
              <img
                className="h-full w-full overflow-hidden rounded-full object-cover"
                alt=""
                src={userProfilePosts?.profile_picture}
              />
            </div>
          </div>
          <h1 className="font-bold">{userProfilePosts?.username}</h1>
          {/* result of request here */}
          <UserInfo postsNumber={0} followers={0} following={0} />
          <UserBio desc={userProfilePosts?.post_description} />
        </div>
        <div className="col-[2/3] grid auto-rows-userProfileRows grid-cols-userProfile ">
          <div
            onClick={handleOpenPost}
            className="col-[1/-1] row-span-2 grid grid-cols-subgrid grid-rows-subgrid py-3"
          >
            {userProfilePosts?.length > 0 ? (
              userProfilePosts?.map((userPost) => (
                <UserPosts
                  key={userPost?.post_id}
                  postDESCRIPTION={userPost?.post_description}
                  postIMAGE={userPost?.post_photo}
                  postFILMS={userPost?.post_film}
                  postIMAGEID={0}
                  postID={userPost?.post_id}
                  userID={userPost?.user_id}
                  profileID={userPost?.profile_id}
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
