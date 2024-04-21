import React, { useContext, useState } from "react";
import usePreventScroll from "../../../Hooks/usePreventScroll";
import useLockedBody from "../../../Hooks/usePreventScroll";
import PostContext from "../../../store/post-context";
import ReelItem from "./ReelItem";
import ReelModal from "./ReelModal";
const Reels = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [clickedReel, setClickedReel] = useState<number | null>(null);
  const pCtx = useContext(PostContext);
  usePreventScroll(openModal);
  const reelHandler = (e) => {
    const reelID = e.target.getAttribute("data-reelid");
    console.log(`Clicked element:${e.target} ${reelID}`); // Output: The value of data-reelid attribute  };
    if (reelID) {
      setClickedReel(reelID);
      setOpenModal(true);
    }
  };
  const closeModal = () => {
    setOpenModal(false);
    setClickedReel(null);
    document.body.style.overflow = "unset";
  };
  return (
    <div
      onClick={reelHandler}
      className=" col-[1/-1] flex gap-1 self-start md:col-[2/3] md:row-[2/3]"
    >
      {pCtx &&
        pCtx.posts.map((post, index) => (
          <ReelItem
            key={index}
            reelUserPhoto={post.authorImg}
            reelUser={post.author}
            reelID={"3"}
          />
        ))}
      {openModal && <ReelModal reelImage="" onClose={closeModal} />}
    </div>
  );
};

export default Reels;
