import React, { useEffect, useState } from "react";
import RecommendedItem from "./RecommendedItem";
import { useLoaderData } from "react-router-dom";
import fetchUsers from "../../pages/Fetch/fetchUsers";
import { Cookies } from "react-cookie";
const Recommended = () => {
  const [recommendedUsers, setRecommendedUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async (): Promise<UserProfileProps> => {
      const cookies = new Cookies();
      try {
        const resp = await fetch("http://127.0.0.1:8000/users/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: cookies.get("token"),
            cors: "Access-Control-Allow-Origin",
          },
        });

        if (!resp.ok) {
          throw new Error(`HTTP error! Status: ${resp.status}`);
        }

        const users = await resp.json();
        console.log(users);
        setRecommendedUsers(users);
      } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="grid grid-rows-recommendedContainer ">
      <div className="row-start-2 row-end-3 grid-cols-2 grid">
        <h1 className="font-bold col-start-1 col-end-4">
          Propozycje dla Ciebie
        </h1>
        {recommendedUsers.map((recommend) => (
          <RecommendedItem
            key={recommend.user_id}
            recommendedUser={recommend.user_name}
            recommendedUserPhoto={recommend.user_id}
          />
        ))}
      </div>
    </div>
  );
};

export default Recommended;
