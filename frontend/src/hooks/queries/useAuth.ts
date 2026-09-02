// hooks/auth/useAuth.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { authApi } from "../../apis/authApi";
import { jwtUtil } from "../../utils/jwtUtil";
import type {
  ApiResponse,
  ErrorResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  OAuth2LoginRequest,
} from "../../types/type";
import { userKeys } from "./useUsers";
import { userApi } from "../../apis/userApi";

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
    onSuccess: async (res) => {
      toast.success(res.message);

      const role = res.data.role;
      jwtUtil.setToken(role, res.data.token);

      await queryClient.fetchQuery({
        queryKey: userKeys.me(),
        queryFn: userApi.getMe,
      });

      navigate(role === "ADMIN" ? "/admin/account/profile" : "/");
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
    onSuccess: async (res) => {
      toast.success(res.message);

      const role = res.data.role;
      jwtUtil.setToken(role, res.data.token);

      await queryClient.fetchQuery({
        queryKey: userKeys.me(),
        queryFn: userApi.getMe,
      });

      navigate(role === "ADMIN" ? "/admin/account/profile" : "/");
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

    jwtUtil.clearToken(isAdmin ? "ADMIN" : "CUSTOMER");

    queryClient.removeQueries({ queryKey: userKeys.me() });

    navigate(isAdmin ? "/admin/login" : "/");
  };

  return { logout };
};
