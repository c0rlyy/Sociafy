import { UserProfileProps } from "./fetchUsers";

const fetchMe = async (): Promise<UserProfileProps | null> => {
  try {
    const response = await fetch("http://localhost:8000/api/v1/users/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const responseData = await response.json();
    // Avoid logging sensitive information like access tokens
    console.log("Data from fetchMe:", responseData);
    if (responseData) {
      return responseData;
    } else {
      return null;
    }
  } catch (error) {
    console.log("Error fetching data:", error);
    throw error; // Rethrow the error so the calling component can handle it
  }
};
export default fetchMe;
