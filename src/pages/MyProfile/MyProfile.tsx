import { useQueries, useQuery } from "@tanstack/react-query";
import React, { SyntheticEvent, useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import { UpdatedPosts } from "../../store/PostContext";
import { useProfile } from "../../store/UserProfile-context";
import Loader from "../Loader/Loader";
import ChooseImg from "../UserProfile/ChooseImg";
import PostPreview from "../UserProfile/PostModal/PostPreview";
import UserBio from "../UserProfile/UserBio/UserBio";
import UserInfo from "../UserProfile/UserInfo/UserInfo";
import UserPosts from "../UserProfile/UserPosts";
import { LineWave } from "react-loader-spinner";
import FollowButton from "../../Components/FollowButton/FollowButton";
const MyProfile = (props: Props) => {
  const [selectedPost, setSelectedPost] = useState();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const {
    fetchMe,
    fetchMyPosts,
    fetchPost,
    getUserProfilePicUrl,
    postControlHandler,
    openPreview,
    setOpenPreview,
    receivePostPicture,
    getUserWithPic,
    userProfileFollows,
  } = useProfile();
  const handlePost = async (post_id: number) => {
    const postID = post_id.target.getAttribute("data-id");
    console.log(postID);

    if (postID) {
      console.log(postID);
      setOpenPreview(true);
      setSelectedPost(postID);
    }
  };
  useEffect(() => {
    if (!openPreview) {
      setSelectedPost(null);
    }
  }, [openPreview]);
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
  // const displayPostResult = async () => {
  //   if (selectedPost) {
  //     const Post = await fetchPost(selectedPost);
  //     console.log(Post);
  //     return Post;
  //   }
  // };
  const { data: userData, isLoading: userLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const PostsData = await fetchMyPosts();

      const updatedPosts = await receivePostPicture(PostsData);
      return updatedPosts;
    },
  });
  const { data: userProfile, isLoading: isUserProfileLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const UserProfile = await fetchMe();
      return UserProfile;
    },
    staleTime: 5000,
  });
  const {
    data: profileFollows,
    isLoading: isFollowsLoading,
    isError: isFollowError,
  } = useQuery({
    queryKey: ["follows"],
    queryFn: async () => {
      const UserProfileFollows = await userProfileFollows(
        userProfile?.profile.profile_id,
      );
      return UserProfileFollows;
    },
  });
  return (
    <Layout>
      {userLoading ? (
        <Loader />
      ) : (
        <div className={`col-[2/-1] row-[1/-1] py-1 pl-1 md:p-4`}>
          <div className="col-[2/3] row-[1/-1] grid grid-cols-userProfileUpperMenu grid-rows-3 items-center ">
            <div className="flex items-center ">
              <picture className=" flex size-20 rounded-full border border-inherit">
                <img
                  onClick={() => setIsOpenModal(true)}
                  className="flex h-full w-full justify-center overflow-hidden rounded-full object-cover"
                  alt=""
                  src={userProfile?.profile_picture}
                />
              </picture>
              {isOpenModal ? (
                <ChooseImg onClose={() => setIsOpenModal(false)} />
              ) : (
                ""
              )}
            </div>
            <h1 className="text-md ml-4 font-bold lg:text-2xl ">
              {userProfile?.username}
            </h1>
            {/* result of request here */}
            {isFollowsLoading ? (
              <LineWave color="blue" />
            ) : (
              <UserInfo
                postsNumber={userData?.length}
                followers={isFollowError ? 0 : userProfile.followers.length}
                following={isFollowError ? 0 : userProfile.followed.length}
              />
            )}
            <UserBio desc={userData?.post_description} />
          </div>
          <div className="sm:col[2/3] col-[1/-1] grid  grid-cols-userProfile ">
            <div
              onClick={(postId) => handlePost(postId)}
              className="col-[1/-1] grid auto-rows-[300px] grid-cols-userProfile sm:col-[1/-1]"
            >
              {userData?.length > 0 ? (
                userData.map((userPost: UpdatedPosts) => (
                  <UserPosts
                    key={userPost.post_id}
                    postDESCRIPTION={userPost.post_description}
                    postIMAGE={userPost.post_photo}
                    postIMAGEID={userPost.post_files["picture_id"]}
                    postID={userPost.post_id}
                    userID={userPost.user_id}
                    profileID={userPost.profile_id}
                    isOpened={isOpenModal}
                    postFILMS={userPost.post_film}
                  />
                ))
              ) : (
                <h1 className="text-md col-[2/3] justify-self-center md:text-xl">
                  No posts were found
                </h1>
              )}
              {openPreview &&
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
      )}
    </Layout>
  );
};

export default MyProfile;
