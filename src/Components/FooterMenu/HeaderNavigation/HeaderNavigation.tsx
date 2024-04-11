import React, { useContext, useState } from "react";
import { SlMagnifier } from "react-icons/sl";
import HeaderNav from "./HeaderNavigation.module.css";
import { useTheme } from "styled-components";
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
    <nav
      className={`col-[1/-1] row-[1] flex flex-row place-items-center justify-start gap-12 bg-inherit pl-5 pr-5`}
    >
      <div className="">
        <h1 className="text-[clamp(1.5rem, 2.5vw, 3rem)] font-sans font-bold text-white">
          For You
        </h1>
      </div>
      <div
        className={`text-[clamp(1rem, 2vw, 1.3rem)] flex rounded-md bg-[rgb(237,233,233,0.914)] pl-3 pt-1 text-black`}
      >
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
