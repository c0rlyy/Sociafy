import { usePostStore } from "../../../../../store/post-store.";
import BackIcon from "../../../../molecules/Icon/BackIcon";
import { useMutation } from "@tanstack/react-query";
import { createPost } from "../../../../../api/post";
import { UserT } from "../../../../../types/auth";
import toast from "react-hot-toast";
import useModalStore from "../../../../../store/modalStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema } from "../../../../../schemas/schemas";
import { z } from "zod";
import { useStepper } from "../../../../../store/stepper-store";
import { useAuthStore } from "../../../../../store/auth-store.";
import { useEffect } from "react";
import PostPreview from "../../../../molecules/Post/PostPreview";
import { tryCatchErrorHandler } from "../../../../../utils/error";
import { useError } from "../../../../../store/ErrorContext";
import { Box } from "../../../../atoms/Container/Container";
import { Stack } from "../../../../atoms/Stack/Stack";
import { Heading } from "../../../../atoms/Typography/Typography";
import ButtonGroup from "../../../../molecules/ButtonGroup/ButtonGroup";
import Button from "../../../../atoms/Button/Button";

type FormValues = z.infer<typeof postSchema>;
export default function PreviewStep({ user }: { user: UserT }) {
  const { postData, flushPostData } = usePostStore();
  const { close } = useModalStore();
  const { profilePictureUrl } = useAuthStore();
  const { onBack } = useStepper();
  const { showError } = useError();
  const {
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(postSchema),
  });
  const { mutate, isPending } = useMutation({
    mutationFn: createPost,
    mutationKey: ["postData"],
    onSuccess: () => {
      toast.success("Post created successfully");
      close();
      flushPostData();
      onBack();
    },
    onError: (error) => {
      tryCatchErrorHandler(error, showError);
    },
  });
  const createPostHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({
      data: postData.caption,
      uploaded_files: postData.files,
    });
  };
  useEffect(() => {
    console.log(postData.files);
  }, [postData.files]);
  return (
    <Box>
      <BackIcon />
      <form onSubmit={createPostHandler}>
        <Stack direction="col" justify="center" align="center">
          <Box padding="sm">
            <Stack direction="col" gap="md">
              <Box>
                <Stack direction="col" justify="center" align="center">
                  <Heading level={1}>Preview</Heading>
                  <Heading level={4}>Here is your preview of post</Heading>
                </Stack>
              </Box>
              <PostPreview
                postId={1000}
                userId={user.id}
                imageFiles={postData.files}
                username={user.user_name as string}
                avatarUrl={profilePictureUrl || ""}
                images={postData.files as File[]}
                caption={postData.caption}
                likes={1000}
                comments={0}
                createdAt={new Date().toISOString()}
                location={"New York"}
                isLiked={true}
              />
              <ButtonGroup>
                <Button
                  variant="primary"
                  size="lg"
                  type="submit"
                  isLoading={isPending}
                >
                  {isPending && <span>Loading...</span>}
                  Create
                </Button>
                <Button variant="secondary" size="lg" type="button">
                  Cancel
                </Button>
              </ButtonGroup>
            </Stack>
          </Box>
        </Stack>
      </form>
    </Box>
  );
}
