import React, { useEffect, useState } from "react";

type CurrentUser = {
  user_name: string;
};
type CurrentUserProfile = {
  description: null;
  profile_id: number;
  picture_id: number;
};
const useMe = () => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | undefined>(
    undefined,
  );
  useEffect(() => {
    const fetchCurrentUser = async (): Promise<CurrentUser> => {
      try {
        const response = await fetch("http://localhost:8000/users/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        if (!response.ok) {
          throw new Error(
            `Failed to fetch current user: ${response.status}: ${response.statusText}`,
          );
        }
        const data: CurrentUser = await response.json();
        if (data) {
          setCurrentUser(data);
          return data;
        }
      } catch (error) {
        console.log(error?.message);
      }
    };
    fetchCurrentUser();
  }, []);
  return { currentUser };
};

export default useMe;
