import { create, createStore } from "zustand";
import type { AuthStateT } from "../types/auth";
import Cookies from "js-cookie";
import { getUserData } from "../api/auth";
import { getFileBlobData } from "../api/file";
import { getImageUrlFromBlob } from "../Components/molecules/Post/PostItem";
import { tryCatchErrorHandler } from "../utils/error";
export const useAuthStore = create<AuthStateT>((set, get) => ({
  loading: false,
  user: null,
  isLogged: !!Cookies.get("ACCESS_TOKEN"),
  profilePicture: null,
  profilePictureUrl: null,
  setIsLogged: (value: boolean | undefined) => {
    set({ isLogged: value });
  },
  getToken: () => Cookies.get("ACCESS_TOKEN") || null,
  setToken: (server_token: string) => {
    Cookies.set("ACCESS_TOKEN", server_token, {
      secure: true,
      sameSite: "None",
    });
    return server_token;
  },
  getUser: async () => {
    try {
      const token = get().getToken();
      if (!token) {
        set(() => ({ user: null, isLogged: false }));
        return;
      }
      const userD = await getUserData();
      set(() => ({ user: userD, isLogged: true }));
      if (userD && userD.profile?.picture_id) {
        get().fetchProfilePicture();
      }
      return userD;
    } catch (error) {
      console.log(error);
      set(() => ({ isLogged: false, user: null }));
    }

    return null;
  },
  fetchProfilePicture: async () => {
    const { user } = get();
    if (!user) return;
    try {
      const response = await getFileBlobData(user.profile?.picture_id);
      const url = getImageUrlFromBlob(response);
      set({ profilePictureUrl: url });
    } catch (error) {
      console.error("Failed to fetch profile picture:", error);
      tryCatchErrorHandler(error, showError);
    }
  },
  logoutHandler: () => {
    Cookies.remove("ACCESS_TOKEN");
    set({ user: null, isLogged: false });
  },

  // getUser: async () => {
  //   set((state) => ({ ...state, loading: true }));
  //   console.log("will this rerender all the time?/");
  //   try {
  //     const token = get().getToken();
  //     if (!token) {
  //       set(() => ({ user: null, loading: false, isLogged: false }));
  //       return;
  //     }
  //     const userData = await getUserData();
  //     set(() => ({ user: userData, loading: false, isLogged: true }));
  //     return null;
  //   } catch (error) {
  //     console.error("Failed to fetch user", error);
  //     set(() => ({ user: null, loading: false, isLogged: false }));
  //     return null;
  //   }
  // },
}));
