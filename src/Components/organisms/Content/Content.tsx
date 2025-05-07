import { useShallow } from "zustand/react/shallow";
import { useAuthStore } from "../../../store/auth-store.";
import { useError } from "../../../store/ErrorContext";
import Loader from "../../Loader/Loader";
import { useEffect, useState } from "react";
import { tryCatchErrorHandler } from "../../../utils/error";
import { useMediaQuery } from "react-responsive";
import MobileContent from "./MobileContent";
import DesktopContent from "./DesktopContent";
import { motion } from "framer-motion";

export default function Content({ isMenuOpen }: { isMenuOpen: boolean }) {
  const getUser = useAuthStore((state) => state.getUser);
  const user = useAuthStore(useShallow((state) => state.user));
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [isLoading, setIsLoading] = useState(true);
  const { showError } = useError();
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
  //TODO mayvbe move state down
  useEffect(() => {
    const fetchUser = async () => {
      try {
        await getUser();
      } catch (error) {
        tryCatchErrorHandler(error, showError);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (isLoading) {
    return <Loader></Loader>;
  }

  if (!user) {
    showError({ error: "error while getting user data, logging out" });
    return;
  }
  return (
    <motion.aside
      initial="expanded"
      animate={isMenuOpen ? "compressed" : "expanded"}
      variants={contentVariants}
      className="h-full bg-gray-50"
    >
      <div className="flex h-full w-full flex-col ">
        {isMobile ? (
          <MobileContent user={user} />
        ) : (
          <DesktopContent user={user} />
        )}
      </div>
    </motion.aside>
  );
}
