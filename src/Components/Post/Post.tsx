import PostItem from "./PostItem";
import { useLoaderData } from "react-router";
import {
  CurrentUserPost,
  CurrentUserPostProps,
} from "../../pages/Fetch/fetchPosts";
import Reels from "./Reels/Reels";
import HeaderNavigation from "../FooterMenu/HeaderNavigation/HeaderNavigation";
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
      <div className=" grid col-[2/3] row-[2/3] grid-rows-mainPageCentreContainer grid-cols-mainPageCenterContainer p-4 overflow-hidden">
        <div className="md:flex md:col-[2/3] col-[1/3] hidden row-[1/2] gap-4 font-bold self-start">
          <h1>For you</h1>
          <span>Following</span>
        </div>
        <Reels />
        <div className="col-[2/3] grid-cols-postColumns grid-rows-postPageRows">
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
