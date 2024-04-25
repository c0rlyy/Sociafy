import { useEffect, useState } from "react";

const useFetchUrl = (pictureID: string | null) => {
  const [pictureUrl, setPictureUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchUrl = async () => {
      if (!pictureID) {
        // If pictureID is null, no need to fetch
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:8000//api/v1/file-retrive/${JSON.parse(pictureID)}`,
        );
        if (!response.ok) {
          throw new Error(
            `fetchUrl: ${response.status}: ${response.statusText}`,
          );
        }
        const data = await response.url;
        if (data) {
          console.log(`fetchUrl Result ${data}`);
          setPictureUrl(data);
        } else {
          console.log("Empty response received");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUrl();
  }, [pictureID]);

  return { pictureUrl };
};

export default useFetchUrl;
