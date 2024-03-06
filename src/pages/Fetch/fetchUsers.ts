const fetchUsers = async () => {
  try {
    const resp = await fetch("http://127.0.0.1:8000/users/");

    if (!resp.ok) {
      throw new Error(`HTTP error! Status: ${resp.status}`);
    }

    const users = await resp.json();
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export default fetchUsers;
