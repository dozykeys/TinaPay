import axios from "axios";
import Cookies from "js-cookie";
import { base_url } from "../../constants/config";

// Create an axios instance with a base URL
export const nodeAxiosInstance = axios.create({
  baseURL: base_url, // Replace with your actual base URL
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the JWT token in all requests
nodeAxiosInstance.interceptors.request.use(
  (config) => {
    const jwtToken = Cookies.get("tinapay_jwt");
    if (jwtToken) {
      config.headers.Authorization = `Bearer ${jwtToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
