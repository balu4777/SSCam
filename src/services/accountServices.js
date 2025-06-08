import Cookies from "js-cookie";
import { API_PATHS } from "./apiPaths";
import { getCall, postCall } from "./axiosMethods";
import { withCred } from "./clientservice";

export const loginService = async (payload, navigate) => {
  const res = await postCall(API_PATHS.ACCOUNT_LOGIN, payload, false, withCred);
  const { accessToken = "" } = res?.data?.data?.accessToken || {};
  if (accessToken) {
    // Store token in a secure cookie
    Cookies.set("accessToken", accessToken, {
      expires: 1, // 1 day
      secure: true, // HTTPS only
      sameSite: "Lax", // or 'Strict'
      path: "/",
    });
    navigate("/dashboard", { replace: true });
  }
  return response;
};

export const getProfileService = async () => {
  const res = await getCall(API_PATHS.USER_PROFILE);
  return res?.data || {};
};
