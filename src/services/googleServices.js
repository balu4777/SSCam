import { API_PATHS } from "./apiPaths";
import { withCred } from "./clientservice";
import { postCall } from "./axiosMethods";
import { cookieHandler } from "helpers/cookieHandler";

export const googleSignInService = async (payload,navigate) => {
  const res = await postCall(API_PATHS.GOOGLE_SIGN_IN, payload, false, withCred);
  const { accessToken = "" } = res || {};
  if (accessToken) {
    // Store token in a secure cookie
    cookieHandler("accessToken", accessToken);
    navigate("/dashboard", { replace: true });
  }
  return res?.data || {};
  console.log(res, "res");
};

export const googleSignupService = async (payload,navigate) => {
  const res = await postCall(API_PATHS.GOOGLE_SIGNUP_URL, payload, false, withCred);
  const { accessToken = "" } = res || {};
  if (accessToken) {
    // Store token in a secure cookie
    cookieHandler("accessToken", accessToken);
    navigate("/authentication/sign-in", { replace: true });
  }
  return res?.data || {};
  console.log(res, "res");
};