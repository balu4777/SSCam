import { API_BASE } from "config/baseAPIs";

export const API_PATHS = {
  // account services URL's
  ACCOUNT_LOGIN: `${API_BASE.BASE}account/login`,
  USER_PROFILE: `${API_BASE.BASE}user/myprofile`,

  // google URL's
  GOOGLE_SIGN_IN : `${API_BASE.BASE}account/google-signin` 
};

// for params URL path
// e.g :  USER_PROFILE_BY_ID : (id) => `${API_BASE.BASE}user/profile/${id}`,
