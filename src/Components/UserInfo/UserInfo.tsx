import Badge from "../Badge/Badge";
import DefaultAvatar from "../Avatar/Avatar";
import { useAuthStore } from "../../store/authStore";
import { useCallback, useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { object } from "zod";

export default function UserInfo() {
  const getUser = useAuthStore((state) => state.getUser);
  const user = useAuthStore(useShallow((state) => state.user));
  const userLoading = useAuthStore((state) => state.loadingUserData);

  useEffect(() => {
    const fetchUser = async () => {
      await getUser();
    };
    fetchUser();
  }, []);

  if (userLoading) {
    return <h1>....Loading</h1>;
  }

  return (
    <div className="flex w-full items-center justify-end gap-4 border ">
      <DefaultAvatar />
      <div className="flex flex-col justify-center gap-1">
        <span>John Doe</span>
        <span>{user?.user_name} </span>
        <Badge badgeText="Photographer" />
        <span className="text-grey-300">Fashion Designer</span>
        {/* <button onClick={updateUser}> hello test</button> */}
      </div>
    </div>
  );
}
