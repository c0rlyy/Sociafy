const { useEffect, useState } = require("react");

const useLoading = () => {
  const [isLoading, setIsLoading] = useState(false);
  const startLoading = () => {
    setIsLoading(true);
  };
  const stopLoading = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    startLoading();
    const delay = setTimeout(() => {
      stopLoading();
    }, 2000);
    return () => {
      clearTimeout(delay);
    };
  }, []);
  return { startLoading, stopLoading, isLoading };
};
export default useLoading;
