import {
  createContext,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import sampleReel1 from "../assets/sampleReel1.jpg";
import sampleReel2 from "../assets/sampleReel2.jpg";
import sampleReel3 from "../assets/sampleReel3.jpg";
import sampleReel4 from "../assets/sampleReel4.jpg";
import Post from "../Components/Post/PostLayout/Post";
import {
  CurrentUserPostProps,
  PostFilesProps,
} from "../pages/Fetch/fetchPosts";
import { useAuth } from "./AuthContext";
import { UpdatedPost, UserPosts } from "./UserProfile-context";

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
type likePostResult = {
  post_id: number;
  profile_id: number;
  profile_likes: number;
};
type PostContextTypes = {
  posts: Post[];
  updatedPosts: () => Promise<Response | null>;
  eventButtonHandlerAction: (action: string, post_id: string) => void;
  receivePostPicture: (
    loaderData: CurrentUserPostProps[],
  ) => Promise<UpdatedPosts[] | null>;
  filePostReaderFetch: () => Promise<(string & true) | (null & false)>;
  postState: null | CurrentUserPostProps[];
  fetchPost: (post_id: number) => Promise<UpdatedPost>;
  likePostToggler: (
    post_id: number,
  ) => Promise<likePostResult | { like_message: string } | undefined>;
  countPostLikes: (post_id: number) => Promise<{ post_likes_count: number }>;
  unlikePost: (post_id: number) => Promise<{ like_message: string }>;
  readPostComments: (post_id: number) => Promise<ReadComments | undefined>;
  openPreview: boolean;
  setOpenPreview: React.Dispatch<SetStateAction<boolean>>;
  createComment: (
    post_id: number,
    body: string,
  ) => Promise<createdComment | undefined | null>;
  buttonsState: ButtonsState;
  likeButtonToggleHandler: (post_id: string) => void;
  unlikeButtonHandler: (post_id: string) => void;
  shareButtonToggleHandler: (post_id: number) => void;
  commentButtonToggleHandler: (post_id: number) => void;
  eventButtonClick: (action: string, post_id: number) => void;
  isShareModalOpened: boolean;
  setIsShareModalOpened: React.Dispatch<SetStateAction<boolean>>;
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
  post_likes: number;
  post_comments: ReadComments[];
};
export type ReadComments = {
  username: string;
  user_id: number;
  profile_id: number;
  profile_description: string | null;
  profile_picture_id: number | null;
  post_id: number;
  comment_content: string;
};
type ButtonsState = {
  [postId: number]: {
    isLiked: boolean;
    isCreateCommentOpened: boolean;
    isShareModalOpened: boolean;
  };
};

export type createdComment = Pick<
  ReadComments,
  "post_id" | "profile_id" | "comment_content"
>;

export const PostContext = createContext<PostContextTypes>({
  posts: [],
  buttonsState: {},
  eventButtonHandlerAction: () => {},
  likeButtonHandler: () => {},
  unlikeButtonHandler: () => {},
  receivePostPicture: async (loaderData: CurrentUserPostProps[]) => [],
});

function PostsProvider({ children }: { children: ReactNode }) {
  const [openPreview, setOpenPreview] = useState(false);
  const [isShareModalOpened, setIsShareModalOpened] = useState(false);
  const [buttonsState, setButtonsState] = useState<ButtonsState>({});
  const { getTokenFromLS } = useAuth();
  const token = getTokenFromLS();
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
  const commentButtonToggleHandler = (postId: number) => {
    setButtonsState((prev) => ({
      ...prev,
      [postId]: {
        ...prev[postId],
        isCreateCommentOpened: !prev[postId]?.isCreateCommentOpened,
      },
    }));
  };

  const shareButtonToggleHandler = (post_id: number) => {
    setButtonsState((prev) => ({
      ...prev,
      [post_id]: {
        ...prev[post_id],
        isSharedModalOpened: !prev[post_id]?.isShareModalOpened,
      },
    }));
    setIsShareModalOpened((prev) => !prev);
  };

  const likeButtonToggleHandler = async (postId: number) => {
    try {
      // Perform API call to handle liking the post
      const LikedPost = await likePostToggler(postId);
      if (LikedPost) {
        // Toggle the like state for the specified post
        setButtonsState((prev) => ({
          ...prev,
          [postId]: {
            ...prev[postId],
            isLiked: !prev[postId]?.isLiked,
          },
        }));
      }
      console.log(LikedPost);
      return LikedPost;
    } catch (error) {
      console.error("Error liking post:", error);
      // Handle error gracefully (e.g., display error message to the user)
    }
  };

  const likePostToggler = async (
    post_id: number,
  ): Promise<likePostResult | undefined> => {
    try {
      let url = `http://localhost:8000/api/v1/like-post/like/${post_id}`;
      if (buttonsState?.[post_id]?.isLiked) {
        url = `http://localhost:8000/api/v1/unlike-post/like/${post_id}`;
      }
      const response = await fetch(url, {
        method: buttonsState?.[post_id]?.isLiked ? "DELETE" : "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw Error(
          `Failed to like Post: ${response.status}: Cannot Like the same post twice.`,
        );
      }
      const like = await response.json();
      console.log(like);
      if (like) {
        return like;
      }
    } catch (error: any) {
      console.error(error?.message);
    }
  };
  const eventButtonHandlerAction = async (action: string, postId: number) => {
    switch (action) {
      case "like":
        likeButtonToggleHandler(postId);
        break;
      case "comment":
        commentButtonToggleHandler(postId);
        break;
      case "share":
        shareButtonToggleHandler(postId);
        break;
      default:
        break;
    }
  };
  const getPostState = (postId) => {
    return buttonsState[postId] || {};
  };
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
  const fetchPost = async (
    postID: number,
  ): Promise<UpdatedPost[] | undefined> => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/posts/${postID}`,
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
            const postFile = await postFileRetriver(post_file.file_id);
            const user = await userPostFetch(userPost.user_id);
            const postLikes = await countPostLikes(postID);
            const userPhoto = await postFileRetriver(user.profile.picture_id);
            const postComments = await readPostComments(postID);
            const UserPost = {
              post_id: userPost.post_id,
              post_description: userPost.post_description,
              post_title: userPost.post_title,
              profile_id: userPost.profile_id,
              user_id: userPost.user_id,
              username: user?.user_name,
              profile_picture: userPhoto,
              post_likes: {
                post_likes_count: postLikes?.post_likes_count,
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
        const postLikes = await countPostLikes(post.post_id);

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
          likes: postLikes,
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
  // Likes
  const unlikePost = async (
    post_id: number,
  ): Promise<{ like_message: string }> => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/unlike-post/like/${post_id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!response.ok) {
        throw Error(
          `Failed to unlike post: ${response.status}: ${response.statusText}`,
        );
      }
      const unlike = await response.json();
      if (unlike) {
        console.log(unlike);
        return unlike;
      }
    } catch (error: any) {
      console.error(error?.message);
    }
  };
  const countPostLikes = async (
    post_id: number,
  ): Promise<{ post_likes_count: number }> => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/count-likes/post/${post_id}`,
      );
      const PostLikes: { post_likes_count: number } = await response.json();
      if (PostLikes) {
        return PostLikes;
      }
    } catch (error: any) {
      console.error(error?.message);
    }
  };
  // Comments
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
                profile_picture: await postFileRetriver(
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
  const createComment = async (
    post_id: number,
    body: { comment_content: string },
  ): Promise<createdComment | null | undefined> => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/comment/post/${post_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        },
      );
      if (!response.ok) {
        throw new Error(
          `Failed to create comment: ${response.status}: ${response.statusText}`,
        );
      }
      const comment: createdComment = await response.json();
      console.log(comment);

      if (comment) {
        return comment;
      }
    } catch (error: any) {
      console.error(error?.message);
    }
  };

  return (
    <PostContext.Provider
      value={{
        receivePostPicture,
        posts,
        countPostLikes,
        likePostToggler,
        unlikePost,
        openPreview,
        fetchPost,
        setOpenPreview,
        readPostComments,
        createComment,
        buttonsState,
        likeButtonToggleHandler,
        commentButtonToggleHandler,
        shareButtonToggleHandler,
        eventButtonHandlerAction,
        getPostState,
        setIsShareModalOpened,
        isShareModalOpened,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
export const usePost = () => {
  const PostCtx = useContext(PostContext);
  if (!PostCtx) {
    throw Error("Post Provider outside of JSX element");
  }
  return PostCtx;
};
export default PostsProvider;
