import React from "react";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
const Buttons: React.FC = () => {
  return (
    <div className="flex row-[3/4] self-center gap-5">
      <AiOutlineLike size={"2rem"} />
      <FaRegComment size={"2rem"} />
      <FiSend size={"2rem"} />
    </div>
  );
};

export default Buttons;
