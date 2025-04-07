import React, { ReactNode, useState } from "react";
import ProtectedRoute from "../../pages/Secret/ProtectedRoute";
import { useTheme } from "../../store/themeContext";
import FooterMenu from "../FooterMenu/FooterMenu";
import FooterSearchBar from "../FooterMenu/FooterSearchBar";
import Hamburger from "../Icon/Hamburger";
type Props = {
  children: ReactNode;
};
const Layout: React.FC<Props> = ({ children }) => {
  const { theme } = useTheme();
  return (
    <article className="flex  relative"
    >

      { children}
    </article>
  );
};

export default Layout;
