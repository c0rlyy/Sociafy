import React, { useState } from "react";
import HeaderNav from "./HeaderNavigation.module.css";
import { SlMagnifier } from "react-icons/sl";
type SearchBarProps = {
  children: React.ReactNode;
};
const HeaderNavigation: React.FC<SearchBarProps> = () => {
  const [openedSearchBar, setOpenedSearchBar] = useState<boolean>(false);
  const searchBarHandler = (e: React.FormEvent) => {
    setOpenedSearchBar(true);
  };
  const searchInputHandler = (e: React.KeyboardEvent) => {
    if (e.key == "Escape") {
      setOpenedSearchBar(false);
      const input = e.target;
      console.log(input.clear());
    }
  };
  return (
    <nav className={HeaderNav.navigation}>
      <div className="">
        <h1>For You</h1>
      </div>
      <div className={HeaderNav.searchBarContainer}>
        <input
          className={`${openedSearchBar ? "block" : "hidden"}`}
          type="text"
          name="searchBar"
          id=""
          placeholder="Search"
          onKeyDown={searchInputHandler}
        />
        <SlMagnifier onClick={searchBarHandler} size={"2rem"} />
      </div>
    </nav>
  );
};

export default HeaderNavigation;
