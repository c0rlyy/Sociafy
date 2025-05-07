import type { UserT } from "../../../types/auth";
import { ChangeEvent, useEffect, useRef } from "react";
import PostItem from "../../molecules/Post/PostPreview";
import { usePostStore } from "../../../store/post-store.";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema } from "../../../schemas/schemas";
import { z } from "zod";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { createPost } from "../../../api/post";
import useModalStore from "../../../store/modalStore";
import { useAuthStore } from "../../../store/auth-store.";
import UserAvatar from "../UserInfo/UserAvatar";
import Modal, { ModalBody, ModalHeader } from "../../molecules/Modal/Modal";
import { Heading, Paragraph } from "../../atoms/Typography/Typography";
import Grid from "../../atoms/Grid/Grid";
import { GridItem } from "../../atoms/GridItem/GridItem";
import { Box } from "../../atoms/Container/Container";
import { Stack } from "../../atoms/Stack/Stack";
import Button from "../../atoms/Button/Button";
import Label from "../../atoms/Label";
import { Textarea } from "../../atoms/Textarea/Textarea";

import ButtonGroup from "../../molecules/ButtonGroup/ButtonGroup";
import { PreviewImagesList } from "../PreviewImagesList/PreviewImagesList";
type FormValues = z.infer<typeof postSchema>;
export default function DesktopPostModal({ user }: { user: UserT }) {
  const { postData, updateField, removePostFile, flushPostData } =
    usePostStore();
  const { profilePictureUrl } = useAuthStore();
  const { close } = useModalStore();
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      caption: "",
      files: [],
    },
  });
  const watchedTitle = watch("caption");
  const fileRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    fileRef.current?.click();
    console.log("Opened file !");
  };
  const removeFileHandler = (index: number) => {
    removePostFile(index);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0] && e.target.files) {
      const selectedFile = e.target.files;
      console.log(selectedFile);
      if (!selectedFile) return;
      const fileUploadSchema = postSchema.pick({ files: true });
      const result = fileUploadSchema.safeParse({ files: selectedFile });
      if (postData.files.length > 2) {
        toast.error("You can have 3 files only ");
        return;
      }
      if (result.success) {
        updateField("files", result.data.files);
        return;
      } else {
        toast.error(result.error.errors[0].message);
      }
    }
  };
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormValues) => {
      await createPost({
        data: data.caption,
        uploaded_files: data.files,
      });
    },
    onSuccess: () => {
      toast.success("Post created successfully");
      flushPostData();
      close();
    },
    onError: () => {
      toast.error("Post creation failed");
    },
  });

  useEffect(() => {
    const initializer = setTimeout(() => {
      updateField("caption", watchedTitle);
    }, 1500);
    return () => {
      clearTimeout(initializer);
    };
  }, [watchedTitle, updateField]);
  const createPostHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(postData);
  };
  return (
    <Modal size="full">
      <ModalHeader>
        <Heading level={6} variant="default">
          Create Post
        </Heading>
      </ModalHeader>
      <ModalBody>
        <Grid columns={2} gap={50}>
          <GridItem colStart={1} colEnd={2}>
            <form onSubmit={createPostHandler}>
              <Box padding="md" className="w-full ">
                <Stack direction="row" align="center">
                  <Stack direction="row" justify="center" align="center">
                    <UserAvatar />
                    <Paragraph>{user.user_name}</Paragraph>
                  </Stack>
                  <Box>
                    <Stack direction="row" justify="center" align="center">
                      <Button size="md" variant="primary">
                        Switch Account
                      </Button>
                    </Stack>
                  </Box>
                </Stack>
              </Box>
              <Box padding="sm" margin="sm">
                <Stack gap="md" direction="col">
                  <Label text={"CAPTION"} htmlFor="caption" />
                  <Textarea
                    {...register("caption")}
                    placeholder="Enter your post content"
                    className="h-48"
                  />

                  <Paragraph
                    className="place-self-end"
                    size="sm"
                    variant="muted"
                  >{`Characters ${watch("caption").length}/2200`}</Paragraph>
                </Stack>
                {errors && (
                  <Paragraph variant="default">
                    {errors.caption?.message}
                  </Paragraph>
                )}
              </Box>
              <Box padding="md" margin="sm">
                <Stack
                  className="h-full overflow-y-scroll"
                  direction="col"
                  gap="md"
                >
                  <Label text="ADD IMAGES" htmlFor="add-images" />
                  <Stack direction="row" wrap>
                    <PreviewImagesList
                      removeFileHandler={removeFileHandler}
                      previewFiles={postData.files}
                      handleClickProp={handleClick}
                      handleFileChangeProp={handleFileChange}
                      ref={fileRef}
                    />
                  </Stack>
                </Stack>
              </Box>
              <Box padding="md" margin="lg">
                <ButtonGroup>
                  <Button
                    size="lg"
                    type="submit"
                    variant="primary"
                    isLoading={isPending}
                  >
                    Create Post
                  </Button>
                  <Button
                    onClick={close}
                    size="lg"
                    type="button"
                    variant="secondary"
                  >
                    Cancel
                  </Button>
                </ButtonGroup>
              </Box>
            </form>
          </GridItem>
          <GridItem colStart={2} colEnd={3}>
            <Box padding="md" margin="md">
              <Stack direction="col" justify="center" align="center" gap="md">
                <Heading>Preview</Heading>
                <Paragraph className="text-center">
                  Preview shows how your content will look when published.
                  Social network updates may alter for final appearance
                </Paragraph>
                <PostItem
                  username={user.user_name as string}
                  avatarUrl={profilePictureUrl || ""}
                  images={postData.files}
                  comments={0}
                  createdAt={new Date().toISOString()}
                  location={"New York"}
                  caption={postData.caption}
                  likes={1000}
                  isLiked={true}
                />
              </Stack>
            </Box>
          </GridItem>
        </Grid>
      </ModalBody>
    </Modal>
  );
}
