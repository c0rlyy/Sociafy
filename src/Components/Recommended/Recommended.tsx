import React, { useEffect, useState } from "react";
import RecommendedItem from "./RecommendedItem";

type UserProfileProps = {
  user_name: string | null;
  picture_id: number | null;
  picture: string;
  isFollowed: boolean; // Add isFollowed to the type definition
};

const Recommended: React.FC = () => {
  const [recommendedUsers, setRecommendedUsers] = useState<UserProfileProps[]>(
    []
  );
  const [followState, setFollowState] = useState<{ [key: string]: boolean }>(
    {}
  ); // Store isFollowed state by userId

  const fetchUsers = async (): Promise<void> => {
    try {
      const resp = await fetch("http://localhost:8000/users?skip=0&limit=100", {
        method: "GET",
      });
      if (!resp.ok) {
        throw new Error(`HTTP error! Status: ${resp.status}`);
      }
      const users: UserProfileProps[] = await resp.json();

      if (users && users.length > 0) {
        const transformedUsers = users.map((item) => ({
          user_name: item.user_name,
          picture_id: item?.profile?.picture_id,
          picture: "",
          isFollowed: false, // Initialize isFollowed with false
        }));
        setRecommendedUsers(transformedUsers);
        await fetchUserProfileImage(transformedUsers);
      } else {
        console.log("No users fetched");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchUserProfileImage = async (recomm_users: UserProfileProps[]) => {
    try {
      await Promise.all(
        recomm_users.map(async (user) => {
          const { picture_id } = user;
          if (picture_id == null) {
            return;
          }
          const response = await fetch(
            `http://localhost:8000/file_retrive/${picture_id}`,
            {
              method: "GET",
            }
          );
          const data = await response.json();
          if (!response.ok) {
            console.error("Wrong Response :(");
            return;
          }
          setRecommendedUsers((prevUsers) =>
            prevUsers.map((prevUser) => {
              if (prevUser.picture_id === picture_id) {
                return { ...prevUser, picture: data };
              }
              return prevUser;
            })
          );
        })
      );
    } catch (error) {
      console.error("Error fetching photos", error);
    }
  };

  const followHandler = (userId: string) => {
    setFollowState((prevFollowState) => ({
      ...prevFollowState,
      [userId]: !prevFollowState[userId], // Toggle isFollowed state for the userId
    }));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    console.log(recommendedUsers);
  }, [recommendedUsers]);

  return (
    <div
      className={`bg-inherit md:grid grid-rows-recommendedContainer hidden col-[3/4] row-[2/3]`}
    >
      <div onClick={followHandler} className="md:row[2/3] md:grid-cols-2 grid ">
        <h1 className="font-bold col-start-1 col-end-4">
          People you might know
        </h1>
        {recommendedUsers.map((recommend, index) => (
          <RecommendedItem
            key={index}
            recommendedUser={recommend?.user_name}
            recommendedUserPhoto={recommend?.picture}
            isFollowed={followState[recommend?.user_name]}
            handleFollowClick={() => followHandler(recommend.user_name)}
          />
        ))}
      </div>
    </div>
  );
};

export default Recommended;
