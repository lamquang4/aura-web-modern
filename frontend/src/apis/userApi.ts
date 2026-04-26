import axiosInstance from "./axiosInstance";
import type {
  ApiResponse,
  AccountResponse,
  UserResponse,
  CreateUserRequest,
  UpdateUserRequest,
} from "../types/type";

const BASE = "/api/users";

export type GetUsersParams = {
  page?: number;
  limit?: number;
  q?: string;
  role?: string;
  status?: string;
};

export const userApi = {
  getMe: () =>
    axiosInstance
      .get<ApiResponse<AccountResponse>>(`${BASE}/me`)
      .then((r) => r.data),

  getAllUsers: (params?: GetUsersParams) =>
    axiosInstance
      .get<ApiResponse<UserResponse[]>>(BASE, { params })
      .then((r) => r.data),

  getUserById: (userId: string) =>
    axiosInstance
      .get<ApiResponse<UserResponse>>(`${BASE}/${userId}`)
      .then((r) => r.data),

  createUser: (data: CreateUserRequest) =>
    axiosInstance.post<ApiResponse<null>>(BASE, data).then((r) => r.data),

  updateUser: (userId: string, data: UpdateUserRequest) =>
    axiosInstance
      .put<ApiResponse<null>>(`${BASE}/${userId}`, data)
      .then((r) => r.data),

  updateUserStatus: (userId: string) =>
    axiosInstance
      .patch<ApiResponse<null>>(`${BASE}/${userId}/toggle-status`)
      .then((r) => r.data),

  deleteUser: (userId: string) =>
    axiosInstance
      .delete<ApiResponse<null>>(`${BASE}/${userId}`)
      .then((r) => r.data),
};
