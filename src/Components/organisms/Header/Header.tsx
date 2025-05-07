import Hamburger from "../../molecules/Icon/Hamburger";
import UserInfo from "../UserInfo/UserInfo";

export default function Header({
  isMenuOpen,
  handleToggleMenu,
}: {
  isMenuOpen: boolean;
  handleToggleMenu: () => void;
}) {
  return (
    <header className="relative flex w-full items-center justify-between border">
      <Hamburger isVisible={isMenuOpen} visibilityHandler={handleToggleMenu} />
      <UserInfo />
    </header>
  );
}
