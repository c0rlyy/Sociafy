import { create, createStore } from "zustand";
import type { AuthStateT } from "../types/auth";
import Cookies from "js-cookie";
import { getUserData } from "../api/auth";

export const useAuthStore = create<AuthStateT>((set,get) => ({
  loading:false,
  user: null,
  isLogged: !!Cookies.get("ACCESS_TOKEN"),
  setIsLogged: (value: boolean | undefined) => { set({isLogged:value})},
  getToken: () => Cookies.get("ACCESS_TOKEN") || null,
  setToken: (server_token: string) => {
    Cookies.set("ACCESS_TOKEN", server_token, {secure:true, sameSite:"None"})
    return server_token
  },
  logoutHandler: () => {
    Cookies.remove("ACCESS_TOKEN");
    set({user:null, isLogged:false})
  },
  getUser: async () => {
    set({loading:true})
    try {
      const token= get().getToken()
      if (!token) {
        set({user:null, loading:false, isLogged:false})
      }
      const userData=await getUserData()
      set({ user: userData, isLogged:true, loading:false})
    }
    catch (error) {
      console.error("Failed to fetch user", error);
      set({loading:false, user:null, isLogged:false})
      return null
    }
  }
}))
