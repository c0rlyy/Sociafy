import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Logo from "../../../public/assets/Icons/SFy.png";
import Layout from "../../Components/Layout/Layout";
import UserInfo from "../../Components/UserInfo/UserInfo";
import Reels from "../../Components/Reels/reels";
import Content from "../../Components/Content/Content";
import Navbar from "../../Components/Navbar/Navbar";
import Hamburger from "../../Components/Icon/Hamburger";
import MobileMenu from "../../Components/Menu/MobileMenu";
import HomeButton from "../../Components/Buttons/HomeButton";
import MessagesButton from "../../Components/Buttons/MessagesButton";
import AddButton from "../../Components/Buttons/AddButton";
import LogoutButton from "../../Components/Buttons/LogoutButton";
import SettingsButton from "../../Components/Buttons/SettingsButton";

const MainPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  const navbarVariants = {
    open: {
      x: 0,
      display: "flex",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      display: "none",
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const contentVariants = {
    expanded: {
      marginLeft: "0px",
      width: "100vw",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    compressed: {
      marginLeft: "0", // 64px * 4 = 256px (w-64 is 16rem which is 256px)
      width: "calc(100% - 480px)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  return (
    <Layout>
      <Hamburger visibilityHandler={handleVisibility} />
      <Navbar isVisible={isVisible} variants={navbarVariants} />

      <motion.aside
        initial={isVisible ? "compressed" : "expanded"}
        animate={isVisible ? "compressed" : "expanded"}
        variants={contentVariants}
        className="flex h-screen flex-grow flex-col overflow-y-auto bg-gray-50"
      >
        <header className="mt-12 flex w-full justify-center">
          <Reels />
          <UserInfo />
        </header>
        <Content />
      </motion.aside>

      {/* <main className="flex h-screen w-64 flex-col justify-center p-2.5">
        <div className="flex h-auto flex-col justify-center gap-4">
          <picture className="size-full">
            <img className="h-full w-full" src={Logo} alt="Logo" />
          </picture>
          <HomeButton />
          <MessagesButton />
          <AddButton />
          <LogoutButton />
          <SettingsButton />
          <Link to="/userProfile">welcome</Link>
        </div>
      </main> */}

      <MobileMenu />
    </Layout>
  );
};

export default MainPage;
