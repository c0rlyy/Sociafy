import React, { ReactNode, useState } from "react";
import ProtectedRoute from "../../pages/Secret/ProtectedRoute";
import { useTheme } from "../../store/themeContext";
import FooterMenu from "../FooterMenu/FooterMenu";
import FooterSearchBar from "../FooterMenu/FooterSearchBar";
import Hamburger from "../Icon/Hamburger";
import { usePopoverStore } from "../../store/popover-store.";
type Props = {
  children: ReactNode;
};
const Layout: React.FC<Props> = ({ children }) => {
  const { theme } = useTheme();
  const { closePopover, isPopoverOpened, popoverType}=usePopoverStore()
  const eventObservable=()=>{
    if(isPopoverOpened && popoverType==="user-popup")
    closePopover()
  }
  return (
    <article onKeyDown={closePopover} onClick={eventObservable} className="flex  relative"
    >

      { children}
    </article>
  );
};

export default Layout;
