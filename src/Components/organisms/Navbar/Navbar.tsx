import { motion } from "framer-motion";
import CloseNavbarIcon from "../../molecules/Icon/CloseNavbarIcon";
import SociafyLogo from "../../molecules/Logo";
import ButtonGroup from "../../molecules/ButtonGroup/ButtonGroup";
import Button from "../../atoms/Button/Button";
import useModalStore from "../../../store/modalStore";
export default function Navbar({
  isVisible,
  variants,
  closeNavbarHandler,
}: {
  isVisible: boolean;
  variants: Variants;
  closeNavbarHandler: () => void;
}) {
  const { open } = useModalStore();
  return (
    <>
      <motion.div
        initial={isVisible ? "open" : "closed"}
        animate={isVisible ? "open" : "closed"}
        variants={variants}
        className="flex h-screen w-full flex-col justify-center border bg-white p-2.5 shadow-lg lg:w-64"
      >
        <CloseNavbarIcon closeNavbarHandlerProp={closeNavbarHandler} />
        <div className="mt-12 flex flex-col gap-4">
          <SociafyLogo />
          <ButtonGroup direction="col">
            <Button className="w-full" size="lg" variant="primary">
              Home
            </Button>
            <Button className="w-full" size="lg" variant="primary">
              Messages
            </Button>
            <Button
              onClick={() => open("post-modal-wrapper")}
              className="w-full"
              size="lg"
              variant="primary"
            >
              Create Post
            </Button>
            <Button className="w-full" size="lg" variant="primary">
              Settings
            </Button>
          </ButtonGroup>
        </div>
      </motion.div>
    </>
  );
}
