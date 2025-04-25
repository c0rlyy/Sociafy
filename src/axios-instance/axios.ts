import axios from "axios";
import { BASE_URL } from "../constants";
import Cookies from "js-cookie";
const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});
instance.interceptors.request.use(
  (config) => {
    const server_token = Cookies.get("ACCESS_TOKEN");
    if (server_token) config.headers.Authorization = `Bearer ${server_token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove("ACCESS_TOKEN");
    }
    return Promise.reject(error.response?.data);
  },
);
export default instance;
