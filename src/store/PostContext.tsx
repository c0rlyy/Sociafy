import { createContext, ReactNode, useState } from "react";
import sampleReel1 from "../assets/sampleReel1.jpg";
import sampleReel2 from "../assets/sampleReel2.jpg";
import sampleReel3 from "../assets/sampleReel3.jpg";
import sampleReel4 from "../assets/sampleReel4.jpg";
import {
  CurrentUserPostProps,
  PostFilesProps,
} from "../pages/Fetch/fetchPosts";

type Post = {
  id: number;
  author: string;
  email: string;
  authorImg: string;
  postTitle: string;
  postContent: string;
  likes: number;
  postImage: string;
};
type PostContextTypes = {
  posts: Post[];
  updatedPosts: () => Promise<Response | null>;
  likeButtonHandler: (post_id: string) => void;
  eventButtonHandlerAction: (action: string, post_id: string) => void;
  receivePostPicture: (
    loaderData: CurrentUserPostProps[],
  ) => Promise<UpdatedPosts | null>;
  filePostReaderFetch: () => Promise<(string & true) | (null & false)>;
  postState: null | CurrentUserPostProps[];
  buttonsState: {
    likeState: boolean;
    commentState: boolean;
    shareState: boolean;
  };
};
type ReadUser = {
  email: string;
  user_name: string;
  id: number;
  profile: {
    description: string;
    profile_id: number;
    picture_id: number;
  };
};
export type UpdatedPosts = {
  post_title: string;
  post_id: number;
  post_description: string;
  profile_id: number;
  user_id: number;
  post_files: PostFilesProps[];
  username: string | undefined;
  post_photo: string;
  post_film: string;
  profile_picture: string;
};
export const PostContext = createContext<PostContextTypes>({
  posts: [],
  likeButtonHandler: () => {},
  receivePostPicture: async (loaderData: CurrentUserPostProps[]) => [],
});
function PostsProvider({ children }: { children: ReactNode }) {
  const posts = [
    {
      postImage: sampleReel1,
      id: 3,
      author: "BeautyWorld",
      authorImg: sampleReel1,
      email: "c0rly@backend.com",
      postTitle: "Surrounded by wonder",
      postContent: "Kocham Wsiz",
      likes: 1,
    },
    {
      id: 1,
      author: "WorldOfOurs",
      email: "dundunek1@yahoo.com",
      authorImg: sampleReel2,
      postImage: sampleReel2,
      postTitle: "Such a beautifull landscapes",
      postContent: "Such a beautifull landscapes",
      likes: 1000,
    },
    {
      postImage: sampleReel3,
      id: 2,
      author: "WondersofNature",
      email: "rafalstawarz69@wp.pl",
      authorImg: sampleReel3,
      postTitle: "Frekwencja to moje drugie imię",
      postContent:
        "Jestem bardzo punktualnym studentem, polecam również Tobie.",
      likes: 578,
    },

    {
      postImage: sampleReel4,
      id: 3,
      author: "StunningViews",
      authorImg: sampleReel4,
      email: "rovgarth@onet.pl",
      postTitle: "Kocham naszą uczelnie",
      postContent: "Kocham Wsiz",
      likes: 1,
    },
  ];
  const postFileRetriver = async (file_id: string | undefined) => {
    try {
      if (!file_id) {
        return;
      }
      const response = await fetch(
        `http://localhost:8000/api/v1/file-retrive/${JSON.parse(file_id)}`,
      );
      if (!response.ok) {
        console.log(
          `FileRetriver HTTP Request Failed: ${response.status}: ${response.statusText}`,
        );
      }
      const data = response.url;
      if (data) {
        return data;
      }
    } catch (error: any) {
      console.error(error?.message);
    }
  };
  const receivePostPicture = async (
    loaderData: CurrentUserPostProps[],
  ): Promise<UpdatedPosts | null> => {
    const updatedPosts: UpdatedPosts[] = await Promise.all(
      loaderData.map(async (post) => {
        const updatedPostFiles = await Promise.all(
          post.post_files.map(async (postFile) => {
            const fileUrl = await postFileRetriver(postFile.file_id);
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
        const receivedUserPhoto = await postFileRetriver(
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
  return (
    <PostContext.Provider
      value={{
        receivePostPicture,
        posts,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
export default PostsProvider;
