/* eslint-disable @typescript-eslint/no-misused-promises */
import { useStepper } from "../../../../../store/stepper-store";
import BackIcon from "../../../../molecules/Icon/BackIcon";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema } from "../../../../../schemas/schemas";
import { usePostStore } from "../../../../../store/post-store.";
import { z } from "zod";
import { SubmitHandler } from "react-hook-form";
import { Box } from "../../../../atoms/Container/Container";
import { Stack } from "../../../../atoms/Stack/Stack";
import { Heading } from "../../../../atoms/Typography/Typography";
import { Textarea } from "../../../../atoms/Textarea/Textarea";
import ButtonGroup from "../../../../molecules/ButtonGroup/ButtonGroup";
import Button from "../../../../atoms/Button/Button";
type FormValues = z.infer<typeof postSchema>;
export default function CaptionStep() {
  const caption = postSchema.pick({ caption: true });
  const { postData } = usePostStore();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({ resolver: zodResolver(caption) });
  const { onNext } = useStepper();
  const { updateField } = usePostStore();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    updateField("caption", data.caption);
    onNext();
  };
  return (
    <Box padding="xl">
      <BackIcon />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="col" justify="center" align="center">
          <Box className="text-center">
            <Heading level={1}>Caption </Heading>
            <Heading level={4}>Enter your post content</Heading>
          </Box>
          <Box className="flex w-full flex-col">
            <Textarea
              {...register("caption")}
              className="min-h-[500px]"
              placeholder="Post content here..."
              name="caption"
              defaultValue={postData.caption}
            />
          </Box>
          {errors.caption && (
            <span className="text-red-500">{errors?.caption?.message}</span>
          )}
          <ButtonGroup>
            <Button size="lg" variant="primary" type="submit">
              Next
            </Button>
          </ButtonGroup>
        </Stack>
      </form>
    </Box>
  );
}
