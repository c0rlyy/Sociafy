import PostItem from "./PostItem";
import { useLoaderData } from "react-router";
import {
  CurrentUserPost,
  CurrentUserPostProps,
} from "../../../pages/Fetch/fetchPosts";
import Reels from "../Reels/Reels";
import React, { useContext } from "react";
import PostContext from "../../../store/post-context";
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
const isEmptyObj = (obj: {}) => {
  return Object.keys(obj).length === 0;
};
const Post: React.FC<CurrentUserPost> = () => {
  const posts = useLoaderData() as CurrentUserPostProps;
  const isEmpty = isEmptyObj(posts);
  console.log(posts);
  const postCtx = useContext(PostContext);
  return (
    <>
      <div
        className={`col-[1/2] row-[2/3] grid grid-cols-mainPageCenterContainer grid-rows-mainPageCentreContainer bg-inherit p-4 sm:col-[2/3]`}
      >
        <div className="col-[2/3] row-[1/2] hidden gap-4 self-start font-bold md:col-[2/3] md:flex">
          <h1>For you</h1>
          <span>Following</span>
        </div>
        <Reels />
        <div className="grid-rows-postPageRows relative col-[1/-1] grid-cols-postColumns md:col-[2/3]">
          {isEmpty ? (
            postCtx.posts.map((post) => (
              <PostItem
                key={post.id}
                postDESC={post.postContent}
                postID={post.id}
                postTITLE={post.postTitle}
                profileID={post.id}
                userIMG={post.authorImg}
                username={post.author}
                postImage={post.postImage}
              />
            ))
          ) : (
            <PostItem
              key={posts.post_id}
              postDESC={posts.post_description}
              postID={posts.post_id}
              postTITLE={posts.post_title}
              profileID={posts.profile_id}
              userIMG={""}
              username={""}
              postImage={""}
            ></PostItem>
          )}
        </div>
      </div>
    </>
  );
};
export default Post;
