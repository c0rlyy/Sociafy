type postItemProps = {
  postTITLE: string;
  postID: number;
  postDESC: string;
  profileID: number;
  userID: number;
  postType: string;
};
const PostItem = ({
  postTITLE,
  postID,
  postDESC,
  profileID,
  userID,
  postType,
}: postItemProps) => {
  const postStyling = postType;
  const tailwindBackup = {
    // h-1/2 w-screen lg:w-1/2 lg:mx-auto lg:flex lg:flex-col lg:justfy-center lg:m-0 flex flex-col gap-5 border-b
  };
  return (
    <div
      post-id={postID}
      className=" col-start-2 col-end-3 grid grid-cols-subgrid w-full"
    >
      <div>
        <div className="h-1/4 flex justify-start items-center gap-2  ">
          {/* <img
            className="w-1/12 lg:w-10 h-1/4 rounded-full"
            src={authorImg}
            alt=""
          /> */}
          <h1 className="font-bold text-postUser ">{userID}</h1>
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
          {postDESC}
        </span>
        <h3 className="font-semibold text-postTitle">
          {userID}: {postTITLE}
        </h3>
      </div>
      <ul className="flex items-center">
        {/* {buttons.map((button, index) => (
          <li key={index} className="text-xl">
            {button}
          </li>
        ))} */}
      </ul>
      <div className="flex items-center gap-2">
        <h1 className="font-bold text-postUser">{`Likes: ${0}`}</h1>
      </div>
    </div>
  );
};
export default PostItem;
