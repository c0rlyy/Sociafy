import { useEffect, useState } from "react";
import { FileData } from "./PostItem";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Container } from "../../atoms/Container/Container";
import { Image } from "../../atoms/Image/Image";
type PostFilesProps = {
  fileData: FileData[];
  aspectRatio?: "square" | "video" | "auto";
  className?: string;
};

export const PostFiles = ({
  fileData,
  aspectRatio = "square",
  className = "",
}: PostFilesProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const files = fileData;

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? files.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === files.length - 1 ? 0 : prev + 1));
  };

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
  };

  // Determine aspect ratio class
  const aspectRatioClass = {
    square: "aspect-square",
    video: "aspect-video",
    auto: "",
  }[aspectRatio];

  return (
    <Box className={className}>
      <Box
        className={`relative m-0 mx-auto size-full overflow-hidden  rounded-lg ${aspectRatioClass}`}
        shadow="sm"
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute size-full "
          >
            {files[currentIndex]?.path.includes("images") ? (
              <Image
                alt={`Post media ${currentIndex + 1}`}
                src={files[currentIndex]?.fileUrl}
              />
            ) : (
              <video
                className="h-full w-full object-cover"
                controls
                src={files[currentIndex]?.fileUrl}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {files.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black bg-opacity-50 p-2 text-xl text-white transition-all hover:bg-opacity-70"
            >
              ‹
            </button>
            <button
              onClick={handleNext}
              aria-label="Next image"
              className="absolute right-2 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black bg-opacity-50 p-2 text-xl text-white transition-all hover:bg-opacity-70"
            >
              ›
            </button>
            <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
              {files.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to image ${index + 1}`}
                  className={`h-2.5 w-2.5 rounded-full transition-all ${
                    currentIndex === index
                      ? "scale-125 bg-white"
                      : "bg-white bg-opacity-50 hover:bg-opacity-75"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </Box>
    </Box>
  );
};
