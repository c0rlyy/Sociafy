import { useAuthStore } from "../../store/authStore";
import { useEffect, useRef, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import Loader from "../../pages/Loader/Loader";
import {} from "../../api/auth";
import UserInfoCard from "./UserInfoCard";
import { useError } from "../../store/ErrorContext";
import { tryCatchErrorHandler } from "../../utils/error";
import UserPosts from "./UserPosts";

export default function UserInfo() {
  const getUser = useAuthStore((state) => state.getUser);
  const user = useAuthStore(useShallow((state) => state.user));

  const [isLoading, setIsLoading] = useState(true);
  const { showError } = useError();

  //TODO mayvbe move state down
  useEffect(() => {
    const fetchUser = async () => {
      try {
        await getUser();
      } catch (error) {
        tryCatchErrorHandler(error, showError);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (isLoading) {
    return <Loader></Loader>;
  }

  if (!user) {
    showError({ error: "error while getting user data, logging out" });
    return;
  }

  return (
    <div className="grid grid-cols-3 h-screen overflow-hidden">
      <div className="col-span-1 p-4">
        <UserInfoCard user={user} />
      </div>

      <div className="col-span-2 h-screen overflow-y-auto p-4">
        <UserPosts user={user} />
      </div>
    </div>

  );
}
