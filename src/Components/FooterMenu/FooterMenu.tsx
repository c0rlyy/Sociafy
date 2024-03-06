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
function FooterMenu() {
  // const postCtx = useContext(PostContext);
  const [, setIsLogout] = useState(false);
  const logoutHandler = () => {
    setIsLogout(true);
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
  const noPhotoDiv = (
    <div className=" bg-gray-200 hover:bg-gray-400 relative w-full h-full rounded-full">
      <div className="content"></div>
    </div>
  );
  const [openedSearch, setOpenedSearch] = useState(false);
  const searchBarHandler = () => {
    setOpenedSearch((prev: boolean) => !prev);
  };

  return (
    <footer
      role="navigation"
      className={`order-1 bottom-0 sticky   bg-white w-screen border border-r flex sm:h-screen  sm:sticky sm:top-0 sm:max-w-[5vw] sm:flex sm:flex-col p-2 items-center justify-center  gap-5`}
    >
      <IoMdHome size={`${lg ? "3rem" : "3rem"}`} />
      <IoIosAddCircleOutline
        size={`${lg ? "3rem" : "3rem"}`}
        onClick={openPostHandler}
      />

      {openPost && <AddPost onClose={closePostHandler} />}
      <SlMagnifier
        onClick={searchBarHandler}
        size={`${lg ? "3rem" : "3rem"}`}
      />
      {openedSearch && (
        <FooterSearchBar
          openedSearch={openedSearch}
          searchHandler={searchBarHandler}
        />
      )}
      <IoIosSend size={`${lg ? "3rem" : "3rem"}`} />
      <Link to={"/"}>
        <div>
          <CiLogout onClick={logoutHandler} size={mdScreen ? "3rem" : "2rem"} />
        </div>
      </Link>
      <div className="sm:w-1/12  lg:w-full h-12 ">
        <Link to={"/User"}>
          {!localStorage.getItem("userImage") ? noPhotoDiv : ""}
          <img
            className="rounded-full  border hover:bg-slate-200"
            src={localStorage.getItem("userImage") ?? ""}
            alt=""
          />
        </Link>
      </div>
    </footer>
  );
}
export default FooterMenu;
