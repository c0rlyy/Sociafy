import Layout from "../../Components/Layout/Layout";

import UserInfo from "../../Components/UserInfo/UserInfo";
import Reels from "../../Components/Reels/reels";
import Content from "../../Components/Content/Content";
import Navbar from "../../Components/Navbar/Navbar";
import { motion } from "framer-motion";
import { useState } from "react";
import Hamburger from "../../Components/Icon/Hamburger";
import MobileMenu from "../../Components/Menu/MobileMenu";
const MainPage = () => {
  const [isVisible, setIsVisible] = useState(false);

    const handleVisibility = () => {
      setIsVisible((prev) => !prev);
    };
    const navbarVariants = {
       open: {
         x: 0,
        display:"flex",
         transition: {
           type: "spring",
           stiffness: 300,
           damping: 30
         }
       },
       closed: {
         display:"none",
         x: "-100%",
         transition: {
           type: "spring",
           stiffness: 300,
           damping: 30
         }
       }
     };

  const contentVariants = {
      expanded: {
        marginLeft: "0px",
        width: "100vw",
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 30
        }
      },
      compressed: {
        marginLeft: "0", // 64px * 4 = 256px (w-64 is 16rem which is 256px)
        width: "calc(100% - 480px)",
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 30
        }
      }
    };
  return (
      <Layout>
        <Hamburger visibilityHandler={handleVisibility}/>
        <Navbar isVisible={isVisible} variants={navbarVariants}/>
      < motion.aside
        initial={isVisible ? "compressed" : "expanded"}
        animate={isVisible ? "compressed" : "expanded"}
        variants={contentVariants}
        className="flex-grow flex flex-col h-screen overflow-y-auto bg-gray-50">
          <header className="flex mt-12 w-full justify-center   ">

          <Reels/>
          <UserInfo/>
          </header>
          <Content/>
      </motion.aside>
      <MobileMenu/>
      </Layout>
  )
};
export default MainPage;
