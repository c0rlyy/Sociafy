import { Suspense, useEffect, useRef, useState } from "react";
import DefaultAvatar from "../Avatar/Avatar";
import Dots from "../Dots/dots";
import { getFileBlobData, getUserData, getUserDataById } from "../../api/auth";
import { File } from "../../types/auth";
import PostComments from "./PostComments";
import PostLikes from "./PostLikes";
import { PostImages } from "./PostImages";
import Loader from "../../pages/Loader/Loader";

// changed props post, like doesnt make sense to be a prop since it should be only internal state of the post itself
// also changed props names to better reflect their actual content
// kocham reacta
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
  const [imagesState, setImagesState] = useState<string[] | null>(null);
  const avatarImgRef = useRef<HTMLImageElement>(null);
  const userNameRef = useRef<HTMLSpanElement>(null);
  const userNamePRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const getImageUrlBlobs = async () => {
      try {
        if (avatarFileId) {
          getFileBlobData(avatarFileId).then((blob) => {
            const url = getImageUrlFromBlob(blob);
            if (avatarImgRef.current) {
              avatarImgRef.current.src = url;
            }
          });
        }
        //TODO to many request for username for the same user lol
        getUserDataById(userId).then((user) => {
          if (userNameRef.current && userNamePRef.current) {
            userNameRef.current.textContent = user?.user_name;
            userNamePRef.current.textContent = user.user_name;
          }
        });

        const results = await Promise.all([
          ...imageFiles.map((file) => getFileBlobData(file.file_id)),
        ]);

        setImagesState(results.map((v) => getImageUrlFromBlob(v)));
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
              ref={avatarImgRef}
              alt={`user's avatar`}
              className="h-8 w-8 rounded-full object-cover"
            />
          ) : (
            <DefaultAvatar />
          )}
          <div>
            <p ref={userNamePRef} className="text-sm font-medium"></p>
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
          <span ref={userNameRef} className="font-medium">
            .....
          </span>{" "}
          {description}
        </p>
      </div>
      <PostComments postId={postId}></PostComments>
    </div>
  );
}
