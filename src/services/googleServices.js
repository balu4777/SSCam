import { API_PATHS } from "./apiPaths";
import { withCred } from "./clientservice";

export const googleSignInService = async (payload) => {
  const res = await postCall(API_PATHS.GOOGLE_SIGN_IN, payload, false, withCred);
  console.log(res, "res");
};
