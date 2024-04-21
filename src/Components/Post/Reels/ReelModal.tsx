import React, { ReactNode, useContext } from "react";
import ReactDOM from "react-dom";
import { IoMdCloseCircle } from "react-icons/io";
import PostContext from "../../../store/post-context";
import Reel from "./ReelModal.module.css";
type Props = {};
type ReelModalProps = {
  userImage: string;
  reelImage: string;
  onClose: () => void;
  userName: string;
  uploadDate: string;
};
type BackdropProps = Pick<ReelModalProps, "onClose">;
const overlays = document.getElementById("overlays") as HTMLElement;
function Backdrop({ onClose }: BackdropProps) {
  return (
    <div className={Reel.reelBackdrop}>
      <IoMdCloseCircle
        size={"3rem"}
        fill={"white"}
        onClick={onClose}
        className="absolute right-0 top-0 "
      />
    </div>
  );
}

function Overlay({
  userImage,
  reelImage,
  userName,
  uploadDate,
}: ReelModalProps) {
  const postCtx = useContext(PostContext);
  return (
    <div className={Reel.reelModal}>
      <main className={Reel.reelContent}>
        <div className="flex items-center justify-around text-white">
          <div className="flex items-center gap-2">
            <picture className={Reel.reelUser}>
              {/* <img src={userImage} alt="" /> */}
              <img
                className={Reel.reelUserImage}
                src={postCtx.posts[0].authorImg}
                alt=""
              />
            </picture>
            <span className="font-normal">DemonOfTheFall</span>
          </div>
          <div>
            <span className="font-thin italic">1 hour ago</span>
          </div>
        </div>

        <article className={Reel.reel}>
          {/* <img src={reelImage} alt="" /> */}
          <img
            className={Reel.reelImage}
            src={postCtx.posts[2].postImage}
            alt=""
          />
        </article>
        <form className={Reel.reelForm} action="">
          <input
            className=" h-full w-1/2 rounded-md border border-slate-500 bg-transparent text-sm text-white outline-none"
            type="text"
            name=""
            id=""
            placeholder={`Send message to ${userName}`}
          />
          <button className="h-full w-1/4 rounded-sm bg-[#009fe3] text-white">
            Send
          </button>
        </form>
      </main>
    </div>
  );
}
function ReelModal({
  userImage,
  reelImage,
  userName,
  uploadDate,
  onClose,
}: ReelModalProps) {
  return (
    <div>
      {ReactDOM.createPortal(<Backdrop onClose={onClose} />, overlays)}
      {ReactDOM.createPortal(
        <Overlay
          userImage={userImage}
          reelImage={reelImage}
          userName={userName}
          uploadDate={uploadDate}
        />,
        overlays,
      )}
    </div>
  );
}

export default ReelModal;
