import DefaultAvatar from "../Avatar/Avatar";
import Badge from "../Badge/Badge";
import Dots from "../Dots/dots";

type PostItemPropsT = {
  username: string,
  avatarUrl: string,
  imageUrls: string[],
  caption: string,
  likes: number,
  comments: number,
  createdAt: string,
  location: string,
  isLiked: boolean;
}

export default function PostItem({
  username,
  avatarUrl,
  imageUrls,
  caption,
  likes,
  comments,
  createdAt,
  location,
  isLiked
}: PostItemPropsT) {
  return (
    <div className=" mx-auto max-w-[800px] w-[450px]  border border-gray-200 rounded-md bg-white mb-4">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border">
        <div className="flex items-center space-x-2">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={`${username}'s avatar`}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <DefaultAvatar className="w-8 h-8" />
          )}
          <div>
            <p className="font-medium text-sm">{username}</p>
            {location && <p className="text-xs text-gray-500">{location}</p>}
          </div>
        </div>
        <Dots className="text-gray-600" />
      </div>

      <div className="relative w-full aspect-square overflow-hidden border mx-0 m-auto">
        {imageUrls.length > 0 ? (
          <div className="flex overflow-x-auto snap-x snap-mandatory h-full">
            {imageUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Post by ${username}`}
                className="w-full h-full flex-shrink-0 snap-center object-cover"
              />
            ))}
          </div>
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <p className="text-gray-400">No image</p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="p-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button className="focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-6 h-6 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-700'}`}
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
              className="w-6 h-6 text-gray-700"
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
            className="w-6 h-6 text-gray-700"
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
        <p className="font-medium text-sm">{likes} likes</p>
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
