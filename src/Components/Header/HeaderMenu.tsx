import { useContext, useEffect, useRef, useState } from "react";
import HeaderMenuItem from "./HeaderMenuItem";
import { MdOutlineDarkMode } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { FiMessageCircle } from "react-icons/fi";
import Likes from "../Likes/Likes";
import PostContext from "../../store/PostContext";
interface HeaderMenuProps {
  mdScreen: boolean;
}
const HeaderMenu: React.FC<HeaderMenuProps> = ({ mdScreen }) => {
  const postCtx = useContext(PostContext);
  const ref = useRef(null);
  const [opened, setOpened] = useState(false);
  const openHandler = () => {
    setOpened(true);
  };
  const body = document.querySelector("body");
  const handleOutsideClick = (e: Event) => {
    console.log(e.currentTarget);
    console.log(ref.current);
    // if (e.currentTarget !== ref) {
    //   setOpened(false);
    // }
  };

  const [dark, setDark] = useState(false);
  const DarkHandler = () => {
    setDark((prev) => !prev);
  };
  return (
    <nav className="flex items-center gap-2 ">
      <div>
        <CiHeart size={"2.5rem"} onClick={openHandler} />
      </div>
      {opened && <Likes ref={ref} />}
    </nav>
  );
};
export default HeaderMenu;
