import React, {
  createContext,
  useState,
  useContext,
  SetStateAction,
  Dispatch,
} from "react";
import { useParams } from "react-router-dom";
import { CurrentUserPostProps } from "../pages/Fetch/fetchPosts";
import { UpdatedPosts } from "./PostContext";

// Define types

export type CurrentUserProfilePosts = {
  post_title: string;
  post_id: number;
  post_description: string;
  profile_id: number;
  user_id: number;
  post_files: PostFilesProps[];
  post_photo: string;
};
type User = {
  email: string;
  user_name: string;
  id: string;
  profile: {
    description: string | null;
    profile_id: string;
    picture_id: string | null;
  };
};
export type UserProfile = {
  profile_id: string;
  description: string;
  profile_pic: string;
  username: string;
  posts: CurrentUserProfilePosts[] | null;
};
type UserProfileFetch = Pick<UserProfile, "description" | "profile_id">;
export type PostFilesProps = {
  // Define the structure of PostFilesProps
};

type UserProfileContextType = {
  userProfile: UserProfile | null;
  getUserProfile: (user_id: number) => Promise<UserProfile | null>;
  getUserProfilePicUrl: (pictureId: string) => Promise<string | null>;
  fetchMyPosts: () => Promise<UserPosts[] | null | undefined>;
  fetchMe: () => Promise<User | null>;
  receivePostPicture: (
    loaderData: CurrentUserPostProps[],
  ) => Promise<UpdatedPosts | null>;
  fetchPost: (post_id: number) => Promise<UpdatedPost>;
  userPosts: (profile_id: number) => Promise<UserPosts[]>;
  postControlHandler: () => void;
  openState: boolean;
  setOpenState: Dispatch<SetStateAction<boolean>>;
  userProfileFollows: (
    profile_id: number,
  ) => UserProfileFollows | null | undefined;
  getUser: (user_id: number) => Promise<User | null | undefined>;
};
type UserPosts = {
  post_title: string;
  post_description: string;
  post_id: string;
  profile_id: string;
  user_id: string;
  post_files: [
    {
      path: string;
      file_type: string;
      file_id: string;
    },
  ];
};
type UpdatedPost = {
  post_title: string;
  post_description: string;
  post_id: string;
  profile_id: string;
  post_picture: string;
};
type UserProfileFollows = {
  followers: number;
  followed: number;
};
// Create context
export const UserProfileContext = createContext<
  UserProfileContextType | undefined
>(undefined);

