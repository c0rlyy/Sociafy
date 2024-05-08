// import {
//   createContext,
//   ReactNode,
//   useContext,
//   useEffect,
//   useState,
// } from "react";
// import { PostContext } from "./PostContext";
// type CurrentUser = {
//   email: string;
//   user_name: string;
//   id: string;
//   profile: {
//     description: string | null;
//     profile_id: string;
//     picture_id: string | null;
//   };
// };
// type CurrentUserPosts = {
//   post_title: string;
//   post_description: string | null;
//   post_id: number;
//   profile_id: number;
//   user_id: number;
//   post_files: [{ path: string; file_type: string; file_id: number }];
// };
// type CurrentUserPostsState = Pick<
//   CurrentUserPosts,
//   "post_id" | "post_title" | "post_description" | "post_files"
// >;
// type CurrentUserState = Pick<CurrentUser, "user_name" | "id" | "profile">;
// const ProfileContext = createContext<undefined | CurrentUser>(undefined);
// const ProfileContextProvider = ({ children }: { children: ReactNode }) => {
//   const [userMe, setUserMe] = useState<CurrentUserState>({
//     user_name: "",
//     id: "",
//     profile: {
//       description: "",
//       profile_id: "",
//       picture_id: "",
//     },
//   });
//   const [userPosts, setUserPosts] = useState<CurrentUserPostsState | null>(
//     null,
//   );
//   const fetchMe = async (): Promise<CurrentUser | null> => {
//     try {
//       const response = await fetch("http://localhost:8000/api/v1/users/me", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//         },
//       });
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       const responseData: CurrentUser = await response.json();
//       // Avoid logging sensitive information like access tokens
//       console.log("Data from fetchMe:", responseData);
//       if (responseData) {
//         setUserMe({
//           user_name: responseData?.user_name,
//           id: responseData?.id,
//           profile: {
//             description: responseData.profile?.description,
//             profile_id: responseData.profile.profile_id,
//             picture_id: responseData.profile?.picture_id,
//           },
//         });
//         return responseData;
//       } else {
//         return null;
//       }
//     } catch (error) {
//       console.log("Error fetching data:", error);
//       throw error; // Rethrow the error so the calling component can handle it
//     }
//   };
//   const fetchMyPosts = async (): Promise<CurrentUserPosts[] | null> => {
//     try {
//       const resp = await fetch(
//         `http://localhost:8000/posts/me?skip=0&limit=100`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//           },
//         },
//       );
//       if (!resp.ok) {
//         console.log(`FetchMyPosts failed:${resp.status}:${resp.statusText} `);
//         return null;
//       }
//       const userPosts: CurrentUserPosts[] = await resp.json();
//       console.log(userPosts);
//       if (!userPosts) {
//         return null;
//       }
//       setUserPosts(userPosts);
//       return userPosts;
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const receivePostPictures = async (userPost: CurrentUserPosts[]) => {
//     const updatedPosts = await Promise.all(
//       userPost.map(async (post) => {
//         const updatedPostFiles = await Promise.all(
//           post.post_files.map(async (postFile) => {
//             const fileUrl = await getUserProfilePicUrl(postFile.file_id);
//             const filePath = postFile.path;
//             return { fileId: postFile.file_id, fileUrl, filePath };
//           }),
//         );
//         const fileTypes = updatedPostFiles.map((file) =>
//           getFileTypeFromUrl(file.filePath),
//         );
//         // Some checks if at least one element passed test provided by user in fc.
//         const hasImage = fileTypes.some((type) => isImageFile(type));
//         const hasFilm = fileTypes.some((type) => isFilmFile(type));
//         const receivedUserPost = await fetchMyPosts();
//         const receivedUserPhoto = await getFileTypeFromUrl(
//           receivedUserPost?.profile.picture_id,
//         );
//         return {
//           ...post,
//           post_photo: hasImage
//             ? updatedPostFiles.find((file) =>
//                 isImageFile(getFileTypeFromUrl(file.filePath)),
//               )
//             : "",
//           post_film: hasFilm
//             ? updatedPostFiles.find((file) =>
//                 isFilmFile(getFileTypeFromUrl(file.filePath)),
//               ) || null
//             : null,
//           profile_picture: receivedUserPhoto || "",
//         };
//       }),
//     );
//     setUserPosts(updatedPosts);
//   };
//   const getFileTypeFromUrl = (url: string) => {
//     const splittedUrl = url.split(".");
//     return splittedUrl[splittedUrl.length - 1];
//   };
//   //   Checks if post FileType is image or not.
//   const isImageFile = (fileType: string): boolean => {
//     const imageExtensions = ["jpg", "jpeg", "png", "gif"];
//     return imageExtensions.includes(fileType.toLowerCase());
//   };
//   const isFilmFile = (fileType: string): boolean => {
//     const videoExtensions = ["mp4", "avi", "mov", "mkv"];
//     return videoExtensions.includes(fileType.toLowerCase());
//   };
//   const getUserProfilePicUrl = async (
//     pictureId: string,
//   ): Promise<string | null> => {
//     try {
//       const response = await fetch(
//         `http://localhost:8000/api/v1/file-retrive/${pictureId}`,
//       );
//       if (!response.ok) {
//         throw new Error(
//           `Error occurred while fileRetriving: ${response.status}: ${response.statusText}`,
//         );
//       }
//       const profilePic = response.url;
//       console.log(profilePic);
//       return profilePic;
//     } catch (error) {
//       console.error(error);
//       return null;
//     }
//   };
//   useEffect(() => {
//     const fetchProfile = async () => {
//       const fetchUser = await fetchMe();
//       const fetchUserProfile = await receivePostPictures();
//     };
//     fetchProfile();
//   }, []);
//   return (
//     <ProfileContext.Provider value={userMe}>{children}</ProfileContext.Provider>
//   );
// };
// export const useMe = () => {
//   const myProfileContext = useContext(ProfileContext);
//   if (!myProfileContext) {
//     throw Error("Context is out of provider");
//   }
//   return myProfileContext;
// };
// export default ProfileContextProvider;
