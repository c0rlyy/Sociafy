import { useQuery } from "@tanstack/react-query";
import React from "react";
import PreviewModal from "../../../Components/Modals/PreviewModal/PreviewModal";
import PostPreviewModal from "../../../Components/Modals/PreviewModal/PreviewModal";
import PostModal from "../../../Components/Post/PostModal/PostModal";
import { useProfile } from "../../../store/UserProfile-context";
import { UserProfilePostProps } from "../UserPosts";
type Props = {};

const PostPreview: React.FC<UserProfilePostProps> = ({
  postDESCRIPTION,
  postIMAGE,
  postIMAGEID,
  profileID,
  postID,
}) => {
  return (
    <PreviewModal>
      <picture
        data-postid={postID}
        className="size-20 overflow-hidden rounded-full border border-slate-500"
      >
        <img className="h-full w-full object-cover" src={postIMAGE} alt="" />
      </picture>
      <main>
        <div className="flex place-items-center">
          <picture>
            <img src={""} alt="" />
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
    </PreviewModal>
  );
};
export default PostPreview;
