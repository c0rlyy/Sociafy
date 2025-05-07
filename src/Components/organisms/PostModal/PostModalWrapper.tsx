import { useMediaQuery } from "react-responsive";
import MobilePostModal from "./Mobile/MobilePostModal";
import DesktopPostModal from "./DesktopPostModal";
import { useAuthStore } from "../../../store/auth-store.";
export default function PostModalWrapper(props) {
  const isMobile = useMediaQuery({ maxWidth: 1024 });
  const { user } = useAuthStore();
  return (
    <>
      {isMobile ? (
        <MobilePostModal user={user} {...props} />
      ) : (
        <DesktopPostModal user={user} {...props} />
      )}
    </>
  );
}
