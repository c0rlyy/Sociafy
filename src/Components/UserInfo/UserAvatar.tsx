import { useEffect, useState } from "react";
import DefaultAvatar from "../Avatar/Avatar";
import { getFileBlobData } from "../../api/file";
import { getImageUrlFromBlob } from "../Post/PostItem";
import Loader from "../../pages/Loader/Loader";
import { tryCatchErrorHandler } from "../../utils/error";
import { useError } from "../../store/ErrorContext";

type UserAvatarProps = {
  profilePicutreId: number | null | undefined;
};

export default function UserAvatar({ profilePicutreId }: UserAvatarProps) {
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { showError } = useError();

  useEffect(() => {
    const fetchImage = async () => {
      if (!profilePicutreId) {
        setLoading(false);
        return;
      }
      try {
        const blob = await getFileBlobData(profilePicutreId);
        const url = getImageUrlFromBlob(blob);
        setProfilePicture(url);
      } catch (error) {
        console.error("Error loading profile picture:", error);
        tryCatchErrorHandler(error, showError);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [profilePicutreId]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="">
      {profilePicture ? (
        <img src={profilePicture} className="max-h-10" alt="User Avatar" />
      ) : (
        <DefaultAvatar />
      )}
    </div>
  );
}
