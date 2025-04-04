import React, { useContext, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { SlMagnifier } from "react-icons/sl";
type SearchBarProps = {
  children: React.ReactNode;
};
const HeaderNavigation: React.FC<SearchBarProps> = () => {
  const [openedSearchBar, setOpenedSearchBar] = useState<boolean>(false);
  const searchBarHandler = (e: React.FormEvent) => {
    setOpenedSearchBar(true);
  };

  const searchInputHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Escape") {
      setOpenedSearchBar(false);
      const input = e.target as HTMLInputElement;
      input.value = "";
    }
  };
  return (
    <>
      <nav
        className={`col-[1/-1] flex flex-row items-center justify-around  bg-inherit p-2 max-extraSm:justify-start max-extraSm:gap-16 sm:hidden`}
      >
        <div>
          <h1 className="font-sans font-bold text-inherit">For You</h1>
        </div>
        <CiHeart size={"2rem"} />
      </nav>
    </>
  );
};

export default HeaderNavigation;
