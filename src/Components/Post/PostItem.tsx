import { Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import DefaultAvatar from "../Avatar/Avatar";
import Dots from "../Dots/dots";
import { getUserData, getUserDataById } from "../../api/auth";
import PostComments from "./PostComments";
import PostLikes from "./PostLikes";
import { PostFiles } from "./PostFiles";
import Loader from "../../pages/Loader/Loader";
import { getFileBlobData } from "../../api/file";
import { File } from "../../types/file";
import { tryCatchErrorHandler } from "../../utils/error";
import { useError } from "../../store/ErrorContext";
import UserAvatar from "../UserInfo/UserAvatar";

export type PostItemPropsT = {
  avatarFileId: number | null | undefined;
  imageFiles: File[];
  description: string | null;
  postId: number;
  userId: number;
};

export type ImagesState = {
  imagesUrls: undefined | string[];
};

export type FileData = File & {
  fileUrl: string;
};

export const getImageUrlFromBlob = (imageBlob: Blob) => {
  return URL.createObjectURL(imageBlob);
};

export default function PostItem({
  avatarFileId,
  imageFiles,
  description,
  postId,
  userId,
}: PostItemPropsT) {
  const [fileState, setFileState] = useState<FileData[] | null>(null);
  const [userName, setUserName] = useState("");
  const { showError } = useError();

  useEffect(() => {
    const getImageUrlBlobs = async () => {
      try {
        const results = await Promise.all([
          getUserDataById(userId),
          ...imageFiles.map((file) => getFileBlobData(file.file_id)),
        ]);
        setUserName(results[0].user_name);
        const blobs = results.slice(1) as Blob[];
        blobs.forEach((blob) => {
          console.info(blob.type);
        });
        const filesWithUrls: FileData[] = imageFiles.map((file, idx) => ({
          ...file,
          fileUrl: getImageUrlFromBlob(blobs[idx]),
        }));
        setFileState(filesWithUrls);
      } catch (e) {
        console.log(e);
        tryCatchErrorHandler(e, showError);
      }
    };
    getImageUrlBlobs();
  }, []);

  if (!fileState) {
    return <Loader></Loader>;
  }

  return (
    <div className="mb-4 w-full rounded-md border border-gray-200 bg-white">
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center space-x-2">
          <UserAvatar profilePicutreId={avatarFileId}></UserAvatar>
          <div>
            <p className="text-sm font-medium">{userName}</p>
          </div>
        </div>
        <Dots />
      </div>
      <div className="relative h-[500px]">
        <PostFiles fileData={fileState}></PostFiles>
      </div>
      <PostLikes postId={postId}></PostLikes>
      <div className="px-3 pb-2">
        <p className="text-sm">
          <span className="font-medium">{userName}</span> {description}
        </p>
      </div>
      <PostComments postId={postId}></PostComments>
    </div>
  );
}
