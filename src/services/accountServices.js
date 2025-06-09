import { API_PATHS } from "./apiPaths";
import { getCall, postCall } from "./axiosMethods";
import { withCred } from "./clientservice";
import { cookieHandler } from "helpers/cookieHandler";

export const loginService = async (payload, navigate) => {
  const res = await postCall(API_PATHS.ACCOUNT_LOGIN, payload, false, withCred);
  const { accessToken = "" } = res?.data || {};
  
  if (accessToken) {
    // Store token in a secure cookie
    cookieHandler("accessToken", accessToken);
    navigate("/dashboard", { replace: true });
  }
  return res?.data || {};
};

export const signupService = async (payload, navigate) => {
  const res = await postCall(API_PATHS.REGISTER_URL, payload, false, withCred);
  const { accessToken = "" } = res?.data || {};
  
  if (accessToken) {
    // Store token in a secure cookie
    cookieHandler("accessToken", accessToken);
    navigate("/authentication/sign-in", { replace: true });
  }
  return res?.data || {};
};

export const getProfileService = async () => {
  const res = await getCall(API_PATHS.USER_PROFILE);
  return res?.data || {};
};
