import { create } from "zustand";
import type { PostStoreT } from "../types/post";

export const usePostStore = create<PostStoreT>((set) => ({
  postData: {
    caption: "",
    files: [] as File[],
  },
  errors: {},
  updateField: (field, value) => {
    set((state) => {
      if (field === "files") {
        const newFiles = Array.isArray(value)
          ? [...state.postData.files, ...value]
          : [...state.postData.files, value];

        return {
          postData: {
            ...state.postData,
            files: newFiles,
          },
        };
      }

      return {
        postData: {
          ...state.postData,
          [field]: value,
        },
      };
    });
  },

  removePostFile: (index) => {
    set((state) => {
      const newMedia = [...state.postData.files];
      newMedia.splice(index, 1);
      return {
        postData: {
          ...state.postData,
          files: newMedia,
        },
      };
    });
  },
}));
