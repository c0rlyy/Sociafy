import { OldPlugin } from "postcss";
import React, {
  createContext,
  useState,
  useContext,
  SetStateAction,
  Dispatch,
  useEffect,
} from "react";
import { useParams } from "react-router-dom";
import { CurrentUserPostProps } from "../pages/Fetch/fetchPosts";
import { useAuth } from "./AuthContext";
import { ReadComments, UpdatedPosts, usePost } from "./PostContext";

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
export type User = {
  email: string;
  user_name: string;
  id: string;
  profile: {
    description: string | null;
    profile_id: string;
    picture_id: string | null;
  };
  profile_picture: string | null;
  followers: Followers[];
  followed: Followed[];
};
export type UserProfile = {
  profile_id: string;
  description: string;
  profile_pic: string;
  username: string;
  posts: CurrentUserProfilePosts[] | null;
};
export type FollowedProfileResponse = {
  profile_followed_id: number;
  follower_profile_id: number;
};
type FollowsState = {
  [profile_id: number]: {
    isFollowed: boolean;
  };
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
  openPreview: boolean;
  setOpenPreview: Dispatch<SetStateAction<boolean>>;
  userProfileFollows: (
    profile_id: number,
  ) => UserProfileFollows | null | undefined;
  getUserWithPic: (user_id: number) => Promise<User | null | undefined>;
  changeUsername: (
    current_password: string,
    new_username: string,
  ) => Promise<User | null>;
  changeEmail: (
    current_password: string,
    new_email: string,
  ) => Promise<User | null>;
  changePassword: (
    old_password: string,
    new_password: string,
  ) => Promise<User | null>;
  readFollowers: () => Promise<User[] | null | undefined>;
  followUser: (
    profile_id: number,
  ) => Promise<FollowedProfileResponse | undefined>;
  followUserHandler: (profile_id: number) => Promise<void>;
  setFollowedProfiles: React.Dispatch<SetStateAction<FollowsState>>;
  followedProfiles: FollowsState;
  delay: (ms: number) => Promise<void>;
  autoScroll: () => void;
};
export type UserPosts = {
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
export type Followers = {
  username: string;
  user_id: string;
  profile_description: string | null;
  picture_id: number | null;
  profile_id: number;
  follows_profile_id: number;
};
export type Followed = {
  username: string;
  user_id: number;
  profile_description: null | string;
  picture_id: number;
  profile_id: number;
  follower_id: number;
};
export type UpdatedPost = {
  post_id: string;
  post_description: string;
  post_title: string;
  profile_id: number;
  user_id: number;
  profile_picture: string;
  username: string;
  post_likes: {
    post_likes_count: number;
  };
  post_photo: string;
  post_film: {
    fileId: number;
    fileUrl: string;
    filePath: string;
  };
  post_comments: ReadComments[];
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
  const [openPreview, setOpenPreview] = useState(false);
  const [followedProfiles, setFollowedProfiles] = useState<FollowsState>({});
  const { user_id } = useParams<{ user_id: string }>(); // Ensure prof_id is properly typed
  const { getTokenFromLS } = useAuth();
  const token = getTokenFromLS();
  const { countPostLikes } = usePost();
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
  // Changing Credentials Section
  const changeUsername = async (
    current_password: string,
    new_username: string,
  ): Promise<User | null | undefined> => {
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: new URLSearchParams({
        password: current_password,
        new_user_name: new_username,
      }),
    };
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/users/change-username`,
        options,
      );
      if (!response.ok) {
        throw Error(
          `Failed to change username: ${response.status}:${response.statusText}`,
        );
      }
      const changedUsername = await response.json();
      if (changedUsername) {
        return changedUsername;
      }
    } catch (error: any) {
      console.error(error?.message);
    }
  };
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  const changeEmail = async (
    current_password: string,
    new_email: string,
  ): Promise<User | null | undefined> => {
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: new URLSearchParams({
        password: current_password,
        new_email: new_email,
      }),
    };
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/users/change-email",
        options,
      );
      if (!response.ok) {
        throw Error(
          `Failed to changeEmail: ${response.status}: ${response.statusText}`,
        );
      }
      const UserWithChangedEmail: User = await response.json();
      if (UserWithChangedEmail) {
        return UserWithChangedEmail;
      }
    } catch (error: any) {
      console.error(error?.message);
    }
  };
  const changePassword = async (
    old_password: string,
    new_password: string,
  ): Promise<User | null | undefined> => {
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: new URLSearchParams({
        old_password: old_password,
        new_password: new_password,
      }),
    };
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/users/change-email",
        options,
      );
      if (!response.ok) {
        throw Error(
          `Failed to changeEmail: ${response.status}: ${response.statusText}`,
        );
      }
      const UserWithChangedEmail: User = await response.json();
      if (UserWithChangedEmail) {
        return UserWithChangedEmail;
      }
    } catch (error: any) {
      console.error(error?.message);
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

  const getUserWithPic = async (
    user_id: number,
  ): Promise<User | null | undefined> => {
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
        const updatedProfilePic = await getUserProfilePicUrl(
          user?.profile.picture_id,
        );
        const UserProfileFollowers = await readUserFollowers(
          user?.profile.profile_id,
        );
        const UserProfileFollowed = await readUserFollowed(
          user?.profile.profile_id,
        );
        return {
          ...user,
          profile_picture: updatedProfilePic,
          followers: UserProfileFollowers?.length,
          following: UserProfileFollowed?.length,
        };
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
        const MyProfileFollows = await readUserFollowers(
          responseData.profile.profile_id,
        );
        const MyProfileFollowings = await readUserFollowed(
          responseData.profile.profile_id,
        );
        const updatedProfile = {
          username: responseData.user_name,
          profile_picture: await getUserProfilePicUrl(
            responseData.profile.picture_id,
          ),
          followers: MyProfileFollows,
          followed: MyProfileFollowings,
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
  const autoScroll = () => {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
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
  const readUserFollowers = async (
    profile_id: number,
  ): Promise<Followers[] | undefined> => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/follows/profile-followers/${profile_id}`,
      );
      if (!response.ok) {
        console.log(
          `Failed to fetch followers: ${response.status}: ${response.statusText}`,
        );
      }
      const Followers: Followers[] = await response.json();
      if (Followers) {
        return Followers;
      }
    } catch (error: any) {
      console.error(error?.message);
    }
  };
  const readUserFollowed = async (
    profile_id: number,
  ): Promise<Followed[] | undefined> => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/follows/profile-followed/${profile_id}`,
      );
      if (!response.ok) {
        console.log(
          `Failed to fetch followers: ${response.status}: ${response.statusText}`,
        );
      }
      const Followers: Followed[] = await response.json();
      if (Followers) {
        return Followers;
      }
    } catch (error: any) {
      console.error(error?.message);
    }
  };
  const followUser = async (
    profile_id: number,
  ): Promise<FollowedProfileResponse | undefined> => {
    let url = `http://localhost:8000/api/v1/follow-profile/${profile_id}`;
    if (followedProfiles[profile_id]?.isFollowed) {
      url = `http://localhost:8000/api/v1/delete-follow/${profile_id}`;
    }
    try {
      const response = await fetch(url, {
        method: followedProfiles[profile_id]?.isFollowed ? "DELETE" : "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw Error(
          `Failed to followUser: ${response.status}: ${response.statusText}`,
        );
      }
      const FollowedUser: FollowedProfileResponse = await response.json();
      if (FollowedUser) {
        return FollowedUser;
      }
    } catch (error: any) {
      console.error(error?.message);
    }
  };
  const followUserHandler = async (profile_id: number): Promise<void> => {
    try {
      const FollowedProfile = await followUser(profile_id);
      if (FollowedProfile) {
        setFollowedProfiles((prev) => ({
          ...prev,
          [profile_id]: {
            ...prev[profile_id],
            isFollowed: !prev[profile_id]?.isFollowed,
          },
        }));
      }
    } catch (error: any) {
      console.error(error);
    }
  };
  const readPostComments = async (
    post_id: number,
  ): Promise<ReadComments[] | undefined> => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/comment/post/${post_id}`,
      );
      if (!response.ok) {
        throw Error(
          `Failed to fetch PostComments: ${response.status}: ${response.statusText}`,
        );
      }
      const comments: ReadComments[] = await response.json();
      console.log(comments);
      if (comments) {
        const updatedComments = Promise.all(
          comments.map(async (comment: ReadComments) => {
            const updatedCommentObj = {
              username: comment?.username,
              profile_id: comment?.profile_id,
              comment_content: comment?.comment_content,
              post_id: comment?.post_id,
              profile: {
                picture_id: comment?.profile_picture_id,
                description: comment?.profile_description,
                profile_picture: await getUserProfilePicUrl(
                  comment?.profile_picture_id,
                ),
              },
            };
            return updatedCommentObj;
          }),
        );
        return updatedComments;
      }
    } catch (error: any) {
      console.error(error?.message);
    }
  };
  const countPosts = (posts: UserPosts[]) => {
    return [...posts].length;
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
      const CountedPosts = countPosts(userPosts);
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
        return profilePosts;
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
        const updatedPic: UpdatedPost = await Promise.all(
          userPost.post_files.map(async (post_file) => {
            const postFile = await getUserProfilePicUrl(post_file.file_id);
            const UserPostLikes = await countPostLikes(userPost.post_id);
            const user = await userPostFetch(userPost.user_id);
            const postComments = await readPostComments(userPost.post_id);
            const userPhoto = await getUserProfilePicUrl(
              user.profile.picture_id,
            );

            const UserPost = {
              post_id: userPost.post_id,
              post_description: userPost.post_description,
              post_title: userPost.post_title,
              profile_id: userPost.profile_id,
              user_id: userPost.user_id,
              username: user?.user_name,
              profile_picture: userPhoto,
              post_likes: {
                post_likes_count: UserPostLikes?.post_likes_count,
              },
              post_comments: postComments,
            };
            if (post_file.file_type === "mp4") {
              return {
                ...UserPost,
                post_film: postFile,
              };
            } else {
              return {
                ...UserPost,
                post_photo: postFile,
              };
            }
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
        setOpenPreview,
        userProfileFollows,
        getUserWithPic,
        openPreview,
        changeEmail,
        changeUsername,
        changePassword,
        readUserFollowers,
        followUserHandler,
        followUser,
        followedProfiles,
        setFollowedProfiles,
        delay,
        autoScroll,
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
