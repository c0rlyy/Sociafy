import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "../../Components/Layout/Layout";
import UserInfo from "../../Components/UserInfo/UserInfo";
import Content from "../../Components/Content/Content";
import Navbar from "../../Components/Navbar/Navbar";
import Hamburger from "../../Components/Icon/Hamburger";
import MobileMenu from "../../Components/Menu/MobileMenu";

const MainPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const navbarVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      x: "-100%",
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const contentVariants = {
    compressed: {
      marginLeft: "256px", // When menu is open, content is pushed right
      width: "calc(100% - 256px)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    expanded: {
      marginLeft: "0px",
      width: "100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  return (
    <Layout>
      <motion.div
        className="fixed z-10 h-full w-64 bg-white shadow-lg"
        initial="closed"
        animate={isMenuOpen ? "open" : "closed"}
        variants={navbarVariants}
      >
        <Navbar
          variants={navbarVariants}
          isVisible={isMenuOpen}
          closeNavbarHandler={handleToggleMenu}
        />
      </motion.div>

      <motion.aside
        initial="expanded"
        animate={isMenuOpen ? "compressed" : "expanded"}
        variants={contentVariants}
        className="h-full bg-gray-50"
      >
        <header className="relative flex w-full items-center justify-between border">
          <Hamburger
            isVisible={isMenuOpen}
            visibilityHandler={handleToggleMenu}
          />
          <UserInfo />
        </header>
        <Content />
      </motion.aside>

      <MobileMenu />
    </Layout>
  );
};

export default MainPage;
