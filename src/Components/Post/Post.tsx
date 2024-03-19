import PostItem from "./PostItem";
import { useLoaderData } from "react-router";
import {
  CurrentUserPost,
  CurrentUserPostProps,
} from "../../pages/Fetch/fetchPosts";
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
      <div className="grid grid-cols-postColumns lg:m-0 lg:m-auto lg:w-full">
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
    </>
  );
};
export default Post;
