import React, { ReactNode } from "react";
import FooterMenu from "../FooterMenu/FooterMenu";
type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="grid grid-cols-Layout">
      <FooterMenu />
      {children}
    </div>
  );
};

export default Layout;
