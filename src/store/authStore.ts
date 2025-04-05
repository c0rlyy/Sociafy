import { create, createStore } from "zustand";
import type { AuthStateT } from "../types/auth";
import Cookies from "js-cookie";
import { getUserData } from "../api/auth";

export const useAuthStore = create<AuthStateT>((set, get) => ({
  loading: false,
  user: null,
  isLogged: !!Cookies.get("ACCESS_TOKEN"),
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
  userLoading: false,

  updateUser: async () => {
    set(() => ({ userLoading: true }));
    try {
      const token = get().getToken();
      if (!token) {
        set(() => ({ user: null, loading: false, isLogged: false }));
        return;
      }
      const userD = await getUserData();
      set(() => ({ user: userD, loading: false, isLogged: true }));
    } catch (error) {
      set(() => ({ loading: false, isLogged: false, user: null }));
    } finally {
      set(() => ({ userLoading: false }));
    }

    return null;
  },

  logoutHandler: () => {
    Cookies.remove("ACCESS_TOKEN");
    set({ user: null, isLogged: false });
  },

  getUser: async () => {
    set((state) => ({ ...state, loading: true }));
    console.log("will this rerender all the time?/");
    try {
      const token = get().getToken();
      if (!token) {
        set(() => ({ user: null, loading: false, isLogged: false }));
        return;
      }
      const userData = await getUserData();
      set(() => ({ user: userData, loading: false, isLogged: true }));
      return null;
    } catch (error) {
      console.error("Failed to fetch user", error);
      set(() => ({ user: null, loading: false, isLogged: false }));
      return null;
    }
  },
}));
