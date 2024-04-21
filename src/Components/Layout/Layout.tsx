import React, { ReactNode } from "react";
import { useTheme } from "../../store/themeContext";
import FooterMenu from "../FooterMenu/FooterMenu";
type Props = {
  children: ReactNode;
};
const Layout: React.FC<Props> = ({ children }) => {
  const { theme } = useTheme();
  return (
    <div
      className={`${
        theme === "dark" ? "bg-slate-900 text-white" : "bg-white text-black"
      } grid grid-cols-mobileLayout grid-rows-mobileLayout md:grid-cols-layout md:grid-rows-layout `}
    >
      <FooterMenu />
      {children}
    </div>
  );
};

export default Layout;
