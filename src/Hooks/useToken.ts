import React, { useState } from "react";
type Props = {};
type Token = string | null;
const useToken = () => {
  const [token, setToken] = useState<Token>(null);
  setToken(localStorage.getItem("access_token"));
  return token;
};

export default useToken;
