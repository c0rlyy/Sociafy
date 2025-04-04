import React, { ReactNode } from "react";
import ReactDOM from "react-dom";
import addPost from "../PostModal/PostModal.module.css";
import ReelModal from "../Reels/ReelModal";
ReelModal;
type Props = {
  children: ReactNode;
};
const overlays = document.getElementById("overlays") as HTMLElement;
const PostOverlay: React.FC<Props> = ({ children }) => {
  return (
    <div className={addPost.postModal}>
      <div className={addPost.postContent}>{children}</div>
    </div>
  );
};
const PostModal: React.FC<Props> = ({ children }) => {
  return (
    <div>
      {/* {ReactDOM.createPortal(<Backdrop />, overlays)} */}
      {ReactDOM.createPortal(<PostOverlay>{children}</PostOverlay>, overlays)}
    </div>
  );
};

export default PostModal;
