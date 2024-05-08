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

import { PostContext } from "../../../store/PostContext";
import { useQuery } from "@tanstack/react-query";
// type fetchUserNameProps = {
//   email: string;
//   user_name: string;
//   id: number;
//   profile: {
//     description: string;
//     profile_id: number;
//     user_id: number;
//   };
// };
// import classes from "./Post.module.css";
// Fetching Posts

const Post: React.FC<CurrentUserPost> = () => {
  const { receivePostPicture } = useContext(PostContext);
  const [buttonsState, setButtonsState] = useState<{
    [key: string]: {
      likeState: boolean;
      commentState: boolean;
      shareState: boolean;
    };
  }>({});

  const likeButtonHandler = (post_id: string) => {
    setButtonsState((prev) => ({ ...prev, [post_id]: !prev[post_id] }));
    console.log(post_id);
  };
  const { data: postsData, isLoading: pictureLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const loaderData = await fetchPosts();

      const updatedPostsData = await receivePostPicture(loaderData);

      return updatedPostsData;
    },
  });
  useEffect(() => {
    console.log(buttonsState);
  }, [buttonsState]);
  const eventButtonHandlerAction = (action, post_id) => {
    switch (action) {
      case "like":
        setButtonsState((prev) => ({
          ...prev, // Saving previous state for other buttons
          [post_id]: {
            ...prev[post_id], // Previous state for posts on specific post_id
            likeState: !prev[post_id]?.likeState, // Toggle like state
          },
        }));
        break;
      case "comment":
        setButtonsState((prev) => ({
          ...prev,
          [post_id]: { ...prev[post_id], commentState: true },
        }));
        break;
      case "share":
        setButtonsState((prev) => ({
          ...prev,
          [post_id]: {
            ...prev[post_id],
            shareState: !prev[post_id]?.shareState,
          },
        }));
        break;
      default:
        break;
    }
  };
  if (pictureLoading) {
    return <div>Loading</div>;
  }
  return (
    <>
      <div
        className={`col-[1/-1] grid grid-rows-mainPageCentreContainer p-4  sm:col-[2/3] sm:grid-cols-mainPageCenterContainer`}
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
            : postsData.map((post) => (
                <PostItem
                  userID={post.user_id}
                  key={post.post_id}
                  postTITLE={post.post_title}
                  postID={post.post_id}
                  postDESC={post.post_title}
                  profileID={post.post_id}
                  userIMG={post.profile_picture}
                  username={post.username}
                  postPhotos={post.post_photo}
                  postFilms={post.post_film?.fileUrl}
                  likeState={buttonsState?.likeState}
                  commentState={buttonsState?.commentState}
                  shareState={buttonsState?.shareState}
                  eventButtonHandler={(action) =>
                    eventButtonHandlerAction(action, post.post_id)
                  }
                />
              ))}
        </div>
      </div>
    </>
  );
};
export default Post;
