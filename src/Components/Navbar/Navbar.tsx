import LogoutButton from "../../Components/Buttons/LogoutButton";
import { motion, Variants } from "framer-motion"; // Corrected import for framer-motion
import SettingsButton from "../../Components/Buttons/SettingsButton";
import Logo from "../../../public/assets/Icons/SFy.png";
import HomeButton from "../../Components/Buttons/HomeButton";
import MessagesButton from "../../Components/Buttons/MessagesButton";
import AddButton from "../../Components/Buttons/AddButton";
import BackIcon from "../Icon/BackIcon";
import CloseNavbarIcon from "../Icon/CloseNavbarIcon";

export default function Navbar({
  isVisible,
  variants,
  closeNavbarHandler,
}: {
  isVisible: boolean;
  variants: Variants;
  closeNavbarHandler: () => void;
}) {
  return (
    <motion.div
      initial={isVisible ? "open" : "closed"}
      animate={isVisible ? "open" : "closed"}
      variants={variants}
      className="flex h-screen w-full flex-col justify-center border bg-white p-2.5 shadow-lg lg:w-64"
    >
      <CloseNavbarIcon closeNavbarHandlerProp={closeNavbarHandler} />
      <div className="mt-12 flex flex-col justify-center gap-4">
        <picture className="size-full">
          <img className="h-full w-full" src={Logo} alt="Logo" />
        </picture>
        <HomeButton />
        <MessagesButton />
        <AddButton />
        <LogoutButton />
        <SettingsButton />
      </div>
    </motion.div>
  );
}
