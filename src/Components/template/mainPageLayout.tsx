import React, { ReactNode } from "react";

import { usePopoverStore } from "../../store/popover-store.";
type Props = {
  children: ReactNode;
};
const Layout: React.FC<Props> = ({ children }) => {
  const { closePopover, isPopoverOpened, popoverType } = usePopoverStore();
  const eventObservable = () => {
    if (isPopoverOpened && popoverType === "user-popup") closePopover();
  };
  return (
    <article
      onKeyDown={closePopover}
      onClick={eventObservable}
      className="relative flex h-screen flex-col "
    >
      {children}
    </article>
  );
};

export default Layout;
