import { ReactNode, useEffect, useRef, useState } from "react";

type InfiniteScrollProps<T> = {
  fetchData: (nextPage: number) => Promise<void>;
  itemsList: T[];
  mapFn: (value: T) => JSX.Element;
  children?: React.ReactNode;
  treshold?: number;
};

export default function InfiniteScroll<T>({
  fetchData,
  itemsList,
  mapFn,
  children,
  treshold = 0.4,
}: InfiniteScrollProps<T>) {
  const [page, setPage] = useState(1);
  const observerTarget = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setPage((prevPage) => {
              const nextPage = prevPage + 1;
              fetchData(nextPage);
              return nextPage;
            });
          }
        });
      },
      { threshold: treshold },
    );

    const target = observerTarget.current;
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [observerTarget]);

  return (
    <>
      <div>
        {itemsList.map(mapFn)}
        <div ref={observerTarget} className="h-10" />
      </div>
      {children}
    </>
  );
}
