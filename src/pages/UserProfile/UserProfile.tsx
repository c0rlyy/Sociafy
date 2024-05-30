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
import { ReadComments } from "../../store/PostContext";
import {
  useProfile,
  UserProfileContext,
} from "../../store/UserProfile-context";
import { useQuery } from "@tanstack/react-query";
import PostPreview from "./PostModal/PostPreview";
import FollowButton from "../../Components/FollowButton/FollowButton";
function UserProfile() {
  const {
    getUserWithPic,
    getUserProfilePicUrl,
    userPosts,
    receivePostPicture,
    openPreview,
    setOpenPreview,
    fetchPost,
    userProfileFollows,
    autoScroll,
  } = useProfile();
  const [selectedPost, setSelectedPost] = useState();
  const handlePost = async (post_id: number) => {
    const postID = post_id.target.getAttribute("data-id");
    if (postID) {
      console.log(postID);
      setSelectedPost(postID);
      setOpenPreview(true);
    }
  };
  const { data: previewPost, isLoading: isProfilePostsLoading } = useQuery({
    queryKey: ["previewPost"],
    queryFn: async () => {
      if (selectedPost) {
        const post = await fetchPost(selectedPost);
        console.log(post);
        return post;
      }
    },
    enabled: !!selectedPost,
  });
  const { data: FollowsNumber, isLoading: isFollowsLoading } = useQuery({
    queryKey: ["follows"],
    queryFn: async () => {},
  });
  // Sets selectedPost null, after closing modal
  autoScroll();
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
  const { data: userProfile, isLoading: isUserProfileLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const userProfile = await getUserWithPic(user_id);
      return userProfile;
    },
  });
  if (isUserProfilePostsLoading) {
    return <div>Loading</div>;
  }
  return (
    <Layout>
      <div className={`col-[2/-1] row-[1] p-4`}>
        <div className="col-[2/3] row-[1/-1] grid grid-cols-userProfileUpperMenu grid-rows-3 items-center">
          <div className="flex items-center gap-3 ">
            <picture className="flex size-20 rounded-full border border-inherit">
              <img
                className="h-full w-full overflow-hidden rounded-full object-cover"
                alt=""
                src={userProfile?.profile_picture}
              />
            </picture>
          </div>
          <h1 className="pl-3 font-bold">{userProfile?.user_name}</h1>
          {/* result of request here */}
          <UserInfo
            postsNumber={userProfilePosts.length}
            followers={userProfile?.followers}
            following={userProfile?.following}
          />
          <UserBio desc={userProfilePosts?.post_description} />
          <FollowButton profileID={userProfile?.profile.profile_id} />
        </div>
        <div className="sm:col[2/3] col-[1/-1] grid  grid-cols-userProfile ">
          <div
            onClick={(postId) => handlePost(postId)}
            className="col-[1/-1] grid auto-rows-[300px] grid-cols-userProfile sm:col-[1/-1]"
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
            {openPreview &&
              selectedPost &&
              previewPost?.map((post) => (
                <PostPreview
                  key={post?.post_id}
                  postID={post?.post_id}
                  userID={post?.profile_id}
                  profileID={post?.profile_id}
                  postDESCRIPTION={post?.post_description}
                  postIMAGE={post?.post_photo}
                  isOpened={openPreview}
                  profileIMAGE={userProfile?.profile_picture}
                  postTITLE={post?.post_title}
                  profileFILM={post?.post_film}
                  profileUSERNAME={post?.username}
                  postLikes={post?.post_likes}
                />
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default UserProfile;
