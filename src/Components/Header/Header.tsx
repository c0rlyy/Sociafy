import { useMediaQuery } from "react-responsive";
import HeaderMenu from "./HeaderMenu";
import HeaderLogo from "./HeaderLogo";
const Header = () => {
  const mdScreen = useMediaQuery({
    query: `(min-width:720px)`,
  });

  return (
    <header
      className={`p-4 md:p-7 border border-b flex justify-around items-center`}
      role={"menubar"}
    >
      <HeaderLogo mdScreen={mdScreen} />
      <HeaderMenu mdScreen={mdScreen} />{" "}
    </header>
  );
};

export default Header;
