import axiosInstance from "./axiosInstance";
import type {
  ApiResponse,
  SavedCardDetailResponse,
  SavedCardListItemResponse,
  CreateSavedCardRequest,
  UpdateSavedCardRequest,
} from "../types/type";

const BASE = "/api/saved-cards";

export const savedCardApi = {
  // Lấy danh sách thiệp lưu
  getSavedCards: (params: { page?: number; limit?: number }) =>
    axiosInstance
      .get<ApiResponse<SavedCardListItemResponse[]>>(BASE, { params })
      .then((r) => r.data),

  // Lấy thiệp lưu theo id
  getSavedCardById: (savedCardId: string) =>
    axiosInstance
      .get<ApiResponse<SavedCardDetailResponse>>(`${BASE}/${savedCardId}`)
      .then((r) => r.data),

  // Thêm thiệp lưu
  createSavedCard: (data: CreateSavedCardRequest) =>
    axiosInstance.post<ApiResponse<null>>(BASE, data).then((r) => r.data),

  // Cập nhật thiệp lưu
  updateSavedCard: (savedCardId: string, data: UpdateSavedCardRequest) =>
    axiosInstance
      .put<ApiResponse<null>>(`${BASE}/${savedCardId}`, data)
      .then((r) => r.data),

  // Xóa thiệp lưu
  deleteSavedCard: (savedCardId: string) =>
    axiosInstance
      .delete<ApiResponse<null>>(`${BASE}/${savedCardId}`)
      .then((r) => r.data),
};
