import axios from "axios";
import useAuth from "./useAuth";
import { json } from "react-router-dom";

const useRefreshToken = () => {
    const { setAuth } = useAuth();
    const refresh = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_BASE_API_URL + 'account/refresh',{
                    withCredentials: true
            });
            setAuth(prev => {
                console.log(JSON.stringify(prev));
                return { ...prev, accessToken: response.data.accessToken };
            });
            return response.data.accessToken;
        } catch (error) {
            console.error("Failed to refresh token:", error);
            throw error; // Re-throw the error for further handling if needed
        }
    };
};