import PostItem from "./PostItem";
import { useLoaderData } from "react-router";
import {
  CurrentUserPost,
  CurrentUserPostProps,
} from "../../pages/Fetch/fetchPosts";
import Reels from "./Reels/Reels";
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
  const posts = useLoaderData() as CurrentUserPostProps[];
  return (
    <>
      <div className=" mt-10 grid col-start-2 col-end-2 grid-rows-mainPageCenterContainer grid-cols-mainPageCenterContainer  ">
        <div className="flex col-start-2 col-end-3 gap-4 font-bold">
          <h1>Dla Ciebie</h1>
          <span>Obserwowani</span>
        </div>
        <Reels />
        <div className="col-start-2 col-end-3 grid-cols-postColumns grid-rows-postPageRows">
          {posts.map((postItem) => (
            <PostItem
              key={postItem.post_id}
              postTITLE={postItem.post_title}
              postID={postItem.post_id}
              postDESC={postItem.post_description}
              profileID={postItem.profile_id}
              userID={postItem.user_id}
              postType={"default"} // Colorfull | Default
            ></PostItem>
          ))}
        </div>
      </div>
    </>
  );
};
export default Post;
