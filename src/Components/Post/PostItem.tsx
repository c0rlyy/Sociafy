type PostItemProps = {
  authorImg: string;
  authorName: string;
  likes: number;
  postContent: string;
  postTitle: string;
  comments: string;
  postType: string;
  buttons: [];
};
function PostItem({
  authorImg,
  authorName,
  likes,
  postContent,
  postTitle,
  comments,
  postType,
  buttons,
}: PostItemProps) {
  const postStyling = postType;
  return (
    <div className="h-1/2 w-screen lg:w-1/2 lg:mx-auto lg:flex lg:flex-col lg:justfy-center lg:m-0 flex flex-col gap-5 border-b ">
      <div>
        <div className="h-1/4 flex justify-start items-center gap-2  ">
          <img
            className="w-1/12 lg:w-10 h-1/4 rounded-full"
            src={authorImg}
            alt=""
          />
          <h1 className="font-bold text-postUser ">{authorName}</h1>
        </div>
      </div>
      <div>
        <span
          className={`${
            postStyling === "colorful"
              ? "text-center text-postCont bg-gradient-to-r from-purple-600 to-pink-300 text-white font-bold p-4"
              : "text-center text-postCont bg-white text-black font-bold p-3"
          } items-center flex border border-slate-300 gap-2`}
        >
          {postContent}
        </span>
        <h3 className="font-semibold text-postTitle">
          {authorName}: {postTitle}
        </h3>
      </div>
      <ul className="flex items-center">
        {buttons.map((button, index) => (
          <li key={index} className="text-xl">
            {button}
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-2">
        <h1 className="font-bold text-postUser">{`Likes: ${likes}`}</h1>
      </div>
    </div>
  );
}
export default PostItem;
