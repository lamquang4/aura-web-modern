import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { userApi, type GetUsersParams } from "../../apis/userApi";
import type {
  AccountResponse,
  ApiResponse,
  CreateUserRequest,
  ErrorResponse,
  UpdateUserRequest,
  UserResponse,
} from "../../types/type";
import type { AxiosError } from "axios";
import { useToken } from "../../utils/cookieUtil";
import { useLocation } from "react-router-dom";

export const userKeys = {
  all: ["users"] as const,

  lists: () => [...userKeys.all, "list"] as const,

  listParams: (params?: GetUsersParams) =>
    [
      ...userKeys.lists(),
      params?.page ?? 1,
      params?.limit ?? 10,
      params?.q ?? "",
      params?.role ?? "",
      params?.status ?? "",
    ] as const,

  detail: (userId: string) => [...userKeys.all, "detail", userId] as const,

  me: () => [...userKeys.all, "me"] as const,
};

export const useGetMe = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  const tokenCustomer = useToken("token-customer");
  const tokenAdmin = useToken("token-admin");

  const hasToken = isAdminRoute ? !!tokenAdmin : !!tokenCustomer;

  return useQuery<ApiResponse<AccountResponse>, AxiosError<ErrorResponse>>({
    queryKey: userKeys.me(),
    queryFn: userApi.getMe,
    enabled: hasToken,
  });
};

export const useGetAllUsers = (params?: GetUsersParams) => {
  return useQuery<ApiResponse<UserResponse[]>, AxiosError<ErrorResponse>>({
    queryKey: userKeys.listParams(params),
    queryFn: () => userApi.getAllUsers(params),
    placeholderData: (prev) => prev,
  });
};

export const useGetUserById = (userId: string) => {
  return useQuery<ApiResponse<UserResponse>, AxiosError<ErrorResponse>>({
    queryKey: userKeys.detail(userId),
    queryFn: () => userApi.getUserById(userId),
    enabled: !!userId,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<null>,
    AxiosError<ErrorResponse>,
    CreateUserRequest
  >({
    mutationFn: userApi.createUser,

    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      toast.success(res.message);
    },

    onError: (error) => {
      toast.error(error.response?.data?.message ?? "Tạo người dùng thất bại");
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<null>,
    AxiosError<ErrorResponse>,
    { userId: string; data: UpdateUserRequest }
  >({
    mutationFn: ({ userId, data }) => userApi.updateUser(userId, data),

    onSuccess: (res, variables) => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: userKeys.detail(variables.userId),
      });

      toast.success(res.message);
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ?? "Cập nhật người dùng thất bại",
      );
    },
  });
};

export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<null>, AxiosError<ErrorResponse>, string>({
    mutationFn: userApi.updateUserStatus,

    onSuccess: (res, userId) => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      queryClient.invalidateQueries({ queryKey: userKeys.detail(userId) });

      toast.success(res.message);
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ?? "Cập nhật tình trạng thất bại",
      );
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<null>, AxiosError<ErrorResponse>, string>({
    mutationFn: userApi.deleteUser,

    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      toast.success(res.message);
    },

    onError: (error) => {
      toast.error(error.response?.data?.message ?? "Xóa người dùng thất bại");
    },
  });
};
