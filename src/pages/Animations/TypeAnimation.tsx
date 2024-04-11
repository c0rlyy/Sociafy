import { FaGithub } from "react-icons/fa";
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
          ? "col-start-2 col-end-3 flex flex-col items-center gap-5"
          : "hidden"
      } `}
    >
      <img className="logo-anim" src={`${SociafyLogo}`} alt="" />
      <h1 className="anim-type anim-text">c0rly and rovgart presents </h1>
      <div className="anim-github relative flex items-center gap-5  rounded-xl px-2 py-3 text-white">
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
