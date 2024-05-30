import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { CiUser } from "react-icons/ci";
import { Link, useParams } from "react-router-dom";
import PostPreview from "../../../pages/UserProfile/PostModal/PostPreview";
import { useProfile } from "../../../store/UserProfile-context";
type Props = {
  userImage: string;
  userName: string;
  userEmail: string;
  userId: number;
  postId: number;
  postName: string;
};

const SearchedUser: React.FC<Props> = ({
  postName,
  userImage,
  userName,
  userId,
  postId,
}) => {
  const { openPreview, fetchPost, setOpenPreview } = useProfile();
  const { data: previewPost, isLoading: isPreviewPostLoading } = useQuery({
    queryKey: ["previewPost"],
    queryFn: async () => {
      const previewPost = await fetchPost(postId);
      return previewPost;
    },
  });
  let { params } = useParams();
  useEffect(() => {
    if (postName) {
      console.log(postName);
    }
  }, [postName]);
  return (
    <>
      {postName && <p onClick={() => setOpenPreview(true)}># {postName}</p>}
      {userName && (
        <Link to={`/User/${userId}`}>
          <div data-userid={userId} className="flex place-items-center gap-3">
            {!postName ? (
              <picture className="size-12 rounded-full border border-blue-500 ">
                {!userImage ? (
                  <CiUser className="h-full w-full" />
                ) : (
                  <img
                    className={`h-full w-full rounded-full border border-slate-500`}
                    src={userImage}
                    alt=""
                  />
                )}
              </picture>
            ) : (
              <p>{postName}</p>
            )}
            <div>
              <span className="font-bold text-inherit">
                {userName ? userName : `#${postName}`}
              </span>
            </div>
          </div>
        </Link>
      )}

      {postName && openPreview && (
        <PostPreview
          isOpened={openPreview}
          postID={postId}
          postFILMS={previewPost?.Post_Film}
          postIMAGE={previewPost?.Post_Description}
          postTITLE={previewPost?.Post_Title}
        />
      )}
    </>
  );
};

export default SearchedUser;
