import React from "react";
import PostModal from "../../Post/PostModal/PostModal";
import { GrStatusGood } from "react-icons/gr";
type Props = {};

const PostSuccess: React.FC<Props> = ({ children }) => {
  return (
    <PostModal>
      <div className="flex items-center justify-items-center">
        <GrStatusGood />
      </div>
    </PostModal>
  );
};

export default PostSuccess;
