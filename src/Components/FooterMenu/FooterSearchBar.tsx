import { easeIn, motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";

import {
  ChangeEvent,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import PostContext from "../../store/post-context";
import User from "./User";
import { useTheme } from "../../store/themeContext";
import SearchedUser from "./SearchedUser/SearchedUser";
type FooterSearchBar = {
  isOpened: boolean;
  setOpenedSearchFuncProp: () => void;
};
// Abort Controller here
// *Export Type User z Recommended*

function FooterSearchBar({
  isOpened,
  setOpenedSearchFuncProp,
}: FooterSearchBar) {
  const [searchInput, setSearchInput] = useState("");
  const [results, setResult] = useState([]);
  const [usernames, setUsernames] = useState([]);
  const controllerRef = useRef<AbortController>();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/users?skip=0&limit=100",
          {
            method: "GET",
          },
        );
        const users = await response.json();
        if (users.length > 0) {
          const newUsers = users.map((user) => ({ username: user?.user_name }));
          setUsernames(newUsers);

          const filteredResults = newUsers.filter((result) =>
            result?.username.toLowerCase().includes(searchInput.toLowerCase()),
          );
          setResult(filteredResults);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const initializer = setTimeout(fetchUsers, 2500);

    return () => {
      console.log("CLEAN UP");
      console.log(results);
      clearTimeout(initializer);
    };
  }, [searchInput]);

  async function searchInputChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    const target = e.target as typeof e.target & {
      value: string;
    };
    setSearchInput(target.value);
    if (controllerRef) {
      controllerRef.current?.abort();
    }
    controllerRef.current = new AbortController();
    const signal = controllerRef.current?.signal;
  }
  return (
    <motion.div
      initial={{ x: -150 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", duration: 0.5 }}
      className={`absolute left-0 top-0 z-50 flex h-screen w-screen flex-col place-items-center  gap-3 border-r bg-inherit md:w-[400px] `}
    >
      <IoMdClose
        onClick={setOpenedSearchFuncProp}
        className={"absolute left-0 top-0"}
        size={"2rem"}
      />
      <h1 className=" text-2xl font-bold">Search</h1>
      <input
        className="w-3/4 border border-slate-500 align-middle text-black  "
        onChange={searchInputChangeHandler}
        type="text"
        name="search"
        id=""
      />
      <div className="flex h-full flex-col gap-5">
        {usernames.length > 0 ? (
          results.map((result, index) => (
            <SearchedUser
              userImage={""}
              userName={result?.username}
              userEmail={""}
            />
          ))
        ) : (
          <h1>No results found</h1>
        )}
      </div>
    </motion.div>
  );
}
export default FooterSearchBar;
