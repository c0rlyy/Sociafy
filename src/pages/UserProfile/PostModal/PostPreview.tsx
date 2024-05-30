import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import PreviewModal from "../../../Components/Modals/PreviewModal/PreviewModal";
import PostPreviewModal from "../../../Components/Modals/PreviewModal/PreviewModal.module.css";
import Buttons from "../../../Components/Post/Buttons/Buttons";
import Comments from "../../../Components/Post/Comments/Comments";
import CreateComment from "../../../Components/Post/Comments/CreateComment/CreateComment";
import Post from "../../../Components/Post/PostLayout/Post";
import PostModal from "../../../Components/Post/PostModal/PostModal";
import { usePost } from "../../../store/PostContext";
import { useProfile } from "../../../store/UserProfile-context";
import { UserProfilePostProps } from "../UserPosts";
import usePreventScroll from "../../../Hooks/usePreventScroll";
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
  postLikes,
  postComments,
  eventButtonHandler,
  likeStatePreview,
  shareStatePreview,
  commentStatePreview,
  isOpened,
}) => {
  const { buttonsState } = usePost();
  usePreventScroll(isOpened);
  return (
    <PreviewModal>
      <picture className={PostPreviewModal.postPicture}>
        {postIMAGE && (
          <img className={PostPreviewModal.postImage} src={postIMAGE} alt="" />
        )}
        {profileFILM && (
          <video
            className={PostPreviewModal.postFilm}
            controls
            src={profileFILM}
            autoPlay
          ></video>
        )}
      </picture>
      <div className={PostPreviewModal.userPictureContainer}>
        <picture className={PostPreviewModal.userPicture}>
          <img className={PostPreviewModal.userImg} src={profileIMAGE} alt="" />
        </picture>
        <span className={PostPreviewModal.username}>{profileUSERNAME}</span>
      </div>
      <aside className={PostPreviewModal.previewPostInfo}>
        <div className={PostPreviewModal.previewPostDescription}>
          {/* Profile Pic And Desc Here */}
          <picture className="size-10 overflow-hidden rounded-full">
            <img
              className="h-full w-full object-cover"
              src={profileIMAGE}
              alt=""
            />
          </picture>
          <h2>{postTITLE}</h2>
        </div>
        <div className={PostPreviewModal.buttons}>
          <Buttons
            like={"like"}
            comment={"comment"}
            share={"share"}
            eventButtonClick={(post_id, action) =>
              eventButtonHandler(postID, action)
            }
            postId={postID}
            likeStateProp={likeStatePreview}
            commentStateProp={commentStatePreview}
            shareStateProp={shareStatePreview}
            postComments={postComments}
          />
        </div>
        <div className={PostPreviewModal.likes}>
          <span>Likes:{postLikes}</span>
        </div>
        {buttonsState?.[postID]?.isCreateCommentOpened && (
          <CreateComment userProfileImage={profileIMAGE} postID={postID} />
        )}
        <Comments post_comments={postComments} />
      </aside>
    </PreviewModal>
  );
};
export default PostPreview;
