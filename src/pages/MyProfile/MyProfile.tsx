import { useQueries, useQuery } from "@tanstack/react-query";
import React, { SyntheticEvent, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import { UpdatedPosts } from "../../store/PostContext";
import { useProfile } from "../../store/UserProfile-context";
import Loader from "../Loader/Loader";
import ChooseImg from "../UserProfile/ChooseImg";
import PostPreview from "../UserProfile/PostModal/PostPreview";
import UserBio from "../UserProfile/UserBio/UserBio";
import UserInfo from "../UserProfile/UserInfo/UserInfo";
import UserPosts from "../UserProfile/UserPosts";
const MyProfile = (props: Props) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModalHandler = () => {
    setIsOpenModal(true);
    console.log(isOpenModal);
  };
  const { fetchPost } = useProfile();
  const handleOpenPost = async (e: MouseEvent) => {
    const target = e.target.parentElement.getAttribute("data-id");
    if (target) {
      console.log(target);
      setIsOpenModal(true);
      const PostResult = await fetchPost(target);
      return PostResult;
    }
  };
  const { fetchMe, fetchMyPosts, getUserProfilePicUrl, receivePostPicture } =
    useProfile();
  const { data: userData, isLoading: userLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const PostsData = await fetchMyPosts();

      const updatedPosts = await receivePostPicture(PostsData);

      return updatedPosts;
    },
  });
  const { data: previewPost, isLoading: isPictureLoading } = useQuery({
    queryKey: ["previewPost"],
    queryFn: async (e) => {
      const post = await handleOpenPost(e);
      return post;
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

  return (
    <Layout>
      {userLoading ? (
        <Loader />
      ) : (
        <div className={`col-[2/-1] row-[1] p-4`}>
          <div className="col-[2/3] row-[1/-1] grid grid-cols-userProfileUpperMenu grid-rows-3 items-center ">
            <div className="flex items-center ">
              <div className=" flex size-20 rounded-full border border-inherit">
                <img
                  onClick={() => setIsOpenModal(true)}
                  className="flex h-full w-full justify-center overflow-hidden rounded-full object-cover"
                  alt=""
                  src={userProfile?.profile_picture}
                />
              </div>
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
            <UserInfo postsNumber={0} followers={0} following={0} />
            <UserBio desc={userData?.post_description} />
          </div>
          <div className="col-[2/3] grid auto-rows-userProfileRows grid-cols-userProfile ">
            <div
              onClick={handleOpenPost}
              className="col-[1/-1] row-span-2 grid grid-cols-subgrid grid-rows-subgrid py-3"
            >
              {userData?.length > 0 ? (
                userData.map((userPost: UpdatedPosts, index) => (
                  <UserPosts
                    key={index}
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
              {isOpenModal ? (
                <PostPreview
                  postIMAGEID={0}
                  postID={0}
                  userID={0}
                  profileID={0}
                  postDESCRIPTION={""}
                  postIMAGE={previewPost?.post_picture}
                  isOpened={false}
                  postFILMS={""}
                />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default MyProfile;
