type fetchUserNameProps = {
  email: string;
  user_name: string;
  id: number;
  profile: {
    description: string;
    profile_id: number;
    user_id: number;
  };
};
export const fetchUserNamePost = async (
  user_id: number
): Promise<fetchUserNameProps> => {
  const resp = await fetch(`http://127.0.0.1:8000/users/${user_id}`);
  const data = await resp.json();
  return data.user_name;
};
