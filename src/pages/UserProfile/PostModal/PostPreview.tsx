import { useQuery } from "@tanstack/react-query";
import React from "react";
import PreviewModal from "../../../Components/Modals/PreviewModal/PreviewModal";
import PostPreviewModal from "../../../Components/Modals/PreviewModal/PreviewModal.module.css";
import Buttons from "../../../Components/Post/Buttons/Buttons";
import Post from "../../../Components/Post/PostLayout/Post";
import PostModal from "../../../Components/Post/PostModal/PostModal";
import { useProfile } from "../../../store/UserProfile-context";
import { UserProfilePostProps } from "../UserPosts";
type Props = {};

const PostPreview: React.FC<UserProfilePostProps> = ({
  postDESCRIPTION,
  postIMAGE,
  profileIMAGE,
  profileUSERNAME,
  profileID,
  postID,
  profileFILM,
  postTITLE,
  userID,
}) => {
  return (
    <PreviewModal>
      <picture className={PostPreviewModal.postPicture}>
        {profileIMAGE && (
          <img
            className={PostPreviewModal.postImage}
            src={profileIMAGE}
            alt=""
          />
        )}
      </picture>
      <aside className={PostPreviewModal.previewPostInfo}>
        <div className={PostPreviewModal.userPictureContainer}>
          <picture className={PostPreviewModal.userPicture}>
            <img className={PostPreviewModal.userImg} src={postIMAGE} alt="" />
          </picture>
          <span className={PostPreviewModal.username}>{profileUSERNAME}</span>
        </div>
        <div className={PostPreviewModal.postTitle}>
          <picture className={PostPreviewModal.userPicture}>
            <img
              className={PostPreviewModal.userImg}
              src={profileIMAGE}
              alt=""
            />
          </picture>
          <span className={PostPreviewModal.username}>{profileUSERNAME}</span>
          <p>{postTITLE}</p>
        </div>
        <div className={PostPreviewModal.likes}>
          <p>Likes: 10000;</p>
        </div>
        <div className={PostPreviewModal.buttons}>
          <Buttons />
        </div>
        <div className={PostPreviewModal.userPictureContainer}>
          <picture className={PostPreviewModal.userPicture}>
            <img
              className={PostPreviewModal.userImg}
              src={profileIMAGE}
              alt=""
            />
          </picture>
          <span className={PostPreviewModal.username}>Danielson</span>
        </div>
      </aside>
    </PreviewModal>
  );
};
export default PostPreview;
