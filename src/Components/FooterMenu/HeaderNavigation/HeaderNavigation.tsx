import React, { useContext, useState } from "react";
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
        className={`col-[1/-1] flex flex-row justify-around border border-slate-500 bg-inherit p-2 max-extraSm:justify-start max-extraSm:gap-16 sm:hidden`}
      >
        <div>
          <h1 className="font-sans font-bold text-inherit">For You</h1>
        </div>
        <div className={`flex gap-3 rounded-md bg-transparent text-black`}>
          <input
            className={`h-full rounded-sm border border-slate-300 bg-inherit text-slate-100 outline-none  `}
            type="text"
            name="searchBar"
            id=""
            placeholder="Search"
            onKeyDown={searchInputHandler}
          />
        </div>
      </nav>
    </>
  );
};

export default HeaderNavigation;
