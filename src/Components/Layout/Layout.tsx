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
  };

  const [openedSearch, setOpenedSearch] = useState(false);

  return (
    <article className="grid grid-cols-2 border"
    >
      { children}
    </article>
  );
};

export default Layout;
