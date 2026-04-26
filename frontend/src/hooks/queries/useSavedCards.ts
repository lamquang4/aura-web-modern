import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { savedCardApi } from "../../apis/savedCardApi";
import type {
  ApiResponse,
  CreateSavedCardRequest,
  ErrorResponse,
  SavedCardDetailResponse,
  SavedCardListItemResponse,
  UpdateSavedCardRequest,
} from "../../types/type";
import type { AxiosError } from "axios";

export const savedCardKeys = {
  all: ["saved-cards"] as const,

  lists: () => [...savedCardKeys.all, "list"] as const,

  listParams: (params: { page?: number; limit?: number }) =>
    [...savedCardKeys.lists(), params.page ?? 1, params.limit ?? 12] as const,

  detail: (savedCardId: string) =>
    [...savedCardKeys.all, "detail", savedCardId] as const,
};

export const useGetSavedCards = (params: { page?: number; limit?: number }) => {
  return useQuery<
    ApiResponse<SavedCardListItemResponse[]>,
    AxiosError<ErrorResponse>
  >({
    queryKey: savedCardKeys.listParams(params),
    queryFn: () => savedCardApi.getSavedCards(params),
    placeholderData: (prev) => prev,
  });
};

export const useGetSavedCardById = (savedCardId: string) => {
  return useQuery<
    ApiResponse<SavedCardDetailResponse>,
    AxiosError<ErrorResponse>
  >({
    queryKey: savedCardKeys.detail(savedCardId),
    queryFn: () => savedCardApi.getSavedCardById(savedCardId),
    enabled: !!savedCardId,
  });
};

export const useCreateSavedCard = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<null>,
    AxiosError<ErrorResponse>,
    CreateSavedCardRequest
  >({
    mutationFn: savedCardApi.createSavedCard,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: savedCardKeys.lists() });
      toast.success(res.message);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message ?? "Lưu thiệp thất bại");
    },
  });
};

export const useUpdateSavedCard = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<null>,
    AxiosError<ErrorResponse>,
    { savedCardId: string; data: UpdateSavedCardRequest }
  >({
    mutationFn: ({ savedCardId, data }) =>
      savedCardApi.updateSavedCard(savedCardId, data),

    onSuccess: (res, variables) => {
      queryClient.invalidateQueries({ queryKey: savedCardKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: savedCardKeys.detail(variables.savedCardId),
      });

      toast.success(res.message);
    },

    onError: (error) => {
      toast.error(error.response?.data?.message ?? "Cập nhật thiệp thất bại");
    },
  });
};

export const useDeleteSavedCard = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<null>, AxiosError<ErrorResponse>, string>({
    mutationFn: savedCardApi.deleteSavedCard,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: savedCardKeys.lists() });
      toast.success(res.message);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message ?? "Xóa thiệp thất bại");
    },
  });
};
