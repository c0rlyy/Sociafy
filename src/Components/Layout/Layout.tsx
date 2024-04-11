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
        theme === "dark" ? "text-slate-300 bg-slate-900" : "text-black bg-white"
      } grid grid-cols-layout grid-rows-layout overflow-visible`}
    >
      <FooterMenu />
      {children}
    </div>
  );
};

export default Layout;
