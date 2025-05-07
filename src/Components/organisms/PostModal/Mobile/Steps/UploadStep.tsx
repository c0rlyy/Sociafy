import { useRef } from "react";
import type { ChangeEvent } from "react";
import { usePostStore } from "../../../../../store/post-store.";
import { useStepper } from "../../../../../store/stepper-store";
import { postSchema } from "../../../../../schemas/schemas";
import toast from "react-hot-toast";
import useModalStore from "../../../../../store/modalStore";
import { useError } from "../../../../../store/ErrorContext";
import { tryCatchErrorHandler } from "../../../../../utils/error";
import { Box } from "../../../../atoms/Container/Container";
import { Stack } from "../../../../atoms/Stack/Stack";
import { Heading, Paragraph } from "../../../../atoms/Typography/Typography";
import Label from "../../../../atoms/Label";
import ButtonGroup from "../../../../molecules/ButtonGroup/ButtonGroup";
import Button from "../../../../atoms/Button/Button";
import { PreviewImagesList } from "../../../PreviewImagesList/PreviewImagesList";

export default function UploadStep() {
  const fileRef = useRef<HTMLInputElement>(null);
  const { onNext } = useStepper();
  const { close } = useModalStore();
  const { showError } = useError();
  const { updateField, postData, removePostFile, flushPostData } =
    usePostStore();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0] && e.target.files) {
      const selectedFile = e.target.files;
      const filesSchema = postSchema.pick({ files: true });
      const result = filesSchema.safeParse({ files: selectedFile });
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
  const handleClick = () => {
    fileRef.current?.click();
  };
  const removeFileHandler = (index: number) => {
    removePostFile(index);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (postData.files.length === 0) {
        showError({ error: "Please upload at least one file" });
        return;
      }
      onNext();
    } catch (error) {
      tryCatchErrorHandler(error, showError);
    }
  };
  return (
    <Box padding="md" margin="sm">
      <form onSubmit={onSubmit} className="flex flex-col">
        <Stack
          className=" w-full"
          direction="col"
          justify="center"
          align="center"
          gap="md"
        >
          <Heading level={1}>Upload file</Heading>
          <Heading level={4}>Insert file</Heading>
          <Box shadow="md" className="h-96 w-full " padding="md" margin="lg">
            <Label text="ADD IMAGES" variant="default" htmlFor="add-images" />
            <Stack className="h-full" gap="md" direction="col">
              <Box className="h-full overflow-y-scroll">
                <PreviewImagesList
                  previewFiles={postData.files}
                  removeFileHandler={removeFileHandler}
                  handleClickProp={handleClick}
                  handleFileChangeProp={handleFileChange}
                  ref={fileRef}
                />
              </Box>
            </Stack>
          </Box>
        </Stack>
        <ButtonGroup className="border-2 border-red-400">
          <Button size="lg" type="submit" variant="primary">
            Next
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="lg"
            onClick={() => {
              close();
              flushPostData();
            }}
          >
            Cancel
          </Button>
        </ButtonGroup>
      </form>
    </Box>
  );
}
