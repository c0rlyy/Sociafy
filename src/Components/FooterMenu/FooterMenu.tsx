import { IoMdHome } from "react-icons/io";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoIosSend } from "react-icons/io";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { SlMagnifier } from "react-icons/sl";
import FooterSearchBar from "./FooterSearchBar";
import { useEffect, useState } from "react";
import { MdOutlineDarkMode } from "react-icons/md";

import { CiUser } from "react-icons/ci";
import SociafyIconSmaller from "../../../public/sociafy_1.svg";
import { motion, useAnimate } from "framer-motion";
import { useTheme } from "../../store/themeContext";
import AddPost from "../Features/AddPost";
import useFetchUrl from "../../Hooks/useFetchUrl";
import { useAuth } from "../../store/AuthContext";
function FooterMenu({ openedSearch, openedSearchHandler }) {
  const [picture_id, setPictureId] = useState<number | null>(null);

  const [openPost, setOpenPost] = useState(false);
  const [, setIsLogout] = useState(false);
  const { theme, toggleTheme } = useTheme();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/users/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        if (!response.ok) {
          throw new Error(
            `fetchProfile: ${response.status}: ${response.statusText}`,
          );
        }
        const data = await response.json();
        if (data && data.profile && data.profile.picture_id !== null) {
          // console.log(typeof data.profile.picture_id);
          // console.log(data.profile.picture_id);
          setPictureId(data.profile.picture_id);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfile();
  }, []);
  const { pictureUrl } = useFetchUrl(picture_id);
  const { logoutHandler } = useAuth();
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
  const smScreen = useMediaQuery({
    query: "(min-width:640px)",
  });
  return (
    <>
      <motion.footer
        role="navigation"
        className={`fixed bottom-0 z-50 flex w-full place-items-center bg-inherit pl-3 text-center sm:sticky sm:top-0 sm:col-[1] sm:row-[1/-1] sm:h-[100vh] sm:flex-col sm:place-items-center  sm:justify-evenly sm:border-r-[.1px] md:place-items-start`}
      >
        <picture className={`sm:grid sm:w-1/2`}>
          <svg
            className={`${!mdScreen ? "hidden" : "block"}`}
            id="Warstwa_2"
            data-name="Warstwa 2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 149.66 46.48"
          >
            <g id="Warstwa_1-2" data-name="Warstwa 1">
              <circle
                cx="23.24"
                cy="23.24"
                r="23.24"
                fill="#009fe3"
                strokeWidth="0"
              />
              <path
                d="m45.19,26.11c-1.27,11.55-12.8,10.47-21.43,10.51-6.55-.2-13.77.64-20.13-.64-1.4-.39-2.24-.93-2.34-1.5-.17-1.04,1.87-1.67,2.58-1.86,10.67-2.08,22.8.89,32.75-1.61,4.92-1.81,6.04-8.75-.51-9.39-6.33-1.36-29.43,4.12-25.1-9.79,3.05-8.2,12.26-7.73,19-7.84,3.48.1,9.81-.13,11.89,1.99.49.86-1.29,1.75-4.08,2.17-6.1,1.54-17.7-2.02-21.59,4.79-.44,2.69,2.75,3.57,4.75,3.9,7.18,1.41,23.45-3,24.21,8.88v.37Z"
                fill="#fff"
                strokeWidth="0"
              />
              <g>
                <path
                  d="m56.95,16.51c2.97,0,5.29.97,6.96,2.92,1.67,1.95,2.5,4.38,2.5,7.31s-.87,5.29-2.6,7.22c-1.73,1.93-4.03,2.89-6.9,2.89s-5.01-.95-6.67-2.86c-1.67-1.91-2.5-4.36-2.5-7.35,0-2.07.38-3.84,1.13-5.29.75-1.45,1.79-2.62,3.1-3.51,1.31-.89,2.97-1.33,4.98-1.33Zm.15,3.77c-1.09,0-1.91.42-2.47,1.27s-.83,2.52-.83,5.04c0,2.31.26,3.96.79,4.97s1.35,1.51,2.47,1.51c.98,0,1.77-.43,2.37-1.29s.91-2.49.91-4.9c0-2.56-.27-4.31-.8-5.22-.53-.92-1.35-1.37-2.44-1.37Z"
                  fill={theme === "dark" ? "#cbd5e1" : "#3c3c3b"}
                  strokeWidth="0"
                />
                <path
                  d="m87.14,29.12c-.22,2.31-1.13,4.17-2.74,5.6-1.61,1.42-3.68,2.14-6.22,2.14-2.76,0-5-.91-6.74-2.74-1.73-1.82-2.6-4.26-2.6-7.32s.89-5.53,2.66-7.43c1.77-1.9,4.14-2.85,7.11-2.85,2.38,0,4.36.72,5.93,2.15,1.57,1.43,2.43,3.22,2.6,5.38l-5.38.31c-.18-2.35-1.2-3.52-3.05-3.52-2.28,0-3.42,1.87-3.42,5.61,0,2.49.32,4.07.96,4.74.64.67,1.41,1.01,2.33,1.01,1.78,0,2.84-1.13,3.19-3.38l5.38.33Z"
                  fill={theme === "dark" ? "#cbd5e1" : "#3c3c3b"}
                  strokeWidth="0"
                />
                <path
                  d="m95.91,9.51v5.76h-5.76v-5.76h5.76Zm0,7.4v19.53h-5.76v-19.53h5.76Z"
                  fill={theme === "dark" ? "#cbd5e1" : "#3c3c3b"}
                  strokeWidth="0"
                />
                <path
                  d="m117.61,36.45h-5.59c-.18-.77-.27-1.79-.27-3.05-.98,1.39-1.95,2.32-2.92,2.77s-2.08.69-3.31.69c-1.83,0-3.3-.5-4.43-1.49-1.13-.99-1.69-2.33-1.69-4,0-1.22.33-2.35.98-3.38.66-1.03,1.71-1.84,3.17-2.43,1.46-.59,4.11-1.02,7.95-1.31v-1.12c0-1.9-.94-2.84-2.83-2.84-2.02,0-3.14.95-3.37,2.84l-5.32-.5c.35-2.22,1.4-3.79,3.15-4.72,1.75-.93,3.74-1.39,5.95-1.39,1.33,0,2.58.15,3.75.46s2.09.77,2.75,1.39,1.1,1.27,1.33,1.96c.23.69.35,1.89.35,3.61v8.85c0,1.7.12,2.92.35,3.65Zm-6.11-9.36c-4.02.4-6.03,1.62-6.03,3.65,0,.68.21,1.27.64,1.77.42.5,1.03.74,1.81.74,1.01,0,1.87-.42,2.55-1.27.69-.84,1.03-1.88,1.03-3.12v-1.78Z"
                  fill={theme === "dark" ? "#cbd5e1" : "#3c3c3b"}
                  strokeWidth="0"
                />
                <path
                  d="m127.95,21.4v15.04h-5.61v-15.04h-2.26v-4.49h2.26c.03-2.01.17-3.48.43-4.4.26-.92.94-1.74,2.04-2.46s2.58-1.07,4.47-1.07c.77,0,1.66.07,2.67.21v4.45c-.83-.06-1.51-.1-2.05-.1-.79,0-1.31.21-1.57.62-.26.41-.39,1.08-.39,2.01v.73h3.54v4.49h-3.54Z"
                  fill={theme === "dark" ? "#cbd5e1" : "#3c3c3b"}
                  strokeWidth="0"
                />
                <path
                  d="m149.66,16.92l-6.12,18.73c-.68,2.09-1.27,3.6-1.75,4.53-.48.94-1.18,1.68-2.09,2.24s-2.18.84-3.8.84c-.81,0-1.73-.08-2.77-.23v-4.43c1.02.18,1.96.27,2.83.27,1.14,0,1.9-.21,2.29-.64.39-.43.68-1.03.87-1.8l-7.11-19.52h6.09l3.76,11.62,3.62-11.62h4.18Z"
                  fill={theme === "dark" ? "#cbd5e1" : "#3c3c3b"}
                  strokeWidth="0"
                />
              </g>
              <path
                d="m45.78,17.4c-1.44-4.72-2.31-6.93-5.4-9.85-1.16.08-2.5.68-3.72.82-2.14.24-2.5.39-4.82.23-3.14-.22-4.86-.03-7.73.13-.21.01-1.34.3-1.06.28.28-.02,1.21-.07,1.71-.13.97-.12.18-.17-.21-.15-1.54.04-5.17.65-6.88,2.36-.41.4-3.03,2.27-.27,4.51.36.29.41.37,1.34.69,3.09,1.05,6.14.87,9.91.87,6.56-.29,16.1.13,16.52,8.19.22,1.36-.36,2.19-.72,3.72-.22.65-.22,1.09-.57,1.54-.51.67-1.12,1.79-1.6,2.25-1.36,1.09-3.68,2.67-5.55,3.15-1.94.26-4.54.49-6.46.59-2.69.09-5.55-.02-8.27.02-2.14.09-4.49.09-6.67.07-2.98.05-6,.06-8.96-.27-.85-.03-1.73-.35-2.52-.29.31.77,1.08,1.65,1.68,2.32,1.81,2,4.64,4.03,6.68,5.28,1.55.95,4.27,2.71,9.01,2.69,2.3,0,4.42.07,6.64-.32,5.11-.9,9.61-3.85,13.01-7.58s4.64-8.49,5.1-10.5c.34-1.5.95-7.01-.16-10.46l-.04-.14Z"
                fill={"#3c3c3b"}
                strokeWidth="0"
              />
            </g>
          </svg>
          <img
            className={`${!mdScreen ? "block" : "hidden"}`}
            src={`${SociafyIconSmaller}`}
            alt=""
          />
        </picture>
        <div className="justify-items flex  gap-8 bg-inherit sm:flex-col sm:gap-4">
          <Link className="flex place-items-center gap-3" to={"/MainPage"}>
            <IoMdHome size={`${lg ? "2.5rem" : "2.4rem"}`} />
            <span className={`${mdScreen ? "block" : "hidden"}`}>Home</span>
          </Link>
          <div className="flex items-center gap-3">
            <IoIosAddCircleOutline
              size={`${lg ? "2.5rem" : "2.4rem"}`}
              onClick={openPostHandler}
            />
            <span className={`${mdScreen ? "block" : "hidden"}`}>Add Post</span>
          </div>
          {openPost && <AddPost onClose={closePostHandler} />}
          <div className="flex items-center gap-3">
            <SlMagnifier
              onClick={() => openedSearchHandler()}
              size={`${lg ? "2.5rem" : "2.4rem"}`}
              className=" sm:flex"
            />
            <span className={`${mdScreen ? "block" : "hidden"}`}>Search</span>
          </div>
          <div className="flex items-center gap-3">
            <IoIosSend size={`${lg ? "2.5rem" : "2.4rem"}`} />
            <span className={`${mdScreen ? "block" : "hidden"}`}>Messages</span>
          </div>
          <Link to={"/"}>
            <div className="flex items-center gap-3">
              <CiLogout
                onClick={logoutHandler}
                size={lg ? "2.5rem" : "2.4rem"}
              />
              <span className={`${mdScreen ? "block" : "hidden"}`}>Logout</span>
            </div>
          </Link>
          <motion.div
            whileTap={{ scale: 1.05 }}
            className=" h-full w-full rounded-full sm:block lg:h-full lg:w-full"
          >
            <Link className="flex items-center gap-3" to={"/User/Me"}>
              {pictureUrl === null ? (
                <CiUser size={`${lg ? "2.5rem" : "2rem"}`} />
              ) : (
                <div className="h-10 w-10 rounded-full border border-inherit">
                  <motion.img
                    whileHover={{ scale: 1.2 }}
                    className="h-full w-full rounded-full border border-inherit bg-inherit object-cover "
                    src={pictureUrl}
                    alt=""
                  />
                </div>
              )}
              <span className={`${mdScreen ? "block" : "hidden"}`}>
                Profile
              </span>
            </Link>
          </motion.div>
          <div className="flex items-center gap-3">
            <MdOutlineDarkMode
              size={lg ? "2.5rem" : "2.4rem"}
              onClick={toggleTheme}
            />
            <span className={`${mdScreen ? "block" : "hidden"}`}>Mode</span>
          </div>
        </div>
      </motion.footer>
    </>
  );
}
export default FooterMenu;
