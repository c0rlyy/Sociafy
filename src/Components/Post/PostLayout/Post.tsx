import PostItem from "./PostItem";
import { useLoaderData } from "react-router";
import fetchPosts, {
  CurrentUserPost,
  CurrentUserPostProps,
} from "../../../pages/Fetch/fetchPosts";
import Reels from "../Reels/Reels";
import React, {
  ButtonHTMLAttributes,
  useContext,
  useEffect,
  useState,
} from "react";
import { PostContext, UpdatedPosts, usePost } from "../../../store/PostContext";
import { useQuery } from "@tanstack/react-query";
import PostPreview from "../../../pages/UserProfile/PostModal/PostPreview";
import { UpdatedPost, useProfile } from "../../../store/UserProfile-context";
const Post: React.FC<CurrentUserPost> = () => {
  const {
    receivePostPicture,
    likePost,
    openPreview,
    setOpenPreview,
    fetchPost,
    readPostComments,
  } = useContext(PostContext);
  const [buttonsState, setButtonsState] = useState<{
    [key: string]: {
      likeState: boolean;
      commentState: boolean;
      shareState: boolean;
    };
  }>({});
  const { fetchMe } = useProfile();
  const [selectedPost, setSelectedPost] = useState();
  const { data: postsData, isLoading: pictureLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const loaderData = await fetchPosts();

      const updatedPostsData: UpdatedPosts[] =
        await receivePostPicture(loaderData);

      return updatedPostsData;
    },
  });
  const { data: UserProfile, isLoading: isUserProfileLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const UserProf = await fetchMe();
      return UserProf;
    },
  });
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
  useEffect(() => {
    console.log(buttonsState);
  }, [buttonsState]);
  // HandlePostForPreview
  const handlePost = (post_id: MouseEvent<HTMLDivElement>) => {
    const Comment = post_id.target.getAttribute("data-postid");
    if (Comment) {
      console.log(Comment);
      console.log(selectedPost);
      setSelectedPost(Comment);
      setOpenPreview(true);
    }
  };
  const { eventButtonHandlerAction } = usePost();

  useEffect(() => {
    if (!openPreview) {
      setSelectedPost(null);
    }
  }, [openPreview]);

  if (pictureLoading) {
    return <div>Loading</div>;
  }
  return (
    <>
      <div
        onClick={(post_id) => handlePost(post_id)}
        className={`col-[1/-1] grid grid-rows-mainPageCentreContainer  sm:col-[2/3] sm:grid-cols-mainPageCenterContainer sm:p-4`}
      >
        <div className="col-[1/2] row-[1/2] hidden gap-4 place-self-start font-bold md:col-[2/3] md:flex">
          <h1>For you</h1>
          <span>Following</span>
        </div>
        <Reels />
        <div className=" relative col-[1/-1] grid-cols-postColumns grid-rows-PostPageRows md:col-[2/3]">
          {postsData === 0
            ? postsData.map((postSamp, index) => (
                <PostItem
                  key={index}
                  postTITLE={postSamp.post_title}
                  postID={postSamp.post_id}
                  postDESC={postSamp.post_description}
                  profileID={postSamp.profile_id}
                  userIMG={""}
                  username={postSamp.username}
                  postPhotos={postSamp.profile_id}
                  postFilms={postSamp.post_film}
                  eventButtonHandler={(action) =>
                    eventButtonHandlerAction(action, postSamp.id)
                  }
                />
              ))
            : postsData?.map((post: UpdatedPosts) => (
                <PostItem
                  userID={post?.user_id}
                  key={post?.post_id}
                  postTITLE={post?.post_title}
                  postID={post?.post_id}
                  postDESC={post?.post_title}
                  profileID={post?.post_id}
                  userIMG={post?.profile_picture}
                  username={post?.username}
                  postPhotos={post?.post_photo}
                  postFilms={post?.post_film?.fileUrl}
                  postLikes={post?.likes?.post_likes_count}
                  eventButtonHandler={(action) =>
                    eventButtonHandlerAction(action, post.post_id)
                  }
                  profilePicture={UserProfile?.profile_picture}
                />
              ))}
          {previewPost?.map((post) => (
            <PostPreview
              key={selectedPost}
              postIMAGEID={0}
              postID={selectedPost}
              userID={post?.User_ID}
              profileID={post?.Profile_ID}
              postDESCRIPTION={post?.Post_Description}
              postIMAGE={post?.Post_Photo}
              isOpened={openPreview}
              postFILMS={post?.Post_Film}
              profileIMAGE={post?.Post_Photo}
              postTITLE={post?.Post_Title}
              profileUSERNAME={post.Username}
              likeStatePreview={buttonsState.likeState}
              shareStatePreview={buttonsState.shareState}
              commentStatePreview={buttonsState.commentState}
              profileFILM={post?.Post_Film}
              postLikes={post?.post_likes}
              postComments={post?.PostComments}
              eventButtonHandler={(post, action) =>
                eventButtonHandlerAction(post.Post_ID, action)
              }
            />
          ))}
        </div>
      </div>
    </>
  );
};
export default Post;
