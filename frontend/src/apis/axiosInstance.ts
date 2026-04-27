import axios from "axios";
import { getCookie } from "../utils/cookieUtil";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  timeout: 10000,
});

axiosInstance.interceptors.request.use((config) => {
  const adminToken = getCookie("token-admin");
  const customerToken = getCookie("token-customer");

  const isAdminRequest =
    config.url?.startsWith("/admin") ||
    window.location.pathname.startsWith("/admin");

  const token = isAdminRequest ? adminToken : customerToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);
export default axiosInstance;
