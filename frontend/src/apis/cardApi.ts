// apis/cardApi.ts
import axiosInstance from "./axiosInstance";
import type {
  ApiResponse,
  CardDetailResponse,
  CardListItemResponse,
} from "../types/type";

const BASE = "/api/cards";

export const cardApi = {
  getActiveCards: (params: { page?: number; limit?: number; q?: string }) =>
    axiosInstance
      .get<ApiResponse<CardListItemResponse[]>>(`${BASE}/active`, { params })
      .then((r) => r.data),

  getCardById: (cardId: string) =>
    axiosInstance
      .get<ApiResponse<CardDetailResponse>>(`${BASE}/${cardId}`)
      .then((r) => r.data),

  getAllCards: (params: {
    page?: number;
    limit?: number;
    q?: string;
    status?: string;
  }) =>
    axiosInstance
      .get<ApiResponse<CardListItemResponse[]>>(`${BASE}`, { params })
      .then((r) => r.data),

  createCard: (data: FormData) =>
    axiosInstance
      .post<ApiResponse<null>>(BASE, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((r) => r.data),

  updateCard: (cardId: string, data: FormData) =>
    axiosInstance
      .put<ApiResponse<null>>(`${BASE}/${cardId}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((r) => r.data),

  updateCardStatus: (cardId: string) =>
    axiosInstance
      .patch<ApiResponse<null>>(`${BASE}/status/${cardId}`)
      .then((r) => r.data),

  deleteCard: (cardId: string) =>
    axiosInstance
      .delete<ApiResponse<null>>(`${BASE}/${cardId}`)
      .then((r) => r.data),
};
