import { motion } from "framer-motion";
import {
  ChangeEvent,
  FC,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import PostContext from "../../store/post-context";
import User from "./User";
type FooterSearchBar = {
  openedSearch: boolean;
  searchHandler: any;
};
// Abort Controller here

function FooterSearchBar({ openedSearch, searchHandler }: FooterSearchBar) {
  const [searchInput, setSearchInput] = useState("");
  const [results, setResult] = useState([]);
  const [validation, setValidation] = useState(false);
  const controllerRef = useRef<AbortController>();
  const pstCtx = useContext(PostContext);
  const users = pstCtx.posts.map((postItem) => (
    <User
      key={postItem.id}
      userImage={postItem.authorImg}
      userName={postItem.author}
      userEmail={postItem.email}
    />
  ));
  async function searchInputChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    const target = e.target as typeof e.target & {
      value: string;
    };
    setSearchInput(target.value);
    setResult(undefined);
    if (controllerRef) {
      controllerRef.current?.abort();
    }
    controllerRef.current = new AbortController();
    const signal = controllerRef.current?.signal;
    // Fetching here
  }

  return (
    <motion.div
      animate={`${openedSearch ? { x: 100 } : ""}`}
      onClick={searchHandler}
      className="absolute top-0 gap-5 flex flex-col left-20 h-screen p-5 z-50 border border-slate-500"
    >
      <h1 className="text-right text-2xl font-bold">Search</h1>
      <input
        onChange={searchInputChangeHandler}
        type="text"
        name="search"
        id=""
      />
      <div className="h-full flex gap-5 flex-col">
        {!validation ? <h1>No results found</h1> : users}
      </div>
    </motion.div>
  );
}
export default FooterSearchBar;
