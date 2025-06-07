import axios from "axios";

const axiosClient = axios.create()

axiosClient.defaults.baseURL = process.env.REACT_APP_BASE_API_URL

axiosClient.defaults.headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
}


axiosClient.interceptors.request.use((config) => {
    if (!navigator?.onLine) {
    if (!toastShown) {
      // Show toast here
      toastShown = true // Set the flag to true
      toast.error("No internet connection")
    }
   
    return config
  }
    //const token = localStorage.getItem("token")
    //config.headers.Authorization = jwt.decode(token) ? `Bearer ${token}` : ""
    return config
  
})
export default axiosClient

export const axiosPrivate = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true, // Include credentials for cross-origin requests
});