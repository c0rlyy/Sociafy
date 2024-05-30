import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import { useProfile, UserPosts } from "../../store/UserProfile-context";
import SearchedUser from "./SearchedUser/SearchedUser";
const SearchForm = ({
  setOpenedSearchFuncProp,
  isOpened,
}: {
  setOpenedSearchFuncProp: () => void;
  isOpened: boolean;
}) => {
  type UpdatedSearchUser = {
    username: string;
    profile_pic: string;
    picture_id: number;
    user_id: number;
    user_email: string;
  };
  type SearchedUserProp = {
    email: string;
    user_name: string;
    id: number;
    profile: {
      description: string | null;
      profile_id: number;
      picture_id: number | null;
    };
  };

  const { register, handleSubmit } = useForm();
  const ref = useRef(null);
  const [searched, setSearched] = useState();
  const searchPosts = async (url: string): Promise<UserPosts[] | undefined> => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          `Failed to search posts: ${response.status}: ${response.statusText}`,
        );
      }
      const searchedPosts: UserPosts[] = await response.json();
      return searchedPosts;
    } catch (error: any) {
      console.error(`Error in searchPosts: ${error?.message}`);
    }
  };

  const fetchUsers = async (
    searchTerm: string | null,
  ): Promise<UpdatedSearchUser[] | undefined> => {
    try {
      let url = `http://localhost:8000/api/v1/users`;

      if (searchTerm) {
        if (searchTerm.startsWith("#")) {
          url = `http://localhost:8000/api/v1/search/posts?q=${searchTerm.slice(1, searchTerm.length)}&skip=0&limit=100`;
          const searchedPost = await searchPosts(url);
          console.log(searchedPost);
          return searchedPost as unknown as UpdatedSearchUser[];
        } else {
          url = `http://localhost:8000/api/v1/search/users?q=${searchTerm}&skip=0&limit=5`;
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(
              `Failed to search users: ${response.status}: ${response.statusText}`,
            );
          }
          const data: SearchedUserProp[] = await response.json();
          return await updatedSearchedUser(data);
        }
      }

      // Fetch default users if no search term is provided
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch users: ${response.status}: ${response.statusText}`,
        );
      }
      const users: UpdatedSearchUser[] = await response.json();
      return users;
    } catch (error: any) {
      console.error(`Error in fetchUsers: ${error?.message}`);
    }
  };

  const updatedSearchedUser = async (
    data: SearchedUserProp[],
  ): Promise<UpdatedSearchUser[]> => {
    try {
      const updatedUsers = await Promise.all(
        data.map(async (searchedUser) => {
          const profilePic = await profilePicRetriever(
            searchedUser.profile.picture_id,
          );
          return {
            username: searchedUser.user_name,
            picture_id: searchedUser.profile.picture_id,
            profile_pic: profilePic,
            user_id: searchedUser.id,
            user_email: searchedUser.email,
          };
        }),
      );
      return updatedUsers;
    } catch (error) {
      console.error(error);
    }
  };

  const profilePicRetriever = async (
    picture_id: number,
  ): Promise<string | null | undefined> => {
    if (!picture_id) {
      return null;
    }
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/file-retrive/${picture_id}`,
      );
      if (!response.ok) {
        throw new Error(
          `Error to retrieve SearchedUserProfilePic: ${response.status}: ${response.statusText}`,
        );
      }
      const ProfilePic: string = response.url;
      if (ProfilePic) {
        return ProfilePic;
      }
    } catch (error) {
      console.error(error?.message);
    }
  };

  const onSubmit = async (formData: any) => {
    try {
      setSearched(ref.current.value);
      const searchedUsers = await fetchUsers(searched);
      console.log("Searched Users:", searched);
    } catch (error) {
      console.error("Error while searching users:", error);
      return null;
    }
  };

  const { data: users, isLoading: isRunning } = useQuery({
    queryKey: ["users", searched],
    queryFn: async () => {
      const FetchedUsers = await fetchUsers(searched);
      return FetchedUsers;
    },
  });

  return (
    <motion.div
      initial={{ x: -150 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", duration: 0.5 }}
      className={`fixed left-0 top-0 z-50 flex h-screen w-screen flex-col place-items-center  gap-3 border-r bg-inherit md:w-[400px] `}
    >
      <IoMdClose
        onClick={setOpenedSearchFuncProp}
        className={"absolute left-0 top-0"}
        size={"2rem"}
      />
      <h1 className=" text-2xl font-bold">Search</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="w-full border border-slate-500 align-middle text-black  "
          ref={ref}
        />
      </form>
      <div className="flex h-full flex-col gap-5">
        {users && users.length > 0 ? (
          users.map((result) => (
            <SearchedUser
              key={result?.user_id}
              userId={result?.user_id}
              userImage={result?.profile_pic}
              userName={result?.username}
              postName={result?.post_title}
            />
          ))
        ) : (
          <h1>No results found</h1>
        )}
      </div>
    </motion.div>
  );
};

export default SearchForm;
