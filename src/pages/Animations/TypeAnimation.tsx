import { FaGithub } from "react-icons/fa";
import "./TypeAnimation.css";
import SociafyLogo from "../../../public/sociafy.svg";
import { Link } from "react-router-dom";
import { Image } from "../../Components/atoms/Image/Image";
import { Box } from "../../Components/atoms/Container/Container";
import { GridItem } from "../../Components/atoms/GridItem/GridItem";
import { Stack } from "../../Components/atoms/Stack/Stack";
type typeAnimationProp = {
  mdScreen: boolean;
};
function TypingAnimation({ mdScreen }: typeAnimationProp) {
  return (
    <GridItem colStart={1} colEnd={2}>
      <Stack direction="col" justify="center" align="center">
        <Box className="size-[340px]">
          <Image src={`${SociafyLogo}`} alt="" />
        </Box>
        <h1 className="anim-type anim-text">c0rly and rovgart presents </h1>
        <Box className="anim-github relative flex items-center gap-5  rounded-xl px-2 py-3 text-white">
          <Link to={"https://github.com/c0rlyy"} className=" github-item  ">
            <FaGithub size={mdScreen ? "3rem" : "5rem"} />
            <h1 className="text-postCont">c0rly</h1>
          </Link>
          <Link to={"https://github.com/rovgart"} className="github-item   ">
            <FaGithub size={mdScreen ? "3rem" : "5rem"} />
            <h1 className="text-postCont">rovgart</h1>
          </Link>
        </Box>
      </Stack>
    </GridItem>
  );
}
export default TypingAnimation;
