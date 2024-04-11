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
type FooterSearchBar = {
  isOpened: boolean;
  setOpenedSearchFuncProp: () => void;
};
// Abort Controller here

function FooterSearchBar({
  isOpened,
  setOpenedSearchFuncProp,
}: FooterSearchBar) {
  const [searchInput, setSearchInput] = useState("");
  const [results, setResult] = useState([]);
  const [validation, setValidation] = useState(false);
  const [usernames, setUsernames] = useState([]);
  const [closeInput, setCloseInput] = useState(isOpened);
  const controllerRef = useRef<AbortController>();
  const pstCtx = useContext(PostContext);
  const users = pstCtx.posts.map((postItem) => (
    <User
      key={postItem.id}
      userImage={postItem.postContent}
      userName={postItem.author}
      userEmail={postItem.email}
    />
  ));
  const fetchUsers = async () => {};
  const usersToUserNames = (array: []) => {
    array.forEach((item) => {
      console.log(item);
    });
  };
  useEffect(() => {
    const initializer = setTimeout(async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/users?skip=0&limit=100",
          {
            method: "GET",
          },
        );
        const users = await response.json();
        if (response.ok) {
          console.log(users);
        }
      } catch (error) {
        console.log(error);
      }
    }, 1500);

    return () => {
      console.log("Clean Up");
      clearTimeout(initializer);
    };
  });
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
    await fetchUsers();
  }
  const { theme } = useTheme();
  return (
    <motion.div
      initial={{ x: -80 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", duration: 0.5 }}
      className={` ${
        isOpened ? "block" : "hidden"
      } sticky left-0 top-0 z-50 flex h-screen w-1/4 flex-col items-center  gap-3 border border-slate-500 bg-inherit`}
    >
      <IoMdClose
        onClick={setOpenedSearchFuncProp}
        className={"absolute left-0 top-0"}
        size={"2rem"}
      />
      <h1 className=" text-2xl font-bold">Search</h1>
      <input
        className="h-[2ch] w-3/4 border border-slate-500 "
        onChange={searchInputChangeHandler}
        type="text"
        name="search"
        id=""
      />
      <div className="flex h-full flex-col gap-5">
        {!validation ? <h1>No results found</h1> : users}
      </div>
    </motion.div>
  );
}
export default FooterSearchBar;
