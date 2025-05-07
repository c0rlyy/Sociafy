import React, { forwardRef, useRef, useEffect, useState } from "react";
import type { ImageSize } from ".";
export interface IconProps {
  className: string;
  size: ImageSize;
}

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  threshold?: number;
  rootMargin?: string;
}

export const Image = forwardRef<HTMLImageElement, ImageProps>(
  ({ threshold = 0.1, rootMargin = "0px", ...props }, ref) => {
    const imageRef = useRef<HTMLImageElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const combinedRef = (node: HTMLImageElement) => {
      imageRef.current = node;

      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    useEffect(() => {
      const currentRef = imageRef.current;
      if (!currentRef) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !isLoaded) {
              const target = entry.target as HTMLImageElement;

              const dataSrc = target.getAttribute("data-src");
              if (dataSrc) {
                target.src = dataSrc;
              }

              setIsLoaded(true);
              observer.unobserve(target);
            }
          });
        },
        {
          threshold,
          rootMargin,
        },
      );

      observer.observe(currentRef);

      return () => {
        if (currentRef) {
          observer.unobserve(currentRef);
        }
      };
    }, [threshold, rootMargin, isLoaded]);

    return (
      <img
        ref={combinedRef}
        className="h-full w-full object-cover"
        {...props}
      />
    );
  },
);

Image.displayName = "Image";
