const fetchUrl = async (file_id: string | null) => {
  if (!file_id) {
    // If fileID is null, no need to fetch
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:8000/file-retrive/${JSON.parse(file_id)}`,
    );
    if (!response.ok) {
      throw new Error(`fetchUrl: ${response.status}: ${response.statusText}`);
    }
    const data = response.url;
    if (data) {
      console.log(`fetchUrl Result ${data}`);
      return data;
    } else {
      console.log("Empty response received");
    }
  } catch (error) {
    console.error(error);
  }
};
export default fetchUrl;
