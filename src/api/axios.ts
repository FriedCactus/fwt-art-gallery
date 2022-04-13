import axiosBase from "axios";
import Cookies from "js-cookie";

const authToken = Cookies.get("access_token");

const axios = axiosBase.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  headers: {
    Authorization: `Bearer ${authToken}`,
  },
});

export default axios;
