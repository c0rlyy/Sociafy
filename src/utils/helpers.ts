import toast from "react-hot-toast";

export const highNumbersConverter = (number: number) => {
  if (number < 1000) {
    return number;
  } else if (number < 1000000) {
    const dividedByThousand = (number / 1000).toFixed(1);
    return dividedByThousand.endsWith(".0")
      ? `${dividedByThousand.slice(0, -2)}k`
      : `${dividedByThousand}k`;
  } else {
    const milionFollows = (number / 1000000).toFixed(1);

    return milionFollows.endsWith(".0")
      ? `${milionFollows.slice(0, -2)}M`
      : `${milionFollows}M`;
  }
};

export const checkFileType = (file: File) => {
  const allowedImageFormats = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/heic",
    "image/heif",
  ];

  const allowedVideoFormats = [
    "video/mp4",
    "video/quicktime",
    "video/x-msvideo",
    "video/webm",
  ];
  const mergedAllowedFormats = [...allowedImageFormats, ...allowedVideoFormats];
  if (!mergedAllowedFormats.includes(file.type)) {
    toast.error("File format is not supported");
    return {
      valid: false,
      error:
        "File format not supported. Please upload a JPEF, PNG, WEBP, HEIC or MP4",
    };
  }
  const maxImageSize = 30 * 1024 * 1024;
  const maxVideoSize = 650 * 1024 * 1024;
  const isVideo = allowedVideoFormats.includes(file.type);
  const maxSize = isVideo ? maxVideoSize : maxImageSize;

  if (file.size > maxSize) {
    const sizeInMB = Math.round(maxSize / (1024 * 1024));
    toast.error("File is too big");
    return {
      valid: false,
      error: `${isVideo ? "Video" : "Image"} size exceeds the ${sizeInMB}MB limit.`,
    };
  }

  return { valid: true };
};
export const convertFileToUrl = (file: File) => {
  return URL.createObjectURL(file);
};
