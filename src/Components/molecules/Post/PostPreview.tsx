import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import UserAvatar from "../../organisms/UserInfo/UserAvatar";

import HeartIcon from "../Icon/HeartIcon";
import MessageIcon from "../Icon/MessageIcon";
import { highNumbersConverter } from "../../../utils/helpers";
import Dots from "../../atoms/Dots/dots";
type PostItemPropsT = {
  username: string;
  avatarUrl: string;
  images: File[];
  caption: string;
  likes: number;
  comments: number;
  createdAt: string;
  location: string;
  isLiked: boolean;
};

export default function PostPreview({
  username,
  avatarUrl,
  images,
  caption,
  likes,
  comments,
  createdAt,
  location,
  isLiked,
}: PostItemPropsT) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
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

  useEffect(() => {
    if (images && images.length > 0) {
      const urls = images.map((file) => URL.createObjectURL(file));
      setImageUrls(urls);
      setIsLoading(false);
      return () => {
        urls.forEach((url) => URL.revokeObjectURL(url));
      };
    }
  }, [images]);

  return (
    <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 p-3">
        <div className="flex items-center gap-2">
          <UserAvatar />
          <p className="text-sm font-medium text-gray-800">{username}</p>
          {location && (
            <span className="text-xs text-gray-500">{location}</span>
          )}
        </div>
        <button className="text-gray-500 hover:text-gray-700">
          <Dots />
        </button>
      </div>

      {/* Image Carousel */}
      <div className="relative aspect-square w-full overflow-hidden bg-gray-50">
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
            className="absolute inset-0 h-full w-full"
          >
            {isLoading ? (
              <div className="flex h-full items-center justify-center">
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-500"></div>
                  <span className="text-sm text-gray-500">Loading...</span>
                </div>
              </div>
            ) : imageUrls[currentIndex]?.endsWith(".mp4") ? (
              <video
                className="h-full w-full object-cover"
                controls
                src={imageUrls[currentIndex]}
              />
            ) : (
              <img
                className="h-full w-full object-cover"
                alt="post media"
                src={imageUrls[currentIndex]}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              type="button"
              className="absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black bg-opacity-30 text-lg font-bold text-white hover:bg-opacity-50 focus:outline-none"
            >
              ‹
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black bg-opacity-30 text-lg font-bold text-white hover:bg-opacity-50 focus:outline-none"
              type="button"
            >
              ›
            </button>

            {/* Dots indicators */}
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  type="button"
                  className={`h-2 w-2 rounded-full transition-all ${
                    currentIndex === index
                      ? "w-3 bg-white"
                      : "bg-white bg-opacity-50 hover:bg-opacity-70"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Actions and Caption */}
      <div className="p-3">
        <div className="flex items-center justify-between pb-2">
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="text-gray-800 transition-colors hover:text-red-500"
            >
              <HeartIcon />
            </button>
            <button
              type="button"
              className="text-gray-800 transition-colors hover:text-blue-500"
            >
              <MessageIcon />
            </button>
          </div>
          {likes > 0 && (
            <p className="text-sm font-medium">
              {likes} {likes === 1 ? "like" : "likes"}
            </p>
          )}
        </div>

        {caption && (
          <p className="mt-1 w-[30ch] truncate text-sm text-gray-800">
            <span className="font-medium">{username}</span>{" "}
            <span className="w-[10ch] truncate text-gray-500">{caption}</span>
          </p>
        )}

        {comments > 0 && (
          <p className="mt-1 text-xs text-gray-500">
            View all {highNumbersConverter(comments)} comments
          </p>
        )}

        <p className="mt-2 text-xs text-gray-400">{createdAt}</p>
      </div>
    </div>
  );
}
