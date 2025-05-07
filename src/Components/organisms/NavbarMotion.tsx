import { motion } from "framer-motion";
import Navbar from "./Navbar/Navbar";

export default function NavbarMotion({
  isMenuOpen,
  handleToggleMenu,
}: {
  isMenuOpen: boolean;
  handleToggleMenu: () => void;
}) {
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
  return (
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
  );
}
