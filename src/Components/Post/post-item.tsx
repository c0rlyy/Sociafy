import DefaultAvatar from "../Avatar/Avatar";
import Dots from "../Dots/dots";

type PostItemPropsT = {
  username: string;
  avatarUrl: string;
  images: File[];
  caption: string;
  likes: number;
  comments: number;
  createdAt: string;
  location: string;
  isLiked: boolean;
};

export default function PostItem({
  username,
  avatarUrl,
  images,
  caption,
  likes,
  comments,
  createdAt,
  location,
  isLiked,
}: PostItemPropsT) {
  return (
    <div className=" mx-auto mb-4 w-[450px]  max-w-[800px] rounded-md border border-gray-200 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border p-3">
        <div className="flex items-center space-x-2">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={`${username}'s avatar`}
              className="h-8 w-8 rounded-full object-cover"
            />
          ) : (
            <DefaultAvatar className="h-8 w-8" />
          )}
          <div>
            <p className="text-sm font-medium">{username}</p>
            {location && <p className="text-xs text-gray-500">{location}</p>}
          </div>
        </div>
        <Dots className="text-gray-600" />
      </div>

      <div className="relative m-auto mx-0 aspect-square w-full overflow-hidden border">
        {images.length > 0 ? (
          <div className="flex h-full snap-x snap-mandatory overflow-x-auto">
            {images.map((img, index) => (
              <img
                key={index}
                src={URL.createObjectURL(img)}
                alt={`Post by ${username}`}
                className="h-full w-full flex-shrink-0 snap-center object-cover"
              />
            ))}
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-100">
            <p className="text-gray-400">No image</p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center space-x-4">
          <button className="focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-700"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
          <button className="focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </button>
        </div>
        <button className="focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
        </button>
      </div>

      {/* Likes */}
      <div className="px-3 pb-2">
        <p className="text-sm font-medium">{likes} likes</p>
      </div>

      {/* Caption */}
      <div className="px-3 pb-2">
        <p className="text-sm">
          <span className="font-medium">{username}</span> {caption}
        </p>
      </div>

      {/* Comments */}
      <div className="px-3 pb-2">
        {comments > 0 && (
          <p className="text-sm text-gray-500">View all {comments} comments</p>
        )}
      </div>

      {/* Timestamp */}
      <div className="px-3 pb-3">
        <p className="text-xs text-gray-400">{createdAt}</p>
      </div>
    </div>
  );
}
