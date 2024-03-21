import Buttons from "./Buttons/Buttons";

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
      datapostid={postID}
      dataprofileid={profileID}
      datauserid={userID}
      className=" grid grid-rows-postCard grid-cols-PostCardColumns mt-8  border-black border h-full  "
    >
      <div className="grid col-start-2 col-end-3 grid-cols-subgrid grid-rows-subgrid row-span-4">
        <div className="flex items-center gap-2">
          <picture className="flex justify-center items-center h-10 w-10 rounded-full overflow-hidden border border-gray-300">
            <img
              className="object-cover h-full w-full"
              src={`userImage`}
              alt="Your Image"
            />
          </picture>
          <h1>{postID}</h1>
        </div>
        <Buttons />
        <div>
          <h1>{`Likes: ${1133}`}</h1>
        </div>
        <div>
          <span className="text-bold">
            {userID}:<p>{postDESC}</p>
          </span>
        </div>
      </div>
    </div>
  );
};
export default PostItem;
