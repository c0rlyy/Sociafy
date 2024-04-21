import React from "react";
import PostModal from "../../../Components/Post/PostModal/PostModal";
import { UserProfilePostProps } from "../UserPosts";
type Props = {};

const PostPreview: React.FC<UserProfilePostProps> = ({
  postDESCRIPTION,
  postIMAGE,
  postIMAGEID,
  profileID,
}) => {
  return (
    <PostModal>
      <picture className="h-full w-full">
        <img className="h-full w-full object-cover" src={""} alt="" />
      </picture>
      <main>
        <div className="flex place-items-center">
          <picture>
            <img src={postIMAGE} alt="" />
          </picture>
          <h1>Rovgarth</h1>
        </div>
        <aside>
          <h1>Comments</h1>
        </aside>
        <aside>
          <h1>Likes</h1>
        </aside>
      </main>
    </PostModal>
  );
};
export default PostPreview;
