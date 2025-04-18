import { create } from "zustand";
import type { popoverStoreT } from "../types/ui";
export const usePopoverStore = create<popoverStoreT>((set, get) => ({
		isPopoverOpened: false,
		popoverType:"user-popup",
		setPopoverData: (data: any) => set({ popoverData: data }),
		popoverData: "",
		openPopover:()=>set(()=>({isPopoverOpened:true})),
		closePopover:()=> set(()=>({isPopoverOpened:false}))
	}))
