import LogoutButton from "../../Components/Buttons/LogoutButton";
import { motion } from "framer-motion"; // Corrected import for framer-motion
import SettingsButton from "../../Components/Buttons/SettingsButton";
import Logo from "../../../public/assets/Icons/SFy.png";
import HomeButton from "../../Components/Buttons/HomeButton";
import MessagesButton from "../../Components/Buttons/MessagesButton";
import AddButton from "../../Components/Buttons/AddButton";

export default function Navbar({isVisible, variants}:{isVisible:boolean, variants:any}) {
  return (

      <motion.div
        initial={isVisible ? "open" : "closed"}
        animate={isVisible ? "open" : "closed"}
        variants={variants}
        className="lg:w-64 w-full p-2.5 h-screen flex flex-col justify-center border bg-white shadow-lg"

      >
        <div className="flex flex-col gap-4 justify-center mt-12">
          <picture className="size-full">
            <img className="w-full h-full" src={Logo} alt="Logo" />
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
