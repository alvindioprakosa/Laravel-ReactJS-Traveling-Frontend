// import axios
import axios from "axios";

// import js-cookie
import Cookies from "js-cookie";

// create axios instance
const Api = axios.create({
  baseURL: process.env.REACT_APP_BASEURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// handle unauthenticated globally
Api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// export constants
const ApiImg = process.env.REACT_APP_IMG;
const ApiBaseUrl = process.env.REACT_APP_BASEURL;
const LinkUrl = process.env.REACT_APP_FRONT_END;

export { Api, ApiImg, ApiBaseUrl, LinkUrl };
