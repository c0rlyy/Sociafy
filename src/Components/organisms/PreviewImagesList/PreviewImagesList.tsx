import { ChangeEvent, forwardRef } from "react";
import { convertFileToUrl } from "../../../utils/helpers";
import { Box } from "../../atoms/Container/Container";
import PreviewImage from "../../atoms/PreviewImage/PreviewImage";
import PreviewVideo from "../../atoms/PreviewImage/PreviewVideo";
import { Stack } from "../../atoms/Stack/Stack";
import InsertImage from "../../molecules/InsertImage/InsertImage";

export const PreviewImagesList = forwardRef(
  (
    {
      previewFiles,
      removeFileHandler,
      handleFileChangeProp,
      handleClickProp,
    }: {
      previewFiles: File[];
      removeFileHandler: (index: number) => void;
      handleFileChangeProp: (e: ChangeEvent<HTMLInputElement>) => void;
      handleClickProp: () => void;
    },
    ref,
  ) => {
    const previewFilesMapFc = (previewFile: File, index: number) => {
      return (
        <>
          {previewFile.type.includes("image") ? (
            <PreviewImage
              removeFileHandlerProp={() => removeFileHandler(index)}
              url={convertFileToUrl(previewFile)}
              key={index}
            />
          ) : (
            <PreviewVideo
              removeFileHandlerProp={() => removeFileHandler(index)}
              url={convertFileToUrl(previewFile)}
              key={index}
            />
          )}
        </>
      );
    };

    return (
      <Box className="h-full w-full ">
        <Stack className="" direction="row" gap="md" wrap>
          {previewFiles.map(previewFilesMapFc)}
          <InsertImage
            handleChange={handleFileChangeProp}
            handleClick={handleClickProp}
            ref={ref}
          />
        </Stack>
      </Box>
    );
  },
);
