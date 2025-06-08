import axios from "axios";

const axiosClient = axios.create()

axiosClient.defaults.baseURL = process.env.REACT_APP_BASE_API_URL

axiosClient.defaults.headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
}

axiosClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Attempt refresh token
      try {
        const refreshResponse = await axios.post(
          process.env.REACT_APP_BASE_API_URL + 'account/refresh',
          {},
          { withCredentials: true }
        );

        const newAccessToken = refreshResponse.data.accessToken;

        // Optionally store in memory or context
        // Retry original request with new token
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosClient(originalRequest);
      } catch (refreshError) {
        console.error("Refresh failed:", refreshError);
        window.location.href = "/authentication/sign-in";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
