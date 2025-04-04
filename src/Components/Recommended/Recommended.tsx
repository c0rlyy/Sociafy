import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { LineWave } from "react-loader-spinner";
import { User } from "../../store/UserProfile-context";
import RecommendedItem from "./RecommendedItem";

type UserProfileProps = {
  user_id: number;
  user_name: string | null;
  picture_id: number | null;
  picture: string;
  isFollowed: boolean; // Add isFollowed to the type definition
};

const Recommended: React.FC = () => {
  const [recommendedUsers, setRecommendedUsers] = useState<UserProfileProps[]>(
    [],
  );
  const [shuffledUsers, setShuffledUsers] = useState([]);
  const [followState, setFollowState] = useState<{ [key: string]: boolean }>(
    {},
  ); // Store isFollowed state by userId
  const { data: CurrentUser, isLoading: isCurrentUserLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/users/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData: User = await response.json();
        // Avoid logging sensitive information like access tokens
        console.log("Data from fetchMe:", responseData);
        if (responseData) {
          return responseData;
        }
      } catch (error: any) {
        console.error(error?.message);
      }
    },
  });
  const shuffleRecommendedUsers = (users: User[]) => {
    const shuffledArray = [...users];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };
  const filterCurrentUser = (users: UserProfileProps[], currentUser: User) => {
    const FilteredUsers = users.filter((user) => {
      return user.user_name !== currentUser.user_name;
    });
    return FilteredUsers;
  };
  const fetchUsers = async (): Promise<
    UserProfileProps[] | undefined | null
  > => {
    try {
      const resp = await fetch(
        "http://localhost:8000/api/v1/users?skip=0&limit=4",
      );
      if (!resp.ok) {
        throw new Error(`HTTP error! Status: ${resp.status}`);
      }
      const users: User[] = await resp.json();
      if (users && users.length > 0) {
        const transformedUsers: UserProfileProps[] = users.map((item) => ({
          user_id: item?.id,
          user_name: item?.user_name,
          picture_id: item?.profile?.picture_id,
          picture: "",
          profile_id: item?.profile.profile_id,
          isFollowed: false, // Initialize isFollowed with false
        }));
        const filteredUsers = filterCurrentUser(transformedUsers, CurrentUser);
        setRecommendedUsers(filteredUsers);
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
            `http://localhost:8000/api/v1/file-retrive/${JSON.parse(picture_id)}`,
          );
          if (!response.ok) {
            console.log(
              `fetchRecommended: ${response.status} ${response.statusText}`,
            );
            return;
          }
          const image = response.url;
          setRecommendedUsers((prevUsers) =>
            prevUsers.map((prevUser) => {
              if (prevUser.picture_id === picture_id) {
                return { ...prevUser, picture: image };
              }
              return prevUser;
            }),
          );
        }),
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
    if (recommendedUsers.length > 0) {
      setShuffledUsers(shuffleRecommendedUsers(recommendedUsers));
      console.log(shuffledUsers);
    }
  }, [recommendedUsers]);

  const { data: Recommended, isLoading: RecommendedLoading } = useQuery({
    queryKey: ["recommended"],
    queryFn: async () => {
      const RecommendedUsers = await fetchUsers();
      return RecommendedUsers;
    },
  });
  return (
    <div
      className={`col-[3/4] row-[1/2] hidden grid-rows-recommendedContainer  border-l-[.1px] border-inherit bg-inherit px-2 py-1 lg:grid`}
    >
      <div
        onClick={followHandler}
        className="md:row[1/-1] grid md:grid-cols-2 "
      >
        <h1 className="col-start-1 col-end-4 font-bold">
          People you might know
        </h1>
        {RecommendedLoading ? (
          <LineWave color="blue" />
        ) : (
          shuffledUsers?.map((recommend, index) => (
            <RecommendedItem
              key={recommend.user_id}
              recommendedUser={recommend?.user_name}
              recommendedUserPhoto={recommend?.picture}
              isFollowed={followState[recommend?.user_name]}
              handleFollowClick={() => followHandler(recommend.user_name)}
              recommendedId={recommend.profile_id}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Recommended;
