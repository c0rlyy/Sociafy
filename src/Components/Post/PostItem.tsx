import { Suspense, useEffect, useState } from "react";
import DefaultAvatar from "../Avatar/Avatar";
import Dots from "../Dots/dots";
import { getFileBlobData } from "../../api/auth";
import { File } from "../../types/auth";
import PostComments from "./PostComments";
import PostLikes from "./PostLikes";
import { PostImages } from "./PostImages";
import Loader from "../../pages/Loader/Loader";

// changed props post, like doesnt make sense to be a prop since it should be only internal state of the post itself
// also changed props names to better reflect their actual content
// kocham reacta
export type PostItemPropsT = {
  username: string;
  avatarFileId: number | null | undefined;
  imageFiles: File[];
  description: string;
  postId: number;
};

export type ImagesState = {
  imagesUrls: undefined | string[];
};

export const getImageUrlFromBlob = (imageBlob: Blob) => {
  return URL.createObjectURL(imageBlob);
};

export default function PostItem({
  username,
  avatarFileId,
  imageFiles,
  description,
  postId,
}: PostItemPropsT) {
  const [imagesState, setImagesState] = useState<ImagesState>({
    imagesUrls: [],
  });
  const [avatarUrl, setAvatarUrl] = useState<string>("");

  useEffect(() => {
    const getImageUrlBlobs = async () => {
      try {
        if (avatarFileId) {
          getFileBlobData(avatarFileId).then((blob) => {
            const url = getImageUrlFromBlob(blob);
            setAvatarUrl(url);
          });
        }
        const results = await Promise.all([
          ...imageFiles.map((file) => getFileBlobData(file.file_id)),
        ]);

        setImagesState({
          imagesUrls: results.map((v) => getImageUrlFromBlob(v)),
        });
      } catch (e) {
        console.log(e);
      }
    };
    getImageUrlBlobs();
  }, []);
  if (!imagesState) {
    return <Loader></Loader>;
  }

  return (
    <div className="mb-4 w-full rounded-md border border-gray-200 bg-white">
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center space-x-2">
          {avatarFileId ? (
            <img
              src={avatarUrl}
              alt={`${username}'s avatar`}
              className="h-8 w-8 rounded-full object-cover"
            />
          ) : (
            <DefaultAvatar />
          )}
          <div>
            <p className="text-sm font-medium">{username}</p>
          </div>
        </div>
        <Dots />
      </div>
      <div className="relative h-[500px]">
        <PostImages imagesState={imagesState}></PostImages>
      </div>
      <PostLikes postId={postId}></PostLikes>
      <div className="px-3 pb-2">
        <p className="text-sm">
          <span className="font-medium">{username}</span> {description}
        </p>
      </div>
      <PostComments postId={postId}></PostComments>
    </div>
  );
}
