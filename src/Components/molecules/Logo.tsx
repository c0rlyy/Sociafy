import { Image } from "../atoms/Image/Image";
import SociafySVG from "../../../public/assets/sociafy_logo.svg";

export default function SociafyLogo() {
  return <Image src={`${SociafySVG}`} alt="sociafy-logo" />;
}
