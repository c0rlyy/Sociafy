import { create } from "zustand";
import { FeedStoreT, PostWithImage } from "../types/feed";
import { fetchProfilePosts } from "../api/post"; // assumed to return posts for a profile
import { tryCatchErrorHandler } from "../utils/error";
import api from "../axios-instance/axios";

const useFeedStore = create<FeedStoreT>((set, get) => ({
  userPosts: [],
  page: 1,
  hasMoreUserPosts: true,
  isLoadingUserPosts: false,

  fetchUserPosts: async (profile_id: number, page: number, limit: number) => {
    if (get().isLoadingUserPosts || !get().hasMoreUserPosts) return;

    set({ isLoadingUserPosts: true });
    console.log("Loading posts ");

    try {
      const posts = await fetchProfilePosts(profile_id, page, limit); // ← actual post fetch
      console.log(posts);
      if (posts.length === 0) {
        set({ isLoadingUserPosts: false, hasMoreUserPosts: false });
        return;
      }

      const enrichedPosts: PostWithImage[] = await Promise.all(
        posts.map(async (post) => {
          const fileId = post.post_files?.[0]?.file_id;
          let imageUrl = "";

          if (fileId) {
            try {
              const blob = await api.get(`/file-retrive/${fileId}`, {
                responseType: "blob", // Ensure blob data is returned
              });
              imageUrl = URL.createObjectURL(blob.data);
            } catch (err) {
              console.error("Error fetching file", err);
            }
          }

          return { ...post, imageUrl };
        }),
      );

      const combined = [...get().userPosts, ...enrichedPosts];
      const MAX_POSTS = 50;
      set({
        userPosts: combined.slice(-MAX_POSTS),
        page,
        hasMoreUserPosts: enrichedPosts.length === limit, // if fewer than limit, assume end
        isLoadingUserPosts: false,
      });
    } catch (error) {
      tryCatchErrorHandler(error); // Handle specific error cases
      set({ isLoadingUserPosts: false });
    }
  },

  setPosts: (posts: PostWithImage[]) => set({ userPosts: posts }),

  clearUserPosts: () => {
    const { userPosts } = get();
    userPosts.forEach((post) => {
      if (post.imageUrl) {
        URL.revokeObjectURL(post.imageUrl); // Cleanup blobs
      }
    });

    set({
      userPosts: [],
      page: 1,
      hasMoreUserPosts: true,
    });
  },
}));

export default useFeedStore;
