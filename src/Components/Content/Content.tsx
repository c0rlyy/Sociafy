import { useShallow } from "zustand/react/shallow";
import { useAuthStore } from "../../store/auth-store.";
import { useError } from "../../store/ErrorContext";
import Loader from "../Loader/Loader";
import { useEffect, useState } from "react";
import { tryCatchErrorHandler } from "../../utils/error";
import { useMediaQuery } from "react-responsive";
import MobileContent from "./MobileContent";
import DesktopContent from "./DesktopContent";

export default function Content() {
  const getUser = useAuthStore((state) => state.getUser);
  const user = useAuthStore(useShallow((state) => state.user));
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
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
    <div className="flex h-full w-full flex-col ">
      {isMobile ? (
        <MobileContent user={user} />
      ) : (
        <DesktopContent user={user} />
      )}
    </div>
  );
}
