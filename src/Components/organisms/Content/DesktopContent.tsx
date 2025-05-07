import LatestUpdates from "../Updates/LatestUpdates";
import UserPosts from "../UserInfo/UserPosts";

export default function DesktopContent({ user }: { user: User }) {
  return (
    <article className=" grid h-full w-full lg:grid-cols-[3fr_2fr]  ">
      <UserPosts user={user} />
      <LatestUpdates />
    </article>
  );
}
