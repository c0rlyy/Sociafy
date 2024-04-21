export const fetchMePicture = async (picture_id: number) => {
  try {
    const response = await fetch(
      `http://localhost:8000/file-retrive/${JSON.parse(picture_id)}`,
    );
    if (!response.ok) {
      throw new Error(`HTTP Error status: ${response.status}`);
    }
    const data: UserPictureProp = await response.url;
    console.log(`Data from fetchMePicture: ${data}`);
    return data;
  } catch (error) {
    console.log("Error fetching picture:", error);
    throw error; // Rethrow the error so the calling function can handle it
  }
};

const fetchMe = async (): Promise<UserProfileProps | null> => {
  try {
    const response = await fetch("http://localhost:8000/users/me", {
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
      const fetchMePicValid = await fetchMePicture(
        responseData?.profile?.picture_id,
      );
      console.log(fetchMePicValid);
      if (fetchMePicValid) {
        return responseData;
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch (error) {
    console.log("Error fetching data:", error);
    throw error; // Rethrow the error so the calling component can handle it
  }
};
export default fetchMe;
