import React, { ReactNode, useState } from "react";
import ProtectedRoute from "../../pages/Secret/ProtectedRoute";
import { useTheme } from "../../store/themeContext";
import FooterMenu from "../FooterMenu/FooterMenu";
import FooterSearchBar from "../FooterMenu/FooterSearchBar";
type Props = {
  children: ReactNode;
};
const Layout: React.FC<Props> = ({ children }) => {
  const { theme } = useTheme();
  const searchBarHandler = () => {
    setOpenedSearch((prev) => !prev);
    console.log(openedSearch);
  };

  const [openedSearch, setOpenedSearch] = useState(false);

  return (
    <div
      className={`${
        theme === "dark" ? "bg-slate-900 text-white" : "bg-white text-black"
      } grid grid-cols-mobileLayout grid-rows-mobileLayout md:grid-cols-layout md:grid-rows-layout `}
    >
      <FooterMenu
        openedSearchHandler={searchBarHandler}
        openedSearch={openedSearch}
      />
      {openedSearch && (
        <FooterSearchBar
          setOpenedSearchFuncProp={searchBarHandler}
          isOpened={openedSearch}
        />
      )}
      {children}
    </div>
  );
};

export default Layout;
