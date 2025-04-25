import LatestUpdates from "../Updates/LatestUpdates";
import UserPosts from "../UserInfo/UserPosts";

export default function DesktopContent({ user }: { user: User }) {
  return (
    <article className="mb-12 grid h-full w-full  border-8 border-amber-600 md:grid-cols-1 lg:grid-cols-[1fr_358px]  ">
      <UserPosts user={user} />
      <LatestUpdates />
    </article>
  );
}
