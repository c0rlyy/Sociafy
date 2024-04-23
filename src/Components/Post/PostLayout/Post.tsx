import PostItem from "./PostItem";
import { useLoaderData } from "react-router";
import fetchPosts, {
  CurrentUserPost,
  CurrentUserPostProps,
} from "../../../pages/Fetch/fetchPosts";
import Reels from "../Reels/Reels";
import React, { useContext, useEffect, useState } from "react";
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
  const posts = useLoaderData() as CurrentUserPostProps[];
  const isEmpty = isEmptyObj(posts);
  const postCtx = useContext(PostContext);
  const [postsData, setPostsData] = useState(posts);
  const [postPhotos, setPostPhotos] = useState([{}]);
  const fetchPostsData = async (file_id: number) => {
    try {
      const response = await fetch(
        `http://localhost:8000/file-retrive/${JSON.parse(file_id)}`,
      );
      if (!response.ok) {
        console.log(
          `FetchPostsData HTTP Request Failed: ${response.status}: ${response.statusText}`,
        );
      }
      const data = response.url;
      if (data) {
        console.log(`FetchPostsData: ${data}`);
        return data;
      }
    } catch (error) {
      console.error(error?.message);
    }
  };

  useEffect(() => {
    const updatePostPhotos = async () => {
      const updatedPosts = await Promise.all(
        postsData.map(async (post) => {
          const updatedPostFiles = await Promise.all(
            post.post_files.map(async (postFile) => {
              return await fetchPostsData(postFile.file_id);
            }),
          );
          const updatedPostPhoto = updatedPostFiles.filter(
            (file) => file !== null,
          )[0];
          return {
            ...post,
            post_photo: updatedPostPhoto || "",
          };
        }),
      );
      setPostsData(updatedPosts);
    };
    updatePostPhotos();
  }, [posts]);

  return (
    <>
      <div
        className={`col-[1/-1] grid grid-cols-mainPageCenterContainer grid-rows-mainPageCentreContainer  p-4 sm:col-[2/3]`}
      >
        <div className="col-[1/2] row-[1/2] hidden gap-4 self-start font-bold md:col-[2/3] md:flex">
          <h1>For you</h1>
          <span>Following</span>
        </div>
        <Reels />
        <div className=" relative col-[1/-1] grid-cols-postColumns grid-rows-PostPageRows md:col-[2/3]">
          {posts.length > 0
            ? postCtx.posts.map((postSamp) => (
                <PostItem
                  postTITLE={postSamp.postTitle}
                  postID={postSamp.id}
                  postDESC={postSamp.postTitle}
                  profileID={postSamp.id}
                  userIMG={postSamp.authorImg}
                  username={postSamp.author}
                  postPhotos={postSamp.postImage}
                />
              ))
            : postsData.map((post) => (
                <PostItem
                  key={post.post_id}
                  postTITLE={post.post_title}
                  postID={post.post_id}
                  postDESC={post.post_title}
                  profileID={post.post_id}
                  userIMG={""}
                  username={""}
                  postPhotos={post.post_photo}
                />
              ))}
        </div>
      </div>
    </>
  );
};
export default Post;
