import axios from "axios";
import { API_BASE } from "config/baseAPIs";
import Cookies from "js-cookie";

export const withCred = { withCredentials: true }; // config to include cookies with API requests

const axiosClient = axios.create();
const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

axiosClient.defaults.baseURL = API_BASE.BASE;

axiosClient.defaults.headers = headers;

let toastShown = false;

axiosClient.interceptors.request.use((config) => {
  if (!navigator?.onLine) {
    if (!toastShown) {
      toastShown = true;
      toast.error("No internet connection");
    }

    return config;
  }

  const token = Cookies.get("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  //const token = localStorage.getItem("token")
  //config.headers.Authorization = jwt.decode(token) ? `Bearer ${token}` : ""
  return config;
});

export default axiosClient;

export const axiosPrivate = axios.create({
  baseURL: API_BASE.BASE,
  headers,
  withCredentials: true, // Include credentials for cross-origin requests
});
