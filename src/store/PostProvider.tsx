import { ReactNode, useContext } from "react";
import PostContext from "./post-context";
interface PostProviderProps {
  children: ReactNode;
}
const PostProvider: React.FC<PostProviderProps> = ({ children }) => {
  const contextValue = useContext(PostContext);
  return (
    <PostContext.Provider value={contextValue}>{children}</PostContext.Provider>
  );
};
