import { Suspense, useEffect, useState } from "react";
import DefaultAvatar from "../Avatar/Avatar";
import Dots from "../Dots/dots";
import { getFileBlobData } from "../../api/auth";
import { File } from "../../types/auth";
import PostComments from "./PostComments";
import PostLikes from "./PostLikes";
import { PostImages } from "./PostImages";

// changed props post, like doesnt make sense to be a prop since it should be only internal state of the post itself
// also changed props names to better reflect their actual content
// kocham reacta
export type PostItemPropsT = {
  username: string;
  avatarFileId: number | null;
  imageFiles: File[];
  description: string;
  postId: number;
};

type AllImagesState = {
  avatarUrl: undefined | string;
  imagesUrls: undefined | string[];
};

const getImageUrlFromBlob = (imageBlob: Blob) => {
  return URL.createObjectURL(imageBlob);
};

export default function PostItem({
  username,
  avatarFileId,
  imageFiles,
  description,
  postId,
}: PostItemPropsT) {
  const [allImagesState, setAllImagesState] = useState<AllImagesState>({
    avatarUrl: undefined,
    imagesUrls: [],
  });

  useEffect(() => {
    const getImageUrlBlobs = async () => {
      try {
        const results = await Promise.all([
          getFileBlobData(avatarFileId),
          ...imageFiles.map((file) => getFileBlobData(file.file_id)),
        ]);

        setAllImagesState({
          avatarUrl: getImageUrlFromBlob(results[0]),
          imagesUrls: results.slice(1).map((v) => getImageUrlFromBlob(v)),
        });
      } catch (e) {
        console.log(e);
      }
    };
    getImageUrlBlobs();
  }, []);
  // <Suspense fallback="loading"></Suspense>
  if (!allImagesState) {
    return <h1>wait a second</h1>;
  }

  return (
    <div className="mb-4 w-full rounded-md border border-gray-200 bg-white">
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center space-x-2">
          {avatarFileId ? (
            <img
              src={allImagesState.avatarUrl}
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
        <PostImages allImagesState={allImagesState}></PostImages>
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
