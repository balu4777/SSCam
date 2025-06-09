import Cookies from "js-cookie";

export const cookieHandler = (key,data)=>{
    Cookies.set(key, data, {
      expires: 1, // 1 day
      secure: true, // HTTPS only
      sameSite: "Lax", // or 'Strict'
      path: "/",
    });
};

