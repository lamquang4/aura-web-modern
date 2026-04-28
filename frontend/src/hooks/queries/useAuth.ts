// hooks/auth/useAuth.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
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
} from "../../types/type";
import { userKeys } from "./useUsers";

// Đăng nhập thủ công
export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<LoginResponse>,
    AxiosError<ErrorResponse>,
    LoginRequest
  >({
    mutationFn: (data) => authApi.login(data),
    onSuccess: (res) => {
      toast.success(res.message);

      if (res.data.role === "ADMIN") {
        setCookie("token-admin", res.data.token, 1);
      } else {
        setCookie("token-customer", res.data.token, 1);
      }

      queryClient.invalidateQueries({ queryKey: userKeys.me() });

      navigate(res.data.role === "ADMIN" ? "/admin/account/profile" : "/");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message ?? "Đăng nhập thất bại");
    },
  });
};

// Đăng ký
export const useRegister = () => {
  return useMutation<
    ApiResponse<null>,
    AxiosError<ErrorResponse>,
    RegisterRequest
  >({
    mutationFn: (data) => authApi.register(data),
    onSuccess: (res) => {
      toast.success(res.message);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message ?? "Đăng ký thất bại");
    },
  });
};

// Đăng nhập Google
export const useLoginOAuth2 = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<LoginResponse>,
    AxiosError<ErrorResponse>,
    OAuth2LoginRequest
  >({
    mutationFn: (data) => authApi.loginOAuth2(data),
    onSuccess: (res) => {
      toast.success(res.message);

      if (res.data.role === "ADMIN") {
        setCookie("token-admin", res.data.token, 1);
      } else {
        setCookie("token-customer", res.data.token, 1);
      }

      queryClient.invalidateQueries({ queryKey: userKeys.me() });

      navigate(res.data.role === "ADMIN" ? "/admin/account/profile" : "/");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message ?? "Đăng nhập thất bại");
    },
  });
};

// Đăng xuất
export const useLogout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const logout = () => {
    const isAdmin = location.pathname.startsWith("/admin");

    removeCookie(isAdmin ? "token-admin" : "token-customer");
    queryClient.removeQueries({ queryKey: userKeys.me() });
    navigate(isAdmin ? "/admin/login" : "/");
  };

  return { logout };
};
