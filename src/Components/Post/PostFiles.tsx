import { useState } from "react";
import { FileData } from "./PostItem";

type PostImagesProps = {
  fileData: FileData[];
};

export const PostFiles = ({ fileData }: PostImagesProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = fileData;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative h-[500px] w-full overflow-hidden">
      {images[currentIndex].path.includes("images") ? (
        <img
          src={images[currentIndex].fileUrl}
          className="h-full w-full object-cover"
          alt="post media"
        />
      ) : (
        <video
          src={images[currentIndex].fileUrl}
          className="h-full w-full object-cover"
          controls
        />
      )}

      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black bg-opacity-50 p-2 text-white"
          >
            ‹
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black bg-opacity-50 p-2 text-white"
          >
            ›
          </button>
        </>
      )}
    </div>
  );
};
