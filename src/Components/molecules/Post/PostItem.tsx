import { useEffect, useState } from "react";

import { getUserDataById } from "../../../api/auth";
import PostComments from "./PostComments";
import PostLikes from "./PostLikes";
import { PostFiles } from "./PostFiles";
import Loader from "../../../pages/Loader/Loader";
import { getFileBlobData } from "../../../api/file";
import { File } from "../../../types/file";
import { tryCatchErrorHandler } from "../../../utils/error";
import { useError } from "../../../store/ErrorContext";
import UserAvatar from "../../organisms/UserInfo/UserAvatar";
import Dots from "../../atoms/Dots/dots";
import { Box, Container } from "../../atoms/Container/Container";
import { Card, CardBody, CardFooter, CardHeader } from "../Card/Card";
import { Stack } from "../../atoms/Stack/Stack";
import { Paragraph } from "../../atoms/Typography/Typography";
import PostActions from "./PostActions";
export type PostItemPropsT = {
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
    console.log(imageFiles);
    getImageUrlBlobs();
  }, []);

  if (!fileState) {
    return <Loader></Loader>;
  }

  return (
    <Card
      color="#000"
      variant="default"
      className=" mx-auto flex w-[500px] flex-col gap-2 "
    >
      <CardHeader>
        <Box>
          <Stack direction="row" justify="start" align="center">
            <UserAvatar />
            <Paragraph size="sm" variant="default">
              {userName}
            </Paragraph>
          </Stack>
        </Box>
      </CardHeader>
      <CardBody>
        <PostFiles fileData={fileState} />
      </CardBody>
      <CardFooter>
        <Box padding="sm">
          <Stack direction="col" justify="center" gap="sm">
            <PostActions />
            <PostLikes postId={postId} />
            <PostComments postId={postId} />
          </Stack>
        </Box>
      </CardFooter>
    </Card>
  );
}