export const UserProfileProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>({
    profile_id: "",
    description: "",
    profile_pic: "",
    username: "",
    posts: null,
  });
  const [openState, setOpenState] = useState(false);
  const { user_id } = useParams<{ user_id: string }>(); // Ensure prof_id is properly typed
  const fetchUserPosts = async (
    user_id: number,
  ): Promise<CurrentUserProfilePosts[] | null> => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/user/posts/${user_id}`,
      );
      if (!response.ok) {
        throw new Error(
          `Failed to fetchMyPosts: ${response.status}: ${response.statusText}`,
        );
      }
      const postsData: CurrentUserProfilePosts[] = await response.json();
      console.log(postsData);
      return postsData;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const getUserProfilePicUrl = async (
    pictureId: string,
  ): Promise<string | null> => {
    if (!pictureId) {
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/file-retrive/${pictureId}`,
      );
      if (!response.ok) {
        throw new Error(
          `Error occurred while fileRetriving: ${response.status}: ${response.statusText}`,
        );
      }
      const profilePic = response.url;
      console.log(profilePic);
      return profilePic;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const getUser = async (user_id: number): Promise<User | null | undefined> => {
    if (!user_id) {
      return null;
    }
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/users/${user_id}`,
      );
      if (!response.ok) {
        throw new Error(
          `Failed to fetchUser: ${response.status}: ${response.statusText}`,
        );
      }
      const user: User = await response.json();
      console.log(`getUser: ${user}`);
      if (user) {
        return user;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const getUserProfile = async (): Promise<UserProfile | null> => {
    console.log(user_id);
    if (!user_id) {
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/profile/${user_id}`,
      );
      if (!response.ok) {
        throw new Error(
          `Error while fetchingUserProfile: ${response.status}: ${response.statusText}`,
        );
      }
      const userProfileData: UserProfileFetch = await response.json();
      // setUserProfile({
      //   profile_id: userProfileData.profile_id,
      //   description: userProfileData.description,
      //   profile_pic: "", // You might want to set a default value for profile_pic
      //   posts: null, // Initialize posts as null
      // });
      return userProfileData;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  const fetchMe = async (): Promise<User | null> => {
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
        const updatedProfile = {
          username: responseData.user_name,
          profile_picture: await getUserProfilePicUrl(
            responseData.profile.picture_id,
          ),
        };
        console.log(updatedProfile);
        return updatedProfile;
      }
      return null;
    } catch (error: any) {
      console.log("Error fetching data:", error?.message);
      throw error; // Rethrow the error so the calling component can handle it
    }
  };
  // userProfileFollows
  const userProfileFollows = async (
    profile_id: number,
  ): Promise<UserProfileFollows | undefined | null> => {
    try {
      const response =
        await fetch(`http://localhost:8000/api/v1/follows/follow-counts/${profile_id}
        `);
      if (!response.ok) {
        throw new Error(
          `Failed to fetchFollows: ${response.status}: ${response.statusText}`,
        );
      }
      const userProfileFollows: UserProfileFollows = await response.json();
      console.log(`FollowsData: ${userProfileFollows}`);
      if (userProfileFollows) {
        return userProfileFollows;
      }
      return null;
    } catch (error: any) {
      console.error(error?.message);
    }
  };
  const fetchMyPosts = async (): Promise<UserPosts[] | null | undefined> => {
    try {
      const resp = await fetch(
        `http://localhost:8000/api/v1/posts/me?skip=0&limit=100`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        },
      );
      if (!resp.ok) {
        console.log(`FetchMyPosts failed:${resp.status}:${resp.statusText} `);
      }
      const userPosts: UserPosts[] = await resp.json();
      console.log(userPosts);
      if (!userPosts) {
        return null;
      }
      return userPosts;
    } catch (error: any) {
      console.log(error?.message);
    }
  };
  const userPostFetch = async (
    user_id: number,
  ): Promise<ReadUser | undefined> => {
    if (!user_id) {
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/users/${user_id}`,
      );
      if (!response.ok) {
        throw new Error(
          `Failed to fetch files: ${response.status}: ${response.statusText}`,
        );
      }
      const data: ReadUser = await response.json();
      if (data) {
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const userPosts = async (user_id: number) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/user/posts/${user_id}`,
      );
      if (!response.ok) {
        throw Error(
          `Failed to fetch profilePosts:${response.status}: ${response.statusText} `,
        );
      }
      const profilePosts: UserPosts[] = await response.json();
      console.log(profilePosts);
      if (profilePosts) {
        const updatedProfilePosts = await Promise.all(
          profilePosts.map(async (post) => {
            const updatedProfileFiles = await Promise.all(
              post.post_files.map(async (postFile) => {
                return {
                  post_title: post.post_title,
                  post_id: post.post_id,
                  profile_id: post.profile_id,
                  user_id: post.user_id,
                  post_picture: await getUserProfilePicUrl(postFile.file_id),
                };
              }),
            );
          }),
        );
        return updatedProfilePosts;
      }
    } catch (error: any) {
      console.error(error?.message);
    }
  };
  const fetchPost = async (
    post_id: number,
  ): Promise<UpdatedPost[] | undefined> => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/posts/${post_id}`,
      );
      if (!response.ok) {
        throw new Error(
          `Failed to fetchPost: ${response.status}: ${response.statusText}`,
        );
      }
      const userPost: UserPosts = await response.json();
      if (userPost) {
        const updatedPic: UpdatedPost[] = await Promise.all(
          userPost.post_files.map(async (post_file) => {
            const postPicture = await getUserProfilePicUrl(post_file.file_id);
            const user = await userPostFetch(userPost.user_id);
            return {
              post_id: userPost.post_id,
              post_description: userPost.post_description,
              post_title: userPost.post_title,
              profile_id: userPost.profile_id,
              post_picture: postPicture,
              user_id: userPost.user_id,
              username: user?.user_name,
            };
          }),
        );
        console.log(updatedPic);
        return updatedPic;
      }
    } catch (error: any) {
      console.error(error);
    }
  };
  const receivePostPicture = async (
    loaderData: CurrentUserPostProps[],
  ): Promise<UpdatedPosts[] | null> => {
    const updatedPosts: UpdatedPosts[] = await Promise.all(
      loaderData.map(async (post) => {
        if (!post) {
          return;
        }
        const updatedPostFiles = await Promise.all(
          post.post_files.map(async (postFile) => {
            const fileUrl = await getUserProfilePicUrl(postFile.file_id);
            const filePath = postFile.path;
            return { fileId: postFile.file_id, fileUrl, filePath };
          }),
        );

        // Check the file extension to determine the file type
        const fileTypes = updatedPostFiles.map((file) =>
          getFileTypeFromUrl(file.filePath),
        );

        // Check if any file has an image or film extension
        const hasImage = fileTypes.some((type) => isImageFile(type));
        const hasFilm = fileTypes.some((type) => isFilmFile(type));

        const receivedUserPost = await userPostFetch(post.user_id);
        const receivedUserPhoto = await getUserProfilePicUrl(
          receivedUserPost?.profile?.picture_id,
        );

        return {
          ...post,
          post_photo: hasImage
            ? updatedPostFiles.find((file) =>
                isImageFile(getFileTypeFromUrl(file.filePath)),
              )?.fileUrl || ""
            : "",
          post_film: hasFilm
            ? updatedPostFiles.find((file) =>
                isFilmFile(getFileTypeFromUrl(file.filePath)),
              ) || null
            : null,
          profile_picture: receivedUserPhoto || "",
          username: receivedUserPost?.user_name,
        };
      }),
    );
    console.log(updatedPosts);
    return updatedPosts;
  };

  // Function to extract file extension from URL
  const getFileTypeFromUrl = (url: string): string => {
    const parts = url.split(".");
    return parts[parts.length - 1];
  };

  // Function to check if file extension represents an image
  const isImageFile = (fileType: string): boolean => {
    const imageExtensions = ["jpg", "jpeg", "png", "gif"];
    return imageExtensions.includes(fileType.toLowerCase());
  };

  // Function to check if file extension represents a film
  const isFilmFile = (fileType: string): boolean => {
    const filmExtensions = ["mp4", "avi", "mov", "mkv"];
    return filmExtensions.includes(fileType.toLowerCase());
  };
  // const fetchData = async () => {
  //   const profileData = await getUserProfile();
  //   if (profileData) {
  //     setUserProfile((prev) => ({
  //       ...prev,
  //       profile_id: profileData?.profile_id,
  //       description: profileData?.description,
  //     }));
  //   }
  //   const userData = await getUser();
  //   if (userData) {
  //     console.log(userData);

  //     const pictureData = await getUserProfilePicUrl(
  //       userData?.profile?.picture_id,
  //     );
  //     if (pictureData) {
  //       setUserProfile((prev) => ({ ...prev, profile_pic: pictureData }));
  //       console.log(profileData);
  //     }
  //     return pictureData;
  //   }
  // };
  return (
    <UserProfileContext.Provider
      value={{
        userProfile,
        getUserProfile,
        getUserProfilePicUrl,
        fetchMyPosts,
        fetchMe,
        receivePostPicture,
        fetchPost,
        userPosts,
        setOpenState,
        userProfileFollows,
        getUser,
        openState,
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};

export const useProfile = () => {
  const userProfileCtx = useContext(UserProfileContext);
  if (!userProfileCtx) {
    throw new Error("Cannot access context, is out of provider");
  }
  return userProfileCtx;
};

export default UserProfileProvider;
