import { useState } from "react";
import UserPosts from "../UserInfo/UserPosts";
import LatestUpdates from "../Updates/LatestUpdates";

export default function MobileContent({ user }: { user: User }) {
  const [activeTab, setActiveTab] = useState("posts");
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  return (
    <article className="h-full">
      <div className="flex justify-center gap-4">
        <button
          className={`cursor-pointer rounded-md px-4 py-2 uppercase tracking-wider text-black text-opacity-75 transition-all hover:text-opacity-30 ${
            activeTab === "posts" ? "text-opacity-100" : "text-opacity-75"
          }`}
          onClick={() => handleTabChange("posts")}
        >
          Posts
        </button>
        <button
          className={`cursor-pointer rounded-md px-4 py-2 uppercase tracking-wider text-black text-opacity-75 transition-all hover:text-opacity-30 ${
            activeTab === "updates" ? "text-opacity-100" : "text-opacity-75"
          }`}
          onClick={() => handleTabChange("updates")}
        >
          Latest Updates
        </button>
      </div>
      {activeTab === "posts" ? <UserPosts user={user} /> : <LatestUpdates />}
    </article>
  );
}
