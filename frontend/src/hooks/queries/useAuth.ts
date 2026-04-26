// hooks/auth/useAuth.ts
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { authApi } from "../../apis/authApi";
import { setCookie, removeCookie } from "../../utils/cookieUtil";
import type {
  ApiResponse,
  ErrorResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  OAuth2LoginRequest,
  UserResponse,
} from "../../types/type";

// Đăng nhập thủ công
export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation<
    ApiResponse<LoginResponse>,
    AxiosError<ErrorResponse>,
    LoginRequest
  >({
    mutationFn: (data) => authApi.login(data),
    onSuccess: (res) => {
      setCookie("token", res.data.token, 1);
      toast.success("Đăng nhập thành công");

      if (res.data.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.message ?? "Đăng nhập thất bại");
    },
  });
};

// Đăng ký
export const useRegister = (onSuccess?: () => void) => {
  return useMutation<
    ApiResponse<null>,
    AxiosError<ErrorResponse>,
    RegisterRequest
  >({
    mutationFn: (data) => authApi.register(data),
    onSuccess: () => {
      toast.success("Đăng ký thành công");
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message ?? "Đăng ký thất bại");
    },
  });
};

// Đăng nhập Google
export const useLoginOAuth2 = () => {
  const navigate = useNavigate();

  return useMutation<
    ApiResponse<LoginResponse>,
    AxiosError<ErrorResponse>,
    OAuth2LoginRequest
  >({
    mutationFn: (data) => authApi.loginOAuth2(data),
    onSuccess: (res) => {
      setCookie("token", res.data.token, 1);
      toast.success("Đăng nhập thành công");

      if (res.data.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.message ?? "Đăng nhập thất bại");
    },
  });
};

// Đăng xuất
export const useLogout = (role: "ADMIN" | "CUSTOMER") => {
  const navigate = useNavigate();

  const logout = () => {
    removeCookie("token");
    toast.success("Đăng xuất thành công");

    if (role === "ADMIN") {
      navigate("/admin/login");
    } else {
      navigate("/login");
    }
  };

  return { logout };
};
