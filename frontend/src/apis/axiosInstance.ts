import axios from "axios";
import { getCookie, removeCookie } from "../utils/cookieUtil";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  timeout: 10000,
});

axiosInstance.interceptors.request.use((config) => {
  const token = getCookie("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      removeCookie("token");
      window.location.href = "/login";
    } else if (status === 403) {
      toast.error("Bạn không có quyền thực hiện thao tác này");
    } else if (status === 500) {
      toast.error("Lỗi server, vui lòng thử lại sau");
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
