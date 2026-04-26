import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { cardApi } from "../../apis/cardApi";
import type {
  ApiResponse,
  CardDetailResponse,
  CardListItemResponse,
  ErrorResponse,
} from "../../types/type";
import type { AxiosError } from "axios";

export const cardKeys = {
  all: ["cards"] as const,

  actives: () => [...cardKeys.all, "active"] as const,
  activeParams: (params: { page?: number; limit?: number; q?: string }) =>
    [
      ...cardKeys.actives(),
      params.page ?? 1,
      params.limit ?? 12,
      params.q ?? "",
    ] as const,

  admins: () => [...cardKeys.all, "admin"] as const,
  adminParams: (params: {
    page?: number;
    limit?: number;
    q?: string;
    status?: string;
  }) =>
    [
      ...cardKeys.admins(),
      params.page ?? 1,
      params.limit ?? 10,
      params.q ?? "",
      params.status ?? "",
    ] as const,

  detail: (cardId: string) => [...cardKeys.all, "detail", cardId] as const,
};

export const useGetActiveCards = (params: {
  page?: number;
  limit?: number;
  q?: string;
}) => {
  return useQuery<
    ApiResponse<CardListItemResponse[]>,
    AxiosError<ErrorResponse>
  >({
    queryKey: cardKeys.activeParams(params),
    queryFn: () => cardApi.getActiveCards(params),
    placeholderData: (prev) => prev,
  });
};

export const useGetCardById = (cardId: string) => {
  return useQuery<ApiResponse<CardDetailResponse>, AxiosError<ErrorResponse>>({
    queryKey: cardKeys.detail(cardId),
    queryFn: () => cardApi.getCardById(cardId),
    enabled: !!cardId,
  });
};

export const useGetAllCards = (params: {
  page?: number;
  limit?: number;
  q?: string;
  status?: string;
}) => {
  return useQuery<
    ApiResponse<CardListItemResponse[]>,
    AxiosError<ErrorResponse>
  >({
    queryKey: cardKeys.adminParams(params),
    queryFn: () => cardApi.getAllCards(params),
    placeholderData: (prev) => prev,
  });
};

export const useCreateCard = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<null>, AxiosError<ErrorResponse>, FormData>({
    mutationFn: cardApi.createCard,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: cardKeys.admins() });
      toast.success(res.message);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message ?? "Tạo thiệp thất bại");
    },
  });
};

export const useUpdateCard = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<null>,
    AxiosError<ErrorResponse>,
    { cardId: string; data: FormData }
  >({
    mutationFn: ({ cardId, data }) => cardApi.updateCard(cardId, data),

    onSuccess: (res, variables) => {
      queryClient.invalidateQueries({ queryKey: cardKeys.admins() });
      queryClient.invalidateQueries({
        queryKey: cardKeys.detail(variables.cardId),
      });

      toast.success(res.message);
    },

    onError: (error) => {
      toast.error(error.response?.data?.message ?? "Cập nhật thiệp thất bại");
    },
  });
};

export const useUpdateCardStatus = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<null>, AxiosError<ErrorResponse>, string>({
    mutationFn: cardApi.updateCardStatus,

    onSuccess: (res, cardId) => {
      queryClient.invalidateQueries({ queryKey: cardKeys.admins() });
      queryClient.invalidateQueries({ queryKey: cardKeys.detail(cardId) });

      toast.success(res.message);
    },

    onError: (error) => {
      toast.error(error.response?.data?.message ?? "Cập nhật thất bại");
    },
  });
};

export const useDeleteCard = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<null>, AxiosError<ErrorResponse>, string>({
    mutationFn: cardApi.deleteCard,

    onSuccess: (res, cardId) => {
      queryClient.invalidateQueries({ queryKey: cardKeys.admins() });
      queryClient.invalidateQueries({ queryKey: cardKeys.actives() });
      queryClient.invalidateQueries({ queryKey: cardKeys.detail(cardId) });

      toast.success(res.message);
    },

    onError: (error) => {
      toast.error(error.response?.data?.message ?? "Xóa thiệp thất bại");
    },
  });
};
