export type ProfileT = {
  description: string | null;
  profile_id: number;
  picture_id: number | null;
};

export type UserT = {
  email?: string | null;
  user_name: string | null;
  password: string | null;
  profile?: ProfileT;
  id?: number;
};

export type UserMe = {
  email: string;
  user_name: string;
  id?: number;
  profile?: ProfileT;
};

export type AuthorizedT = {
  access_token: string;
  token_type: string;
};

<<<<<<< HEAD
export interface File {
  path: string;
  file_type: string;
  file_id: number;
}

export interface FollowCounts {
  followers: number;
  followed: number;
}

export interface Post {
  post_title: string;
  post_description: string;
  post_id: number;
  profile_id: number;
  user_id: number;
  post_files: File[];
}

export interface UserProfileWithPosts {
  description: string | null;
  profile_id: number;
  posts: Post[];
}


=======
type ModalDataT =
  | {
      [key: string]: string;
    }
  | "";
export type ModalType = "sign-up" | "";
export interface ModalStore {
  open: (modalType: ModalType) => void;
  isOpen: boolean;
  onConfirm: () => void;
  setModalData: (data: ModalDataT) => void;
  modalType: ModalType;
  close: () => void;
}
>>>>>>> a5efd547195b0f73fe298239a394970a498dd9aa
export interface AuthStateT {
  getToken: () => string | null;
  setToken: (server_token: string) => string | null | undefined;
  logoutHandler: () => void;
  isLogged: boolean | undefined;
  setIsLogged: (value: boolean | undefined) => void;
  getUser: () => Promise<UserMe | undefined | null>;
  user: UserMe | null;
  loading: boolean;
}
