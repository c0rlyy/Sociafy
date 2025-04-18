import { useEffect } from "react";

export const useReadyRefs = <T>(
  ref: React.RefObject<T>,
  fn: (ref: React.RefObject<T>) => void,
) => {
  useEffect(() => {
    if (ref.current) {
      fn(ref);
    }
  }, [ref.current]);
};
