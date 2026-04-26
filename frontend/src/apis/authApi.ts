import axiosInstance from "./axiosInstance";
import type {
  ApiResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  OAuth2LoginRequest,
} from "../types/type";

const BASE = "/api/auth";

export const authApi = {
  login: (data: LoginRequest) =>
    axiosInstance
      .post<ApiResponse<LoginResponse>>(`${BASE}/login`, data)
      .then((r) => r.data),

  register: (data: RegisterRequest) =>
    axiosInstance
      .post<ApiResponse<null>>(`${BASE}/register`, data)
      .then((r) => r.data),

  loginOAuth2: (data: OAuth2LoginRequest) =>
    axiosInstance
      .post<ApiResponse<LoginResponse>>(`${BASE}/oauth2`, data)
      .then((r) => r.data),
};
