import { useAuthStore } from "../../../store/auth-store.";
import { useEffect, useRef, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import Loader from "../../../pages/Loader/Loader";
import {} from "../../../api/auth";
import UserInfoCard from "./UserPanel";
import { useError } from "../../../store/ErrorContext";
import { tryCatchErrorHandler } from "../../../utils/error";
import UserPosts from "./UserPosts";
import Badge from "../../atoms/Badge/Badge";
import UserImage from "../../atoms/Avatar/UserImage";
import UserAvatar from "./UserAvatar";
import UserPanel from "./UserPanel";
import Icon from "../../molecules/Icon/Icon";
import Button from "../../atoms/Button/Button";
import Avatar from "../../atoms/Avatar/Avatar";
export default function UserInfo() {
  const getUser = useAuthStore((state) => state.getUser);
  const user = useAuthStore(useShallow((state) => state.user));
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const { logoutHandler } = useAuthStore();
  const handleVisibility = () => {
    console.log("clicked");
    setIsVisible(!isVisible);
  };
  const { showError } = useError();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const dat = await getUser();
        console.log(dat);
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
  console.log(user?.profile_picture);
  if (!user) {
    showError({ error: "error while getting user data, logging out" });
    return;
  }
  return (
    <div className="relative flex w-full items-center justify-end gap-4  p-4">
      <Button variant="primary" size="sm" onClick={logoutHandler}>
        Logout
      </Button>
      <UserAvatar />
      {isVisible && <UserPanel user={user} />}
    </div>
  );
}
