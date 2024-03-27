// import { useContext, useState } from "react";
import { IoMdHome } from "react-icons/io";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoIosSend } from "react-icons/io";
import { useMediaQuery } from "react-responsive";
import AddPost from "../Features/AddPost";
// import PostContext from "../../store/post-context";
import { Link } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { SlMagnifier } from "react-icons/sl";
import FooterSearchBar from "./FooterSearchBar";
import { useState } from "react";
import { MdOutlineDarkMode } from "react-icons/md";
import { Cookies } from "react-cookie";
import SociafyIcon from "../../assets/3x/Obszar roboczy 1@3x.png";
import SociafyIconSmaller from "../../../public/sociafy_1.svg";

function FooterMenu() {
  // const postCtx = useContext(PostContext);
  const [, setIsLogout] = useState(false);
  const logoutHandler = () => {
    setIsLogout(true);
    const cookies = new Cookies();
    cookies.remove("token");
    localStorage.clear();
  };
  const [openPost, setOpenPost] = useState(false);
  const openPostHandler = () => {
    document.body.style.overflow = "hidden";
    setOpenPost(true);
  };
  const closePostHandler = () => {
    document.body.style.overflow = "unset";
    setOpenPost(false);
  };
  const mdScreen = useMediaQuery({
    query: "(min-width:720px)",
  });
  const lg = useMediaQuery({
    query: "(min-width:1500px)",
  });
  // const noPhotoDiv = (
  //   <div className=" bg-gray-200 hover:bg-gray-400 relative w-full h-full rounded-full">
  //     <div className="content"></div>
  //   </div>
  // );
  const [openedSearch, setOpenedSearch] = useState(false);
  const searchBarHandler = () => {
    setOpenedSearch((prev: boolean) => !prev);
  };

  return (
    <footer
      role="navigation"
      className={`justify-items-start extraSm:justify-items-center grid row-[3/4] col-[1/-1] sm:col-[1] sm:row-[2/3] sm:w-full sm:border-r sm:place-items-center`}
    >
      <picture className=" hidden sm:grid sm:w-1/2  border border-slate-500">
        <img
          className={`${
            !mdScreen ? "hidden" : "block"
          } max-w-full object-cover`}
          src={`${SociafyIcon}`}
          alt=""
        />
        <img
          className={`${mdScreen ? "hidden" : "block"}`}
          src={`${SociafyIconSmaller}`}
          alt=""
        />
      </picture>
      <div className="flex sm:flex-col flex-row sm:gap-4 gap-16 sm:justify-content-center">
        <Link to={"/MainPage"}>
          <IoMdHome size={`${lg ? "3rem" : "2rem"}`} />
        </Link>
        <IoIosAddCircleOutline
          size={`${lg ? "3rem" : "2rem"}`}
          onClick={openPostHandler}
        />
        {openPost && <AddPost onClose={closePostHandler} />}
        <SlMagnifier
          onClick={searchBarHandler}
          size={`${lg ? "3rem" : "2rem"}`}
          className="hidden sm:flex"
        />
        {openedSearch && (
          <FooterSearchBar
            openedSearch={openedSearch}
            searchHandler={searchBarHandler}
          />
        )}
        <IoIosSend size={`${lg ? "3rem" : "2rem"}`} />
        <Link to={"/"}>
          <div>
            <CiLogout
              onClick={logoutHandler}
              size={mdScreen ? "3rem" : "2rem"}
            />
          </div>
        </Link>
        <div className=" sm:block hidden lg:w-17 lg:h-17 w-10 h-10 overflow-hidden rounded-full border border-emerald-500 ">
          <Link to={"/User"}>
            {/* {!localStorage.getItem("userImage") ? noPhotoDiv : ""} */}
            <img
              className="rounded-full border hover:bg-slate-200 max-w-10 object-cover w-full h-full "
              alt=""
            />
          </Link>
        </div>
        <div className="hidden sm:block">
          <MdOutlineDarkMode size={mdScreen ? "3rem" : "2rem"} />
        </div>
      </div>
    </footer>
  );
}
export default FooterMenu;
