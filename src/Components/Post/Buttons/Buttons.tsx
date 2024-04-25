import React, { ChangeEvent, ReactEventHandler, useState } from "react";
import { AiOutlineHeart, AiOutlineLike } from "react-icons/ai";
import { FaHeart, FaRegComment } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
export type ButtonsEventNamesAndFuncs = {
  like: "like";
  comment: "comment";
  share: "share";
  eventButtonClick: (action: string, post_id: number) => void;
  postId: number;
  likeStateProp: boolean;
  commentStateProp: boolean;
  shareStateProp: boolean;
};
const Buttons: React.FC<ButtonsEventNamesAndFuncs> = ({
  like,
  comment,
  share,
  postId,
  eventButtonClick,
  likeStateProp,
  commentStateProps,
  shareStateProp,
}) => {
  //
  const handleButtonClick = (action: string) => {
    // Callback Prop function
    eventButtonClick(postId, action);
    console.log(`postId: ${postId} action:${action}`);
    console.log(action);
  };
  return (
    // Event delegation on parent div element
    <div
      onClick={(e) => {
        // Getting name attrib from buttons
        const buttonName = e.target.getAttribute("name");
        if (buttonName) {
          handleButtonClick(buttonName);
        }
      }}
      className="row-[3/4] flex gap-5 self-center"
    >
      <AiOutlineHeart
        name={(like = "like")}
        size={"2rem"}
        fill={`${likeStateProp ? "red" : "white"}`}
      />
      <FaRegComment name={(comment = "comment")} size={"2rem"} />
      {commentStateProps
        ? {
            /*Here Logic for comment Section*/
          }
        : ""}
      <FiSend name={(share = "share")} size={"2rem"} />
      {shareStateProp
        ? console.log("Opening Share")
        : console.log("Closed Share")}
    </div>
  );
};

export default Buttons;
