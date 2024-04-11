import { IoMdHome } from "react-icons/io";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoIosSend } from "react-icons/io";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { SlMagnifier } from "react-icons/sl";
import FooterSearchBar from "./FooterSearchBar";
import { useContext, useEffect, useState } from "react";
import { MdOutlineDarkMode } from "react-icons/md";
import { Cookies, useCookies } from "react-cookie";
import SociafyIcon from "../../assets/3x/Obszar roboczy 1@3x.png";
import { CiUser } from "react-icons/ci";
import SociafyIconSmaller from "../../../public/sociafy_1.svg";
import { motion, useAnimate } from "framer-motion";
import { useTheme } from "../../store/themeContext";
import AddPost from "../Features/AddPost";
import { UserProps } from "../../pages/Fetch/fetchProfile";
function FooterMenu() {
  const [picture_id, setPictureId] = useState<number | null>(null);
  const [pictureUrl, setPictureUrl] = useState<string | null>("");
  const [openPost, setOpenPost] = useState(false);
  const [, setIsLogout] = useState(false);
  const [userImage, setUserImage] = useState("");
  const [openedSearch, setOpenedSearch] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const fetchUrl = async (pictureID: number | null) => {
    try {
      const response = await fetch(
        `http://localhost:8000/file-retrive/${pictureID}`, // Use template literals here
        {
          method: "GET",
          headers: {
            accept: "*/*",
          },
        },
      );
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error("Error occured: Failed to fetch picture URL");
      }
      if (data) {
        console.log(data);
        setPictureUrl(data);
      } else {
        console.log("Empty response received");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:8000/users/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            accept: "application/json",
          },
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error("Something went wrong");
        } else {
          console.log(typeof data.profile.picture_id);
        }
        if (data) {
          setPictureId(data.profile.picture_id);
          await fetchUrl(picture_id);
          return data;
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfile();
  }, [picture_id]);

  const logoutHandler = () => {
    setIsLogout(true);
    localStorage.clear();
  };
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
  const searchBarHandler = () => {
    setOpenedSearch((prev) => !prev);
    console.log(openedSearch);
  };

  return (
    <>
      {openedSearch && (
        <FooterSearchBar
          setOpenedSearchFuncProp={searchBarHandler}
          isOpened={openedSearch}
        />
      )}
      <motion.footer
        role="navigation"
        className={` top-0 col-[1/-1] row-[-1] grid h-[100vh] justify-items-start bg-inherit extraSm:justify-items-center sm:sticky sm:col-[1] sm:row-[1/-1] sm:w-full sm:place-items-center sm:border-r`}
      >
        <picture className=" hidden sm:grid sm:w-1/2">
          <img
            className={`${
              !mdScreen ? "hidden" : "block"
            } max-w-full object-cover`}
            srcSet={`${SociafyIcon}`}
            src={`${SociafyIcon}`}
            alt=""
          />
          <img
            className={`${mdScreen ? "hidden" : "block"}`}
            src={`${SociafyIconSmaller}`}
            alt=""
          />
        </picture>
        <div className="sm:justify-content-center flex flex-row gap-16 sm:flex-col sm:gap-4">
          <Link to={"/MainPage"}>
            <IoMdHome size={`${lg ? "3rem" : "2rem"}`} />
          </Link>
          <IoIosAddCircleOutline
            size={`${lg ? "3rem" : "2rem"}`}
            onClick={openPostHandler}
          />
          {openPost && <AddPost onClose={closePostHandler} />}
          <SlMagnifier
            onClick={() => setOpenedSearch(true)}
            size={`${lg ? "3rem" : "2rem"}`}
            className="hidden sm:flex"
          />
          <IoIosSend size={`${lg ? "3rem" : "2rem"}`} />
          <Link to={"/"}>
            <div>
              <CiLogout
                onClick={logoutHandler}
                size={mdScreen ? "3rem" : "2rem"}
              />
            </div>
          </Link>
          <motion.div
            whileTap={{ scale: 1.05 }}
            className=" hidden h-10 w-10 rounded-full border border-inherit  sm:block lg:h-14 lg:w-14"
          >
            <Link to={"/User"}>
              {pictureUrl === null ? (
                <CiUser size={"3rem"} />
              ) : (
                <motion.img
                  whileHover={{ scale: 1.2 }}
                  className="h-full w-full rounded-full border border-inherit bg-inherit object-cover "
                  src={pictureUrl}
                  alt=""
                />
              )}
            </Link>
          </motion.div>
          <div className="hidden sm:block">
            <MdOutlineDarkMode
              size={mdScreen ? "3rem" : "2rem"}
              onClick={toggleTheme}
            />
          </div>
        </div>
      </motion.footer>
    </>
  );
}
export default FooterMenu;
