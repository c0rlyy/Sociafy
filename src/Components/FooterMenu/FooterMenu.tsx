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
      className={` grid col-start-1 col-end-2 row-start-1 row-end-1 bg-white border-r place-items-center grid-rows-footer`}
    >
      <picture className="w-1/2 justify-self-center m-0 m-auto">
        <img src={`${SociafyIcon}`} alt="" />
      </picture>
      <div className="flex flex-col gap-3">
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
        <div className="lg:w-17 lg:h-17 md:w-10 md:h-10 overflow-hidden rounded-full border border-emerald-500 ">
          <Link to={"/User"}>
            {/* {!localStorage.getItem("userImage") ? noPhotoDiv : ""} */}
            <img
              className="rounded-full border hover:bg-slate-200 max-w-10 object-cover w-full h-full "
              alt=""
            />
          </Link>
        </div>
      </div>
      <div>
        <MdOutlineDarkMode size={"3rem"} />
      </div>
    </footer>
  );
}
export default FooterMenu;
