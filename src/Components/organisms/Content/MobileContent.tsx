import { useState } from "react";
import UserPosts from "../UserInfo/UserPosts";
import LatestUpdates from "../Updates/LatestUpdates";
import { Box, Container } from "../../atoms/Container/Container";
import { Stack } from "../../atoms/Stack/Stack";
import Button from "../../atoms/Button/Button";
import ButtonGroup from "../../molecules/ButtonGroup/ButtonGroup";
export default function MobileContent({ user }: { user: User }) {
  const [activeTab, setActiveTab] = useState("posts");
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  return (
    <Box className="h-full w-full">
      <ButtonGroup>
        <Button
          className={`cursor-pointer rounded-md px-4 py-2 uppercase tracking-wider text-black text-opacity-75 transition-all hover:text-opacity-30 ${
            activeTab === "posts" ? "text-opacity-100" : "text-opacity-75"
          }`}
          variant="text"
          size="lg"
          onClick={() => handleTabChange("posts")}
        >
          Posts
        </Button>
        <Button
          variant="text"
          size="lg"
          className={`cursor-pointer rounded-md px-4 py-2 uppercase tracking-wider text-black text-opacity-75 transition-all hover:text-opacity-30 ${
            activeTab === "updates" ? "text-opacity-100" : "text-opacity-75"
          }`}
          onClick={() => handleTabChange("updates")}
        >
          Latest Updates
        </Button>
      </ButtonGroup>
      {activeTab === "posts" ? <UserPosts user={user} /> : <LatestUpdates />}
    </Box>
  );
}
