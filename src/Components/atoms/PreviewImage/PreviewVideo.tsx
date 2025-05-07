import { useState, useRef } from "react";
import { Box } from "../Container/Container";
import { Stack } from "../Stack/Stack";
import Button from "../Button/Button";

export default function PreviewVideo({
  url,
  removeFileHandlerProp,
}: {
  url: string;
  removeFileHandlerProp: () => void;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted] = useState(true);
  const [, setShowControls] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = () => {
    const video = videoRef.current;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <Box rounded="lg" className="relative size-32">
      {/* Video Element */}
      <Box
        className="relative h-full w-full"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
        onClick={togglePlay}
      >
        <Stack className="h-full w-full " justify="center" direction="col">
          <Box className="h-full w-full">
            <video
              ref={videoRef}
              src={url}
              className="h-full w-full object-cover"
              muted={isMuted}
              onEnded={() => setIsPlaying(false)}
            />
            {/* Play Indicator */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </div>
            )}
          </Box>
          <Button
            type="button"
            onClick={removeFileHandlerProp}
            size="sm"
            variant="secondary"
            className="w-full"
          >
            Remove
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
