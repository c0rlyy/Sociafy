import { FaGithub } from "react-icons/fa";
import { useEffect, useState } from "react";
import "./TypeAnimation.css";
import SociafyLogo from "../../../public/sociafy_1.svg";
import { Link } from "react-router-dom";
type typeAnimationProp = {
  mdScreen: boolean;
};
function TypeAnimation({ mdScreen }: typeAnimationProp) {
  return (
    <div
      className={`${
        mdScreen
          ? "col-start-2 col-end-3 items-center flex flex-col gap-5"
          : "hidden"
      } `}
    >
      <img className="logo-anim" src={`${SociafyLogo}`} alt="" />
      <h1 className="anim-type anim-text">c0rly and rovgart presents </h1>
      <div className="flex items-center gap-5 anim-github rounded-xl  text-white px-2 py-3 relative">
        <Link to={"https://github.com/c0rly"} className=" github-item  ">
          <FaGithub size={mdScreen ? "3rem" : "5rem"} />
          <h1 className="text-postCont">c0rly</h1>
        </Link>
        <Link to={"https://github.com/rovgart"} className="github-item   ">
          <FaGithub size={mdScreen ? "3rem" : "5rem"} />
          <h1 className="text-postCont">rovgart</h1>
        </Link>
      </div>
    </div>
  );
}
export default TypeAnimation;
